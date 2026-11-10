# ISHTILE Fashion Marketplace

## Goal
Build the uploaded ISHTILE brief as a cohesive, responsive multi-brand fashion marketplace, using the supplied reference image as the primary visual guide. Keep the first screen an actual storefront, not a marketing placeholder.

## Experience
- Establish the requested archive-cream, ink-black, and selective lime/blue/violet palette; oversized editorial typography; fashion photography; asymmetric magazine compositions; and restrained four-point-star graphics.
- Build a shared responsive navigation, search, cart drawer, footer, and reusable product/brand/editorial presentations.
- Provide the requested storefront areas: homepage, shop and product detail, brands and brand storefronts, collections, editorial and articles, wishlist, cart, checkout, account, about, contact, FAQ, and shipping/returns.
- Seed realistic demo brands and products; make catalog discovery, product variants, sorting/filtering, wishlist, cart quantity/removal, newsletter validation, and checkout review interactive.
- Keep checkout payment integration-ready without pretending to process a real payment. Keep admin tools out of the customer-facing experience.
- Use Lovable Cloud for persistent customer data and authentication where available; never store privileged roles in browser storage.
- Add subtle, reduced-motion-aware entrances and image/button feedback, with CSS transitions rather than adding an animation library for simple motion.

## Implementation
1. Replace the blank `/` page with the complete editorial homepage and establish shared tokens, fonts, and shell.
2. Add the shopping and discovery pages, shared catalog data/types, and usable search/filter/sort/product-selection interactions.
3. Add persistent wishlist/cart/customer flows and the Cloud-backed data/auth pieces required by the brief; do not add payment processing.
4. Complete informational/editorial routes and mobile layouts, then verify routes, key interactions, responsive rendering, tests, and preview diagnostics.

## Acceptance checks
- `/` is a real ISHTILE homepage, matching the reference's cream/black/lime editorial language and using fashion imagery.
- Every route linked in navigation or key calls to action exists and has unique page metadata.
- Product-to-brand association, BDT pricing, size/color selection, and cart/wishlist behavior are coherent and usable.
- Newsletter and checkout present honest validation/status, with no false claim of successful subscription/payment.
- Main flows remain usable on narrow screens and respect reduced-motion preferences.
