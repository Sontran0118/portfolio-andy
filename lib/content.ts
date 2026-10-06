/**
 * Single source of truth for site copy.
 *
 * Ported from the curated data in the `portfolio` repo (src/data/portfolio.ts)
 * so both sites describe the same work. Deliberately carries no self-assessed
 * skill percentages — the previous terminal build invented them.
 */

export const profile = {
  name: "Andy Tran",
  title: "Systems & AI Engineer",
  location: "New York, NY",
  tagline:
    "I build things that live close to the hardware and things that live in the browser — from GPU kernels and network protocols to full-stack AI products.",
  email: "andytran1185@gmail.com",
  github: "https://github.com/Sontran0118",
  linkedin: "https://www.linkedin.com/in/sontran0118/",
  resumeUrl: "/resume.pdf",
};

export type Link = { label: string; href: string };

export type Panel = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  /** Short factual detail lines. Keep these verifiable. */
  details: string[];
  links: Link[];
};

/**
 * Featured work, one full-viewport panel each — the Tesla homepage pattern.
 * Ordered so the autonomous-driving panel lands immediately after the hero,
 * where the point-cloud scene has already set the context.
 */
export const panels: Panel[] = [
  {
    id: "fsd-bike",
    eyebrow: "Autonomy",
    title: "Self-driving campus bike",
    body: "A Jetson-based capture rig paired with a latent world-model training pipeline, built to learn navigation from demonstration rather than hand-written rules.",
    details: [
      "JEPA-style encoder, 32 latent tokens, AdaLN predictor",
      "Scene-disjoint splits after a 98.8% frame-overlap leak",
      "Validation gates for collapse, leakage and baselines",
    ],
    links: [{ label: "Write-up", href: "#contact" }],
  },
  {
    id: "repo-rfq-engine",
    eyebrow: "Systems",
    title: "Repo RFQ engine",
    body: "A request-for-quote lifecycle service for repo — securities financing. A client raises a quote request against collateral, dealers compete on price, and accepting the best quote books a trade with its cash legs computed exactly.",
    details: [
      "Exactly-once execution under concurrent acceptance",
      "Integer minor units and basis points — no float drift",
      "91% domain coverage, CI under the race detector",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/Sontran0118/repo-rfq-engine",
      },
    ],
  },
  {
    id: "leetlang",
    eyebrow: "Product",
    title: "Leet Lang",
    body: "An IELTS preparation platform with an automated writing-feedback pipeline. Transformer-based grammar correction wired into a serving path that returns feedback fast enough to feel interactive.",
    details: [
      "Next.js and TypeScript on a cloud-native stack",
      "Single-table DynamoDB design behind REST APIs",
      "800M-parameter T5 for academic paraphrasing",
    ],
    links: [{ label: "Visit", href: "https://leetlang.com" }],
  },
];

export const capabilities: { title: string; items: string[] }[] = [
  {
    title: "Languages",
    items: ["Go", "C", "C++", "Python", "TypeScript", "MIPS Assembly", "Java"],
  },
  {
    title: "Systems",
    items: [
      "Operating systems",
      "Filesystems",
      "Network protocols",
      "CUDA",
      "Concurrency",
    ],
  },
  {
    title: "Machine learning",
    items: [
      "World models",
      "Imitation learning",
      "V-JEPA",
      "Grammar correction",
      "PyTorch",
    ],
  },
  {
    title: "Web",
    items: [
      "React",
      "Next.js",
      "Angular",
      "Node.js",
      "PostgreSQL",
      "MySQL",
      "REST APIs",
    ],
  },
];

export type Project = {
  name: string;
  description: string;
  tags: string[];
  category: "AI & Robotics" | "Systems & Low-Level" | "Full-Stack Web";
  url?: string;
  isPrivate?: boolean;
};

export const projects: Project[] = [
  {
    name: "repo-rfq-engine",
    description:
      "RFQ lifecycle engine for repo in Go and MySQL with an Angular blotter. Exactly-once trade execution under concurrent acceptance.",
    tags: ["Go", "MySQL", "Angular", "Concurrency"],
    category: "Full-Stack Web",
    url: "https://github.com/Sontran0118/repo-rfq-engine",
  },
  {
    name: "fsd-bike",
    description:
      "Autonomous campus bike: Jetson data collector paired with a V-JEPA imitation-learning pipeline.",
    tags: ["Python", "Jetson", "Imitation Learning"],
    category: "AI & Robotics",
    isPrivate: true,
  },
  {
    name: "cuda-kernels-from-scratch",
    description:
      "Hand-written CUDA kernels built to learn GPU parallel-programming fundamentals from first principles.",
    tags: ["CUDA", "C++", "GPU"],
    category: "Systems & Low-Level",
    url: "https://github.com/Sontran0118/cuda-kernels-from-scratch",
  },
  {
    name: "pcie-tlp-protocol",
    description:
      "PCIe Transaction Layer Packet protocol: packet framing and transaction-layer logic in C++.",
    tags: ["C++", "Hardware Protocols"],
    category: "Systems & Low-Level",
    url: "https://github.com/Sontran0118/pcie-tlp-protocol",
  },
  {
    name: "linux-filesystem",
    description:
      "Disk-backed Unix-style filesystem with i-nodes, data blocks and bitmap allocation, plus core utilities.",
    tags: ["C++", "Operating Systems"],
    category: "Systems & Low-Level",
    url: "https://github.com/Sontran0118/linux-filesystem",
  },
  {
    name: "C-Multiplayer-Poker-Server",
    description:
      "Concurrent Texas Hold'em server handling many simultaneous clients over TCP sockets with multithreading.",
    tags: ["C", "Networking", "Concurrency"],
    category: "Systems & Low-Level",
    url: "https://github.com/Sontran0118/C-Multiplayer-Poker-Server",
  },
  {
    name: "AFLENT-Network-Protocol-Implementation",
    description:
      "Custom network protocol covering framing, reliability and transport logic.",
    tags: ["C++", "Networking"],
    category: "Systems & Low-Level",
    url: "https://github.com/Sontran0118/AFLENT-Network-Protocol-Implementation",
  },
  {
    name: "MIPS-Red-Black-Tree",
    description:
      "Red-black tree implemented directly in MIPS assembly, including rebalancing.",
    tags: ["Assembly", "Data Structures"],
    category: "Systems & Low-Level",
    url: "https://github.com/Sontran0118/MIPS-Red-Black-Tree",
  },
  {
    name: "playlister",
    description:
      "Full-stack playlist platform with authentication, undo/redo transactions and real-time collaboration.",
    tags: ["React", "Express", "MongoDB"],
    category: "Full-Stack Web",
    url: "https://github.com/Sontran0118/playlister",
  },
  {
    name: "disconnect-four-solver",
    description:
      "Connect-Four engine with a search-based AI opponent in C++.",
    tags: ["C++", "Algorithms", "Game AI"],
    category: "AI & Robotics",
    url: "https://github.com/Sontran0118/disconnect-four-solver",
  },
  {
    name: "ieltsplatform",
    description:
      "AI-assisted IELTS preparation platform with an automated grading pipeline and grammar-correction models.",
    tags: ["TypeScript", "NLP"],
    category: "AI & Robotics",
    isPrivate: true,
  },
  {
    name: "trusttrace",
    description:
      "Review platform for e-commerce brands, built around short video reviews.",
    tags: ["TypeScript", "Full-Stack"],
    category: "Full-Stack Web",
    isPrivate: true,
  },
];

export const navItems: Link[] = [
  { label: "Work", href: "#fsd-bike" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Index", href: "#index" },
  { label: "Contact", href: "#contact" },
];
