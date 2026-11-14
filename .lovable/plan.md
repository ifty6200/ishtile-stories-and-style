# ISHTILE mobile homepage and Collection page

## Outcome
Bring the mobile homepage closer to the supplied ISHTILE reference and use the uploaded scroll-gallery design on the existing Collection page. Keep the current shopping flow and Collection navigation intact.

## Work
- Make the mobile home hero fill the viewport behind the existing header, retain its current image and headline, and add the reference’s curved cream transition and clear slide controls.
- Keep the existing product and brand content; arrange the mobile footer as a compact wordmark/social row with a lime newsletter strip before it.
- Replace the Collection page’s static cards with a full-screen, scroll-pinned image gallery using the existing local collection artwork and slide titles from the uploaded reference.
- Preserve a readable, usable layout with reduced-motion support and the Collection header link.
- Add the missing `build:dev` script because the preview build monitor currently reports it unavailable.

## Technical details
Use the project’s existing Next.js route and CSS conventions; use GSAP ScrollTrigger for the uploaded scroll-gallery motion, with cleanup and reduced-motion fallback. Keep image assets local. Avoid changes to customer data, roles, or payment flows.

## Verification
Check the home and Collection pages at mobile and desktop sizes, verify the Collection navigation and slide sequence, review preview/build diagnostics, and run the existing storefront browser tests if the local runner is available.
