import creativeDirection from "@/generated/creative-direction.json";
import type { CreativeDirection as CreativeDirectionType } from "@/lib/schemas/creative-direction";

export type CreativeDirection = CreativeDirectionType;

export function getCreativeDirection(): CreativeDirection {
  return creativeDirection as CreativeDirection;
}

export function formatWeekLabel(week: number, year: number): string {
  return `${year}-W${String(week).padStart(2, "0")}`;
}
