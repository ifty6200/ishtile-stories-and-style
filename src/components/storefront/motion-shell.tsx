import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || typeof window === "undefined") return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        gsap.set(root.querySelectorAll(revealTargets), { clearProps: "all" });
        return;
      }

      const heroItems = root.querySelectorAll(
        ".hero-copy .eyebrow, .hero-copy h1, .hero-tagline, .hero-circle, .hero-side-note, .hero-index",
      );
      if (heroItems.length) {
        gsap.fromTo(
          heroItems,
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.09, ease: "power3.out", delay: 0.12 },
        );
      }

      const heroImage = root.querySelector<HTMLElement>(
        ".hero-photo, .editorial-hero-image img, .discover-hero-image img, .product-main-image img",
      );
      if (heroImage) {
        gsap.fromTo(
          heroImage,
          { scale: 1.055 },
          { scale: 1, duration: 1.35, ease: "power2.out", clearProps: "transform" },
        );
      }

      const targets = gsap.utils.toArray<HTMLElement>(revealTargets, root);
      targets.forEach((element, index) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: window.innerWidth < 640 ? 14 : 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            delay: Math.min((index % 4) * 0.045, 0.12),
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 91%",
              once: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      ScrollTrigger.refresh();
    },
    { scope, dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <div ref={scope} className="motion-shell">
      {children}
    </div>
  );
}
