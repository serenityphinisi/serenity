"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import TransitionLink from "@/components/TransitionLink";
import Image from "next/image";
import {
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

/*
  ============================================================
  NAV ITEMS
  Each item carries its own contextual image.
  Replace Unsplash URLs with Cloudinary vessel/destination
  photos before launch.
  ============================================================
*/

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
    image:
      "https://res.cloudinary.com/dombq6plz/image/upload/v1780331037/ChatGPT_Image_Jun_1_2026_08_27_00_PM_st80e6.png",
    // REPLACE → vessel exterior, wide ocean shot
  },

  {
    label: "The Yacht",
    href: "/yacht",
    image:
      "https://res.cloudinary.com/dombq6plz/image/upload/v1776869887/ChatGPT_Image_Apr_22_2026_09_57_35_PM_1_vwbdwb.png",
    // REPLACE → deck render or interior — Upper Deck / Living Room
  },

  {
    label: "Experiences",
    href: "/experiences",
    image:
      "https://res.cloudinary.com/dombq6plz/image/upload/v1776869680/ChatGPT_Image_Apr_22_2026_08_27_54_PM_n8evgp.png",
    // REPLACE → candid ocean activity, natural light
  },

  {
    label: "Destinations",
    href: "/destinations",
    image:
      "https://res.cloudinary.com/dombq6plz/image/upload/v1780331033/ChatGPT_Image_Jun_1_2026_09_10_09_PM_jyycnr.png",
    // REPLACE → aerial Labuan Bajo or Raja Ampat landscape
  },

  {
    label: "Rates & Schedule",
    href: "/rates-and-schedule",
    image:
      "https://res.cloudinary.com/dombq6plz/image/upload/v1778922404/ChatGPT_Image_May_16_2026_04_03_53_PM_yqjf6x.png",
    // REPLACE → aerial vessel shot, route context
  },

  {
    label: "About",
    href: "/about",
    image:
      "https://res.cloudinary.com/dombq6plz/image/upload/v1780331026/ChatGPT_Image_Jun_1_2026_11_20_51_PM_ycf9qo.png",
    // REPLACE → crew candid, golden hour on deck
  },

  {
    label: "Contact",
    href: "/contact",
    image:
      "https://res.cloudinary.com/dombq6plz/image/upload/v1780142533/38140754-66e0-4ab7-9cec-c6e690dd7ed6_1_ephzjz.png",
    // REPLACE → horizon, late light, open ocean
  },
];

/*
  ============================================================
  CONSTANTS
  ============================================================
*/

const DEFAULT_IMAGE = NAV_ITEMS[0].image;

const LOGO =
  "https://res.cloudinary.com/dombq6plz/image/upload/v1777356413/SERENITY_LOGO-02_u1bcf2_1_zc65st.png";

const ease = [0.22, 1, 0.36, 1];

/* ========================================================== */
/* COMPONENT                                                   */
/* ========================================================== */

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [show, setShow]         = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered]   = useState(null); // item.label | null
  const pathname = usePathname();

  const lastScroll = useRef(0);
  const menuRouteRef = useRef(pathname);

  const closeMenu = () => {
    setOpen(false);
    setHovered(null);
  };

  const getPathnameFromHref = (href) => {
    if (!href || typeof href !== "string") return "";

    try {
      const url = new URL(href, window.location.origin);
      return url.pathname;
    } catch {
      return href;
    }
  };

  const handleFullscreenMenuLinkClick = (href) => {
    const targetPathname = getPathnameFromHref(href);

    if (targetPathname === pathname) {
      closeMenu();
    }
  };

  /*
    ──────────────────────────────────────────────────────────
    REDUCED MOTION
    ──────────────────────────────────────────────────────────
  */

  const reduce =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  /*
    ──────────────────────────────────────────────────────────
    ACTIVE IMAGE
    Computed from hovered state. Falls back to DEFAULT_IMAGE.
    This is the key for AnimatePresence — changing it triggers
    the blur crossfade between contextual images.
    ──────────────────────────────────────────────────────────
  */

  const activeImage =
    hovered !== null
      ? NAV_ITEMS.find((n) => n.label === hovered)?.image ?? DEFAULT_IMAGE
      : DEFAULT_IMAGE;

  /*
    ──────────────────────────────────────────────────────────
    SCROLL — hide on scroll down past 120px, show on scroll up
    RAF-throttled for performance.
    ──────────────────────────────────────────────────────────
  */

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const current = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(current > 24);

          if (current < 40) {
            setShow(true);
            lastScroll.current = current;
            ticking = false;
            return;
          }

          if (current > lastScroll.current && current > 120) {
            setShow(false);
          } else {
            setShow(true);
          }

          lastScroll.current = current;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /*
    ──────────────────────────────────────────────────────────
    BODY LOCK — prevent background scroll when menu is open
    ──────────────────────────────────────────────────────────
  */

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (menuRouteRef.current === pathname) return;

    menuRouteRef.current = pathname;

    if (!open) return;

    const id = setTimeout(() => {
      closeMenu();
    }, 0);

    return () => clearTimeout(id);
  }, [pathname, open]);

  /* ========================================================= */
  /* RENDER                                                     */
  /* ========================================================= */

  return (
    <>
      {/* ──────────────────────────────────────────────────── */}
      {/* NAVBAR — collapsed state                             */}
      {/* Transparent at top → frosted glass on scroll.        */}
      {/* Hides on scroll down, shows on scroll up.            */}
      {/* ──────────────────────────────────────────────────── */}

      <motion.header
        animate={{
          y:       show ? 0   : -110,
          opacity: show ? 1   : 0,
        }}
        transition={{ duration: 0.45, ease }}
        className="
          fixed left-1/2 top-4 z-50
          w-[94%] max-w-[1240px]
          -translate-x-1/2
          md:top-5
        "
      >
        <div
          className={`
            relative overflow-hidden rounded-full border
            transition-all duration-500
            ${scrolled
              ? "border-[#2D3C68]/10 bg-[#F4F5F2]/92 shadow-[0_14px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl"
              : "border-white/14 bg-white/[0.04] shadow-[0_8px_30px_rgba(255,255,255,0.04)] backdrop-blur-[18px]"
            }
          `}
        >
          {/* top edge shimmer */}
          <div
            className={`
              absolute left-0 top-0 h-px w-full
              transition-all duration-500
              ${scrolled
                ? "bg-gradient-to-r from-transparent via-[#B08D57]/26 to-transparent"
                : "bg-gradient-to-r from-transparent via-white/12 to-transparent"
              }
            `}
          />

          {/* soft radial light */}
          <div className="
            pointer-events-none absolute inset-0
            bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.10),transparent_62%)]
          " />

          {/* top-down light */}
          <div className="
            pointer-events-none absolute inset-0
            bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08),transparent_52%)]
          " />

          {/* inner grid */}
          <div
            className={`
              relative z-[2]
              grid grid-cols-3 items-center
              px-4 py-[10px]
              transition-all duration-500
              md:px-7 md:py-4
              ${scrolled ? "text-[#2D3C68]" : "text-[#F4F5F2]"}
            `}
          >
            {/* LEFT — menu trigger */}
            <div className="flex items-center justify-start">
              <button
                onClick={() => setOpen(true)}
                className="group inline-flex items-center gap-2.5 transition-all duration-300 md:gap-3"
              >
                <Menu
                  strokeWidth={1.5}
                  className="h-[15px] w-[15px] opacity-[0.86]"
                />
                <span className="hidden text-[11px] uppercase tracking-[0.32em] opacity-[0.88] sm:block">
                  Menu
                </span>
              </button>
            </div>

            {/* CENTER — wordmark, light + dark versions */}
            <div className="flex justify-center">
              <TransitionLink
                href="/"
                transitionImage={NAV_ITEMS.find((item) => item.href === "/")?.image}
                transitionLabel="Home"
                className="relative block h-[28px] w-[122px] md:h-[40px] md:w-[180px]"
              >
                <Image
                  src={LOGO}
                  alt="Serenity"
                  fill
                  priority
                  className={`
                    object-contain transition-opacity duration-500
                    ${scrolled ? "opacity-0" : "opacity-[0.95]"}
                  `}
                />
                <Image
                  src={LOGO}
                  alt="Serenity"
                  fill
                  priority
                  className={`
                    object-contain brightness-0 transition-opacity duration-500
                    ${scrolled ? "opacity-[0.9]" : "opacity-0"}
                  `}
                />
              </TransitionLink>
            </div>

            {/* RIGHT — reserve CTA */}
            <div className="flex justify-end">
              {/* mobile */}
              <TransitionLink
                href="/contact"
                transitionImage={NAV_ITEMS.find((item) => item.href === "/contact")?.image}
                transitionLabel="Contact"
                className={`
                  group inline-flex items-center gap-1.5
                  text-[10px] uppercase tracking-[0.28em]
                  transition-all duration-300 md:hidden
                  ${scrolled ? "text-[#2D3C68]/84" : "text-[#F4F5F2]/82"}
                `}
              >
                <span>Enquire</span>
                <ArrowUpRight strokeWidth={1.5} className="h-[11px] w-[11px]" />
              </TransitionLink>

              {/* desktop */}
              <TransitionLink
                href="/contact"
                transitionImage={NAV_ITEMS.find((item) => item.href === "/contact")?.image}
                transitionLabel="Contact"
                className={`
                  group hidden items-center gap-2 rounded-full border
                  px-5 py-2 text-[12px] uppercase tracking-[0.28em]
                  transition-all duration-300 md:inline-flex
                  ${scrolled
                    ? "border-[#2D3C68]/14 bg-[#2D3C68] text-[#F4F5F2]"
                    : "border-[#F4F5F2]/32 text-[#F4F5F2] hover:bg-[#F4F5F2] hover:text-[#2D3C68]"
                  }
                `}
              >
                <span>Reserve</span>
                <ArrowUpRight strokeWidth={1.5} className="h-[13px] w-[13px]" />
              </TransitionLink>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ──────────────────────────────────────────────────── */}
      {/* FULLSCREEN MENU                                      */}
      {/* ──────────────────────────────────────────────────── */}

      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="
              fixed inset-0 z-[100]
              overflow-hidden
              bg-[#24345A] text-[#F4F5F2]
              md:bg-[#27375F]
            "
          >
            {/* ── ATMOSPHERE — three layers ─────────────────── */}

            {/* warm brass radial — top right */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_22%,rgba(176,141,87,0.08),transparent_50%)]" />

            {/* cool light radial — mid left */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_45%,rgba(255,255,255,0.03),transparent_55%)]" />

            {/* depth gradient — top + bottom darkening */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.10] via-transparent to-black/[0.24]" />

            {/* ── IMAGE PRELOAD — hidden, forces browser cache ─── */}
            {/*
              All nav images preloaded on mount so crossfade is
              instant with no flicker on first hover per item.
              pointer-events-none + aria-hidden ensures no a11y impact.
            */}
            <div aria-hidden="true" className="pointer-events-none absolute opacity-0">
              {NAV_ITEMS.map((item) => (
                <Image
                  key={item.label}
                  src={item.image}
                  alt=""
                  fill
                  priority
                  className="object-cover"
                />
              ))}
            </div>

            {/* ── CONTENT WRAPPER ──────────────────────────────── */}

            <div
              className="
                relative flex h-full flex-col
                px-6
                pt-[max(env(safe-area-inset-top),24px)]
                pb-[max(env(safe-area-inset-bottom),24px)]
                md:px-0 md:py-0
              "
            >

              {/* ================================================ */}
              {/* MOBILE MENU                                       */}
              {/* ================================================ */}

              <div className="flex flex-1 flex-col md:hidden">

                {/* mobile top bar */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
                  <div className="relative h-[22px] w-[96px]">
                    <Image
                      src={LOGO}
                      alt="Serenity"
                      fill
                      className="object-contain opacity-[0.92]"
                    />
                  </div>

                  <button
                    onClick={() => setOpen(false)}
                    className="group inline-flex items-center gap-3 text-white/56 transition-all duration-300 hover:text-white/90"
                  >
                    <span className="text-[10px] uppercase tracking-[0.32em]">Close</span>
                    <X strokeWidth={1.4} className="h-[15px] w-[15px] transition-transform duration-500 group-hover:rotate-90" />
                  </button>
                </div>

                {/* mobile nav list */}
                <div className="flex flex-1 items-center">
                  <div className="w-full">
                    {NAV_ITEMS.map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.55,
                          delay: 0.06 + i * 0.06,
                          ease,
                        }}
                        className="border-b border-white/[0.08]"
                      >
                        <TransitionLink
                          href={item.href}
                          transitionImage={item.image}
                          transitionLabel={item.label}
                          onClick={() => handleFullscreenMenuLinkClick(item.href)}
                          className="group flex items-center justify-between py-5"
                        >
                          <span className="font-[Gambarino] text-[34px] leading-none tracking-[-0.04em]">
                            {item.label}
                          </span>
                          <ArrowUpRight
                            strokeWidth={1.4}
                            className="h-[15px] w-[15px] text-white/28 transition-opacity duration-300 group-hover:text-white/72"
                          />
                        </TransitionLink>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* mobile bottom — single label, passes tone filter */}
                <div className="border-t border-white/[0.08] pt-6 text-[10px] uppercase tracking-[0.2em] text-white/34">
                  Indonesia Archipelago
                </div>

              </div>

              {/* ================================================ */}
              {/* DESKTOP MENU                                      */}
              {/* 42% nav left · 58% image right                   */}
              {/* Image dominant — more cinematic than nav dominant */}
              {/* ================================================ */}

              <div className="hidden h-full md:grid md:grid-cols-[42fr_58fr]">

                {/* ── LEFT COLUMN — navigation ─────────────────── */}

                <div className="relative flex flex-col justify-between border-r border-white/[0.06] px-12 py-10">

                  {/* desktop top bar */}
                  <div className="relative flex items-center justify-between">

                    {/* logo */}
                    <div className="relative h-[26px] w-[120px]">
                      <Image
                        src={LOGO}
                        alt="Serenity"
                        fill
                        className="object-contain opacity-[0.92]"
                      />
                    </div>

                    {/* close */}
                    <button
                      onClick={() => setOpen(false)}
                      className="group inline-flex items-center gap-3 text-white/56 transition-all duration-300 hover:text-white/90"
                    >
                      <span className="text-[10px] uppercase tracking-[0.32em]">Close</span>
                      <X strokeWidth={1.4} className="h-[15px] w-[15px] transition-transform duration-500 group-hover:rotate-90" />
                    </button>

                    {/*
                      ── BRASS DRAW LINE ──────────────────────────
                      Single 1px signature line that draws
                      left→right below the top bar on menu open.
                      scaleX: 0 → 1, originX: left, delay: 0.25s.
                      Gradient fades to transparent at right edge.
                    */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.0, delay: 0.25, ease }}
                      style={{ originX: 0 }}
                      className="
                        absolute -bottom-5 left-0
                        h-px w-full
                        bg-gradient-to-r
                        from-[#B08D57]/50
                        via-[#B08D57]/25
                        to-transparent
                      "
                    />
                  </div>

                  {/* desktop nav list */}
                  <nav
                    className="flex flex-1 flex-col justify-center"
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div className="w-full">
                      {NAV_ITEMS.map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={reduce
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 28 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.65,
                            delay: reduce ? 0 : 0.05 + i * 0.04,
                            ease,
                          }}
                        >
                          {/*
                            ── SIBLING FADE ──────────────────────
                            Framer Motion animate — real animation.
                            Hovered item  → opacity 1
                            Siblings      → opacity 0.18
                            Idle          → all opacity 1
                          */}
                          <motion.div
                            animate={{
                              opacity:
                                hovered === null || hovered === item.label
                                  ? 1
                                  : 0.18,
                            }}
                            transition={{ duration: 0.4, ease }}
                          >
                            <TransitionLink
                              href={item.href}
                              transitionImage={item.image}
                              transitionLabel={item.label}
                              onClick={() => handleFullscreenMenuLinkClick(item.href)}
                              onMouseEnter={() => setHovered(item.label)}
                              className="group flex items-center border-b border-white/[0.05] py-[18px]"
                            >
                              {/*
                                ── LABEL ───────────────────────────
                                Font: Gambarino 46px — H3 range,
                                commanding without overwhelming.
                                Hover: text transitions to brass
                                (#C7A36A) over 600ms.
                                transition-colors (not transition-all)
                                — specific, performant.
                              */}
                              <span
                                className="
                                  font-[Gambarino]
                                  text-[46px]
                                  leading-[0.88]
                                  tracking-[-0.05em]
                                  text-[#E9E5DD]
                                  transition-colors
                                  duration-600
                                  group-hover:text-[#C7A36A]
                                "
                              >
                                {item.label}
                              </span>
                            </TransitionLink>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </nav>

                  {/* desktop bottom — single label */}
                  <div className="border-t border-white/[0.08] pt-6 text-[10px] uppercase tracking-[0.2em] text-white/34">
                    Indonesia Archipelago
                  </div>

                </div>

                {/* ── RIGHT COLUMN — image panel ───────────────── */}
                {/*
                  Three layers:
                  1. AnimatePresence crossfade (blur + scale + opacity)
                  2. Ambient motion loop inside each image (scale + y)
                  3. Gradient overlays for blending and depth
                */}

                <div className="relative overflow-hidden">

                  <AnimatePresence mode="sync">
                    <motion.div
                      key={activeImage}
                      initial={reduce
                        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                        : { opacity: 0, scale: 1.05, filter: "blur(10px)" }
                      }
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.0, ease }}
                      className="absolute inset-0"
                    >
                      {/*
                        ── AMBIENT IMAGE MOTION ─────────────────────
                        Slow breathing loop — scale + y drift over 20s.
                        Image feels alive without any user interaction.
                        reduce motion: disabled entirely.
                      */}
                      <motion.div
                        animate={reduce ? {} : {
                          scale: [1.02, 1.05, 1.02],
                          y: [0, -10, 0],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={activeImage}
                          alt="Serenity"
                          fill
                          priority
                          className="object-cover"
                        />
                      </motion.div>

                      {/*
                        ── GRADIENT OVERLAYS ────────────────────────
                        Left: hard blend from nav bg (#27375F) to
                        transparent at 42% — ensures text always
                        readable against any image content.

                        Bottom + top: subtle darkening for depth.
                      */}

                      {/* left blend — nav bg color match */}
                      <div
                        className="
                          absolute inset-0
                          bg-[linear-gradient(to_right,
                            rgba(39,55,95,0.96)_0%,
                            rgba(39,55,95,0.78)_12%,
                            rgba(39,55,95,0.38)_24%,
                            rgba(0,0,0,0)_42%
                          )]
                        "
                      />

                      {/* vertical depth gradient */}
                      <div
                        className="
                          absolute inset-0
                          bg-gradient-to-t
                          from-black/[0.24]
                          via-transparent
                          to-black/[0.08]
                        "
                      />

                    </motion.div>
                  </AnimatePresence>

                </div>
                {/* end right column */}

              </div>
              {/* end desktop grid */}

            </div>
            {/* end content wrapper */}

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
