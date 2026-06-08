/**
 * Optional pre-step: load curated research context before the scout LLM call.
 * Extend with web/search APIs when available.
 */
import fs from "node:fs";
import path from "node:path";
import { getISOWeekInfo } from "../lib/week-info";
import { DESIGN_TRENDS_DIR } from "../lib/load-context";

const weekInfo = getISOWeekInfo();
const outPath = path.join(DESIGN_TRENDS_DIR, `${weekInfo.weekLabel}.research-context.md`);

const note = `# Research context — ${weekInfo.weekLabel}

**Range:** ${weekInfo.dateRange}
**Window:** ${weekInfo.analysisWindow}

Prioritize shipped experiences from Awwwards, FWA, CSS Design Awards, Webflow Showcase, Figma Community, creative developer portfolios, AI-native products, luxury digital, experimental portfolios, motion design, and creative technology.

This file is a placeholder for external research feeds. The Experience Signal Scout fills category lenses and \`${weekInfo.weekLabel}.signals.md\` during \`npm run creative-direction:weekly\`.
`;

fs.mkdirSync(DESIGN_TRENDS_DIR, { recursive: true });
fs.writeFileSync(outPath, note);
console.log(`Wrote ${outPath}`);
