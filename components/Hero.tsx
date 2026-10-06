import { Action, Panel, PanelActions } from "@/components/Panel";
import { profile } from "@/lib/content";

export function Hero() {
  return (
    <Panel id="top">
      <div className="mx-auto max-w-4xl pt-10 text-center sm:pt-16">
        <p className="mb-4 text-[11px] font-semibold tracking-[0.24em] text-white/50 uppercase">
          {profile.location}
        </p>
        <h1 className="text-[clamp(2.6rem,9vw,6.4rem)] leading-[0.98] font-medium tracking-[-0.035em] text-white">
          {profile.name}
        </h1>
        <p className="mt-4 text-[clamp(1.05rem,2.4vw,1.6rem)] font-light tracking-[-0.01em] text-white/75">
          {profile.title}
        </p>
        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-white/55">
          {profile.tagline}
        </p>
      </div>

      <PanelActions>
        <Action href="#fsd-bike" variant="primary">
          View work
        </Action>
        <Action href={profile.resumeUrl} external>
          Resume
        </Action>
      </PanelActions>
    </Panel>
  );
}
