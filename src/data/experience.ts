export type ExperienceHighlight = {
  title: string;
  period: string;
  description: string;
};

export const experienceHighlights: ExperienceHighlight[] = [
  {
    title: "Enterprise & public-sector digital transformation",
    period: "2022–Present",
    description:
      "Leading UX, service design, and accessibility work across security, energy, healthcare, and government organizations.",
  },
  {
    title: "Design systems & accessibility at scale",
    period: "2024",
    description:
      "Auditing and evolving multi-platform design systems with WCAG-aligned tokens, governance, and implementation guidance.",
  },
  {
    title: "Research-led strategy & discovery",
    period: "2022–2024",
    description:
      "International user research, journey mapping, and workshop facilitation informing product and platform direction.",
  },
];

export const skills = [
  "UX Design",
  "UI Design",
  "Service Design",
  "Accessibility",
  "UX Research",
  "User Testing",
  "Design Systems",
  "Customer Journey Mapping",
  "Information Architecture",
  "Prototyping",
  "Workshop Facilitation",
  "Design Strategy",
  "Business Design",
  "Organizational Development",
  "Change Management",
] as const;

export const methodGroups = [
  {
    name: "Discovery & Research",
    items: [
      "Stakeholder Interviews",
      "User Interviews",
      "Contextual Research",
      "Customer Journey Mapping",
      "Needs Analysis",
      "Benchmarking",
      "Accessibility Audits",
    ],
  },
  {
    name: "Facilitation & Strategy",
    items: [
      "Discovery Workshops",
      "Co-Creation Workshops",
      "Design Thinking",
      "Service Blueprinting",
      "Governance Workshops",
      "Prioritization Frameworks",
      "Vision Workshops",
    ],
  },
  {
    name: "Design & Validation",
    items: [
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "Usability Testing",
      "Accessibility Testing",
      "Iterative Design",
    ],
  },
] as const;

export const designPrinciples = [
  {
    title: "Accessibility by Default",
    description:
      "Accessibility should never be an afterthought. Inclusive design creates better experiences for everyone.",
  },
  {
    title: "Business Meets User Needs",
    description:
      "The best solutions balance organizational goals with genuine user value.",
  },
  {
    title: "Systems Thinking",
    description:
      "I enjoy solving problems that span products, services, teams, and organizational structures.",
  },
  {
    title: "Collaboration Creates Better Outcomes",
    description:
      "The strongest solutions emerge when stakeholders, users, designers, and developers work together.",
  },
] as const;
