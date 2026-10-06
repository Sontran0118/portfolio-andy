"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Action, Panel, PanelActions, PanelHeading } from "@/components/Panel";
import { panels } from "@/lib/content";

const POSTER = "/media/driving-demo.jpg";
const SOURCE = "/media/driving-demo.mp4";

const panel = panels.find((p) => p.id === "autonomy")!;

/**
 * The autonomy panel, with the road demo in place of the usual empty middle.
 *
 * The clip is 5.5 MB, so it is never fetched on page load — `preload="none"`
 * and no `<source>` until an IntersectionObserver says the panel is actually
 * on screen. Someone who never scrolls past the hero pays 84 KB for the
 * poster and nothing else.
 */
export function DrivingDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) =>
      setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const node = frameRef.current;
    if (!node || armed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [armed]);

  // Attaching a <source> to a mounted <video> needs an explicit load() before
  // the element will look at it.
  useEffect(() => {
    const video = videoRef.current;
    if (!armed || !video) return;
    video.load();
    if (reducedMotion) return;
    video.play().then(
      () => setPlaying(true),
      // Autoplay can still be refused (data saver, battery saver). The poster
      // stays up and the control below becomes the way in.
      () => setPlaying(false),
    );
  }, [armed, reducedMotion]);

  const toggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    } else {
      video.pause();
      setPlaying(false);
    }
  }, []);

  return (
    <Panel id={panel.id} className="!py-12">
      <PanelHeading
        eyebrow={panel.eyebrow}
        title={panel.title}
        body={panel.body}
        compact
      />

      <div className="mx-auto w-full max-w-xl py-4">
        <div
          ref={frameRef}
          className="group relative overflow-hidden rounded-xl border border-white/15 bg-black shadow-[0_24px_70px_-20px_rgba(0,0,0,0.9)]"
        >
          <video
            ref={videoRef}
            className="block aspect-video w-full object-cover"
            poster={POSTER}
            muted
            loop
            playsInline
            preload="none"
            aria-label="Dashboard view of the car steering itself on a public road"
          >
            {armed && <source src={SOURCE} type="video/mp4" />}
          </video>

          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause demo" : "Play demo"}
            className="absolute right-3 bottom-3 rounded-full border border-white/25 bg-black/55 px-4 py-1.5 text-[11px] font-medium tracking-[0.12em] text-white/85 uppercase backdrop-blur-sm transition-colors hover:bg-black/75 focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
          >
            {playing ? "Pause" : "Play"}
          </button>
        </div>

        <p className="mt-3 text-center text-[12px] text-white/45">
          2023 Mazda CX-5 · Jetson Orin Nano · DIY STM32F407 panda
        </p>
      </div>

      <PanelActions details={panel.details}>
        {panel.links.map((link) => (
          <Action key={link.href} href={link.href} variant="primary" external>
            {link.label}
          </Action>
        ))}
      </PanelActions>
    </Panel>
  );
}
