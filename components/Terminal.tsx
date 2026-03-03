'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface OutputLine {
  type: 'command' | 'response' | 'error' | 'system' | 'ascii';
  content: string;
}

interface Project {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics: string[];
  stargazers_count: number;
}

const ASCII_LOGO = `
 █████╗ ███╗   ██╗██████╗ ██╗   ██╗    ████████╗██████╗  █████╗ ███╗   ██╗
██╔══██╗████╗  ██║██╔══██╗╚██╗ ██╔╝    ╚══██╔══╝██╔══██╗██╔══██╗████╗  ██║
███████║██╔██╗ ██║██║  ██║ ╚████╔╝        ██║   ██████╔╝███████║██╔██╗ ██║
██╔══██║██║╚██╗██║██║  ██║  ╚██╔╝         ██║   ██╔══██╗██╔══██║██║╚██╗██║
██║  ██║██║ ╚████║██████╔╝   ██║          ██║   ██║  ██║██║  ██║██║ ╚████║
╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝    ╚═╝          ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
`;

const WELCOME_MESSAGE = `
Welcome to Andy Tran's Portfolio Terminal v1.0.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Software Engineer | Systems Programmer | Backend Engineer
Based in New York City · Actively seeking opportunities

Type 'help' to see available commands.
`;

const HELP_TEXT = `
┌──────────────────────────────────────────────────────────┐
│                    AVAILABLE COMMANDS                      │
├──────────────────────────────────────────────────────────┤
│  about       - Learn more about me                        │
│  skills      - View my technical skills                   │
│  projects    - Browse my GitHub projects                  │
│  contact     - Get my contact information                 │
│  resume      - Download my resume                         │
│  social      - View my social links                       │
│  clear       - Clear the terminal                         │
│  theme       - Toggle terminal theme (green/amber/cyan)   │
│  matrix      - Toggle matrix rain effect                  │
│  help        - Show this help message                     │
│  neofetch    - Display system info (just for fun)         │
└──────────────────────────────────────────────────────────┘

Tip: Press Tab to autocomplete commands, ↑/↓ for history
`;

const ABOUT_TEXT = `
┌─────────────────────────────────────────────────────────────────────────┐
│                              ABOUT ME                                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  I'm a software engineer with a passion for systems programming and      │
│  backend development. My expertise spans low-level programming in        │
│  C/C++ and Assembly, full-stack web development, and building robust,    │
│  scalable systems.                                                        │
│                                                                           │
│  I specialize in:                                                         │
│  → Networking & Protocol Implementation                                   │
│  → Algorithms & Data Structures                                           │
│  → Systems-level Programming                                              │
│  → Creating efficient solutions to complex technical challenges           │
│                                                                           │
│  Currently based in New York City and actively seeking opportunities     │
│  where I can contribute to challenging engineering problems.              │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
`;

const SKILLS_TEXT = `
┌─────────────────────────────────────────────────────────────────────────┐
│                           TECHNICAL SKILLS                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  [SYSTEMS]                                                                │
│  ├── C/C++           ████████████████████████████░░  95%                 │
│  ├── Assembly/MIPS   ██████████████████████░░░░░░░░  75%                 │
│  └── Linux           █████████████████████████░░░░░  85%                 │
│                                                                           │
│  [BACKEND]                                                                │
│  ├── Node.js         █████████████████████████████░  95%                 │
│  ├── Express         █████████████████████████░░░░░  85%                 │
│  └── MongoDB         ██████████████████████░░░░░░░░  75%                 │
│                                                                           │
│  [FRONTEND]                                                               │
│  ├── React           █████████████████████████████░  95%                 │
│  ├── Next.js         ████████████████████████░░░░░░  80%                 │
│  └── TypeScript      █████████████████████████░░░░░  85%                 │
│                                                                           │
│  [TOOLS & OTHER]                                                          │
│  ├── Git             █████████████████████████████░  95%                 │
│  ├── Networking      █████████████████████████░░░░░  85%                 │
│  └── Protocol Impl.  ████████████████████████░░░░░░  80%                 │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
`;

const CONTACT_TEXT = `
┌─────────────────────────────────────────────────────────────────────────┐
│                              CONTACT                                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  📍 Location:    New York City, NY                                        │
│                                                                           │
│  🔗 LinkedIn:    linkedin.com/in/sontran0118                              │
│                  → Run 'open linkedin' to visit                           │
│                                                                           │
│  💻 GitHub:      github.com/Sontran0118                                   │
│                  → Run 'open github' to visit                             │
│                                                                           │
│  I'm actively seeking new opportunities!                                  │
│  Let's connect and discuss how I can contribute to your team.             │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
`;

const SOCIAL_TEXT = `
┌───────────────────────────────────────────────────────────┐
│                      SOCIAL LINKS                            │
├───────────────────────────────────────────────────────────┤
│                                                             │
│  [1] GitHub     → github.com/Sontran0118                    │
│  [2] LinkedIn   → linkedin.com/in/sontran0118               │
│                                                             │
│  Use 'open github' or 'open linkedin' to visit              │
│                                                             │
└───────────────────────────────────────────────────────────┘
`;

const NEOFETCH_TEXT = `
                   andy@portfolio
     ████████      ─────────────────────
   ██        ██    OS: Portfolio Terminal v1.0
  ██  ▄▄▄▄▄▄  ██   Host: Next.js 14 / Vercel
  ██  ██████  ██   Kernel: React 18
  ██  ██████  ██   Shell: TypeScript/TSX
  ██  ▀▀▀▀▀▀  ██   Resolution: Responsive
   ██        ██    Theme: Cyber Green
     ████████      Terminal: Custom CLI
                   CPU: Your Browser @ ∞GHz
                   Memory: Efficient
                   
                   ██ ██ ██ ██ ██ ██ ██ ██
`;

const AVAILABLE_COMMANDS = [
  'help', 'about', 'skills', 'projects', 'contact', 
  'resume', 'social', 'clear', 'theme', 'matrix', 
  'neofetch', 'open', 'whoami', 'ls', 'pwd', 'cat'
];

export function Terminal() {
  const [output, setOutput] = useState<OutputLine[]>([
    { type: 'ascii', content: ASCII_LOGO },
    { type: 'system', content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [theme, setTheme] = useState<'green' | 'amber' | 'cyan'>('green');
  const [matrixEnabled, setMatrixEnabled] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Fetch projects on mount
  useEffect(() => {
    fetch('https://api.github.com/users/Sontran0118/repos?sort=updated&per_page=8')
      .then(res => res.json())
      .then(data => {
        const featured = [
          'playlister', 'C-Multiplayer-Poker-Server', 'mips-game-solver',
          'pcie-tlp-protocol', 'disconnect-four-solver', 'disconnect-four-game', 'linux-filesystem'
        ];
        const sorted = data.sort((a: Project, b: Project) => {
          const aIndex = featured.indexOf(a.name);
          const bIndex = featured.indexOf(b.name);
          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          return 0;
        });
        setProjects(sorted);
      })
      .catch(() => setProjects([]));
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Focus input on click
  const focusInput = () => inputRef.current?.focus();

  const themeColors = {
    green: { text: 'text-green-400', glow: 'shadow-green-500/50', border: 'border-green-500/30', bg: 'bg-green-500' },
    amber: { text: 'text-amber-400', glow: 'shadow-amber-500/50', border: 'border-amber-500/30', bg: 'bg-amber-500' },
    cyan: { text: 'text-cyan-400', glow: 'shadow-cyan-500/50', border: 'border-cyan-500/30', bg: 'bg-cyan-500' },
  };

  const currentTheme = themeColors[theme];

  const generateProjectsOutput = () => {
    if (projects.length === 0) {
      return 'Loading projects... Try again in a moment.';
    }

    let output = `
┌─────────────────────────────────────────────────────────────────────────┐
│                           GITHUB PROJECTS                                  │
├─────────────────────────────────────────────────────────────────────────┤
`;
    projects.forEach((project, index) => {
      const stars = project.stargazers_count > 0 ? ` ★${project.stargazers_count}` : '';
      const lang = project.language ? `[${project.language}]` : '';
      output += `│                                                                           │
│  [${index + 1}] ${project.name.padEnd(35)} ${lang.padEnd(15)}${stars.padStart(5)}   │
│      ${(project.description || 'No description').slice(0, 60).padEnd(60)}     │`;
    });
    output += `
│                                                                           │
│  Use 'open project <number>' to view on GitHub                            │
│  Example: open project 1                                                  │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘`;
    return output;
  };

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = trimmedCmd.split(' ');
    const mainCmd = parts[0];
    const args = parts.slice(1);

    // Add command to output
    setOutput(prev => [...prev, { type: 'command', content: `visitor@andy-tran:~$ ${cmd}` }]);

    // Add to history
    if (cmd.trim()) {
      setHistory(prev => [...prev, cmd]);
      setHistoryIndex(-1);
    }

    // Process command
    let response: OutputLine;

    switch (mainCmd) {
      case 'help':
        response = { type: 'response', content: HELP_TEXT };
        break;
      case 'about':
        response = { type: 'response', content: ABOUT_TEXT };
        break;
      case 'skills':
        response = { type: 'response', content: SKILLS_TEXT };
        break;
      case 'projects':
        response = { type: 'response', content: generateProjectsOutput() };
        break;
      case 'contact':
        response = { type: 'response', content: CONTACT_TEXT };
        break;
      case 'social':
        response = { type: 'response', content: SOCIAL_TEXT };
        break;
      case 'resume':
        response = { type: 'response', content: '\n📄 Resume download initiated...\n(Resume functionality can be configured)\n' };
        break;
      case 'clear':
        setOutput([]);
        return;
      case 'theme':
        const themes: Array<'green' | 'amber' | 'cyan'> = ['green', 'amber', 'cyan'];
        const currentIndex = themes.indexOf(theme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        setTheme(nextTheme);
        response = { type: 'system', content: `\n✓ Theme changed to ${nextTheme.toUpperCase()}\n` };
        break;
      case 'matrix':
        setMatrixEnabled(!matrixEnabled);
        response = { type: 'system', content: `\n✓ Matrix effect ${!matrixEnabled ? 'enabled' : 'disabled'}\n` };
        break;
      case 'neofetch':
        response = { type: 'response', content: NEOFETCH_TEXT };
        break;
      case 'whoami':
        response = { type: 'response', content: '\nvisitor\n' };
        break;
      case 'pwd':
        response = { type: 'response', content: '\n/home/visitor/andy-tran-portfolio\n' };
        break;
      case 'ls':
        response = { type: 'response', content: '\nabout.txt  skills.json  projects/  contact.md  resume.pdf\n' };
        break;
      case 'cat':
        if (args[0] === 'about.txt') {
          response = { type: 'response', content: ABOUT_TEXT };
        } else {
          response = { type: 'error', content: `\ncat: ${args[0] || 'file'}: No such file or directory\nTry: cat about.txt\n` };
        }
        break;
      case 'open':
        if (args[0] === 'github') {
          window.open('https://github.com/Sontran0118', '_blank');
          response = { type: 'system', content: '\n✓ Opening GitHub in new tab...\n' };
        } else if (args[0] === 'linkedin') {
          window.open('https://www.linkedin.com/in/sontran0118/', '_blank');
          response = { type: 'system', content: '\n✓ Opening LinkedIn in new tab...\n' };
        } else if (args[0] === 'project' && args[1]) {
          const projectIndex = parseInt(args[1]) - 1;
          if (projects[projectIndex]) {
            window.open(projects[projectIndex].html_url, '_blank');
            response = { type: 'system', content: `\n✓ Opening ${projects[projectIndex].name} on GitHub...\n` };
          } else {
            response = { type: 'error', content: '\nInvalid project number. Run "projects" to see available projects.\n' };
          }
        } else {
          response = { type: 'error', content: '\nUsage: open <github|linkedin|project <number>>\n' };
        }
        break;
      case '':
        return;
      default:
        response = { 
          type: 'error', 
          content: `\nCommand not found: ${mainCmd}\nType 'help' to see available commands.\n` 
        };
    }

    setOutput(prev => [...prev, response]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = AVAILABLE_COMMANDS.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setOutput(prev => [...prev, 
          { type: 'command', content: `visitor@andy-tran:~$ ${input}` },
          { type: 'system', content: `\nPossible commands: ${matches.join(', ')}\n` }
        ]);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setOutput([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Matrix rain effect */}
      {matrixEnabled && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className={`absolute ${currentTheme.text} text-xs font-mono animate-matrix`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {Array.from({ length: 20 }).map((_, j) => (
                <div key={j}>{String.fromCharCode(0x30A0 + Math.random() * 96)}</div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-[0.03]" />
      
      {/* CRT glow effect */}
      <div className={`absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-black opacity-40`} />

      {/* Terminal Window */}
      <div 
        className={`w-full max-w-5xl bg-[#0d1117] rounded-lg border ${currentTheme.border} shadow-2xl ${currentTheme.glow} overflow-hidden backdrop-blur-sm`}
        onClick={focusInput}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer" />
          </div>
          <div className={`text-sm ${currentTheme.text} font-mono flex items-center gap-2`}>
            <span className={`w-2 h-2 rounded-full ${currentTheme.bg} animate-pulse`} />
            visitor@andy-tran:~
          </div>
          <div className="text-gray-500 text-xs font-mono">bash</div>
        </div>

        {/* Terminal Body */}
        <div 
          ref={terminalRef}
          className="h-[70vh] overflow-y-auto p-4 font-mono text-sm leading-relaxed custom-scrollbar"
        >
          {output.map((line, index) => (
            <div 
              key={index} 
              className={`whitespace-pre-wrap ${
                line.type === 'command' ? `${currentTheme.text} font-semibold` :
                line.type === 'error' ? 'text-red-400' :
                line.type === 'system' ? 'text-blue-400' :
                line.type === 'ascii' ? `${currentTheme.text} text-xs sm:text-sm` :
                'text-gray-300'
              }`}
            >
              {line.content}
            </div>
          ))}

          {/* Input Line */}
          <div className={`flex items-center ${currentTheme.text} mt-2`}>
            <span className="font-semibold">visitor@andy-tran:~$&nbsp;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-gray-100 caret-current"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            <span className={`w-2 h-5 ${currentTheme.bg} animate-blink ml-1`} />
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="px-4 py-2 bg-[#161b22] border-t border-gray-800 flex justify-between text-xs text-gray-500 font-mono">
          <span>Type 'help' for commands</span>
          <span>Theme: {theme.toUpperCase()} | Press Tab to autocomplete</span>
        </div>
      </div>
    </div>
  );
}
