import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";

const revealTargets = [
  ".ecosystem-copy",
  ".brand-collage",
  ".featured-products .section-heading",
  ".featured-product-card",
  ".shop-section .section-heading",
  ".product-card",
  ".category-card",
  ".collection-card",
  ".brands-intro",
  ".brand-card",
  ".editorial-feature",
  ".journal-head",
  ".journal-feature",
  ".article-card",
  ".newsletter",
  ".editorial-hero-copy",
  ".editorial-hero-image",
  ".editorial-story-card",
  ".product-main-image",
  ".product-information",
  ".product-breadcrumb",
  ".product-option",
  ".product-action-row",
  ".product-service-notes",
  ".product-description-block",
  ".product-back-link",
  ".similar-products .section-heading",
  ".similar-card",
  ".discover-hero-copy",
  ".discover-hero-image",
  ".discover-product-card",
  ".discover-products .section-heading",
  ".story-content",
  ".editorial-page-footer",
  ".site-footer",
  ".footer-top",
  ".footer-bottom",
  ".newsletter form",
].join(",");

export function MotionShell({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const pathname = useLocation({ select: (location) => location.pathname });

  useEffect(() => {
    let cancelled = false;
    let revert: (() => void) | undefined;

    async function animatePage() {
      const root = scope.current;
      if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      try {
        // Load GSAP only in the browser so it never participates in server rendering.
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (cancelled || !scope.current) return;

        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
          const heroItems = root.querySelectorAll(
            ".hero-copy .eyebrow, .hero-copy h1, .hero-tagline, .hero-circle, .hero-side-note, .hero-index",
          );
          if (heroItems.length) {
            gsap.fromTo(
              heroItems,
              { autoAlpha: 0, y: 20 },
              { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", delay: 0.1 },
            );
          }

          const heroImage = root.querySelector<HTMLElement>(
            ".hero-photo, .editorial-hero-image img, .discover-hero-image img, .product-main-image img",
          );
          if (heroImage) {
            gsap.fromTo(
              heroImage,
              { scale: 1.045 },
              { scale: 1, duration: 1.2, ease: "power2.out", clearProps: "transform" },
            );
          }

          root.querySelectorAll<HTMLElement>(revealTargets).forEach((element, index) => {
            gsap.fromTo(
              element,
              { autoAlpha: 0, y: window.innerWidth < 640 ? 12 : 22 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                delay: (index % 4) * 0.04,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 92%",
                  once: true,
                },
              },
            );
          });
        }, root);
        revert = () => context.revert();
        ScrollTrigger.refresh();
      } catch (error) {
        // Animation failures must never prevent the storefront from rendering.
        console.warn("ISHTILE motion enhancement could not initialize:", error);
      }
    }

    void animatePage();
    return () => {
      cancelled = true;
      revert?.();
    };
  }, [pathname]);

  return (
    <div ref={scope} className="motion-shell">
      {children}
    </div>
  );
}
