import { Panel, PanelHeading } from "@/components/Panel";
import { capabilities } from "@/lib/content";

export function Capabilities() {
  return (
    <Panel id="capabilities" spread={false} scrim>
      <PanelHeading
        eyebrow="Capabilities"
        title="What I work in"
        body="Grouped by where it actually gets used, not ranked by a number I made up about myself."
      />

      <div className="mx-auto mt-14 grid w-full max-w-5xl gap-px overflow-hidden rounded-2xl border border-white/12 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((group) => (
          <div
            key={group.title}
            className="bg-[#0b0b0d]/75 p-6 backdrop-blur-sm sm:p-7"
          >
            <h3 className="mb-4 text-[11px] font-semibold tracking-[0.2em] text-white/50 uppercase">
              {group.title}
            </h3>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item} className="text-[14px] text-white/80">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Panel>
  );
}
