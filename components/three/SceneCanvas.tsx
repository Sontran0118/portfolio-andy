"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

import { RoadScene } from "./RoadScene";

/**
 * Fixed full-viewport canvas sitting behind the page content.
 *
 * Scroll and pointer are tracked into refs rather than React state: the scene
 * reads them inside useFrame, so a scroll event must not trigger a React
 * re-render. Writing them to state would re-render the tree on every pixel of
 * scroll and drop frames.
 */
export function SceneCanvas() {
  const progress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const onMotionChange = (event: MediaQueryListEvent) =>
      setReducedMotion(event.matches);
    motionQuery.addEventListener("change", onMotionChange);

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        progress.current =
          scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    setReady(true);

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 transition-opacity duration-1000 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      <Canvas
        camera={{ fov: 52, near: 0.1, far: 500, position: [0, 2.6, 6] }}
        dpr={[1, 2]}
        // The scene clears to an opaque colour below, so there is nothing to
        // blend with the page behind it — an opaque drawing buffer skips that
        // per-pixel compositing step.
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        // Render on demand would freeze the shimmer; this scene is always
        // animating, so leave the loop running but cap the pixel ratio above.
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <color attach="background" args={["#08080a"]} />
        <RoadScene progress={progress} pointer={pointer} />
      </Canvas>
      {/* Vignette and horizon wash, so type stays readable over the cloud. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(8,8,9,0.82)_100%)]" />
      {/* The horizon is the brightest band in the render and headings sit
          right on it. Washing the top half down protects every panel's copy
          without trimming it, and leaves the road itself untouched below. */}
      <div className="absolute inset-x-0 top-0 h-[52vh] bg-gradient-to-b from-[#08080a] via-[#08080a]/85 to-transparent" />
    </div>
  );
}
