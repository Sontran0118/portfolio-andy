# andyhub.tech

Portfolio for Andy Tran — live at [andyhub.tech](https://www.andyhub.tech).
Full-viewport scroll panels over a live point-cloud scene rendered with
three.js.

Previously this repo was an interactive CLI terminal (ASCII panels, simulated
shell, self-rated skill bars). That build has been removed in favour of a
design where the work is the content and the scene is the only ornament.

## Stack

- Next.js 16 (App Router, static export of a single route)
- React 19, TypeScript, Tailwind v4
- three.js via @react-three/fiber

## Layout

Eight scroll-snapped panels, each a full viewport:

| Panel | Content |
| --- | --- |
| `#top` | Name, title, primary actions |
| `#autonomy` | End-to-end self-driving stack |
| `#repo-rfq-engine` | Repo RFQ lifecycle engine |
| `#filesystem-pcie` | Unix filesystem & PCIe transaction layer |
| `#networked-systems` | Protocol design & concurrent servers |
| `#capabilities` | What I work in, grouped by use |
| `#index` | Everything else, as a dense list |
| `#contact` | Email, LinkedIn, GitHub |

All copy lives in `lib/content.ts`, ported from the resume at
`~/Resume/main.tex`. Every figure on the site appears there verbatim — if a
number changes on the resume, change it here too rather than letting the two
drift. `public/resume.pdf` is a copy of that same build.

## The scene

`components/three/`:

- **`pointcloud.ts`** — builds a road as ~43k points: a sampled driving
  surface, dashed centre line and solid lane edges, verge posts for forward
  parallax, and sparse far-field terrain. Pure and seeded with Mulberry32, so
  the layout is byte-identical on every load. A `Math.random()` scene would
  shift between server and client and flicker on hydration.
- **`RoadScene.tsx`** — a single `THREE.Points` with a custom shader. The
  vertex stage does perspective size attenuation and a depth fade; the fragment
  stage rounds each sprite and weights it by a per-point intensity attribute.
  Camera travel is driven by scroll through a critically damped follow, so a
  flung scrollbar eases rather than snaps.
- **`SceneCanvas.tsx`** — fixed full-viewport canvas behind the content.
  Scroll and pointer are written to refs, never to React state: the scene reads
  them inside `useFrame`, and routing them through state would re-render the
  tree on every pixel of scroll.

### Two things worth knowing before you touch the CSS

**Do not set `background-color` on `body`.** `html` already carries it. Setting
it on both stops `body`'s background from propagating to the viewport, so
`body` paints its own opaque box — and that box lands *above* the `-z-10`
scene canvas in paint order. The symptom is a completely black scene while
WebGL happily reports a draw call and 43,014 points per frame.

**Panels with small body text need `scrim`.** The converging lane lines are the
brightest thing in the render and cut straight through 14px copy. `#index` and
`#capabilities` set it; the headline panels do not need it.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

`prefers-reduced-motion: reduce` switches the render loop to on-demand and
disables scroll smoothing.

## Deploy

Pushed to `main` → Vercel. See `DEPLOYMENT.md` for the custom-domain setup.
