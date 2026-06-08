export const mainNav = [
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

export const footerNav = [
  ...mainNav,
  { label: "Lab", href: "/lab" },
  { label: "Weekly direction", href: "/creative-direction" },
] as const;
