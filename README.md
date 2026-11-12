# Ishtile Stories And Style

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://ishtile-stories-and-style.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8642c494-4152-4605-ad68-5515c6f7dd3e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```


## Motion system

ISHTILE uses GSAP and `@gsap/react` for restrained editorial motion across all routes. The shared `MotionShell` registers ScrollTrigger once, scopes animations to the active route, and reverts timelines and triggers when the route changes or the component unmounts.

- Add a meaningful selector to `revealTargets` in `src/components/storefront/motion-shell.tsx` to opt a component into a scroll reveal.
- Keep reveals on component boundaries (cards, hero panels, section introductions), not every text node.
- Existing CSS hover and focus states remain lightweight; GSAP handles scroll reveals and entrance motion.
- The system respects `prefers-reduced-motion: reduce`; decorative motion is skipped and content remains visible.
- Mobile reveals use shorter travel distances, while hover motion is only enabled on devices with a fine pointer.
