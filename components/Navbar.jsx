"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import TransitionLink from "@/components/TransitionLink";
import Image from "next/image";
import { ArrowUpRight, Menu } from "lucide-react";

/*
  ============================================================
  NAVIGATION DATA
  ============================================================

  Desktop:
  - navy drawer;
  - contextual image blade on hover/focus;
  - dimmed current page remains visible.

  Tablet:
  - navy drawer;
  - dimmed current page remains visible;
  - no image blade.

  Phone:
  - full-screen navy navigation;
  - no contextual image;
  - no fake touch preview.

  All seven routes remain visually equal.

  TransitionLink remains the sole owner of route navigation and
  the existing global page-transition system.
  ============================================================
*/

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
    image: "https://res.cloudinary.com/dombq6plz/image/upload/v1780331037/ChatGPT_Image_Jun_1_2026_08_27_00_PM_st80e6.png",
    bladeObjectPosition: "60% center",
  },
  {
    label: "The Yacht",
    href: "/yacht",
    image: "https://res.cloudinary.com/dombq6plz/image/upload/v1776869887/ChatGPT_Image_Apr_22_2026_09_57_35_PM_1_vwbdwb.png",
    bladeObjectPosition: "50% center",
  },
  {
    label: "Experiences",
    href: "/experiences",
    image: "https://res.cloudinary.com/dombq6plz/image/upload/v1776869680/ChatGPT_Image_Apr_22_2026_08_27_54_PM_n8evgp.png",
    bladeObjectPosition: "50% center",
  },
  {
    label: "Destinations",
    href: "/destinations",
    image: "https://res.cloudinary.com/dombq6plz/image/upload/v1780331033/ChatGPT_Image_Jun_1_2026_09_10_09_PM_jyycnr.png",
    bladeObjectPosition: "62% center",
  },
  {
    label: "Rates & Schedule",
    href: "/rates-and-schedule",
    image: "https://res.cloudinary.com/dombq6plz/image/upload/v1778922404/ChatGPT_Image_May_16_2026_04_03_53_PM_yqjf6x.png",
    bladeObjectPosition: "62% center",
  },
  {
    label: "About",
    href: "/about",
    image: "https://res.cloudinary.com/dombq6plz/image/upload/v1780331026/ChatGPT_Image_Jun_1_2026_11_20_51_PM_ycf9qo.png",
    bladeObjectPosition: "34% center",
  },
  {
    label: "Contact",
    href: "/contact",
    image: "https://res.cloudinary.com/dombq6plz/image/upload/v1780142533/38140754-66e0-4ab7-9cec-c6e690dd7ed6_1_ephzjz.png",
    bladeObjectPosition: "50% center",
  },
];

/*
  ============================================================
  GLOBAL ASSETS
  ============================================================
*/

const LOGO = "https://res.cloudinary.com/dombq6plz/image/upload/v1777356413/SERENITY_LOGO-02_u1bcf2_1_zc65st.png";

/*
  ============================================================
  MOTION CONSTANTS
  ============================================================
*/

const EASE = [0.22, 1, 0.36, 1];

const HEADER_DURATION = 0.45;

const MENU_OPEN_DURATION = 0.4;

const MENU_CLOSE_DURATION = 0.32;

const DRAWER_OPEN_DURATION = 0.5;

const DRAWER_CLOSE_DURATION = 0.38;

const BLADE_OPEN_DURATION = 0.46;

const BLADE_CLOSE_DURATION = 0.3;

const IMAGE_CHANGE_DURATION = 0.4;

const ITEM_REVEAL_DURATION = 0.48;

const ITEM_REVEAL_STAGGER = 0.035;

const HOVER_INTENT_DELAY = 65;

/*
  ============================================================
  IMAGE PRELOAD CACHE
  ============================================================
*/

const preloadedImageUrls = new Set();

/*
  ============================================================
  PATH HELPERS
  ============================================================
*/

function normalizePathname(value) {
  if (!value || value === "/") {
    return "/";
  }

  return value.replace(/\/+$/, "");
}

function getCurrentItem(pathname) {
  const normalizedPathname = normalizePathname(pathname);

  return NAV_ITEMS.find((item) => normalizePathname(item.href) === normalizedPathname) ?? NAV_ITEMS[0];
}

/*
  ============================================================
  CLOUDINARY IMAGE HELPER
  ============================================================
*/

function getOptimizedCloudinaryUrl(source, width = 960) {
  if (!source || !source.includes("/image/upload/")) {
    return source;
  }

  return source.replace("/image/upload/", `/image/upload/f_auto,q_auto:good,w_${width}/`);
}

/*
  ============================================================
  DESKTOP IMAGE PRELOAD
  ============================================================
*/

function preloadImage(source) {
  if (typeof window === "undefined" || !source || preloadedImageUrls.has(source)) {
    return;
  }

  preloadedImageUrls.add(source);

  const image = new window.Image();

  image.decoding = "async";
  image.src = source;

  if (typeof image.decode === "function") {
    image.decode().catch(() => {});
  }
}

/*
  ============================================================
  CUSTOM CLOSE CONTROL
  ============================================================

  The visible close mark is drawn with two hairlines.

  It deliberately has:
  - no Lucide icon;
  - no visible CLOSE label;
  - no border;
  - no circle;
  - no rotation animation;
  - no dashboard-style treatment.

  The invisible hit area remains large enough for touch and
  keyboard interaction.
  ============================================================
*/

function CloseControl({
  buttonRef,
  onClick,
  className = "",
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-label="Close navigation menu"
      className={`group relative grid h-12 w-12 shrink-0 place-items-center rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F4F5F2]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#27375F] ${className}`}
    >
      <span aria-hidden="true" className="absolute h-px w-[19px] rotate-45 bg-[#F4F5F2]/70 transition-[width,background-color] duration-300 ease-out group-hover:w-[22px] group-hover:bg-[#F4F5F2]" />

      <span aria-hidden="true" className="absolute h-px w-[19px] -rotate-45 bg-[#F4F5F2]/70 transition-[width,background-color] duration-300 ease-out group-hover:w-[22px] group-hover:bg-[#F4F5F2]" />
    </button>
  );
}

/*
  ============================================================
  ROUTE CONTROL
  ============================================================

  Current route:
  - rendered as a button;
  - closes the menu;
  - does not restart the route transition.

  Other routes:
  - rendered through TransitionLink;
  - navigation remains owned by TransitionLink.
  ============================================================
*/

function RouteControl({
  item,
  isCurrent,
  closeMenu,
  className,
  children,
}) {
  if (isCurrent) {
    return (
      <button
        type="button"
        aria-current="page"
        aria-label={`${item.label}, current page. Close menu.`}
        onClick={closeMenu}
        className={className}
      >
        {children}

        <span className="sr-only">
          Current page
        </span>
      </button>
    );
  }

  return (
    <TransitionLink
      href={item.href}
      transitionImage={item.image}
      transitionLabel={item.label}
      className={className}
    >
      {children}
    </TransitionLink>
  );
}

/*
  ============================================================
  CONTEXTUAL IMAGE VARIANTS
  ============================================================

  Desktop image movement is user-input driven only.

  There is no:
  - blur;
  - continuous zoom;
  - breathing loop;
  - cursor tracking;
  - route-transition takeover.
  ============================================================
*/

const contextualImageVariants = {
  enter: (direction) => ({
    opacity: 0,
    y: direction >= 0 ? 10 : -10,
    scale: 1.012,
  }),

  active: {
    opacity: 1,
    y: 0,
    scale: 1,
  },

  exit: (direction) => ({
    opacity: 0,
    y: direction >= 0 ? -10 : 10,
    scale: 1,
  }),
};

/*
  ============================================================
  COMPONENT
  ============================================================
*/

export default function Navbar() {
  const pathname = usePathname();

  const reduceMotion = useReducedMotion();

  /*
    ----------------------------------------------------------
    COLLAPSED NAVBAR STATE
    ----------------------------------------------------------
  */

  const [open, setOpen] = useState(false);

  const [blocking, setBlocking] = useState(false);

  const [show, setShow] = useState(true);

  const [scrolled, setScrolled] = useState(false);

  /*
    ----------------------------------------------------------
    DESKTOP PREVIEW STATE
    ----------------------------------------------------------
  */

  const [hoveredHref, setHoveredHref] = useState(null);

  const [previewDirection, setPreviewDirection] = useState(1);

  /*
    ----------------------------------------------------------
    ENVIRONMENT STATE
    ----------------------------------------------------------
  */

  const [portalNode, setPortalNode] = useState(null);

  const [desktopMenuActive, setDesktopMenuActive] = useState(false);

  const [compactHeight, setCompactHeight] = useState(false);

  const [veryCompactHeight, setVeryCompactHeight] = useState(false);

  /*
    ----------------------------------------------------------
    REFS
    ----------------------------------------------------------
  */

  const lastScrollRef = useRef(0);

  const previousPreviewIndexRef = useRef(0);

  const hoverTimerRef = useRef(null);

  const menuRouteRef = useRef(pathname);

  const menuDialogRef = useRef(null);

  const desktopCloseButtonRef = useRef(null);

  const mobileCloseButtonRef = useRef(null);

  const menuTriggerRef = useRef(null);

  const focusedBeforeOpenRef = useRef(null);

  /*
    ----------------------------------------------------------
    CURRENT ROUTE
    ----------------------------------------------------------
  */

  const normalizedPathname = normalizePathname(pathname);

  const currentItem = getCurrentItem(pathname);

  const currentIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => normalizePathname(item.href) === normalizedPathname)
  );

  const isHome = normalizedPathname === "/";

  /*
    ----------------------------------------------------------
    ACTIVE DESKTOP PREVIEW
    ----------------------------------------------------------
  */

  const hoveredItem = NAV_ITEMS.find((item) => item.href === hoveredHref) ?? null;

  const homeItem = NAV_ITEMS.find((item) => item.href === "/") ?? NAV_ITEMS[0];

  const contactItem = NAV_ITEMS.find((item) => item.href === "/contact") ?? NAV_ITEMS[NAV_ITEMS.length - 1];

  /*
    ==========================================================
    TIMER CONTROL
    ==========================================================
  */

  const clearHoverTimer = () => {
    if (!hoverTimerRef.current) {
      return;
    }

    window.clearTimeout(hoverTimerRef.current);

    hoverTimerRef.current = null;
  };

  /*
    ==========================================================
    HIDE DESKTOP PREVIEW
    ==========================================================
  */

  const hidePreview = () => {
    clearHoverTimer();

    previousPreviewIndexRef.current = currentIndex;

    setHoveredHref(null);
  };

  /*
    ==========================================================
    UPDATE DESKTOP PREVIEW
    ==========================================================
  */

  const updatePreview = (item) => {
    if (!item || !desktopMenuActive) {
      return;
    }

    const nextIndex = NAV_ITEMS.findIndex((candidate) => candidate.href === item.href);

    if (nextIndex < 0) {
      return;
    }

    const optimizedSource = getOptimizedCloudinaryUrl(item.image, 960);

    preloadImage(optimizedSource);

    if (nextIndex !== previousPreviewIndexRef.current) {
      setPreviewDirection(nextIndex > previousPreviewIndexRef.current ? 1 : -1);
    }

    previousPreviewIndexRef.current = nextIndex;

    setHoveredHref(item.href);
  };

  /*
    ==========================================================
    DESKTOP HOVER INTENT
    ==========================================================
  */

  const handlePreviewEnter = (item) => {
    if (!desktopMenuActive) {
      return;
    }

    clearHoverTimer();

    const optimizedSource = getOptimizedCloudinaryUrl(item.image, 960);

    preloadImage(optimizedSource);

    hoverTimerRef.current = window.setTimeout(() => {
      updatePreview(item);
    }, reduceMotion ? 0 : HOVER_INTENT_DELAY);
  };

  /*
    ==========================================================
    KEYBOARD PREVIEW EXIT
    ==========================================================
  */

  const handleNavigationBlur = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) {
      return;
    }

    hidePreview();
  };

  /*
    ==========================================================
    OPEN MENU
    ==========================================================
  */

  const openMenu = () => {
    clearHoverTimer();

    focusedBeforeOpenRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : menuTriggerRef.current;

    previousPreviewIndexRef.current = currentIndex;

    setHoveredHref(null);

    setPreviewDirection(1);

    setShow(true);

    setBlocking(true);

    setOpen(true);
  };

  /*
    ==========================================================
    CLOSE MENU
    ==========================================================
  */

  const closeMenu = () => {
    clearHoverTimer();

    setHoveredHref(null);

    setOpen(false);
  };

  /*
    ==========================================================
    PORTAL ROOT
    ==========================================================
  */

  useEffect(() => {
    const node = document.createElement("div");

    node.setAttribute("data-serenity-menu-portal", "");

    document.body.appendChild(node);

    setPortalNode(node);

    return () => {
      node.remove();
    };
  }, []);

  /*
    ==========================================================
    VIEWPORT MODE DETECTION
    ==========================================================

    Desktop:
    - starts at 1024px;
    - enables contextual image blade.

    Tablet and phone:
    - no image blade;
    - direct one-tap navigation.

    Height states:
    - compact below 700px;
    - very compact below 580px.
    ==========================================================
  */

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    const compactHeightQuery = window.matchMedia("(max-height: 699px)");

    const veryCompactHeightQuery = window.matchMedia("(max-height: 579px)");

    const syncViewportState = () => {
      setDesktopMenuActive(desktopQuery.matches);

      setCompactHeight(compactHeightQuery.matches);

      setVeryCompactHeight(veryCompactHeightQuery.matches);
    };

    syncViewportState();

    desktopQuery.addEventListener("change", syncViewportState);

    compactHeightQuery.addEventListener("change", syncViewportState);

    veryCompactHeightQuery.addEventListener("change", syncViewportState);

    return () => {
      desktopQuery.removeEventListener("change", syncViewportState);

      compactHeightQuery.removeEventListener("change", syncViewportState);

      veryCompactHeightQuery.removeEventListener("change", syncViewportState);
    };
  }, []);

  /*
    ==========================================================
    COLLAPSED NAVBAR SCROLL BEHAVIOR
    ==========================================================
  */

  useEffect(() => {
    let ticking = false;

    const updateHeader = () => {
      const currentScroll = window.scrollY;

      setScrolled(currentScroll > 24);

      if (currentScroll < 40) {
        setShow(true);
      } else if (currentScroll > lastScrollRef.current && currentScroll > 120) {
        setShow(false);
      } else {
        setShow(true);
      }

      lastScrollRef.current = currentScroll;

      ticking = false;
    };

    const handleScroll = () => {
      if (ticking || blocking) {
        return;
      }

      ticking = true;

      window.requestAnimationFrame(updateHeader);
    };

    lastScrollRef.current = window.scrollY;

    setScrolled(window.scrollY > 24);

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [blocking]);

  /*
    ==========================================================
    SCROLL LOCK
    ==========================================================

    Lock remains active during the exit animation.

    Scrollbar compensation prevents horizontal page movement.
    ==========================================================
  */

  useEffect(() => {
    if (!blocking) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;

    const previousHtmlOverflow = document.documentElement.style.overflow;

    const previousBodyOverscroll = document.body.style.overscrollBehavior;

    const previousBodyPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    document.documentElement.style.overflow = "hidden";

    document.body.style.overscrollBehavior = "none";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;

      document.documentElement.style.overflow = previousHtmlOverflow;

      document.body.style.overscrollBehavior = previousBodyOverscroll;

      document.body.style.paddingRight = previousBodyPaddingRight;
    };
  }, [blocking]);

  /*
    ==========================================================
    INERT BACKGROUND
    ==========================================================

    The underlying page is removed from keyboard and
    screen-reader navigation while the menu is mounted.

    The portal itself remains active.
    ==========================================================
  */

  useEffect(() => {
    if (!blocking || !portalNode) {
      return;
    }

    const snapshots = new Map();

    Array.from(document.body.children).forEach((element) => {
      if (!(element instanceof HTMLElement)) {
        return;
      }

      if (element === portalNode) {
        return;
      }

      if (["SCRIPT", "STYLE", "LINK"].includes(element.tagName)) {
        return;
      }

      snapshots.set(element, {
        hadInert: element.hasAttribute("inert"),
        ariaHidden: element.getAttribute("aria-hidden"),
      });

      element.setAttribute("inert", "");

      element.setAttribute("aria-hidden", "true");
    });

    return () => {
      snapshots.forEach((snapshot, element) => {
        if (!snapshot.hadInert) {
          element.removeAttribute("inert");
        }

        if (snapshot.ariaHidden === null) {
          element.removeAttribute("aria-hidden");
        } else {
          element.setAttribute("aria-hidden", snapshot.ariaHidden);
        }
      });
    };
  }, [blocking, portalNode]);

  /*
    ==========================================================
    KEYBOARD + FOCUS MANAGEMENT
    ==========================================================
  */

  useEffect(() => {
    if (!open) {
      return;
    }

    const focusFrame = window.requestAnimationFrame(() => {
      const targetButton = desktopMenuActive ? desktopCloseButtonRef.current : mobileCloseButtonRef.current;

      targetButton?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();

        closeMenu();

        return;
      }

      if (event.key !== "Tab" || !menuDialogRef.current) {
        return;
      }

      const focusableElements = Array.from(
        menuDialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => {
        return (
          element instanceof HTMLElement &&
          element.offsetParent !== null &&
          !element.hasAttribute("disabled") &&
          element.getAttribute("aria-hidden") !== "true"
        );
      });

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];

      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();

        lastElement.focus();

        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();

        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, desktopMenuActive]);

  /*
    ==========================================================
    FOCUS RESTORATION
    ==========================================================
  */

  useEffect(() => {
    if (blocking || !focusedBeforeOpenRef.current) {
      return;
    }

    const focusFrame = window.requestAnimationFrame(() => {
      focusedBeforeOpenRef.current?.focus?.();

      focusedBeforeOpenRef.current = null;
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);
    };
  }, [blocking]);

  /*
    ==========================================================
    ROUTE CHANGE CLEANUP
    ==========================================================

    TransitionLink performs route navigation.

    Navbar observes the resulting pathname update and closes the
    opened menu afterward.
    ==========================================================
  */

  useEffect(() => {
    if (menuRouteRef.current === pathname) {
      return;
    }

    menuRouteRef.current = pathname;

    if (!open) {
      return;
    }

    const closeTimer = window.setTimeout(() => {
      closeMenu();
    }, 0);

    return () => {
      window.clearTimeout(closeTimer);
    };
  }, [pathname, open]);

  /*
    ==========================================================
    COMPONENT CLEANUP
    ==========================================================
  */

  useEffect(() => {
    return () => {
      clearHoverTimer();
    };
  }, []);

  /*
    ==========================================================
    MENU PORTAL
    ==========================================================
  */

  const menuPortal = portalNode
    ? createPortal(
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            setBlocking(false);
          }}
        >
          {open && (
            <motion.div
              id="serenity-main-menu"
              ref={menuDialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Main navigation"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: reduceMotion ? 0 : MENU_CLOSE_DURATION,
                  ease: EASE,
                },
              }}
              transition={{
                duration: reduceMotion ? 0 : MENU_OPEN_DURATION,
                ease: EASE,
              }}
              className="fixed inset-0 z-[100] h-[100dvh] overflow-hidden"
              style={{
                "--drawer-width": "clamp(430px, 35vw, 560px)",
                "--blade-width": "clamp(250px, 22vw, 360px)",
              }}
            >
              {/*
                ================================================
                DIMMED CURRENT PAGE
                ================================================
              */}

              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#07111C]/76" />

              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(39,55,95,0.07),rgba(3,8,15,0.14))]" />

              <div aria-hidden="true" onPointerDown={closeMenu} className="absolute inset-0 z-0 cursor-default" />

              {/*
                ================================================
                DESKTOP NAVY DRAWER
                ================================================
              */}

              <motion.aside
                initial={
                  reduceMotion
                    ? {
                        opacity: 1,
                      }
                    : {
                        x: "-100%",
                        opacity: 0.98,
                      }
                }
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                exit={
                  reduceMotion
                    ? {
                        opacity: 0,
                      }
                    : {
                        x: "-100%",
                        opacity: 0.98,
                        transition: {
                          duration: DRAWER_CLOSE_DURATION,
                          ease: EASE,
                        },
                      }
                }
                transition={{
                  duration: reduceMotion ? 0 : DRAWER_OPEN_DURATION,
                  ease: EASE,
                }}
                className="pointer-events-auto absolute inset-y-0 left-0 z-30 hidden w-[var(--drawer-width)] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden border-r border-white/[0.08] bg-[#27375F] text-[#F4F5F2] lg:grid"
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(176,141,87,0.09),transparent_46%)]" />

                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_48%,rgba(255,255,255,0.035),transparent_56%)]" />

                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.05] via-transparent to-black/[0.14]" />

                {/*
                  ----------------------------------------------
                  DESKTOP CUSTOM CLOSE
                  ----------------------------------------------
                */}

                <div className={`relative z-10 flex items-center px-9 2xl:px-12 ${compactHeight ? "pb-2 pt-4" : "pb-4 pt-6"}`}>
                  <CloseControl buttonRef={desktopCloseButtonRef} onClick={closeMenu} className="-ml-3" />
                </div>

                {/*
                  ----------------------------------------------
                  DESKTOP NAVIGATION

                  Spacing is controlled by one nav-level gap,
                  rather than small padding on every link.
                  ----------------------------------------------
                */}

                <div className={`relative z-10 min-h-0 overflow-y-auto overscroll-contain px-9 2xl:px-12 ${compactHeight ? "py-1" : "py-3"}`}>
                  <div className={`flex min-h-full flex-col py-2 ${compactHeight ? "justify-start" : "justify-center"}`}>
                    {!veryCompactHeight && (
                      <div className={`text-[10px] uppercase tracking-[0.3em] text-[#F4F5F2]/38 ${compactHeight ? "mb-4" : "mb-[clamp(18px,2.5vh,28px)]"}`}>
                        Menu
                      </div>
                    )}

                    <nav onMouseLeave={hidePreview} onBlur={handleNavigationBlur} className={`flex w-full flex-col ${compactHeight ? "gap-[clamp(7px,1.2vh,10px)]" : "gap-[clamp(11px,1.45vh,17px)]"}`}>
                      {NAV_ITEMS.map((item, index) => {
                        const isCurrent = normalizePathname(item.href) === normalizedPathname;

                        const isPreviewed = hoveredHref === item.href;

                        const hasPreview = hoveredHref !== null;

                        const itemOpacity = hasPreview
                          ? isPreviewed
                            ? 1
                            : 0.26
                          : isCurrent
                            ? 1
                            : 0.76;

                        return (
                          <motion.div
                            key={item.href}
                            initial={
                              reduceMotion
                                ? {
                                    opacity: 1,
                                    y: 0,
                                  }
                                : {
                                    opacity: 0,
                                    y: 16,
                                  }
                            }
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            transition={{
                              duration: reduceMotion ? 0 : ITEM_REVEAL_DURATION,
                              delay: reduceMotion ? 0 : 0.07 + index * ITEM_REVEAL_STAGGER,
                              ease: EASE,
                            }}
                            onMouseEnter={() => handlePreviewEnter(item)}
                            onFocus={() => updatePreview(item)}
                            className="relative"
                          >
                            <RouteControl item={item} isCurrent={isCurrent} closeMenu={closeMenu} className="group relative flex w-full items-center text-left">
                              <motion.span
                                initial={false}
                                animate={{
                                  opacity: itemOpacity,
                                  x: isPreviewed && !reduceMotion ? 8 : 0,
                                }}
                                transition={{
                                  duration: reduceMotion ? 0 : 0.34,
                                  ease: EASE,
                                }}
                                className={`max-w-[92%] font-[Gambarino] tracking-[-0.04em] text-[#F4F5F2] ${compactHeight ? "text-[clamp(34px,5.3vh,44px)] leading-[0.96]" : "text-[clamp(40px,5vh,53px)] leading-[0.95]"}`}
                              >
                                {item.label}
                              </motion.span>

                              <motion.span
                                initial={false}
                                animate={{
                                  opacity: isCurrent ? 0.76 : 0,
                                  scale: isCurrent ? 1 : 0.68,
                                }}
                                transition={{
                                  duration: reduceMotion ? 0 : 0.28,
                                  ease: EASE,
                                }}
                                aria-hidden="true"
                                className="absolute right-0 top-1/2 h-[6px] w-[6px] -translate-y-1/2 rounded-full bg-[#B08D57]"
                              />
                            </RouteControl>
                          </motion.div>
                        );
                      })}
                    </nav>
                  </div>
                </div>

                {/*
                  ----------------------------------------------
                  DESKTOP CHARTER UTILITY BAR
                  ----------------------------------------------
                */}

                <motion.div
                  initial={
                    reduceMotion
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 0,
                          y: 10,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.44,
                    delay: reduceMotion ? 0 : 0.2,
                    ease: EASE,
                  }}
                  onMouseEnter={hidePreview}
                  onFocus={hidePreview}
                  className={`relative z-10 border-t border-white/[0.10] px-9 2xl:px-12 ${compactHeight ? "pb-5 pt-4" : "pb-8 pt-6"}`}
                >
                  <div className="flex items-center justify-between gap-6">
                    <div className="text-[9px] uppercase tracking-[0.27em] text-[#F4F5F2]/40">
                      Private charter
                    </div>

                    <RouteControl item={contactItem} isCurrent={normalizedPathname === "/contact"} closeMenu={closeMenu} className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-[#F4F5F2]/24 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-[#F4F5F2] transition-[background-color,color,border-color] duration-300 hover:border-[#F4F5F2] hover:bg-[#F4F5F2] hover:text-[#27375F]">
                      <span>
                        Reserve
                      </span>

                      <ArrowUpRight strokeWidth={1.3} className="h-[12px] w-[12px]" />
                    </RouteControl>
                  </div>
                </motion.div>
              </motion.aside>

              {/*
                ================================================
                DESKTOP CONTEXTUAL IMAGE BLADE
                ================================================
              */}

              <AnimatePresence>
                {desktopMenuActive && hoveredItem && (
                  <motion.section
                    key="serenity-contextual-image-blade"
                    aria-hidden="true"
                    initial={
                      reduceMotion
                        ? {
                            opacity: 1,
                          }
                        : {
                            opacity: 0,
                            x: -28,
                          }
                    }
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -20,
                      transition: {
                        duration: reduceMotion ? 0 : BLADE_CLOSE_DURATION,
                        ease: EASE,
                      },
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : BLADE_OPEN_DURATION,
                      ease: EASE,
                    }}
                    className="pointer-events-none absolute inset-y-0 left-[var(--drawer-width)] z-20 hidden w-[var(--blade-width)] overflow-hidden border-r border-white/[0.08] bg-[#101923] lg:block"
                  >
                    <AnimatePresence initial={false} mode="sync" custom={previewDirection}>
                      <motion.div
                        key={hoveredItem.href}
                        custom={previewDirection}
                        variants={contextualImageVariants}
                        initial={reduceMotion ? "active" : "enter"}
                        animate="active"
                        exit={reduceMotion ? "active" : "exit"}
                        transition={{
                          duration: reduceMotion ? 0 : IMAGE_CHANGE_DURATION,
                          ease: EASE,
                        }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={getOptimizedCloudinaryUrl(hoveredItem.image, 960)}
                          alt=""
                          fill
                          unoptimized
                          sizes="22vw"
                          className="object-cover"
                          style={{
                            objectPosition: hoveredItem.bladeObjectPosition,
                          }}
                        />

                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07111C]/36 via-transparent to-[#07111C]/8" />

                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(7,17,28,0.02),transparent_58%,rgba(7,17,28,0.13))]" />
                      </motion.div>
                    </AnimatePresence>
                  </motion.section>
                )}
              </AnimatePresence>

              {/*
                ================================================
                PHONE + TABLET NAVY PANEL
                ================================================
              */}

              <motion.aside
                initial={
                  reduceMotion
                    ? {
                        opacity: 1,
                      }
                    : {
                        x: "-100%",
                        opacity: 0.98,
                      }
                }
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                exit={
                  reduceMotion
                    ? {
                        opacity: 0,
                      }
                    : {
                        x: "-100%",
                        opacity: 0.98,
                        transition: {
                          duration: DRAWER_CLOSE_DURATION,
                          ease: EASE,
                        },
                      }
                }
                transition={{
                  duration: reduceMotion ? 0 : DRAWER_OPEN_DURATION,
                  ease: EASE,
                }}
                className="pointer-events-auto absolute inset-y-0 left-0 z-30 grid w-full grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden bg-[#24345A] text-[#F4F5F2] sm:w-[88vw] sm:max-w-[680px] md:w-[84vw] lg:hidden"
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(176,141,87,0.09),transparent_46%)]" />

                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_48%,rgba(255,255,255,0.035),transparent_56%)]" />

                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.05] via-transparent to-black/[0.14]" />

                {/*
                  ----------------------------------------------
                  PHONE + TABLET CUSTOM CLOSE
                  ----------------------------------------------
                */}

                <div className={`relative z-10 flex items-center justify-between px-6 md:px-9 ${compactHeight ? "pb-2 pt-[max(env(safe-area-inset-top),10px)]" : "pb-3 pt-[max(env(safe-area-inset-top),16px)] md:pt-6"}`}>
                  <CloseControl buttonRef={mobileCloseButtonRef} onClick={closeMenu} className="-ml-3" />

                  <div className="relative h-[24px] w-[106px]">
                    <Image src={LOGO} alt="Serenity" fill priority sizes="106px" className="object-contain opacity-[0.88]" />
                  </div>
                </div>

                {/*
                  ----------------------------------------------
                  PHONE + TABLET NAVIGATION

                  Spacing is controlled at the nav level.
                  ----------------------------------------------
                */}

                <div className={`relative z-10 min-h-0 overflow-y-auto overscroll-contain px-6 md:px-9 ${compactHeight ? "py-1" : "py-3"}`}>
                  <div className={`flex min-h-full flex-col py-2 ${compactHeight ? "justify-start" : "justify-center"}`}>
                    {!veryCompactHeight && (
                      <div className={`text-[9px] uppercase tracking-[0.28em] text-[#F4F5F2]/38 ${compactHeight ? "mb-4" : "mb-5"}`}>
                        Menu
                      </div>
                    )}

                    <nav className={`flex w-full flex-col ${compactHeight ? "gap-[clamp(6px,1.1vh,8px)]" : "gap-[clamp(9px,1.45vh,14px)]"}`}>
                      {NAV_ITEMS.map((item, index) => {
                        const isCurrent = normalizePathname(item.href) === normalizedPathname;

                        return (
                          <motion.div
                            key={item.href}
                            initial={
                              reduceMotion
                                ? {
                                    opacity: 1,
                                    y: 0,
                                  }
                                : {
                                    opacity: 0,
                                    y: 14,
                                  }
                            }
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            transition={{
                              duration: reduceMotion ? 0 : ITEM_REVEAL_DURATION,
                              delay: reduceMotion ? 0 : 0.06 + index * ITEM_REVEAL_STAGGER,
                              ease: EASE,
                            }}
                          >
                            <RouteControl item={item} isCurrent={isCurrent} closeMenu={closeMenu} className="group relative flex w-full items-center justify-between text-left">
                              <span className={`max-w-[88%] font-[Gambarino] tracking-[-0.04em] text-[#F4F5F2] ${compactHeight ? "text-[clamp(28px,7.6vw,36px)] leading-[0.97]" : "text-[clamp(31px,8.4vw,43px)] leading-[0.96]"}`}>
                                {item.label}
                              </span>

                              {isCurrent ? (
                                <span aria-hidden="true" className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#B08D57]" />
                              ) : (
                                <ArrowUpRight strokeWidth={1.25} className="h-[13px] w-[13px] shrink-0 text-[#F4F5F2]/24 transition-[opacity,transform] duration-300 group-hover:translate-x-0.5 group-hover:text-[#F4F5F2]/58" />
                              )}
                            </RouteControl>
                          </motion.div>
                        );
                      })}
                    </nav>
                  </div>
                </div>

                {/*
                  ----------------------------------------------
                  COMPACT CHARTER UTILITY BAR
                  ----------------------------------------------
                */}

                <motion.div
                  initial={
                    reduceMotion
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 0,
                          y: 8,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                    delay: reduceMotion ? 0 : 0.18,
                    ease: EASE,
                  }}
                  className={`relative z-10 border-t border-white/[0.10] px-6 md:px-9 ${compactHeight ? "pb-[max(env(safe-area-inset-bottom),14px)] pt-3" : "pb-[max(env(safe-area-inset-bottom),20px)] pt-4"}`}
                >
                  <div className="flex min-h-[42px] items-center justify-between gap-5">
                    <div className="text-[8px] uppercase tracking-[0.25em] text-[#F4F5F2]/42 sm:text-[9px]">
                      Private charter
                    </div>

                    <RouteControl item={contactItem} isCurrent={normalizedPathname === "/contact"} closeMenu={closeMenu} className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-[#F4F5F2]/24 px-4 py-2 text-[9px] uppercase tracking-[0.22em] text-[#F4F5F2] transition-[background-color,color,border-color] duration-300 hover:border-[#F4F5F2] hover:bg-[#F4F5F2] hover:text-[#24345A]">
                      <span>
                        Reserve
                      </span>

                      <ArrowUpRight strokeWidth={1.3} className="h-[11px] w-[11px]" />
                    </RouteControl>
                  </div>
                </motion.div>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>,
        portalNode
      )
    : null;

  /*
    ==========================================================
    COLLAPSED NAVBAR
    ==========================================================
  */

  return (
    <>
      <header className={`fixed inset-x-0 z-50 flex justify-center ${isHome ? "top-4 2xl:top-5" : "top-4 md:top-5"}`}>
        <motion.div
          initial={false}
          animate={{
            y: show ? 0 : -110,
            opacity: show ? 1 : 0,
          }}
          transition={{
            duration: reduceMotion ? 0 : HEADER_DURATION,
            ease: EASE,
          }}
          className="w-[94%] max-w-[1240px] transform-gpu"
          style={{
            willChange: "transform, opacity",
          }}
        >
          <div className={`relative isolate overflow-hidden rounded-full border transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ${scrolled ? "border-[#2D3C68]/10 bg-[#F4F5F2]/92 shadow-[0_14px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl" : "border-white/14 bg-white/[0.04] shadow-[0_8px_30px_rgba(255,255,255,0.04)] backdrop-blur-none"}`}>
            <div className={`pointer-events-none absolute left-0 top-0 h-px w-full transition-opacity duration-500 ${scrolled ? "bg-gradient-to-r from-transparent via-[#B08D57]/26 to-transparent" : "bg-gradient-to-r from-transparent via-white/12 to-transparent"}`} />

            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.10),transparent_62%)]" />

            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08),transparent_52%)]" />

            <div className={`relative z-[2] grid grid-cols-3 items-center px-4 py-[10px] transition-colors duration-500 ${isHome ? "md:px-6 md:py-3 2xl:px-7 2xl:py-4" : "md:px-7 md:py-4"} ${scrolled ? "text-[#2D3C68]" : "text-[#F4F5F2]"}`}>
              <div className="flex items-center justify-start">
                <button
                  ref={menuTriggerRef}
                  type="button"
                  onClick={openMenu}
                  aria-label="Open navigation menu"
                  aria-expanded={open}
                  aria-controls="serenity-main-menu"
                  className={`group inline-flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-70 ${isHome ? "md:gap-2.5 2xl:gap-3" : "md:gap-3"}`}
                >
                  <Menu strokeWidth={1.5} className={`opacity-[0.86] ${isHome ? "h-[15px] w-[15px] md:h-[14px] md:w-[14px] 2xl:h-[15px] 2xl:w-[15px]" : "h-[15px] w-[15px]"}`} />

                  <span className={`hidden uppercase opacity-[0.88] sm:block ${isHome ? "text-[11px] tracking-[0.32em] md:text-[10px] md:tracking-[0.28em] 2xl:text-[11px] 2xl:tracking-[0.32em]" : "text-[11px] tracking-[0.32em]"}`}>
                    Menu
                  </span>
                </button>
              </div>

              <div className="flex justify-center">
                <TransitionLink
                  href="/"
                  transitionImage={homeItem.image}
                  transitionLabel="Home"
                  className={`relative block ${isHome ? "h-[28px] w-[122px] md:h-[34px] md:w-[154px] 2xl:h-[40px] 2xl:w-[180px]" : "h-[28px] w-[122px] md:h-[40px] md:w-[180px]"}`}
                >
                  <Image src={LOGO} alt="Serenity" fill priority sizes="180px" className={`object-contain transition-[filter,opacity] duration-500 ${scrolled ? "brightness-0 opacity-90" : "brightness-100 opacity-95"}`} />
                </TransitionLink>
              </div>

              <div className="flex justify-end">
                <TransitionLink
                  href="/contact"
                  transitionImage={contactItem.image}
                  transitionLabel="Contact"
                  className={`group inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.28em] transition-colors duration-300 md:hidden ${scrolled ? "text-[#2D3C68]/84" : "text-[#F4F5F2]/82"}`}
                >
                  <span>
                    Enquire
                  </span>

                  <ArrowUpRight strokeWidth={1.5} className="h-[11px] w-[11px]" />
                </TransitionLink>

                <TransitionLink
                  href="/contact"
                  transitionImage={contactItem.image}
                  transitionLabel="Contact"
                  className={`group hidden items-center gap-2 rounded-full border uppercase transition-[background-color,color,border-color] duration-300 md:inline-flex ${isHome ? "px-4 py-1.5 text-[11px] tracking-[0.24em] 2xl:px-5 2xl:py-2 2xl:text-[12px] 2xl:tracking-[0.28em]" : "px-5 py-2 text-[12px] tracking-[0.28em]"} ${scrolled ? "border-[#2D3C68]/14 bg-[#2D3C68] text-[#F4F5F2]" : "border-[#F4F5F2]/32 text-[#F4F5F2] hover:bg-[#F4F5F2] hover:text-[#2D3C68]"}`}
                >
                  <span>
                    Reserve
                  </span>

                  <ArrowUpRight strokeWidth={1.5} className={isHome ? "h-[12px] w-[12px] 2xl:h-[13px] 2xl:w-[13px]" : "h-[13px] w-[13px]"} />
                </TransitionLink>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {menuPortal}
    </>
  );
}