"use client"

import { useEffect, useRef, useState, useLayoutEffect, useMemo, useCallback, Fragment   } from "react"
import { gsap } from "../../lib/gsap"
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react";
import TransitionLink from "@/components/TransitionLink";
import { usePageTransition } from "@/components/PageTransitionProvider";
import { SITE_CONTACT } from "@/lib/siteConfig";


import useEmblaCarousel from "embla-carousel-react";

gsap.registerPlugin(ScrollTrigger)

import Footer from '../../components/Footer'

const DISABLE_ANIMATION = false; // ubah ke false kalau mau animasi aktif

export default function Page() {
  return (
    <main className="bg-[#0a0f14] text-white overflow-hidden">
      <Hero />  
      <ExperienceDayOnBoard/>
      {/* <ExperienceFrame/> */}
      <ExperienceActivities/>
      {/* <ExperienceBreaking/> */}
      <ExperienceDining/>
      <ExperienceHumanMoments/>
      {/* <ExperienceMoments/>  */}
      {/* <SplitHorizon/> */}
      {/* <ExperienceActivities/> */}
      {/* <ExperienceSelection/>  */}
      {/* <SampleJourney/> */}
      {/* <JourneyLens  /> */}
      {/* <ExperienceFlow2/> */}
      {/* <WhatsIncluded/> */}
      {/* <RatesBridge/> */}
      {/* <SocialExperience/> */}
      {/* <FinalClosing/> */}
      {/* <ExperiencesIntro/> */}
      {/* <ExperienceModes/> */}
      {/* <Culinary/> */}
      <Footer/> 
    </main>
  )
}

function Hero() {
  const sectionRef = useRef(null);
  const panelFieldRef = useRef(null);
  const contentRef = useRef(null);
  const hasPlayedEntranceRef = useRef(false);
  const entranceTlRef = useRef(null);

  const shouldReduceMotion = useReducedMotion();
  const { stage } = usePageTransition();

  const [heroEntranceReady, setHeroEntranceReady] = useState(
    stage !== "covering"
  );

  const panels = [
    {
      angle: "118deg",
      radialX: "26%",
      radialY: "42%",
      imageOpacity: 0.82,
      mobileVisible: true,
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776869680/ChatGPT_Image_Apr_22_2026_08_27_54_PM_n8evgp.png",
      alt: "Guests returning from the water onto the teak deck of Serenity",
      objectPosition: "62% center",
    },
    {
      angle: "198deg",
      radialX: "74%",
      radialY: "42%",
      imageOpacity: 0.78,
      mobileVisible: false,
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1778922404/ChatGPT_Image_May_16_2026_04_05_14_PM_liebfi.png",
      alt: "Serenity phinisi moving through Indonesian waters",
      objectPosition: "center center",
    },
    {
      angle: "302deg",
      radialX: "36%",
      radialY: "42%",
      imageOpacity: 0.8,
      mobileVisible: false,
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1778922405/ChatGPT_Image_May_16_2026_03_49_22_PM_cyflb6.png",
      alt: "Warm evening atmosphere aboard Serenity",
      objectPosition: "center center",
    },
    {
      angle: "62deg",
      radialX: "70%",
      radialY: "42%",
      imageOpacity: 0.8,
      mobileVisible: true,
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1778534687/ChatGPT_Image_May_12_2026_04_07_19_AM_lu1htz.png",
      alt: "Quiet human moment aboard Serenity at sea",
      objectPosition: "70% center",
    },
  ];

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
    return () => {
      entranceTlRef.current?.kill();
      entranceTlRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const enterNodes =
      contentRef.current.querySelectorAll(".experience-hero-enter") ?? [];

    if (!heroEntranceReady) {
      entranceTlRef.current?.kill();
      entranceTlRef.current = null;
      gsap.set(enterNodes, {
        opacity: 0,
        y: 22,
        filter: "blur(7px)",
      });
      return;
    }

    if (shouldReduceMotion) {
      entranceTlRef.current?.kill();
      entranceTlRef.current = null;
      gsap.set(enterNodes, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      });
      hasPlayedEntranceRef.current = true;
      return;
    }

    if (hasPlayedEntranceRef.current) {
      entranceTlRef.current?.kill();
      entranceTlRef.current = null;
      gsap.set(enterNodes, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      });
      return;
    }

    hasPlayedEntranceRef.current = true;
    entranceTlRef.current?.kill();
    gsap.set(enterNodes, {
      opacity: 0,
      y: 22,
      filter: "blur(7px)",
    });

    entranceTlRef.current = gsap.timeline();
    entranceTlRef.current.to(enterNodes, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.18,
      stagger: 0.11,
      ease: "power3.out",
    });
  }, [heroEntranceReady, shouldReduceMotion]);

  useEffect(() => {
    if (!sectionRef.current || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      const panelImages =
        panelFieldRef.current?.querySelectorAll(".experience-hero-image") ?? [];

      if (panelImages.length > 0) {
        gsap.set(panelImages, {
          yPercent: -1.5,
          scale: 1.045,
          transformOrigin: "center center",
        });

        gsap.to(panelImages, {
          yPercent: 4.5,
          scale: 1.075,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: "5.5%",
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "46% top",
            scrub: 0.8,
          },
        });
      }

      if (panelFieldRef.current) {
        gsap.to(panelFieldRef.current, {
          y: "2%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        isolate
        h-[100svh]
        min-h-[680px]
        overflow-hidden
        bg-[#2D3C68]
        md:h-[92svh]
        md:min-h-[760px]
      "
    >
      {/* ========================================================= */}
      {/* PANEL FIELD — DESKTOP 4-PANEL, MOBILE 2-PANEL */}
      {/* Mobile deliberately shows active water + quiet human moment. */}
      {/* ========================================================= */}

      <div
        ref={panelFieldRef}
        className="
          absolute
          inset-0
          grid
          grid-cols-1
          grid-rows-2
          will-change-transform
          md:grid-cols-4
          md:grid-rows-1
        "
      >
        {panels.map((panel, index) => (
          <div
            key={panel.image}
            className={`
              relative
              overflow-hidden
              bg-[#2D3C68]
              ${!panel.mobileVisible ? "hidden md:block" : ""}
            `}
          >
            <Image
              src={panel.image}
              alt={panel.alt}
              fill
              priority={index === 0 || panel.mobileVisible}
              sizes="(max-width: 767px) 100vw, 25vw"
              className="
                experience-hero-image
                h-full
                w-full
                object-cover
                will-change-transform
              "
              style={{
                objectPosition: panel.objectPosition,
                opacity: panel.imageOpacity,
              }}
            />

            {/* BLUE IMAGE WASH */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
              "
              style={{
                background: `
                  linear-gradient(
                    ${panel.angle},
                    rgba(31, 47, 86, 0.76) 0%,
                    rgba(45, 60, 104, 0.58) 44%,
                    rgba(58, 74, 117, 0.34) 76%,
                    rgba(244, 245, 242, 0.025) 140%
                  )
                `,
              }}
            />

            {/* DEPTH ANCHOR */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
              "
              style={{
                background: `
                  linear-gradient(
                    to bottom,
                    rgba(8, 13, 26, 0.12) 0%,
                    rgba(18, 28, 52, 0.22) 46%,
                    rgba(5, 8, 15, 0.62) 100%
                  )
                `,
              }}
            />

            {/* LOCAL LIGHT FIELD */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
              "
              style={{
                background: `
                  radial-gradient(
                    circle at ${panel.radialX} ${panel.radialY},
                    rgba(244, 245, 242, 0.07),
                    transparent 58%
                  )
                `,
              }}
            />

            {/* BOTTOM READABILITY */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
              "
              style={{
                background: `
                  linear-gradient(
                    to top,
                    rgba(5, 8, 15, 0.56) 0%,
                    rgba(5, 8, 15, 0.24) 34%,
                    transparent 76%
                  )
                `,
              }}
            />

            {/* DESKTOP DIVIDER */}
            {index !== 3 && (
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  right-0
                  top-[16%]
                  hidden
                  h-[68%]
                  w-px
                  md:block
                "
                style={{
                  opacity: index === 1 ? 0.035 : 0.052,
                  background: `
                    linear-gradient(
                      to bottom,
                      transparent,
                      rgba(244, 245, 242, 0.84),
                      transparent
                    )
                  `,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* ========================================================= */}
      {/* GLOBAL ATMOSPHERE */}
      {/* ========================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background: `
            radial-gradient(
              ellipse at 50% 8%,
              rgba(255, 255, 255, 0.055),
              transparent 54%
            ),
            radial-gradient(
              ellipse at 76% 22%,
              rgba(45, 60, 104, 0.2),
              transparent 48%
            )
          `,
        }}
      />

      <div
        aria-hidden="true"
        className="
          serenity-experience-breath
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background: `
            radial-gradient(
              ellipse at 52% 44%,
              rgba(176, 141, 87, 0.11),
              transparent 48%
            ),
            radial-gradient(
              ellipse at 34% 38%,
              rgba(244, 245, 242, 0.05),
              transparent 46%
            )
          `,
        }}
      />

      {/* CENTER READABILITY VEIL */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(6,10,20,0.42), rgba(9,14,25,0.2) 32%, transparent 60%)",
        }}
      />

      {/* MOBILE BOTTOM READABILITY VEIL */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          md:hidden
        "
        style={{
          background:
            "linear-gradient(to top, rgba(5,8,15,0.78) 0%, rgba(5,8,15,0.42) 36%, transparent 74%)",
        }}
      />

      {/* GRAIN */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.028]
        "
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dombq6plz/image/upload/v1747227718/noise_t0x7vx.png')",
        }}
      />

      {/* ========================================================= */}
      {/* CONTENT */}
      {/* ========================================================= */}

      <div
        ref={contentRef}
        className="
          absolute
          inset-0
          z-20
          flex
          items-end
          justify-start
          pb-[clamp(72px,10svh,112px)]
          will-change-transform
          md:items-center
          md:justify-center
          md:pb-0
        "
      >
        <div
          className="
            w-full
            max-w-[620px]
            px-6
            text-left
            md:mx-auto
            md:text-center
          "
        >
          <p
            className="
              experience-hero-enter
              mb-4
              text-[10px]
              uppercase
              tracking-[0.32em]
              text-[#F4F5F2]/55
              md:mb-5
              md:text-[11px]
            "
          >
            Experiences
          </p>

          <h1
            className="
              font-[Gambarino]
              text-[42px]
              leading-[1.02]
              tracking-[-0.04em]
              text-[#F4F5F2]
              drop-shadow-[0_18px_54px_rgba(5,8,15,0.38)]
              sm:text-[52px]
              md:text-[clamp(62px,6.4vw,76px)]
            "
          >
            <span className="experience-hero-enter block">
              No schedules.
            </span>

            <span className="experience-hero-enter block">
              Just the sea.
            </span>
          </h1>

          <p
            className="
              experience-hero-enter
              mt-5
              max-w-[430px]
              text-[14px]
              leading-[1.9]
              text-[#F4F5F2]/76
              drop-shadow-[0_12px_34px_rgba(5,8,15,0.32)]
              md:mx-auto
              md:mt-6
              md:max-w-[480px]
              md:text-[15px]
            "
          >
            Some mornings begin in the water. Others stay slow from the start,
            with nowhere particular to be.
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ATMOSPHERIC EXIT TO SAIL-WHITE */}
      {/* ========================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          z-10
          h-[170px]
          md:h-[210px]
        "
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(244,245,242,0) 0%,
              rgba(244,245,242,0.07) 42%,
              rgba(244,245,242,0.24) 72%,
              rgba(244,245,242,0.42) 100%
            )
          `,
        }}
      />

      {/* ========================================================= */}
      {/* KEYFRAMES — RESTRAINED, GLOBAL ONLY */}
      {/* ========================================================= */}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .experience-hero-enter {
              opacity: 0;
              transform: translateY(22px);
              filter: blur(7px);
              will-change: opacity, transform, filter;
            }

            .serenity-experience-breath {
              opacity: 0.38;
              animation-name: serenityExperienceBreath;
              animation-duration: 18s;
              animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
              animation-iteration-count: infinite;
              animation-direction: alternate;
              will-change: opacity;
            }

            @keyframes serenityExperienceBreath {
              0% {
                opacity: 0.28;
              }

              44% {
                opacity: 0.38;
              }

              100% {
                opacity: 0.48;
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .experience-hero-enter {
                opacity: 1;
                transform: none;
                filter: none;
              }

              .serenity-experience-breath {
                animation: none;
                opacity: 0.34;
              }
            }
          `,
        }}
      />
    </section>
  );
}

function ExperienceFrame() {
  const sectionRef  = useRef(null);
  const headlineRef = useRef(null);
  const bodyRef     = useRef(null);
  const imageRef    = useRef(null);
  const statRef     = useRef(null);
 
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
    if (reduce) {
      gsap.set(
        [headlineRef.current, bodyRef.current, imageRef.current, statRef.current],
        { opacity: 1, y: 0 }
      );
      return;
    }
 
    const ctx = gsap.context(() => {
      const ease = [0.22, 1, 0.36, 1];
 
      gsap.fromTo(headlineRef.current,
        { opacity: 0, y: 44 },
        {
          opacity: 1, y: 0, duration: 1.3, ease,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 76%' },
        }
      );
 
      gsap.fromTo(bodyRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 1.1, ease,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
          delay: 0.14,
        }
      );
 
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 1.03 },
        {
          opacity: 1, scale: 1, duration: 1.4, ease,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
          delay: 0.08,
        }
      );
 
      gsap.fromTo(statRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 1.0, ease,
          scrollTrigger: { trigger: statRef.current, start: 'top 88%' },
        }
      );
    }, sectionRef);
 
    return () => ctx.revert();
  }, []);
 
  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F4F5F2] overflow-hidden"
      style={{
        paddingTop   : 'clamp(88px, 12vh, 144px)',
        paddingBottom: 'clamp(88px, 12vh, 144px)',
      }}
    >
 
      {/* Bridge in — carries memory of hero dark */}
      <div
        className="absolute top-0 inset-x-0 h-[90px] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(45,60,104,0.06), transparent)' }}
        aria-hidden="true"
      />
 
      {/* Grain — same texture as hero, keeps atmosphere */}
      <div
        className="absolute inset-[-10%] opacity-[0.03] mix-blend-soft-light pointer-events-none"
        style={{ backgroundImage: "url('https://res.cloudinary.com/dombq6plz/image/upload/v1747227718/noise_t0x7vx.png')" }}
        aria-hidden="true"
      />
 
      {/* ── Headline ────────────────────────────────────────────────────
          Sits at full section width — not capped at max-w.
          Scale contrast: this is bigger than everything below it.
          Three words that open a question the body answers.
          "The crew knows." → knows what? keep reading.
      ─────────────────────────────────────────────────────────────── */}
      <div
        ref={headlineRef}
        className="w-full px-6 md:px-10 lg:px-14"
        style={{ marginBottom: 'clamp(48px, 8vh, 88px)' }}
      >
        <h2
          style={{
            fontFamily   : 'Gambarino, Georgia, serif',
            fontSize     : 'clamp(58px, 9vw, 128px)',
            lineHeight   : 0.95,
            letterSpacing: '-0.04em',
            color        : '#2D3C68',
            fontWeight   : 400,
            margin       : 0,
          }}
        >
          The crew knows.
        </h2>
      </div>
 
      {/* ── Two column — body left, image right ─────────────────────── */}
      <div className="relative w-full max-w-[1280px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-14 gap-y-10 md:items-start">
 
          {/* Body + stat */}
          <div ref={bodyRef} className="md:col-span-6 flex flex-col">
 
            <p
              style={{
                fontFamily: 'Switzer, sans-serif',
                fontSize  : '15px',
                lineHeight: 1.9,
                color     : 'rgba(45,60,104,0.68)',
                fontWeight: 300,
                maxWidth  : '44ch',
                margin    : 0,
              }}
            >
              When to be there and when to stay away. What you
              want before you ask. Ten people on a forty-metre
              boat who have made a practice of reading the sea
              and the people on it.
            </p>
 
            <p
              style={{
                fontFamily: 'Switzer, sans-serif',
                fontSize  : '15px',
                lineHeight: 1.9,
                color     : 'rgba(45,60,104,0.68)',
                fontWeight: 300,
                maxWidth  : '44ch',
                margin    : 'clamp(22px, 3vh, 36px) 0 0 0',
              }}
            >
              The days take shape around this. Not around a
              schedule, not around a programme — around people
              who already know what the morning asks for before
              anyone wakes up.
            </p>
 
            {/* Stat — earned only after reading the two paragraphs */}
            <div ref={statRef} style={{ marginTop: 'clamp(36px, 6vh, 64px)' }}>
              <div
                style={{
                  width     : '28px',
                  height    : '1px',
                  background: 'rgba(176,141,87,0.55)',
                  marginBottom: '20px',
                }}
                aria-hidden="true"
              />
              <p
                style={{
                  fontFamily   : 'Gambarino, Georgia, serif',
                  fontSize     : 'clamp(30px, 3.4vw, 50px)',
                  lineHeight   : 1.0,
                  letterSpacing: '-0.03em',
                  color        : '#2D3C68',
                  fontWeight   : 400,
                  margin       : 0,
                }}
              >
                Ten crew.
                <br />
                Twelve guests.
              </p>
            </div>
 
          </div>
 
          {/* Image — portrait, offset upward to break alignment */}
          <div
            ref={imageRef}
            className="md:col-span-5 md:col-start-8 md:-mt-12"
          >
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: '3 / 4' }}
            >
              <img
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=80&fit=crop"
                alt=""
                role="presentation"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'rgba(45,60,104,0.06)' }}
              />
            </div>
          </div>
 
        </div>
      </div>
 
      {/* Bridge out */}
      <div
        className="absolute bottom-0 inset-x-0 h-[80px] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(45,60,104,0.04))' }}
        aria-hidden="true"
      />
 
    </section>
  );
}

function ExperienceActivities() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const groupRefs = useRef([]);

  const shouldReduceMotion = useReducedMotion();

  const groups = [
    {
      id: "wakeboarding",
      number: "01",
      intro: "For the mornings when the sea is flat and the energy is there.",
      layout: "single-wide",
      imageClass: "aspect-[4/3] md:aspect-[16/7]",
      activities: [
        {
          name: "Wakeboarding",
          desc: "Glide across calm seas surrounding Serenity.",
          img: "https://res.cloudinary.com/dombq6plz/image/upload/v1778922404/ChatGPT_Image_May_16_2026_03_32_29_PM_yhqlyg.png",
          alt: "Wakeboarding across calm water during a Serenity voyage",
          position: "50% 50%",
        },
      ],
    },
    {
      id: "reef",
      number: "02",
      intro:
        "The reef is often the reason people come this far. Some days are built around it.",
      layout: "pair",
      activities: [
        {
          name: "Diving",
          desc: "Explore Indonesia's most extraordinary underwater worlds.",
          img: "https://res.cloudinary.com/dombq6plz/image/upload/v1778922404/ChatGPT_Image_May_16_2026_03_49_30_PM_mcgmc4.png",
          alt: "Diving through clear Indonesian waters",
          position: "50% 55%",
        },
        {
          name: "Snorkeling",
          desc: "Discover colorful reefs just beneath the surface.",
          img: "https://res.cloudinary.com/dombq6plz/image/upload/v1778922405/ChatGPT_Image_May_16_2026_03_49_22_PM_cyflb6.png",
          alt: "Snorkeling above reef during a Serenity voyage",
          position: "50% 48%",
        },
      ],
    },
    {
      id: "quiet",
      number: "03",
      intro:
        "The hours that don't ask anything of you. A line in the water. A board on a quiet bay.",
      layout: "pair-portrait",
      activities: [
        {
          name: "Fishing",
          desc: "Cast a line in peaceful waters.",
          img: "https://res.cloudinary.com/dombq6plz/image/upload/v1778922404/ChatGPT_Image_May_16_2026_04_05_14_PM_liebfi.png",
          alt: "Quiet fishing moment near Serenity",
          position: "50% 50%",
        },
        {
          name: "Paddle Boarding",
          desc: "Drift quietly across calm bays and hidden coves.",
          img: "https://res.cloudinary.com/dombq6plz/image/upload/v1778922404/ChatGPT_Image_May_16_2026_04_05_17_PM_ajh5dz.png",
          alt: "Paddle boarding across calm water",
          position: "50% 50%",
        },
      ],
    },
    {
      id: "island",
      number: "04",
      intro:
        "Some islands are best understood on foot. The crew knows which ones are worth the walk.",
      layout: "single-wide",
      imageClass: "aspect-[4/3] md:aspect-[21/9]",
      activities: [
        {
          name: "Island Exploration",
          desc: "Step ashore on remote islands.",
          img: "https://res.cloudinary.com/dombq6plz/image/upload/v1778922406/ChatGPT_Image_May_16_2026_04_00_38_PM_zneayx.png",
          alt: "Remote island exploration during a Serenity voyage",
          position: "50% 50%",
        },
      ],
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const headerNodes =
      headerRef.current?.querySelectorAll(".activity-reveal") ?? [];

    const groupNodes = groupRefs.current
      .flatMap((group) =>
        group ? Array.from(group.querySelectorAll(".activity-reveal")) : []
      )
      .filter(Boolean);

    const allNodes = [...headerNodes, ...groupNodes].filter(Boolean);

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
          if (headerNodes.length > 0) {
            gsap.fromTo(
              headerNodes,
              {
                opacity: 0,
                y: mobile ? 14 : 18,
                filter: "blur(5px)",
              },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.95,
                stagger: 0.07,
                ease: serenityEase,
                scrollTrigger: {
                  trigger: headerRef.current,
                  start: mobile ? "top 86%" : "top 82%",
                  once: true,
                },
              }
            );
          }

          groupRefs.current.forEach((group) => {
            if (!group) return;

            const nodes = group.querySelectorAll(".activity-reveal");

            if (nodes.length === 0) return;

            gsap.fromTo(
              nodes,
              {
                opacity: 0,
                y: mobile ? 15 : 20,
                filter: "blur(4px)",
              },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.95,
                stagger: mobile ? 0.05 : 0.07,
                ease: serenityEase,
                scrollTrigger: {
                  trigger: group,
                  start: mobile ? "top 88%" : "top 84%",
                  once: true,
                },
              }
            );
          });
        }, sectionRef);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, [shouldReduceMotion]);

  const renderImage = (activity, className = "") => (
    <div
      className={`
        relative
        w-full
        overflow-hidden
        bg-[#2D3C68]/[0.045]
        ${className}
      `}
    >
      <img
        src={activity.img}
        alt={activity.alt}
        loading="lazy"
        decoding="async"
        draggable="false"
        className="
          absolute
          inset-0
          h-full
          w-full
          scale-[1.012]
          object-cover
        "
        style={{
          objectPosition: activity.position,
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[#2D3C68]/[0.04]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(ellipse at 50% 18%, rgba(176,141,87,0.045), transparent 58%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          ring-1
          ring-inset
          ring-[#2D3C68]/[0.055]
        "
      />
    </div>
  );

  const renderActivityCopy = (activity, compact = false) => (
    <div>
      <h3
        className={`
          font-[Gambarino]
          leading-[1.05]
          tracking-[-0.028em]
          text-[#2D3C68]
          ${
            compact
              ? "text-[24px] md:text-[clamp(24px,2vw,30px)]"
              : "text-[26px] md:text-[clamp(26px,2.2vw,32px)]"
          }
        `}
      >
        {activity.name}
      </h3>

      <p
        className={`
          mt-2
          max-w-[40ch]
          text-[13px]
          leading-[1.75]
          text-[#2D3C68]/52
          ${compact ? "md:text-[12px]" : ""}
        `}
      >
        {activity.desc}
      </p>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="experience-activities-title"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F4F5F2]
        pb-[96px]
        pt-[36px]
        text-[#2D3C68]
        md:pb-[132px]
        md:pt-[52px]
      "
      style={{
        backgroundColor: "#F4F5F2",
        colorScheme: "light",
      }}
    >
      {/* Compressed bridge in from ExperienceDayOnBoard */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-[36px]
          md:h-[48px]
        "
        style={{
          background:
            "linear-gradient(to bottom, rgba(45,60,104,0.018) 0%, rgba(45,60,104,0.006) 52%, rgba(45,60,104,0) 100%)",
        }}
      />

      {/* Grain */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-[-10%]
          opacity-[0.026]
          mix-blend-soft-light
        "
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dombq6plz/image/upload/v1747227718/noise_t0x7vx.png')",
        }}
      />

      {/* Warm atmosphere */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(circle at 68% 22%, rgba(176,141,87,0.04) 0%, rgba(176,141,87,0) 52%)",
        }}
      />

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1280px]
          px-6
          md:px-10
          lg:px-14
        "
      >
        {/* Header */}
        <div ref={headerRef} className="mb-10 md:mb-14">
          <p
            className="
              activity-reveal
              text-[10px]
              uppercase
              tracking-[0.34em]
              text-[#2D3C68]/42
              md:text-[11px]
            "
          >
            Activities
          </p>

          <div
            className="
              activity-reveal
              mt-5
              h-px
              w-10
              bg-[#B08D57]/62
            "
          />

          <h2
            id="experience-activities-title"
            className="
              activity-reveal
              mt-6
              max-w-[16ch]
              font-[Gambarino]
              text-[38px]
              leading-[1.04]
              tracking-[-0.04em]
              text-[#2D3C68]
              sm:text-[46px]
              md:text-[clamp(52px,4.4vw,62px)]
            "
          >
            Whatever the sea allows.
          </h2>
        </div>

        {/* Groups */}
        <div>
          {groups.map((group, groupIndex) => (
            <div
              key={group.id}
              ref={(element) => {
                groupRefs.current[groupIndex] = element;
              }}
              className="
                grid
                grid-cols-1
                gap-y-5
                border-t
                border-[#2D3C68]/8
                py-9
                md:grid-cols-12
                md:gap-x-10
                md:py-11
              "
            >
              {/* Number */}
              <div
                className="
                  activity-reveal
                  flex
                  md:col-span-2
                  md:flex-col
                  md:pt-1
                "
              >
                <span
                  className="
                    text-[10px]
                    uppercase
                    tracking-[0.24em]
                    text-[#2D3C68]/30
                  "
                >
                  {group.number}
                </span>
              </div>

              {/* Content */}
              <div className="md:col-span-10">
                {group.intro && (
                  <p
                    className="
                      activity-reveal
                      mb-6
                      max-w-[54ch]
                      text-[14px]
                      leading-[1.85]
                      text-[#2D3C68]/64
                      md:mb-7
                    "
                  >
                    {group.intro}
                  </p>
                )}

                {group.layout === "single-wide" && (
                  <div className="activity-reveal flex flex-col gap-4">
                    {renderImage(group.activities[0], group.imageClass)}
                    {renderActivityCopy(group.activities[0])}
                  </div>
                )}

                {group.layout === "pair" && (
                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-8
                      md:grid-cols-2
                      md:gap-8
                    "
                  >
                    {group.activities.map((activity) => (
                      <div
                        key={activity.name}
                        className="
                          activity-reveal
                          flex
                          flex-col
                          gap-4
                        "
                      >
                        {renderImage(activity, "aspect-[4/3]")}
                        {renderActivityCopy(activity)}
                      </div>
                    ))}
                  </div>
                )}

                {group.layout === "pair-portrait" && (
                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-8
                      sm:grid-cols-2
                      md:max-w-[68%]
                      md:gap-10
                    "
                  >
                    {group.activities.map((activity) => (
                      <div
                        key={activity.name}
                        className="
                          activity-reveal
                          flex
                          flex-col
                          gap-3
                        "
                      >
                        {renderImage(
                          activity,
                          "aspect-[4/3] sm:aspect-[3/4]"
                        )}

                        {renderActivityCopy(activity, true)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bridge out */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-[84px]
          md:h-[104px]
        "
        style={{
          background:
            "linear-gradient(to bottom, rgba(244,245,242,0) 0%, rgba(45,60,104,0.035) 74%, rgba(45,60,104,0.06) 100%)",
        }}
      />
    </section>
  );
}

function ExperienceBreaking() {
  const sectionRef = useRef(null);
  const textRef    = useRef(null);
 
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
    if (reduce) {
      gsap.set(textRef.current, { opacity: 1, y: 0 });
      return;
    }
 
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20, filter: 'blur(4px)' },
        {
          opacity : 1,
          y       : 0,
          filter  : 'blur(0px)',
          duration: 1.3,
          ease    : [0.22, 1, 0.36, 1],
          scrollTrigger: {
            trigger: sectionRef.current,
            start  : 'top 72%',
          },
        }
      );
    }, sectionRef);
 
    return () => ctx.revert();
  }, []);
 
  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F4F5F2] overflow-hidden py-20 md:py-28"
    >
 
      {/* Bridge in — barely visible */}
      <div
        className="absolute top-0 inset-x-0 h-[60px] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(45,60,104,0.03), transparent)' }}
        aria-hidden="true"
      />
 
      {/* Grain — consistent with all sail-white sections */}
      <div
        className="absolute inset-[-10%] opacity-[0.03] mix-blend-soft-light pointer-events-none"
        style={{ backgroundImage: "url('https://res.cloudinary.com/dombq6plz/image/upload/v1747227718/noise_t0x7vx.png')" }}
        aria-hidden="true"
      />
      <div className="flex items-center justify-center px-6">
        <p
          ref={textRef}
          style={{
            fontFamily   : 'Gambarino, Georgia, serif',
            fontSize     : 'clamp(36px, 4.8vw, 52px)',
            lineHeight   : 1.1,
            letterSpacing: '-0.03em',
            color        : '#2D3C68',
            fontWeight   : 400,
            textAlign    : 'center',
            maxWidth     : '600px',
            margin       : 0,
          }}
        >
          Nowhere to be.
          <br />
          Nothing to follow.
        </p>
      </div>
 
      {/* Bridge out — toward dark Dining.
          Gradient darkens significantly so the jump to #121824
          feels like dusk arriving, not a hard cut.              */}
      <div
        className="absolute bottom-0 inset-x-0 pointer-events-none"
        style={{
          height    : '140px',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(18,24,36,0.05) 30%, rgba(18,24,36,0.16) 60%, rgba(18,24,36,0.38) 100%)',
        }}
        aria-hidden="true"
      />
 
    </section>
  );
}


function ExperienceDining() {
  const sectionRef = useRef(null);
  const imgWrapRef = useRef(null);
  const contentRef = useRef(null);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const revealNodes =
      contentRef.current.querySelectorAll(".dining-reveal") ?? [];

    const allNodes = [imgWrapRef.current, ...revealNodes].filter(Boolean);

    if (shouldReduceMotion) {
      gsap.set(allNodes, {
        opacity: 1,
        y: 0,
        yPercent: 0,
        scale: 1,
        filter: "blur(0px)",
      });

      return;
    }

    const ctx = gsap.context(() => {
      if (imgWrapRef.current) {
        gsap.set(imgWrapRef.current, {
          yPercent: -3,
          scale: 1.035,
          transformOrigin: "center center",
        });

        gsap.to(imgWrapRef.current, {
          yPercent: 3,
          scale: 1.065,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.6,
          },
        });
      }

      if (revealNodes.length > 0) {
        gsap.fromTo(
          revealNodes,
          {
            opacity: 0,
            y: 22,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.18,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 74%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="experience-dining-title"
      className="
        relative
        min-h-[760px]
        w-full
        overflow-hidden
        bg-[#2D3C68]
        text-[#F4F5F2]
        md:min-h-[820px]
      "
      style={{
        backgroundColor: "#2D3C68",
        colorScheme: "dark",
      }}
    >
      {/* FULL BLEED IMAGE FIELD */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          overflow-hidden
        "
      >
        <div
          ref={imgWrapRef}
          className="
            absolute
            inset-[-8%]
            will-change-transform
          "
        >
          <img
            src="https://res.cloudinary.com/dombq6plz/image/upload/v1778922404/ChatGPT_Image_May_16_2026_04_03_53_PM_yqjf6x.png"
            alt=""
            role="presentation"
            loading="lazy"
            decoding="async"
            draggable="false"
            className="
              h-full
              w-full
              object-cover
            "
            style={{
              objectPosition: "58% center",
              filter: "brightness(0.82) saturate(0.88) contrast(1.04)",
            }}
          />
        </div>
      </div>

      {/* GLOBAL SERENITY NAVY DISCIPLINE */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[#2D3C68]/[0.26]
        "
      />

      {/* SOFT NAVY VEIL COLUMN — BLUR AS ATMOSPHERE, NOT CARD */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          top-0
          w-full
          md:w-[68%]
        "
        style={{
          background:
            "linear-gradient(to right, rgba(11,19,34,0.86) 0%, rgba(23,38,65,0.72) 34%, rgba(23,38,65,0.42) 58%, rgba(23,38,65,0.12) 78%, rgba(23,38,65,0) 100%)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 48%, rgba(0,0,0,0.62) 70%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 48%, rgba(0,0,0,0.62) 70%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* INNER TEXT SHADOW FIELD */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(ellipse at 22% 52%, rgba(5,10,20,0.46) 0%, rgba(8,12,18,0.28) 34%, rgba(8,12,18,0.08) 58%, rgba(8,12,18,0) 76%)",
        }}
      />

      {/* TOP BRIDGE FROM ACTIVITIES */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-[5]
          h-[132px]
          bg-gradient-to-b
          from-[#F4F5F2]/[0.07]
          via-[#F4F5F2]/[0.022]
          to-transparent
          md:h-[166px]
        "
      />

      {/* BOTTOM DEPTH */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "linear-gradient(to top, rgba(8,12,18,0.74) 0%, rgba(8,12,18,0.36) 28%, rgba(8,12,18,0.08) 58%, rgba(8,12,18,0) 100%)",
        }}
      />

      {/* WARM DINING ATMOSPHERE */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(ellipse at 70% 48%, rgba(176,141,87,0.16) 0%, rgba(176,141,87,0.065) 30%, rgba(176,141,87,0) 68%)",
        }}
      />

      {/* MOBILE READABILITY SCULPT */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          md:hidden
        "
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,14,22,0.72) 0%, rgba(10,14,22,0.44) 34%, rgba(10,14,22,0.58) 62%, rgba(10,14,22,0.9) 100%)",
        }}
      />

      {/* LOCALIZED SUMBA IKAT — SIGNATURE, NOT WALLPAPER */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-18%]
          top-[10%]
          hidden
          h-[560px]
          w-[min(760px,60vw)]
          -rotate-[4deg]
          opacity-[0.022]
          mix-blend-soft-light
          md:block
        "
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dombq6plz/image/upload/v1778486752/ChatGPT_Image_May_11_2026_03_01_56_PM_2_k2aiwl.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "280px auto",
          backgroundPosition: "center",
          filter: "blur(0.15px)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.38) 52%, rgba(0,0,0,0) 78%)",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.38) 52%, rgba(0,0,0,0) 78%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-[4%]
          h-[340px]
          opacity-[0.017]
          mix-blend-soft-light
          md:hidden
        "
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dombq6plz/image/upload/v1778486752/ChatGPT_Image_May_11_2026_03_01_56_PM_2_k2aiwl.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "240px auto",
          backgroundPosition: "center",
          filter: "blur(0.15px)",
          WebkitMaskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.22) 62%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.22) 62%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* GRAIN */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-[-10%]
          opacity-[0.036]
          mix-blend-soft-light
        "
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dombq6plz/image/upload/v1747227718/noise_t0x7vx.png')",
        }}
      />

      {/* CONTENT */}
      <div
        ref={contentRef}
        className="
          relative
          z-10
          flex
          min-h-[760px]
          items-center
          py-[96px]
          md:min-h-[820px]
          md:py-[128px]
          lg:py-[148px]
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1280px]
            px-6
            md:px-10
            lg:px-14
          "
        >
          <div
            className="
              max-w-[500px]
              md:max-w-[480px]
            "
          >
            <p
              className="
                dining-reveal
                text-[10px]
                uppercase
                tracking-[0.34em]
                text-[#F4F5F2]/58
                md:text-[11px]
              "
            >
              Dining
            </p>

            <h2
              id="experience-dining-title"
              className="
                dining-reveal
                mt-5
                max-w-[13ch]
                font-[Gambarino]
                text-[40px]
                leading-[1]
                tracking-[-0.04em]
                text-[#F4F5F2]
                sm:text-[48px]
                md:text-[clamp(50px,5vw,66px)]
              "
            >
              The table follows
              <br />
              the day.
            </h2>

            <p
              className="
                dining-reveal
                mt-6
                max-w-[400px]
                text-[14px]
                leading-[1.9]
                text-[#F4F5F2]/74
                md:text-[15px]
              "
            >
              Meals follow the anchorage, the weather, and what the crew brings
              from the water — served where the evening makes the most sense.
            </p>

            <div
              aria-hidden="true"
              className="
                dining-reveal
                mt-8
                h-px
                w-full
                max-w-[320px]
                origin-left
                bg-gradient-to-r
                from-[#B08D57]/62
                via-[#B08D57]/22
                to-transparent
              "
            />
          </div>
        </div>
      </div>

      {/* BOTTOM BRIDGE */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[5]
          h-[124px]
          bg-gradient-to-b
          from-transparent
          via-[#1A2844]/[0.055]
          to-[#1A2844]/[0.16]
          md:h-[150px]
        "
      />
    </section>
  );
}

function ExperienceHumanMoments() {
  const sectionRef = useRef(null);
 
  // individual refs — hooks must not be called inside array literals
  const wrap1Ref  = useRef(null);
  const wrap2Ref  = useRef(null);
  const wrap3Ref  = useRef(null);
  const wrap4Ref  = useRef(null);
  const inner1Ref = useRef(null);
  const inner2Ref = useRef(null);
  const inner3Ref = useRef(null);
  const inner4Ref = useRef(null);
  
const IMAGES = [
  {
    src: "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1200",
    // REPLACE → candid on deck, natural light, Indonesia
  },
  {
    src: "https://images.pexels.com/photos/1574843/pexels-photo-1574843.jpeg?auto=compress&cs=tinysrgb&w=900",
    // REPLACE → Indonesia landscape, wrong geography currently
  },
  {
    src: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1000",
    // REPLACE → vessel or activity shot, Indonesia
  },
  {
    src: "https://images.pexels.com/photos/3225528/pexels-photo-3225528.jpeg?auto=compress&cs=tinysrgb&w=800",
    // REPLACE → Mediterranean coastal — Foundation 10.2 ❌
  },
];
 
/*
  Uniform aspect ratio — all four images same height per row.
  Perfectly even 2×2 grid. No height gaps in grid rows.
  3/4 portrait: consistent with gallery sections across the site.
*/
const ASPECT = "3 / 4";
 
const PARALLAX = [
  { scrub: 1.8, y: -28 },
  { scrub: 2.2, y: -16 },
  { scrub: 1.6, y: -34 },
  { scrub: 2.4, y: -10 },
];
 
const SHADOWS = [
  "0 34px 80px rgba(18,24,36,0.08)",
  "0 24px 64px rgba(18,24,36,0.10)",
  "0 18px 52px rgba(18,24,36,0.06)",
  "0 16px 40px rgba(18,24,36,0.08)",
];
 
  // arrays built from individual refs — safe for iteration
  const wrapRefs  = [wrap1Ref,  wrap2Ref,  wrap3Ref,  wrap4Ref];
  const innerRefs = [inner1Ref, inner2Ref, inner3Ref, inner4Ref];
 
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
 
    /* ── REDUCED MOTION ── */
 
    if (reduce) {
      wrapRefs.forEach((r) => {
        if (r.current) gsap.set(r.current, { opacity: 1, y: 0 });
      });
      return;
    }
 
    const ctx = gsap.context(() => {
      const ease = [0.22, 1, 0.36, 1];
 
      /* ── ENTRANCE — per wrapper, stagger ── */
 
      wrapRefs.forEach((ref, i) => {
        if (!ref.current) return;
 
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 28 },
          {
            opacity:  1,
            y:        0,
            duration: 1.25,
            ease,
            delay: i * 0.08,
            scrollTrigger: {
              trigger: ref.current,
              start:   "top 90%",
            },
          }
        );
      });
 
      /*
        ── KEN BURNS — inner image shifts within overflow-hidden wrapper.
        Wrapper stays fixed in the grid. Only the image inside moves.
        Different rates create visual variety within each frame.
        Does NOT create scattered layout — containers are always in grid.
      */
 
      wrapRefs.forEach((wrapRef, i) => {
        const innerRef = innerRefs[i];
        const { scrub, y } = PARALLAX[i];
 
        if (!innerRef.current || !wrapRef.current) return;
 
        gsap.fromTo(
          innerRef.current,
          { y: 0, scale: 1.02 },
          {
            y,
            scale: 1.045,
            ease:  "none",
            scrollTrigger: {
              trigger: wrapRef.current,
              start:   "top bottom",
              end:     "bottom top",
              scrub,
            },
          }
        );
      });
 
    }, sectionRef);
 
    return () => ctx.revert();
  }, []);
 
  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background:     "linear-gradient(to bottom, #EDEEE9 0%, #F4F5F2 18%, #F4F5F2 100%)",
        paddingTop:     "clamp(78px, 11vh, 118px)",
        paddingBottom:  "clamp(88px, 13vh, 138px)",
      }}
    >
      {/* dining afterglow — top atmospheric bridge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: "180px",
          background: `linear-gradient(
            to bottom,
            rgba(18,24,36,0.10) 0%,
            rgba(18,24,36,0.05) 24%,
            rgba(18,24,36,0.015) 52%,
            transparent 100%
          )`,
        }}
      />
 
      {/* Sumba Ikat divider */}
      <div
        aria-hidden="true"
        className="relative mx-auto mb-4 w-full max-w-[1280px] px-6 md:px-10 lg:px-14"
      >
        <div
          style={{
            height:     "1px",
            background: "rgba(176,141,87,0.16)",
            overflow:   "hidden",
          }}
        />
      </div>
 
      {/* grain texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-10%] opacity-[0.028] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dombq6plz/image/upload/v1747227718/noise_t0x7vx.png')",
        }}
      />
 
      {/* warm atmospheric */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(
            circle at 74% 22%,
            rgba(176,141,87,0.045) 0%,
            rgba(176,141,87,0.018) 24%,
            transparent 54%
          )`,
        }}
      />
 
      {/* left density */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse at 0% 50%,
            rgba(45,60,104,0.035) 0%,
            transparent 52%
          )`,
        }}
      />
 
      {/* ── IMAGE GRID ─────────────────────────────────────────── */}
      {/*
        Structured 2×2 grid.
        No arbitrary widths, no negative margins, no scattered positioning.
        Ken Burns applied to inner image — container stays in grid.
        Uniform aspect ratio (3/4) — all images same height per row.
        Clean, even 2×2 grid at all screen sizes.
      */}
 
      <div className="relative mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-2 gap-3 md:gap-6 lg:gap-8">
          {IMAGES.map((img, i) => (
            <div
              key={i}
              ref={wrapRefs[i]}
              className="relative overflow-hidden"
              style={{
                aspectRatio: ASPECT,
                boxShadow:   SHADOWS[i],
              }}
            >
              {/*
                Inner div — slightly larger than wrapper (inset -10%).
                GSAP moves this div via Ken Burns.
                overflow-hidden on parent clips the movement.
              */}
              <div
                ref={innerRefs[i]}
                style={{ position: "absolute", inset: "-10%" }}
              >
                <img
                  src={img.src}
                  alt=""
                  role="presentation"
                  loading="lazy"
                  className="h-full w-full object-cover"
                  style={{
                    filter: "brightness(0.90) saturate(0.84) contrast(1.02)",
                  }}
                />
              </div>
 
              {/* atmospheric top fall-off */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(
                    to bottom,
                    rgba(12,18,28,0.12) 0%,
                    transparent 24%
                  )`,
                }}
              />
 
              {/* lower shadow pocket */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(
                    to top,
                    rgba(10,14,22,0.22) 0%,
                    rgba(10,14,22,0.08) 18%,
                    transparent 46%
                  )`,
                }}
              />
 
              {/* warm memory wash */}
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(
                    ellipse at 60% 48%,
                    rgba(176,141,87,0.06) 0%,
                    transparent 68%
                  )`,
                }}
              />
 
              {/* edge softening */}
              <div
                className="absolute inset-0"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
 
      {/* memory fade out — atmospheric bridge to next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          height: "140px",
          background: `linear-gradient(
            to bottom,
            transparent 0%,
            rgba(45,60,104,0.025) 54%,
            rgba(45,60,104,0.08) 100%
          )`,
        }}
      />
    </section>
  );
}
 
 






function ExperienceRhythm() {
  // ── Real Unsplash images ──────────────────────────────────────────────
  const IMAGES = {
    morning:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2400&auto=format&fit=crop',

    midday:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2400&auto=format&fit=crop',

    afternoon:
      'https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=2400&auto=format&fit=crop',

    evening:
      'https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=2400&auto=format&fit=crop',
  };

  // ── Beat data ─────────────────────────────────────────────────────────
  const beats = [
    {
      key     : 'morning',
      time    : 'Morning',
      headline: 'Into the water.',
      support : 'The sea is coolest before the sun finds it.',
      bgGrad  : 'linear-gradient(to bottom, #141E30 0%, #1E2D4E 50%, #243456 100%)',
      radial  : 'radial-gradient(ellipse at 50% 90%, rgba(176,141,87,0.10) 0%, transparent 52%)',
      overlay : 'rgba(10,16,32,0.50)',
    },
    {
      key     : 'midday',
      time    : 'Midday',
      headline: 'Back on deck. Nowhere to be.',
      support : 'Lunch when it arrives. Conversation when it starts.',
      bgGrad  : 'linear-gradient(to bottom, #263660 0%, #2D3C68 55%, #243260 100%)',
      radial  : 'radial-gradient(ellipse at 50% 0%, rgba(244,245,242,0.07) 0%, transparent 46%)',
      overlay : 'rgba(16,24,48,0.40)',
    },
    {
      key     : 'afternoon',
      time    : 'Afternoon',
      headline: 'The sea changes. So does the pace.',
      support : 'A line in the water. A cold drink. The horizon.',
      bgGrad  : 'linear-gradient(to bottom, #3A2A1E 0%, #4A3428 48%, #3D2E22 100%)',
      radial  : 'radial-gradient(ellipse at 68% 28%, rgba(176,141,87,0.26) 0%, transparent 54%)',
      overlay : 'rgba(26,16,10,0.44)',
    },
    {
      key     : 'evening',
      time    : 'Evening',
      headline: 'The table is set. The sea is still.',
      support : 'Dinner shaped around whoever is there to share it.',
      bgGrad  : 'linear-gradient(to bottom, #0C1220 0%, #121824 55%, #0E1520 100%)',
      radial  : 'radial-gradient(ellipse at 38% 52%, rgba(176,141,87,0.14) 0%, transparent 46%)',
      overlay : 'rgba(6,8,18,0.58)',
      hasIkat : true,
    },
  ];

  // ── Timeline fade fraction ────────────────────────────────────────────
  const FADE = 0.07;

  const sectionRef = useRef(null);

  const bgRefs       = useRef(beats.map(() => null));
  const imgRefs      = useRef(beats.map(() => null));
  const copyRefs     = useRef(beats.map(() => null));
  const dotRefs      = useRef(beats.map(() => null));
  const dotLabelRefs = useRef(beats.map(() => null));

  const [activeBeat, setActiveBeat] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduce) {
      bgRefs.current.forEach((el, i) =>
        el && gsap.set(el, {
          opacity: i === 0 ? 1 : 0,
        })
      );

      imgRefs.current.forEach((el, i) =>
        el && gsap.set(el, {
          opacity: i === 0 ? 0.28 : 0,
        })
      );

      copyRefs.current.forEach((el, i) =>
        el && gsap.set(el, {
          opacity: i === 0 ? 1 : 0,
          y      : 0,
        })
      );

      return;
    }

    // ── Initial states ───────────────────────────────────────────────
    bgRefs.current.forEach((el, i) =>
      el &&
      gsap.set(el, {
        opacity: i === 0 ? 1 : 0,
      })
    );

    imgRefs.current.forEach((el, i) =>
      el &&
      gsap.set(el, {
        opacity: i === 0 ? 0.28 : 0,
      })
    );

    copyRefs.current.forEach((el, i) =>
      el &&
      gsap.set(el, {
        opacity: i === 0 ? 1 : 0,
        y      : i === 0 ? 0 : 28,
      })
    );

    dotRefs.current.forEach((el, i) =>
      el &&
      gsap.set(el, {
        backgroundColor:
          i === 0
            ? '#B08D57'
            : 'rgba(244,245,242,0.20)',
        scale: i === 0 ? 1.5 : 1,
      })
    );

    dotLabelRefs.current.forEach((el, i) =>
      el &&
      gsap.set(el, {
        opacity: i === 0 ? 0.85 : 0.28,
      })
    );

    // ── Timeline ─────────────────────────────────────────────────────
    const tl = gsap.timeline({ paused: true });

    beats.forEach((_, i) => {
      const start  = i / beats.length;
      const end    = (i + 1) / beats.length;
      const isLast = i === beats.length - 1;

      // ── Incoming beat ─────────────────────────────────────────────
      if (i > 0) {
        tl.fromTo(
          bgRefs.current[i],
          { opacity: 0 },
          {
            opacity: 1,
            duration: FADE,
            ease: 'none',
          },
          start
        );

        tl.fromTo(
          imgRefs.current[i],
          { opacity: 0 },
          {
            opacity: 0.28,
            duration: FADE,
            ease: 'none',
          },
          start
        );

        tl.fromTo(
          copyRefs.current[i],
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: FADE,
            ease: 'none',
          },
          start
        );

        tl.to(
          dotRefs.current[i],
          {
            backgroundColor: '#B08D57',
            scale: 1.5,
            duration: FADE / 2,
            ease: 'none',
          },
          start
        );

        tl.to(
          dotLabelRefs.current[i],
          {
            opacity: 0.85,
            duration: FADE / 2,
            ease: 'none',
          },
          start
        );
      }

      // ── Outgoing beat ─────────────────────────────────────────────
      if (!isLast) {
        const fadeStart = end - FADE;

        tl.to(
          bgRefs.current[i],
          {
            opacity: 0,
            duration: FADE,
            ease: 'none',
          },
          fadeStart
        );

        tl.to(
          imgRefs.current[i],
          {
            opacity: 0,
            duration: FADE,
            ease: 'none',
          },
          fadeStart
        );

        tl.to(
          copyRefs.current[i],
          {
            opacity: 0,
            y: -20,
            duration: FADE,
            ease: 'none',
          },
          fadeStart
        );

        tl.to(
          dotRefs.current[i],
          {
            backgroundColor:
              'rgba(244,245,242,0.20)',
            scale: 1,
            duration: FADE / 2,
            ease: 'none',
          },
          fadeStart
        );

        tl.to(
          dotLabelRefs.current[i],
          {
            opacity: 0.28,
            duration: FADE / 2,
            ease: 'none',
          },
          fadeStart
        );
      }
    });

    // ── ScrollTrigger ───────────────────────────────────────────────
    let lastBeat = 0;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start  : 'top top',
        end    : 'bottom bottom',
        scrub  : 1.2,

        onUpdate: (self) => {
          tl.progress(self.progress);

          const beat = Math.min(
            Math.floor(self.progress * beats.length),
            beats.length - 1
          );

          if (beat !== lastBeat) {
            lastBeat = beat;
            setActiveBeat(beat);
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [beats]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '500vh' }}
    >
      {/* ── Sticky viewport ───────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── Background layers ───────────────────────────────────── */}
        {beats.map((beat, i) => (
          <div
            key={`bg-${beat.key}`}
            ref={(el) => (bgRefs.current[i] = el)}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0"
              style={{
                background: beat.bgGrad,
              }}
            />

            <div
              className="absolute inset-0"
              style={{
                background: beat.radial,
              }}
            />

            <div
              className="absolute inset-0"
              style={{
                background: beat.overlay,
              }}
            />

            {beat.hasIkat && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundRepeat: 'repeat',
                  backgroundSize  : '260px',
                  opacity         : 0.04,
                  mixBlendMode    : 'overlay',
                }}
              />
            )}
          </div>
        ))}

        {/* ── Image layers ────────────────────────────────────────── */}
        {beats.map((beat, i) => (
          <div
            key={`img-${beat.key}`}
            ref={(el) => (imgRefs.current[i] = el)}
            className="absolute inset-0"
            style={{
              mixBlendMode: 'soft-light',
            }}
          >
            <img
              src={IMAGES[beat.key]}
              alt=""
              role="presentation"
              className="w-full h-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* ── Copy layers ─────────────────────────────────────────── */}
        {beats.map((beat, i) => (
          <div
            key={`copy-${beat.key}`}
            ref={(el) => (copyRefs.current[i] = el)}
            className="absolute inset-0 flex items-end pointer-events-none"
            style={{
              paddingBottom:
                'clamp(64px, 10vh, 112px)',
            }}
          >
            <div className="w-full max-w-[1280px] mx-auto px-6 md:px-10 lg:px-14">

              {/* Time */}
              <p
                className="mb-[10px]"
                style={{
                  fontFamily   : 'Switzer, sans-serif',
                  fontSize     : '11px',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color        : 'rgba(176,141,87,0.82)',
                  fontWeight   : 400,
                  margin       : 0,
                }}
              >
                {beat.time}
              </p>

              {/* Headline */}
              <h2
                style={{
                  fontFamily   : 'Gambarino, Georgia, serif',
                  fontSize     : 'clamp(36px, 5vw, 68px)',
                  lineHeight   : 1.05,
                  letterSpacing: '-0.03em',
                  color        : '#F4F5F2',
                  fontWeight   : 400,
                  margin       : 0,
                }}
              >
                {beat.headline}
              </h2>

              {/* Support */}
              <p
                className="mt-3 md:mt-4"
                style={{
                  fontFamily: 'Switzer, sans-serif',
                  fontSize  : '14px',
                  lineHeight: 1.75,
                  color     : 'rgba(244,245,242,0.58)',
                  fontWeight: 300,
                  maxWidth  : '360px',
                  margin    : 0,
                }}
              >
                {beat.support}
              </p>

            </div>
          </div>
        ))}

        {/* ── Desktop indicator ──────────────────────────────────── */}
        <div
          className="absolute right-10 md:right-14 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-end gap-5"
          aria-hidden="true"
        >
          {beats.map((beat, i) => (
            <div
              key={`ind-${beat.key}`}
              className="flex items-center gap-[10px]"
            >
              <span
                ref={(el) =>
                  (dotLabelRefs.current[i] = el)
                }
                style={{
                  fontFamily   : 'Switzer, sans-serif',
                  fontSize     : '10px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color        : '#F4F5F2',
                  fontWeight   : 400,
                }}
              >
                {beat.time}
              </span>

              <div
                ref={(el) =>
                  (dotRefs.current[i] = el)
                }
                style={{
                  width          : '6px',
                  height         : '6px',
                  borderRadius   : '50%',
                  backgroundColor:
                    'rgba(244,245,242,0.20)',
                  flexShrink: 0,
                }}
              />
            </div>
          ))}
        </div>

        {/* ── Mobile indicator ───────────────────────────────────── */}
        <div
          className="absolute bottom-8 left-6 flex items-center gap-[10px] md:hidden"
          aria-hidden="true"
        >
          {beats.map((_, i) => (
            <div
              key={`mob-dot-${i}`}
              style={{
                width          : '5px',
                height         : '5px',
                borderRadius   : '50%',
                backgroundColor:
                  activeBeat === i
                    ? '#B08D57'
                    : 'rgba(244,245,242,0.24)',
                transition:
                  'background-color 0.4s ease',
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* ── Atmospheric bridge ─────────────────────────────────── */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '100px',
            background:
              'linear-gradient(to bottom, transparent, rgba(244,245,242,0.05) 70%, rgba(244,245,242,0.10) 100%)',
          }}
          aria-hidden="true"
        />

      </div>
    </section>
  );
}


 
function ExperienceMoments() {
  const sectionRef  = useRef(null);
  const morningRef  = useRef(null);
  const middayRef   = useRef(null);
  const eveningRef  = useRef(null);
  const tailRef     = useRef(null);
 
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
    if (reduce) {
      gsap.set(
        [morningRef.current, middayRef.current, eveningRef.current, tailRef.current],
        { opacity: 1, y: 0 }
      );
      return;
    }
 
    const ctx = gsap.context(() => {
      const ease = [0.22, 1, 0.36, 1];
 
      // Morning — enters first, full width, slower
      gsap.fromTo(morningRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.3, ease,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
 
      // Midday + Evening — staggered after morning
      [middayRef.current, eveningRef.current].forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el.querySelectorAll('.anim'),
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: 1.1, stagger: 0.12, ease,
            scrollTrigger: { trigger: el, start: 'top 82%' },
          }
        );
      });
 
      gsap.fromTo(tailRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 1.0, ease,
          scrollTrigger: { trigger: tailRef.current, start: 'top 88%' },
        }
      );
    }, sectionRef);
 
    return () => ctx.revert();
  }, []);
 
  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F4F5F2] overflow-hidden"
      style={{ paddingTop: 'clamp(80px, 11vh, 130px)', paddingBottom: 'clamp(80px, 11vh, 130px)' }}
    >
 
      {/* Bridge in */}
      <div
        className="absolute top-0 inset-x-0 h-[90px] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(45,60,104,0.06), transparent)' }}
        aria-hidden="true"
      />
 
      {/* Grain */}
      <div
        className="absolute inset-[-10%] opacity-[0.03] mix-blend-soft-light pointer-events-none"
        style={{ backgroundImage: "url('https://res.cloudinary.com/dombq6plz/image/upload/v1747227718/noise_t0x7vx.png')" }}
        aria-hidden="true"
      />
 
      <div className="relative w-full max-w-[1280px] mx-auto px-6 md:px-10 lg:px-14">
 
        {/* ── MORNING — full width, dominant ─────────────────────────────
            The most expansive moment of the day gets the most space.
            Full container width. Tall. Bleeds edge to edge of container.
        ──────────────────────────────────────────────────────────────── */}
        <div ref={morningRef} className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 7' }}>
          <img
            src="https://images.unsplash.com/photo-1540202404-a2f29564651e?w=1600&q=80&fit=crop"
            alt=""
            role="presentation"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(24,32,54,0.52), transparent 52%)' }} />
 
          {/* Copy — bottom left */}
          <div className="absolute bottom-0 left-0 p-6 md:p-10">
            <p style={{
              fontFamily: 'Switzer, sans-serif', fontSize: '11px',
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'rgba(176,141,87,0.85)', marginBottom: '10px', fontWeight: 400,
            }}>
              Morning
            </p>
            <h2 style={{
              fontFamily: 'Gambarino, Georgia, serif',
              fontSize: 'clamp(36px, 4.2vw, 62px)',
              lineHeight: 1.0, letterSpacing: '-0.03em',
              color: '#F4F5F2', fontWeight: 400, margin: 0,
            }}>
              Into the water.
            </h2>
            <p style={{
              fontFamily: 'Switzer, sans-serif', fontSize: '13px',
              lineHeight: 1.8, color: 'rgba(244,245,242,0.62)',
              fontWeight: 300, margin: '10px 0 0 0', maxWidth: '32ch',
            }}>
              The sea is coolest before the sun finds it.
            </p>
          </div>
        </div>
 
        {/* ── MIDDAY + EVENING — side by side, below morning ─────────────
            Two moments sharing one row, but not equal:
            Midday 62% (communal, open), Evening 35% (intimate, smaller).
            Gap between them is intentional whitespace.
        ──────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mt-4 md:mt-6">
 
          {/* MIDDAY — 62% width, medium height */}
          <div ref={middayRef} className="md:col-span-7 flex flex-col gap-5">
            <div className="anim relative w-full overflow-hidden" style={{ aspectRatio: '16 / 10' }}>
              <img
                src="https://images.unsplash.com/photo-1566847438217-76e02a251ce2?w=1200&q=80&fit=crop"
                alt=""
                role="presentation"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: 'rgba(45,60,104,0.06)' }} />
            </div>
            {/* Copy sits BELOW image — not inside */}
            <div className="anim">
              <p style={{
                fontFamily: 'Switzer, sans-serif', fontSize: '11px',
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: 'rgba(176,141,87,0.70)', marginBottom: '10px', fontWeight: 400,
              }}>
                Midday
              </p>
              <h2 style={{
                fontFamily: 'Gambarino, Georgia, serif',
                fontSize: 'clamp(32px, 3.8vw, 56px)',
                lineHeight: 1.0, letterSpacing: '-0.03em',
                color: '#2D3C68', fontWeight: 400, margin: 0,
              }}>
                Back on deck.
              </h2>
              <p style={{
                fontFamily: 'Switzer, sans-serif', fontSize: '13px',
                lineHeight: 1.8, color: 'rgba(45,60,104,0.55)',
                fontWeight: 300, margin: '10px 0 0 0', maxWidth: '36ch',
              }}>
                Lunch when it arrives. Conversation when it starts.
              </p>
            </div>
          </div>
 
          {/* EVENING — 35% width, shorter — most intimate */}
          {/* Offset down to break horizontal alignment with midday */}
          <div
            ref={eveningRef}
            className="md:col-span-4 md:col-start-9 flex flex-col gap-5 md:mt-[10%]"
          >
            <div className="anim relative w-full overflow-hidden" style={{ aspectRatio: '3 / 4' }}>
              <img
                src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80&fit=crop"
                alt=""
                role="presentation"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: 'rgba(45,60,104,0.08)' }} />
            </div>
            <div className="anim">
              <p style={{
                fontFamily: 'Switzer, sans-serif', fontSize: '11px',
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: 'rgba(176,141,87,0.70)', marginBottom: '10px', fontWeight: 400,
              }}>
                Evening
              </p>
              <h2 style={{
                fontFamily: 'Gambarino, Georgia, serif',
                fontSize: 'clamp(28px, 3.0vw, 44px)',
                lineHeight: 1.0, letterSpacing: '-0.03em',
                color: '#2D3C68', fontWeight: 400, margin: 0,
              }}>
                The light changes.
              </h2>
              <p style={{
                fontFamily: 'Switzer, sans-serif', fontSize: '13px',
                lineHeight: 1.8, color: 'rgba(45,60,104,0.55)',
                fontWeight: 300, margin: '10px 0 0 0', maxWidth: '28ch',
              }}>
                A line in the water. A cold drink. The horizon.
              </p>
            </div>
          </div>
 
        </div>
 
        {/* ── Tail ───────────────────────────────────────────────────── */}
        <div
          ref={tailRef}
          className="flex items-start gap-7 mt-16 md:mt-20 pt-10 md:pt-12"
          style={{ borderTop: '1px solid rgba(176,141,87,0.16)' }}
        >
          <div
            className="hidden md:block shrink-0 w-px self-stretch"
            style={{ background: 'rgba(176,141,87,0.28)' }}
            aria-hidden="true"
          />
          <p style={{
            fontFamily: 'Gambarino, Georgia, serif',
            fontSize: 'clamp(20px, 2.5vw, 36px)',
            lineHeight: 1.18, letterSpacing: '-0.025em',
            color: '#2D3C68', fontWeight: 400,
            maxWidth: '28ch', margin: 0,
          }}>
            the day moves between water, people,
            and stillness — without ever needing
            a fixed sequence
          </p>
        </div>
 
      </div>
 
      {/* Bridge out */}
      <div
        className="absolute bottom-0 inset-x-0 h-[80px] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(45,60,104,0.04))' }}
        aria-hidden="true"
      />
 
    </section>
  );
}

function ExperienceDayOnBoard() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const carouselWrapRef = useRef(null);
  const emblaRootRef = useRef(null);

  const shouldReduceMotion = useReducedMotion();

  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const moments = [
    {
      id: "dawn",
      time: "Morning",
      label: "Before the day has a plan.",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1775031029/ChatGPT_Image_Apr_1_2026_03_07_35_PM_ci1xyi.png",
      alt: "Quiet morning atmosphere aboard Serenity",
      position: "40% 30%",
    },
    {
      id: "water",
      time: "Midday",
      label: "Into the reef.",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776152590/Phinisi_yacht_and_vibrant_coral_reef_1_i59pqn.png",
      alt: "Reef and water experience during a Serenity voyage",
      position: "50% 60%",
    },
    {
      id: "meal",
      time: "Afternoon",
      label: "Lunch finds you on deck.",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776157584/Golden_hour_on_the_phinisi_yacht_1_h8pycj.png",
      alt: "Afternoon meal and deck life aboard Serenity",
      position: "50% 40%",
    },
    {
      id: "pause",
      time: "Late Afternoon",
      label: "The hours that don't need filling.",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776869887/ChatGPT_Image_Apr_22_2026_09_57_35_PM_1_vwbdwb.png",
      alt: "Slow late afternoon aboard Serenity",
      position: "50% 50%",
    },
    {
      id: "dusk",
      time: "Evening",
      label: "The day settles without announcement.",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1777295006/ChatGPT_Image_Apr_27_2026_07_59_16_PM_mp6lli.png",
      alt: "Evening atmosphere aboard Serenity",
      position: "50% 70%",
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: false,
    containScroll: "trimSnaps",
    duration: 32,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onReInit = useCallback(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollNext = () => {
    if (!emblaApi) return;

    emblaApi.scrollNext();
    setHasInteracted(true);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const handlePointerDown = () => {
      setHasInteracted(true);
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onReInit);
    emblaApi.on("pointerDown", handlePointerDown);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onReInit);
      emblaApi.off("pointerDown", handlePointerDown);
    };
  }, [emblaApi, onSelect, onReInit]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const headerNodes =
      headerRef.current?.querySelectorAll(".day-header-reveal") ?? [];

    const carouselNodes = carouselWrapRef.current
      ? [carouselWrapRef.current]
      : [];

    const cardNodes =
      emblaRootRef.current?.querySelectorAll(".day-card-reveal") ?? [];

    const allNodes = [
      ...headerNodes,
      ...carouselNodes,
      ...cardNodes,
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
          if (headerNodes.length > 0) {
            gsap.fromTo(
              headerNodes,
              {
                opacity: 0,
                y: mobile ? 16 : 20,
                filter: "blur(5px)",
              },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.98,
                stagger: 0.075,
                ease: serenityEase,
                scrollTrigger: {
                  trigger: headerRef.current,
                  start: mobile ? "top 84%" : "top 80%",
                  once: true,
                },
              }
            );
          }

          if (carouselWrapRef.current) {
            gsap.fromTo(
              carouselWrapRef.current,
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
                  trigger: carouselWrapRef.current,
                  start: mobile ? "top 84%" : "top 80%",
                  once: true,
                },
              }
            );
          }

          if (cardNodes.length > 0) {
            gsap.fromTo(
              cardNodes,
              {
                opacity: 0,
                y: mobile ? 14 : 18,
                filter: "blur(4px)",
              },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.92,
                stagger: mobile ? 0.04 : 0.055,
                ease: serenityEase,
                scrollTrigger: {
                  trigger: emblaRootRef.current,
                  start: mobile ? "top 86%" : "top 82%",
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
      aria-labelledby="experience-day-title"
      className="
        relative
        overflow-hidden
        bg-[#F4F5F2]
        pb-[56px]
        pt-[82px]
        text-[#2D3C68]
        md:pb-[72px]
        md:pt-[120px]
      "
      style={{
        backgroundColor: "#F4F5F2",
        colorScheme: "light",
      }}
    >
      {/* Bridge in from dark Hero */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-[126px]
          md:h-[154px]
        "
        style={{
          background:
            "linear-gradient(to bottom, rgba(45,60,104,0.105) 0%, rgba(45,60,104,0.045) 48%, rgba(45,60,104,0) 100%)",
        }}
      />

      {/* Soft sail-white depth */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(circle at 35% 42%, rgba(255,255,255,0.52), transparent 54%)",
        }}
      />

      {/* Localized Sumba Ikat — cultural texture, not wallpaper */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-18%]
          top-[8%]
          hidden
          h-[520px]
          w-[min(760px,64vw)]
          rotate-[3deg]
          opacity-[0.04]
          mix-blend-overlay
          md:block
        "
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dombq6plz/image/upload/v1778486588/ChatGPT_Image_May_11_2026_03_01_56_PM_1_v2exmt.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "310px auto",
          backgroundPosition: "center",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.42) 50%, rgba(0,0,0,0) 78%)",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.42) 50%, rgba(0,0,0,0) 78%)",
        }}
      />

      {/* Mobile texture */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-[6%]
          h-[360px]
          opacity-[0.026]
          mix-blend-overlay
          md:hidden
        "
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dombq6plz/image/upload/v1778486588/ChatGPT_Image_May_11_2026_03_01_56_PM_1_v2exmt.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "250px auto",
          backgroundPosition: "center",
          WebkitMaskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.24) 62%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.24) 62%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Grain */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-[-10%]
          opacity-[0.026]
          mix-blend-soft-light
        "
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dombq6plz/image/upload/v1747227718/noise_t0x7vx.png')",
        }}
      />

      {/* Header */}
      <div
        ref={headerRef}
        className="
          relative
          z-10
          mx-auto
          mb-[44px]
          max-w-[1280px]
          px-6
          md:mb-[68px]
          md:px-10
          lg:px-14
        "
      >
        <p
          className="
            day-header-reveal
            text-[10px]
            uppercase
            tracking-[0.34em]
            text-[#2D3C68]/42
            md:text-[11px]
          "
        >
          Life on Board
        </p>

        <div
          className="
            day-header-reveal
            mt-5
            h-px
            w-10
            bg-[#B08D57]/62
          "
        />

        <h2
          id="experience-day-title"
          className="
            day-header-reveal
            mt-6
            max-w-[16ch]
            font-[Gambarino]
            text-[38px]
            leading-[1.04]
            tracking-[-0.04em]
            text-[#2D3C68]
            sm:text-[46px]
            md:text-[clamp(52px,4.4vw,62px)]
          "
        >
          A day on board
          <br />
          finds its own shape.
        </h2>

        <p
          className="
            day-header-reveal
            mt-7
            max-w-[58ch]
            text-[14px]
            leading-[1.9]
            text-[#2D3C68]/64
            md:text-[15px]
          "
        >
          Some guests slip into the water before breakfast. Others stay
          barefoot on deck while the crew shapes the day around the weather,
          the anchorage, and the mood on board.
        </p>
      </div>

      {/* Carousel */}
      <div
        ref={carouselWrapRef}
        className="
          relative
          z-10
        "
        role="region"
        aria-label="Moments through a day on board Serenity"
      >
        <div
          ref={emblaRef}
          className="
            overflow-hidden
            touch-pan-y
            select-none
            cursor-grab
            active:cursor-grabbing
          "
        >
          <div
            ref={emblaRootRef}
            className="
              flex
              gap-4
              px-6
              md:gap-5
              md:px-10
              lg:px-14
            "
          >
            {moments.map((moment, index) => (
              <article
                key={moment.id}
                className="
                  day-card-reveal
                  min-w-0
                  flex-[0_0_82vw]
                  sm:flex-[0_0_62vw]
                  md:flex-[0_0_340px]
                  lg:flex-[0_0_360px]
                "
              >
                <div
                  className="
                    relative
                    h-[clamp(360px,44vh,480px)]
                    overflow-hidden
                    bg-[#2D3C68]/[0.045]
                  "
                >
                  <img
                    src={moment.image}
                    alt={moment.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    draggable="false"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      h-full
                      w-full
                      scale-[1.015]
                      object-cover
                    "
                    style={{
                      objectPosition: moment.position,
                    }}
                  />

                  {/* Gradient depth */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                    "
                    style={{
                      background:
                        "linear-gradient(to top, rgba(12,18,32,0.82) 0%, rgba(12,18,32,0.24) 44%, rgba(12,18,32,0) 72%)",
                    }}
                  />

                  {/* Warm film */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                    "
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 18%, rgba(176,141,87,0.065), transparent 56%)",
                    }}
                  />

                  {/* Unified blue discipline */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-[#2D3C68]/[0.035]
                    "
                  />

                  {/* Edge discipline */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      ring-1
                      ring-inset
                      ring-[#F4F5F2]/[0.035]
                    "
                  />

                  {/* Copy */}
                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      right-0
                      px-5
                      pb-5
                      md:px-6
                      md:pb-6
                    "
                  >
                    <span
                      className="
                        block
                        text-[10px]
                        uppercase
                        tracking-[0.28em]
                        text-[#B08D57]/85
                      "
                    >
                      {moment.time}
                    </span>

                    <p
                      className="
                        mt-2
                        max-w-[18ch]
                        font-[Gambarino]
                        text-[20px]
                        leading-[1.15]
                        tracking-[-0.025em]
                        text-[#F4F5F2]
                        md:text-[22px]
                      "
                    >
                      {moment.label}
                    </p>
                  </div>
                </div>
              </article>
            ))}

            <div
              aria-hidden="true"
              className="
                flex-[0_0_24px]
                md:flex-[0_0_44px]
              "
            />
          </div>
        </div>

        {/* Dot indicators */}
        <div
          className="
            mt-7
            flex
            items-center
            justify-center
            gap-1
          "
        >
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                emblaApi?.scrollTo(index);
                setHasInteracted(true);
              }}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selectedIndex ? "true" : undefined}
              className="
                group
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
                  h-[2px]
                  transition-all
                  duration-500
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${
                    index === selectedIndex
                      ? "w-6 bg-[#B08D57]"
                      : "w-2 bg-[#2D3C68]/18 group-hover:bg-[#2D3C68]/34"
                  }
                `}
              />
            </button>
          ))}
        </div>

        {/* Mobile scroll hint */}
        {isMobile && !hasInteracted && selectedIndex < scrollSnaps.length - 1 && (
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next slide"
            className="
              absolute
              right-3
              top-[43%]
              z-20
              flex
              h-10
              w-10
              -translate-y-1/2
              items-center
              justify-center
              bg-[#F4F5F2]/62
              text-[#2D3C68]
              opacity-80
              backdrop-blur-md
              transition
              duration-300
              hover:opacity-100
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#B08D57]
              md:hidden
            "
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                strokeWidth="1.45"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Compressed seam into Activities */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-[42px]
          md:h-[56px]
        "
        style={{
          background:
            "linear-gradient(to bottom, rgba(244,245,242,0) 0%, rgba(45,60,104,0.018) 78%, rgba(45,60,104,0.03) 100%)",
        }}
      />
    </section>
  );
}







function SplitHorizon() {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const leftImgRef = useRef(null);
  const rightImgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(leftRef.current, {
        x: -70,
        opacity: 0,
        duration: 1.05,
      });

      tl.from(
        rightRef.current,
        {
          x: 70,
          opacity: 0,
          duration: 1.05,
        },
        "-=0.75"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      const progress = rect.top / windowH;

      const leftY = progress * -6;
      const rightY = progress * 5;

      if (leftImgRef.current) {
        leftImgRef.current.style.transform = `translateY(${leftY}px) scale(1.1)`;
      }

      if (rightImgRef.current) {
        rightImgRef.current.style.transform = `translateY(${rightY}px) scale(1.1)`;
      }
    };

    const onScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        handleScroll();
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full h-[50vh] min-h-[640px] bg-[#F4F5F2] overflow-hidden"
    >
      <div className="relative w-full h-full">

        {/* LEFT */}
        <div
          ref={leftRef}
          className="absolute inset-0"
          style={{
            clipPath: "polygon(0 0, 57% 0, 43% 100%, 0% 100%)",
          }}
        >
          <img
            ref={leftImgRef}
            src="https://res.cloudinary.com/dombq6plz/image/upload/v1777972099/ChatGPT_Image_May_5_2026_04_05_34_PM_mmnxdv.png"
            className="w-full h-full object-cover will-change-transform"
            style={{
              transform: "scale(1.1)",
              objectPosition: "center center",
              filter: "contrast(1.08) brightness(0.94)", // 🔥 depth fix
            }}
          />

          {/* lebih subtle */}
          <div className="absolute inset-0 bg-[#2D3C68]/22 mix-blend-multiply" />
        </div>

        {/* RIGHT */}
        <div
          ref={rightRef}
          className="absolute inset-0"
          style={{
            clipPath: "polygon(57% 0, 100% 0, 100% 100%, 43% 100%)",
          }}
        >
          <img
            ref={rightImgRef}
            src="https://res.cloudinary.com/dombq6plz/image/upload/v1777972099/ChatGPT_Image_May_5_2026_04_05_34_PM_mmnxdv.png"
            className="w-full h-full object-cover will-change-transform"
            style={{
              transform: "scale(1.1)",
              objectPosition: "82% center",
              filter: "contrast(1.08) brightness(0.94)", // 🔥 depth fix
            }}
          />

          {/* lebih balance */}
          <div className="absolute inset-0 bg-[#2D3C68]/22 mix-blend-multiply" />
        </div>

        {/* GLOBAL DEPTH */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-b from-transparent via-transparent to-[#2D3C68]/10" />
        </div>

      </div>
    </section>
  );
}


function SampleJourney() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(itemsRef.current, {
        x: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = 400;
    el.scrollBy({
      left: dir === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  const moments = [
    {
      text: "you might start the morning with coffee on deck",
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
      width: "w-[320px]",
    },
    {
      text: "you could find yourself watching the chef cook nearby",
      image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
      width: "w-[260px]",
    },
    {
      text: "lunch might be served fresh after coming out of the water",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      width: "w-[340px]",
    },
    {
      text: "the crew prepares everything before the next dive",
      image: "https://images.pexels.com/photos/37530/divers-scuba-divers-underwater-people-37530.jpeg",
      width: "w-[280px]",
    },
    {
      text: "you might dry off on deck while the boat drifts",
      image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg",
      width: "w-[300px]",
    },
    {
      text: "sunlight might hit the water as everything slows down",
      image: "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg",
      width: "w-[320px]",
    },
    {
      text: "dinner and drinks might take over as the day ends",
      image: "https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg",
      width: "w-[360px]",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#F4F5F2] py-[120px] px-6"
    >
      <div className="max-w-[1200px] mx-auto">

        {/* ================= HEADER ================= */}
        <div className="flex items-end justify-between mb-[60px]">

          <h2 className="font-[Gambarino] text-[36px] md:text-[52px] text-[#2D3C68] leading-[1.1] max-w-[520px]">
            what your days could look like
          </h2>

          {/* CONTROLS */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll("prev")}
              className="w-[40px] h-[40px] border border-[#2D3C68]/30 flex items-center justify-center hover:bg-[#2D3C68]/10 transition"
            >
              ←
            </button>
            <button
              onClick={() => scroll("next")}
              className="w-[40px] h-[40px] border border-[#2D3C68]/30 flex items-center justify-center hover:bg-[#2D3C68]/10 transition"
            >
              →
            </button>
          </div>

        </div>

        {/* ================= STRIP ================= */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pr-0"
        >

          {moments.map((item, i) => (
            <div
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
              className={`${item.width} flex-shrink-0`}
            >

              {/* IMAGE */}
              <div className="w-full aspect-[4/5] overflow-hidden mb-4">
                <img
                  src={item.image}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* TEXT */}
              <p className="text-[15px] leading-[1.5] text-[#2A2A2A]">
                {item.text}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}


function RatesBridge() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-[#F4F5F2] py-[200px] px-6">
      <div
        ref={containerRef}
        className="max-w-[720px] mx-auto text-center"
      >

        {/* HEADLINE */}
        <h2 className="font-[Gambarino] text-[40px] md:text-[56px] leading-[1.1] text-[#2D3C68]">
          Each journey takes a different shape
        </h2>

        {/* SUBTEXT */}
        <p className="mt-6 text-[16px] text-[#2A2A2A] leading-[1.7]">
          Routes, duration, and pricing depend on how you choose to experience it.
        </p>

        {/* CTA */}
        <div className="mt-[50px]">
          <TransitionLink
            href="/rates-and-schedule"
            className="inline-block text-[12px] tracking-[0.35em] uppercase text-[#2D3C68] border-b border-[#2D3C68] pb-2 hover:opacity-60 transition"
          >
            View Rates & Schedules
          </TransitionLink>
        </div>

      </div>
    </section>
  );
}




function ExperienceSelection() {
  return (
    <section className="relative w-full bg-[#F4F5F2] py-[200px] px-6 overflow-hidden">

      <div className="max-w-[1300px] mx-auto">

        {/* ================= HEADER ================= */}
        <div className="max-w-[620px] mb-20">
          <p className="text-[11px] tracking-[0.35em] text-[#6A6A6A] uppercase">
            Experiences
          </p>

          <h2 className="mt-6 font-[Gambarino] text-[42px] md:text-[60px] leading-[1.05] text-[#2D3C68]">
            Choose how you want to experience it
          </h2>
        </div>

        {/* ================= LAYOUT ================= */}
        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* ================= BIG — ISLAND EXPLORATION ================= */}
          <div className="relative w-full aspect-[4/5] overflow-hidden group cursor-pointer">

            <img
              src="https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=1600&auto=format&fit=crop"
              alt="Island exploration"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.06]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#2D3C68]/60 to-transparent" />

            <div className="absolute bottom-0 left-0 p-8">

              <h3 className="font-[Gambarino] text-[30px] md:text-[40px] text-white">
                Island Exploration
              </h3>

              <p className="mt-3 text-[14px] text-white/80 max-w-[320px]">
                Move between islands, beaches, and viewpoints. Best suited for Komodo and surrounding areas.
              </p>

            </div>

          </div>

          {/* ================= RIGHT STACK ================= */}
          <div className="flex flex-col gap-10">

            {/* ================= DIVING JOURNEY ================= */}
            <div className="relative w-full aspect-[4/5] overflow-hidden group cursor-pointer">

              <img
                src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1600&auto=format&fit=crop"
                alt="Diving journey"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.06]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#2D3C68]/60 to-transparent" />

              <div className="absolute bottom-0 left-0 p-8">

                <h3 className="font-[Gambarino] text-[28px] md:text-[36px] text-white">
                  Diving Journey
                </h3>

                <p className="mt-3 text-[14px] text-white/80 max-w-[320px]">
                  Spend more time in the water, with routes built around dive sites. Ideal for Raja Ampat.
                </p>

              </div>

            </div>

            {/* ================= FLEXIBLE ROUTE ================= */}
            <div className="relative w-full aspect-[4/5] overflow-hidden group cursor-pointer bg-[#2D3C68] flex items-end">

              <div className="p-8">

                <h3 className="font-[Gambarino] text-[28px] md:text-[36px] text-white">
                  Flexible Route
                </h3>

                <p className="mt-3 text-[14px] text-white/80 max-w-[320px]">
                  Combine destinations and adjust the pace as you go. Built entirely around your preferences.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

function  Activities() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef(null);

  // breakpoint check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // visibility (single calm reveal)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // embla state
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("pointerDown", () => setHasInteracted(true));

  }, [emblaApi, onSelect]);

  const scrollNext = () => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    setHasInteracted(true);
  };

  const MOMENTS = [
    {
      id: "dawn",
      time: "morning",
      label: "On deck before everyone wakes up",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1775031029/ChatGPT_Image_Apr_1_2026_03_07_35_PM_ci1xyi.png",
      position: "40% 30%",
    },
    {
      id: "water",
      time: "midday",
      label: "Snorkeling in clear water",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776152590/Phinisi_yacht_and_vibrant_coral_reef_1_i59pqn.png",
      position: "50% 60%",
    },
    {
      id: "meal",
      time: "afternoon",
      label: "Lunch together on deck",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776157584/Golden_hour_on_the_phinisi_yacht_1_h8pycj.png",
      position: "50% 40%",
    },
    {
      id: "pause",
      time: "late afternoon",
      label: "Quiet pause between moments",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776869887/ChatGPT_Image_Apr_22_2026_09_57_35_PM_1_vwbdwb.png",
      position: "50% 50%",
    },
    {
      id: "dusk",
      time: "evening",
      label: "As the sun sets over the sea",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1777295006/ChatGPT_Image_Apr_27_2026_07_59_16_PM_mp6lli.png",
      position: "50% 70%",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F4F5F2] py-[80px] md:py-[120px]"
    >

      {/* HEADER */}
      <div className="px-6 md:px-[clamp(32px,6vw,96px)] mb-10 md:mb-20">
        <p className="text-[11px] tracking-[0.3em] text-[#6A6A6A] uppercase mb-4">
          A day on board
        </p>

        <h2 className="font-[Gambarino] text-[clamp(34px,8vw,64px)] leading-[1.05] text-[#2D3C68] max-w-[520px]">
          No schedule. Just flow.
        </h2>
      </div>

      {/* CAROUSEL */}
      <div
        className={`transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 px-6 md:px-[clamp(32px,6vw,96px)]">

            {MOMENTS.map((m) => (
              <div
                key={m.id}
                className="flex-shrink-0 w-[82vw] md:w-[320px]"
              >
                <div className="relative h-[380px] md:h-[420px] overflow-hidden rounded-[4px]">

                  {/* IMAGE */}
                  <img
                    src={m.image}
                    alt={m.label}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: m.position }}
                  />

                  {/* SIMPLE CINEMATIC DEPTH */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* TEXT */}
                  <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
                    <span className="block text-[10px] tracking-[0.28em] text-white/60 uppercase mb-2">
                      {m.time}
                    </span>

                    <p className="font-[Gambarino] text-[18px] md:text-[20px] text-white leading-[1.25]">
                      {m.label}
                    </p>
                  </div>

                </div>
              </div>
            ))}

            <div className="flex-shrink-0 w-[24px]" />
          </div>
        </div>

        {/* DOTS */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi && emblaApi.scrollTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === selectedIndex
                  ? "w-5 h-[2px] bg-[#2D3C68]"
                  : "w-2 h-[2px] bg-[#2D3C68]/30"
              }`}
            />
          ))}
        </div>

        {/* SCROLL HINT */}
        {isMobile && !hasInteracted && selectedIndex < scrollSnaps.length - 1 && (
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-[40px] h-[40px] flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-full"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6L15 12L9 18"
                stroke="#2D3C68"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

      </div>

      {/* CTA */}
      <div
        className={`mt-10 flex justify-center transition-all duration-[900ms] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <button className="text-[13px] text-[#2D3C68] border-b border-[#2D3C68]/40 pb-1">
          Explore full experience
        </button>
      </div>

    </section>
  );
}


function JourneyLens() {
  return (
    <section className="w-full bg-[#F4F5F2] py-[20px] px-6">

      <div className="max-w-[1100px] mx-auto">
 

        {/* GRID */}
        <div className="grid md:grid-cols-3 border-t border-[#2D3C68]/20">

          {/* ================= COLUMN 1 ================= */}
          <div className="relative pt-12 pr-6 border-r border-[#2D3C68]/20">

            {/* TOP STRIP */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-[#2D3C68]/40" />

            <h3 className="font-[Gambarino] text-[30px] text-[#2D3C68]">
              Island Exploration
            </h3>

            <div className="mt-8 space-y-5">
              {[
                "Move between multiple islands",
                "Frequent stops at beaches",
                "More active pace",
                "Split time: land and sea",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-[18px] h-[1px] bg-[#2D3C68]/40 mt-[10px]" />
                  <p className="text-[15px] text-[#2A2A2A] leading-[1.7]">
                    {item}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* ================= COLUMN 2 (FOCUS) ================= */}
          <div className="relative pt-12 px-6 border-r border-[#2D3C68]/20 bg-[#2D3C68]/[0.03]">

            {/* TOP STRIP STRONGER */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-[#2D3C68]" />

            <h3 className="font-[Gambarino] text-[30px] text-[#2D3C68]">
              Diving Journey
            </h3>

            <div className="mt-8 space-y-5">
              {[
                "Days centered on dive sites",
                "Fewer locations, longer stays",
                "More time in the water",
                "Slower transitions between activities",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-[22px] h-[1px] bg-[#2D3C68] mt-[10px]" />
                  <p className="text-[15px] text-[#2A2A2A] leading-[1.7]">
                    {item}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* ================= COLUMN 3 ================= */}
          <div className="relative pt-12 pl-6">

            {/* TOP STRIP */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-[#2D3C68]/40" />

            <h3 className="font-[Gambarino] text-[30px] text-[#2D3C68]">
              Flexible Route
            </h3>

            <div className="mt-8 space-y-5">
              {[
                "Route adjusts as you go",
                "Mix of destinations and activities",
                "Pace depends on your preference",
                "No fixed structure",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-[18px] h-[1px] bg-[#2D3C68]/40 mt-[10px]" />
                  <p className="text-[15px] text-[#2A2A2A] leading-[1.7]">
                    {item}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

function ExperienceFlow2() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=5000",
          scrub: true,
          pin: true,
        },
      })

      // ================= SCENE 1 → 2 =================
      tl.to(".scene-1", {
        clipPath: "circle(0% at 50% 50%)",
        ease: "power2.inOut",
        duration: 1,
      })

      tl.fromTo(".scene-2",
        { clipPath: "circle(0% at 50% 50%)" },
        {
          clipPath: "circle(150% at 50% 50%)",
          ease: "power2.inOut",
          duration: 1,
        },
        "<"
      )

      tl.to(".scene-1 img", { scale: 1.15, duration: 1 }, "<")
      tl.fromTo(".scene-2 img", { scale: 1.2 }, { scale: 1, duration: 1 }, "<")

      // ================= SCENE 2 → 3 =================
      tl.to(".scene-2", {
        clipPath: "circle(0% at 50% 50%)",
        ease: "power2.inOut",
        duration: 1,
      })

      tl.fromTo(".scene-3",
        { clipPath: "circle(0% at 50% 50%)" },
        {
          clipPath: "circle(150% at 50% 50%)",
          ease: "power2.inOut",
          duration: 1,
        },
        "<"
      )

      tl.to(".scene-2 img", { scale: 1.15, duration: 1 }, "<")
      tl.fromTo(".scene-3 img", { scale: 1.2 }, { scale: 1, duration: 1 }, "<")

      // ================= SCENE 3 → 4 =================
      tl.to(".scene-3", {
        clipPath: "circle(0% at 50% 50%)",
        ease: "power2.inOut",
        duration: 1,
      })

      tl.fromTo(".scene-4",
        { clipPath: "circle(0% at 50% 50%)" },
        {
          clipPath: "circle(150% at 50% 50%)",
          ease: "power2.inOut",
          duration: 1,
        },
        "<"
      )

      tl.to(".scene-3 img", { scale: 1.15, duration: 1 }, "<")
      tl.fromTo(".scene-4 img", { scale: 1.2 }, { scale: 1, duration: 1 }, "<")

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >

      {/* ================= SCENE 1 ================= */}
      <div className="scene-1 absolute inset-0 z-[1] [clip-path:circle(150%_at_50%_50%)]">

        <img
          src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2000&auto=format&fit=crop"
          className="w-full h-full object-cover will-change-transform"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute left-[8%] bottom-[12%] max-w-[420px] text-white">
          <h2 className="font-[Gambarino] text-[42px] leading-[1.1]">
            You step onto the deck
          </h2>
        </div>
      </div>

      {/* ================= SCENE 2 ================= */}
      <div className="scene-2 absolute inset-0 z-[2] [clip-path:circle(0%_at_50%_50%)]">

        <img
          src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2000&auto=format&fit=crop"
          className="w-full h-full object-cover will-change-transform"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute right-[8%] bottom-[18%] max-w-[420px] text-white text-right">
          <h2 className="font-[Gambarino] text-[42px] leading-[1.1]">
            The water pulls you in
          </h2>
        </div>
      </div>

      {/* ================= SCENE 3 ================= */}
      <div className="scene-3 absolute inset-0 z-[3] [clip-path:circle(0%_at_50%_50%)]">

        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
          className="w-full h-full object-cover will-change-transform"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute left-[10%] top-[18%] max-w-[420px] text-white">
          <h2 className="font-[Gambarino] text-[42px] leading-[1.1]">
            Time slows down here
          </h2>
        </div>
      </div>

      {/* ================= SCENE 4 ================= */}
      <div className="scene-4 absolute inset-0 z-[4] [clip-path:circle(0%_at_50%_50%)]">

        <img
          src="https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=2000&auto=format&fit=crop"
          className="w-full h-full object-cover will-change-transform"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute right-[10%] bottom-[15%] max-w-[420px] text-white text-right">
          <h2 className="font-[Gambarino] text-[42px] leading-[1.1]">
            The day fades quietly
          </h2>
        </div>
      </div>

    </section>
  )
}

function WhatsIncluded() {
  const [active, setActive] = useState("crew")

  const DATA = useMemo(() => ({
    crew: {
      title: "Crew",
      desc: [
        "Captain and full crew handling navigation and operations",
        "On-board chef preparing meals throughout the day",
        "Service crew supporting daily activities and requests",
      ],
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1600&auto=format&fit=crop",
      align: "left",
    },
    food: {
      title: "Food",
      desc: [
        "Fresh meals prepared daily on board",
        "Flexible meal timing, no fixed schedule",
        "Local ingredients adapted to your preference",
      ],
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop",
      align: "right",
    },
    activities: {
      title: "Activities",
      desc: [
        "Snorkeling equipment available on board",
        "Diving setup depending on route",
        "Island visits and beach stops",
      ],
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
      align: "left",
    },
    space: {
      title: "Space",
      desc: [
        "Private cabins with ensuite bathrooms",
        "Open deck for shared time and movement",
        "Indoor spaces for rest and quiet",
      ],
      img: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=1600&auto=format&fit=crop",
      align: "right",
    },
  }), [])

  const current = DATA[active]

  return (
    <section className="w-full bg-[#F4F5F2] py-[120px] md:py-[160px] overflow-hidden">

      <div className="max-w-[1400px] mx-auto px-6">

        {/* HEADER (CENTERED PROPERLY) */}
        <div className="mb-20 max-w-[720px] mx-auto text-center">
          <h2 className="font-[Gambarino] text-[40px] md:text-[64px] text-[#2D3C68] leading-[1.05]">
            What’s included on board
          </h2>
        </div>

        {/* CONTROL (CENTERED WITH STRUCTURE) */}
        <div className="flex justify-center mb-20">
          <div className="relative flex flex-wrap justify-center gap-8 md:gap-12 border-b border-[#2D3C68]/20 pb-6">

            {Object.keys(DATA).map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`relative text-[13px] md:text-[14px] tracking-[0.18em] uppercase transition-all duration-300 pb-2
                  ${active === key
                    ? "text-[#2D3C68]"
                    : "text-[#2D3C68]/40 hover:text-[#2D3C68]/70"
                  }`}
              >
                {DATA[key].title}

                {active === key && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute left-0 -bottom-[6px] h-[2px] w-full bg-[#2D3C68]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}

          </div>
        </div>

        {/* SCENE */}
        <div className="relative">

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid md:grid-cols-2 gap-16 items-center"
            >

              {/* IMAGE */}
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6 }}
                className={`w-full ${
                  current.align === "right" ? "md:order-2" : ""
                }`}
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

                  <img
                    src={current.img}
                    alt={current.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

                </div>
              </motion.div>

              {/* TEXT */}
              <motion.div
                initial={{ opacity: 0, x: current.align === "right" ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: current.align === "right" ? -20 : 20 }}
                transition={{ duration: 0.5 }}
                className={`max-w-[520px] ${
                  current.align === "right" ? "md:order-1" : ""
                }`}
              >

                <h3 className="font-[Gambarino] text-[34px] md:text-[38px] text-[#2D3C68] leading-[1.2]">
                  {current.title}
                </h3>

                <div className="mt-6 space-y-5 text-[16px] md:text-[17px] text-[#2A2A2A] leading-[1.8]">
                  {current.desc.map((item, i) => (
                    <p key={i}>{item}</p>
                  ))}
                </div>

              </motion.div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>

    </section>
  )
}
 

function RateAnchor() {
  return (
    <section className="w-full bg-[#F4F5F2] py-[200px] px-6">

      <div className="max-w-[1100px] mx-auto">

        {/* ================= MAIN GRID ================= */}
        <div className="grid md:grid-cols-2 gap-24 items-center">

          {/* ================= LEFT — PRICE ================= */}
          <div>

            <div className="text-[14px] tracking-[0.3em] text-[#2D3C68]/50 mb-6">
              RATES
            </div>

            <div className="font-[Gambarino] text-[56px] md:text-[72px] text-[#2D3C68] leading-[1.05]">
              From $4,800
            </div>

            <div className="mt-2 text-[14px] text-[#2D3C68]/60">
              per night · full yacht
            </div>

          </div>

          {/* ================= RIGHT — CONTEXT ================= */}
          <div className="max-w-[420px]">

            <p className="text-[17px] text-[#2A2A2A] leading-[1.8]">
              Pricing depends on duration, route, and time of year.
              Each journey is arranged individually, based on how you choose to move and spend your time on board.
            </p>

            {/* CTA */}
            <div className="mt-10">
              <TransitionLink
                href="/rates-and-schedule"
                className="text-[13px] tracking-[0.18em] uppercase text-[#2D3C68] border-b border-[#2D3C68]/30 hover:border-[#2D3C68] transition"
              >
                View full rates →
              </TransitionLink>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

function FinalClosing() {
  const sectionRef = useRef(null);

  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const dividerRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (DISABLE_ANIMATION || reduce) {
        gsap.set(
          [
            headlineRef.current,
            subtextRef.current,
            dividerRef.current,
            ctaRef.current,
          ],
          {
            opacity: 1,
            y: 0,
            clearProps: "transform",
          }
        );

        return;
      }

      // =====================================================
      // HEADLINE
      // =====================================================

      gsap.fromTo(
        headlineRef.current,
        {
          opacity: 0,
          y: 26,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        }
      );

      // =====================================================
      // SUBTEXT
      // =====================================================

      gsap.fromTo(
        subtextRef.current,
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 0.7,
          y: 0,
          duration: 1.1,
          ease: "power2.out",
          delay: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // =====================================================
      // DIVIDER
      // =====================================================

      gsap.fromTo(
        dividerRef.current,
        {
          opacity: 0,
          scaleX: 0.6,
        },
        {
          opacity: 1,
          scaleX: 1,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 88%",
          },
        }
      );

      // =====================================================
      // CTA
      // =====================================================

      gsap.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          delay: 0.24,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 92%",
          },
        }
      );

      // =====================================================
      // AMBIENT FLOAT
      // =====================================================

      gsap.to(headlineRef.current, {
        y: -4,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(subtextRef.current, {
        y: -2,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden px-6 pt-[140px] pb-[120px]"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, #344575 0%, #2D3C68 65%)",
      }}
    >
      {/* ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.06),transparent_42%)]" />

      <div className="relative z-10 mx-auto max-w-[720px] text-center text-white">
        {/* HEADLINE */}
        <h2
          ref={headlineRef}
          className="
            font-[Gambarino]
            text-[clamp(34px,5.5vw,60px)]
            leading-[1.02]
            tracking-[-0.03em]
          "
        >
          The sea is already waiting.
          <br />
          The only question is when.
        </h2>

        {/* SUBTEXT */}
        <p
          ref={subtextRef}
          className="
            mx-auto mt-6 max-w-[460px]
            text-[14px] md:text-[15px]
            leading-[1.85]
            text-white/70
          "
        >
          Tell us where you want to go. We’ll handle everything else —
          from the first knot to the last sunset.
        </p>

        {/* DIVIDER */}
        <div
          ref={dividerRef}
          className="
            mx-auto mt-12 mb-12
            h-px w-[44px]
            origin-center
            bg-white/14
          "
        />

        {/* CTA */}
        <div ref={ctaRef}>
          <a
            href={SITE_CONTACT.whatsappHref}
            className="
              inline-flex items-center justify-center
              rounded-full
              border border-white/40
              px-7 py-3
              text-[11px]
              uppercase
              tracking-[0.32em]
              text-white
              transition-all duration-500
              hover:bg-white
              hover:text-[#2D3C68]
            "
          >
            Start Your Journey
          </a>
        </div>
      </div>
    </section>
  );
}




function SocialExperience() {
  const [active, setActive] = useState(0);

  const ITEMS = [
    {
      label: "Dining",
      desc: "Meals stretch longer as conversations take over",
      image:
        "https://images.pexels.com/photos/6324217/pexels-photo-6324217.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      label: "Conversation",
      desc: "Someone speaks, others listen, then it shifts again",
      image:
        "https://images.pexels.com/photos/7544263/pexels-photo-7544263.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      label: "Quiet",
      desc: "Moments of silence between everything else",
      image:
        "https://images.pexels.com/photos/3214969/pexels-photo-3214969.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ];

  return (
    <section className="w-full bg-[#F4F5F2] py-[160px] px-6">
      <div className="max-w-[1200px] mx-auto">

        {/* HEADER */}
        <div className="mb-20 max-w-[520px]">
          <p className="text-[11px] tracking-[0.32em] text-[#6A6A6A] uppercase mb-6">
            On board
          </p>

          <h2 className="font-[Gambarino] text-[clamp(40px,5vw,60px)] leading-[1.08] text-[#2D3C68]">
            Shared, without needing to plan it
          </h2>
        </div>

        {/* INTERACTIVE BLOCK */}
        <div className="grid md:grid-cols-12 gap-6 items-center">

          {/* LEFT — LIST */}
          <div className="md:col-span-4 flex flex-col gap-6">

            {ITEMS.map((item, i) => (
              <div
                key={i}
                onMouseEnter={() => setActive(i)}
                className="group cursor-pointer"
              >
                <p className="text-[11px] tracking-[0.3em] uppercase text-[#6A6A6A] mb-2">
                  0{i + 1}
                </p>

                <h3
                  className={`font-[Gambarino] text-[28px] transition-colors duration-300 ${
                    active === i
                      ? "text-[#2D3C68]"
                      : "text-[#2D3C68]/40"
                  }`}
                >
                  {item.label}
                </h3>

                <p
                  className={`text-[14px] mt-2 transition-all duration-300 ${
                    active === i
                      ? "opacity-100 translate-y-0 text-[#2D3C68]/70"
                      : "opacity-0 translate-y-2"
                  }`}
                >
                  {item.desc}
                </p>
              </div>
            ))}

          </div>

          {/* RIGHT — VISUAL */}
          <div className="md:col-span-8 relative h-[420px] md:h-[520px] overflow-hidden">

            {ITEMS.map((item, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  active === i
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-[1.05]"
                }`}
              >
                <img
                  src={item.image}
                  className="w-full h-full object-cover"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D3C68]/60 via-transparent to-transparent" />

                {/* caption */}
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="font-[Gambarino] text-[22px] text-white leading-[1.3]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

          </div>

        </div>

        {/* CTA */}
        <div className="mt-24">
          <button className="px-6 py-3 bg-[#2D3C68] text-white text-[14px] rounded-full hover:bg-[#1f2c4f] transition">
            See full journey →
          </button>
        </div>

      </div>
    </section>
  );
}









function ExperiencesIntro() {
  return (
    <section className="bg-[#F5F2ED] py-[140px] px-6">

      <div className="max-w-[1200px] mx-auto">

        {/* TOP */}
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* LEFT */}
          <div>
            <p className="text-[12px] tracking-[0.3em] text-[#6B7280] uppercase">
              Experiences
            </p>

            <h2 className="mt-6 font-[Canela] text-[36px] md:text-[52px] leading-[1.1] text-[#0F172A]">
              Memories of
              <br />
              A Lifetime
            </h2>
          </div>

          {/* RIGHT */}
          <div className="max-w-[520px]">

            <p className="text-[15px] text-[#0F172A]/75 leading-relaxed">
              No two days unfold the same. The rhythm shifts with the sea —
              from quiet mornings in open water to long afternoons drifting
              between islands, and evenings that settle into stillness.
            </p>

          </div>

        </div>

        {/* IMAGES (ASYMMETRIC — INI KUNCI) */}
        <div className="mt-20 grid md:grid-cols-[1.3fr_0.7fr] gap-8 items-start">

          {/* BIG IMAGE (LEADER) */}
          <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden">
            <img
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_18_PM_dihjfs.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT STACK */}
          <div className="flex flex-col gap-8">

            <div className="relative w-full h-[200px] md:h-[240px] overflow-hidden">
              <img
                src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_24_PM_lzlhwx.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative w-full h-[200px] md:h-[240px] overflow-hidden">
              <img
                src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031031/ChatGPT_Image_Apr_1_2026_03_08_02_PM_lplfu7.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

function ExperienceModes() {
  return (
    <section className="bg-[#F5F2ED] py-[140px] px-6">

      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-start">

        {/* LEFT — IMAGE */}
        <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden">

          <img
            src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_24_PM_lzlhwx.png"
            alt="Experience"
            className="w-full h-full object-cover"
          />

          {/* subtle depth */}
          <div className="absolute inset-0 bg-black/5" />

          {/* arrows (refined, smaller, less loud) */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/70 backdrop-blur flex items-center justify-center text-[#0F172A] text-sm hover:bg-white transition">
            ←
          </button>

          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/70 backdrop-blur flex items-center justify-center text-[#0F172A] text-sm hover:bg-white transition">
            →
          </button>

        </div>

        {/* RIGHT — CONTENT */}
        <div className="max-w-[480px]">

          <h2 className="font-[Canela] text-[36px] md:text-[48px] leading-[1.1] text-[#0F172A]">
            Things to Do
          </h2>

          {/* tabs (tightened, less contrast) */}
          <div className="mt-6 flex items-center gap-6 text-[12px] tracking-[0.25em] uppercase border-b border-[#0F172A]/10 pb-3">

            <span className="text-[#0F172A] border-b border-[#0F172A] pb-3 -mb-3">
              Land
            </span>

            <span className="text-[#0F172A]/40">Sand</span>
            <span className="text-[#0F172A]/40">Water</span>
            <span className="text-[#0F172A]/40">Massage</span>

          </div>

          {/* paragraph (dipadatkan spacing) */}
          <p className="mt-6 text-[15px] text-[#0F172A]/75 leading-relaxed">
            Let your journey ashore awaken your senses. Wander through lush
            landscapes, encounter native wildlife, and take in sweeping views
            that few ever reach.
          </p>

          {/* list (lebih subtle, gak dominan) */}
          <ul className="mt-6 space-y-3 text-[14px] text-[#0F172A]/65">
            <li>• Guided hikes and nature walks</li>
            <li>• Trekking to scenic viewpoints</li>
            <li>• Birdwatching in remote habitats</li>
            <li>• Cultural or ecological land excursions</li>
          </ul>

          {/* closing line */}
          <p className="mt-8 text-[14px] text-[#0F172A]/70 italic">
            Let our team arrange land experiences tailored to you.
          </p>

        </div>

      </div>

    </section>
  );
}

function Culinary() {
  return (
    <section className="bg-[#E3E3E0] py-[140px] px-6">

      <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT — IMAGE */}
        <div className="relative w-full h-[520px] md:h-[620px] overflow-hidden">

          <img
            src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031031/ChatGPT_Image_Apr_1_2026_03_08_02_PM_lplfu7.png"
            alt="Chef"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/10" />

        </div>

        {/* RIGHT — CONTENT */}
        <div className="max-w-[520px]">

          <p className="text-[11px] tracking-[0.35em] text-[#0F172A]/40 uppercase">
            Profile of Chef Wayan
          </p>

          <h2 className="mt-6 font-[Canela] text-[40px] md:text-[52px] leading-[1.1] text-[#0F172A]">
            Behind The Dishes
          </h2>

          <p className="mt-6 text-[15px] text-[#0F172A]/70 leading-relaxed">
            From sunrise to evening, each dish aboard Sanctuary is created
            to order by Balinese Executive Chef Roniawan. Menus evolve
            around guest desires, with every plate reflecting precision,
            intention, and a deep understanding of taste.
          </p>

          <div className="mt-10 w-full h-px bg-[#0F172A]/10" />

          <div className="mt-10 grid grid-cols-[1fr_140px] gap-6 items-end">

            <div>

              <p className="text-[11px] tracking-[0.3em] text-[#0F172A]/40 uppercase">
                Exclusive Menu By
              </p>

              <h3 className="mt-4 font-[Canela] text-[24px] md:text-[28px] text-[#0F172A] leading-tight">
                Chef Roniawan Putra
              </h3>

              <button className="mt-6 text-[12px] tracking-[0.25em] uppercase text-[#0F172A] border-b border-[#0F172A]/30 hover:border-[#0F172A] transition">
                Learn More →
              </button>

            </div>

            <div className="w-full h-[120px] overflow-hidden">

              <img
                src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031031/ChatGPT_Image_Apr_1_2026_03_08_02_PM_lplfu7.png"
                alt="Detail"
                className="w-full h-full object-cover"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
