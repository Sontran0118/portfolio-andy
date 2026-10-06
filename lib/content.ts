/**
 * Single source of truth for site copy.
 *
 * Ported from the current resume (~/Resume/main.tex, Oct 2026). Every figure
 * below appears there verbatim — if a number changes on the resume, change it
 * here too rather than letting the two drift.
 *
 * The phone number on the resume is deliberately not published here. It is
 * fine on a PDF someone was handed; it is not fine in page source that gets
 * scraped.
 */

export const profile = {
  name: "Andy Tran",
  title: "Systems & Autonomy Engineer",
  location: "New York, NY",
  tagline:
    "I work close to the metal — bare-metal firmware, control loops on a moving car, filesystems and protocols — and build the systems that sit on top of them.",
  email: "andytran1185@gmail.com",
  site: "https://www.andyhub.tech",
  github: "https://github.com/Sontran0118",
  linkedin: "https://www.linkedin.com/in/sontran0118/",
  resumeUrl: "/resume.pdf",
};

export const education = {
  school: "Stony Brook University",
  degree: "B.S. Computer Science",
  graduation: "Expected May 2027",
};

export type Link = { label: string; href: string };

export type Panel = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  /** Short factual detail lines. Every one is on the resume. */
  details: string[];
  links: Link[];
};

/**
 * Featured work, one full-viewport panel each — the Tesla homepage pattern.
 * The driving stack leads because the point-cloud scene has already set the
 * context by the time you reach it.
 */
export const panels: Panel[] = [
  {
    id: "autonomy",
    eyebrow: "Autonomy",
    title: "End-to-end self-driving stack",
    body: "A nine-layer control stack, from camera capture and TensorRT inference down through firmware to CAN, that steers and brakes a production car on public roads.",
    details: [
      "Lateral loop at 50–70 Hz, steering torque on CAN 0x243",
      "Bare-metal STM32F407 gate: 1.5 Mbaud UART, 2,325 CAN frames/s",
      "Traced a 99.8% packet-loss stall to a 16-instruction USB race",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/Sontran0118/End-To-End-Self-Driving",
      },
    ],
  },
  {
    id: "repo-rfq-engine",
    eyebrow: "Systems",
    title: "Repo RFQ engine",
    body: "A request-for-quote lifecycle service for securities financing. Two dealers can never double-book the same quote: row locks, state re-validation on accept, and a unique constraint as the backstop.",
    details: [
      "20 concurrent goroutines → exactly 1 trade, 19 clean rejections",
      "int64 minor units and integer basis points — no float drift",
      "91% coverage on an I/O-free domain layer",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/Sontran0118/repo-rfq-engine",
      },
    ],
  },
  {
    id: "filesystem-pcie",
    eyebrow: "Low-level",
    title: "Filesystem & PCIe transaction layer",
    body: "A disk-backed Unix filesystem in C — i-node allocation over a bitmap, direct and single-indirect addressing, full path traversal — alongside a bit-level PCIe transaction-layer packet parser in C++.",
    details: [
      "Complete file and directory API, verified by 50+ tests",
      "Byte-enable masking and tag-tracked outstanding reads",
      "Zero-copy over the caller's buffer: 10K packets in ~10 ms",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/Sontran0118/linux-filesystem",
      },
    ],
  },
  {
    id: "networked-systems",
    eyebrow: "Networking",
    title: "Protocol design & concurrent servers",
    body: "AFLENT, a transfer protocol built around a packed three-byte header — 6-bit array ID, 5-bit fragment, 10-bit length, three flags — parsed by bitmasking and reassembled correctly out of order.",
    details: [
      "64 concurrent transfers from out-of-order delivery",
      "Block cipher expanding a 64-bit key to 1024 bits of round state",
      "Texas Hold'em server multiplexing six players, non-blocking",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/Sontran0118/AFLENT-Network-Protocol-Implementation",
      },
    ],
  },
];

export const capabilities: { title: string; items: string[] }[] = [
  {
    title: "Languages",
    items: [
      "C",
      "C++",
      "Rust",
      "Python",
      "Java",
      "CUDA",
      "Go",
      "TypeScript",
      "SQL",
      "ARM / MIPS Assembly",
    ],
  },
  {
    title: "Embedded & automotive",
    items: [
      "STM32F4 bare-metal firmware",
      "CAN / CAN FD",
      "UDS diagnostics",
      "DBC",
      "DMA",
      "UART / SPI / USB",
      "Interrupts & timers",
      "SWD debugging",
      "Hardware-in-the-loop testing",
      "panda safety models",
    ],
  },
  {
    title: "Systems & AI/ML",
    items: [
      "Linux systems programming",
      "Real-time scheduling",
      "Concurrency",
      "POSIX sockets",
      "PCIe",
      "Protocol design",
      "PyTorch",
      "TensorRT",
      "tinygrad",
      "Jetson Orin",
      "Camera calibration",
      "Sensor fusion",
    ],
  },
  {
    title: "Web & cloud",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "AWS (Lambda, DynamoDB, S3)",
      "Docker",
      "CI/CD",
    ],
  },
];

export type Project = {
  name: string;
  description: string;
  tags: string[];
  category: "Autonomy & AI" | "Systems & Low-Level" | "Full-Stack Web";
  url?: string;
  isPrivate?: boolean;
};

export const projects: Project[] = [
  {
    name: "End-To-End-Self-Driving",
    description:
      "comma.ai's openpilot model on a Jetson Orin Nano driving a 2023 Mazda CX-5 through a DIY STM32F407 panda. Standalone monorepo.",
    tags: ["C", "C++", "CUDA", "STM32"],
    category: "Autonomy & AI",
    url: "https://github.com/Sontran0118/End-To-End-Self-Driving",
  },
  {
    name: "cuda-kernels-from-scratch",
    description:
      "Hand-written CUDA kernels built to learn GPU parallel-programming fundamentals from first principles.",
    tags: ["CUDA", "C++", "GPU"],
    category: "Autonomy & AI",
    url: "https://github.com/Sontran0118/cuda-kernels-from-scratch",
  },
  {
    name: "disconnect-four-solver",
    description:
      "Connect-Four engine with a search-based AI opponent in C++.",
    tags: ["C++", "Algorithms", "Game AI"],
    category: "Autonomy & AI",
    url: "https://github.com/Sontran0118/disconnect-four-solver",
  },
  {
    name: "repo-rfq-engine",
    description:
      "RFQ lifecycle engine for repo in Go and MySQL with an Angular blotter. Exactly-once execution under concurrent acceptance.",
    tags: ["Go", "MySQL", "Angular"],
    category: "Systems & Low-Level",
    url: "https://github.com/Sontran0118/repo-rfq-engine",
  },
  {
    name: "linux-filesystem",
    description:
      "Disk-backed Unix filesystem: i-node allocation over a bitmap, direct and single-indirect addressing, full path traversal.",
    tags: ["C", "Operating Systems"],
    category: "Systems & Low-Level",
    url: "https://github.com/Sontran0118/linux-filesystem",
  },
  {
    name: "pcie-tlp-protocol",
    description:
      "Bit-level PCIe Transaction Layer Packet parser with byte-enable masking and tag-based tracking of outstanding reads.",
    tags: ["C++", "Hardware Protocols"],
    category: "Systems & Low-Level",
    url: "https://github.com/Sontran0118/pcie-tlp-protocol",
  },
  {
    name: "AFLENT-Network-Protocol-Implementation",
    description:
      "Transfer protocol with a packed 3-byte header, reassembling 64 concurrent transfers from out-of-order delivery.",
    tags: ["C", "Sockets", "Protocol Design"],
    category: "Systems & Low-Level",
    url: "https://github.com/Sontran0118/AFLENT-Network-Protocol-Implementation",
  },
  {
    name: "C-Multiplayer-Poker-Server",
    description:
      "Texas Hold'em server multiplexing six players over POSIX sockets without blocking.",
    tags: ["C", "Networking", "Concurrency"],
    category: "Systems & Low-Level",
    url: "https://github.com/Sontran0118/C-Multiplayer-Poker-Server",
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
];

export const navItems: Link[] = [
  { label: "Work", href: "#autonomy" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Index", href: "#index" },
  { label: "Contact", href: "#contact" },
];
