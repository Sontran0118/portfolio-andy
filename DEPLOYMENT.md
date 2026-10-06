# Deployment

The site is already deployed. This file records how it is wired, not how to
set it up from scratch.

## Current state

| | |
| --- | --- |
| Repo | `github.com/Sontran0118/portfolio-andy` |
| Host | Vercel, building on push to `main` |
| Primary domain | `www.andyhub.tech` — this is the URL printed on the resume |
| Also serving | `portfolio-andy.vercel.app`, `portfolio-andy-olive.vercel.app`, `portfolio-andy-git-main-sontran0118s-projects.vercel.app` |

Pushing to `main` updates all of the above, including `andyhub.tech`. There is
no staging step — treat a push as publishing.

## Deploying

```bash
git push origin main     # Vercel builds and promotes automatically
```

To check what is live:

```bash
curl -sI https://www.andyhub.tech | grep -i x-vercel
```

## A note on sxtdev.com

Earlier versions of this repo were written for `sxtdev.com`, and the package is
still named `sxtdev-portfolio`. That domain is registered but **not wired up**:
DNS returns `NXDOMAIN`, and there is no `CNAME` file here claiming it. It is not
on the current resume either. Nothing needs to be done about it; just do not
assume it resolves.

If it is ever pointed here, two things have to change together:

1. Add a `CNAME` file at the repo root containing `sxtdev.com`, and set the
   registrar's records to Vercel.
2. Nothing in `vite`/`next` config — this app is served from the domain root
   already, so no base-path change is required.

## Resume asset

`public/resume.pdf` is a copy of `~/Resume/main.pdf`. It is not generated at
build time, so re-copy it whenever the resume changes:

```bash
cp ~/Resume/main.pdf public/resume.pdf
```
