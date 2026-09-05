// Single source of truth for DhyaraLabs site content.
// Everything here is grounded in the approved brand spec — no invented
// metrics, clients, awards, employees, or company history.

export const site = {
  name: "DhyaraLabs",
  url: "https://dhyaralabs.com", // update to production domain
  tagline: "Building software people actually use.",
  headline: "Build software people actually use.",
  description:
    "DhyaraLabs designs and builds modern digital products, AI-powered applications, business tools, and web experiences that turn ideas into working software.",
  email: "dhyaralabs@gmail.com",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const headerCta = { label: "Start a project", href: "/contact" };

export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  problem: string;
  solution: string;
  features: string[];
  capabilities: string[]; // capability tags shown as chips (no fabricated stack names)
  liveUrl?: string;
  screenshot?: string; // path under /public — real product capture
  screenshotLayout?: "mobile" | "desktop"; // how to frame the capture in UI
  presentationGoal: string;
  accent: "brand" | "teal" | "amber"; // distinct per-product visual identity
};

export const products: Product[] = [
  {
    slug: "fitme-ai",
    name: "FitMe AI",
    category: "AI-powered health & fitness",
    tagline: "Effortless tracking for meals, exercise, and fasting.",
    problem:
      "Most health apps make logging feel like homework. Manual entry is slow, and people drop off before tracking ever becomes a habit.",
    solution:
      "FitMe AI uses AI to parse what you're eating and turn it into structured, useful tracking — so logging a meal takes seconds, not minutes.",
    features: [
      "AI meal logging",
      "AI-powered meal parsing",
      "Exercise logging",
      "Fasting timer",
      "Unified health & fitness tracking",
    ],
    capabilities: ["AI/ML", "Consumer app", "Mobile-first", "Product design"],
    liveUrl: "https://fitme.fans",
    screenshot: "/products/fitme-ai.png",
    screenshotLayout: "mobile",
    presentationGoal:
      "Shows DhyaraLabs can design and ship modern AI-powered consumer applications.",
    accent: "brand",
  },
  {
    slug: "trainslanka",
    name: "TrainsLanka.lk",
    category: "Sri Lankan railway journey planning",
    tagline: "Plan train journeys across Sri Lanka with confidence.",
    problem:
      "Finding reliable train schedules, routes, and ticket prices across Sri Lanka's network is scattered and hard to navigate.",
    solution:
      "A modern, mobile-first platform for discovering schedules, planning route-based journeys, and checking station and fare information in one place.",
    features: [
      "Train schedule discovery",
      "Route-based journey planning",
      "Station information",
      "Ticket price information",
      "SEO-friendly route pages",
      "Mobile-first, PWA-oriented experience",
    ],
    capabilities: ["Web app", "PWA", "SEO architecture", "Local-language data"],
    liveUrl: "https://trainslanka.lk",
    screenshot: "/products/trainslanka.png",
    screenshotLayout: "desktop",
    presentationGoal:
      "Shows DhyaraLabs can solve practical local problems with useful consumer-facing web products.",
    accent: "teal",
  },
  {
    slug: "goldcalculator",
    name: "GoldCalculator",
    category: "Gold price calculation",
    tagline: "Gold pricing that speaks Sri Lankan units.",
    problem:
      "Gold pricing in Sri Lanka runs on local conventions — the pavan, the 8-gram tola, and variable making charges — which generic calculators ignore.",
    solution:
      "A focused tool that converts live gold prices into LKR using familiar weight units and configurable making charges, fixed or percentage-based.",
    features: [
      "Current gold price conversion",
      "LKR calculations",
      "8g / pavan weight calculations",
      "Configurable making charges",
      "Percentage-based and fixed making charges",
    ],
    capabilities: ["Utility product", "Data-driven", "UX design", "Localization"],
    liveUrl: "https://app-h1p4nn5y4-dd-c68e.vercel.app/",
    screenshot: "/products/goldcalculator.png",
    screenshotLayout: "mobile",
    presentationGoal:
      "Shows DhyaraLabs can build focused utility products that solve specific real-world problems.",
    accent: "amber",
  },
];

export type Capability = { title: string; description: string; icon: string };

export const capabilities: Capability[] = [
  {
    title: "Product Development",
    description:
      "Turn an idea into a polished, production-ready digital product.",
    icon: "product",
  },
  {
    title: "AI-Powered Applications",
    description: "Build practical AI experiences that solve real user problems.",
    icon: "ai",
  },
  {
    title: "Web Applications",
    description:
      "Modern, responsive, scalable web applications built for real-world usage.",
    icon: "web",
  },
  {
    title: "MVP Development",
    description: "Validate ideas quickly with focused, high-quality MVPs.",
    icon: "mvp",
  },
  {
    title: "Business Automation",
    description:
      "Replace repetitive manual processes with reliable software workflows.",
    icon: "automation",
  },
  {
    title: "Product Modernization",
    description: "Improve, modernize, and evolve existing applications.",
    icon: "modernize",
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const process: ProcessStep[] = [
  {
    number: "01",
    title: "Understand",
    description:
      "We start by understanding the problem, users, business goals, and constraints.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "We shape the experience, architecture, and product direction before writing unnecessary code.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "We engineer the product with modern technologies and production-quality practices.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "We take the product from development to a real production environment.",
  },
  {
    number: "05",
    title: "Improve",
    description:
      "We continuously learn from real usage and improve the product.",
  },
];

export type WhyPoint = { title: string; description: string };

export const whyPoints: WhyPoint[] = [
  {
    title: "Product mindset",
    description:
      "We think beyond individual features and focus on the complete product experience.",
  },
  {
    title: "Real products, not just demos",
    description:
      "Our portfolio demonstrates that we build and ship usable software.",
  },
  {
    title: "Modern engineering",
    description:
      "We use modern development practices and technologies to create maintainable products.",
  },
  {
    title: "AI-ready",
    description:
      "We understand how to integrate practical AI capabilities into real applications.",
  },
  {
    title: "Focused execution",
    description:
      "We keep development focused on solving the actual problem instead of adding unnecessary complexity.",
  },
];

export type Service = { title: string; description: string; icon: string };

export const services: Service[] = [
  {
    title: "Custom Web Applications",
    description:
      "Tailored web apps built around how your business actually works — not off-the-shelf tools bent to fit.",
    icon: "web",
  },
  {
    title: "AI-Powered Applications",
    description:
      "Practical AI features that create real value: parsing, prediction, and automation your users can feel.",
    icon: "ai",
  },
  {
    title: "MVP Development",
    description:
      "A focused first version that proves the idea and gets it in front of real users fast.",
    icon: "mvp",
  },
  {
    title: "Business Automation",
    description:
      "Replace repetitive manual work with reliable, maintainable software workflows.",
    icon: "automation",
  },
  {
    title: "Internal Tools",
    description:
      "Dashboards and admin tools that make your own team faster and less error-prone.",
    icon: "internal",
  },
  {
    title: "API & Backend Development",
    description:
      "Clean, well-documented APIs and dependable backends that scale with your product.",
    icon: "api",
  },
  {
    title: "Product Modernization",
    description:
      "Bring an existing product up to date — performance, UX, architecture, and maintainability.",
    icon: "modernize",
  },
  {
    title: "Progressive Web Applications",
    description:
      "Fast, installable, offline-capable web experiences that feel native on any device.",
    icon: "pwa",
  },
];

export const projectTypes = [
  "New product",
  "MVP",
  "AI application",
  "Business automation",
  "Web application",
  "Existing product improvement",
  "Other",
] as const;

export const budgetRanges = [
  "Under $2k",
  "$2k – $5k",
  "$5k – $15k",
  "$15k – $50k",
  "$50k+",
  "Not sure yet",
] as const;

export const footerColumns = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Products",
    links: [
      { label: "FitMe AI", href: "https://fitme.fans", external: true },
      { label: "TrainsLanka.lk", href: "https://trainslanka.lk", external: true },
      { label: "All products", href: "/products" },
    ],
  },
  {
    heading: "Get in touch",
    links: [{ label: "Start a project", href: "/contact" }],
  },
] as const;
