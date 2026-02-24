interface Project {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics: string[];
  stargazers_count: number;
}

async function getGitHubProjects(): Promise<Project[]> {
  try {
    const res = await fetch(
      'https://api.github.com/users/Sontran0118/repos?sort=updated&per_page=8',
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    
    // Featured projects in priority order
    const featured = [
      'playlister',
      'C-Multiplayer-Poker-Server',
      'mips-game-solver',
      'pcie-tlp-protocol',
      'disconnect-four-solver',
      'disconnect-four-game',
      'linux-filesystem',
    ];

    // Sort by featured list, then by update date
    return data.sort((a: Project, b: Project) => {
      const aIndex = featured.indexOf(a.name);
      const bIndex = featured.indexOf(b.name);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return 0;
    });
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-white truncate pr-2">
          {project.name}
        </h3>
        {project.stargazers_count > 0 && (
          <span className="text-yellow-400 text-sm flex items-center gap-1">
            ★ {project.stargazers_count}
          </span>
        )}
      </div>
      
      <p className="text-gray-300 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
        {project.description || 'No description available'}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.language && (
          <span className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded text-xs font-medium">
            {project.language}
          </span>
        )}
        {project.topics.slice(0, 3).map((topic) => (
          <span
            key={topic}
            className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
          >
            {topic}
          </span>
        ))}
      </div>
      
      <a
        href={project.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
      >
        View on GitHub →
      </a>
    </div>
  );
}

export async function GitHubProjects() {
  const projects = await getGitHubProjects();

  return (
    <section className="py-16 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">Featured Projects</h2>
        <p className="text-gray-400 text-center mb-12">
          Showcasing my work in systems programming, algorithms, and full-stack development
        </p>
        
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">Loading projects...</p>
        )}
      </div>
    </section>
  );
}
