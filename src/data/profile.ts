export const profile = {
  name: "Tintin Torin",
  title: "Senior UX/UI Designer & Service Designer",
  positioning:
    "Accessibility-certified UX/UI and Service Designer specializing in complex digital ecosystems, design systems, research, and digital transformation.",
  heroGreeting: "Hi, I'm Tintin.",
  heroIntro:
    "Accessibility-certified UX/UI and Service Designer specializing in UX, UI, service design, and digital transformation. I create inclusive, user-centered solutions that balance business goals with user needs.",
  bio: `I'm a Stockholm-based Experience Designer with expertise in UX, UI, service design, accessibility, and strategic design. My work focuses on creating inclusive digital products and services that balance business goals, user needs, and technical realities.

I have experience leading discovery initiatives, conducting research, building design systems, facilitating organizational change, and designing digital services across healthcare, energy, security, public sector, and enterprise organizations.

As a Certified Professional in Accessibility Core Competencies (CPACC), I advocate for accessible and inclusive digital experiences that work for everyone.`,
  location: "Stockholm, Sweden",
  email: "tintintorin@msn.com",
  certification: "CPACC — Certified Professional in Accessibility Core Competencies",
  social: {
    linkedin: "https://www.linkedin.com/in/tintintorin/",
  },
  logoStrip: [
    "Assa Abloy",
    "Securitas",
    "OKQ8",
    "Arbetsförmedlingen",
    "Swecon",
    "Medoma",
  ],
  /** Visual baseline for weekly creative direction — not editorial */
  tone: ["minimal", "bold"] as const,
} as const;

export type Profile = typeof profile;
