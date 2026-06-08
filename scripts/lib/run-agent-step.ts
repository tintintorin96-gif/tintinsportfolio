import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";

const PROJECT_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

export function loadEnvFile(filePath: string) {
  const resolved = path.isAbsolute(filePath)
    ? filePath
    : path.join(PROJECT_ROOT, filePath);

  if (!fs.existsSync(resolved)) {
    return;
  }

  const raw = fs.readFileSync(resolved, "utf8").replace(/^\uFEFF/, "");

  for (const line of raw.split(/\n/)) {
    const trimmed = line.trim().replace(/\r$/, "");
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const withoutExport = trimmed.startsWith("export ")
      ? trimmed.slice(7).trim()
      : trimmed;

    const separator = withoutExport.indexOf("=");
    if (separator === -1) {
      continue;
    }

    const key = withoutExport.slice(0, separator).trim();
    let value = withoutExport.slice(separator + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    const existing = process.env[key];
    if (existing === undefined || existing === "") {
      process.env[key] = value;
    }
  }
}

export function createOpenAIClient() {
  loadEnvFile(".env");
  loadEnvFile(".env.local");

  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey) {
    const localPath = path.join(PROJECT_ROOT, ".env.local");
    let hint = "Add OPENAI_API_KEY to .env.local (see .env.example).";

    if (fs.existsSync(localPath) && fs.statSync(localPath).size === 0) {
      hint =
        ".env.local exists but is empty on disk — save the file with: OPENAI_API_KEY=sk-...";
    } else if (!fs.existsSync(localPath)) {
      hint = `Create ${localPath} from .env.example and set OPENAI_API_KEY.`;
    }

    throw new Error(`Missing OPENAI_API_KEY. ${hint}`);
  }

  return new OpenAI({ apiKey });
}

export async function runAgentStep(
  client: OpenAI,
  system: string,
  user: string,
  schema: { name: string; schema: Record<string, unknown> },
  model = process.env.CREATIVE_DIRECTION_MODEL ?? "gpt-4.1-mini",
) {
  try {
    const response = await client.responses.create({
      model,
      input: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      text: {
        format: {
          type: "json_schema",
          name: schema.name,
          schema: schema.schema,
        },
      },
    });

    return JSON.parse(response.output_text) as Record<string, unknown>;
  } catch (error: unknown) {
    const apiError = error as {
      status?: number;
      code?: string;
      error?: { code?: string; message?: string };
    };

    const code = apiError.code ?? apiError.error?.code;
    if (apiError.status === 429 && code === "insufficient_quota") {
      throw new Error(
        `OpenAI quota exceeded (step: ${schema.name}). Add billing or credits at https://platform.openai.com/settings/organization/billing — or use an API key from an account with available quota. The weekly pipeline runs 4 model calls per execution.`,
        { cause: error },
      );
    }

    throw error;
  }
}
