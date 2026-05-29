"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "../../lib/gsap"
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePageTransition } from "@/components/PageTransitionProvider";
import TransitionLink from "@/components/TransitionLink";

import Footer from '../../components/Footer'


export default function Page() {
  return (
    <main className="bg-[#0a0f14] text-white overflow-hidden">
      <Hero /> 
      {/* <About/> */}
      <Experience/>
      {/* <YachtBreaking/> */}
      {/* <Identity/> */}
      {/* <Spaces/> */}
      <Cabins/>
      {/* <LivingSpaces/> */}
      <DeckAndSpecs/>
      {/* <Closing/> */}
      {/* <Gallery/> */}
      {/* <Reservation/> */}
      <Footer/>
    </main>
  )
}


function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const slabRef = useRef(null);

  const EASE = [0.22, 1, 0.36, 1];

  const shouldReduceMotion = useReducedMotion();
  const { stage } = usePageTransition();

  const hasPlayedEntranceRef = useRef(false);

  const [heroEntranceReady, setHeroEntranceReady] = useState(
    stage !== "covering"
  );

  useEffect(() => {
    if (hasPlayedEntranceRef.current) return;

    if (stage === "covering") {
      setHeroEntranceReady(false);
      return;
    }

    hasPlayedEntranceRef.current = true;
    setHeroEntranceReady(true);
  }, [stage]);

  useEffect(() => {
    if (!sectionRef.current || shouldReduceMotion) return;

    const serenityEase = (progress) => {
      const x1 = 0.22;
      const y1 = 1;
      const x2 = 0.36;
      const y2 = 1;

      const sampleCurveX = (t) => {
        const invT = 1 - t;

        return (
          3 * invT * invT * t * x1 +
          3 * invT * t * t * x2 +
          t * t * t
        );
      };

      const sampleCurveY = (t) => {
        const invT = 1 - t;

        return (
          3 * invT * invT * t * y1 +
          3 * invT * t * t * y2 +
          t * t * t
        );
      };

      const sampleDerivativeX = (t) => {
        const invT = 1 - t;

        return (
          3 * invT * invT * x1 +
          6 * invT * t * (x2 - x1) +
          3 * t * t * (1 - x2)
        );
      };

      let t = progress;

      for (let i = 0; i < 6; i += 1) {
        const x = sampleCurveX(t) - progress;
        const derivative = sampleDerivativeX(t);

        if (Math.abs(x) < 0.0001 || derivative === 0) break;

        t -= x / derivative;
        t = Math.max(0, Math.min(1, t));
      }

      return sampleCurveY(t);
    };

    const ctx = gsap.context(() => {
      // ── BG parallax ─────────────────────────────────────────────
      gsap.to(bgRef.current, {
        y: "18%",
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // ── Content drift ────────────────────────────────────────────
      gsap.to(contentRef.current, {
        y: "6%",
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "42% top",
          scrub: 0.8,
        },
      });

      // ── Slab rise ────────────────────────────────────────────────
      gsap.set(slabRef.current, {
        y: 56,
        opacity: 0,
      });

      gsap.to(slabRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: serenityEase,
        scrollTrigger: {
          trigger: slabRef.current,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  const fm = (delay = 0) => ({
    initial: shouldReduceMotion
      ? false
      : {
          opacity: 0,
          y: 24,
          filter: "blur(6px)",
        },

    animate: heroEntranceReady
      ? {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }
      : {
          opacity: 0,
          y: 24,
          filter: "blur(8px)",
        },

    transition: shouldReduceMotion
      ? {
          duration: 0.01,
        }
      : {
          duration: 1.2,
          delay,
          ease: EASE,
        },
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#F4F5F2]"
    >
      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <div
        className="
          relative
          h-[100svh]
          min-h-[640px]
          overflow-hidden
          bg-[#2D3C68]
          sm:min-h-[700px]
          md:min-h-[760px]
        "
      >
        {/* BG image */}
        <div
          ref={bgRef}
          className="absolute inset-0 scale-[1.06] will-change-transform"
          style={{
            transformOrigin: "center top",
          }}
        >
          <img
            src="https://res.cloudinary.com/dombq6plz/image/upload/v1780071039/ChatGPT_Image_May_29_2026_11_10_05_PM_1_kgiuxg.png"
            alt="Serenity phinisi at sea"
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* ── Serenity Blue Dampening Overlay ── */}
        <div className="absolute inset-0 bg-[#2D3C68]/[0.04]" />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(45,60,104,0.42) 0%, rgba(45,60,104,0.34) 38%, rgba(45,60,104,0.56) 72%, rgba(45,60,104,0.76) 100%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(45,60,104,0.78) 0%, rgba(45,60,104,0.42) 34%, rgba(45,60,104,0.18) 70%, transparent 100%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 44%, rgba(45,60,104,0.08) 0%, rgba(45,60,104,0.24) 54%, rgba(45,60,104,0.42) 100%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 35% 45%, rgba(255,255,255,0.04), transparent 56%)",
          }}
        />

        {/* ── Content ── */}
        <div
          ref={contentRef}
          className="relative z-10 flex h-full items-center justify-center px-6 text-center will-change-transform md:px-10 lg:px-14"
        >
          <div className="max-w-[620px]">
            <motion.div
              {...fm(0)}
              className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#F4F5F2]/[0.68]"
            >
              The Yacht
            </motion.div>

            <h1
              className="
                font-[Gambarino]
                text-[48px]
                leading-[0.98]
                tracking-[-0.04em]
                text-[#F4F5F2]
                sm:text-[56px]
                md:text-[76px]
              "
            >
              <motion.span {...fm(0.14)} className="block">
                Built by hand
              </motion.span>

              <motion.span {...fm(0.26)} className="block opacity-[0.98]">
                in South Sulawesi
              </motion.span>
            </h1>

            <motion.p
              {...fm(0.4)}
              className="mx-auto mt-7 max-w-[430px] text-[14px] leading-[1.82] text-[#F4F5F2]/[0.76] md:text-[15px]"
            >
              A contemporary phinisi shaped for open decks, quiet cabins, and
              life lived close to the water.
            </motion.p>
          </div>
        </div>

        {/* Exit bridge — hero bleeds into slab */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[220px]"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(244,245,242,0.06) 42%, rgba(244,245,242,0.94) 100%)",
          }}
        />
      </div>

      {/* ════════════════════════════════════════
          STRUCTURAL SLAB
          Left = vessel proof.
          Right = maker's note.
      ════════════════════════════════════════ */}
      <div className="relative z-20 -mt-[82px] px-6 pb-24 md:-mt-[110px] md:px-10 md:pb-32 lg:px-14">
        <div
          ref={slabRef}
          className={`
            relative mx-auto max-w-[1180px]
            overflow-hidden
            border border-[#2D3C68]/8
            bg-[#F4F5F2]/96
            backdrop-blur-[10px]
            shadow-[0_24px_60px_rgba(20,30,50,0.08)]
            ${shouldReduceMotion ? "" : "opacity-0"}
          `}
        >
          {/* Brass top edge — gradient fade in/out */}
          <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-[#B08D57]/0 via-[#B08D57]/40 to-[#B08D57]/0" />

          <div className="grid md:grid-cols-[1.1fr_0.9fr]">
            {/* ── LEFT: hard identity ── */}
            <div className="relative px-8 py-10 md:px-14 md:py-14">
              <div className="pointer-events-none absolute right-4 top-2 select-none font-[Gambarino] text-[120px] leading-none tracking-[-0.06em] text-[#2D3C68]/[0.03] md:text-[180px]">
                40
              </div>

              <div className="relative z-[2]">
                <div className="mb-8 h-[1px] w-8 bg-[#B08D57]/60" />

                <h2 className="font-[Gambarino] text-[34px] leading-[1.12] tracking-[-0.03em] text-[#2D3C68] md:text-[46px]">
                  40.75 meters
                  <br />
                  Four cabins
                  <br />
                  Twelve guests
                </h2>
              </div>
            </div>

            {/* ── RIGHT: maker's note ── */}
            <div className="border-t border-[#2D3C68]/8 px-8 py-10 md:border-l md:border-t-0 md:px-14 md:py-14">
              <div className="flex h-full flex-col justify-center">
                <p className="text-[10px] uppercase tracking-[0.34em] text-[#2D3C68]/46">
                  Tanah Beru & Bira
                </p>

                <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-[#2D3C68]/34">
                  South Sulawesi
                </p>

                <p className="mt-8 max-w-[390px] text-[15px] leading-[1.9] text-[#2D3C68]/66">
                  An ironwood hull, teak deck, and brass fittings — built from
                  the ground up, not converted.
                </p>
              </div>
            </div>
          </div>

          {/* Subtle slab depth */}
          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              h-[90px]
              bg-gradient-to-b
              from-transparent
              to-[#2D3C68]/[0.018]
            "
          />
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="bg-[#F4F5F2] pt-[120px] pb-[100px] px-6 text-[#2D3C68]">

      <div className="max-w-[1000px] mx-auto">

        {/* LABEL */}
        <p className="text-[11px] tracking-[0.35em] text-[#2D3C68]/40 uppercase mb-6">
          About
        </p>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* LEFT (PHILOSOPHY BRIDGE) */}
          <h2 className="font-[Gambarino] text-[36px] md:text-[44px] leading-[1.2]">
            A Yacht Designed
            <br />
            for Life On Board
          </h2>

          {/* RIGHT (DATA + CONTEXT) */}
          <p className="text-[15px] leading-[1.7] text-[#2D3C68]/70">
            Serenity is a 40.75 meter phinisi yacht accommodating up to 12 guests,
            supported by a full crew on board. The layout is shaped to balance shared
            moments and private space across multiple decks, allowing each journey to
            unfold naturally over time.
          </p>

        </div>

      </div>
    </section>
  );
}

function Experience() {
  const sectionRef = useRef(null);
  const upperRef = useRef(null);
  const mainRef = useRef(null);
  const closingRef = useRef(null);
  const fullBleedRef = useRef(null);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    const revealNodes = sectionRef.current.querySelectorAll(
      ".experience-reveal"
    );

    const imageNodes = sectionRef.current.querySelectorAll(".experience-image");

    const allNodes = [
      ...revealNodes,
      ...imageNodes,
      fullBleedRef.current,
    ].filter(Boolean);

    if (shouldReduceMotion) {
      gsap.set(allNodes, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      });

      return;
    }

    const serenityEase = (progress) => {
      const x1 = 0.22;
      const y1 = 1;
      const x2 = 0.36;
      const y2 = 1;

      const sampleCurveX = (t) => {
        const invT = 1 - t;

        return (
          3 * invT * invT * t * x1 +
          3 * invT * t * t * x2 +
          t * t * t
        );
      };

      const sampleCurveY = (t) => {
        const invT = 1 - t;

        return (
          3 * invT * invT * t * y1 +
          3 * invT * t * t * y2 +
          t * t * t
        );
      };

      const sampleDerivativeX = (t) => {
        const invT = 1 - t;

        return (
          3 * invT * invT * x1 +
          6 * invT * t * (x2 - x1) +
          3 * t * t * (1 - x2)
        );
      };

      let t = progress;

      for (let i = 0; i < 6; i += 1) {
        const x = sampleCurveX(t) - progress;
        const derivative = sampleDerivativeX(t);

        if (Math.abs(x) < 0.0001 || derivative === 0) break;

        t -= x / derivative;
        t = Math.max(0, Math.min(1, t));
      }

      return sampleCurveY(t);
    };

    const mm = gsap.matchMedia();

    mm.add(
      {
        mobile: "(max-width: 767px)",
        desktop: "(min-width: 768px)",
      },
      (context) => {
        const { mobile } = context.conditions;

        const ctx = gsap.context(() => {
          const createBlockReveal = (triggerRef) => {
            const image = triggerRef.current?.querySelector(
              ".experience-image"
            );

            const copyItems = triggerRef.current?.querySelectorAll(
              ".experience-reveal"
            );

            if (image) {
              gsap.fromTo(
                image,
                {
                  opacity: 0,
                  y: mobile ? 18 : 24,
                  filter: "blur(5px)",
                },
                {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 1.05,
                  ease: serenityEase,
                  scrollTrigger: {
                    trigger: triggerRef.current,
                    start: mobile ? "top 84%" : "top 78%",
                    once: true,
                  },
                }
              );
            }

            if (copyItems && copyItems.length > 0) {
              gsap.fromTo(
                copyItems,
                {
                  opacity: 0,
                  y: mobile ? 14 : 18,
                  filter: "blur(4px)",
                },
                {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 0.95,
                  stagger: 0.07,
                  ease: serenityEase,
                  scrollTrigger: {
                    trigger: triggerRef.current,
                    start: mobile ? "top 82%" : "top 76%",
                    once: true,
                  },
                }
              );
            }
          };

          createBlockReveal(upperRef);
          createBlockReveal(mainRef);

          if (closingRef.current) {
            gsap.fromTo(
              closingRef.current.querySelectorAll(".experience-reveal"),
              {
                opacity: 0,
                y: 18,
                filter: "blur(4px)",
              },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1,
                ease: serenityEase,
                scrollTrigger: {
                  trigger: closingRef.current,
                  start: mobile ? "top 86%" : "top 80%",
                  once: true,
                },
              }
            );
          }

          if (fullBleedRef.current) {
            gsap.fromTo(
              fullBleedRef.current,
              {
                opacity: 0,
                y: 20,
                filter: "blur(5px)",
              },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.15,
                ease: serenityEase,
                scrollTrigger: {
                  trigger: fullBleedRef.current,
                  start: mobile ? "top 88%" : "top 84%",
                  once: true,
                },
              }
            );
          }
        }, sectionRef);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-x-hidden
        bg-[#F4F5F2]
        px-6
        pb-0
        pt-[86px]
        text-[#2D3C68]
        md:px-10
        md:pt-[150px]
        lg:px-14
      "
    >
      <div className="relative mx-auto max-w-[1040px]">
        {/* ════════════════════════════════════════
            BLOCK 1 — UPPER DECK
            Mobile: controlled edge bleed.
            Desktop: original portrait ratio retained.
        ════════════════════════════════════════ */}
        <div
          ref={upperRef}
          className="
            mb-[112px]
            grid
            items-center
            gap-12
            md:mb-[220px]
            md:grid-cols-[1.08fr_0.92fr]
            md:gap-24
          "
        >
          {/* IMAGE FIELD */}
          <div className="relative w-full">
            <div className="relative -mx-6 md:mx-0">
              <div
                className="
                  experience-image
                  relative
                  aspect-[4/5]
                  overflow-hidden
                  bg-[#2D3C68]/[0.04]
                "
              >
                <img
                  src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068969/42_bdtrmb.webp"
                  alt="Upper deck"
                  loading="lazy"
                  decoding="async"
                  className="
                    h-full
                    w-full
                    object-cover
                    object-center
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#2D3C68]/10
                    via-transparent
                    to-transparent
                  "
                />
              </div>
            </div>
          </div>

          {/* COPY */}
          <div className="max-w-[470px] md:ml-auto">
            <p
              className="
                experience-reveal
                text-[10px]
                uppercase
                tracking-[0.38em]
                text-[#2D3C68]/40
              "
            >
              Upper Deck
            </p>

            <div
              className="
                experience-reveal
                mt-5
                h-px
                w-9
                bg-[#B08D57]/60
              "
            />

            <h2
              className="
                experience-reveal
                mt-6
                font-[Gambarino]
                text-[38px]
                leading-[1.1]
                tracking-[-0.03em]
                text-[#2D3C68]
                md:text-[48px]
              "
            >
              Open on
              <br />
              Every Side
            </h2>

            <p
              className="
                experience-reveal
                mt-6
                max-w-[430px]
                text-[14px]
                leading-[1.9]
                text-[#2D3C68]/64
                md:text-[15px]
              "
            >
              The upper deck runs across the full width of Serenity, with
              sunbeds along the length and a bar at one end. Open sky overhead,
              sea on every side, and nothing between the deck and the horizon.
            </p>
          </div>
        </div>

        {/* ════════════════════════════════════════
            BLOCK 2 — MAIN DECK
            Mobile: image first, contained.
            Desktop: original portrait ratio retained.
        ════════════════════════════════════════ */}
        <div
          ref={mainRef}
          className="
            mb-[104px]
            grid
            items-start
            gap-12
            md:mb-[190px]
            md:grid-cols-[0.88fr_1.12fr]
            md:gap-20
          "
        >
          {/* COPY */}
          <div
            className="
              order-2
              max-w-[410px]
              pt-0
              md:order-1
              md:pt-2
            "
          >
            <p
              className="
                experience-reveal
                text-[10px]
                uppercase
                tracking-[0.38em]
                text-[#2D3C68]/40
              "
            >
              Main Deck
            </p>

            <div
              className="
                experience-reveal
                mt-5
                h-px
                w-9
                bg-[#B08D57]/60
              "
            />

            <h2
              className="
                experience-reveal
                mt-6
                font-[Gambarino]
                text-[34px]
                leading-[1.14]
                tracking-[-0.025em]
                text-[#2D3C68]
                md:text-[42px]
              "
            >
              Inside,
              <br />
              Still at Sea
            </h2>

            <p
              className="
                experience-reveal
                mt-6
                text-[14px]
                leading-[1.88]
                text-[#2D3C68]/64
                md:text-[15px]
              "
            >
              The main deck interior runs through the vessel with windows on
              both sides, keeping the sea in frame. A living room, communal
              table, and bar sit together without closing the space off.
            </p>
          </div>

          {/* IMAGE */}
          <div
            className="
              order-1
              relative
              md:order-2
              md:mt-[32px]
            "
          >
            <div
              className="
                experience-image
                relative
                aspect-[4/5]
                overflow-hidden
                bg-[#2D3C68]/[0.04]
              "
            >
              <img
                src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/04_fqtqkn.webp"
                alt="Main deck"
                loading="lazy"
                decoding="async"
                className="
                  h-full
                  w-full
                  object-cover
                  object-center
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#2D3C68]/10
                  via-transparent
                  to-transparent
                "
              />
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            CLOSING STATEMENT
        ════════════════════════════════════════ */}
        <div
          ref={closingRef}
          className="
            mb-[30px]
            ml-0
            max-w-[520px]
            md:mb-[36px]
            md:ml-[8%]
          "
        >
          <h2
            className="
              experience-reveal
              font-[Gambarino]
              text-[34px]
              leading-[1.06]
              tracking-[-0.035em]
              text-[#2D3C68]
              md:text-[52px]
            "
          >
            Every deck.
            <br />
            The same horizon.
          </h2>
        </div>
      </div>

      {/* ════════════════════════════════════════
          FULL BLEED ENDING
          White bottom gradient removed.
      ════════════════════════════════════════ */}
      <div
        ref={fullBleedRef}
        className="
          relative
          w-full
          overflow-hidden
          bg-[#2D3C68]/[0.04]
        "
      >
        <img
          src="https://celestiayacht.com/api/media/file/DSCF4143a%201%203-2.webp"
          alt="Serenity at sea"
          loading="lazy"
          decoding="async"
          className="
            h-[420px]
            w-full
            object-cover
            object-center
            md:h-[620px]
          "
        />
      </div>

      {/* ════════════════════════════════════════
          CLEAN SAIL-WHITE BREATHING SPACE
      ════════════════════════════════════════ */}
      <div
        className="
          h-[96px]
          bg-[#F4F5F2]
          md:h-[128px]
        "
      />
    </section>
  );
}

function YachtBreaking() {
  return (
    <section className="bg-[#F4F5F2] py-[120px] md:py-[160px] px-6">
      <div className="max-w-[560px] mx-auto text-center">
        <h2 className="font-[Gambarino] text-[40px] md:text-[52px] leading-[1.12] tracking-[-0.03em] text-[#2D3C68]">
          Four cabins.
          <br />
          Each one entirely yours.
        </h2>
      </div>
    </section>
  )
}

function Identity() {
  return (
    <section className="bg-[#F5F2ED] py-[140px] px-6">

      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-start">

        <div>
          <p className="text-[12px] tracking-[0.3em] text-[#6B7280] uppercase">
            The Phinisi
          </p>

          <h2 className="mt-6 font-[Canela] text-[32px] md:text-[44px] leading-[1.2] text-[#0F172A]">
            Built for Stillness.
            <br />
            Designed for Distance.
          </h2>
        </div>

        <div className="max-w-[460px]">
          <p className="text-[15px] text-[#475569] leading-relaxed">
            A 45-meter handcrafted phinisi, sailing quietly through Indonesia’s most remote waters — with space for only fourteen guests.
          </p>

          <div className="mt-8">
            <button className="text-sm tracking-wide text-[#0F172A] border-b border-[#0F172A]/30 hover:border-[#0F172A] transition">
              View Specifications
            </button>
          </div>
        </div>

      </div>

    </section>
  );
}




/* =========================
   SPACES (DENSE, TANPA DIPAKSA)
========================= */
function Spaces() {
  const exterior = [
    "https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_24_PM_lzlhwx.png",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_18_PM_dihjfs.png",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_06_38_PM_hqx36m.png",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_24_PM_lzlhwx.png",
  ];

  const interior = [
    "https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_56_PM_t7jwul.png",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_15_PM_otnwp1.png",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1775031031/ChatGPT_Image_Apr_1_2026_03_08_01_PM_yfdh57.png",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_56_PM_t7jwul.png",
  ];

  const [mode, setMode] = useState("exterior");
  const [active, setActive] = useState(0);

  const images = mode === "exterior" ? exterior : interior;

  return (
    <section className="bg-[#F5F2ED] py-[120px] px-6">

      <div className="max-w-[1280px] mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">

          <h2 className="font-[Canela] text-[28px] md:text-[36px] text-[#0F172A]">
            Spaces
          </h2>

          <div className="flex items-center gap-4 text-[14px]">

            <button
              onClick={() => {
                setMode("exterior");
                setActive(0);
              }}
              className={mode === "exterior" ? "text-[#0F172A]" : "text-[#0F172A]/30"}
            >
              Exterior
            </button>

            <span className="text-[#0F172A]/20">/</span>

            <button
              onClick={() => {
                setMode("interior");
                setActive(0);
              }}
              className={mode === "interior" ? "text-[#0F172A]" : "text-[#0F172A]/30"}
            >
              Interior
            </button>

          </div>

        </div>

        {/* GRID (PADAT, NO BORDER) */}
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-6">

          {/* LEFT */}
          <div className="grid grid-cols-2 gap-3">

            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                className={`relative h-[160px] md:h-[180px] overflow-hidden cursor-pointer ${
                  active === i
                    ? "ring-2 ring-[#0F172A]"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </div>
            ))}

          </div>

          {/* RIGHT */}
          <div className="relative w-full h-[520px] overflow-hidden">
            <img
              src={images[active]}
              className="w-full h-full object-cover"
            />
          </div>

        </div>

        {/* TEXT */}
        <div className="mt-6 max-w-[520px]">

          <h3 className="font-[Canela] text-[24px] md:text-[30px] text-[#0F172A]">
            Handcrafted by Artisans
          </h3>

          <p className="mt-2 text-[14px] text-[#0F172A]/70 leading-relaxed">
            Built by legendary Bulukumba artisans, every structure reflects
            Indonesia’s maritime heritage. Open decks, natural materials,
            and thoughtful proportions create a space that feels both grounded and expansive.
          </p>

        </div>

      </div>

    </section>
  );
}

function Cabins() {
  const sectionRef = useRef(null);
  const tabsRef = useRef(null);
  const panelRef = useRef(null);
  const timeoutRef = useRef(null);
  const frameRef = useRef(null);

  const shouldReduceMotion = useReducedMotion();

  const CABINS = [
    {
      id: "forward",
      tab: "Forward",
      name: "Forward Cabin",
      location: "Bow Section",
      size: "15.74 sqm",
      deck: "Main Deck",
      units: "1 Cabin",
      beds: "Twin Setup",
      desc:
        "Closest to the bow, with morning light and a stronger sense of the sea. It sits nearer to the water’s rhythm while remaining private.",
      images: [
        {
          src: "https://res.cloudinary.com/dombq6plz/image/upload/v1776068960/34_nlkpdq.webp",
          alt: "Forward cabin aboard Serenity",
        },
        {
          src: "https://res.cloudinary.com/dombq6plz/image/upload/v1776068958/28_csbw7z.webp",
          alt: "Forward cabin material detail aboard Serenity",
        },
        {
          src: "https://res.cloudinary.com/dombq6plz/image/upload/v1776068966/38_1_cx1idm.webp",
          alt: "Forward cabin bathroom detail aboard Serenity",
        },
        {
          src: "https://res.cloudinary.com/dombq6plz/image/upload/v1776068966/39_t9ofoe.webp",
          alt: "Forward cabin interior angle aboard Serenity",
        },
        {
          src: "https://res.cloudinary.com/dombq6plz/image/upload/v1776068959/26_uyo84o.webp",
          alt: "Forward cabin atmosphere aboard Serenity",
        },
      ],
    },
    {
      id: "mid",
      tab: "Mid",
      name: "Mid Cabins",
      location: "Center of Vessel",
      size: "15.74 sqm",
      deck: "Main Deck",
      units: "2 Cabins",
      beds: "Twin Setup",
      desc:
        "Two matching cabins near the center of the vessel, placed where the rhythm settles. Close to shared spaces, but set back enough to stay quiet.",
      images: [
        {
          src: "https://res.cloudinary.com/dombq6plz/image/upload/v1776068959/26_uyo84o.webp",
          alt: "Mid cabin aboard Serenity",
        },
        {
          src: "https://res.cloudinary.com/dombq6plz/image/upload/v1776068966/39_t9ofoe.webp",
          alt: "Mid cabin interior detail aboard Serenity",
        },
        {
          src: "https://res.cloudinary.com/dombq6plz/image/upload/v1776068958/28_csbw7z.webp",
          alt: "Mid cabin material detail aboard Serenity",
        },
        {
          src: "https://res.cloudinary.com/dombq6plz/image/upload/v1776068960/34_nlkpdq.webp",
          alt: "Mid cabin sleeping area aboard Serenity",
        },
        {
          src: "https://res.cloudinary.com/dombq6plz/image/upload/v1776068966/38_1_cx1idm.webp",
          alt: "Mid cabin bathroom detail aboard Serenity",
        },
      ],
    },
    {
      id: "lower",
      tab: "Lower",
      name: "Lower Cabin",
      location: "Lower Deck",
      size: "18.48 sqm",
      deck: "Lower Deck",
      units: "1 Cabin",
      beds: "Twin Setup",
      desc:
        "Set below the main deck, quieter and more contained. Light is softer here, and the sound above fades into the background.",
      images: [
        {
          src: "https://res.cloudinary.com/dombq6plz/image/upload/v1776068955/23_1_gcmciz.webp",
          alt: "Lower cabin aboard Serenity",
        },
        {
          src: "https://res.cloudinary.com/dombq6plz/image/upload/v1776068966/38_1_cx1idm.webp",
          alt: "Lower cabin bathroom detail aboard Serenity",
        },
        {
          src: "https://res.cloudinary.com/dombq6plz/image/upload/v1776068960/34_nlkpdq.webp",
          alt: "Lower cabin sleeping detail aboard Serenity",
        },
        {
          src: "https://res.cloudinary.com/dombq6plz/image/upload/v1776068958/28_csbw7z.webp",
          alt: "Lower cabin material detail aboard Serenity",
        },
        {
          src: "https://res.cloudinary.com/dombq6plz/image/upload/v1776068966/39_t9ofoe.webp",
          alt: "Lower cabin interior angle aboard Serenity",
        },
      ],
    },
  ];

  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);

  const [lightbox, setLightbox] = useState({
    open: false,
    cabinIndex: 0,
    imageIndex: 0,
  });

  const current = CABINS[active];

  const lightboxCabin = lightbox.open ? CABINS[lightbox.cabinIndex] : null;
  const lightboxImage = lightboxCabin?.images?.[lightbox.imageIndex];

  const facts = [
    { label: "Size", value: current.size },
    { label: "Deck", value: current.deck },
    { label: "Units", value: current.units },
    { label: "Beds", value: current.beds },
  ];

  const focusTab = (index) => {
    const tabs = tabsRef.current?.querySelectorAll('[role="tab"]') ?? [];
    tabs[index]?.focus();
  };

  const clearPendingTransition = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  };

  const selectCabin = (index) => {
    if (index === active) return;

    clearPendingTransition();

    if (shouldReduceMotion) {
      setActive(index);
      setVisible(true);
      return;
    }

    setVisible(false);

    timeoutRef.current = setTimeout(() => {
      setActive(index);

      frameRef.current = requestAnimationFrame(() => {
        setVisible(true);
      });
    }, 300);
  };

  const handleTabKeyDown = (event, index) => {
    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % CABINS.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + CABINS.length) % CABINS.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = CABINS.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    selectCabin(nextIndex);

    requestAnimationFrame(() => {
      focusTab(nextIndex);
    });
  };

  const openLightbox = (imageIndex) => {
    setLightbox({
      open: true,
      cabinIndex: active,
      imageIndex,
    });
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const showPreviousImage = () => {
    setLightbox((prev) => {
      const cabin = CABINS[prev.cabinIndex];
      const total = cabin?.images?.length ?? 1;

      return {
        ...prev,
        imageIndex: (prev.imageIndex - 1 + total) % total,
      };
    });
  };

  const showNextImage = () => {
    setLightbox((prev) => {
      const cabin = CABINS[prev.cabinIndex];
      const total = cabin?.images?.length ?? 1;

      return {
        ...prev,
        imageIndex: (prev.imageIndex + 1) % total,
      };
    });
  };

  useEffect(() => {
    return () => {
      clearPendingTransition();
    };
  }, []);

  useEffect(() => {
    if (!lightbox.open) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setLightbox((prev) => ({
          ...prev,
          open: false,
        }));
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();

        setLightbox((prev) => {
          const cabin = CABINS[prev.cabinIndex];
          const total = cabin?.images?.length ?? 1;

          return {
            ...prev,
            imageIndex: (prev.imageIndex - 1 + total) % total,
          };
        });
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        setLightbox((prev) => {
          const cabin = CABINS[prev.cabinIndex];
          const total = cabin?.images?.length ?? 1;

          return {
            ...prev,
            imageIndex: (prev.imageIndex + 1) % total,
          };
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightbox.open]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tabNodes = tabsRef.current?.querySelectorAll(".cabin-tab") ?? [];

    const panelNodes =
      panelRef.current?.querySelectorAll(".cabin-panel-reveal") ?? [];

    const allNodes = [...tabNodes, ...panelNodes].filter(Boolean);

    if (shouldReduceMotion) {
      gsap.set(allNodes, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      });

      return;
    }

    const serenityEase = (progress) => {
      const x1 = 0.22;
      const y1 = 1;
      const x2 = 0.36;
      const y2 = 1;

      const sampleCurveX = (t) => {
        const invT = 1 - t;

        return (
          3 * invT * invT * t * x1 +
          3 * invT * t * t * x2 +
          t * t * t
        );
      };

      const sampleCurveY = (t) => {
        const invT = 1 - t;

        return (
          3 * invT * invT * t * y1 +
          3 * invT * t * t * y2 +
          t * t * t
        );
      };

      const sampleDerivativeX = (t) => {
        const invT = 1 - t;

        return (
          3 * invT * invT * x1 +
          6 * invT * t * (x2 - x1) +
          3 * t * t * (1 - x2)
        );
      };

      let t = progress;

      for (let i = 0; i < 6; i += 1) {
        const x = sampleCurveX(t) - progress;
        const derivative = sampleDerivativeX(t);

        if (Math.abs(x) < 0.0001 || derivative === 0) break;

        t -= x / derivative;
        t = Math.max(0, Math.min(1, t));
      }

      return sampleCurveY(t);
    };

    const mm = gsap.matchMedia();

    mm.add(
      {
        mobile: "(max-width: 767px)",
        desktop: "(min-width: 768px)",
      },
      (context) => {
        const { mobile } = context.conditions;

        const ctx = gsap.context(() => {
          if (tabNodes.length > 0) {
            gsap.fromTo(
              tabNodes,
              {
                opacity: 0,
                y: mobile ? 10 : 12,
                filter: "blur(3px)",
              },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.82,
                stagger: 0.05,
                ease: serenityEase,
                scrollTrigger: {
                  trigger: tabsRef.current,
                  start: mobile ? "top 86%" : "top 82%",
                  once: true,
                },
              }
            );
          }

          if (panelNodes.length > 0) {
            gsap.fromTo(
              panelNodes,
              {
                opacity: 0,
                y: mobile ? 18 : 24,
                filter: "blur(5px)",
              },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.05,
                stagger: 0.07,
                ease: serenityEase,
                scrollTrigger: {
                  trigger: panelRef.current,
                  start: mobile ? "top 84%" : "top 80%",
                  once: true,
                },
              }
            );
          }
        }, sectionRef);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, [shouldReduceMotion]);

  const renderImageButton = (image, imageIndex, className = "") => {
    return (
      <button
        key={`${image.src}-${imageIndex}`}
        type="button"
        onClick={() => openLightbox(imageIndex)}
        aria-label={`Open ${current.name} image ${imageIndex + 1} of ${
          current.images.length
        }`}
        className={`
          group/image
          relative
          block
          overflow-hidden
          bg-[#1A1A1A]/20
          text-left
          outline-none
          ${className}
        `}
      >
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          className="
            h-full
            w-full
            object-cover
            object-center
            transition-transform
            duration-[1800ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover/image:scale-[1.018]
            group-focus-visible/image:scale-[1.018]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-[#1A1A1A]/34
            via-transparent
            to-transparent
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            ring-1
            ring-inset
            ring-[#F4F5F2]/[0.07]
            transition
            duration-300
            group-focus-visible/image:ring-[#B08D57]/70
          "
        />

        <span
          className="
            pointer-events-none
            absolute
            bottom-4
            right-4
            hidden
            text-[9px]
            uppercase
            tracking-[0.24em]
            text-[#F4F5F2]/0
            transition-colors
            duration-300
            group-hover/image:text-[#F4F5F2]/62
            group-focus-visible/image:text-[#F4F5F2]/76
            md:block
          "
        >
          View
        </span>
      </button>
    );
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Cabins aboard Serenity"
      className="
        relative
        overflow-hidden
        bg-[#2D3C68]
        px-6
        pb-[104px]
        pt-[88px]
        text-[#F4F5F2]
        md:px-10
        md:pb-[138px]
        md:pt-[118px]
        lg:px-14
      "
      style={{
        backgroundColor: "#2D3C68",
        colorScheme: "dark",
      }}
    >
      <h2 className="sr-only">Cabins aboard Serenity</h2>

      {/* ATMOSPHERIC ENTRY FROM SAIL-WHITE */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-[3]
          h-[140px]
          md:h-[180px]
        "
        style={{
          background:
            "linear-gradient(180deg, rgba(244,245,242,0.16) 0%, rgba(244,245,242,0.07) 38%, rgba(244,245,242,0) 100%)",
        }}
      />

      {/* DARK MARITIME DEPTH */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
        "
        style={{
          background:
            "radial-gradient(circle at 50% 8%, rgba(244,245,242,0.052) 0%, rgba(244,245,242,0.016) 28%, rgba(244,245,242,0) 62%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
        "
        style={{
          background:
            "linear-gradient(180deg, rgba(26,26,26,0.055) 0%, rgba(26,26,26,0.14) 58%, rgba(26,26,26,0.22) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* CENTERED EDITORIAL TABS */}
        <div
          ref={tabsRef}
          className="
            overflow-x-auto
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          <div
            className="
              relative
              mx-auto
              flex
              w-max
              min-w-max
              items-center
              justify-center
              gap-2
              border-y
              border-[#F4F5F2]/[0.075]
              p-1
              md:gap-4
            "
            role="tablist"
            aria-label="Cabin types"
          >
            {CABINS.map((cabin, index) => (
              <button
                key={cabin.id}
                id={`cabin-tab-${cabin.id}`}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-controls="cabin-panel"
                tabIndex={active === index ? 0 : -1}
                onClick={() => selectCabin(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className="
                  cabin-tab
                  group
                  relative
                  flex
                  min-h-[48px]
                  min-w-[86px]
                  shrink-0
                  items-center
                  justify-center
                  px-4
                  text-center
                  outline-none
                  md:min-w-[108px]
                  md:px-5
                "
              >
                <span
                  className={`
                    block
                    text-[11px]
                    uppercase
                    tracking-[0.26em]
                    transition-colors
                    duration-500
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${
                      active === index
                        ? "text-[#F4F5F2]"
                        : "text-[#F4F5F2]/34 group-hover:text-[#F4F5F2]/64"
                    }
                  `}
                >
                  {cabin.tab}
                </span>

                <span
                  className={`
                    absolute
                    bottom-[8px]
                    left-1/2
                    h-px
                    -translate-x-1/2
                    bg-[#B08D57]
                    transition-all
                    duration-500
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${
                      active === index
                        ? "w-[38px] opacity-100"
                        : "w-0 opacity-0"
                    }
                  `}
                />

                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-1
                    opacity-0
                    ring-1
                    ring-[#B08D57]/50
                    transition-opacity
                    duration-300
                    group-focus-visible:opacity-100
                  "
                />
              </button>
            ))}
          </div>
        </div>

        {/* ACTIVE CABIN FOCUS PANEL */}
        <div
          ref={panelRef}
          id="cabin-panel"
          role="tabpanel"
          aria-labelledby={`cabin-tab-${current.id}`}
          aria-live="polite"
          className={`
            mt-9
            grid
            gap-9
            transition-all
            duration-300
            ease-[cubic-bezier(0.22,1,0.36,1)]
            md:mt-12
            md:grid-cols-[1.18fr_0.82fr]
            md:gap-16
            lg:gap-20
            ${
              visible || shouldReduceMotion
                ? "translate-y-0 opacity-100 blur-none"
                : "translate-y-2 opacity-0 blur-[2px]"
            }
          `}
        >
          {/* IMAGE STORY */}
          <div
            className="
              cabin-panel-reveal
              grid
              gap-4
              md:h-[clamp(520px,72vh,620px)]
              md:grid-cols-[1fr_0.42fr]
              md:gap-5
            "
          >
            {renderImageButton(
              current.images[0],
              0,
              `
                aspect-[4/5]
                md:aspect-auto
                md:h-full
              `
            )}

            <div
              className="
                grid
                grid-cols-2
                gap-4
                md:grid-cols-1
                md:grid-rows-2
                md:gap-5
              "
            >
              {current.images.slice(1, 3).map((image, index) =>
                renderImageButton(
                  image,
                  index + 1,
                  `
                    aspect-[5/4]
                    md:aspect-auto
                    md:h-full
                  `
                )
              )}
            </div>
          </div>

          {/* CABIN NOTE */}
          <div
            className="
              cabin-panel-reveal
              flex
              flex-col
              justify-center
              md:py-8
            "
          >
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.32em]
                text-[#F4F5F2]/42
              "
            >
              {current.location}
            </p>

            <div className="mt-5 h-px w-10 bg-[#B08D57]/62" />

            <h3
              className="
                mt-7
                font-[Gambarino]
                text-[40px]
                leading-[1.03]
                tracking-[-0.04em]
                text-[#F4F5F2]
                sm:text-[48px]
                md:text-[clamp(52px,4.6vw,68px)]
              "
            >
              {current.name}
            </h3>

            <p
              className="
                mt-7
                max-w-[480px]
                text-[14px]
                leading-[1.9]
                text-[#F4F5F2]/68
                md:text-[15px]
              "
            >
              {current.desc}
            </p>

            <div
              className="
                mt-10
                grid
                grid-cols-2
                gap-x-8
                gap-y-6
                border-t
                border-[#F4F5F2]/[0.09]
                pt-7
              "
            >
              {facts.map((fact) => (
                <div key={fact.label}>
                  <p
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.28em]
                      text-[#F4F5F2]/32
                    "
                  >
                    {fact.label}
                  </p>

                  <p
                    className="
                      mt-2
                      text-[13px]
                      leading-[1.5]
                      text-[#F4F5F2]/72
                    "
                  >
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ATMOSPHERIC EXIT */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[2]
          h-[150px]
          md:h-[190px]
        "
        style={{
          background:
            "linear-gradient(180deg, rgba(45,60,104,0) 0%, rgba(244,245,242,0.075) 100%)",
        }}
      />

      {/* CABIN LIGHTBOX */}
      {lightbox.open && lightboxCabin && lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${lightboxCabin.name} image gallery`}
          className="
            fixed
            inset-0
            z-[100]
            bg-[#1A1A1A]/92
            px-4
            py-5
            text-[#F4F5F2]
            md:px-8
            md:py-8
          "
        >
          <button
            type="button"
            aria-label="Close gallery"
            onClick={closeLightbox}
            className="
              absolute
              right-4
              top-4
              z-20
              flex
              h-11
              w-11
              items-center
              justify-center
              border
              border-[#F4F5F2]/14
              text-[24px]
              leading-none
              text-[#F4F5F2]/76
              transition
              duration-300
              hover:border-[#F4F5F2]/34
              hover:text-[#F4F5F2]
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#B08D57]
              md:right-8
              md:top-8
            "
          >
            ×
          </button>

          <button
            type="button"
            aria-label="Close gallery backdrop"
            onClick={closeLightbox}
            className="
              absolute
              inset-0
              z-0
              cursor-default
            "
          />

          <div
            className="
              relative
              z-10
              mx-auto
              flex
              h-full
              max-w-[1320px]
              flex-col
              justify-center
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-4
                pb-4
                md:pb-5
              "
            >
              <div>
                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-[0.32em]
                    text-[#F4F5F2]/42
                  "
                >
                  {lightboxCabin.location}
                </p>

                <p
                  className="
                    mt-2
                    font-[Gambarino]
                    text-[28px]
                    leading-none
                    tracking-[-0.035em]
                    text-[#F4F5F2]
                    md:text-[36px]
                  "
                >
                  {lightboxCabin.name}
                </p>
              </div>

              <p
                className="
                  shrink-0
                  pr-14
                  text-[10px]
                  uppercase
                  tracking-[0.26em]
                  text-[#F4F5F2]/44
                  md:pr-16
                "
              >
                {String(lightbox.imageIndex + 1).padStart(2, "0")} /{" "}
                {String(lightboxCabin.images.length).padStart(2, "0")}
              </p>
            </div>

            <div
              className="
                relative
                min-h-0
                flex-1
                overflow-hidden
                border
                border-[#F4F5F2]/12
                bg-[#000]/20
              "
            >
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="
                  h-full
                  w-full
                  object-contain
                "
              />

              <button
                type="button"
                aria-label="Previous image"
                onClick={showPreviousImage}
                className="
                  absolute
                  left-3
                  top-1/2
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  border
                  border-[#F4F5F2]/14
                  bg-[#1A1A1A]/32
                  text-[22px]
                  text-[#F4F5F2]/76
                  backdrop-blur-sm
                  transition
                  duration-300
                  hover:border-[#F4F5F2]/34
                  hover:text-[#F4F5F2]
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-[#B08D57]
                  md:left-5
                "
              >
                ←
              </button>

              <button
                type="button"
                aria-label="Next image"
                onClick={showNextImage}
                className="
                  absolute
                  right-3
                  top-1/2
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  border
                  border-[#F4F5F2]/14
                  bg-[#1A1A1A]/32
                  text-[22px]
                  text-[#F4F5F2]/76
                  backdrop-blur-sm
                  transition
                  duration-300
                  hover:border-[#F4F5F2]/34
                  hover:text-[#F4F5F2]
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-[#B08D57]
                  md:right-5
                "
              >
                →
              </button>
            </div>

            <div
              className="
                flex
                items-center
                justify-center
                gap-2
                pt-4
                md:pt-5
              "
            >
              {lightboxCabin.images.map((image, index) => (
                <button
                  key={`${image.src}-${index}`}
                  type="button"
                  aria-label={`View image ${index + 1}`}
                  onClick={() =>
                    setLightbox((prev) => ({
                      ...prev,
                      imageIndex: index,
                    }))
                  }
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    outline-none
                  "
                >
                  <span
                    className={`
                      h-[3px]
                      rounded-full
                      transition-all
                      duration-300
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      ${
                        lightbox.imageIndex === index
                          ? "w-7 bg-[#B08D57]"
                          : "w-3 bg-[#F4F5F2]/24 hover:bg-[#F4F5F2]/48"
                      }
                    `}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
 

function Gallery() {
  const images = [
    "https://res.cloudinary.com/dombq6plz/image/upload/v1776068957/29_dychc2.webp",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1776068955/21_pdqnqq.webp",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1776068953/19_1_mwv93q.webp",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/08_noz6qg.webp",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/05_ec1k9n.webp",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1776068961/27_unvtvm.webp",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1776068973/49_ph3xr3.webp",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/07_iujxr6.webp",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/06_f2yr7e.webp",
  ];

  const layout = [
    { i: 0, span: "col-span-6", h: "h-[520px]" },
    { i: 1, span: "col-span-3", h: "h-[300px]" },
    { i: 2, span: "col-span-3", h: "h-[300px]" },
    { i: 3, span: "col-span-6", h: "h-[380px]" },
    { i: 4, span: "col-span-2", h: "h-[260px]" },
    { i: 5, span: "col-span-2", h: "h-[260px]" },
    { i: 6, span: "col-span-2", h: "h-[260px]" },
    { i: 7, span: "col-span-3", h: "h-[300px]" },
    { i: 8, span: "col-span-3", h: "h-[300px]" },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const close = () => setActiveIndex(null);
  const next = () => setActiveIndex((p) => (p + 1) % images.length);
  const prev = () => setActiveIndex((p) => (p === 0 ? images.length - 1 : p - 1));

  useEffect(() => {
    const key = (e) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [activeIndex]);

  return (
    <section className="bg-[#F4F5F2] py-[160px] px-6">
      <div className="max-w-[1200px] mx-auto">

        {/* HEADER */}
        <div className="mb-20 max-w-[520px]">
          <p className="text-[11px] tracking-[0.35em] text-[#2D3C68]/50 uppercase">
            Gallery
          </p>
          <h2 className="mt-4 font-[Gambarino] text-[42px] md:text-[56px] text-[#2D3C68] leading-[1.1]">
            A Closer Look
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {layout.map(({ i, span, h }) => (
            <div
              key={i}
              className={`${span} cursor-pointer group`}
              onClick={() => setActiveIndex(i)}
            >
              <div className="overflow-hidden">
                <img
                  src={images[i]}
                  loading="lazy"
                  className={`w-full ${h} object-cover transition duration-700 group-hover:scale-[1.02]`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center">
          <button onClick={close} className="absolute top-6 right-6 text-white text-[11px] tracking-[0.4em]">
            CLOSE
          </button>

          <button onClick={prev} className="absolute left-6 text-white text-[28px] opacity-40 hover:opacity-100">
            ←
          </button>

          <img
            key={activeIndex}
            src={images[activeIndex]}
            className="max-h-[85vh] max-w-[90vw] object-contain animate-fade"
          />

          <button onClick={next} className="absolute right-6 text-white text-[28px] opacity-40 hover:opacity-100">
            →
          </button>
        </div>
      )}

      <style jsx>{`
        .animate-fade {
          animation: fadeScale 0.4s ease;
        }
        @keyframes fadeScale {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}


function LivingSpaces() {
  return (
    <section className="bg-[#F5F2ED] py-[140px] px-6">

      <div className="max-w-[1200px] mx-auto">

        {/* HEADER */}
        <div className="max-w-[640px]">
          <p className="text-[12px] tracking-[0.3em] text-[#6B7280] uppercase">
            Saloon
          </p>

          <h2 className="mt-6 font-[Canela] text-[36px] md:text-[52px] leading-[1.1] text-[#0F172A]">
            Living Spaces
            <br />
            Home Away From Home
          </h2>
        </div>

        {/* IMAGE COMPOSITION */}
        <div className="mt-14 grid md:grid-cols-[1.3fr_0.7fr] gap-8 items-start">

          {/* LEFT (LEADER) */}
          <div className="relative w-full h-[360px] md:h-[440px] overflow-hidden">
            <img
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_24_PM_lzlhwx.png"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT (SUPPORTING, NAIK + LEBIH KECIL) */}
          <div className="relative w-full h-[300px] md:h-[360px] overflow-hidden md:mt-10">
            <img
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_18_PM_dihjfs.png"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

        {/* CONTENT (DIKETATIN + CTA MASUK FLOW) */}
        <div className="mt-10 max-w-[560px]">

          <p className="text-[15px] text-[#0F172A]/75 leading-relaxed">
            Sanctuary’s communal spaces offer elegant relaxation and connection.
            Panoramic ocean views frame the lounge and dining areas, while
            generous decks invite long conversations and quiet moments at sea.
          </p>

          <div className="mt-8 flex items-center gap-4">

            <button className="px-6 py-2.5 rounded-full bg-[#A8BEB7] text-[#0F172A] text-[13px] tracking-[0.12em] uppercase hover:bg-[#9CB3AC] transition">
              Reserve
            </button>

            <button className="px-6 py-2.5 rounded-full border border-[#0F172A]/20 text-[#0F172A] text-[13px] tracking-[0.12em] uppercase hover:border-[#0F172A] transition">
              Book a Call
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

function DeckAndSpecs() {
  const shouldReduceMotion = useReducedMotion();

  const [deck, setDeck] = useState("main");
  const [expanded, setExpanded] = useState(false);

  const [visible, setVisible] = useState({
    header: false,
    selector: false,
    image: false,
    peak: false,
    specs: false,
  });

  const headerRef = useRef(null);
  const selectorRef = useRef(null);
  const imageRef = useRef(null);
  const peakRef = useRef(null);
  const specsRef = useRef(null);

  const decks = {
    main: {
      label: "Main",
      fullLabel: "Main Deck",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068978/Layout_01_-_Main_Deck_yztnzb.webp",
    },
    upper: {
      label: "Upper",
      fullLabel: "Upper Deck",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068974/Layout_-_02_Upper_Deck_pouo1p.webp",
    },
    top: {
      label: "Top",
      fullLabel: "Top Deck",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068975/Layout_-_03_Top_Deck_yvyisz.webp",
    },
    lower: {
      label: "Lower",
      fullLabel: "Lower Deck",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068975/Layout_00_-_Lower_Deck_m92vvk.webp",
    },
  };

  const deckList = ["main", "upper", "top", "lower"];

  const specs = [
    ["Vessel Type", "Phinisi Sailing Yacht"],
    ["Flag", "Indonesia"],
    ["Beam", "7.26 m"],
    ["Draft", "2.20 m"],
    ["Year Built", "2025"],
    ["Build Location", "Tanah Beru & Bira, South Sulawesi"],
    ["Cruise Speed", "8–10 knots"],
    ["Maximum Speed", "11 knots"],
    ["Navigation", "Garmin Navigation System"],
  ];

  const activeDeck = decks[deck];

  const focusDeckButton = (index) => {
    const buttons = selectorRef.current?.querySelectorAll('[role="tab"]') ?? [];
    buttons[index]?.focus();
  };

  const selectDeck = (key) => {
    if (key === deck) return;
    setDeck(key);
  };

  const handleDeckKeyDown = (event, index) => {
    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % deckList.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + deckList.length) % deckList.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = deckList.length - 1;
    } else {
      return;
    }

    event.preventDefault();

    const nextDeck = deckList[nextIndex];
    setDeck(nextDeck);

    requestAnimationFrame(() => {
      focusDeckButton(nextIndex);
    });
  };

  useEffect(() => {
    if (shouldReduceMotion) {
      setVisible({
        header: true,
        selector: true,
        image: true,
        peak: true,
        specs: true,
      });

      return;
    }

    const observe = (ref, key) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          setVisible((prev) => ({
            ...prev,
            [key]: true,
          }));

          if (ref.current) {
            observer.unobserve(ref.current);
          }
        },
        {
          threshold: 0.16,
          rootMargin: "0px 0px -8% 0px",
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    };

    const observers = [
      observe(headerRef, "header"),
      observe(selectorRef, "selector"),
      observe(imageRef, "image"),
      observe(peakRef, "peak"),
      observe(specsRef, "specs"),
    ].filter(Boolean);

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!expanded) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;

      event.preventDefault();
      setExpanded(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expanded]);

  return (
    <section
      aria-labelledby="deck-specs-title"
      className="
        relative
        overflow-hidden
        bg-[#F4F5F2]
        px-6
        py-[112px]
        text-[#2D3C68]
        md:px-10
        md:py-[152px]
        lg:px-14
      "
      style={{
        backgroundColor: "#F4F5F2",
        colorScheme: "light",
      }}
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-[140px]
          md:h-[180px]
        "
        style={{
          background:
            "linear-gradient(180deg, rgba(45,60,104,0.10) 0%, rgba(45,60,104,0.045) 38%, rgba(45,60,104,0) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        {/* ================= HEADER ================= */}
        <div
          ref={headerRef}
          className={`
            mx-auto
            mb-[62px]
            max-w-[760px]
            text-center
            transition-all
            duration-[900ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            md:mb-[80px]
            ${
              visible.header
                ? "translate-y-0 opacity-100 blur-none"
                : "translate-y-3 opacity-0 blur-[3px]"
            }
          `}
        >
          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.35em]
              text-[#2D3C68]/42
              md:text-[11px]
            "
          >
            Vessel Overview
          </p>

          <div className="mx-auto mt-5 h-px w-10 bg-[#B08D57]/62" />

          <h2
            id="deck-specs-title"
            className="
              mt-6
              font-[Gambarino]
              text-[42px]
              leading-[1.08]
              tracking-[-0.035em]
              text-[#2D3C68]
              sm:text-[50px]
              md:text-[64px]
            "
          >
            Deck Plans
            <br className="hidden sm:block" /> and Vessel Details
          </h2>
        </div>

        {/* ================= SELECTOR ================= */}
        <div
          ref={selectorRef}
          className={`
            mb-[40px]
            overflow-x-auto
            [scrollbar-width:none]
            transition-all
            duration-[800ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            md:mb-[56px]
            [&::-webkit-scrollbar]:hidden
            ${
              visible.selector
                ? "translate-y-0 opacity-100 blur-none"
                : "translate-y-2 opacity-0 blur-[2px]"
            }
          `}
        >
          <div
            role="tablist"
            aria-label="Deck plan selector"
            className="
              mx-auto
              flex
              w-max
              min-w-max
              items-center
              justify-center
              gap-2
              border-y
              border-[#2D3C68]/10
              p-1
              md:gap-4
            "
          >
            {deckList.map((key, index) => {
              const isActive = deck === key;

              return (
                <button
                  key={key}
                  id={`deck-tab-${key}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="deck-plan-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectDeck(key)}
                  onKeyDown={(event) => handleDeckKeyDown(event, index)}
                  className="
                    group
                    relative
                    flex
                    min-h-[46px]
                    min-w-[82px]
                    shrink-0
                    items-center
                    justify-center
                    px-4
                    text-center
                    outline-none
                    md:min-w-[104px]
                    md:px-5
                  "
                >
                  <span
                    className={`
                      text-[10px]
                      uppercase
                      tracking-[0.28em]
                      transition-colors
                      duration-500
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      md:text-[11px]
                      ${
                        isActive
                          ? "text-[#2D3C68]"
                          : "text-[#2D3C68]/32 group-hover:text-[#2D3C68]/64"
                      }
                    `}
                  >
                    {decks[key].label}
                  </span>

                  <span
                    className={`
                      absolute
                      bottom-[8px]
                      left-1/2
                      h-px
                      -translate-x-1/2
                      bg-[#B08D57]
                      transition-all
                      duration-500
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      ${
                        isActive
                          ? "w-[34px] opacity-100"
                          : "w-0 opacity-0"
                      }
                    `}
                  />

                  <span
                    className="
                      pointer-events-none
                      absolute
                      inset-1
                      opacity-0
                      ring-1
                      ring-[#B08D57]/55
                      transition-opacity
                      duration-300
                      group-focus-visible:opacity-100
                    "
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= IMAGE ================= */}
        <div
          ref={imageRef}
          id="deck-plan-panel"
          role="tabpanel"
          aria-labelledby={`deck-tab-${deck}`}
          className={`
            relative
            mx-auto
            mb-[118px]
            max-w-[1000px]
            transition-all
            duration-[1000ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            md:mb-[140px]
            ${
              visible.image
                ? "translate-y-0 opacity-100 blur-none"
                : "translate-y-6 opacity-0 blur-[5px]"
            }
          `}
        >
          <button
            type="button"
            onClick={() => setExpanded(true)}
            aria-label={`Open ${activeDeck.fullLabel} plan`}
            className="
              group
              relative
              block
              w-full
              bg-[#F4F5F2]
              p-[7px]
              text-left
              outline-none
              shadow-[0_28px_70px_rgba(20,30,50,0.075)]
              ring-1
              ring-[#2D3C68]/10
              transition
              duration-500
              ease-[cubic-bezier(0.22,1,0.36,1)]
              hover:shadow-[0_34px_82px_rgba(20,30,50,0.095)]
              hover:ring-[#2D3C68]/16
              focus-visible:ring-[#B08D57]/70
              md:p-[10px]
            "
          >
            <div
              className="
                relative
                bg-[#F7F7F1]
                p-[8px]
                ring-1
                ring-[#2D3C68]/10
                md:p-[14px]
              "
            >
              <div
                className="
                  relative
                  aspect-[16/10]
                  overflow-hidden
                  bg-[#F8F8F3]
                  md:aspect-[16/9]
                "
              >
                {Object.entries(decks).map(([key, item], index) => (
                  <img
                    key={key}
                    src={item.image}
                    alt={`${item.fullLabel} layout`}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className={`
                      absolute
                      inset-0
                      h-full
                      w-full
                      object-contain
                      p-2
                      transition-all
                      duration-[800ms]
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      md:p-5
                      ${
                        deck === key
                          ? "scale-100 opacity-100"
                          : "pointer-events-none scale-[1.01] opacity-0"
                      }
                    `}
                  />
                ))}
              </div>
            </div>

            <div
              className="
                pointer-events-none
                absolute
                bottom-5
                right-5
                flex
                items-center
                gap-3
                text-[9px]
                uppercase
                tracking-[0.24em]
                text-[#2D3C68]/38
                transition-colors
                duration-300
                group-hover:text-[#2D3C68]/66
                group-focus-visible:text-[#2D3C68]/70
                md:bottom-7
                md:right-7
              "
            >
              <span className="h-px w-7 bg-[#B08D57]/50 transition-colors duration-300 group-hover:bg-[#B08D57]/72" />
              Open Plan
            </div>
          </button>
        </div>

        {/* ================= DATA SYSTEM ================= */}
        <div ref={peakRef} className="mx-auto max-w-[900px] text-center">
          {/* 12 */}
          <div
            className={`
              mb-[32px]
              transition-all
              duration-[1000ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${
                visible.peak
                  ? "translate-y-0 opacity-100 blur-none"
                  : "translate-y-8 opacity-0 blur-[4px]"
              }
            `}
          >
            <div
              className="
                font-[Gambarino]
                text-[84px]
                leading-none
                tracking-[-0.045em]
                text-[#2D3C68]
                md:text-[112px]
              "
            >
              12
            </div>

            <p
              className="
                mt-2
                text-[11px]
                uppercase
                tracking-[0.28em]
                text-[#2D3C68]/45
                md:text-[12px]
              "
            >
              Guests
            </p>
          </div>

          {/* MEANING */}
          <div
            className={`
              mb-[68px]
              transition-all
              delay-100
              duration-[1000ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
              md:mb-[80px]
              ${
                visible.peak
                  ? "translate-y-0 opacity-100 blur-none"
                  : "translate-y-6 opacity-0 blur-[4px]"
              }
            `}
          >
            <p
              className="
                mx-auto
                max-w-[560px]
                text-[15px]
                leading-[1.85]
                text-[#2D3C68]/68
                md:text-[16px]
                md:leading-[1.8]
              "
            >
              Not crowded. Not empty. A scale where people stay close without
              feeling compressed.
            </p>
          </div>

          {/* STRUCTURE */}
          <div
            className={`
              mb-[104px]
              grid
              grid-cols-3
              gap-5
              border-y
              border-[#2D3C68]/10
              py-6
              transition-all
              delay-200
              duration-[1000ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
              md:mb-[120px]
              md:gap-12
              md:py-7
              ${
                visible.peak
                  ? "translate-y-0 opacity-100 blur-none"
                  : "translate-y-6 opacity-0 blur-[4px]"
              }
            `}
          >
            {[
              ["Length", "40.75 m"],
              ["Cabins", "4"],
              ["Crew", "10"],
            ].map(([label, value]) => (
              <div key={label}>
                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    text-[#2D3C68]/38
                    md:text-[11px]
                  "
                >
                  {label}
                </p>

                <p
                  className="
                    mt-3
                    font-[Gambarino]
                    text-[24px]
                    leading-none
                    tracking-[-0.03em]
                    text-[#2D3C68]
                    md:text-[30px]
                  "
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SPECS ================= */}
        <div
          ref={specsRef}
          className={`
            mx-auto
            max-w-[900px]
            transition-all
            duration-[1000ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              visible.specs
                ? "translate-y-0 opacity-100 blur-none"
                : "translate-y-6 opacity-0 blur-[4px]"
            }
          `}
        >
          <p
            className="
              mb-[32px]
              text-center
              text-[10px]
              uppercase
              tracking-[0.35em]
              text-[#2D3C68]/38
              md:text-[11px]
            "
          >
            Technical Specifications
          </p>

          <div
            className="
              grid
              gap-x-20
              md:grid-cols-2
            "
          >
            {specs.map(([label, value]) => (
              <div
                key={label}
                className="
                  flex
                  flex-col
                  gap-2
                  border-b
                  border-[#2D3C68]/10
                  py-[14px]
                  sm:flex-row
                  sm:items-baseline
                  sm:justify-between
                  sm:gap-8
                "
              >
                <span
                  className="
                    text-[10px]
                    uppercase
                    tracking-[0.22em]
                    text-[#2D3C68]/36
                    md:text-[11px]
                    md:tracking-[0.2em]
                  "
                >
                  {label}
                </span>

                <span
                  className="
                    max-w-[320px]
                    text-[14px]
                    leading-[1.55]
                    text-[#2D3C68]/78
                    sm:text-right
                  "
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= SIMPLE PLAN EXPANSION ================= */}
      {expanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeDeck.fullLabel} plan`}
          className="
            fixed
            inset-0
            z-[100]
            bg-[#1A1A1A]/92
            px-4
            py-5
            text-[#F4F5F2]
            md:px-8
            md:py-8
          "
        >
          <button
            type="button"
            aria-label="Close plan"
            onClick={() => setExpanded(false)}
            className="
              absolute
              right-4
              top-4
              z-20
              flex
              h-11
              w-11
              items-center
              justify-center
              border
              border-[#F4F5F2]/14
              text-[24px]
              leading-none
              text-[#F4F5F2]/76
              transition
              duration-300
              hover:border-[#F4F5F2]/34
              hover:text-[#F4F5F2]
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#B08D57]
              md:right-8
              md:top-8
            "
          >
            ×
          </button>

          <button
            type="button"
            aria-label="Close plan backdrop"
            onClick={() => setExpanded(false)}
            className="
              absolute
              inset-0
              z-0
              cursor-default
            "
          />

          <div
            className="
              relative
              z-10
              mx-auto
              flex
              h-full
              max-w-[1320px]
              flex-col
              justify-center
            "
          >
            <div className="pb-4 md:pb-5">
              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.32em]
                  text-[#F4F5F2]/42
                "
              >
                Deck Plan
              </p>

              <p
                className="
                  mt-2
                  font-[Gambarino]
                  text-[28px]
                  leading-none
                  tracking-[-0.035em]
                  text-[#F4F5F2]
                  md:text-[36px]
                "
              >
                {activeDeck.fullLabel}
              </p>
            </div>

            <div
              className="
                relative
                min-h-0
                flex-1
                overflow-hidden
                border
                border-[#F4F5F2]/12
                bg-[#F4F5F2]
              "
            >
              <img
                src={activeDeck.image}
                alt={`${activeDeck.fullLabel} layout enlarged`}
                className="
                  h-full
                  w-full
                  object-contain
                  p-4
                  md:p-8
                "
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Reservation() {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden">

      {/* ================= BACKGROUND ================= */}
      <img
        src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/06_f2yr7e.webp"
        alt="Serenity Reservation"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">

        <div className="text-center max-w-[640px]">

          {/* LABEL */}
          <p className="text-[11px] tracking-[0.35em] text-white/60 uppercase">
            Reservation
          </p>

          {/* HEADLINE */}
          <h2 className="mt-6 font-[Gambarino] text-[44px] md:text-[60px] leading-[1.1] text-white">
            Start Your Journey
          </h2>

          {/* SUBTEXT */}
          <p className="mt-6 text-[15px] text-white/80 leading-[1.7]">
            Share your preferred dates and group size.  
            We’ll take care of the rest.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">

            {/* PRIMARY */}
            <button className="px-8 py-3 bg-white text-[#1A1A1A] text-[13px] tracking-[0.15em] uppercase rounded-full hover:bg-white/90 transition">
              Enquire
            </button>

            {/* SECONDARY */}
            <a
              href="https://wa.me/6281353613617"
              target="_blank"
              className="px-8 py-3 border border-white/40 text-white text-[13px] tracking-[0.15em] uppercase rounded-full hover:border-white transition"
            >
              WhatsApp
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}


function Closing() {
  return (
    <section className="relative h-[100vh] w-full overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <img
        src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_15_PM_otnwp1.png"
        alt="Closing"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* ATMOSPHERIC OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">

        <div className="text-center max-w-[820px]">

          {/* LABEL */}
          <p className="text-[11px] tracking-[0.4em] text-white/60 uppercase">
            Reservations
          </p>

          {/* HEADLINE */}
          <h2 className="mt-6 text-[42px] md:text-[64px] leading-[1.15] text-white font-[Canela]">

            <span className="block font-light">
              Find the <span className="italic">Sanctuary</span>
            </span>

            <span className="block mt-2">
              You’ve Been Searching For
            </span>

          </h2>

          {/* CTA GROUP */}
          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">

            {/* PRIMARY */}
            <button className="px-8 py-3 bg-white text-[#0F172A] text-[13px] tracking-[0.15em] uppercase rounded-full hover:bg-white/90 transition">
              Reserve
            </button>

            {/* SECONDARY */}
            <button className="px-8 py-3 border border-white/40 text-white text-[13px] tracking-[0.15em] uppercase rounded-full hover:border-white transition">
              Book an Initial Call
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}
