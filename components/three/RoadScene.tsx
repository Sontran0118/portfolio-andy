"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { ROAD, buildRoadCloud } from "./pointcloud";

const VERTEX_SHADER = /* glsl */ `
  attribute float intensity;
  attribute float phase;

  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uFadeNear;
  uniform float uFadeFar;

  varying float vAlpha;
  varying float vIntensity;

  void main() {
    vec3 shifted = position;

    // A slow lateral shimmer. Enough to read as live sensor data rather than
    // a static mesh, small enough that lane lines stay straight.
    shifted.x += sin(uTime * 0.6 + phase) * 0.012;
    shifted.y += cos(uTime * 0.45 + phase) * 0.010;

    vec4 mvPosition = modelViewMatrix * vec4(shifted, 1.0);
    float depth = -mvPosition.z;

    // Perspective size attenuation, clamped so near points do not bloom into
    // blobs when the camera glides close to the surface.
    float size = uSize * uPixelRatio * (18.0 / max(depth, 1.0));
    gl_PointSize = clamp(size, 0.6, 3.4);

    vAlpha = 1.0 - smoothstep(uFadeNear, uFadeFar, depth);
    vIntensity = intensity;

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColor;

  varying float vAlpha;
  varying float vIntensity;

  void main() {
    // Round the square point sprite and soften its edge.
    vec2 offset = gl_PointCoord - vec2(0.5);
    float radius = dot(offset, offset);
    if (radius > 0.25) discard;
    float edge = 1.0 - smoothstep(0.16, 0.25, radius);

    float alpha = vAlpha * edge * (0.25 + vIntensity * 0.75);
    if (alpha < 0.01) discard;

    gl_FragColor = vec4(uColor * (0.55 + vIntensity * 0.65), alpha);
  }
`;

type RoadSceneProps = {
  /** Live scroll progress in 0..1, read without re-rendering React. */
  progress: React.RefObject<number>;
  pointer: React.RefObject<{ x: number; y: number }>;
};

export function RoadScene({ progress, pointer }: RoadSceneProps) {
  const cloud = useMemo(() => buildRoadCloud(), []);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const smoothed = useRef(0);
  const pointerSmoothed = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(cloud.positions, 3));
    g.setAttribute("intensity", new THREE.BufferAttribute(cloud.intensities, 1));
    g.setAttribute("phase", new THREE.BufferAttribute(cloud.phases, 1));
    g.computeBoundingSphere();
    return g;
  }, [cloud]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 1.5 },
      uPixelRatio: { value: 1 },
      uFadeNear: { value: 90 },
      uFadeFar: { value: 260 },
      uColor: { value: new THREE.Color("#e8e6e1") },
    }),
    [],
  );

  useFrame((state, delta) => {
    const material = materialRef.current;
    if (material) {
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uPixelRatio.value = Math.min(
        state.gl.getPixelRatio(),
        2,
      );
    }

    // Critically damped follow rather than a raw assignment, so a flung
    // scrollbar eases the camera instead of snapping it.
    const target = progress.current ?? 0;
    const ease = 1 - Math.exp(-delta * 3.2);
    smoothed.current += (target - smoothed.current) * ease;

    const p = pointer.current ?? { x: 0, y: 0 };
    pointerSmoothed.current.x += (p.x - pointerSmoothed.current.x) * ease;
    pointerSmoothed.current.y += (p.y - pointerSmoothed.current.y) * ease;

    // Glide forward through the cloud across the whole page, and dip the
    // camera slightly toward the surface as it goes.
    const travel = ROAD.zNear - 18 - smoothed.current * 210;
    state.camera.position.z = travel;
    state.camera.position.y = 2.6 - smoothed.current * 0.9;
    state.camera.position.x = pointerSmoothed.current.x * 1.1;

    state.camera.lookAt(
      pointerSmoothed.current.x * 2.2,
      1.0 - pointerSmoothed.current.y * 0.6,
      travel - 60,
    );
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
