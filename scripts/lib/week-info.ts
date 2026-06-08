export function getISOWeekInfo(date = new Date()) {
  const utc = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const day = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - day);
  const year = utc.getUTCFullYear();
  const yearStart = new Date(Date.UTC(year, 0, 1));
  const week = Math.ceil(
    ((utc.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );

  const monday = new Date(date);
  const mondayOffset = (monday.getDay() + 6) % 7;
  monday.setDate(monday.getDate() - mondayOffset);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const format = (d: Date) => d.toISOString().slice(0, 10);
  const weekLabel = `${year}-W${String(week).padStart(2, "0")}`;

  return {
    week,
    year,
    weekLabel,
    dateRange: `${format(monday)} — ${format(sunday)}`,
    analysisWindow: "the previous 7 days of experience design signals",
  };
}
