/**
 * Procedural road point cloud.
 *
 * Generates the scene as flat Float32Arrays ready for a BufferGeometry. Kept
 * pure and seeded so the layout is identical on every load and between server
 * and client — a Math.random() scene would shift on each render and flicker on
 * hydration.
 *
 * Coordinates follow the usual driving convention: +X is right of the vehicle,
 * +Y is up, and the road recedes toward -Z.
 */

export type PointCloud = {
  positions: Float32Array;
  /** Per-point brightness in 0..1, consumed as a shader attribute. */
  intensities: Float32Array;
  /** Per-point drift phase so points shimmer out of step with each other. */
  phases: Float32Array;
  count: number;
};

/** Mulberry32 — small, fast, good enough for scattering points. */
function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const ROAD = {
  /** Nearest and furthest Z the cloud spans. */
  zNear: 24,
  zFar: -320,
  /** Half-width of the driving surface. */
  halfWidth: 7.2,
  laneOffset: 3.6,
  shoulder: 4.0,
  markerSpacing: 18,
} as const;

type Emit = (x: number, y: number, z: number, intensity: number) => void;

function surface(emit: Emit, random: () => number, count: number): void {
  const span = ROAD.zNear - ROAD.zFar;
  for (let i = 0; i < count; i += 1) {
    // Bias sampling toward the camera so near ground reads as solid while the
    // far field stays sparse. Squaring a uniform does that cheaply.
    const t = random() ** 2;
    const z = ROAD.zNear - t * span;
    const x = (random() * 2 - 1) * ROAD.halfWidth;
    const y = (random() - 0.5) * 0.05;
    const crown = -((x / ROAD.halfWidth) ** 2) * 0.06;
    emit(x, y + crown, z, 0.16 + random() * 0.12);
  }
}

function laneLine(
  emit: Emit,
  random: () => number,
  x: number,
  dashed: boolean,
  pointsPerMetre: number,
): void {
  const dashLength = 3.0;
  const gapLength = 6.0;
  for (let z = ROAD.zNear; z > ROAD.zFar; z -= 1 / pointsPerMetre) {
    if (dashed) {
      const cycle = (ROAD.zNear - z) % (dashLength + gapLength);
      if (cycle > dashLength) continue;
    }
    const jitter = (random() - 0.5) * 0.06;
    emit(x + jitter, 0.012, z, 0.85 + random() * 0.15);
  }
}

function shoulders(emit: Emit, random: () => number, count: number): void {
  const span = ROAD.zNear - ROAD.zFar;
  for (let i = 0; i < count; i += 1) {
    const t = random() ** 1.6;
    const z = ROAD.zNear - t * span;
    const side = random() < 0.5 ? -1 : 1;
    const x =
      side * (ROAD.halfWidth + random() * ROAD.shoulder);
    const y = (random() - 0.4) * 0.3;
    emit(x, y, z, 0.1 + random() * 0.1);
  }
}

/** Vertical posts along the verge — the main source of forward parallax. */
function markers(emit: Emit, random: () => number): void {
  const x0 = ROAD.halfWidth + ROAD.shoulder + 0.6;
  for (let z = ROAD.zNear; z > ROAD.zFar; z -= ROAD.markerSpacing) {
    for (const side of [-1, 1]) {
      const x = side * (x0 + random() * 0.3);
      const height = 1.5 + random() * 0.5;
      const steps = 14;
      for (let s = 0; s < steps; s += 1) {
        const y = (s / steps) * height;
        // Brighten the reflector band near the top of each post.
        const reflector = y > height * 0.72 ? 0.95 : 0.3;
        emit(x, y, z, reflector * (0.8 + random() * 0.2));
      }
    }
  }
}

/** Sparse far-field terrain so the horizon is not an empty void. */
function terrain(emit: Emit, random: () => number, count: number): void {
  const span = ROAD.zNear - ROAD.zFar;
  for (let i = 0; i < count; i += 1) {
    const z = ROAD.zNear - random() * span;
    const side = random() < 0.5 ? -1 : 1;
    const x = side * (12 + random() * 52);
    const y = (random() - 0.3) * 1.2;
    emit(x, y, z, 0.05 + random() * 0.07);
  }
}

export function buildRoadCloud(seed = 20260911): PointCloud {
  const random = rng(seed);
  const xs: number[] = [];
  const ys: number[] = [];
  const zs: number[] = [];
  const intensity: number[] = [];

  const emit: Emit = (x, y, z, i) => {
    xs.push(x);
    ys.push(y);
    zs.push(z);
    intensity.push(i);
  };

  surface(emit, random, 26000);
  laneLine(emit, random, 0, true, 7);
  laneLine(emit, random, -ROAD.laneOffset, false, 5);
  laneLine(emit, random, ROAD.laneOffset, false, 5);
  shoulders(emit, random, 7000);
  markers(emit, random);
  terrain(emit, random, 5200);

  const count = xs.length;
  const positions = new Float32Array(count * 3);
  const intensities = new Float32Array(count);
  const phases = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = xs[i];
    positions[i * 3 + 1] = ys[i];
    positions[i * 3 + 2] = zs[i];
    intensities[i] = intensity[i];
    phases[i] = random() * Math.PI * 2;
  }

  return { positions, intensities, phases, count };
}
