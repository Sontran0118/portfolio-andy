import { Panel, PanelHeading } from "@/components/Panel";
import { projects, type Project } from "@/lib/content";

const ORDER: Project["category"][] = [
  "AI & Robotics",
  "Systems & Low-Level",
  "Full-Stack Web",
];

export function WorkIndex() {
  const grouped = ORDER.map((category) => ({
    category,
    items: projects.filter((project) => project.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <Panel id="index" spread={false} scrim className="!min-h-0 py-28">
      <PanelHeading eyebrow="Index" title="Everything else" />

      <div className="mx-auto mt-14 w-full max-w-5xl space-y-14">
        {grouped.map((group) => (
          <section key={group.category}>
            <h3 className="mb-5 text-[11px] font-semibold tracking-[0.2em] text-white/45 uppercase">
              {group.category}
            </h3>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {group.items.map((project) => {
                const Wrapper = project.url ? "a" : "div";
                return (
                  <li key={project.name}>
                    <Wrapper
                      {...(project.url
                        ? {
                            href: project.url,
                            target: "_blank",
                            rel: "noopener noreferrer",
                          }
                        : {})}
                      className={`group flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:gap-8 ${
                        project.url ? "transition-colors hover:bg-white/[0.04]" : ""
                      }`}
                    >
                      <div className="flex min-w-0 items-baseline gap-3 sm:w-[16rem] sm:shrink-0">
                        <span className="truncate font-mono text-[14px] text-white/90">
                          {project.name}
                        </span>
                        {project.isPrivate && (
                          <span className="shrink-0 rounded-full border border-white/20 px-2 py-0.5 text-[10px] tracking-wider text-white/45 uppercase">
                            Private
                          </span>
                        )}
                      </div>

                      <p className="min-w-0 flex-1 text-[14px] leading-relaxed text-white/60">
                        {project.description}
                      </p>

                      <div className="flex shrink-0 flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/8 px-2.5 py-0.5 text-[11px] text-white/55"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {project.url && (
                        <span
                          aria-hidden="true"
                          className="hidden shrink-0 text-white/30 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-white/70 sm:block"
                        >
                          →
                        </span>
                      )}
                    </Wrapper>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </Panel>
  );
}
