# Finish the ISHTILE Storefront

## Goal
Replace the remaining blank preview with the requested editorial fashion marketplace, preserving the existing ISHTILE identity, Cloud data, and customer-account foundations.

## Scope
- Build the homepage and shared shell from the supplied reference: branded navigation, search, bag/wishlist affordances, footer, editorial imagery, brand discovery, collections, newsletter, and responsive mobile presentation.
- Implement the requested catalog, product, brand, collection, journal, wishlist, cart, checkout-review, account, and informational pages with working links and page-specific metadata.
- Connect shopping/customer actions to the existing Cloud schema and session/profile flow. Checkout records a reviewable order only; do not process payments or invent admin features.
- Preserve token-based styling and reduced-motion accessibility; use existing project dependencies and UI primitives.

## Delivery steps
1. Implement shared storefront layout and homepage using the supplied campaign assets and existing Cloud catalog hooks.
2. Add reusable product/brand/editorial presentations and the discovery/detail routes with search, filters, sorting, variants, wishlist, and cart interactions.
3. Complete customer, newsletter, checkout-review, and informational flows using existing auth/data structures.
4. Verify route matching, mobile and desktop presentation, core shopping interactions, tests, and preview diagnostics; update the roadmap and commit.

## Technical details
- Keep the TanStack Start file-based route structure and reusable storefront code under `src/components/storefront/` and `src/routes/`.
- Use the generated Cloud client and existing database schema; no migration or payment integration is in scope.
- Add unique leaf-route titles, descriptions, Open Graph, and Twitter metadata.
- Maintain semantic design tokens, the selected ISHTILE palette and typography, and reduced-motion behavior.
