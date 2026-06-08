import fs from "node:fs";
import path from "node:path";
import {
  validateWeeklyOutputs,
  type CreativeDirection,
  type InteractionSystem,
  type Theme,
} from "../src/lib/schemas/creative-direction";

const GENERATED = path.join("src", "generated");

function loadJson<T>(fileName: string): T {
  const filePath = path.join(GENERATED, fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function main() {
  const creativeDirection = loadJson<CreativeDirection>(
    "creative-direction.json",
  );
  const theme = loadJson<Theme>("theme.json");
  const interaction = loadJson<InteractionSystem>("interaction-system.json");

  validateWeeklyOutputs({ creativeDirection, theme, interaction });

  console.log(
    `Validated weekly creative direction ${creativeDirection.year}-W${String(creativeDirection.week).padStart(2, "0")}`,
  );
}

main();
