import { Action, Panel, PanelActions, PanelHeading } from "@/components/Panel";
import { education, profile } from "@/lib/content";

export function Contact() {
  return (
    <Panel id="contact">
      <PanelHeading
        eyebrow="Contact"
        title="Let's talk"
        body="Open to software engineering roles where the hard part is the engineering. Fastest way to reach me is email."
      />

      <PanelActions>
        <Action href={`mailto:${profile.email}`} variant="primary">
          Email
        </Action>
        <Action href={profile.linkedin} external>
          LinkedIn
        </Action>
        <Action href={profile.github} external>
          GitHub
        </Action>
      </PanelActions>

      <footer className="mx-auto w-full max-w-3xl pt-10 text-center">
        <p className="text-[13px] text-white/55">
          {education.degree}, {education.school} · {education.graduation}
        </p>
        <p className="mt-3 text-[12px] text-white/35">
          © {new Date().getFullYear()} {profile.name} · Built with Next.js and
          three.js
        </p>
      </footer>
    </Panel>
  );
}
