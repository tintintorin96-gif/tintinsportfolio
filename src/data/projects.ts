export type Project = {
  slug: string;
  title: string;
  client: string;
  role: string;
  year: string;
  featured: boolean;
  teaser: string;
  problem: string;
  process: string[];
  outcome: string;
  tools: string[];
  images: string[];
};

export const projects: Project[] = [
  {
    slug: "assa-abloy-design-system",
    title: "Assa Abloy Design System Transformation",
    client: "Assa Abloy",
    role: "UX/UI Designer & Accessibility Specialist",
    year: "2024",
    featured: true,
    teaser:
      "Scaling accessibility and consistency across a global digital ecosystem.",
    problem:
      "Assa Abloy needed to improve accessibility, consistency, and scalability across multiple design systems and platforms.",
    process: [
      "Audited Android and Web design systems",
      "Performed WCAG accessibility reviews",
      "Built semantic design tokens",
      "Created iOS design system foundations",
      "Produced governance and implementation documentation",
    ],
    outcome:
      "Delivered a more accessible, scalable design system supporting global product teams and future growth.",
    tools: ["Figma", "Accessibility Auditing", "Design Systems", "Cursor"],
    images: ["/projects/assaabloy/AssaHero.svg"],
  },
  {
    slug: "securitas-public-web",
    title: "Securitas Public Web 2.0",
    client: "Securitas",
    role: "UX Researcher & Business Transformation Consultant",
    year: "2023–2024",
    featured: true,
    teaser:
      "Defining the future digital experience for one of the world's largest security companies.",
    problem:
      "Securitas needed a future-facing global web strategy supporting commercialization, client-centricity, and scalable governance across international markets.",
    process: [
      "Interviewed users across six customer segments",
      "Conducted research in Sweden, Germany, and Uruguay",
      "Created customer journeys",
      "Facilitated governance and strategy workshops",
      "Developed future operating models",
      "Created website concepts and prototypes",
    ],
    outcome:
      "Delivered customer journeys, governance frameworks, web strategy, and a future website concept supporting global implementation.",
    tools: [
      "User Research",
      "Interviews",
      "Customer Journey Mapping",
      "Workshop Facilitation",
    ],
    images: ["/projects/securitas/SecuritasHero.svg"],
  },
  {
    slug: "okq8-web-migration",
    title: "OKQ8 Web Migration",
    client: "OKQ8",
    role: "UX/UI Designer",
    year: "2024–Present",
    featured: true,
    teaser:
      "Building a scalable digital ecosystem through accessibility, design systems, and customer-centered redesign.",
    problem:
      "As part of a migration from Sitecore to Optimizely, OKQ8 needed a redesigned digital experience, a scalable design system, and a stronger digital identity that could support future services and customer journeys.",
    process: [
      "Facilitated workshops across multiple business areas",
      "Mapped customer and business needs",
      "Prioritized initiatives and requirements",
      "Created a new design system",
      "Designed reusable content blocks",
      "Worked closely with editors and developers",
      "Conducted iterative design reviews and testing",
    ],
    outcome:
      "Delivered a scalable design system, improved customer journeys, and established a foundation for future digital services across the organization.",
    tools: ["Figma", "Miro", "User Testing"],
    images: ["/projects/okq8/okq8hero.svg"],
  },
  {
    slug: "medoma-healthcare-platform",
    title: "Medoma Healthcare Platform",
    client: "Medoma",
    role: "UX Designer",
    year: "2022",
    featured: true,
    teaser:
      "Reimagining acute healthcare through a digital-first care experience.",
    problem:
      "Medoma needed a digital platform supporting acute hospital care delivered directly in patients' homes.",
    process: [
      "Interviewed patients, nurses, and doctors",
      "Facilitated service design workshops",
      "Designed patient and healthcare staff interfaces",
      "Created clickable prototypes",
      "Conducted usability testing and bodystorming",
    ],
    outcome:
      "Delivered the first version of a healthcare platform and future-state vision supporting virtual hospital care.",
    tools: ["Figma", "Miro", "User Research", "Prototyping"],
    images: [
      "/projects/medoma/medomahero.svg",
      "/projects/medoma/MedomaPatientPrototype.gif",
      "/projects/medoma/MedomaNursePrototype.gif",
    ],
  },
  {
    slug: "okq8-b2b-portal",
    title: "OKQ8 B2B Portal",
    client: "OKQ8",
    role: "UX/UI Designer",
    year: "2024",
    featured: false,
    teaser:
      "Designing a self-service platform for business customers managing mobility services.",
    problem:
      "Business customers needed a portal for managing cards, invoices, transactions, and company accounts while balancing legal requirements and technical limitations.",
    process: [
      "Created iterative portal concepts",
      "Collaborated with developers and stakeholders",
      "Tested concepts with existing customers",
      "Prioritized functionality through user feedback",
      "Refined flows and information architecture",
    ],
    outcome:
      "Designed a customer-centered portal experience enabling self-service and more efficient account management.",
    tools: ["Figma", "User Testing", "ChatGPT"],
    images: ["/projects/okq8_b2b/okq8-b2b-hero.svg"],
  },
  {
    slug: "arbetsformedlingen",
    title: "Effective Delivery of Customer Value",
    client: "Arbetsförmedlingen",
    role: "Service Designer & Business Developer",
    year: "2022–2023",
    featured: false,
    teaser:
      "Transforming strategic business development within a national public-sector organization.",
    problem:
      "The organization needed a more efficient operating model for strategic initiatives, governance, business casing, and portfolio management.",
    process: [
      "Facilitated cross-functional workgroups",
      "Conducted stakeholder interviews",
      "Designed new governance structures",
      "Created process descriptions and handbooks",
      "Developed business casing frameworks",
    ],
    outcome:
      "Delivered new ways of working, governance models, role definitions, and strategic development processes.",
    tools: ["Service Design", "Workshop Facilitation", "Business Development"],
    images: ["/projects/arbetsformedlingen/arbetsformedlingen-hero.svg"],
  },
  {
    slug: "swecon-ecommerce-prestudy",
    title: "Swecon E-commerce Pre-study",
    client: "Swecon",
    role: "UX Researcher",
    year: "2022",
    featured: false,
    teaser:
      "Creating the strategic foundation for a global e-commerce platform.",
    problem:
      "Swecon needed strategic guidance for creating a multi-market e-commerce experience spanning several countries and business areas.",
    process: [
      "Conducted customer interviews",
      "Facilitated stakeholder workshops",
      "Performed competitor benchmarking",
      "Mapped customer journeys",
      "Defined target groups",
    ],
    outcome:
      "Delivered strategic recommendations and a roadmap for future e-commerce development.",
    tools: ["User Research", "Workshop Facilitation", "Customer Journey Mapping"],
    images: ["/projects/swecon/SweconHero.svg"],
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
