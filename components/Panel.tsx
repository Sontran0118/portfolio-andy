"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One full-viewport scroll-snapped panel — the Tesla homepage unit.
 *
 * Copy sits at the top, actions at the bottom, and the middle is left empty so
 * the point cloud behind it is the thing you actually look at. Content fades up
 * once the panel enters the viewport.
 */

type PanelProps = {
  id: string;
  children: React.ReactNode;
  /** Pin actions to the bottom edge. Off for text-dense panels that scroll. */
  spread?: boolean;
  /**
   * Lay a dark wash over the scene behind this panel. Needed wherever small
   * body text sits on top of the cloud — the converging lane lines are the
   * brightest thing in the render and cut straight through a line of 14px
   * copy otherwise.
   */
  scrim?: boolean;
  className?: string;
};

export function Panel({
  id,
  children,
  spread = true,
  scrim = false,
  className = "",
}: PanelProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // One-shot: once a panel has been revealed, keep it revealed rather
          // than re-animating every time it scrolls back past.
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative flex min-h-[100svh] snap-start flex-col items-center ${
        spread ? "justify-between" : "justify-center"
      } px-5 py-20 sm:px-8 ${className}`}
    >
      {scrim && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#08080a]/78 backdrop-blur-[2px]"
        />
      )}
      <div
        // `relative` is load-bearing: the scrim above is absolutely
        // positioned, so static content would paint underneath it.
        className={`relative flex w-full flex-1 flex-col ${
          spread ? "justify-between" : "justify-center"
        } transition-[opacity,transform] duration-[900ms] ease-out ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-5 opacity-0"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

export function PanelHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl pt-8 text-center sm:pt-12">
      {eyebrow && (
        <p className="mb-3 text-[11px] font-semibold tracking-[0.22em] text-white/50 uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="text-[clamp(2.2rem,6vw,4.1rem)] leading-[1.03] font-medium tracking-[-0.025em] text-white text-balance">
        {title}
      </h2>
      {body && (
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/65 sm:text-base">
          {body}
        </p>
      )}
    </div>
  );
}

export function PanelActions({
  children,
  details,
}: {
  children?: React.ReactNode;
  details?: string[];
}) {
  return (
    <div className="mx-auto w-full max-w-3xl pb-4">
      {details && details.length > 0 && (
        <ul className="mb-8 grid gap-x-8 gap-y-2 text-center text-[13px] text-white/55 sm:grid-cols-3 sm:text-left">
          {details.map((detail) => (
            <li
              key={detail}
              className="border-t border-white/12 pt-3 leading-snug"
            >
              {detail}
            </li>
          ))}
        </ul>
      )}
      {children && (
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          {children}
        </div>
      )}
    </div>
  );
}

export function Action({
  href,
  children,
  variant = "secondary",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
}) {
  const base =
    "inline-flex min-w-[15rem] items-center justify-center rounded-full px-10 py-3 text-[13px] font-medium tracking-[0.04em] uppercase transition-all duration-300";
  const styles =
    variant === "primary"
      ? "bg-white text-[#0b0b0d] hover:bg-white/88"
      : "border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:bg-white/12";

  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={`${base} ${styles}`}
    >
      {children}
    </a>
  );
}
