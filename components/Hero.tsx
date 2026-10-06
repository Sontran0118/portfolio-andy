import Image from "next/image";

import { Action, Panel, PanelActions } from "@/components/Panel";
import { profile } from "@/lib/content";

export function Hero() {
  return (
    <Panel id="top">
      <div className="mx-auto max-w-4xl pt-6 text-center sm:pt-10">
        {/* `priority` because this is the first thing on the page — without it
            Next defers the fetch and the hero pops in a beat late. */}
        <Image
          src="/media/andy.jpg"
          alt={`Portrait of ${profile.name}`}
          width={640}
          height={640}
          priority
          sizes="112px"
          className="mx-auto mb-7 h-[92px] w-[92px] rounded-full object-cover shadow-[0_10px_40px_-12px_rgba(0,0,0,0.9)] ring-1 ring-white/20 sm:h-[112px] sm:w-[112px]"
        />

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
        <Action href="#autonomy" variant="primary">
          View work
        </Action>
        <Action href={profile.resumeUrl} external>
          Resume
        </Action>
      </PanelActions>
    </Panel>
  );
}
