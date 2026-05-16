"use client"

import { useEffect, useRef, useState } from "react"
import { gsap, ScrollTrigger } from "../lib/gsap"
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform , useInView} from "framer-motion";

import Footer from '../components/Footer'
 
/* =========================
   PAGE WRAPPER
========================= */
export default function Home() {
  return (
    <main className="bg-[#0a0f14] text-white overflow-hidden">
      <Hero />
      <Introduction/>
      <QuickContext/>
      <Experiences/>
      {/* <Activities/> */}
      <Destinations/>
      <Yacht/>
      {/* <Crew/> */}
      {/* <Rates/> */}
      {/* <ExperienceDay/> */}
      {/* <LifeOnBoard/> */}
      {/* <Yacht2/>  */}
      {/* <Included/> */}
      {/* <OnBoard/> */}
      {/* <About/> */}
      {/* <JourneyFlowSection/> */}
      {/* <YachtSection/> */}
      {/* <GalleryStrip/> */}
      {/* <Testimonials/> */}
      {/* <SerenityTestimonials/> */}
      {/* <Social/> */}
      <Closing/>
      {/* <Yacht/>   */}
      <Footer/>
    </main>
  )
}

const DISABLE_ANIMATION = false; // ubah ke false kalau mau animasi aktif


/* =========================
   HERO SECTION
========================= */
function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showOpening, setShowOpening] = useState(true);
  const [allowHeroContent, setAllowHeroContent] =
    useState(false);

  const heroMedia = {
    type: "video",

    /*
      IMAGE:
      https://res.cloudinary.com/dombq6plz/image/upload/v1777307172/ChatGPT_Image_Apr_27_2026_10_24_29_PM_1_ou4x2n.png
    */

    src: "https://www.pexels.com/download/video/29525835/",
  };

  const ease = [0.22, 1, 0.36, 1];

  // =========================================================
  // OPENING SEQUENCE
  // =========================================================

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce) {
      setShowOpening(false);
      setAllowHeroContent(true);
      return;
    }

    const openingSequence = async () => {
      /*
        OPENING HARUS SELALU ADA
      */

      await new Promise((resolve) =>
        setTimeout(resolve, 2350)
      );

      /*
        HERO CONTENT MULAI MUNCUL
        sedikit sebelum opening benar-benar hilang
      */

      setAllowHeroContent(true);

      setTimeout(() => {
        setShowOpening(false);
      }, 240);
    };

    openingSequence();
  }, []);

  // =========================================================
  // GSAP
  // =========================================================

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(contentRef.current, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        });

        return;
      }

      // BG PARALLAX
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

      // CONTENT DRIFT
      gsap.to(contentRef.current, {
        y: "6%",
        opacity: 0,
        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "40% top",
          scrub: 0.8,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#F4F5F2]"
    >
      {/* ========================================================= */}
      {/* KEYFRAMES */}
      {/* ========================================================= */}

      <style>{`
        @keyframes scrollDrop {
          0% {
            transform: translateY(-100%);
          }

          100% {
            transform: translateY(220%);
          }
        }

        .scroll-drop {
          animation: scrollDrop 1.8s ease-in-out infinite;
        }

        @keyframes grainMove {
          0% {
            transform: translate(0px, 0px);
          }

          25% {
            transform: translate(-1%, 1%);
          }

          50% {
            transform: translate(1%, -1%);
          }

          75% {
            transform: translate(0.5%, 1%);
          }

          100% {
            transform: translate(0px, 0px);
          }
        }

        @keyframes oceanLight {
          0% {
            transform: translate3d(-3%, 0%, 0) scale(1);
            opacity: 0.03;
          }

          50% {
            transform: translate3d(3%, -2%, 0) scale(1.08);
            opacity: 0.07;
          }

          100% {
            transform: translate3d(-3%, 0%, 0) scale(1);
            opacity: 0.03;
          }
        }

        @keyframes logoFloat {
          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-5px);
          }

          100% {
            transform: translateY(0px);
          }
        }

        @keyframes logoGlow {
          0% {
            filter: drop-shadow(0px 0px 0px rgba(255,255,255,0));
          }

          50% {
            filter: drop-shadow(0px 0px 18px rgba(255,255,255,0.06));
          }

          100% {
            filter: drop-shadow(0px 0px 0px rgba(255,255,255,0));
          }
        }

        @keyframes vignettePulse {
          0% {
            opacity: 0.42;
          }

          50% {
            opacity: 0.52;
          }

          100% {
            opacity: 0.42;
          }
        }

        @keyframes heroBloom {
          0% {
            opacity: 0;
            transform: scale(0.92);
          }

          50% {
            opacity: 0.12;
          }

          100% {
            opacity: 0;
            transform: scale(1.08);
          }
        }

        .grain-layer {
          animation: grainMove 8s steps(6) infinite;
        }

        .ocean-light {
          animation: oceanLight 12s ease-in-out infinite;
        }

        .logo-float {
          animation:
            logoFloat 5s ease-in-out infinite,
            logoGlow 7s ease-in-out infinite;
        }

        .vignette-pulse {
          animation: vignettePulse 7s ease-in-out infinite;
        }

        .hero-bloom {
          animation: heroBloom 2.8s ease-out forwards;
        }
      `}</style>

      {/* ========================================================= */}
      {/* OPENING */}
      {/* ========================================================= */}

      <AnimatePresence>
        {showOpening && (
          <motion.div
            initial={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 1.8,
              ease,
            }}
            className="
              absolute
              inset-0
              z-[100]
              overflow-hidden
              bg-[#0B1322]
            "
          >
            {/* ATMOSPHERIC LIGHT */}
            <div
              className="
                ocean-light
                absolute
                inset-0
                bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.08)_0%,transparent_58%)]
                mix-blend-soft-light
              "
            />

            {/* TOP WARMTH */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-b
                from-[#8B6A4F]/10
                via-transparent
                to-transparent
              "
            />

            {/* EDGE VIGNETTE */}
            <div
              className="
                vignette-pulse
                absolute
                inset-0
                bg-[radial-gradient(circle_at_center,transparent_34%,rgba(0,0,0,0.52)_100%)]
              "
            />

            {/* DEPTH */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/44
                via-transparent
                to-transparent
              "
            />

            {/* FOG */}
            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-[74vw]
                w-[74vw]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.02)_36%,transparent_72%)]
                blur-3xl
              "
            />

            {/* SECONDARY FOG */}
            <div
              className="
                absolute
                left-[54%]
                top-[46%]
                h-[44vw]
                w-[44vw]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[radial-gradient(circle,rgba(176,141,87,0.06)_0%,transparent_72%)]
                blur-3xl
              "
            />

            {/* GRAIN */}
            <div
              className="
                grain-layer
                absolute
                inset-[-50%]
                opacity-[0.05]
                mix-blend-soft-light
              "
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/dombq6plz/image/upload/v1778809642/noise_xq6m6w.png')",
                backgroundSize: "420px",
              }}
            />

            {/* CENTER LOGO */}
            <div
              className="
                relative
                z-10
                flex
                h-full
                items-center
                justify-center
                px-6
              "
            >
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.94,
                  rotate: -0.6,
                  filter: "blur(12px)",
                }}
                animate={{
                  opacity: 0.94,
                  y: 0,
                  scale: 1,
                  rotate: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 2,
                  delay: 0.18,
                  ease,
                }}
                className="
                  logo-float
                  relative
                  w-[230px]
                  md:w-[320px]
                "
              >
                <Image
                  src="https://res.cloudinary.com/dombq6plz/image/upload/v1777356413/SERENITY_LOGO-02_u1bcf2_1_zc65st.png"
                  alt="Serenity Phinisi"
                  width={700}
                  height={260}
                  priority
                  className="
                    h-auto
                    w-full
                    object-contain
                    select-none
                  "
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* BACKGROUND */}
      {/* ========================================================= */}

      <div
        ref={bgRef}
        className="absolute inset-0 scale-[1.06] will-change-transform"
        style={{
          transformOrigin: "center top",
        }}
      >
        {/* ========================================= */}
        {/* IMAGE MODE */}
        {/* ========================================= */}

        {heroMedia.type === "image" && (
          <Image
            src={heroMedia.src}
            alt="Guests walking aboard Serenity through the Indonesian archipelago"
            fill
            priority
            className="object-cover"
          />
        )}

        {/* ========================================= */}
        {/* VIDEO MODE */}
        {/* ========================================= */}

        {heroMedia.type === "video" && (
          <div
            className={`
              absolute inset-0
              overflow-hidden
              transition-all
              duration-[2200ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${
                isVideoLoaded
                  ? "scale-100 blur-0 opacity-100"
                  : "scale-[1.1] blur-[18px] opacity-65"
              }
            `}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onLoadedData={() => setIsVideoLoaded(true)}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            >
              <source src={heroMedia.src} type="video/mp4" />
            </video>

            {/* PRELOAD ATMOSPHERE */}
            <div
              className={`
                absolute inset-0
                bg-[#2D3C68]/36
                transition-opacity
                duration-[1800ms]
                ${isVideoLoaded ? "opacity-0" : "opacity-100"}
              `}
            />

            {/* CINEMATIC VIGNETTE */}
            <div
              className="
                absolute
                inset-0
                bg-[radial-gradient(circle_at_center,transparent_32%,rgba(7,10,18,0.42)_100%)]
              "
            />
          </div>
        )}

        {/* BASE MARITIME TINT */}
        <div className="absolute inset-0 bg-[#2D3C68]/14" />

        {/* BOTTOM DEPTH */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D3C68]/52 via-[#2D3C68]/14 to-transparent" />

        {/* TOP WARMTH */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#8B6A4F]/10 via-transparent to-transparent" />

        {/* RIGHT EDGE DEPTH */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#2D3C68]/10" />

        {/* ATMOSPHERIC LIGHT */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_0%,transparent_62%)] opacity-[0.04] mix-blend-soft-light" />

        {/* HERO BLOOM */}
        <AnimatePresence>
          {allowHeroContent && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 1.4,
              }}
              className="
                hero-bloom
                pointer-events-none
                absolute
                left-1/2
                top-[24%]
                h-[42vw]
                w-[42vw]
                -translate-x-1/2
                rounded-full
                bg-[radial-gradient(circle,rgba(176,141,87,0.14)_0%,rgba(176,141,87,0.04)_34%,transparent_72%)]
                blur-3xl
              "
            />
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================= */}
      {/* CONTENT */}
      {/* ========================================================= */}

      <div
        ref={contentRef}
        className="
          relative
          z-10
          flex
          h-full
          items-end
          justify-center
          px-6
          pb-[12vh]
          text-center
          will-change-transform
          md:px-10
        "
      >
        <div className="mx-auto max-w-[860px]">
          {/* MICRO LABEL */}
          <AnimatePresence>
            {allowHeroContent && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 24,
                  filter: "blur(6px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 1.2,
                  ease,
                }}
                className="
                  mb-6
                  text-[11px]
                  tracking-[0.32em]
                  text-[#F4F5F2]/76
                  md:text-[12px]
                "
              >
                INDONESIAN PHINISI YACHT
              </motion.div>
            )}
          </AnimatePresence>

          {/* HEADLINE */}
          <h1 className="font-[Gambarino] text-[50px] leading-[0.98] tracking-[-0.04em] text-[#F4F5F2] md:text-[76px] lg:text-[92px]">
            <AnimatePresence>
              {allowHeroContent && (
                <>
                  <motion.span
                    initial={{
                      opacity: 0,
                      y: 56,
                      filter: "blur(10px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    transition={{
                      duration: 1.45,
                      delay: 0.04,
                      ease,
                    }}
                    className="block"
                  >
                    Indonesia Waits
                  </motion.span>

                  <motion.span
                    initial={{
                      opacity: 0,
                      y: 56,
                      filter: "blur(10px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    transition={{
                      duration: 1.45,
                      delay: 0.16,
                      ease,
                    }}
                    className="block opacity-95"
                  >
                    at Sea
                  </motion.span>
                </>
              )}
            </AnimatePresence>
          </h1>

          {/* SUBCOPY */}
          <AnimatePresence>
            {allowHeroContent && (
              <motion.p
                initial={{
                  opacity: 0,
                  y: 30,
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 1.3,
                  delay: 0.32,
                  ease,
                }}
                className="
                  mx-auto
                  mt-5
                  max-w-[590px]
                  text-[15px]
                  leading-relaxed
                  text-[#F4F5F2]/90
                  md:text-[17px]
                "
              >
                Sail through Raja Ampat and Komodo with twelve
                guests aboard a handcrafted phinisi built for
                intimate ocean adventures
              </motion.p>
            )}
          </AnimatePresence>

          {/* CTA */}
          <AnimatePresence>
            {allowHeroContent && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1.15,
                  delay: 0.5,
                  ease,
                }}
                className="mt-10 flex flex-col items-center gap-4"
              >
                <button
                  className="
                    group
                    rounded-full
                    border
                    border-[#F4F5F2]/68
                    px-8
                    py-3
                    text-[13px]
                    tracking-[0.02em]
                    text-[#F4F5F2]
                    transition-all
                    duration-500
                    hover:border-[#F4F5F2]
                    hover:bg-[#F4F5F2]
                    hover:text-[#2D3C68]
                  "
                >
                  <span
                    className="
                      inline-block
                      transition-transform
                      duration-500
                      group-hover:-translate-y-[2px]
                    "
                  >
                    Begin Your Voyage →
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SCROLL INDICATOR */}
      {/* ========================================================= */}

      <AnimatePresence>
        {allowHeroContent && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1.35,
              duration: 1.1,
            }}
            className="
              absolute
              bottom-6
              left-1/2
              z-20
              -translate-x-1/2
            "
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] tracking-[0.24em] text-[#F4F5F2]/58">
                SCROLL
              </span>

              <div className="relative h-8 w-[1px] overflow-hidden bg-[#B08D57]/28">
                <div className="scroll-drop absolute left-0 top-0 h-4 w-full bg-[#F4F5F2]/80" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}





function Introduction() {
  const sectionRef = useRef(null);

  const headlineRef = useRef(null);
  const descRef = useRef(null);
  const imageRef = useRef(null);

  const leftImgRef = useRef(null);
  const rightImgRef = useRef(null);
  const bottomImgRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const isDesktop = window.innerWidth >= 1280;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      const headlineEl = headlineRef.current;
      const descEl = descRef.current;
      const imageEl = imageRef.current;

      const leftEl = leftImgRef.current;
      const rightEl = rightImgRef.current;
      const bottomEl = bottomImgRef.current;

      if (headlineEl) {
        const lines = headlineEl.querySelectorAll(".line") || [];

        gsap.set(lines, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        });
      }

      if (descEl) {
        gsap.set(descEl, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        });
      }

      if (imageEl) {
        gsap.set(imageEl, {
          opacity: 1,
          scale: 1,
          y: 0,
        });
      }

      if (isDesktop) {
        if (leftEl) gsap.set(leftEl, { y: 0 });
        if (rightEl) gsap.set(rightEl, { y: 0 });
        if (bottomEl) gsap.set(bottomEl, { y: 0 });
      }

      return;
    }

    const ctx = gsap.context(() => {
      const headlineEl = headlineRef.current;
      const descEl = descRef.current;
      const imageEl = imageRef.current;

      const leftEl = leftImgRef.current;
      const rightEl = rightImgRef.current;
      const bottomEl = bottomImgRef.current;

      // HEADLINE
      if (headlineEl) {
        const lines = headlineEl.querySelectorAll(".line") || [];

        gsap.fromTo(
          lines,
          {
            opacity: 0,
            y: 34,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.3,
            stagger: 0.16,
            ease: "power3.out",

            scrollTrigger: {
              trigger: headlineEl,
              start: "top 84%",
            },
          }
        );
      }

      // DESCRIPTION
      if (descEl) {
        gsap.fromTo(
          descEl,
          {
            opacity: 0,
            y: 24,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.3,
            delay: 0.1,
            ease: "power2.out",

            scrollTrigger: {
              trigger: descEl,
              start: "top 88%",
            },
          }
        );
      }

      // CENTER IMAGE
      if (imageEl) {
        gsap.fromTo(
          imageEl,
          {
            opacity: 0,
            scale: 1.04,
            y: 24,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",

            scrollTrigger: {
              trigger: imageEl,
              start: "top 90%",
            },
          }
        );
      }

      // DESKTOP ONLY PARALLAX
      if (isDesktop) {
        const parallaxConfig = {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        };

        if (leftEl) {
          gsap.to(leftEl, {
            y: -46,
            ease: "none",
            scrollTrigger: parallaxConfig,
          });
        }

        if (rightEl) {
          gsap.to(rightEl, {
            y: -74,
            ease: "none",
            scrollTrigger: parallaxConfig,
          });
        }

        if (bottomEl) {
          gsap.to(bottomEl, {
            y: -104,
            ease: "none",
            scrollTrigger: parallaxConfig,
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F4F5F2]
        px-6
        py-24
        md:px-10
        md:py-32
      "
    >
      {/* TOP TRANSITION */}
      <div className="pointer-events-none absolute left-0 top-0 h-[140px] w-full bg-gradient-to-b from-[#2D3C68]/14 via-[#2D3C68]/05 to-transparent" />

      {/* SUBTLE TEXTURE */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply bg-[radial-gradient(circle_at_center,#2D3C68_0%,transparent_62%)]" />

      <div className="relative mx-auto max-w-6xl text-center">
        {/* LABEL */}
        <div className="mb-5 text-[10px] uppercase tracking-[0.38em] text-[#2D3C68]/58">
          Experience
        </div>

        {/* HEADLINE */}
        <h2
          ref={headlineRef}
          className="
            mx-auto
            max-w-[620px]
            font-[Gambarino]
            text-[40px]
            leading-[1.04]
            tracking-[-0.03em]
            text-[#2D3C68]
            sm:text-[46px]
            md:text-[68px]
          "
        >
          <span className="line block">
            A way of living
          </span>

          <span className="line block">
          at open water
          </span>
        </h2>

        {/* DESCRIPTION */}
        <p
          ref={descRef}
          className="
            mx-auto
            mt-5
            max-w-[520px]
            text-[14px]
            leading-[1.72]
            text-[#2D3C68]/72
            md:mt-6
            md:text-[15px]
          "
        >
          Six in the morning, someone is already in the water. By afternoon, the anchor is down somewhere the crew knows well. By day three, the only schedule is the tide
        </p>

     

        {/* MAIN IMAGE */}
        <div className="mx-auto mt-14 max-w-[340px] sm:mt-16 sm:max-w-[360px] md:mt-20 md:max-w-[390px]">
          <div
            ref={imageRef}
            className="
              relative
              aspect-[4/5]
              overflow-hidden
              shadow-[0_18px_44px_rgba(45,60,104,0.08)]
            "
          >
            <Image
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1778509540/ChatGPT_Image_May_11_2026_09_24_55_PM_1_bc9y57.png"
              alt="Life on board Serenity yacht"
              fill
              priority
              className="object-cover transition-transform duration-[1800ms] hover:scale-[1.03]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#2D3C68]/12 to-transparent" />
          </div>
        </div>
      </div>

      {/* LEFT IMAGE */}
      <div
        ref={leftImgRef}
        className="
          pointer-events-none
          absolute
          left-[6%]
          top-[42%]
          hidden
          w-[250px]
          xl:block
        "
      >
        <div
          className="
            relative
            aspect-[4/5]
            overflow-hidden
            shadow-[0_18px_40px_rgba(45,60,104,0.08)]
          "
        >
          <Image
            src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068973/49_ph3xr3.webp"
            alt="Open sea moment"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div
        ref={rightImgRef}
        className="
          pointer-events-none
          absolute
          right-[5%]
          top-[38%]
          hidden
          w-[270px]
          xl:block
        "
      >
        <div
          className="
            relative
            aspect-[4/5]
            overflow-hidden
            shadow-[0_18px_40px_rgba(45,60,104,0.08)]
          "
        >
          <Image
            src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068967/40_oxbvdi.webp"
            alt="Interior space on board"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* LOWER RIGHT IMAGE */}
      <div
        ref={bottomImgRef}
        className="
          pointer-events-none
          absolute
          bottom-[2%]
          right-[16%]
          hidden
          w-[220px]
          xl:block
        "
      >
        <div
          className="
            relative
            aspect-[4/5]
            overflow-hidden
            shadow-[0_18px_40px_rgba(45,60,104,0.08)]
          "
        >
          <Image
            src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068965/37_rlznw3.webp"
            alt="Ocean environment"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

 

function QuickContext() {
  const stats = [
    { number: "12", label: "Only Twelve Guests" },
    { number: "4", label: "Private Cabins" },
    { number: "10", label: "Ten Crew Aboard" },
    { number: "Phinisi", label: "Tanah Beru · Sulawesi", small: true },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#2D3C68] py-16 md:py-24">
      {/* SUMBA IKAT TEXTURE */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              "radial-gradient(circle at 18% 22%, black 0%, rgba(0,0,0,0.72) 32%, transparent 68%)",
            WebkitMaskImage:
              "radial-gradient(circle at 18% 22%, black 0%, rgba(0,0,0,0.72) 32%, transparent 68%)",
          }}
        >
          <img
            src="https://res.cloudinary.com/dombq6plz/image/upload/v1778486752/ChatGPT_Image_May_11_2026_03_01_56_PM_2_k2aiwl.png"
            alt=""
            className="
              absolute
              -left-[420px]
              -top-[340px]
              w-[1100px]
              md:w-[1450px]
              max-w-none
              rotate-[-12deg]
              opacity-[0.045]
              mix-blend-soft-light
              blur-[0.4px]
              select-none
            "
          />
        </div>
      </div>

      {/* SUBTLE DEPTH */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-black/[0.06]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_center,white_0%,transparent_62%)]" />

      {/* ATMOSPHERIC BRIDGE OUT */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-[100px] w-full bg-gradient-to-b from-transparent to-[#F4F5F2]/08" />

      {/* CONTENT */}
      <div className="relative mx-auto max-w-[1120px] px-6">
        <div className="grid grid-cols-2 items-end gap-y-12 md:grid-cols-4 md:gap-y-0">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center ${
                i > 0 ? "md:border-l md:border-white/10" : ""
              }`}
            >
              <div
                className={`font-[Gambarino] leading-none text-[#F4F5F2] ${
                  stat.small
                    ? "text-[36px] md:text-[52px]"
                    : "text-[42px] md:text-[64px]"
                }`}
              >
                {stat.number}
              </div>

              <div className="mt-3 text-[11px] uppercase tracking-[0.22em] text-white/64">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 

function Experiences() {
  const sectionRef = useRef(null);

  const headerRef = useRef(null);

  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(
        [
          headerRef.current,
          leftRef.current,
          rightRef.current,
        ],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          clearProps: "all",
        }
      );

      return;
    }

    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 768;

      /* ========================================= */
      /* SHARED EASE */
      /* ========================================= */

      const ease = "power3.out";

      /* ========================================= */
      /* HEADER */
      /* ========================================= */

      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 28,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.25,
          ease,

          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 84%",
            once: true,
          },
        }
      );

      /* ========================================= */
      /* LEFT CARD */
      /* ========================================= */

      gsap.fromTo(
        leftRef.current,
        {
          opacity: 0,
          y: 34,
          scale: 1.015,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.35,
          ease,

          scrollTrigger: {
            trigger: leftRef.current,
            start: "top 86%",
            once: true,
          },
        }
      );

      /* ========================================= */
      /* RIGHT CARD */
      /* ========================================= */

      gsap.fromTo(
        rightRef.current,
        {
          opacity: 0,
          y: 34,
          scale: 1.015,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.35,
          delay: 0.08,
          ease,

          scrollTrigger: {
            trigger: rightRef.current,
            start: "top 86%",
            once: true,
          },
        }
      );

      /* ========================================= */
      /* DESKTOP PARALLAX */
      /* ========================================= */

      if (isDesktop) {
        gsap.to(leftRef.current, {
          y: -24,
          ease: "none",

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(rightRef.current, {
          y: -34,
          ease: "none",

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[#F4F5F2]
        px-6
        pb-24
        pt-28
        md:px-10
        md:pb-32
        md:pt-36
      "
    >
      {/* TOP DEPTH */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[160px] bg-gradient-to-b from-[#2D3C68]/10 via-[#2D3C68]/[0.04] to-transparent" />

      {/* SUBTLE TEXTURE */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,#2D3C68_0%,transparent_64%)] opacity-[0.03] mix-blend-multiply" />

      {/* ATMOSPHERIC BRIDGE OUT */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-b from-transparent via-[#2D3C68]/[0.03] to-[#2D3C68]/10" />

      <div className="relative mx-auto max-w-[1240px]">
        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div
          ref={headerRef}
          className="
            mx-auto
            mb-16
            max-w-[760px]
            text-center
            md:mb-24
          "
        >
          <p
            className="
              text-[11px]
              uppercase
              tracking-[0.34em]
              text-[#2D3C68]/60
            "
          >
            On Board
          </p>

          <h2
            className="
              mt-5
              font-[Gambarino]
              text-[42px]
              leading-[1.02]
              tracking-[-0.03em]
              text-[#2D3C68]
              sm:text-[54px]
              md:text-[68px]
            "
          >
            Leave the schedule on shore
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-[620px]
              text-[15px]
              leading-[1.8]
              text-[#5E5E5E]
              md:text-[16px]
            "
          >
            Days move between the deck, the water, and moments in
            between. Nothing feels scheduled, yet everything settles
            naturally into rhythm.
          </p>
        </div>

        {/* ========================================= */}
        {/* GRID */}
        {/* ========================================= */}

        <div
          className="
            grid
            items-start
            gap-14
            md:grid-cols-2
            md:gap-12
            xl:gap-16
          "
        >
          {/* ========================================= */}
          {/* LEFT */}
          {/* ========================================= */}

          <div
            ref={leftRef}
            className="
              mx-auto
              w-full
              max-w-[480px]
            "
          >
            <div
              className="
                relative
                aspect-[4/5]
                overflow-hidden
                shadow-[0_24px_60px_rgba(45,60,104,0.08)]
              "
            >
              <img
                src="https://res.cloudinary.com/dombq6plz/image/upload/v1778424753/ChatGPT_Image_May_10_2026_09_51_01_PM_xfhbnv.png"
                alt="Gathering on the deck of Serenity"
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-[1800ms]
                  hover:scale-[1.03]
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#2D3C68]/12 via-transparent to-transparent" />
            </div>

            <div className="mt-8">
              <h3
                className="
                  font-[Gambarino]
                  text-[30px]
                  leading-[1.08]
                  tracking-[-0.02em]
                  text-[#1D1D1D]
                "
              >
                Open Deck Living
              </h3>

              <p
                className="
                  mt-3
                  max-w-[460px]
                  text-[15px]
                  leading-[1.82]
                  text-[#5C5C5C]
                "
              >
                Sunlight, sea air, and space to linger. Much of the day
                unfolds outside, without needing a plan or destination.
              </p>
            </div>
          </div>

          {/* ========================================= */}
          {/* RIGHT */}
          {/* ========================================= */}

          <div
            ref={rightRef}
            className="
              mx-auto
              w-full
              max-w-[480px]
              md:pt-14
            "
          >
            <div
              className="
                relative
                aspect-[4/5]
                overflow-hidden
                shadow-[0_24px_60px_rgba(45,60,104,0.08)]
              "
            >
              <img
                src="https://res.cloudinary.com/dombq6plz/image/upload/v1778425837/ChatGPT_Image_May_10_2026_10_10_05_PM_1_dv3ebm.png"
                alt="Quiet moment on board Serenity"
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-[1800ms]
                  hover:scale-[1.03]
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#2D3C68]/14 via-transparent to-transparent" />
            </div>

            <div className="mt-8">
              <h3
                className="
                  font-[Gambarino]
                  text-[30px]
                  leading-[1.08]
                  tracking-[-0.02em]
                  text-[#1D1D1D]
                "
              >
                Quiet When You Need It
              </h3>

              <p
                className="
                  mt-3
                  max-w-[450px]
                  text-[15px]
                  leading-[1.82]
                  text-[#5C5C5C]
                "
              >
                When the rhythm slows, private interiors offer calm,
                comfort, and space entirely your own.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* CTA */}
        {/* ========================================= */}

        <div className="mt-16 flex justify-center md:mt-20">
          <button
            className="
              group
              rounded-full
              border
              border-[#2D3C68]/22
              px-7
              py-3
              text-[12px]
              uppercase
              tracking-[0.14em]
              text-[#2D3C68]/68
              transition-all
              duration-500
              hover:border-[#2D3C68]
              hover:text-[#2D3C68]
            "
          >
            <span
              className="
                inline-block
                transition-transform
                duration-500
                group-hover:translate-x-[3px]
              "
            >
              Step Inside the Yacht →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}


function About() {
  return (
    <section className="bg-[#2D3C68] py-[90px] md:py-[110px] px-6 text-white">

      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-14 md:gap-16 items-center">

        {/* ================= LEFT ================= */}
        <div>

          {/* LABEL */}
          <p className="text-[11px] tracking-[0.35em] text-white/50 uppercase">
            About
          </p>

          {/* TITLE */}
          <h2 className="mt-5 font-[Gambarino] text-[42px] md:text-[56px] leading-[1.15] max-w-[520px]">
            Life, Carried
            <br />
            by the Sea
          </h2>

          {/* TEXT BLOCK 1 */}
          <p className="mt-6 text-[15px] text-white/75 leading-[1.7] max-w-[520px]">
            Serenity is not about where you go. It’s about how you spend your time at sea. 
            Days move without a fixed structure, shifting naturally between water, rest, 
            and shared moments on board.
          </p>

          {/* TEXT BLOCK 2 */}
          <p className="mt-4 text-[15px] text-white/75 leading-[1.7] max-w-[520px]">
            You wake, swim, sit, eat, and talk without needing to follow a plan. 
            The boat becomes a space to live in, not just something that takes you somewhere. 
            Everything happens at a pace that feels natural, supported quietly by the crew and the environment around you.
          </p>

          {/* CTA */}
          <div className="mt-7">
            <button className="group text-[13px] tracking-[0.18em] uppercase text-white border-b border-white/30 hover:border-white transition">
              Explore Life On Board
              <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>

        </div>

        {/* ================= RIGHT ================= */}
        <div className="relative h-[440px] md:h-[480px]">

          {/* MAIN — HUMAN MOMENT */}
          <div className="absolute top-0 right-0 w-[78%] h-[300px] md:h-[320px] overflow-hidden rounded-[4px]">
            <img
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068969/43_fcprng.webp"
              className="w-full h-full object-cover"
            />
          </div>

          {/* SECOND — RELAXED */}
          <div className="absolute bottom-0 left-0 w-[52%] h-[180px] md:h-[200px] overflow-hidden rounded-[4px]">
            <img
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/04_fqtqkn.webp"
              className="w-full h-full object-cover"
            />
          </div>

          {/* ACCENT — DETAIL */}
          <div className="absolute bottom-[110px] md:bottom-[120px] right-[4%] w-[40%] h-[120px] md:h-[130px] overflow-hidden rounded-[4px]">
            <img
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068892/01_oomiyy.webp"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

      </div>

    </section>
  )
}

function ParallaxImage({ src, alt }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-40px", "40px"]);

  return (
    <div ref={ref} className="relative w-full h-[420px] overflow-hidden rounded-[2px]">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover scale-[1.08]"
        />
      </motion.div>

      {/* subtle overlay */}
      <div className="absolute inset-0 bg-black/5" />
    </div>
  );
}


function Yacht() {
  const sectionRef = useRef(null);

  const yachtParallaxRef = useRef(null);
  const yachtFloatRef = useRef(null);

  const yachtGlowRef = useRef(null);

  const svgRef = useRef(null);

  const headerRef = useRef(null);

  const cardARef = useRef(null);
  const cardBRef = useRef(null);
  const cardCRef = useRef(null);

  const microRef = useRef(null);

  const ctaRef = useRef(null);

  const ease = [0.22, 1, 0.36, 1];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        mobile: "(max-width: 767px)",
        desktop: "(min-width: 768px)",
      },
      (context) => {
        const { mobile } = context.conditions;

        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        /*
          ========================================
          NODE SYSTEM
          ========================================
        */

        const mobileNodes = mobile
          ? [
              headerRef.current,

              cardARef.current,

              microRef.current,

              cardBRef.current,

              cardCRef.current,

              ctaRef.current,
            ].filter(Boolean)
          : [];

        const desktopNodes = !mobile
          ? [
              headerRef.current,

              yachtParallaxRef.current,

              cardARef.current,

              cardBRef.current,

              cardCRef.current,

              microRef.current,

              ctaRef.current,
            ].filter(Boolean)
          : [];

        const allNodes = mobile
          ? mobileNodes
          : desktopNodes;

        /*
          ========================================
          REDUCED MOTION
          ========================================
        */

        if (reduce) {
          gsap.set(allNodes, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          });

          if (!mobile && svgRef.current) {
            const paths =
              svgRef.current.querySelectorAll("path");

            gsap.set(paths, {
              strokeDashoffset: 0,
              opacity: 0.12,
            });
          }

          return;
        }

        /*
          ========================================
          ENTRY TIMELINE
          ========================================
        */

        const tl = gsap.timeline({
          defaults: {
            ease,
          },

          scrollTrigger: {
            trigger: sectionRef.current,

            start: mobile
              ? "top bottom-=40"
              : "top bottom-=100",

            once: true,
          },
        });

        /*
          ========================================
          HEADER
          ========================================
        */

        tl.fromTo(
          headerRef.current,
          {
            opacity: 0,

            y: 28,

            filter: "blur(10px)",
          },
          {
            opacity: 1,

            y: 0,

            filter: "blur(0px)",

            duration: 1.1,
          }
        );

        /*
          ========================================
          MOBILE FLOW
          ========================================
        */

        if (mobile) {
          tl.fromTo(
            [
              cardARef.current,

              microRef.current,

              cardBRef.current,

              cardCRef.current,
            ],
            {
              opacity: 0,

              y: 36,

              filter: "blur(10px)",
            },
            {
              opacity: 1,

              y: 0,

              filter: "blur(0px)",

              duration: 1,

              stagger: 0.16,
            },
            "-=0.5"
          ).fromTo(
            ctaRef.current,
            {
              opacity: 0,

              y: 20,
            },
            {
              opacity: 1,

              y: 0,

              duration: 0.9,
            },
            "-=0.4"
          );
        }

        /*
          ========================================
          DESKTOP FLOW
          ========================================
        */

        else {
          /*
            YACHT
          */

          tl.fromTo(
            yachtParallaxRef.current,
            {
              opacity: 0,

              scale: 0.965,

              y: 36,

              filter: "blur(12px)",
            },
            {
              opacity: 1,

              scale: 1,

              y: 0,

              filter: "blur(0px)",

              duration: 1.7,
            },
            "-=0.5"
          );

          /*
            CARD ORBIT
          */

          tl.fromTo(
            [
              cardARef.current,

              cardBRef.current,

              cardCRef.current,

              microRef.current,
            ],
            {
              opacity: 0,

              y: 38,

              filter: "blur(10px)",
            },
            {
              opacity: 1,

              y: 0,

              filter: "blur(0px)",

              duration: 1,

              stagger: 0.13,
            },
            "-=1.1"
          );

          /*
            CTA
          */

          tl.fromTo(
            ctaRef.current,
            {
              opacity: 0,

              y: 20,
            },
            {
              opacity: 1,

              y: 0,

              duration: 0.9,
            },
            "-=0.45"
          );

          /*
            SVG
          */

          if (svgRef.current) {
            const paths =
              svgRef.current.querySelectorAll("path");

            paths.forEach((path) => {
              const length = path.getTotalLength();

              gsap.set(path, {
                strokeDasharray: length,

                strokeDashoffset: length,

                opacity: 0,
              });
            });

            gsap.to(paths, {
              strokeDashoffset: 0,

              opacity: 0.24,

              duration: 2,

              stagger: 0.24,

              ease,

              scrollTrigger: {
                trigger: sectionRef.current,

                start: "top 60%",

                once: true,
              },
            });
          }

          /*
            PARALLAX
          */

          gsap.to(yachtParallaxRef.current, {
            y: -24,

            ease: "none",

            scrollTrigger: {
              trigger: sectionRef.current,

              start: "top bottom",

              end: "bottom top",

              scrub: 1,
            },
          });

          /*
            FLOAT
          */

          gsap.to(yachtFloatRef.current, {
            y: "+=10",

            duration: 5.4,

            repeat: -1,

            yoyo: true,

            ease: "sine.inOut",
          });

          /*
            GLOW
          */

          gsap.to(yachtGlowRef.current, {
            opacity: 0.72,

            scale: 1.035,

            duration: 4.8,

            repeat: -1,

            yoyo: true,

            ease: "sine.inOut",
          });
        }

        return () => {};
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F4F5F2]
        px-5
        pb-[120px]
        pt-[78px]
        md:px-6
        md:pb-[130px]
        md:pt-[120px]
      "
    >
      {/* ========================================= */}
      {/* ATMOSPHERIC TRANSITIONS */}
      {/* ========================================= */}

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[140px] bg-gradient-to-b from-[#2D3C68]/[0.07] to-transparent" />

      <div className="pointer-events-none absolute bottom-0 left-0 h-[120px] w-full bg-gradient-to-b from-transparent to-[#2D3C68]/[0.05]" />

      {/* ========================================= */}
      {/* GLOBAL ATMOSPHERE */}
      {/* ========================================= */}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(45,60,104,0.05),transparent_48%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(176,141,87,0.05),transparent_38%)]" />

      <div className="mx-auto max-w-[1440px]">
        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div
          ref={headerRef}
          className="
            mx-auto
            mb-16
            max-w-[680px]
            text-center
            md:mb-32
          "
        >
          <p className="text-[11px] uppercase tracking-[0.34em] text-[#2D3C68]/56">
            The Yacht
          </p>

          <h2
            className="
              mt-6
              font-[Gambarino]
              text-[42px]
              leading-[0.96]
              tracking-[-0.03em]
              text-[#2D3C68]
              md:text-[66px]
            "
          >
            Designed for the way
            <br />
            people live at sea
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-[500px]
              text-[15px]
              leading-[1.9]
              text-[#2D3C68]/68
            "
          >
            Open decks, quiet cabins, shared spaces,
            and enough room for twelve people to move
            through the day without ever feeling
            crowded.
          </p>
        </div>

        {/* ========================================= */}
        {/* MOBILE */}
        {/* ========================================= */}

        <div className="space-y-8 md:hidden">
          {/* CARD A */}

          <div
            ref={cardARef}
            className="ml-auto w-[86%]"
          >
            <CardBlock
              image="https://res.cloudinary.com/dombq6plz/image/upload/v1776068967/40_oxbvdi.webp"
              title="Upper Deck"
              desc="Sunbeds, open sky, and the full width of the sea on every side."
              large
            />
          </div>

          {/* MICRO */}

          <div
            ref={microRef}
            className="mr-auto w-[54%]"
          >
            <div
              className="
                relative
                overflow-hidden
                border
                border-[#2D3C68]/[0.06]
                bg-white/[0.72]
                px-5
                py-5
                shadow-[0_28px_70px_rgba(20,30,50,0.05)]
                backdrop-blur-md
              "
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(176,141,87,0.09),transparent_54%)]" />

              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.14] to-transparent" />

              <p className="relative text-[9px] uppercase tracking-[0.24em] text-[#2D3C68]/42">
                Vessel
              </p>

              <p className="relative mt-2 font-[Gambarino] text-[34px] leading-none text-[#2D3C68]">
                40.75m
              </p>

              <p className="relative mt-2 text-[11px] leading-[1.75] text-[#2D3C68]/68">
                Handcrafted phinisi, built 2025 in
                South Sulawesi.
              </p>
            </div>
          </div>

          {/* CARD B */}

          <div
            ref={cardBRef}
            className="ml-auto w-[70%]"
          >
            <CardBlock
              image="https://res.cloudinary.com/dombq6plz/image/upload/v1776068961/27_unvtvm.webp"
              title="Four Cabins"
              desc="Private rooms designed for rest after long days in the sun and sea."
            />
          </div>

          {/* CARD C */}

          <div
            ref={cardCRef}
            className="mr-auto w-[78%]"
          >
            <CardBlock
              image="https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/07_iujxr6.webp"
              title="Crew"
              desc="Ten crew who know every current by name."
            />
          </div>

          {/* CTA */}

          <div
            ref={ctaRef}
            className="flex flex-col items-center gap-5 pt-8"
          >
            <div className="h-px w-[120px] bg-gradient-to-r from-transparent via-[#B08D57]/40 to-transparent" />

            <a
              href="/yacht"
              className="
                group
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-[#2D3C68]/18
                px-7
                py-3
                text-[12px]
                uppercase
                tracking-[0.22em]
                text-[#2D3C68]
                transition-all
                duration-500
                hover:border-[#2D3C68]
                hover:bg-[#2D3C68]
                hover:text-white
              "
            >
              Explore The Yacht

              <span className="transition-transform duration-500 group-hover:translate-x-[3px]">
                →
              </span>
            </a>

            <div className="flex flex-col items-center gap-3 pt-2">
              <a
                href="/deck-plan"
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.18em]
                  text-[#2D3C68]/48
                  transition-all
                  duration-300
                  hover:text-[#2D3C68]
                "
              >
                View Deck Plan
              </a>

              <a
                href="/brochure.pdf"
                download
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.18em]
                  text-[#2D3C68]/48
                  transition-all
                  duration-300
                  hover:text-[#2D3C68]
                "
              >
                Download Brochure
              </a>

              <a
                href="/specifications"
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.18em]
                  text-[#2D3C68]/48
                  transition-all
                  duration-300
                  hover:text-[#2D3C68]
                "
              >
                View Specifications
              </a>
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* DESKTOP */}
        {/* ========================================= */}

        <div className="hidden md:block">
          <div className="relative h-[clamp(1180px,92vw,1320px)]">
            {/* ========================================= */}
            {/* YACHT GLOW */}
            {/* ========================================= */}

            <div
              ref={yachtGlowRef}
              className="
                pointer-events-none
                absolute
                left-1/2
                top-[18%]
                z-10
                h-[560px]
                w-[240px]
                -translate-x-1/2
                rounded-full
                bg-[#D7C3A0]/15
                blur-[92px]
              "
            />

            {/* ========================================= */}
            {/* CONNECTOR LINES */}
            {/* ========================================= */}

            <svg
              ref={svgRef}
              className="
                pointer-events-none
                absolute
                inset-0
                z-20
                h-full
                w-full
              "
              viewBox="0 0 1440 1320"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M 360,230 C 500,180 580,125 720,112"
                fill="none"
                stroke="#B08D57"
                strokeWidth="0.65"
                strokeLinecap="round"
              />

              <path
                d="M 1080,380 C 980,340 900,325 760,420"
                fill="none"
                stroke="#B08D57"
                strokeWidth="0.65"
                strokeLinecap="round"
              />

              <path
                d="M 320,870 C 470,840 590,830 700,860"
                fill="none"
                stroke="#B08D57"
                strokeWidth="0.65"
                strokeLinecap="round"
              />

              <path
                d="M 1110,960 C 980,940 900,930 780,950"
                fill="none"
                stroke="#B08D57"
                strokeWidth="0.65"
                strokeLinecap="round"
              />
            </svg>

            {/* ========================================= */}
            {/* CENTER YACHT */}
            {/* ========================================= */}

            <div
              ref={yachtParallaxRef}
              className="
                pointer-events-none
                absolute
                left-1/2
                top-[-3%]
                z-20
                -translate-x-1/2
              "
            >
              <div ref={yachtFloatRef}>
                <div className="relative h-[clamp(900px,72vw,1020px)] w-[clamp(224px,17.5vw,252px)]">
                  {/* SHADOW */}

                  <div className="absolute inset-0 translate-y-[22px] scale-[0.94] rounded-full bg-black/[0.07] blur-[36px]" />

                  {/* AMBIENT HAZE */}

                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_58%)]" />

                  {/* IMAGE */}

                  <div className="relative h-full w-full opacity-[0.985] saturate-[0.95]">
                    <Image
                      src="https://res.cloudinary.com/dombq6plz/image/upload/v1777394633/e75ce606-c6fd-4eae-8739-12516236bfec_1_ohoghl.png"
                      alt="Top down Serenity phinisi yacht"
                      fill
                      className="object-contain drop-shadow-[0_34px_56px_rgba(18,28,48,0.10)]"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================= */}
            {/* CARD A */}
            {/* ========================================= */}

            <div
              ref={cardARef}
              className="
                absolute
                left-[6.25%]
                top-[12.9%]
                z-30
                w-[clamp(300px,25vw,360px)]
              "
            >
              <CardBlock
                image="https://res.cloudinary.com/dombq6plz/image/upload/v1776068967/40_oxbvdi.webp"
                title="Upper Deck"
                desc="Sunbeds, open sky, and the full width of the sea on every side."
                large
              />
            </div>

            {/* ========================================= */}
            {/* CARD B */}
            {/* ========================================= */}

            <div
              ref={cardBRef}
              className="
                absolute
                right-[8.33%]
                top-[25%]
                z-30
                w-[clamp(248px,20.1vw,290px)]
              "
            >
              <CardBlock
                image="https://res.cloudinary.com/dombq6plz/image/upload/v1776068961/27_unvtvm.webp"
                title="Four Cabins"
                desc="Private rooms designed for calm, rest, and time entirely your own."
              />
            </div>

            {/* ========================================= */}
            {/* CARD C */}
            {/* ========================================= */}

            <div
              ref={cardCRef}
              className="
                absolute
                left-[8.33%]
                top-[62.9%]
                z-30
                w-[clamp(265px,21.5vw,310px)]
              "
            >
              <CardBlock
                image="https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/07_iujxr6.webp"
                title="Crew"
                desc="Ten crew who know every current by name."
              />
            </div>

            {/* ========================================= */}
            {/* MICRO CARD */}
            {/* ========================================= */}

            <div
              ref={microRef}
              className="
                absolute
                right-[10.42%]
                top-[70.5%]
                z-30
                w-[clamp(220px,17.3vw,250px)]
              "
            >
              <div
                className="
                  relative
                  overflow-hidden
                  border
                  border-[#2D3C68]/[0.06]
                  bg-white/[0.72]
                  px-7
                  py-7
                  shadow-[0_30px_80px_rgba(20,30,50,0.05)]
                  backdrop-blur-md
                "
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(176,141,87,0.08),transparent_58%)]" />

                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.14] to-transparent" />

                <p className="relative text-[10px] uppercase tracking-[0.24em] text-[#2D3C68]/42">
                  Vessel
                </p>

                <p className="relative mt-3 font-[Gambarino] text-[44px] leading-none text-[#2D3C68]">
                  40.75m
                </p>

                <p className="relative mt-3 text-[13px] leading-[1.8] text-[#2D3C68]/68">
                  Handcrafted phinisi, built 2025 in
                  Tanah Beru, South Sulawesi.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================= */}
          {/* CTA CLUSTER */}
          {/* ========================================= */}

          <div
            ref={ctaRef}
            className="mt-10 flex justify-center"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="h-px w-[150px] bg-gradient-to-r from-transparent via-[#B08D57]/40 to-transparent" />

              <a
                href="/yacht"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-[#2D3C68]/18
                  px-7
                  py-3
                  text-[12px]
                  uppercase
                  tracking-[0.22em]
                  text-[#2D3C68]
                  transition-all
                  duration-500
                  hover:border-[#2D3C68]
                  hover:bg-[#2D3C68]
                  hover:text-white
                "
              >
                Explore The Yacht

                <span className="transition-transform duration-500 group-hover:translate-x-[4px]">
                  →
                </span>
              </a>

              <div className="flex items-center gap-7">
                <a
                  href="/deck-plan"
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.18em]
                    text-[#2D3C68]/46
                    transition-all
                    duration-300
                    hover:text-[#2D3C68]
                  "
                >
                  View Deck Plan
                </a>

                <span className="h-3 w-px bg-[#2D3C68]/14" />

                <a
                  href="/brochure.pdf"
                  download
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.18em]
                    text-[#2D3C68]/46
                    transition-all
                    duration-300
                    hover:text-[#2D3C68]
                  "
                >
                  Download Brochure
                </a>

                <span className="h-3 w-px bg-[#2D3C68]/14" />

                <a
                  href="/specifications"
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.18em]
                    text-[#2D3C68]/46
                    transition-all
                    duration-300
                    hover:text-[#2D3C68]
                  "
                >
                  View Specifications
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardBlock({
  image,
  title,
  desc,
  large = false,
}) {
  return (
    <div className="group relative">
      {/* ========================================= */}
      {/* IMAGE */}
      {/* ========================================= */}

      <div
        className={`
          relative
          overflow-hidden
          bg-[#D9DDD6]
          ${
            large
              ? "aspect-[4/5]"
              : "aspect-[3.2/4]"
          }
        `}
      >
        {/* IMAGE */}
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={title}
            fill
            className="
              object-cover
              scale-[1.015]
              transition-transform
              duration-[2400ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:scale-[1.045]
              group-hover:translate-y-[-4px]
            "
          />
        </div>

        {/* ATMOSPHERIC DEPTH */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/18
            via-black/[0.02]
            to-black/[0.04]
          "
        />

        {/* WARMTH */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.08),transparent_42%)]
            opacity-70
            transition-opacity
            duration-[1800ms]
            group-hover:opacity-100
          "
        />

        {/* DEPTH EDGE */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            ring-1
            ring-black/[0.04]
            ring-inset
          "
        />

        {/* SLOW ATMOSPHERIC SHIFT */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[#2D3C68]/[0.035]
            opacity-0
            transition-opacity
            duration-[1800ms]
            group-hover:opacity-100
          "
        />
      </div>

      {/* ========================================= */}
      {/* CONTENT */}
      {/* ========================================= */}

      <div
        className={`
          relative
          ${
            large
              ? "mt-5"
              : "mt-4"
          }
        `}
      >
        {/* MICRO LABEL */}
        <p
          className="
            text-[10px]
            uppercase
            tracking-[0.24em]
            text-[#2D3C68]/44
          "
        >
          {title}
        </p>

        {/* BODY */}
        <p
          className={`
            mt-2
            max-w-[32ch]
            leading-[1.82]
            text-[#2D3C68]/72
            transition-colors
            duration-700
            group-hover:text-[#2D3C68]/82
            ${
              large
                ? "text-[15px]"
                : "text-[14px]"
            }
          `}
        >
          {desc}
        </p>

        {/* ATMOSPHERIC LINE */}
        <div
          className="
            mt-5
            h-px
            w-0
            bg-gradient-to-r
            from-[#B08D57]/40
            to-transparent
            transition-all
            duration-[1400ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:w-[72px]
          "
        />
      </div>
    </div>
  );
}


function Crew() {
  const sectionRef = useRef(null);

  const textRef = useRef(null);

  const imageWrapRef = useRef(null);

  const imageRef = useRef(null);

  const ikatRef = useRef(null);

  const ctaRef = useRef(null);

  const ease = [0.22, 1, 0.36, 1];

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /*
      ========================================
      REDUCED MOTION
      ========================================
    */

    if (reduce) {
      gsap.set(
        [
          textRef.current,
          imageWrapRef.current,
          ikatRef.current,
          ctaRef.current,
        ],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        }
      );

      return;
    }

    /*
      ========================================
      INTRO
      ========================================
    */

    const tl = gsap.timeline({
      defaults: {
        ease,
      },

      scrollTrigger: {
        trigger: sectionRef.current,

        start: "top 80%",

        once: true,
      },
    });

    tl.fromTo(
      textRef.current,
      {
        opacity: 0,
        y: 34,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.15,
      }
    );

    tl.fromTo(
      ikatRef.current,
      {
        opacity: 0,
        scale: 0.94,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
      },
      "-=0.75"
    );

    tl.fromTo(
      imageWrapRef.current,
      {
        opacity: 0,
        y: 38,
        scale: 1.025,
        filter: "blur(12px)",
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.35,
      },
      "-=1.05"
    );

    tl.fromTo(
      ctaRef.current,
      {
        opacity: 0,
        y: 14,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      "-=0.65"
    );

    /*
      ========================================
      PARALLAX
      ========================================
    */

    gsap.to(imageRef.current, {
      y: -18,

      ease: "none",

      scrollTrigger: {
        trigger: sectionRef.current,

        start: "top bottom",

        end: "bottom top",

        scrub: 1.1,
      },
    });

    return () => {
      tl.kill();

      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#2D3C68]"
    >
      {/* ========================================= */}
      {/* BRIDGE IN */}
      {/* ========================================= */}

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[120px] bg-gradient-to-b from-[#F4F5F2]/8 to-transparent" />

      {/* ========================================= */}
      {/* BRIDGE OUT */}
      {/* ========================================= */}

      <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-[100px] w-full bg-gradient-to-b from-transparent to-[#1A1A1A]/12" />

      {/* ========================================= */}
      {/* ATMOSPHERE */}
      {/* ========================================= */}

      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_74%_24%,rgba(176,141,87,0.10),transparent_42%)]" />

      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-white/[0.03] via-transparent to-black/[0.14]" />

      {/* ========================================= */}
      {/* IKAT */}
      {/* ========================================= */}

      <div
        ref={ikatRef}
        className="
          pointer-events-none
          absolute
          bottom-[-120px]
          left-[-120px]
          z-[1]
          hidden
          h-[360px]
          w-[360px]
          md:block
        "
      >
        <img
          src="https://res.cloudinary.com/dombq6plz/image/upload/v1778486752/ChatGPT_Image_May_11_2026_03_01_56_PM_2_k2aiwl.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain"
          style={{
            opacity: 0.03,
          }}
        />
      </div>

      {/* ========================================= */}
      {/* LAYOUT */}
      {/* ========================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          max-w-[1320px]
          items-center
          gap-12
          px-6
          py-[72px]
          md:grid-cols-[0.92fr_1.08fr]
          md:gap-14
          md:px-10
          md:py-[84px]
          lg:gap-16
        "
      >
        {/* ========================================= */}
        {/* LEFT */}
        {/* ========================================= */}

        <div
          ref={textRef}
          className="relative z-10"
        >
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/46">
            The Crew
          </p>

          <h2
            className="
              mt-5
              max-w-[520px]
              font-[Gambarino]
              text-[40px]
              leading-[1]
              tracking-[-0.04em]
              text-[#F4F5F2]
              md:text-[54px]
              lg:text-[60px]
            "
          >
            They know every
            <br />
            current by name.
          </h2>

          <div className="my-7 h-px w-12 bg-[#B08D57]/50" />

          <div className="max-w-[450px] space-y-5">
            <p className="text-[15px] leading-[1.88] text-white/70 md:text-[16px]">
              Ten crew from Indonesia’s maritime communities —
              warm, attentive, and shaped entirely around
              the rhythm of each voyage.
            </p>

            <p className="text-[15px] leading-[1.88] text-white/58 md:text-[16px]">
              They notice shifting weather before the horizon changes,
              remember how you take your coffee,
              and somehow make every day aboard feel effortless.
            </p>
          </div>

          <div
            ref={ctaRef}
            className="mt-11"
          >
            <a
              href="/about"
              className="
                group
                inline-flex
                items-center
                gap-3
                border-b
                border-white/24
                pb-[10px]
                text-[11px]
                uppercase
                tracking-[0.24em]
                text-white/80
                transition-all
                duration-500
                hover:border-white/58
                hover:text-white
              "
            >
              Meet the Crew

              <span
                className="
                  transition-transform
                  duration-500
                  group-hover:translate-x-[2px]
                "
              >
                →
              </span>
            </a>
          </div>
        </div>

        {/* ========================================= */}
        {/* IMAGE */}
        {/* ========================================= */}

        <div
          ref={imageWrapRef}
          className="relative overflow-hidden"
        >
          <div
            className="
              relative
              h-[300px]
              overflow-hidden
              md:h-[360px]
              lg:h-[400px]
            "
          >
            <div
              ref={imageRef}
              className="absolute inset-0 scale-[1.04]"
            >
              <Image
                src="https://res.cloudinary.com/dombq6plz/image/upload/v1777227225/ChatGPT_Image_Apr_27_2026_01_12_43_AM_1_l0xnxm.png"
                alt="Crew aboard Serenity"
                fill
                className="object-cover object-center"
              />
            </div>

            {/* LEFT BLUE DEPTH */}

            <div className="absolute inset-0 bg-gradient-to-r from-[#2D3C68]/78 via-[#2D3C68]/24 to-transparent" />

            {/* BOTTOM DEPTH */}

            <div className="absolute inset-0 bg-gradient-to-t from-[#2D3C68]/48 via-transparent to-transparent" />

            {/* FILM DEPTH */}

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.10)_100%)]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Rates() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const detailsRef = useRef(null);
  const ctaRef = useRef(null);
  const ikatRef = useRef(null);

  const ease = [0.22, 1, 0.36, 1];

  const INCLUDES = [
    "Exclusive vessel charter",
    "Ten crew, fully dedicated",
    "All meals prepared on board",
    "Diving & snorkeling equipment",
    "Water activities & island excursions",
    "Airport transfers",
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce) {
      gsap.set(
        [headerRef.current, detailsRef.current, ctaRef.current, ikatRef.current],
        { opacity: 1, y: 0, filter: "blur(0px)" }
      );
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 32, filter: "blur(10px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 1.2, ease,
          scrollTrigger: { trigger: headerRef.current, start: "top 84%" },
        }
      );

      gsap.fromTo(
        ikatRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1, opacity: 1,
          duration: 1.4, ease,
          transformOrigin: "center center",
          scrollTrigger: { trigger: ikatRef.current, start: "top 88%" },
        }
      );

      gsap.fromTo(
        detailsRef.current,
        { opacity: 0, y: 24, filter: "blur(8px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 1.1, ease,
          scrollTrigger: { trigger: detailsRef.current, start: "top 84%" },
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 1.0, ease,
          scrollTrigger: { trigger: ctaRef.current, start: "top 90%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#2D3C68] px-6 py-[100px] md:px-10 md:py-[130px]"
    >
      {/* ATMOSPHERIC BRIDGE IN */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[140px] bg-gradient-to-b from-[#1A1A1A]/10 to-transparent" />

      {/* COOL ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_45%,rgba(255,255,255,0.04),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-black/[0.08]" />

      {/* ATMOSPHERIC BRIDGE OUT */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-[120px] w-full bg-gradient-to-b from-transparent to-[#1A1A1A]/12" />

      <div className="relative mx-auto max-w-[900px]">

        {/* HEADER */}
        <div ref={headerRef} className="text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
            Charter
          </p>

          <h2 className="mt-5 font-[Gambarino] text-[42px] leading-[1.02] tracking-[-0.03em] text-[#F4F5F2] md:text-[62px]">
            Your voyage awaits.
          </h2>

          <p className="mx-auto mt-6 max-w-[520px] text-[15px] leading-[1.82] text-white/64">
            Serenity operates as an exclusive private charter —
            the entire vessel, for your group alone. Rates vary
            by season, duration, and destination.
          </p>
        </div>

        {/* SUMBA IKAT DIVIDER — titik kedua */}
        <div
          ref={ikatRef}
          className="my-14 md:my-16"
          style={{ transformOrigin: "center center" }}
        >
          <div
            className="mx-auto h-px w-[200px] opacity-[0.16]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                #F4F5F2 0px, #F4F5F2 4px,
                transparent 4px, transparent 8px,
                #B08D57 8px, #B08D57 10px,
                transparent 10px, transparent 16px,
                #F4F5F2 16px, #F4F5F2 18px,
                transparent 18px, transparent 24px
              )`,
            }}
          />
        </div>

        {/* DETAILS */}
        <div
          ref={detailsRef}
          className="grid gap-12 md:grid-cols-2 md:gap-16"
        >
          {/* CHARTER STRUCTURE */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/36">
              Charter Structure
            </p>

            <div className="mt-6 space-y-5">
              {[
                { label: "Guests", value: "Up to 12" },
                { label: "Crew", value: "10 dedicated" },
                { label: "Minimum", value: "5 nights" },
                { label: "Vessel", value: "Serenity, 40.75m" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between border-b border-white/08 pb-4"
                >
                  <span className="text-[13px] uppercase tracking-[0.16em] text-white/48">
                    {item.label}
                  </span>
                  <span className="font-[Gambarino] text-[22px] leading-none tracking-[-0.02em] text-[#F4F5F2]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* WHAT'S INCLUDED */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/36">
              Included
            </p>

            <div className="mt-6 space-y-4">
              {INCLUDES.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3"
                >
                  <div className="mt-[7px] h-px w-4 shrink-0 bg-[#B08D57]/50" />
                  <span className="text-[14px] leading-[1.72] text-white/64">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="mt-16 flex flex-col items-center gap-5 md:mt-20"
        >
          <p className="text-[13px] leading-relaxed text-white/48">
            Pricing available on inquiry.
          </p>

          <a
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full border border-white/24 bg-white/08 px-9 py-4 text-[13px] uppercase tracking-[0.22em] text-white backdrop-blur-md transition-all duration-500 hover:border-[#F4F5F2] hover:bg-[#F4F5F2] hover:text-[#2D3C68]"
          >
            Begin Your Voyage
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </a>

          <p className="text-[11px] uppercase tracking-[0.24em] text-white/32">
            hello@serenityphinisi.com
          </p>
        </div>
      </div>
    </section>
  );
}


function LifeOnBoard() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const itemARef = useRef(null);
  const itemBRef = useRef(null);
  const itemCRef = useRef(null);
  const itemDRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const nodes = [
      introRef.current,
      itemARef.current,
      itemBRef.current,
      itemCRef.current,
      itemDRef.current,
      ctaRef.current,
    ].filter(Boolean);

    const ctx = gsap.context(() => {
      if (
        DISABLE_ANIMATION ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        gsap.set(nodes, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          clearProps: "transform",
        });
        return;
      }

      nodes.forEach((node) => {
        gsap.fromTo(
          node,
          {
            opacity: 0,
            y: 36,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: node,
              start: "top 88%",
              once: true,
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
      className="relative overflow-hidden bg-[#F4F5F2] px-5 py-[90px] md:px-6 md:py-[130px]"
    >
      {/* subtle texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_20%_20%,#2D3C68_0%,transparent_34%),radial-gradient(circle_at_82%_72%,#2D3C68_0%,transparent_30%)]" />

      <div className="relative mx-auto max-w-[1320px]">
        {/* ================= HEADER ================= */}
        <div ref={introRef} className="mx-auto max-w-[760px] text-center">
          <p className="text-[11px] uppercase tracking-[0.34em] text-[#2D3C68]/56">
            Life On Board
          </p>

          <h2 className="mt-5 font-[Gambarino] text-[42px] leading-[0.98] text-[#2D3C68] md:text-[66px]">
            A day moves
            <br />
            differently here
          </h2>

          <p className="mx-auto mt-5 max-w-[540px] text-[15px] leading-relaxed text-[#2D3C68]/70 md:text-[16px]">
            There is no schedule to follow. Only a rhythm shaped naturally by
            water, shade, meals, movement, and quiet hours in between.
          </p>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="mt-14 space-y-7 md:hidden">
          {/* MORNING */}
          <div ref={itemARef} className="mr-auto w-[90%]">
            <div className="group overflow-hidden bg-white shadow-[0_22px_60px_rgba(25,35,60,0.06)]">
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068969/43_fcprng.webp"
                  alt="Morning on deck"
                  fill
                  className="object-cover transition duration-[1400ms] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-[10px] tracking-[0.18em] text-[#2D3C68]">
                  06:20
                </div>
              </div>

              <div className="px-5 py-5">
                <h3 className="font-[Gambarino] text-[30px] text-[#2D3C68]">
                  Morning
                </h3>

                <p className="mt-3 text-[14px] leading-relaxed text-[#2D3C68]/72">
                  Coffee on deck. Quiet water. Nobody needs to rush.
                </p>
              </div>
            </div>
          </div>

          {/* MIDDAY */}
          <div ref={itemBRef} className="ml-auto w-[84%]">
            <div className="group overflow-hidden bg-white shadow-[0_22px_60px_rgba(25,35,60,0.06)]">
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068973/49_ph3xr3.webp"
                  alt="Midday swim"
                  fill
                  className="object-cover transition duration-[1400ms] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-[10px] tracking-[0.18em] text-[#2D3C68]">
                  12:40
                </div>
              </div>

              <div className="px-5 py-5">
                <h3 className="font-[Gambarino] text-[30px] text-[#2D3C68]">
                  Midday
                </h3>

                <p className="mt-3 text-[14px] leading-relaxed text-[#2D3C68]/72">
                  Swim, lunch, shade — then nowhere urgent to be.
                </p>
              </div>
            </div>
          </div>

          {/* EVENING */}
          <div ref={itemCRef} className="mr-auto w-[88%]">
            <div className="group overflow-hidden bg-white shadow-[0_22px_60px_rgba(25,35,60,0.06)]">
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068892/01_oomiyy.webp"
                  alt="Evening light"
                  fill
                  className="object-cover transition duration-[1400ms] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-[10px] tracking-[0.18em] text-[#2D3C68]">
                  18:15
                </div>
              </div>

              <div className="px-5 py-5">
                <h3 className="font-[Gambarino] text-[30px] text-[#2D3C68]">
                  Evening
                </h3>

                <p className="mt-3 text-[14px] leading-relaxed text-[#2D3C68]/72">
                  Light softens. Conversations stay longer.
                </p>
              </div>
            </div>
          </div>

          {/* NIGHT */}
          <div ref={itemDRef} className="ml-auto w-[82%]">
            <div className="group overflow-hidden bg-white shadow-[0_22px_60px_rgba(25,35,60,0.06)]">
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068961/27_unvtvm.webp"
                  alt="Night cabin"
                  fill
                  className="object-cover transition duration-[1400ms] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-[10px] tracking-[0.18em] text-[#2D3C68]">
                  22:30
                </div>
              </div>

              <div className="px-5 py-5">
                <h3 className="font-[Gambarino] text-[30px] text-[#2D3C68]">
                  Night
                </h3>

                <p className="mt-3 text-[14px] leading-relaxed text-[#2D3C68]/72">
                  Cabins settle. The sea keeps moving.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="relative mt-20 hidden md:block">
          {/* timeline */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#2D3C68]/10" />

          {/* ROW 1 */}
          <div
            ref={itemARef}
            className="relative mb-10 grid grid-cols-2 items-center gap-14"
          >
            <div className="pr-10">
              <div className="ml-auto max-w-[520px] overflow-hidden bg-white shadow-[0_22px_60px_rgba(25,35,60,0.06)]">
                <div className="group relative aspect-[5/4] overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068969/43_fcprng.webp"
                    alt="Morning"
                    fill
                    className="object-cover transition duration-[1400ms] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full bg-white/92 px-3 py-1 text-[10px] tracking-[0.18em] text-[#2D3C68]">
                    06:20
                  </div>
                </div>

                <div className="px-6 py-6">
                  <h3 className="font-[Gambarino] text-[36px] text-[#2D3C68]">
                    Morning
                  </h3>

                  <p className="mt-4 text-[15px] leading-relaxed text-[#2D3C68]/72">
                    Coffee on deck. Quiet water. Nobody needs to rush.
                  </p>
                </div>
              </div>
            </div>

            <div />

            <div className="absolute left-1/2 top-[54px] h-[10px] w-[10px] -translate-x-1/2 rounded-full bg-[#2D3C68]" />
          </div>

          {/* ROW 2 */}
          <div
            ref={itemBRef}
            className="relative mb-10 grid grid-cols-2 items-center gap-14"
          >
            <div />

            <div className="pl-10">
              <div className="max-w-[520px] overflow-hidden bg-white shadow-[0_22px_60px_rgba(25,35,60,0.06)]">
                <div className="group relative aspect-[5/4] overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068973/49_ph3xr3.webp"
                    alt="Midday"
                    fill
                    className="object-cover transition duration-[1400ms] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full bg-white/92 px-3 py-1 text-[10px] tracking-[0.18em] text-[#2D3C68]">
                    12:40
                  </div>
                </div>

                <div className="px-6 py-6">
                  <h3 className="font-[Gambarino] text-[36px] text-[#2D3C68]">
                    Midday
                  </h3>

                  <p className="mt-4 text-[15px] leading-relaxed text-[#2D3C68]/72">
                    Swim, lunch, shade — then nowhere urgent to be.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute left-1/2 top-[54px] h-[10px] w-[10px] -translate-x-1/2 rounded-full bg-[#2D3C68]" />
          </div>

          {/* ROW 3 */}
          <div
            ref={itemCRef}
            className="relative mb-10 grid grid-cols-2 items-center gap-14"
          >
            <div className="pr-10">
              <div className="ml-auto max-w-[520px] overflow-hidden bg-white shadow-[0_22px_60px_rgba(25,35,60,0.06)]">
                <div className="group relative aspect-[5/4] overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068892/01_oomiyy.webp"
                    alt="Evening"
                    fill
                    className="object-cover transition duration-[1400ms] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full bg-white/92 px-3 py-1 text-[10px] tracking-[0.18em] text-[#2D3C68]">
                    18:15
                  </div>
                </div>

                <div className="px-6 py-6">
                  <h3 className="font-[Gambarino] text-[36px] text-[#2D3C68]">
                    Evening
                  </h3>

                  <p className="mt-4 text-[15px] leading-relaxed text-[#2D3C68]/72">
                    Light softens. Conversations stay longer.
                  </p>
                </div>
              </div>
            </div>

            <div />

            <div className="absolute left-1/2 top-[54px] h-[10px] w-[10px] -translate-x-1/2 rounded-full bg-[#2D3C68]" />
          </div>

          {/* ROW 4 */}
          <div
            ref={itemDRef}
            className="relative grid grid-cols-2 items-center gap-14"
          >
            <div />

            <div className="pl-10">
              <div className="max-w-[520px] overflow-hidden bg-white shadow-[0_22px_60px_rgba(25,35,60,0.06)]">
                <div className="group relative aspect-[5/4] overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068961/27_unvtvm.webp"
                    alt="Night"
                    fill
                    className="object-cover transition duration-[1400ms] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full bg-white/92 px-3 py-1 text-[10px] tracking-[0.18em] text-[#2D3C68]">
                    22:30
                  </div>
                </div>

                <div className="px-6 py-6">
                  <h3 className="font-[Gambarino] text-[36px] text-[#2D3C68]">
                    Night
                  </h3>

                  <p className="mt-4 text-[15px] leading-relaxed text-[#2D3C68]/72">
                    Cabins settle. The sea keeps moving.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute left-1/2 top-[54px] h-[10px] w-[10px] -translate-x-1/2 rounded-full bg-[#2D3C68]" />
          </div>
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="mt-14 flex justify-center md:mt-20"
        >
          <a
            href="/experiences"
            className="inline-flex items-center gap-3 rounded-full border border-[#2D3C68]/14 px-7 py-3 text-[12px] uppercase tracking-[0.22em] text-[#2D3C68] transition duration-300 hover:border-[#2D3C68] hover:bg-[#2D3C68] hover:text-white"
          >
            Explore The Experience
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function ExperienceDay() {
  const sectionRef = useRef(null);
  const navLineRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const states = gsap.utils.toArray(".serenity-state");

      if (reduce || DISABLE_ANIMATION) {
        gsap.set(states[0], { autoAlpha: 1, scale: 1 });
        gsap.set(states.slice(1), { autoAlpha: 0 });
        return;
      }

      gsap.set(states, { autoAlpha: 0, scale: 1.03 });
      gsap.set(states[0], { autoAlpha: 1, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=5000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const switchState = (from, to, x) => {
        tl.to(states[from], {
          autoAlpha: 0,
          scale: 1.05,
          duration: 0.9,
          ease: "power2.out",
        });

        tl.fromTo(
          states[to],
          {
            autoAlpha: 0,
            scale: 1.08,
          },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          },
          "<"
        );

        tl.to(
          navLineRef.current,
          {
            x,
            duration: 1,
            ease: "power3.out",
          },
          "<"
        );
      };

      switchState(0, 1, "100%");
      switchState(1, 2, "200%");
      switchState(2, 3, "300%");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const data = [
    {
      step: "01",
      label: "Morning Quiet",
      title: "Wake to open water",
      desc: "Coffee on deck while the islands are still silent.",
      sub: "No alarms. No agenda. Just morning at sea.",
      bg:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068961/27_unvtvm.webp",
      gallery: [
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068892/01_oomiyy.webp",
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068969/43_fcprng.webp",
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068973/49_ph3xr3.webp",
      ],
    },
    {
      step: "02",
      label: "Midday Open Sea",
      title: "Swim until hunger returns",
      desc: "Salt skin, clear water, sun overhead.",
      sub: "Lunch is already being prepared upstairs.",
      bg:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776152590/Phinisi_yacht_and_vibrant_coral_reef_1_i59pqn.png",
      gallery: [
        "https://res.cloudinary.com/dombq6plz/image/upload/v1777295006/ChatGPT_Image_Apr_27_2026_07_43_23_PM_hynjkg.png",
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068973/49_ph3xr3.webp",
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/04_fqtqkn.webp",
      ],
    },
    {
      step: "03",
      label: "Sunset Table",
      title: "Dinner as the sky turns gold",
      desc: "Stories stretch longer than the meal.",
      sub: "Nobody checks the time anymore.",
      bg:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068969/43_fcprng.webp",
      gallery: [
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068892/01_oomiyy.webp",
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068973/49_ph3xr3.webp",
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/07_iujxr6.webp",
      ],
    },
    {
      step: "04",
      label: "Night Drift",
      title: "Sleep with the sea outside",
      desc: "Cabin lights dim. Timber breathes softly.",
      sub: "The water keeps moving through the dark.",
      bg:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/07_iujxr6.webp",
      gallery: [
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068961/27_unvtvm.webp",
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/04_fqtqkn.webp",
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068969/43_fcprng.webp",
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {data.map((item, i) => (
        <div
          key={i}
          className="serenity-state absolute inset-0"
        >
          {/* BG */}
          <img
            src={item.bg}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* overlays */}
          <div className="absolute inset-0 bg-black/38" />

          <div
            className="absolute inset-0 hidden md:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,.72) 0%, rgba(0,0,0,.52) 34%, rgba(0,0,0,.12) 68%, rgba(0,0,0,0) 100%)",
            }}
          />

          <div
            className="absolute inset-0 md:hidden"
            style={{
              background:
                "linear-gradient(0deg, rgba(0,0,0,.82) 0%, rgba(0,0,0,.42) 42%, rgba(0,0,0,.06) 100%)",
            }}
          />

          {/* DESKTOP */}
          <div className="relative z-10 hidden h-full md:grid grid-cols-[1.08fr_0.92fr]">
            {/* LEFT COPY */}
            <div className="flex items-center px-14">
              <div className="max-w-[520px] text-white pb-10">
                <p className="text-[11px] uppercase tracking-[0.34em] text-white/52">
                  {item.step} · {item.label}
                </p>

                <h2 className="mt-5 font-[Gambarino] text-[68px] leading-[0.94]">
                  {item.title}
                </h2>

                <p className="mt-6 max-w-[460px] text-[18px] leading-[1.7] text-white/84">
                  {item.desc}
                </p>

                <p className="mt-4 max-w-[430px] text-[14px] leading-[1.8] text-white/58">
                  {item.sub}
                </p>
              </div>
            </div>

            {/* RIGHT GALLERY */}
            <div className="flex items-center justify-center px-12">
              <div className="grid w-full max-w-[430px] grid-cols-2 gap-4">
                <div className="col-span-2 overflow-hidden rounded-[8px] border border-white/10">
                  <img
                    src={item.gallery[0]}
                    className="h-[250px] w-full object-cover"
                  />
                </div>

                <div className="overflow-hidden rounded-[8px] border border-white/10">
                  <img
                    src={item.gallery[1]}
                    className="h-[145px] w-full object-cover"
                  />
                </div>

                <div className="overflow-hidden rounded-[8px] border border-white/10">
                  <img
                    src={item.gallery[2]}
                    className="h-[145px] w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE */}
          <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-28 md:hidden">
            <div className="mb-5 grid grid-cols-3 gap-2">
              {item.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden rounded-[4px] border border-white/10"
                >
                  <img
                    src={img}
                    className="h-[82px] w-full object-cover"
                  />
                </div>
              ))}
            </div>

            <p className="text-[10px] uppercase tracking-[0.32em] text-white/52">
              {item.step} · {item.label}
            </p>

            <h2 className="mt-4 font-[Gambarino] text-[40px] leading-[0.98] text-white">
              {item.title}
            </h2>

            <p className="mt-4 text-[15px] leading-[1.7] text-white/82">
              {item.desc}
            </p>

            <p className="mt-3 text-[13px] leading-[1.7] text-white/58">
              {item.sub}
            </p>
          </div>
        </div>
      ))}

      {/* NAV */}
      <div className="absolute bottom-0 left-0 z-30 w-full border-t border-white/10 bg-black/30 backdrop-blur-md">
        <div className="relative grid grid-cols-4 px-4 md:px-10">
          {data.map((item, i) => (
            <div
              key={i}
              className="py-5 md:py-6"
            >
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/34">
                {item.step}
              </p>

              <p className="mt-3 text-[11px] md:text-[16px] text-white/92">
                {item.label}
              </p>
            </div>
          ))}

          <div
            ref={navLineRef}
            className="absolute bottom-0 left-0 h-[2px] w-[25%] bg-white"
          />
        </div>
      </div>
    </section>
  );
}

function Yacht2() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F4F5F2]">
      {/* IMAGE */}
      <div className="relative w-full">
        <img
          src="https://res.cloudinary.com/dombq6plz/image/upload/v1777389953/ChatGPT_Image_Apr_28_2026_09_00_39_PM_swvmte.png"
          alt="Phinisi yacht sailing across eastern Indonesia"
          className="block w-full h-auto"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-black/6 to-white/8" />

        {/* CONTENT */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between px-6 py-8 md:px-10 md:py-10">
          {/* TOP */}
          <div className="flex justify-center">
            <p className="text-center text-[10px] uppercase tracking-[0.32em] text-white/72 md:text-[11px]">
              The Yacht
            </p>
          </div>

          {/* BOTTOM */}
          <div className="mx-auto w-full max-w-[1240px]">
            <div className="max-w-[620px] pb-2 md:pb-4">
              <h2 className="font-[Gambarino] text-[44px] leading-[0.94] text-white md:text-[76px]">
                Small in frame.
                <br />
                Vast in feeling.
              </h2>

              <p className="mt-5 max-w-[430px] text-[14px] leading-relaxed text-white/78 md:text-[15px]">
                A private phinisi built to move quietly through waters most
                people never reach.
              </p>

              <div className="mt-7">
                <a
                  href="/yacht"
                  className="inline-flex items-center gap-3 rounded-full border border-white/22 bg-white/10 px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-white backdrop-blur-md transition duration-300 hover:bg-white hover:text-[#152541]"
                >
                  Explore The Yacht
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Activities() {
  return (
    <section className="relative w-full h-[110vh] overflow-hidden bg-[#F4F5F2]">

      {/* ===== MAIN SCENE ===== */}
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/dombq6plz/image/upload/v1776152590/Phinisi_yacht_and_vibrant_coral_reef_1_i59pqn.png"
          alt="People jumping and swimming around yacht"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/10" />

        {/* SIGNATURE BLUE */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D3C68]/55 via-[#2D3C68]/15 to-transparent" />
      </div>

      {/* ===== FLOATING ELEMENTS ===== */}

      {/* LEFT MID — WATER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute left-[12%] top-[45%] w-[240px]"
      >
        <div className="aspect-[4/5] relative overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.25)]">

          <Image
            src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031031/ChatGPT_Image_Apr_1_2026_03_08_05_PM_nsfruu.png"
            alt="Swimming near the yacht"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[#2D3C68]/10" />

          {/* LABEL */}
          <div className="absolute bottom-3 left-3 text-[11px] text-white/85 tracking-wide">
            In the water
          </div>
        </div>
      </motion.div>

      {/* RIGHT TOP — FLOAT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute right-[6%] top-[12%] w-[260px]"
      >
        <div className="aspect-[4/5] relative overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.25)]">

          <Image
            src="https://res.cloudinary.com/dombq6plz/image/upload/v1775720934/Floating_in_turquoise_serenity_pu8zqp.png"
            alt="Floating near the boat"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[#2D3C68]/8" />

          <div className="absolute bottom-3 left-3 text-[11px] text-white/85 tracking-wide">
            Just floating
          </div>
        </div>
      </motion.div>

      {/* RIGHT BOTTOM — DECK */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute right-[18%] bottom-[18%] w-[250px]"
      >
        <div className="aspect-[4/5] relative overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.25)]">

          <Image
            src="https://res.cloudinary.com/dombq6plz/image/upload/v1775720934/Stepping_onto_the_sunlit_deck_wmgyua.png"
            alt="Relaxing on deck"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[#2D3C68]/10" />

          <div className="absolute bottom-3 left-3 text-[11px] text-white/85 tracking-wide">
            On deck
          </div>
        </div>
      </motion.div>

      {/* ===== CONTENT (REPOSITIONED — CENTER LEFT) ===== */}
      <div className="relative z-10 h-full flex items-center px-6 md:px-12">
        <div className="max-w-[520px] text-white">

          <p className="text-[10px] tracking-[0.35em] text-white/60 uppercase">
            On Board
          </p>

          <h2 className="mt-4 font-[Gambarino] text-[44px] md:text-[64px] leading-[1.05]">
            What you end up doing
          </h2>

          <p className="mt-5 text-[15px] text-white/85 leading-relaxed">
            Jump into the water, swim around the boat, or just float nearby.

            Stay on deck when you feel like it, move around, or do nothing at all.

            Food comes out, people gather, then drift off again.

            There’s no set plan, but there’s always something happening.
          </p>

        </div>
      </div>

    </section>
  );
}


function Included() {
  return (
    <section className="relative w-full bg-[#F4F5F2] py-[180px] px-6">

      <div className="max-w-[1100px] mx-auto">

        {/* ===== HEADER ===== */}
        <div className="max-w-[520px] mb-24">
          <p className="text-[10px] tracking-[0.35em] text-[#2D3C68]/55 uppercase">
            What’s Included
          </p>

          <h2 className="mt-4 font-[Gambarino] text-[44px] md:text-[60px] leading-[1.1] text-[#2D3C68]">
            Everything you’ll actually use
          </h2>
        </div>

        {/* ===== PRIMARY (ANCHOR) ===== */}
        <div className="max-w-[620px] mb-28">
          <h3 className="font-[Gambarino] text-[32px] text-[#1A1A1A] leading-[1.2]">
            Meals on board
          </h3>

          <p className="mt-5 text-[17px] text-[#2D3C68]/75 leading-relaxed">
            Food comes out while people are already sitting around.
            You eat, stay a bit longer, then slowly drift away.
          </p>
        </div>

        {/* ===== SECONDARY GRID ===== */}
        <div className="grid md:grid-cols-2 gap-x-20 gap-y-20 max-w-[900px]">

          <div>
            <h3 className="font-[Gambarino] text-[22px] text-[#1A1A1A]">
              Crew & navigation
            </h3>
            <p className="mt-3 text-[14px] text-[#2D3C68]/70 leading-relaxed">
              Routes, anchoring, and timing are handled quietly in the background.
            </p>
          </div>

          <div>
            <h3 className="font-[Gambarino] text-[22px] text-[#1A1A1A]">
              Water access
            </h3>
            <p className="mt-3 text-[14px] text-[#2D3C68]/70 leading-relaxed">
              You can get in anytime. No setup, no waiting.
            </p>
          </div>

          <div>
            <h3 className="font-[Gambarino] text-[22px] text-[#1A1A1A]">
              The space is yours
            </h3>
            <p className="mt-3 text-[14px] text-[#2D3C68]/70 leading-relaxed">
              Move between deck, cabins, and water without thinking twice.
            </p>
          </div>

          <div>
            <h3 className="font-[Gambarino] text-[22px] text-[#1A1A1A]">
              Flexible flow
            </h3>
            <p className="mt-3 text-[14px] text-[#2D3C68]/70 leading-relaxed">
              The day doesn’t follow a plan. It just unfolds.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}


function OnBoard() {
  return (
    <section className="relative py-[160px] px-6 bg-[#EFEAE4] overflow-hidden">

      {/* HARD BREAK (TIPIS AJA, JANGAN KEBANGETAN) */}
      <div className="absolute top-0 left-0 w-full h-[80px] bg-[#F4F5F2]" />

      {/* VERY SUBTLE TEXTURE */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dombq6plz/image/upload/v1775052779/ChatGPT_Image_Apr_1_2026_09_05_54_PM_asniqb.png')",
          backgroundSize: "cover",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto">

        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-16 items-center">

          {/* LEFT */}
          <div className="relative h-[560px] overflow-hidden">
            <img
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031029/ChatGPT_Image_Apr_1_2026_03_07_46_PM_hvigtv.png"
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-12 left-12 text-white max-w-[280px]">
              <p className="text-[11px] tracking-[0.35em] uppercase text-white/70">
                On Board
              </p>

              <h3 className="mt-4 font-[Gambarino] text-[30px] leading-[1.15]">
                Thoughtfully prepared,
                <br />
                quietly delivered
              </h3>
            </div>
          </div>

          {/* RIGHT */}
          <div>

            <div className="max-w-[420px]">
              <p className="text-[11px] tracking-[0.35em] text-[#8B6A4F] uppercase">
                The Experience
              </p>

              <h2 className="mt-5 font-[Gambarino] text-[38px] md:text-[48px] leading-[1.15] text-[#1A1A1A]">
                The people behind each moment
              </h2>

              <p className="mt-7 text-[16px] text-[#5A5A5A] leading-[1.7]">
                Every detail on board is shaped with intention — from how meals
                are prepared to how each space is quietly maintained throughout
                your journey.
              </p>
            </div>

            <div className="mt-10 relative h-[260px] overflow-hidden">
              <img
                src="https://res.cloudinary.com/dombq6plz/image/upload/v1775644328/Solitary_phinisi_yacht_at_dawn_beafzc.png"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-8">
              <button className="text-[13px] text-[#1A1A1A] border-b border-[#8B6A4F]/40 hover:border-[#8B6A4F] transition">
                Learn more about the experience →
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

function GalleryStrip() {
  const containerRef = useRef(null);

  const images = [
    "https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_24_PM_lzlhwx.png",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_18_PM_dihjfs.png",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_06_38_PM_hqx36m.png",
    "https://res.cloudinary.com/dombq66plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_15_PM_otnwp1.png",
  ];

  return (
    <section className="relative py-[140px] overflow-hidden">

      {/* ================= SOFT BACKGROUND ================= */}
      <div className="absolute inset-0 bg-[#F7F4EF]" /> 

      {/* ================= CONTENT ================= */}
      <div className="relative z-10">

        {/* HEADER */}
        <div className="max-w-[900px] mx-auto px-6 mb-20 text-center">

          <p className="text-[11px] tracking-[0.35em] text-[#8B6A4F] uppercase">
            Moments
          </p>

          <h2 className="mt-5 text-[42px] md:text-[56px] leading-[1.15] text-[#1A1A1A] font-[Gambarino]">
            Life, as it unfolds at sea
          </h2>

          <p className="mt-6 text-[16px] text-[#5A5A5A] max-w-[520px] mx-auto leading-[1.7]">
            A collection of quiet moments, shared spaces, and the rhythm of days spent on the water.
          </p>

        </div>

        {/* STRIP */}
        <div
          ref={containerRef}
          className="flex gap-8 overflow-x-auto px-6 no-scrollbar"
        >

          {images.map((src, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-[80vw] md:w-[520px] h-[320px] overflow-hidden rounded-[6px]"
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover transition duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:brightness-[0.96]"
              />
            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <button className="text-[13px] tracking-[0.18em] uppercase text-[#1A1A1A] border-b border-[#8B6A4F]/40 hover:border-[#8B6A4F] transition">
            View Full Gallery
          </button>
        </div>

      </div>

      {/* HIDE SCROLLBAR */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      quote:
        "We thought we’d go out a lot, but most of the time we just stayed on the boat. No one really felt like leaving.",
      trip: "Bali & Nusa Penida",
      date: "May 2025",
      author: "A. Williams",
      country: "USA",
    },
    {
      quote:
        "At some point we stopped checking time. People were just moving around, eating, swimming, then sitting again.",
      trip: "Raja Ampat",
      date: "June 2025",
      author: "L. Moreau",
      country: "France",
    },
    {
      quote:
        "Nothing big happened, but that’s kind of why it worked. We just stayed, talked, and let the day pass.",
      trip: "Banda Islands",
      date: "July 2025",
      author: "D. Tanaka",
      country: "Japan",
    },
  ];

  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const current = testimonials[index];

  return (
    <section className="relative bg-[#F4F5F2] py-[160px] px-6">

      <div className="max-w-[1100px] mx-auto">

        {/* ===== TOP LINE ===== */}
        <div className="flex items-center justify-between mb-16">

          <p className="text-[10px] tracking-[0.35em] text-[#2D3C68]/55 uppercase">
            Testimonials
          </p>

          <div className="text-[11px] text-[#2D3C68]/40 tracking-[0.25em]">
            {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </div>

        </div>

        {/* ===== MAIN ===== */}
        <div className="max-w-[760px]">

          <p className="font-[Gambarino] text-[26px] md:text-[34px] leading-[1.45] text-[#1A1A1A]">
            “{current.quote}”
          </p>

          <div className="mt-10 text-[13px] text-[#2D3C68]/60">
            {current.trip} — {current.date}
          </div>

          <div className="mt-1 text-[13px] text-[#1A1A1A]">
            {current.author}, {current.country}
          </div>

        </div>

        {/* ===== NAV INLINE (NO FIXED BS) ===== */}
        <div className="mt-20 flex gap-6">

          <button
            onClick={prev}
            className="text-[13px] text-[#2D3C68]/40 hover:text-[#2D3C68] transition"
          >
            ← Previous
          </button>

          <button
            onClick={next}
            className="text-[13px] text-[#2D3C68]/40 hover:text-[#2D3C68] transition"
          >
            Next →
          </button>

        </div>

      </div>
    </section>
  );
}

function SerenityTestimonials() {
  
const EASE = [0.22, 1, 0.36, 1];
 
const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "We've chartered yachts before. This was different. By day two, we stopped checking our phones. By day four, we didn't want to leave.",
    name: "Sarah & Tom",
    origin: "London, UK",
    trip: "Raja Ampat · 7 nights",
  },
  {
    id: 2,
    quote:
      "The crew knew when to disappear and when to appear. That balance is almost impossible to find. Serenity has it.",
    name: "Marcus L.",
    origin: "Sydney, AU",
    trip: "Labuan Bajo · 5 nights",
  },
  {
    id: 3,
    quote:
      "Not a hotel. Not a tour. Something that felt genuinely ours — the route, the pace, the meals. All of it.",
    name: "Isabelle & Remy",
    origin: "Paris, FR",
    trip: "Komodo · 6 nights",
  },
  {
    id: 4,
    quote:
      "I've traveled a lot. Serenity is the first time the journey itself was the destination — not the stops along the way.",
    name: "David K.",
    origin: "New York, US",
    trip: "Raja Ampat · 10 nights",
  },
];
  const sectionRef  = useRef(null);
  const headlineRef = useRef(null);
  const lineRef     = useRef(null);
  const isInView    = useInView(sectionRef, { once: true, margin: "-10%" });
  const [active, setActive] = useState(0);
  const [dir, setDir]       = useState(1);
 
  const go = (idx) => {
    setDir(idx > active ? 1 : -1);
    setActive(idx);
  };
 
  const prev = () => go(active === 0 ? TESTIMONIALS.length - 1 : active - 1);
  const next = () => go(active === TESTIMONIALS.length - 1 ? 0 : active + 1);
 
  // ── GSAP — headline line stagger on scroll ──
  useEffect(() => {
    if (!headlineRef.current) return;
    const ctx = gsap.context(() => {
      const lines = headlineRef.current.querySelectorAll(".line");
      gsap.fromTo(
        lines,
        { opacity: 0, y: 32, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.3,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 82%",
          },
        }
      );
 
      // line draw
      gsap.fromTo(
        lineRef.current,
        { width: "0px", opacity: 0 },
        {
          width: "40px",
          opacity: 0.35,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 82%",
          },
        }
      );
    }, sectionRef);
 
    return () => ctx.revert();
  }, []);
 
  const variants = {
    enter: (d) => ({ opacity: 0, x: d * 40, filter: "blur(6px)" }),
    center: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
    exit: (d) => ({ opacity: 0, x: d * -40, filter: "blur(6px)", transition: { duration: 0.5, ease: EASE } }),
  };
 
  const t = TESTIMONIALS[active];
 
  return (
    <section
      ref={sectionRef}
      style={{
        background: "#F4F5F2",
        paddingTop: "120px",
        paddingBottom: "120px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=Switzer:wght@300;400&display=swap');
 
        :root {
          --color-primary: #2D3C68;
          --color-base:    #F4F5F2;
          --color-dark:    #1A1A1A;
          --brass:         #B08D57;
        }
 
        .fg  { font-family: 'Cormorant Garamond', serif; }
        .fsw { font-family: 'Switzer', sans-serif; }
 
        .nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(45,60,104,0.20);
          background: transparent;
          color: rgba(45,60,104,0.60);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.4s ease, background 0.4s ease, color 0.4s ease;
        }
        .nav-btn:hover {
          border-color: #2D3C68;
          background: #2D3C68;
          color: #F4F5F2;
        }
 
        .dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(45,60,104,0.20);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: background 0.4s ease, transform 0.4s ease;
        }
        .dot.active {
          background: #2D3C68;
          transform: scale(1.3);
        }
      `}</style>
 
      {/* ── SUBTLE TOP TRANSITION ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to bottom, rgba(45,60,104,0.06) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
 
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
 
        {/* ── HEADER ── */}
        <div style={{ marginBottom: "72px" }}>
 
          {/* Micro label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.1, ease: EASE }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "28px",
            }}
          >
            <div
              ref={lineRef}
              style={{
                height: "1px",
                background: "rgba(45,60,104,0.35)",
                width: 0,
              }}
            />
            <span
              className="fsw"
              style={{
                fontSize: "10px",
                letterSpacing: "0.32em",
                color: "rgba(45,60,104,0.40)",
                textTransform: "uppercase",
              }}
            >
              From Our Guests
            </span>
          </motion.div>
 
          {/* H2 — 56px, 100% opacity, Gambarino, token compliant */}
          <h2
            ref={headlineRef}
            className="fg"
            style={{
              fontSize: "56px",          // within H2 token: 52–64px
              fontWeight: 300,
              color: "#2D3C68",          // primary token, 100% opacity
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            <span className="line" style={{ display: "block", fontStyle: "italic" }}>
              Those who were
            </span>
            <span
              className="line"
              style={{
                display: "block",
                fontStyle: "normal",
                paddingLeft: "56px",   // tension offset
              }}
            >
              there.
            </span>
          </h2>
        </div>
 
        {/* ── TESTIMONIAL CARD ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
        >
 
          {/* LEFT — quote ── */}
          <div style={{ position: "relative", minHeight: "280px" }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={t.id}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ position: "absolute", top: 0, left: 0, right: 0 }}
              >
                {/* Opening mark */}
                <span
                  className="fg"
                  style={{
                    fontSize: "96px",
                    fontWeight: 300,
                    fontStyle: "italic",
                    color: "rgba(45,60,104,0.10)",
                    lineHeight: 0.8,
                    display: "block",
                    marginBottom: "16px",
                    marginLeft: "-8px",
                  }}
                >
                  "
                </span>
 
                {/* Quote — H3 range, Gambarino italic */}
                <blockquote
                  className="fg"
                  style={{
                    fontSize: "28px",        // H3 token: 26–32px
                    fontWeight: 300,
                    fontStyle: "italic",
                    color: "#1A1A1A",         // 100% — headline rule
                    lineHeight: 1.45,
                    letterSpacing: "-0.01em",
                    margin: 0,
                  }}
                >
                  {t.quote}
                </blockquote>
 
                {/* Attribution */}
                <div
                  style={{
                    marginTop: "32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <span
                    className="fsw"
                    style={{
                      fontSize: "13px",
                      fontWeight: 400,
                      color: "rgba(26,26,26,0.80)",  // 80% body token
                      letterSpacing: "0.02em",
                    }}
                  >
                    {t.name}
                  </span>
                  <span
                    className="fsw"
                    style={{
                      fontSize: "11px",
                      color: "rgba(26,26,26,0.40)",  // 40% meta token
                      letterSpacing: "0.06em",
                    }}
                  >
                    {t.origin} · {t.trip}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
 
          {/* RIGHT — navigation + counter ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "280px",
              alignItems: "flex-end",
            }}
          >
 
            {/* Counter — large Gambarino */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1.0, delay: 0.4, ease: EASE }}
              style={{ textAlign: "right" }}
            >
              <span
                className="fg"
                style={{
                  fontSize: "88px",        // H1 range — used as display number
                  fontWeight: 300,
                  color: "rgba(45,60,104,0.08)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  fontStyle: "italic",
                  display: "block",
                }}
              >
                {String(active + 1).padStart(2, "0")}
              </span>
              <span
                className="fsw"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.28em",
                  color: "rgba(45,60,104,0.30)",
                  textTransform: "uppercase",
                }}
              >
                of {String(TESTIMONIALS.length).padStart(2, "0")}
              </span>
            </motion.div>
 
            {/* Dots + nav buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.55, ease: EASE }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "24px",
              }}
            >
              {/* Dots */}
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    className={`dot${i === active ? " active" : ""}`}
                    onClick={() => go(i)}
                  />
                ))}
              </div>
 
              {/* Prev / Next */}
              <div style={{ display: "flex", gap: "12px" }}>
                <button className="nav-btn" onClick={prev} aria-label="Previous">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button className="nav-btn" onClick={next} aria-label="Next">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </motion.div>
 
          </div>
        </div>
 
        {/* ── DIVIDER + STATS STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.7, ease: EASE }}
          style={{
            marginTop: "80px",
            paddingTop: "40px",
            borderTop: "1px solid rgba(45,60,104,0.10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {[
            { v: "100%", l: "Return interest" },
            { v: "4.9",  l: "Average rating"  },
            { v: "12",   l: "Guests max"       },
            { v: "2",    l: "Destinations"     },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span
                className="fg"
                style={{
                  fontSize: "32px",
                  fontWeight: 300,
                  color: "#2D3C68",
                  lineHeight: 1,
                }}
              >
                {s.v}
              </span>
              <span
                className="fsw"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.26em",
                  color: "rgba(45,60,104,0.40)",
                  textTransform: "uppercase",
                }}
              >
                {s.l}
              </span>
            </div>
          ))}
        </motion.div>
 
      </div>
    </section>
  );
}

function Closing() {
  const sectionRef = useRef(null);

  const imageRef = useRef(null);

  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (!sectionRef.current || !imageRef.current)
        return;

      const rect =
        sectionRef.current.getBoundingClientRect();

      const windowH = window.innerHeight;

      /*
        ========================================
        SUBTLE PARALLAX
        ========================================
      */

      const progress = rect.top / windowH;

      const translateY =
        progress * -24;

      imageRef.current.style.transform =
        `translateY(${translateY}px) scale(1.045)`;
    };

    const onScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        handleScroll();

        rafId = null;
      });
    };

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );

      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        min-h-[76vh]
        w-full
        overflow-hidden
        bg-[#0F1728]
        md:min-h-[82vh]
      "
    >
      {/* ========================================= */}
      {/* BACKGROUND */}
      {/* ========================================= */}

      <div className="absolute inset-0 overflow-hidden">
        {/* IMAGE */}

        <img
          ref={imageRef}
          src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/06_f2yr7e.webp"
          alt="Serenity Yacht in Indonesian waters"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            will-change-transform
          "
          style={{
            transform: "scale(1.045)",
          }}
        />

        {/* ========================================= */}
        {/* ATMOSPHERIC OVERLAYS */}
        {/* ========================================= */}

        <div className="absolute inset-0 bg-[#09111D]/24" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/[0.08] via-black/[0.14] to-[#09111D]/62" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#23385F]/14 via-transparent to-transparent" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_22%,rgba(176,141,87,0.08),transparent_34%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_72%,rgba(255,255,255,0.03),transparent_40%)]" />

        {/* ========================================= */}
        {/* FILM GRAIN */}
        {/* ========================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.045]
            mix-blend-soft-light
          "
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />

        {/* ========================================= */}
        {/* TOP ATMOSPHERIC BRIDGE */}
        {/* ========================================= */}

        <div className="absolute inset-x-0 top-0 h-[180px] bg-gradient-to-b from-[#F4F5F2]/[0.05] to-transparent" />
      </div>

      {/* ========================================= */}
      {/* CONTENT */}
      {/* ========================================= */}

      <div
        className="
          relative
          z-10
          flex
          min-h-[76vh]
          items-center
          justify-center
          px-6
          py-24
          md:min-h-[82vh]
          md:px-10
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-[820px]
            flex-col
            items-center
            text-center
          "
        >
          {/* ========================================= */}
          {/* LABEL */}
          {/* ========================================= */}

          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.38em]
              text-white/50
              md:text-[11px]
            "
          >
            Reservations
          </p>

          {/* ========================================= */}
          {/* HEADLINE */}
          {/* ========================================= */}

          <h2
            className="
              mt-7
              max-w-[760px]
              font-[Gambarino]
              text-[40px]
              leading-[1.06]
              tracking-[-0.045em]
              text-[#F4F5F2]
              md:text-[58px]
              lg:text-[64px]
            "
          >
            When you’re ready,
            <br />
            the sea is still here.
          </h2>

          {/* ========================================= */}
          {/* IKAT DIVIDER */}
          {/* ========================================= */}

          <div className="mt-8">
            <div
              className="
                h-px
                w-[160px]
                opacity-[0.18]
              "
              style={{
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  rgba(255,255,255,0.9) 0px,
                  rgba(255,255,255,0.9) 4px,
                  transparent 4px,
                  transparent 8px,
                  rgba(176,141,87,0.9) 8px,
                  rgba(176,141,87,0.9) 10px,
                  transparent 10px,
                  transparent 16px
                )`,
              }}
            />
          </div>

          {/* ========================================= */}
          {/* BODY */}
          {/* ========================================= */}

          <p
            className="
              mx-auto
              mt-8
              max-w-[560px]
              text-[15px]
              leading-[1.95]
              text-white/72
              md:text-[16px]
            "
          >
            Private journeys through Komodo,
            Raja Ampat, and the eastern Indonesian
            archipelago aboard a handcrafted
            phinisi designed for only twelve
            guests.
          </p>

          {/* ========================================= */}
          {/* CTA */}
          {/* ========================================= */}

          <div
            className="
              mt-11
              flex
              flex-col
              items-center
              justify-center
              gap-4
              md:flex-row
            "
          >
            {/* PRIMARY */}

            <a
              href="/rates-and-schedule"
              className="
                group
                inline-flex
                min-w-[230px]
                items-center
                justify-center
                gap-3
                rounded-full
                bg-[#F4F5F2]
                px-8
                py-[14px]
                text-[11px]
                uppercase
                tracking-[0.22em]
                text-[#16233B]
                transition-all
                duration-500
                hover:bg-white
                hover:scale-[1.015]
              "
            >
              Request Availability

              <span
                className="
                  transition-transform
                  duration-500
                  group-hover:translate-x-[2px]
                "
              >
                →
              </span>
            </a>

            {/* SECONDARY */}

            <a
              href="/destinations"
              className="
                group
                inline-flex
                min-w-[230px]
                items-center
                justify-center
                gap-3
                rounded-full
                border
                border-white/[0.16]
                bg-white/[0.03]
                px-8
                py-[14px]
                text-[11px]
                uppercase
                tracking-[0.22em]
                text-white/84
                backdrop-blur-[8px]
                transition-all
                duration-500
                hover:border-white/[0.32]
                hover:bg-white/[0.06]
                hover:text-white
              "
            >
              Explore Journeys

              <span
                className="
                  transition-transform
                  duration-500
                  group-hover:translate-x-[2px]
                "
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* LOWER META BAR */}
      {/* ========================================= */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-20
          border-t
          border-white/[0.08]
          px-6
          py-5
          md:px-10
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-[1440px]
            flex-col
            gap-3
            text-[10px]
            uppercase
            tracking-[0.24em]
            text-white/34
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div>Indonesia Archipelago</div>

          <div>
            Quiet journeys across Raja Ampat and Komodo
          </div>

          <div>Serenity Yacht</div>
        </div>
      </div>
    </section>
  );
}

function Social() {
  const posts = [
    "https://res.cloudinary.com/dombq6plz/image/upload/v1776068957/29_dychc2.webp",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1776068955/21_pdqnqq.webp",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1776068953/19_1_mwv93q.webp",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/08_noz6qg.webp",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/05_ec1k9n.webp",
  ];

  return (
    <section className="relative py-[120px] px-6 bg-[#F4F5F2]">

      <div className="max-w-[1200px] mx-auto">

        {/* ===== HEADER ===== */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">

          {/* LEFT — LABEL + HANDLE */}
          <div>
            <p className="text-[11px] tracking-[0.35em] text-[#2D3C68]/50 uppercase">
              Instagram
            </p>

            <a
              href="https://www.instagram.com/serenity.yacht/"
              target="_blank"
              className="mt-3 inline-block text-[16px] text-[#2D3C68] hover:opacity-70 transition"
            >
              @serenity.yacht
            </a>
          </div>

          {/* RIGHT — CTA */}
          <a
            href="https://www.instagram.com/serenity.yacht/"
            target="_blank"
            className="group text-[12px] tracking-[0.18em] uppercase text-[#2D3C68] border-b border-[#2D3C68]/30 hover:border-[#2D3C68] transition pb-[2px]"
          >
            Follow
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>

        </div>

        {/* ===== STRIP ===== */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar">

          {posts.map((src, i) => (
            <a
              key={i}
              href="https://www.instagram.com/serenity.yacht/"
              target="_blank"
              className="flex-shrink-0 w-[220px] md:w-[260px] aspect-[4/5] overflow-hidden"
            >
              <img
                src={src}
                className="w-full h-full object-cover"
              />
            </a>
          ))}

        </div>

      </div>

      {/* HIDE SCROLLBAR */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

    </section>
  );
}

function YachtSection() {
  return (
    <section className="relative bg-[#F4F5F2] py-[200px] overflow-hidden">

      {/* ================= BACKGROUND DEPTH ================= */}
      <div className="absolute inset-0 pointer-events-none">

        {/* radial depth kiri */}
        <div className="absolute left-[-10%] top-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,0,0,0.06),transparent_70%)] blur-[80px]" />

        {/* radial depth kanan */}
        <div className="absolute right-[-10%] bottom-[5%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,0,0,0.06),transparent_70%)] blur-[80px]" />

        {/* subtle noise */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply">
          <div className="w-full h-full bg-[radial-gradient(circle_at_30%_30%,#000,transparent_60%)]" />
        </div>

      </div>

      {/* ================= HEADER ================= */}
      <div className="relative z-10 text-center mb-[160px] px-6">

        <p className="text-[11px] tracking-[0.35em] text-[#6A6A6A] uppercase">
          Spaces
        </p>

        <h2 className="mt-5 font-[Gambarino] text-[56px] md:text-[68px] leading-[1.05] text-[#1A1A1A]">
          Life Across the Yacht
        </h2>

        <p className="mt-6 max-w-[620px] mx-auto text-[15px] text-[#5C5C5C] leading-[1.75]">
          Movement flows naturally across the yacht, from open areas exposed to the sea,
          to shared spaces shaped by daily rhythm, and quieter sections designed for rest.
        </p>

      </div>

      {/* ================= MAIN ================= */}
      <div className="relative z-10 max-w-[1300px] mx-auto px-6">

        {/* ================= GRID STRUCTURE ================= */}
        <div className="grid grid-cols-12 gap-10 items-center">

          {/* ================= LEFT ================= */}
          <div className="col-span-3 hidden md:block">

            <div className="space-y-20">

              <div>
                <p className="text-[12px] tracking-[0.25em] text-[#2D3C68]/40 uppercase">
                  01
                </p>
                <p className="mt-3 text-[14px] text-[#2D3C68]/70 leading-[1.7]">
                  Open deck facing directly into wind and horizon.
                </p>
              </div>

              <div>
                <p className="text-[12px] tracking-[0.25em] text-[#2D3C68]/40 uppercase">
                  02
                </p>
                <p className="mt-3 text-[14px] text-[#2D3C68]/70 leading-[1.7]">
                  Lounge areas offering shaded and slower movement.
                </p>
              </div>

              {/* decorative line */}
              <div className="w-[1px] h-[80px] bg-[#2D3C68]/10 mx-auto" />

              <div className="text-[11px] text-[#2D3C68]/30 uppercase tracking-[0.3em]">
                Flow
              </div>

            </div>

          </div>

          {/* ================= CENTER ================= */}
          <div className="col-span-12 md:col-span-6 flex justify-center">

            <div className="relative w-[420px] md:w-[460px]">

              {/* glow belakang yacht */}
              <div className="absolute inset-0 blur-[60px] opacity-[0.2] bg-[radial-gradient(circle,rgba(45,60,104,0.15),transparent_70%)]" />

              {/* YACHT */}
              <img
                src="https://res.cloudinary.com/dombq6plz/image/upload/v1776164146/f69b0e9a-54d3-40b4-96dd-460d6b8dff97_1_jicqyu.png"
                className="relative w-full h-auto block z-10"
              />

              {/* shadow bawah */}
              <div className="absolute inset-x-0 bottom-[-35px] h-[70px] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.18),transparent_70%)] blur-[25px]" />

              {/* thin frame subtle */}
              <div className="absolute inset-0 border border-[#000]/5 rounded-[6px]" />

            </div>

          </div>

          {/* ================= RIGHT ================= */}
          <div className="col-span-3 hidden md:block text-right">

            <div className="space-y-20">

              <div>
                <p className="text-[12px] tracking-[0.25em] text-[#2D3C68]/40 uppercase">
                  03
                </p>
                <p className="mt-3 text-[14px] text-[#2D3C68]/70 leading-[1.7]">
                  Dining space centered around shared time and rhythm.
                </p>
              </div>

              <div>
                <p className="text-[12px] tracking-[0.25em] text-[#2D3C68]/40 uppercase">
                  04
                </p>
                <p className="mt-3 text-[14px] text-[#2D3C68]/70 leading-[1.7]">
                  Private cabins placed deeper for rest and separation.
                </p>
              </div>

              {/* decorative line */}
              <div className="w-[1px] h-[80px] bg-[#2D3C68]/10 ml-auto" />

              <div className="text-[11px] text-[#2D3C68]/30 uppercase tracking-[0.3em]">
                Depth
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

function JourneyFlowSection() {
  const [active, setActive] = useState(0);

  const phases = [
    {
      label: "Morning",
      title: "The day begins quietly",
      desc: "Soft light enters the space. Nothing moves fast.",
      overlay: "bg-yellow-200/20"
    },
    {
      label: "Midday",
      title: "Everything opens",
      desc: "The yacht breathes with the ocean. Movement, light, energy.",
      overlay: "bg-blue-200/20"
    },
    {
      label: "Evening",
      title: "Moments gather",
      desc: "Warmth builds. People come together without structure.",
      overlay: "bg-orange-300/20"
    },
    {
      label: "Night",
      title: "Silence returns",
      desc: "Everything slows. Only the sea remains.",
      overlay: "bg-black/40"
    }
  ];

  return (
    <section className="bg-[#F4F5F2] py-[160px] px-6 md:px-12">

      {/* HEADER */}
      <div className="max-w-[900px] mx-auto text-center mb-[100px]">
        <p className="text-[11px] tracking-[0.4em] text-[#6A6A6A] uppercase">
          Journey Flow
        </p>
        <h2 className="mt-6 font-[Gambarino] text-[48px] md:text-[68px] leading-[1.05] text-[#1A1A1A]">
          One Space, Changing Time
        </h2>
      </div>

      {/* MAIN */}
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-[60px] items-center">

        {/* LEFT — CONTROL */}
        <div className="flex flex-col gap-6">
          {phases.map((p, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`text-left transition ${
                active === i ? "opacity-100" : "opacity-40"
              }`}
            >
              <p className="text-[11px] tracking-[0.3em] uppercase mb-2">
                {p.label}
              </p>
              <h3 className="font-[Gambarino] text-[28px] md:text-[34px]">
                {p.title}
              </h3>
              <p className="mt-2 text-[14px] text-[#6A6A6A] leading-[1.6] max-w-[400px]">
                {p.desc}
              </p>
            </button>
          ))}
        </div>

        {/* RIGHT — YACHT */}
        <div className="relative w-full aspect-[9/16] overflow-hidden rounded-[8px]">

          {/* BASE IMAGE */}
          <img
            src="https://res.cloudinary.com/dombq6plz/image/upload/v1776164146/f69b0e9a-54d3-40b4-96dd-460d6b8dff97_1_jicqyu.png"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* OVERLAYS */}
          {phases.map((p, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition duration-700 ${
                active === i ? "opacity-100" : "opacity-0"
              } ${p.overlay}`}
            />
          ))}

          {/* GRAIN */}
          <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(circle,#fff_1px,transparent_1px)] bg-[length:3px_3px]" />
          </div>
        </div>

      </div>

    </section>
  );
}



function RouteSection({ children }) {
  return (
    <section className="relative">

      {/* ================= ROUTE LINE (VERTICAL) ================= */}
      <div className="absolute left-1/2 top-0 h-full -translate-x-1/2 pointer-events-none">
        <div className="relative h-full w-[1px]">

          {/* MAIN LINE */}
          <div className="absolute inset-0 bg-black/10" />

          {/* FADE TOP */}
          <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-white to-transparent" />

          {/* FADE BOTTOM */}
          <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />

        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10">
        {children}
      </div>

      {/* ================= DIVIDER ================= */}
      <div className="relative flex items-center justify-center py-24">

        {/* LEFT LINE */}
        <div className="h-[1px] w-full bg-black/10" />

        {/* COMPASS NODE */}
        <div className="mx-6 flex items-center justify-center">

          <img
            src="https://res.cloudinary.com/dombq6plz/image/upload/v1775052778/ChatGPT_Image_Apr_1_2026_09_01_13_PM_fgglvx.png"
            alt="Compass"
            className="w-5 h-5 opacity-60"
          />

        </div>

        {/* RIGHT LINE */}
        <div className="h-[1px] w-full bg-black/10" />

      </div>

    </section>
  );
}

function Statement() {
  return (
    <section className="relative bg-[#F5F2ED] py-[140px] px-6">
      
      <div className="max-w-[900px] mx-auto text-center">
        
        {/* MICRO LABEL */}
        <p className="text-[12px] tracking-[0.3em] text-[#64748B] uppercase">
          The Experience
        </p>

        {/* HEADLINE */}
        <h2 className="mt-6 text-[40px] md:text-[56px] leading-[1.2] font-medium text-[#0F172A]">
          Explore Indonesia Beyond the Expected
        </h2>

        {/* BODY */}
        <p className="mt-6 text-[16px] md:text-[18px] leading-relaxed text-[#475569] max-w-[680px] mx-auto">
          Journey across untouched islands, where every route is tailored to your rhythm. From the dramatic landscapes of Komodo to the pristine waters of Raja Ampat, each voyage reveals a side of Indonesia few ever experience.
        </p>

        {/* CTA */}
        <div className="mt-10">
          <button className="border border-[#0F172A]/20 px-6 py-3 text-sm tracking-wide text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition">
            Explore Expeditions
          </button>
        </div>
      </div>

      {/* SUBTLE TEXTURE */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#0F172A_1px,_transparent_1px)] bg-[length:24px_24px]" />
      </div>
    </section>
  );
}


function Intro() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Text reveal (stagger lines)
      gsap.from(".intro-line", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      })

      // Image parallax
      gsap.to(imageRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-40 md:py-56 bg-[#0a0f14] overflow-hidden"
    >

      {/* ================= BACKGROUND ATMOSPHERE ================= */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.6))]" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-20 items-center">

        {/* ================= TEXT ================= */}
        <div ref={textRef}>

          <p className="intro-line text-sm tracking-[0.3em] text-white/40 mb-6">
            THE EXPERIENCE
          </p>

          <h2 className="intro-line text-4xl md:text-5xl leading-tight font-light mb-8">
            A different way <br /> to experience the sea
          </h2>

          <p className="intro-line text-white/70 leading-relaxed mb-6 max-w-lg">
            Away from crowded shores and fixed itineraries, Serenity offers a more personal way to move across Indonesia’s waters — where each moment unfolds naturally, without interruption.
          </p>

          <p className="intro-line text-white/50 leading-relaxed max-w-md">
            It’s not about going further. It’s about slowing down enough to notice where you are.
          </p>

        </div>

        {/* ================= IMAGE COMPOSITION ================= */}
        <div className="relative h-[500px] md:h-[600px]">

          {/* Main image */}
          <img
            ref={imageRef}
            src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1200&auto=format&fit=crop"
            className="absolute inset-0 w-full h-full object-cover"
            alt=""
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

          {/* Secondary floating image */}
          <div className="absolute -bottom-16 -left-10 w-[220px] h-[260px] overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt=""
            />
          </div>

          {/* Light accent */}
          <div className="absolute -top-10 right-10 w-[180px] h-[180px] bg-orange-200/10 blur-3xl" />

        </div>

      </div>

      {/* ================= NOISE ================= */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none">
        <img
          src="https://grainy-gradients.vercel.app/noise.svg"
          className="w-full h-full object-cover"
          alt=""
        />
      </div>

    </section>
  )
}





function Expedition() {
  const journeys = [
    {
      title: "3 Days — Komodo Escape",
      description:
        "Sail through Komodo National Park, explore hidden beaches, and witness dramatic island landscapes.",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1775031031/ChatGPT_Image_Apr_1_2026_03_08_02_PM_lplfu7.png",
    },
    {
      title: "5 Days — Raja Ampat Discovery",
      description:
        "Dive into crystal-clear waters and navigate through some of the richest marine ecosystems on earth.",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_56_PM_t7jwul.png",
    },
    {
      title: "7 Days — Banda Islands Voyage",
      description:
        "Journey across remote volcanic islands with untouched reefs and a deep sense of history.",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1775031031/ChatGPT_Image_Apr_1_2026_03_08_09_PM_i95qhf.png",
    },
  ];

  return (
    <section className="bg-[#F5F2ED] py-[140px] px-6">
      
      <div className="max-w-[1280px] mx-auto">
        
        {/* HEADER */}
        <div className="max-w-[600px] mb-20">
          <p className="text-[12px] tracking-[0.3em] text-[#64748B] uppercase">
            Journeys
          </p>

          <h2 className="mt-4 text-[40px] md:text-[56px] leading-[1.2] font-medium text-[#0F172A]">
            Sample Expeditions
          </h2>

          <p className="mt-6 text-[16px] text-[#475569] leading-relaxed">
            Each journey is flexible and tailored, but these examples offer a glimpse of what your voyage could look like.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {journeys.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              
              {/* IMAGE */}
              <div className="relative h-[360px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* TEXT */}
              <div className="mt-6">
                <h3 className="text-[20px] font-medium text-[#0F172A]">
                  {item.title}
                </h3>

                <p className="mt-3 text-[15px] text-[#475569] leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4">
                  <span className="text-sm text-[#0F172A] border-b border-[#0F172A]/30">
                    View Itinerary
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


function Destinations() {
  const sectionRef = useRef(null);
  const leftClipRef = useRef(null);
  const rightClipRef = useRef(null);
  const leftImgRef = useRef(null);
  const rightImgRef = useRef(null);
  const seamRef = useRef(null);
  const eyebrowRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);
  const ctaRef = useRef(null);

  const DESTINATIONS = [
    {
      name: ["Raja", "Ampat"],
      sub: "West Papua · Coral reefs and limestone passages",
      img: "https://res.cloudinary.com/dombq6plz/image/upload/v1778511762/ChatGPT_Image_May_11_2026_09_55_36_PM_a2mixz.png",
    },
    {
      name: ["Labuan", "Bajo"],
      sub: "East Nusa Tenggara · Volcanic islands and open sea",
      img: "https://res.cloudinary.com/dombq6plz/image/upload/v1778511669/ChatGPT_Image_May_11_2026_09_55_36_PM_1_utqtyq.png",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /*
      ========================================
      GSAP MATCHMEDIA — single source of truth
      for all responsive values
      ========================================
    */

    const mm = gsap.matchMedia();

    mm.add(
      {
        mobile: "(max-width: 767px)",
        desktop: "(min-width: 768px)",
      },
      (context) => {
        const { mobile } = context.conditions;

        /*
          ========================================
          SPLIT SYSTEM
          ========================================
        */

        const SEAM_TOP = mobile ? 70 : 53.5;
        const SEAM_BOTTOM = mobile ? 57 : 49.5;

        const LEFT_CLIP = `polygon(0 0, ${SEAM_TOP}% 0, ${SEAM_BOTTOM}% 100%, 0 100%)`;
        const RIGHT_CLIP = `polygon(${SEAM_TOP}% 0, 100% 0, 100% 100%, ${SEAM_BOTTOM}% 100%)`;

        /*
          ========================================
          REDUCED MOTION
          ========================================
        */

        if (reduceMotion) {
          gsap.set(leftClipRef.current, { clipPath: LEFT_CLIP });
          gsap.set(rightClipRef.current, { clipPath: RIGHT_CLIP });
          gsap.set([leftImgRef.current, rightImgRef.current], { scale: 1, y: 0 });
          gsap.set(seamRef.current, { opacity: mobile ? 0.1 : 0.08, scaleY: 1 });
          gsap.set(
            [eyebrowRef.current, leftContentRef.current, rightContentRef.current, ctaRef.current],
            { opacity: 1, x: 0, y: 0 }
          );
          return;
        }

        /*
          ========================================
          INITIAL STATE
          ========================================
        */

        gsap.set(leftClipRef.current, {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        });

        gsap.set(rightClipRef.current, {
          clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
        });

        gsap.set([leftImgRef.current, rightImgRef.current], {
          scale: mobile ? 1.12 : 1.085,
          y: 0,
          force3D: true,
        });

        gsap.set(seamRef.current, {
          opacity: 0,
          scaleY: 0,
          transformOrigin: "center center",
        });

        gsap.set(eyebrowRef.current, { opacity: 0, y: 10 });

        gsap.set(leftContentRef.current, {
          opacity: 0,
          x: mobile ? -18 : -28,
          y: mobile ? 10 : 0,
        });

        gsap.set(rightContentRef.current, {
          opacity: 0,
          x: mobile ? 18 : 28,
          y: mobile ? 16 : 0,
        });

        gsap.set(ctaRef.current, { opacity: 0, y: 12 });

        /*
          ========================================
          MAIN TIMELINE
          ========================================
        */

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: mobile ? "+=110%" : "+=155%",
            scrub: mobile ? 0.85 : 1.1,
            pin: true,
            pinSpacing: true,
          },
        });

        /*
          ========================================
          PHASE 1 — WORLD EMERGES
          landscape reveal — expo inertia
          ========================================
        */

        tl.to(
          leftClipRef.current,
          { clipPath: LEFT_CLIP, duration: 1, ease: "power2.out" },
          0
        );

        tl.to(
          rightClipRef.current,
          { clipPath: RIGHT_CLIP, duration: 1, ease: "power2.out" },
          mobile ? 0.18 : 0.025
        );

        tl.to(
          leftImgRef.current,
          { scale: mobile ? 1.03 : 1.012, duration: 1.15, ease: "power1.out" },
          0
        );

        tl.to(
          rightImgRef.current,
          { scale: mobile ? 1.04 : 1.02, duration: 1.18, ease: "power1.out" },
          mobile ? 0.08 : 0
        );

        /*
          ========================================
          PHASE 2 — SPLIT CONSCIOUSNESS
          seam emergence — organic sine
          ========================================
        */

        tl.to(
          seamRef.current,
          {
            opacity: mobile ? 0.13 : 0.11,
            scaleY: 1,
            duration: 0.7,
            ease: "sine.inOut",
          },
          mobile ? 0.42 : 0.44
        );

        tl.to(
          eyebrowRef.current,
          { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" },
          0.52
        );

        /*
          ========================================
          PHASE 3 — DESTINATION REVEAL
          typography settling — decisive power3
          ========================================
        */

        tl.to(
          leftContentRef.current,
          { opacity: 1, x: 0, y: 0, duration: 0.9, ease: "power3.out" },
          mobile ? 0.58 : 0.76
        );

        tl.to(
          rightContentRef.current,
          { opacity: 1, x: 0, y: 0, duration: 0.9, ease: "power3.out" },
          mobile ? 0.72 : 0.81
        );

        /*
          ========================================
          PHASE 4 — STILLNESS
          intentionally empty — composition breathes
          ========================================
        */

        /*
          ========================================
          PHASE 5 — CTA
          UI interaction — system ease
          ========================================
        */

        tl.to(
          ctaRef.current,
          { opacity: 1, y: 0, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          mobile ? 0.88 : 1.12
        );

        /*
          ========================================
          PHASE 6 — RELEASE
          seam fades — atmospheric sine
          ========================================
        */

        tl.to(
          seamRef.current,
          {
            opacity: mobile ? 0.06 : 0.045,
            duration: 0.8,
            ease: "sine.out",
          },
          mobile ? 1.0 : 1.18
        );

        /*
          ========================================
          ENVIRONMENTAL PARALLAX
          atmospheric drift — pure linear
          delayed, starts after reveal settles
          ========================================
        */

        gsap.to(leftImgRef.current, {
          y: mobile ? -18 : -26,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "55% top",
            end: "bottom top",
            scrub: mobile ? 1.1 : 1.5,
          },
        });

        gsap.to(rightImgRef.current, {
          y: mobile ? -24 : -38,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "55% top",
            end: "bottom top",
            scrub: mobile ? 1.2 : 1.8,
          },
        });

        return () => {
          tl.kill();
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#161616]"
    >
      <div className="relative h-screen overflow-hidden">

        {/* GLOBAL ATMOSPHERE */}
        <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-black/48 via-black/[0.05] to-black/10 md:from-black/42 md:via-transparent md:to-black/12" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[220px] bg-gradient-to-b from-[#F4F5F2]/10 via-[#F4F5F2]/[0.025] to-transparent" />

        {/* MOBILE RADIAL DEPTH */}
        <div className="pointer-events-none absolute inset-0 z-[4] md:hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_72%,rgba(0,0,0,0.34),transparent_42%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_36%,rgba(0,0,0,0.22),transparent_34%)]" />
        </div>

        {/* LEFT CLIP */}
        <div
          ref={leftClipRef}
          className="absolute inset-0 overflow-hidden"
          style={{ willChange: "clip-path" }}
        >
          <div
            ref={leftImgRef}
            className="absolute inset-0"
            style={{ willChange: "transform", backfaceVisibility: "hidden" }}
          >
            <img
              src={DESTINATIONS[0].img}
              alt={DESTINATIONS[0].name.join(" ")}
              draggable="false"
              className="absolute inset-x-0 -top-[10%] h-[120%] w-full select-none object-cover"
            />
            <div className="absolute inset-0 bg-[#243657]/10 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/[0.03] to-transparent md:from-black/12 md:via-transparent" />
          </div>
        </div>

        {/* RIGHT CLIP */}
        <div
          ref={rightClipRef}
          className="absolute inset-0 overflow-hidden"
          style={{ willChange: "clip-path" }}
        >
          <div
            ref={rightImgRef}
            className="absolute inset-0"
            style={{ willChange: "transform", backfaceVisibility: "hidden" }}
          >
            <img
              src={DESTINATIONS[1].img}
              alt={DESTINATIONS[1].name.join(" ")}
              draggable="false"
              className="absolute inset-x-0 -top-[14%] h-[126%] w-full select-none object-cover md:-top-[12%] md:h-[124%]"
            />
            <div className="absolute inset-0 bg-[#1F2533]/20 mix-blend-multiply md:bg-[#1F2533]/18" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/24 via-black/[0.04] to-transparent md:from-black/16 md:via-transparent" />
          </div>
        </div>

        {/* SEAM */}
        <div
          ref={seamRef}
          className="absolute inset-y-0 z-20 w-[1.5px] md:w-px"
          style={{
            left: "51.5%",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.01), rgba(255,255,255,0.22), rgba(255,255,255,0.015))",
            transform: "translateX(-50%) skewX(-1.4deg)",
            filter: "blur(0.1px)",
            willChange: "transform, opacity",
          }}
        />

        {/* CONTENT */}
        <div className="absolute inset-0 z-30 flex flex-col justify-end px-6 pb-10 md:px-10 md:pb-16"
          style={{ paddingBottom: "max(40px, env(safe-area-inset-bottom))" }}
        >

          {/* EYEBROW */}
          <div
            ref={eyebrowRef}
            className="pointer-events-none absolute inset-x-0 top-[14%] flex justify-center md:top-[15%]"
          >
            <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.34em] text-white/[0.18]">
              Indonesian Archipelago
            </span>
          </div>

          {/* DESTINATIONS ROW */}
          <div className="flex items-end justify-between gap-4">

            {/* LEFT */}
            <div
              ref={leftContentRef}
              className="relative z-10 max-w-[220px] md:max-w-[420px]"
            >
              <h2 className="font-[Gambarino] text-[44px] leading-[0.88] tracking-[-0.055em] text-[#F4F5F2] md:text-[76px]">
                {DESTINATIONS[0].name[0]}
                <br />
                {DESTINATIONS[0].name[1]}
              </h2>
              <p className="mt-4 max-w-[200px] text-[11px] leading-[1.88] tracking-[0.045em] text-white/50 md:max-w-[300px] md:text-[12px]">
                {DESTINATIONS[0].sub}
              </p>
            </div>

            {/* RIGHT */}
            <div
              ref={rightContentRef}
              className="relative z-10 max-w-[160px] text-right md:mb-[-2vh] md:mr-[5vw] md:max-w-[390px]"
            >
              <h2 className="font-[Gambarino] text-[32px] leading-[0.88] tracking-[-0.055em] text-[#F4F5F2] md:text-[64px]">
                {DESTINATIONS[1].name[0]}
                <br />
                {DESTINATIONS[1].name[1]}
              </h2>
              <p className="mt-3 ml-auto max-w-[150px] text-[10px] leading-[1.85] tracking-[0.04em] text-white/46 md:max-w-[270px] md:text-[12px]">
                {DESTINATIONS[1].sub}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div
            ref={ctaRef}
            className="mt-8 flex justify-start md:absolute md:inset-x-0 md:bottom-12 md:justify-center"
          >
            <a
              href="/destinations"
              className="group inline-flex items-center gap-4 border-b border-[#F4F5F2]/28 pb-[10px] text-[11px] uppercase tracking-[0.24em] text-[#F4F5F2]/80 transition-all duration-500 hover:border-[#F4F5F2]/72 hover:text-[#F4F5F2]"
            >
              Explore the Routes
              <span className="transition-transform duration-500 group-hover:translate-x-[4px]">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
 

function YachtDua() {
  return (
    <section className="bg-[#FFFFFF] py-[140px] px-6">
      
      <div className="max-w-[1280px] mx-auto">
        
        {/* HEADER */}
        <div className="max-w-[600px] mb-20">
          <p className="text-[12px] tracking-[0.3em] text-[#64748B] uppercase">
            The Yacht
          </p>

          <h2 className="mt-4 text-[40px] md:text-[56px] leading-[1.2] font-medium text-[#0F172A]">
            Designed for Private Exploration
          </h2>

          <p className="mt-6 text-[16px] text-[#475569] leading-relaxed">
            A balance of comfort and openness, crafted for extended journeys across Indonesia’s waters.
          </p>
        </div>

        {/* MAIN IMAGE */}
        <div className="w-full h-[520px] overflow-hidden mb-10">
          <img
            src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_15_PM_otnwp1.png"
            alt="Yacht exterior"
            className="w-full h-full object-cover"
          />
        </div>

        {/* IMAGE GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          
          <div className="h-[260px] overflow-hidden">
            <img
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_24_PM_lzlhwx.png"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="h-[260px] overflow-hidden">
            <img
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031029/ChatGPT_Image_Apr_1_2026_03_07_18_PM_dihjfs.png"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="h-[260px] overflow-hidden">
            <img
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_06_38_PM_hqx36m.png"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

        {/* CTA */}
        <div className="mt-16">
          <button className="text-sm tracking-wide text-[#0F172A] border-b border-[#0F172A]/30 hover:border-[#0F172A] transition">
            Explore Full Yacht Details
          </button>
        </div>

      </div>
    </section>
  );
}


function Moments() {
  const images = [
    "https://images.unsplash.com/photo-1589309736404-2e142a2acdf0?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1550033588-6f3e54613d6e?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576035739460-d6f6423dbf72?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1665234811705-02e42eda85d2?q=80&w=3266&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1528150177508-7cc0c36cda5c?q=80&w=1200&auto=format&fit=crop",
  ];

  return (
    <section className="bg-[#F5F2ED] py-[120px] px-6">
      
      <div className="max-w-[1280px] mx-auto">
        
        {/* HEADER */}
        <div className="mb-16 max-w-[600px]">
          <p className="text-[12px] tracking-[0.3em] text-[#64748B] uppercase">
            Moments
          </p>

          <h2 className="mt-4 text-[36px] md:text-[48px] leading-[1.2] font-medium text-[#0F172A]">
            A Glimpse of Life at Sea
          </h2>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* COLUMN 1 */}
          <div className="flex flex-col gap-6">
            <div className="h-[260px] overflow-hidden">
              <img
                src={images[0]}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-[420px] overflow-hidden">
              <img
                src={images[1]}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* COLUMN 2 */}
          <div className="flex flex-col gap-6">
            <div className="h-[420px] overflow-hidden">
              <img
                src={images[2]}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-[260px] overflow-hidden">
              <img
                src={images[3]}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* COLUMN 3 */}
          <div className="flex flex-col gap-6">
            <div className="h-[300px] overflow-hidden">
              <img
                src={images[4]}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-[380px] overflow-hidden">
              <img
                src={images[5]}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

 
function CTA() {
  return (
    <section className="bg-[#0F172A] text-white py-[140px] px-6">
      
      <div className="max-w-[900px] mx-auto text-center">
        
        {/* HEADLINE */}
        <h2 className="text-[36px] md:text-[56px] leading-[1.2] font-medium">
          Begin Your Private Journey
        </h2>

        {/* SUBTEXT */}
        <p className="mt-6 text-[16px] md:text-[18px] text-white/70 leading-relaxed max-w-[600px] mx-auto">
          Plan a voyage tailored entirely to you — from destinations to onboard experience, every detail is curated with intention.
        </p>

        {/* CTA BUTTONS */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
          
          <button className="bg-white text-[#0F172A] px-8 py-3 text-sm tracking-wide hover:opacity-90 transition">
            Start Planning
          </button>

          <button className="border border-white/30 px-8 py-3 text-sm tracking-wide hover:bg-white hover:text-[#0F172A] transition">
            Contact Concierge
          </button>

        </div>

      </div>

    </section>
  );
}


 
