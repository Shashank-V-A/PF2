export const siteConfig = {
  name: "Shashank VA",
  title: "Full-Stack Developer",
  domain: "https://shashankva.me",
  email: "shashankva05@gmail.com",
  phone: "+91 7022742719",
  location: "Bangalore, India",
  tagline: "I craft digital experiences, pixel to production",
  description:
    "Full-stack developer and B.E. CSE (Data Science) student at MVJ College of Engineering — building accessible EdTech, analytics platforms, and production web apps. 5× hackathon podium finisher.",
  social: {
    github: "https://github.com/Shashank-V-A",
    linkedin: "https://linkedin.com/in/shashankva05",
    twitter: "https://x.com/Shashank_VA05",
    instagram: "https://www.instagram.com/shashank.va05",
  },
  resumeUrl: "/resume.pdf",
  profileImage: "/images/profile.png",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Extra Mile", href: "#extra-mile" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { value: "5×", label: "hackathon podiums" },
  { value: "2", label: "internships completed" },
];

export const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    description: "Interfaces I ship with regularly.",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React"],
  },
  {
    id: "backend",
    label: "API & Backend",
    description: "Server-side work from APIs to data layers.",
    items: ["Node.js", "Express.js", "Django", "REST APIs"],
  },
  {
    id: "databases",
    label: "Databases",
    description: "Storage I have used in projects and internships.",
    items: ["PostgreSQL", "SQLite", "MySQL", "MongoDB"],
  },
  {
    id: "cloud",
    label: "Cloud",
    description: "Deployment, auth, and analytics from my stack.",
    items: ["Supabase", "Vercel", "Git", "GitHub", "OAuth", "Tableau", "Power BI"],
  },
] as const;

export type SkillCategoryId = (typeof skillCategories)[number]["id"];

/** @deprecated Use skillCategories */
export const skills = skillCategories;

export const techStack = skillCategories.flatMap((c) => c.items);

export const experience: {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  logoUrl?: string;
  logoColor?: string;
  location?: string;
  tech?: string[];
  current?: boolean;
}[] = [
  {
    company: "Startup Haven",
    role: "Software Engineer Intern",
    period: "Jan 2026 — Jun 2026",
    current: true,
    location: "Bangalore, India",
    description:
      "Developing a full-stack comparison platform for quick-commerce and e-commerce apps to compare prices, offers, and delivery options across vendors.",
    highlights: [
      "Built scalable web scraping pipelines to ingest and normalize multi-source product and pricing data",
      "Designed responsive interfaces that present standardized comparison results for end users",
      "Improved decision-making workflows with reliable downstream price and offer comparisons",
    ],
    logoUrl: "/logos/startup-haven.png",
    logoColor: "#2563eb",
    tech: ["React", "Node.js", "Web Scraping", "REST APIs"],
  },
  {
    company: "HAL – RWR&DC, AFCS Group",
    role: "Intern",
    period: "Jul 2025 — Aug 2025",
    location: "Bangalore, India",
    description:
      "Supported automation initiatives for flight data record workflows and assisted in preparation of flight test reports for the AFCS Group.",
    highlights: [
      "Reduced manual processing steps in flight data reporting pipelines",
      "Validated flight test reports using structured documentation templates",
      "Organized datasets and improved consistency of technical reports for stakeholders",
    ],
    logoUrl: "/logos/hal.png",
    logoColor: "#1e3a5f",
    tech: ["Automation", "Documentation", "Data Validation"],
  },
];

export const projects = [
  {
    title: "RankMint",
    description:
      "Creator analytics platform that scores YouTube and X influencers from live API data — authenticity, growth, brand fit, and a composite RankMint score for campaign vetting.",
    tags: ["Next.js", "TypeScript", "Python", "Supabase"],
    link: "https://rankmint-ciphers.vercel.app",
    github: "https://github.com/Shashank-V-A/Ratefluencer",
    category: "Web2",
    year: "2025",
    accent: "#a78bfa",
    highlights: [
      "Analyze, compare, leaderboard & PDF export flows",
      "Logistic-regression ML synced from Python trainer to TypeScript",
      "Optional Supabase cache and brand workspace",
    ],
  },
  {
    title: "VaultIQ",
    description:
      "Crypto expense tracker with manual trade logging, live price sync (CoinGecko/CoinDCX), and FIFO-based portfolio tracking with Indian tax logic.",
    tags: ["React", "Node.js", "Express", "PostgreSQL"],
    link: "https://vault-iq-phi.vercel.app",
    github: "https://github.com/Shashank-V-A/VaultIQ",
    category: "Web2",
    year: "2025",
    accent: "#60a5fa",
    highlights: [
      "Live price sync via CoinGecko & CoinDCX",
      "Indian tax logic — 30% tax, 4% cess, 1% TDS",
      "CSV export & PostgreSQL cloud sync on Vercel",
    ],
  },
];

export const resumeInfo = {
  education: {
    school: "MVJ College of Engineering",
    degree: "B.E. in CSE – Data Science",
    location: "Bangalore, India",
    period: "Expected May 2027",
    cgpa: "8.95 / 10.0",
    coursework: [
      "Data Structures",
      "Algorithms",
      "Machine Learning",
      "Databases",
    ],
  },
  includes: [
    "Work experience",
    "Technical projects",
    "Education & coursework",
    "Hackathon achievements",
  ],
  skillGroups: [
    { label: "Frontend", items: "HTML · CSS · JavaScript · TypeScript · React" },
    { label: "Backend", items: "Node.js · Express.js · Django · REST APIs" },
    { label: "Data", items: "PostgreSQL · SQLite · MySQL · MongoDB" },
    { label: "Tools", items: "Supabase · Vercel · Git · Tableau · Power BI" },
  ],
};

export const extraMile = {
  achievements: [
    {
      title: "Cepheus Hackathon — 3rd Place",
      organization: "Atria Institute of Technology",
      year: "2026",
      description:
        "Won 3rd prize at the Cepheus Hackathon in the Web3 domain, organized by GDG On Campus AIT and Code Club — April 22–23, 2026.",
      type: "hackathon" as const,
      link: "",
      certificateImage: "/certificates/cepheus-atria.png",
    },
    {
      title: "Express Launchpad Hackathon — Winner",
      organization: "Nexla Inc",
      year: "2026",
      description:
        "Delivered an API and data-pipeline integration project, winning the Express Launchpad hackathon with a live demo.",
      type: "hackathon" as const,
      link: "",
      certificateImage: "/certificates/nexla-express-launchpad.png",
    },
    {
      title: "Growth Hackathon — Winner",
      organization: "Residency BLR",
      year: "2025",
      description:
        "Shipped a working prototype with pitch and live demo, winning the Growth Hackathon at Residency BLR.",
      type: "hackathon" as const,
      link: "",
      certificateImage: "/certificates/growth-hackathon-residency.png",
    },
    {
      title: "HackSpark Hackathon — Winner",
      organization: "DSATM",
      year: "2025",
      description:
        "Built and demoed a full-stack solution under a 24-hour deadline, winning HackSpark at DSATM.",
      type: "hackathon" as const,
      link: "",
      certificateImage: "/certificates/hackspark-dsatm.png",
    },
    {
      title: "Pixelgenesis Hackathon — 2nd Place",
      organization: "MVJ College of Engineering",
      year: "2025",
      description:
        "Secured 2nd place at the PixelGenesis Hackathon during VertechX 13.0 — a 24-hour inter-collegiate fest at MVJ College of Engineering, Nov 13–14, 2025.",
      type: "hackathon" as const,
      link: "",
      certificateImage: "/certificates/pixelgenesis-mvj.png",
    },
  ] as {
    title: string;
    organization: string;
    year: string;
    description: string;
    type: "hackathon" | "academic" | "community" | "award";
    link?: string;
    /** Place image in public/certificates/ — e.g. nexla-express-launchpad.jpg */
    certificateImage?: string;
  }[],
  certifications: [] as {
    title: string;
    issuer: string;
    year: string;
    credentialId?: string;
    verifyUrl?: string;
    skills: string[];
  }[],
};
