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
| `#autonomy` | End-to-end self-driving stack, with the demo clip |
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

## The mark

Two road edges converging on a vanishing point with the centre line dashing
between them — the same silhouette reads as a capital A. It comes out of the
point-cloud scene rather than being applied on top of it.

The geometry lives in three places and they must change together:
`components/Mark.tsx` (nav), `app/icon.svg` (modern browsers), and
`scripts/build-icons.py` (favicon + apple touch icon). The script draws the
mark with Pillow rather than rasterising the SVG, so the build needs no
cairo/rsvg toolchain:

```bash
python3 scripts/build-icons.py     # writes app/favicon.ico + app/apple-icon.png
```

It asserts the `.ico` really came out multi-size — Pillow derives every entry
by downsampling the image it is handed, so passing anything but the largest
render silently yields a single 16x16 entry.

## The portrait

`public/media/andy.jpg`, square-cropped to head-and-shoulders and served
through `next/image` with `sizes="112px"`. At DPR 2 that resolves to a 256px
WebP of about 4 KB.

## The demo clip

`components/DrivingDemo.tsx` renders the autonomy panel. The clip is 5.5 MB,
so it is never fetched on page load: `preload="none"` with no `<source>` until
an IntersectionObserver says the panel is on screen. A visitor who stops at the
hero pays 84 KB for the poster and nothing else. It then autoplays muted and
loops, with a pause control; under `prefers-reduced-motion: reduce` it holds on
the poster and waits to be played.

Re-encode from a source file with:

```bash
ffmpeg -i source.mp4 -an -c:v libx264 -crf 27 -preset slow \
  -pix_fmt yuv420p -vf scale=1280:-2 -movflags +faststart \
  public/media/driving-demo.mp4
ffmpeg -ss 3 -i source.mp4 -frames:v 1 -vf scale=1280:-2 -q:v 4 \
  public/media/driving-demo.jpg
```

Audio is stripped deliberately — the clip autoplays muted, so the track is dead
weight. A VP9 `.webm` was tried and came out *larger* than the h264 at matched
quality, so there is only the one encode.

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
