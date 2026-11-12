import { useRef } from "react";
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
  ".similar-products .section-heading",
  ".similar-card",
  ".discover-hero-copy",
  ".discover-hero-image",
  ".discover-product-card",
  ".story-content",
].join(",");

export function MotionShell({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const pathname = useLocation({ select: (location) => location.location.pathname });

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

      // Delegated micro-interactions keep dynamically rendered cards and controls covered.
      const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (canHover) {
        const onPointerOver = (event: PointerEvent) => {
          const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
            ".product-card, .featured-product-card, .similar-card, .discover-product-card, .brand-card, .collection-card, .category-card, .editorial-story-card, .article-card, .hero-circle, .product-add-button, .header-actions button",
          );
          if (target && root.contains(target)) {
            gsap.to(target, { y: -3, duration: 0.22, ease: "power2.out", overwrite: "auto" });
          }
        };
        const onPointerOut = (event: PointerEvent) => {
          const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
            ".product-card, .featured-product-card, .similar-card, .discover-product-card, .brand-card, .collection-card, .category-card, .editorial-story-card, .article-card, .hero-circle, .product-add-button, .header-actions button",
          );
          if (target && root.contains(target)) {
            gsap.to(target, { y: 0, duration: 0.28, ease: "power2.out", overwrite: "auto" });
          }
        };
        root.addEventListener("pointerover", onPointerOver);
        root.addEventListener("pointerout", onPointerOut);
        return () => {
          root.removeEventListener("pointerover", onPointerOver);
          root.removeEventListener("pointerout", onPointerOut);
        };
      }

      ScrollTrigger.refresh();
    },
    { scope, dependencies: [pathname], revertOnUpdate: true },
  );

  return <div ref={scope} className="motion-shell">{children}</div>;
}
