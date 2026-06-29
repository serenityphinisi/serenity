"use client";

import {
  createContext,
  forwardRef,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const PageTransitionContext = createContext(null);

/*
  ============================================================
  SERENITY CURRENT LINES — MASK WINDOW PRODUCTION VERSION
  ============================================================

  Core visual model:
  - Page section does not move.
  - Maritime visual field does not translate.
  - A physical overflow-hidden mask window changes height.
  - Covering:
      mask window grows from bottom to top.
      visual field stays bottom-aligned to viewport.
  - Revealing:
      mask window shrinks from bottom to top.
      visual field stays top-aligned to viewport.
  - No CSS mask-image gradient leak.
  - No top pixel strip.
  - No WebKit mask mismatch.
  - No hard color mismatch at viewport edges.
  - No independent external haze layer.
  - No vertical double-motion from SVG lines.
  - No stage remount flicker between covering and revealing.
  - Reduced motion completes deterministically.
  - Logo remains embedded in the field, with no independent animation.

  Preserved:
  - deterministic cover -> route push -> route changed -> reveal -> idle
  - route changes only after cover is complete
  - interaction locked during transition
  - same-page hash without full transition
  - cross-page hash preserved after reveal
  - hash scroll retry for delayed mounted sections
  - logo preloaded
  - logo embedded inside maritime field
  - logo has no independent animation
  - logo visibility stable on short laptop viewports
  - logo visibility stable on mobile
  - grain sits above logo so logo blends into field
  - prefetch routeKey, not hash path
  - trailing slash normalization
  - failsafe route retry once before reset
  - string href and object href support
  - modifier click / target / download respected
*/

const EASE = [0.22, 1, 0.36, 1];

const ROUTE_SETTLE_MS = 220;
const REDUCED_ROUTE_SETTLE_MS = 50;

const FAILSAFE_MS = 5600;
const REDUCED_FAILSAFE_MS = 1600;

const REDUCED_COVER_HOLD_MS = 120;
const REDUCED_REVEAL_DELAY_MS = 220;
const REDUCED_REVEAL_COMPLETE_MS = 120;

const COVER_DURATION = 1.22;
const REVEAL_DURATION = 0.96;

const HASH_SCROLL_ATTEMPTS = 10;
const HASH_SCROLL_RETRY_MS = 90;

const MASK_WINDOW_FULL_HEIGHT = "104dvh";
const FIELD_VIEWPORT_HEIGHT = "100dvh";

const SERENITY_LOGO =
  "https://res.cloudinary.com/dombq6plz/image/upload/v1777356413/SERENITY_LOGO-02_u1bcf2_1_zc65st.png";

function canUseDOM() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function normalizeHref(href) {
  if (typeof href !== "string") return null;

  const trimmed = href.trim();

  if (!trimmed) return null;

  return trimmed;
}

function normalizePathname(pathname) {
  if (typeof pathname !== "string") return "";

  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

function buildRouteKey(pathname, search = "") {
  const normalizedPathname = normalizePathname(pathname || "/");
  const normalizedSearch = search || "";

  return `${normalizedPathname}${normalizedSearch}`;
}

function hrefObjectToString(href) {
  if (!href || typeof href !== "object") return "";

  const pathname = typeof href.pathname === "string" ? href.pathname : "";
  const hash = typeof href.hash === "string" ? href.hash : "";

  let query = "";

  if (href.query && typeof href.query === "object") {
    const params = new URLSearchParams();

    Object.entries(href.query).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item === undefined || item === null) return;
          params.append(key, String(item));
        });

        return;
      }

      params.set(key, String(value));
    });

    const queryString = params.toString();

    if (queryString) {
      query = `?${queryString}`;
    }
  } else if (typeof href.search === "string") {
    query = href.search.startsWith("?") ? href.search : `?${href.search}`;
  }

  return `${pathname}${query}${hash}`;
}

function hrefToString(href) {
  if (typeof href === "string") return href;

  if (href && typeof href === "object") {
    return hrefObjectToString(href);
  }

  return "";
}

function isModifiedEvent(event) {
  return Boolean(
    event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
  );
}

function isSpecialHref(href) {
  if (typeof href !== "string") return false;

  const value = href.trim().toLowerCase();

  return (
    value.startsWith("mailto:") ||
    value.startsWith("tel:") ||
    value.startsWith("sms:")
  );
}

function isExternalHref(href) {
  if (!canUseDOM()) return false;
  if (typeof href !== "string") return false;

  const trimmed = href.trim();

  if (!trimmed) return false;

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("//")
  ) {
    try {
      const absolute = new URL(trimmed, window.location.href);

      return absolute.origin !== window.location.origin;
    } catch {
      return true;
    }
  }

  return false;
}

function getRouteKeyFromLocation() {
  if (!canUseDOM()) return "";

  return buildRouteKey(window.location.pathname, window.location.search);
}

function getFullLocationPath() {
  if (!canUseDOM()) return "";

  return `${normalizePathname(window.location.pathname)}${
    window.location.search
  }${window.location.hash}`;
}

function safelyDecodeHash(hash) {
  if (!hash || typeof hash !== "string") return "";

  try {
    return decodeURIComponent(hash.replace(/^#/, ""));
  } catch {
    return hash.replace(/^#/, "");
  }
}

function scrollToHash(hash, options = {}) {
  if (!canUseDOM()) return false;
  if (!hash || !hash.startsWith("#")) return false;

  const id = safelyDecodeHash(hash);

  if (!id) return false;

  const target = document.getElementById(id);

  if (!target) return false;

  target.scrollIntoView({
    behavior: options.behavior || "smooth",
    block: "start",
  });

  return true;
}

function scheduleHashScrollWithRetry(hash, options = {}) {
  if (!canUseDOM()) return null;
  if (!hash || !hash.startsWith("#")) return null;

  const behavior = options.behavior || "smooth";
  const attempts =
    typeof options.attempts === "number"
      ? options.attempts
      : HASH_SCROLL_ATTEMPTS;
  const delay =
    typeof options.delay === "number" ? options.delay : HASH_SCROLL_RETRY_MS;

  let count = 0;
  let timer = null;
  let cancelled = false;
  let hasScrolled = false;

  const run = () => {
    if (cancelled) return;

    const didScroll = scrollToHash(hash, {
      behavior: hasScrolled ? "auto" : behavior,
    });

    if (didScroll) {
      hasScrolled = true;
    }

    count += 1;

    if (count >= attempts) return;

    timer = window.setTimeout(run, delay);
  };

  timer = window.setTimeout(run, delay);

  return {
    cancel() {
      cancelled = true;

      if (timer) {
        clearTimeout(timer);
      }
    },
  };
}

function handleSamePageHashNavigation(hash, options = {}) {
  if (!canUseDOM()) return;
  if (!hash || !hash.startsWith("#")) return;

  const nextUrl = `${normalizePathname(window.location.pathname)}${
    window.location.search
  }${hash}`;

  try {
    window.history.pushState(null, "", nextUrl);
  } catch {
    return;
  }

  requestAnimationFrame(() => {
    scrollToHash(hash, {
      behavior: options.behavior || "smooth",
    });
  });
}

function parseInternalTarget(href) {
  if (!canUseDOM()) return null;

  try {
    const target = new URL(href, window.location.origin);

    if (target.origin !== window.location.origin) {
      return null;
    }

    const pathname = normalizePathname(target.pathname);
    const search = target.search || "";
    const hash = target.hash || "";
    const routeKey = buildRouteKey(pathname, search);
    const fullPath = `${pathname}${search}${hash}`;

    return {
      pathname,
      search,
      hash,
      routeKey,
      fullPath,
    };
  } catch {
    return null;
  }
}

function PageTransitionProviderInner({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reduceMotionPreference = useReducedMotion();
  const reduceMotion = Boolean(reduceMotionPreference); 

  const searchString = searchParams?.toString() || "";
  const normalizedPathname = normalizePathname(pathname || "/");

  const routeKey = useMemo(() => {
    return buildRouteKey(
      normalizedPathname,
      searchString ? `?${searchString}` : ""
    );
  }, [normalizedPathname, searchString]);

  const [stage, setStage] = useState("idle");

  const [meta, setMeta] = useState({
    image: null,
    label: null,
  });

  const stageRef = useRef("idle");
  const previousRouteKeyRef = useRef(null);

  const pendingRef = useRef({
    href: null,
    routeKey: null,
    hash: "",
    replace: false,
    scroll: true,
  });

  const transitionActiveRef = useRef(false);
  const coverCompleteRef = useRef(false);
  const routeChangedRef = useRef(false);
  const routePushStartedRef = useRef(false);
  const routeRetryAttemptedRef = useRef(false);
  const revealQueuedRef = useRef(false);

  const reducedCoverTimerRef = useRef(null);
  const reducedRevealTimerRef = useRef(null);
  const reducedRevealCompleteTimerRef = useRef(null);
  const settleTimerRef = useRef(null);
  const failsafeTimerRef = useRef(null);
  const startFailsafeRef = useRef(() => {});
  const hashScrollControllerRef = useRef(null);

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  useEffect(() => {
    if (!canUseDOM()) return;

    const img = new Image();
    img.src = SERENITY_LOGO;
  }, []);

  const clearTimers = useCallback(() => {
    if (reducedCoverTimerRef.current) {
      clearTimeout(reducedCoverTimerRef.current);
      reducedCoverTimerRef.current = null;
    }

    if (reducedRevealTimerRef.current) {
      clearTimeout(reducedRevealTimerRef.current);
      reducedRevealTimerRef.current = null;
    }

    if (reducedRevealCompleteTimerRef.current) {
      clearTimeout(reducedRevealCompleteTimerRef.current);
      reducedRevealCompleteTimerRef.current = null;
    }

    if (settleTimerRef.current) {
      clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }

    if (failsafeTimerRef.current) {
      clearTimeout(failsafeTimerRef.current);
      failsafeTimerRef.current = null;
    }

    if (hashScrollControllerRef.current) {
      hashScrollControllerRef.current.cancel();
      hashScrollControllerRef.current = null;
    }

    revealQueuedRef.current = false;
  }, []);

  const scheduleHashScrollAfterReset = useCallback(
    (hash) => {
      if (!hash) return;

      if (hashScrollControllerRef.current) {
        hashScrollControllerRef.current.cancel();
        hashScrollControllerRef.current = null;
      }

      hashScrollControllerRef.current = scheduleHashScrollWithRetry(hash, {
        behavior: reduceMotion ? "auto" : "smooth",
        attempts: HASH_SCROLL_ATTEMPTS,
        delay: reduceMotion ? 50 : HASH_SCROLL_RETRY_MS,
      });
    },
    [reduceMotion]
  );

  const resetToIdle = useCallback(
    (options = {}) => {
      const preserveHash = options.preserveHash || "";
      const shouldRestoreScroll = Boolean(options.restoreScroll);

      const previousPending = pendingRef.current;

      clearTimers();

      transitionActiveRef.current = false;
      coverCompleteRef.current = false;
      routeChangedRef.current = false;
      routePushStartedRef.current = false;
      routeRetryAttemptedRef.current = false;
      revealQueuedRef.current = false;

      pendingRef.current = {
        href: null,
        routeKey: null,
        hash: "",
        replace: false,
        scroll: true,
      };

      setMeta({
        image: null,
        label: null,
      });

      setStage("idle");

      if (preserveHash) {
        scheduleHashScrollAfterReset(preserveHash);
      }

      if (shouldRestoreScroll && previousPending.hash) {
        scheduleHashScrollAfterReset(previousPending.hash);
      }
    },
    [clearTimers, scheduleHashScrollAfterReset]
  );

  const pushPendingRoute = useCallback(() => {
    if (!transitionActiveRef.current) return;
    if (routePushStartedRef.current) return;

    const { href, replace, scroll } = pendingRef.current;

    if (!href) {
      resetToIdle();
      return;
    }

    routePushStartedRef.current = true;

    try {
      if (replace) {
        router.replace(href, { scroll });
      } else {
        router.push(href, { scroll });
      }
    } catch {
      resetToIdle();
    }
  }, [resetToIdle, router]);

  const scheduleReveal = useCallback(() => {
    if (!transitionActiveRef.current) return;
    if (stageRef.current !== "covering") return;
    if (!coverCompleteRef.current) return;
    if (!routeChangedRef.current) return;
    if (settleTimerRef.current || revealQueuedRef.current) return;

    revealQueuedRef.current = true;

    settleTimerRef.current = setTimeout(
      () => {
        settleTimerRef.current = null;
        revealQueuedRef.current = false;

        if (!transitionActiveRef.current) return;

        if (stageRef.current === "covering") {
          setStage("revealing");
        }
      },
      reduceMotion ? REDUCED_ROUTE_SETTLE_MS : ROUTE_SETTLE_MS
    );
  }, [reduceMotion]);

  const handleCoverComplete = useCallback(() => {
    if (!transitionActiveRef.current) return;

    coverCompleteRef.current = true;

    pushPendingRoute();
    scheduleReveal();
  }, [pushPendingRoute, scheduleReveal]);

  const handleRevealComplete = useCallback(() => {
    if (!transitionActiveRef.current) {
      resetToIdle();
      return;
    }

    const hashToScroll = pendingRef.current.hash || "";

    resetToIdle({
      preserveHash: hashToScroll,
    });
  }, [resetToIdle]);

  const startFailsafe = useCallback(() => {
    if (failsafeTimerRef.current) {
      clearTimeout(failsafeTimerRef.current);
      failsafeTimerRef.current = null;
    }

    failsafeTimerRef.current = setTimeout(
      () => {
        const currentStage = stageRef.current;

        if (!transitionActiveRef.current) {
          resetToIdle();
          return;
        }

        if (currentStage === "covering") {
          if (coverCompleteRef.current && !routePushStartedRef.current) {
            pushPendingRoute();
            startFailsafeRef.current();
            return;
          }

          if (
            coverCompleteRef.current &&
            routePushStartedRef.current &&
            !routeChangedRef.current &&
            !routeRetryAttemptedRef.current
          ) {
            routeRetryAttemptedRef.current = true;
            routePushStartedRef.current = false;
            pushPendingRoute();
            startFailsafeRef.current();
            return;
          }

          if (coverCompleteRef.current && routeChangedRef.current) {
            setStage("revealing");
            return;
          }

          resetToIdle();
          return;
        }

        if (currentStage === "revealing") {
          const hashToScroll = pendingRef.current.hash || "";

          resetToIdle({
            preserveHash: hashToScroll,
          });

          return;
        }

        resetToIdle();
      },
      reduceMotion ? REDUCED_FAILSAFE_MS : FAILSAFE_MS
    );
  }, [pushPendingRoute, reduceMotion, resetToIdle]);

  useEffect(() => {
    startFailsafeRef.current = startFailsafe;
  }, [startFailsafe]);

  useEffect(() => {
    if (!reduceMotion) return;
    if (stage !== "revealing") return;
    if (!transitionActiveRef.current) return;

    if (reducedRevealCompleteTimerRef.current) {
      clearTimeout(reducedRevealCompleteTimerRef.current);
      reducedRevealCompleteTimerRef.current = null;
    }

    reducedRevealCompleteTimerRef.current = setTimeout(() => {
      reducedRevealCompleteTimerRef.current = null;

      if (!transitionActiveRef.current) return;
      if (stageRef.current !== "revealing") return;

      handleRevealComplete();
    }, REDUCED_REVEAL_COMPLETE_MS);

    return () => {
      if (reducedRevealCompleteTimerRef.current) {
        clearTimeout(reducedRevealCompleteTimerRef.current);
        reducedRevealCompleteTimerRef.current = null;
      }
    };
  }, [handleRevealComplete, reduceMotion, stage]);

  const navigate = useCallback(
    (href, options = {}) => {
      if (!canUseDOM()) return;

      const normalized = normalizeHref(hrefToString(href));

      if (!normalized) return;

      if (stageRef.current !== "idle" || transitionActiveRef.current) return;

      if (isSpecialHref(normalized)) {
        window.location.href = normalized;
        return;
      }

      if (normalized.startsWith("#")) {
        handleSamePageHashNavigation(normalized, {
          behavior: reduceMotion ? "auto" : "smooth",
        });
        return;
      }

      if (isExternalHref(normalized)) {
        window.location.href = normalized;
        return;
      }

      const target = parseInternalTarget(normalized);

      if (!target) return;

      const currentRouteKey = getRouteKeyFromLocation();
      const currentFullPath = getFullLocationPath();

      const isSameFullPath = target.fullPath === currentFullPath;
      const isSameRoute = target.routeKey === currentRouteKey;
      const isSamePageHash = isSameRoute && target.hash;

      if (isSameFullPath) return;

      if (isSamePageHash) {
        handleSamePageHashNavigation(target.hash, {
          behavior: reduceMotion ? "auto" : "smooth",
        });
        return;
      }

      clearTimers();

      transitionActiveRef.current = true;
      coverCompleteRef.current = false;
      routeChangedRef.current = false;
      routePushStartedRef.current = false;
      routeRetryAttemptedRef.current = false;
      revealQueuedRef.current = false;

      pendingRef.current = {
        href: target.fullPath,
        routeKey: target.routeKey,
        hash: target.hash || "",
        replace: Boolean(options.replace),
        scroll: target.hash ? false : options.scroll !== false,
      };

      setMeta({
        image: options.image || null,
        label: options.label || null,
      });

      try {
        router.prefetch(target.routeKey);
      } catch {
        // Prefetch is only an enhancement.
      }

      setStage("covering");
      startFailsafe();

      if (reduceMotion) {
        reducedCoverTimerRef.current = setTimeout(() => {
          reducedCoverTimerRef.current = null;

          if (!transitionActiveRef.current) return;

          coverCompleteRef.current = true;

          pushPendingRoute();
          scheduleReveal();
        }, REDUCED_COVER_HOLD_MS);

        reducedRevealTimerRef.current = setTimeout(() => {
          reducedRevealTimerRef.current = null;

          if (!transitionActiveRef.current) return;

          if (
            stageRef.current === "covering" &&
            coverCompleteRef.current &&
            routeChangedRef.current
          ) {
            setStage("revealing");
          }
        }, REDUCED_REVEAL_DELAY_MS);
      }
    },
    [
      clearTimers,
      pushPendingRoute,
      reduceMotion,
      router,
      scheduleReveal,
      startFailsafe,
    ]
  );

  useEffect(() => {
    if (previousRouteKeyRef.current === null) {
      previousRouteKeyRef.current = routeKey;
      return;
    }

    if (previousRouteKeyRef.current === routeKey) {
      return;
    }

    previousRouteKeyRef.current = routeKey;

    if (!transitionActiveRef.current) return;

    routeChangedRef.current = true;
    scheduleReveal();
  }, [routeKey, scheduleReveal]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  const contextValue = useMemo(
    () => ({
      stage,
      label: meta.label,
      image: meta.image,
      navigate,
      isTransitioning: stage !== "idle",
    }),
    [meta.image, meta.label, navigate, stage]
  );

  return (
    <PageTransitionContext.Provider value={contextValue}>
      {children}

      <SerenityCurrentLines
        stage={stage}
        reduceMotion={reduceMotion}
        onCoverComplete={handleCoverComplete}
        onRevealComplete={handleRevealComplete}
      />
    </PageTransitionContext.Provider>
  );
}

export function PageTransitionProvider({ children }) {
  return (
    <Suspense fallback={null}>
      <PageTransitionProviderInner>{children}</PageTransitionProviderInner>
    </Suspense>
  );
}

function SerenityCurrentLines({
  stage,
  reduceMotion,
  onCoverComplete,
  onRevealComplete,
}) {
  const active = stage === "covering" || stage === "revealing";
  const isCovering = stage === "covering";
  const isRevealing = stage === "revealing";

  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          key="serenity-current-lines"
          aria-hidden="true"
          className="
            pointer-events-auto
            fixed
            inset-0
            z-[9999]
            overflow-hidden
            bg-transparent
          "
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.01 }}
        >
          {reduceMotion ? (
            <ReducedMotionCurrent stage={stage} />
          ) : (
            <>
              <motion.div
                className="absolute inset-0 bg-[#050815]"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isCovering ? 0.1 : 0,
                }}
                transition={{
                  duration: isCovering ? 0.5 : 0.36,
                  ease: EASE,
                }}
              />

              <MaskWindowMaritimeField
                isCovering={isCovering}
                isRevealing={isRevealing}
                onCoverComplete={onCoverComplete}
                onRevealComplete={onRevealComplete}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MaskWindowMaritimeField({
  isCovering,
  isRevealing,
  onCoverComplete,
  onRevealComplete,
}) {
  const duration = isCovering ? COVER_DURATION : REVEAL_DURATION;

  return (
    <motion.div
      className="
        absolute
        left-0
        right-0
        overflow-hidden
        bg-[#050815]
      "
      style={
        isCovering
          ? {
              bottom: 0,
              top: "auto",
              contain: "layout paint style",
              willChange: "height",
            }
          : {
              top: 0,
              bottom: "auto",
              contain: "layout paint style",
              willChange: "height",
            }
      }
      initial={{
        height: "0dvh",
      }}
      animate={{
        height: isCovering ? MASK_WINDOW_FULL_HEIGHT : "0dvh",
      }}
      transition={{
        duration,
        ease: EASE,
      }}
      onAnimationComplete={() => {
        if (isCovering) {
          onCoverComplete();
          return;
        }

        if (isRevealing) {
          onRevealComplete();
        }
      }}
    >
      <div
        className="
          absolute
          left-0
          right-0
          overflow-hidden
          bg-[#2D3C68]
        "
        style={
          isCovering
            ? {
                bottom: 0,
                top: "auto",
                height: FIELD_VIEWPORT_HEIGHT,
              }
            : {
                top: 0,
                bottom: "auto",
                height: FIELD_VIEWPORT_HEIGHT,
              }
        }
      >
        <MaritimeFieldVisual isCovering={isCovering} />
      </div>

      <WindowEdge isCovering={isCovering} />
    </motion.div>
  );
}

function MaritimeFieldVisual({ isCovering }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#2D3C68]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(45,60,104,0.98) 0%, rgba(29,45,82,1) 46%, rgba(5,8,15,1) 100%)",
        }}
      />

      <div className="absolute inset-0 bg-[rgba(7,11,22,0.66)]" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 38% 34%, rgba(244,245,242,0.058), transparent 54%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 76% 18%, rgba(176,141,87,0.09), transparent 42%)",
        }}
      />

      <div
        className="
          absolute
          left-0
          right-0
          top-0
          h-[20dvh]
        "
        style={{
          background:
            "linear-gradient(to bottom, rgba(244,245,242,0.03), transparent 72%)",
        }}
      />

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-[54dvh]
        "
        style={{
          background:
            "linear-gradient(to top, rgba(5,8,15,0.94), rgba(5,8,15,0.42), transparent)",
        }}
      />

      <CurrentLineField isCovering={isCovering} />

      <BottomSerenitySeal />

      <div
        className="
          absolute
          inset-[-8%]
          z-[7]
          opacity-[0.016]
          mix-blend-soft-light
        "
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(244,245,242,0.7) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
    </div>
  );
}

function WindowEdge({ isCovering }) {
  return (
    <motion.div
      className="
        pointer-events-none
        absolute
        left-0
        right-0
        z-[8]
        h-[34dvh]
        overflow-hidden
        blur-[12px]
      "
      style={
        isCovering
          ? {
              top: 0,
            }
          : {
              bottom: 0,
            }
      }
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: isCovering ? [0, 0.58, 0] : [0.48, 0.42, 0],
      }}
      transition={{
        duration: isCovering ? COVER_DURATION : REVEAL_DURATION,
        ease: EASE,
        times: isCovering ? [0, 0.58, 1] : [0, 0.44, 1],
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: isCovering
            ? "linear-gradient(to bottom, rgba(45,60,104,0.72) 0%, rgba(45,60,104,0.24) 42%, rgba(244,245,242,0.03) 64%, transparent 100%)"
            : "linear-gradient(to top, rgba(45,60,104,0.72) 0%, rgba(45,60,104,0.24) 42%, rgba(244,245,242,0.03) 64%, transparent 100%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 52% 54%, rgba(244,245,242,0.06), transparent 58%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 74% 42%, rgba(176,141,87,0.05), transparent 54%)",
        }}
      />
    </motion.div>
  );
}

function CurrentLineField({ isCovering }) {
  const rawId = useId();
  const safeId = rawId.replace(/:/g, "");

  const brassId = `serenityCurrentBrass-${safeId}`;
  const foamId = `serenityCurrentFoam-${safeId}`;
  const glowId = `serenityCurrentGlow-${safeId}`;

  return (
    <svg
      className="
        absolute
        inset-0
        z-[5]
        h-full
        w-full
      "
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={brassId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B08D57" stopOpacity="0" />
          <stop offset="18%" stopColor="#B08D57" stopOpacity="0.12" />
          <stop offset="50%" stopColor="#B08D57" stopOpacity="0.52" />
          <stop offset="82%" stopColor="#B08D57" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#B08D57" stopOpacity="0" />
        </linearGradient>

        <linearGradient id={foamId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F4F5F2" stopOpacity="0" />
          <stop offset="24%" stopColor="#F4F5F2" stopOpacity="0.042" />
          <stop offset="50%" stopColor="#F4F5F2" stopOpacity="0.13" />
          <stop offset="76%" stopColor="#F4F5F2" stopOpacity="0.042" />
          <stop offset="100%" stopColor="#F4F5F2" stopOpacity="0" />
        </linearGradient>

        <filter id={glowId}>
          <feGaussianBlur stdDeviation="1.35" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.path
        d="M-120 330 C180 250, 330 420, 570 350 S970 210, 1250 310 S1560 440, 1740 330"
        fill="none"
        stroke={`url(#${foamId})`}
        strokeWidth="1"
        strokeLinecap="round"
        initial={
          isCovering
            ? { pathLength: 0, opacity: 0, x: -10, y: 0 }
            : { pathLength: 0.86, opacity: 0.58, x: 10, y: 0 }
        }
        animate={
          isCovering
            ? { pathLength: 0.86, opacity: 0.58, x: 10, y: 0 }
            : { pathLength: 0.86, opacity: 0, x: 24, y: 0 }
        }
        transition={{
          pathLength: {
            duration: 1.05,
            delay: isCovering ? 0.2 : 0,
            ease: EASE,
          },
          opacity: {
            duration: isCovering ? 0.72 : 0.38,
            delay: isCovering ? 0.2 : 0,
            ease: EASE,
          },
          x: {
            duration: isCovering ? 1.16 : 0.72,
            ease: EASE,
          },
          y: {
            duration: isCovering ? 1.16 : 0.72,
            ease: EASE,
          },
        }}
      />

      <motion.path
        d="M-140 420 C150 340, 360 500, 620 430 S980 320, 1220 410 S1510 540, 1740 430"
        fill="none"
        stroke={`url(#${foamId})`}
        strokeWidth="1"
        strokeLinecap="round"
        initial={
          isCovering
            ? { pathLength: 0, opacity: 0, x: -14, y: 0 }
            : { pathLength: 0.92, opacity: 0.48, x: 7, y: 0 }
        }
        animate={
          isCovering
            ? { pathLength: 0.92, opacity: 0.48, x: 7, y: 0 }
            : { pathLength: 0.92, opacity: 0, x: 22, y: 0 }
        }
        transition={{
          pathLength: {
            duration: 1.16,
            delay: isCovering ? 0.28 : 0,
            ease: EASE,
          },
          opacity: {
            duration: isCovering ? 0.78 : 0.36,
            delay: isCovering ? 0.28 : 0,
            ease: EASE,
          },
          x: {
            duration: isCovering ? 1.18 : 0.74,
            ease: EASE,
          },
          y: {
            duration: isCovering ? 1.18 : 0.74,
            ease: EASE,
          },
        }}
      />

      <motion.path
        d="M-100 555 C150 480, 410 610, 660 530 S1010 440, 1260 525 S1510 650, 1740 540"
        fill="none"
        stroke={`url(#${foamId})`}
        strokeWidth="1"
        strokeLinecap="round"
        initial={
          isCovering
            ? { pathLength: 0, opacity: 0, x: -18, y: 0 }
            : { pathLength: 0.8, opacity: 0.42, x: 8, y: 0 }
        }
        animate={
          isCovering
            ? { pathLength: 0.8, opacity: 0.42, x: 8, y: 0 }
            : { pathLength: 0.8, opacity: 0, x: 20, y: 0 }
        }
        transition={{
          pathLength: {
            duration: 1.22,
            delay: isCovering ? 0.36 : 0,
            ease: EASE,
          },
          opacity: {
            duration: isCovering ? 0.82 : 0.36,
            delay: isCovering ? 0.36 : 0,
            ease: EASE,
          },
          x: {
            duration: isCovering ? 1.2 : 0.76,
            ease: EASE,
          },
          y: {
            duration: isCovering ? 1.2 : 0.76,
            ease: EASE,
          },
        }}
      />

      <motion.path
        d="M-160 690 C90 610, 300 750, 560 690 S940 560, 1210 650 S1510 780, 1760 680"
        fill="none"
        stroke={`url(#${foamId})`}
        strokeWidth="1"
        strokeLinecap="round"
        initial={
          isCovering
            ? { pathLength: 0, opacity: 0, x: -22, y: 0 }
            : { pathLength: 0.76, opacity: 0.34, x: 6, y: 0 }
        }
        animate={
          isCovering
            ? { pathLength: 0.76, opacity: 0.34, x: 6, y: 0 }
            : { pathLength: 0.76, opacity: 0, x: 18, y: 0 }
        }
        transition={{
          pathLength: {
            duration: 1.3,
            delay: isCovering ? 0.46 : 0,
            ease: EASE,
          },
          opacity: {
            duration: isCovering ? 0.86 : 0.34,
            delay: isCovering ? 0.46 : 0,
            ease: EASE,
          },
          x: {
            duration: isCovering ? 1.22 : 0.78,
            ease: EASE,
          },
          y: {
            duration: isCovering ? 1.22 : 0.78,
            ease: EASE,
          },
        }}
      />

      <motion.path
        d="M-180 470 C150 330, 430 560, 735 445 S1180 245, 1510 420 S1760 570, 1900 440"
        fill="none"
        stroke={`url(#${brassId})`}
        strokeWidth="1.22"
        strokeLinecap="round"
        filter={`url(#${glowId})`}
        initial={
          isCovering
            ? { pathLength: 0, opacity: 0, x: -16, y: 0 }
            : { pathLength: 0.9, opacity: 0.76, x: 10, y: 0 }
        }
        animate={
          isCovering
            ? { pathLength: 0.9, opacity: 0.76, x: 10, y: 0 }
            : { pathLength: 0.9, opacity: 0, x: 26, y: 0 }
        }
        transition={{
          pathLength: {
            duration: 1.16,
            delay: isCovering ? 0.16 : 0,
            ease: EASE,
          },
          opacity: {
            duration: isCovering ? 0.66 : 0.34,
            delay: isCovering ? 0.16 : 0,
            ease: EASE,
          },
          x: {
            duration: isCovering ? 1.14 : 0.72,
            ease: EASE,
          },
          y: {
            duration: isCovering ? 1.14 : 0.72,
            ease: EASE,
          },
        }}
      />
    </svg>
  );
}

function BottomSerenitySeal() {
  return (
    <div
      className="
        absolute
        left-1/2
        z-[6]
        h-auto
        -translate-x-1/2
      "
      style={{
        bottom: "clamp(36px, 7.4dvh, 78px)",
        width: "clamp(82px, 8vw, 108px)",
        opacity: 0.44,
        filter: "brightness(0) invert(1)",
        mixBlendMode: "screen",
      }}
    >
      <img
        src={SERENITY_LOGO}
        alt=""
        aria-hidden="true"
        draggable="false"
        className="
          block
          h-auto
          w-full
          select-none
          object-contain
        "
      />
    </div>
  );
}

function ReducedMotionCurrent({ stage }) {
  const isCovering = stage === "covering";

  return (
    <div
      className="
        absolute
        inset-0
        bg-[#2D3C68]
      "
      style={{
        opacity: isCovering ? 1 : 0,
      }}
    >
      <div className="absolute inset-0 bg-[rgba(7,11,22,0.74)]" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 68% 22%, rgba(176,141,87,0.07), transparent 52%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 35% 45%, rgba(244,245,242,0.04), transparent 58%)",
        }}
      />

      <div
        className="
          absolute
          inset-[-8%]
          z-[7]
          opacity-[0.016]
          mix-blend-soft-light
        "
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(244,245,242,0.7) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div
        className="
          absolute
          left-1/2
          z-[6]
          h-auto
          -translate-x-1/2
        "
        style={{
          bottom: "clamp(36px, 7.4dvh, 78px)",
          width: "clamp(82px, 8vw, 108px)",
          opacity: 0.44,
          filter: "brightness(0) invert(1)",
          mixBlendMode: "screen",
        }}
      >
        <img
          src={SERENITY_LOGO}
          alt=""
          aria-hidden="true"
          draggable="false"
          className="
            block
            h-auto
            w-full
            select-none
            object-contain
          "
        />
      </div>
    </div>
  );
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);

  if (!context) {
    throw new Error(
      "usePageTransition must be used within PageTransitionProvider"
    );
  }

  return context;
}

export const TransitionLink = forwardRef(function TransitionLink(
  {
    href,
    replace = false,
    scroll = true,
    image = null,
    label = null,
    target,
    onClick,
    children,
    ...props
  },
  ref
) {
  const { navigate, isTransitioning } = usePageTransition();

  const normalizedHref = hrefToString(href);

  const handleClick = useCallback(
    (event) => {
      if (typeof onClick === "function") {
        onClick(event);
      }

      if (event.defaultPrevented) return;
      if (isModifiedEvent(event)) return;
      if (target && target !== "_self") return;
      if (props.download) return;
      if (!normalizedHref) return;

      const normalized = normalizeHref(normalizedHref);

      if (!normalized) return;

      if (isSpecialHref(normalized) || isExternalHref(normalized)) {
        return;
      }

      event.preventDefault();

      if (isTransitioning) return;

      navigate(normalized, {
        replace,
        scroll,
        image,
        label,
      });
    },
    [
      image,
      isTransitioning,
      label,
      navigate,
      normalizedHref,
      onClick,
      props.download,
      replace,
      scroll,
      target,
    ]
  );

  return (
    <Link
      ref={ref}
      href={href}
      replace={replace}
      scroll={scroll}
      target={target}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
});
