"use client"

import { useEffect, useRef, useState } from "react"
import { gsap, ScrollTrigger } from "../lib/gsap"
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform , useInView} from "framer-motion";
import Link from "next/link";
import { FaInstagram, FaMessage, FaWhatsapp } from "react-icons/fa6";

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
      <Destinations/>
      <Yacht/>
      <OnboardCare/>
      <RatesSnapshot/>
      <FramesAtSea/>
      <Footer/>
      
      
      
      {/* <FinalCTA/> */}
      {/* <Activities/> */}
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
      {/* <Closing/> */}
      {/* <Yacht/>   */}
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

  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = Boolean(shouldReduceMotion);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const heroMedia = {
    type: "video",

    /*
      IMAGE:
      https://res.cloudinary.com/dombq6plz/image/upload/v1777307172/ChatGPT_Image_Apr_27_2026_10_24_29_PM_1_ou4x2n.png
    */

      // https://www.pexels.com/download/video/29525835/
    src: "https://www.pexels.com/download/video/29525835/",
  };

  const ease = [0.22, 1, 0.36, 1];

  // =========================================================
  // GSAP
  // =========================================================

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(bgRef.current, {
          y: 0,
          scale: 1.06,
        });

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
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-[100svh]
        min-h-[620px]
        w-full
        overflow-hidden
        bg-[#0B1322]
        md:min-h-screen
      "
    >
      {/* ========================================================= */}
      {/* BACKGROUND */}
      {/* ========================================================= */}

      <div
        ref={bgRef}
        className="
          absolute
          inset-0
          scale-[1.06]
          will-change-transform
        "
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
            sizes="100vw"
            className="
              object-cover
              object-center
            "
          />
        )}

        {/* ========================================= */}
        {/* VIDEO MODE */}
        {/* ========================================= */}

        {heroMedia.type === "video" && (
          <div
            className={`
              absolute
              inset-0
              overflow-hidden
              bg-[#0B1322]
              transition-opacity
              duration-[1200ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${isVideoLoaded ? "opacity-100" : "opacity-0"}
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
                object-center
              "
            >
              <source src={heroMedia.src} type="video/mp4" />
            </video>

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

        {/* PRELOAD ATMOSPHERE — NO IMAGE, NO POSTER */}
        <div
          className={`
            absolute
            inset-0
            bg-[#0B1322]
            transition-opacity
            duration-[1200ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${isVideoLoaded ? "opacity-0" : "opacity-100"}
          `}
        />

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
          pb-[8vh]
          text-center
          will-change-transform
          sm:pb-[9vh]
          md:px-10
          md:pb-[9vh]
          lg:pb-[9vh]
        "
      >
        <div className="mx-auto max-w-[860px]">
          {/* MICRO LABEL */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 24,
                    filter: "blur(6px)",
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.2,
              delay: 0.1,
              ease,
            }}
            className="
              mb-5
              text-[10px]
              tracking-[0.3em]
              text-[#F4F5F2]/76
              sm:mb-6
              sm:text-[11px]
              md:text-[12px]
              md:tracking-[0.32em]
            "
          >
            INDONESIAN PHINISI YACHT
          </motion.div>

          {/* HEADLINE */}
          <h1
            className="
              font-[Gambarino]
              text-[46px]
              leading-[0.98]
              tracking-[-0.04em]
              text-[#F4F5F2]
              sm:text-[56px]
              md:text-[76px]
              lg:text-[92px]
            "
          >
            <motion.span
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 56,
                      filter: "blur(10px)",
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 1.45,
                delay: 0.18,
                ease,
              }}
              className="block"
            >
              Indonesia Waits
            </motion.span>

            <motion.span
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 56,
                      filter: "blur(10px)",
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 1.45,
                delay: 0.3,
                ease,
              }}
              className="block opacity-95"
            >
              at Sea
            </motion.span>
          </h1>

          {/* SUBCOPY */}
          <motion.p
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 30,
                    filter: "blur(8px)",
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.3,
              delay: 0.46,
              ease,
            }}
            className="
              mx-auto
              mt-5
              max-w-[560px]
              text-[14px]
              leading-[1.75]
              text-[#F4F5F2]/90
              sm:text-[15px]
              md:max-w-[590px]
              md:text-[17px]
              md:leading-[1.8]
            "
          >
            Sail through Raja Ampat and Komodo with twelve guests
            aboard a handcrafted phinisi built for intimate ocean
            adventures
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 18,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.15,
              delay: 0.62,
              ease,
            }}
            className="
              mt-9
              flex
              flex-col
              items-center
              gap-4
              sm:mt-10
            "
          >
            <Link
              href="/contact"
              className="
                inline-flex
                min-h-[46px]
                items-center
                justify-center
                rounded-full
                border
                border-[#F4F5F2]/68
                bg-[#F4F5F2]/[0.025]
                px-8
                py-3
                text-[13px]
                tracking-[0.02em]
                text-[#F4F5F2]
                backdrop-blur-[6px]
                transition-colors
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:border-[#F4F5F2]
                hover:bg-[#F4F5F2]
                hover:text-[#2D3C68]
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#B08D57]
              "
            >
              Begin Your Voyage →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Introduction() {
  const configRef = useRef(null);

  if (!configRef.current) {
    configRef.current = {
      images: {
        left: "https://res.cloudinary.com/dombq6plz/image/upload/v1778922404/ChatGPT_Image_May_16_2026_04_05_17_PM_ajh5dz.png",

        center:
          "https://res.cloudinary.com/dombq6plz/image/upload/v1778509540/ChatGPT_Image_May_11_2026_09_24_55_PM_1_bc9y57.png",

        right:
          "https://res.cloudinary.com/dombq6plz/image/upload/v1778922404/ChatGPT_Image_May_16_2026_03_49_30_PM_mcgmc4.png",
      },

      pattern: {
        ikat:
          "https://res.cloudinary.com/dombq6plz/image/upload/v1778486588/ChatGPT_Image_May_11_2026_03_01_56_PM_1_v2exmt.png",
      },

      text: {
        label: "Experience",

        headlineLine1: "A way of living",

        headlineLine2: "at open water",

        description:
          "Six in the morning, someone is already in the water. By afternoon, the anchor is down somewhere the crew knows well. By day three, the only schedule is the tide.",
      },

      animation: {
        ease: "power3.out",

        label: {
          from: {
            opacity: 0,
            y: 10,
          },

          to: {
            opacity: 1,
            y: 0,
            duration: 1.05,
          },

          start: "top 88%",
        },

        headline: {
          from: {
            opacity: 0,
            y: 24,
            filter: "blur(7px)",
          },

          to: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.38,
            stagger: 0.14,
          },

          start: "top 84%",
        },

        description: {
          from: {
            opacity: 0,
            y: 18,
            filter: "blur(5px)",
          },

          to: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.28,
            delay: 0.1,
          },

          start: "top 88%",
        },

        mobileImage: {
          from: {
            opacity: 0,
            scale: 1.035,
            y: 24,
          },

          to: {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.45,
          },

          start: "top 90%",
        },

        desktopGrid: {
          from: {
            opacity: 0,
            y: 26,
          },

          to: {
            opacity: 1,
            y: 0,
            duration: 1.32,
            stagger: 0.12,
          },

          start: "top 88%",
        },
      },

      classes: {
        section:
          "relative w-full overflow-hidden bg-[#F4F5F2] px-6 py-24 text-[#2D3C68] md:px-10 md:py-32",

        topBridge:
          "pointer-events-none absolute left-0 top-0 z-[2] h-[150px] w-full bg-gradient-to-b from-[#2D3C68]/[0.10] via-[#2D3C68]/[0.04] to-transparent",

        radialTexture:
          "pointer-events-none absolute inset-0 z-[1] opacity-[0.025] mix-blend-multiply bg-[radial-gradient(circle_at_center,#2D3C68_0%,transparent_62%)]",

        ikatMask:
          "pointer-events-none absolute inset-0 z-[1] hidden overflow-hidden md:block",

        ikatImage:
          "absolute bottom-[-13%] right-[-15%] w-[min(760px,58vw)] max-w-none rotate-[-4deg] select-none opacity-[0.048] mix-blend-multiply",

        textWrapper: "relative z-10 mx-auto max-w-6xl text-center",

        label:
          "mb-5 text-[10px] uppercase tracking-[0.38em] text-[#2D3C68]/58",

        headline:
          "mx-auto max-w-[620px] font-[Gambarino] text-[40px] leading-[1.04] tracking-[-0.03em] text-[#2D3C68] sm:text-[46px] md:text-[68px]",

        description:
          "mx-auto mt-5 max-w-[560px] text-[15px] leading-[1.78] text-[#2D3C68]/78 md:mt-6 md:text-[16px] md:leading-[1.82]",

        mobileWrapper:
          "relative z-10 mx-auto mt-12 w-full max-w-[330px] md:hidden",

        mobileImage:
          "relative aspect-[4/5] overflow-hidden shadow-[0_18px_44px_rgba(45,60,104,0.08)]",

        desktopGrid:
          "relative z-10 mx-auto mt-20 hidden max-w-6xl md:grid md:grid-cols-[1fr_1.4fr_1fr] md:items-end md:gap-5 lg:gap-6",

        sideImage:
          "relative aspect-[3/4] overflow-hidden shadow-[0_18px_40px_rgba(45,60,104,0.08)]",

        centerImage:
          "relative aspect-[4/5] overflow-hidden shadow-[0_24px_60px_rgba(22,32,55,0.10)]",

        image:
          "object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]",

        overlayLeft:
          "absolute inset-0 bg-gradient-to-t from-[#2D3C68]/[0.08] to-transparent",

        overlayCenter:
          "absolute inset-0 bg-gradient-to-t from-[#2D3C68]/[0.12] to-transparent",

        overlayMobile:
          "absolute inset-0 bg-gradient-to-t from-[#2D3C68]/[0.10] to-transparent",

        bottomBridge:
          "pointer-events-none absolute bottom-0 left-0 z-[2] h-[120px] w-full bg-gradient-to-t from-[#2D3C68]/[0.06] to-transparent",
      },
    };
  }

  const config = configRef.current;

  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headlineRef = useRef(null);
  const descRef = useRef(null);
  const mobileImgRef = useRef(null);
  const gridRef = useRef(null);
  const imgLeftRef = useRef(null);
  const imgCtrRef = useRef(null);
  const imgRightRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lines = headlineRef.current?.querySelectorAll(".line") ?? [];

    const imageColumns = [
      imgLeftRef.current,
      imgCtrRef.current,
      imgRightRef.current,
    ].filter(Boolean);

    if (prefersReducedMotion) {
      if (labelRef.current) {
        gsap.set(labelRef.current, {
          opacity: 1,
          y: 0,
        });
      }

      if (lines.length > 0) {
        gsap.set(lines, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        });
      }

      if (descRef.current) {
        gsap.set(descRef.current, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        });
      }

      if (mobileImgRef.current) {
        gsap.set(mobileImgRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
        });
      }

      if (imageColumns.length > 0) {
        gsap.set(imageColumns, {
          opacity: 1,
          y: 0,
        });
      }

      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const ease = config.animation.ease;

      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          config.animation.label.from,
          {
            ...config.animation.label.to,
            ease,
            scrollTrigger: {
              trigger: labelRef.current,
              start: config.animation.label.start,
              once: true,
            },
          }
        );
      }

      if (lines.length > 0) {
        gsap.fromTo(
          lines,
          config.animation.headline.from,
          {
            ...config.animation.headline.to,
            ease,
            scrollTrigger: {
              trigger: headlineRef.current,
              start: config.animation.headline.start,
              once: true,
            },
          }
        );
      }

      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          config.animation.description.from,
          {
            ...config.animation.description.to,
            ease,
            scrollTrigger: {
              trigger: descRef.current,
              start: config.animation.description.start,
              once: true,
            },
          }
        );
      }

      mm.add("(max-width: 767px)", () => {
        if (!mobileImgRef.current) return;

        gsap.fromTo(
          mobileImgRef.current,
          config.animation.mobileImage.from,
          {
            ...config.animation.mobileImage.to,
            ease,
            scrollTrigger: {
              trigger: mobileImgRef.current,
              start: config.animation.mobileImage.start,
              once: true,
            },
          }
        );
      });

      mm.add("(min-width: 768px)", () => {
        if (!gridRef.current || imageColumns.length === 0) return;

        gsap.fromTo(
          imageColumns,
          config.animation.desktopGrid.from,
          {
            ...config.animation.desktopGrid.to,
            ease,
            scrollTrigger: {
              trigger: gridRef.current,
              start: config.animation.desktopGrid.start,
              once: true,
            },
          }
        );
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, [config]);

  return (
    <section
      ref={sectionRef}
      className={config.classes.section}
      style={{
        backgroundColor: "#F4F5F2",
      }}
    >
      <div className={config.classes.topBridge} />

      <div className={config.classes.radialTexture} />

      <div
        className={config.classes.ikatMask}
        style={{
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.62) 34%, rgba(0,0,0,0.78) 66%, transparent 100%)",
          maskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.62) 34%, rgba(0,0,0,0.78) 66%, transparent 100%)",
        }}
      >
        <img
          src={config.pattern.ikat}
          alt=""
          aria-hidden="true"
          className={config.classes.ikatImage}
        />
      </div>

      <div className={config.classes.textWrapper}>
        <div ref={labelRef} className={config.classes.label}>
          {config.text.label}
        </div>

        <h2 ref={headlineRef} className={config.classes.headline}>
          <span className="line block">{config.text.headlineLine1}</span>

          <span className="line block">{config.text.headlineLine2}</span>
        </h2>

        <p ref={descRef} className={config.classes.description}>
          {config.text.description}
        </p>
      </div>

      <div className={config.classes.mobileWrapper}>
        <div ref={mobileImgRef} className={config.classes.mobileImage}>
          <Image
            src={config.images.center}
            alt="Life on board Serenity"
            fill
            sizes="(max-width: 767px) 330px, 0px"
            className={config.classes.image}
          />

          <div className={config.classes.overlayMobile} />
        </div>
      </div>

      <div ref={gridRef} className={config.classes.desktopGrid}>
        <div ref={imgLeftRef} className={config.classes.sideImage}>
          <Image
            src={config.images.left}
            alt="Open sea moment on board Serenity"
            fill
            sizes="(min-width: 768px) 26vw, 0px"
            className={config.classes.image}
          />

          <div className={config.classes.overlayLeft} />
        </div>

        <div ref={imgCtrRef} className={config.classes.centerImage}>
          <Image
            src={config.images.center}
            alt="Life on board Serenity"
            fill
            sizes="(min-width: 768px) 38vw, 0px"
            className={config.classes.image}
          />

          <div className={config.classes.overlayCenter} />
        </div>

        <div ref={imgRightRef} className={config.classes.sideImage}>
          <Image
            src={config.images.right}
            alt="Interior space on board Serenity"
            fill
            sizes="(min-width: 768px) 26vw, 0px"
            className={config.classes.image}
          />

          <div className={config.classes.overlayLeft} />
        </div>
      </div>

      <div className={config.classes.bottomBridge} />
    </section>
  );
}

function QuickContext() {
  const sectionRef = useRef(null);
  const statRefs = useRef([]);

  const config = {
    stats: [
      { number: "12", label: "Only Twelve Guests" },
      { number: "4", label: "Private Cabins" },
      { number: "10", label: "Ten Crew Aboard" },
      {
        number: "Phinisi",
        label: "Tanah Beru · Sulawesi",
        small: true,
      },
    ],

    motif: {
      src: "https://res.cloudinary.com/dombq6plz/image/upload/v1778486752/ChatGPT_Image_May_11_2026_03_01_56_PM_2_k2aiwl.png",
    },

    animation: {
      ease: "power3.out",

      stat: {
        from: {
          opacity: 0,
          y: 14,
        },

        to: {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
        },

        start: "top 86%",
      },
    },

    classes: {
      section:
        "relative w-full overflow-hidden bg-[#2D3C68] py-20 text-[#F4F5F2] md:py-28",

      topBridge:
        "pointer-events-none absolute left-0 top-0 h-[120px] w-full bg-gradient-to-b from-[#F4F5F2]/08 via-[#F4F5F2]/03 to-transparent",

      motifWrap:
        "pointer-events-none absolute inset-0 overflow-hidden",

      motifMask: "absolute inset-0",

      motifImage:
        "absolute -left-[360px] -top-[300px] w-[1050px] max-w-none rotate-[-10deg] opacity-[0.03] blur-[0.35px] select-none md:-left-[420px] md:-top-[360px] md:w-[1500px]",

      depth:
        "pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.035] via-transparent to-[#1A1A1A]/[0.025]",

      radial:
        "pointer-events-none absolute inset-0 opacity-[0.045] bg-[radial-gradient(circle_at_center,white_0%,transparent_62%)]",

      bottomBridge:
        "pointer-events-none absolute bottom-0 left-0 h-[120px] w-full bg-gradient-to-b from-transparent via-[#F4F5F2]/04 to-[#F4F5F2]/08",

      content: "relative mx-auto max-w-[1120px] px-6 md:px-10",

      grid:
        "grid grid-cols-2 items-end gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-0 md:gap-y-0",

      statBase: "text-center",

      divider: "md:border-l md:border-[#F4F5F2]/12",

      number:
        "font-[Gambarino] leading-none tracking-[-0.03em] text-[#F4F5F2]",

      numberRegular: "text-[44px] md:text-[64px]",

      numberSmall: "text-[34px] md:text-[48px]",

      label:
        "mt-3 text-[10px] uppercase leading-[1.65] tracking-[0.24em] text-[#F4F5F2]/62 md:text-[11px] md:tracking-[0.28em]",
    },
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const statItems = statRefs.current.filter(Boolean);

    if (prefersReducedMotion) {
      if (statItems.length > 0) {
        gsap.set(statItems, {
          opacity: 1,
          y: 0,
        });
      }

      return;
    }

    const ctx = gsap.context(() => {
      if (statItems.length > 0) {
        gsap.fromTo(statItems, config.animation.stat.from, {
          ...config.animation.stat.to,
          ease: config.animation.ease,

          scrollTrigger: {
            trigger: sectionRef.current,
            start: config.animation.stat.start,
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={config.classes.section}>
      {/* ATMOSPHERIC BRIDGE — IN */}
      <div className={config.classes.topBridge} />

      {/* SUMBA IKAT — ULTRA SUBTLE ATMOSPHERIC FIELD */}
      <div className={config.classes.motifWrap} aria-hidden="true">
        <div
          className={config.classes.motifMask}
          style={{
            maskImage:
              "radial-gradient(circle at 18% 24%, black 0%, rgba(0,0,0,0.58) 30%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(circle at 18% 24%, black 0%, rgba(0,0,0,0.58) 30%, transparent 72%)",
          }}
        >
          <img
            src={config.motif.src}
            alt=""
            className={config.classes.motifImage}
            draggable="false"
          />
        </div>
      </div>

      {/* SUBTLE DEPTH */}
      <div className={config.classes.depth} />

      {/* ATMOSPHERIC LIGHT */}
      <div className={config.classes.radial} />

      {/* ATMOSPHERIC BRIDGE — OUT */}
      <div className={config.classes.bottomBridge} />

      {/* CONTENT */}
      <div className={config.classes.content}>
        <div className={config.classes.grid}>
          {config.stats.map((stat, index) => (
            <div
              key={`${stat.number}-${stat.label}`}
              ref={(el) => {
                statRefs.current[index] = el;
              }}
              className={`${config.classes.statBase} ${
                index > 0 ? config.classes.divider : ""
              }`}
            >
              <div
                className={`${config.classes.number} ${
                  stat.small
                    ? config.classes.numberSmall
                    : config.classes.numberRegular
                }`}
              >
                {stat.number}
              </div>

              <div className={config.classes.label}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 
function Experiences() {
  const configRef = useRef(null);

  if (!configRef.current) {
    configRef.current = {
      images: {
        left: "https://res.cloudinary.com/dombq6plz/image/upload/v1778424753/ChatGPT_Image_May_10_2026_09_51_01_PM_xfhbnv.png",

        right:
          "https://res.cloudinary.com/dombq6plz/image/upload/v1778425837/ChatGPT_Image_May_10_2026_10_10_05_PM_1_dv3ebm.png",
      },

      text: {
        label: "On Board",

        headline: "Leave the schedule on shore",

        description:
          "Days move between the deck, the water, and moments in between. Nothing feels scheduled, yet everything settles naturally into rhythm.",

        leftTitle: "Open Deck Living",

        leftDescription:
          "Sunlight, sea air, and space to linger. Much of the day unfolds outside, without needing a plan or destination.",

        rightTitle: "Quiet When You Need It",

        rightDescription:
          "When the rhythm slows, private interiors offer calm, comfort, and space entirely your own.",

        cta: "Step Inside the Yacht →",
      },

      animation: {
        ease: "power3.out",

        label: {
          from: {
            opacity: 0,
            y: 10,
          },

          to: {
            opacity: 1,
            y: 0,
            duration: 1.05,
          },

          start: "top 88%",
        },

        headline: {
          from: {
            opacity: 0,
            y: 24,
            filter: "blur(7px)",
          },

          to: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.38,
          },

          start: "top 84%",
        },

        description: {
          from: {
            opacity: 0,
            y: 18,
            filter: "blur(5px)",
          },

          to: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.28,
            delay: 0.08,
          },

          start: "top 88%",
        },

        card: {
          from: {
            opacity: 0,
            y: 26,
            scale: 1.01,
          },

          to: {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.32,
            stagger: 0.12,
          },

          start: "top 86%",
        },

        cta: {
          from: {
            opacity: 0,
            y: 14,
          },

          to: {
            opacity: 1,
            y: 0,
            duration: 0.95,
            delay: 0.05,
          },

          start: "top 92%",
        },
      },

      classes: {
        section:
          "relative overflow-hidden bg-[#F4F5F2] px-6 pb-24 pt-24 text-[#2D3C68] md:px-10 md:pb-32 md:pt-32",

        topBridge:
          "pointer-events-none absolute inset-x-0 top-0 h-[150px] bg-gradient-to-b from-[#2D3C68]/06 via-[#2D3C68]/[0.025] to-transparent",

        coolTexture:
          "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,#2D3C68_0%,transparent_64%)] opacity-[0.025] mix-blend-multiply",

        warmAtmosphere:
          "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(176,141,87,0.06)_0%,transparent_48%)]",

        bottomBridge:
          "pointer-events-none absolute bottom-0 left-0 h-[170px] w-full bg-gradient-to-b from-transparent via-[#2D3C68]/[0.025] to-[#2D3C68]/08",

        inner: "relative mx-auto max-w-[1240px]",

        header:
          "mx-auto mb-16 max-w-[760px] text-center md:mb-24",

        label:
          "text-[11px] uppercase tracking-[0.34em] text-[#2D3C68]/58",

        headline:
          "mx-auto mt-5 max-w-[760px] font-[Gambarino] text-[42px] leading-[1.02] tracking-[-0.03em] text-[#2D3C68] sm:text-[54px] md:text-[68px]",

        description:
          "mx-auto mt-6 max-w-[620px] text-[15px] leading-[1.8] text-[#2D3C68]/72 md:text-[16px]",

        grid:
          "grid items-start gap-14 md:grid-cols-2 md:gap-12 xl:gap-16",

        card:
          "mx-auto w-full max-w-[480px]",

        rightCard:
          "mx-auto w-full max-w-[480px] md:pt-14",

        imageFrame:
          "relative aspect-[4/5] overflow-hidden shadow-[0_24px_60px_rgba(45,60,104,0.08)]",

        image:
          "object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]",

        overlayLeft:
          "absolute inset-0 bg-gradient-to-t from-[#2D3C68]/12 via-transparent to-transparent",

        overlayRight:
          "absolute inset-0 bg-gradient-to-t from-[#2D3C68]/14 via-transparent to-transparent",

        cardText: "mt-8",

        cardTitle:
          "font-[Gambarino] text-[30px] leading-[1.08] tracking-[-0.02em] text-[#2D3C68]",

        cardBody:
          "mt-3 max-w-[460px] text-[15px] leading-[1.82] text-[#2D3C68]/68",

        cardBodyRight:
          "mt-3 max-w-[450px] text-[15px] leading-[1.82] text-[#2D3C68]/68",

        ctaWrap: "mt-16 flex justify-center md:mt-20",

        cta:
          "inline-flex items-center justify-center rounded-full border border-[#2D3C68]/24 px-7 py-3 text-[12px] uppercase tracking-[0.14em] text-[#2D3C68]/72 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#2D3C68] hover:text-[#2D3C68] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B08D57]",
      },
    };
  }

  const config = configRef.current;

  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headlineRef = useRef(null);
  const descRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cards = [leftRef.current, rightRef.current].filter(Boolean);

    if (prefersReducedMotion) {
      gsap.set(
        [
          labelRef.current,
          headlineRef.current,
          descRef.current,
          ...cards,
          ctaRef.current,
        ].filter(Boolean),
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        }
      );

      return;
    }

    const ctx = gsap.context(() => {
      const ease = config.animation.ease;

      if (labelRef.current) {
        gsap.fromTo(labelRef.current, config.animation.label.from, {
          ...config.animation.label.to,
          ease,
          scrollTrigger: {
            trigger: labelRef.current,
            start: config.animation.label.start,
            once: true,
          },
        });
      }

      if (headlineRef.current) {
        gsap.fromTo(headlineRef.current, config.animation.headline.from, {
          ...config.animation.headline.to,
          ease,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: config.animation.headline.start,
            once: true,
          },
        });
      }

      if (descRef.current) {
        gsap.fromTo(descRef.current, config.animation.description.from, {
          ...config.animation.description.to,
          ease,
          scrollTrigger: {
            trigger: descRef.current,
            start: config.animation.description.start,
            once: true,
          },
        });
      }

      if (cards.length > 0) {
        gsap.fromTo(cards, config.animation.card.from, {
          ...config.animation.card.to,
          ease,
          scrollTrigger: {
            trigger: leftRef.current,
            start: config.animation.card.start,
            once: true,
          },
        });
      }

      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current, config.animation.cta.from, {
          ...config.animation.cta.to,
          ease,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: config.animation.cta.start,
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [config]);

  return (
    <section ref={sectionRef} className={config.classes.section}>
      {/* ATMOSPHERIC BRIDGE — IN */}
      <div className={config.classes.topBridge} />

      {/* COOL MEMORY */}
      <div className={config.classes.coolTexture} />

      {/* WARM ONBOARD ATMOSPHERE */}
      <div className={config.classes.warmAtmosphere} />

      {/* ATMOSPHERIC BRIDGE — OUT */}
      <div className={config.classes.bottomBridge} />

      <div className={config.classes.inner}>
        {/* HEADER */}
        <div className={config.classes.header}>
          <p ref={labelRef} className={config.classes.label}>
            {config.text.label}
          </p>

          <h2 ref={headlineRef} className={config.classes.headline}>
            {config.text.headline}
          </h2>

          <p ref={descRef} className={config.classes.description}>
            {config.text.description}
          </p>
        </div>

        {/* GRID */}
        <div className={config.classes.grid}>
          {/* LEFT */}
          <div ref={leftRef} className={config.classes.card}>
            <div className={config.classes.imageFrame}>
              <Image
                src={config.images.left}
                alt="Gathering on the deck of Serenity"
                fill
                sizes="(max-width: 767px) 100vw, 40vw"
                className={config.classes.image}
              />

              <div className={config.classes.overlayLeft} />
            </div>

            <div className={config.classes.cardText}>
              <h3 className={config.classes.cardTitle}>
                {config.text.leftTitle}
              </h3>

              <p className={config.classes.cardBody}>
                {config.text.leftDescription}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div ref={rightRef} className={config.classes.rightCard}>
            <div className={config.classes.imageFrame}>
              <Image
                src={config.images.right}
                alt="Quiet moment on board Serenity"
                fill
                sizes="(max-width: 767px) 100vw, 40vw"
                className={config.classes.image}
              />

              <div className={config.classes.overlayRight} />
            </div>

            <div className={config.classes.cardText}>
              <h3 className={config.classes.cardTitle}>
                {config.text.rightTitle}
              </h3>

              <p className={config.classes.cardBodyRight}>
                {config.text.rightDescription}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className={config.classes.ctaWrap}>
          <Link href="/yacht" className={config.classes.cta}>
            {config.text.cta}
          </Link>
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

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const mm = gsap.matchMedia();

    mm.add(
      {
        mobile: "(max-width: 767px)",
        desktop: "(min-width: 768px)",
      },
      (context) => {
        const { mobile } = context.conditions;

        const SEAM_TOP = mobile ? 63 : 53.5;
        const SEAM_BOTTOM = mobile ? 49 : 49.5;

        const LEFT_CLIP = `polygon(0 0, ${SEAM_TOP}% 0, ${SEAM_BOTTOM}% 100%, 0 100%)`;

        const RIGHT_CLIP = `polygon(${SEAM_TOP}% 0, 100% 0, 100% 100%, ${SEAM_BOTTOM}% 100%)`;

        const setSeamCoordinates = () => {
          if (!seamRef.current) return;

          seamRef.current.setAttribute("x1", `${SEAM_TOP}%`);
          seamRef.current.setAttribute("y1", "0%");
          seamRef.current.setAttribute("x2", `${SEAM_BOTTOM}%`);
          seamRef.current.setAttribute("y2", "100%");
        };

        setSeamCoordinates();

        if (reduceMotion) {
          gsap.set(leftClipRef.current, {
            clipPath: LEFT_CLIP,
          });

          gsap.set(rightClipRef.current, {
            clipPath: RIGHT_CLIP,
          });

          gsap.set([leftImgRef.current, rightImgRef.current], {
            scale: 1,
            y: 0,
          });

          gsap.set(seamRef.current, {
            opacity: mobile ? 0.08 : 0.065,
            scaleY: 1,
            transformOrigin: "center center",
          });

          gsap.set(
            [
              eyebrowRef.current,
              leftContentRef.current,
              rightContentRef.current,
              ctaRef.current,
            ].filter(Boolean),
            {
              opacity: 1,
              x: 0,
              y: 0,
            }
          );

          return;
        }

        const ctx = gsap.context(() => {
          gsap.set(leftClipRef.current, {
            clipPath:
              "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          });

          gsap.set(rightClipRef.current, {
            clipPath:
              "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
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

          gsap.set(eyebrowRef.current, {
            opacity: 0,
            y: 10,
          });

          gsap.set(leftContentRef.current, {
            opacity: 0,
            x: mobile ? -18 : -28,
            y: mobile ? 10 : 0,
          });

          gsap.set(rightContentRef.current, {
            opacity: 0,
            x: mobile ? 18 : 28,
            y: mobile ? 14 : 0,
          });

          gsap.set(ctaRef.current, {
            opacity: 0,
            y: 12,
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: mobile ? "+=125%" : "+=155%",
              scrub: mobile ? 0.85 : 1.1,
              pin: true,
              pinSpacing: true,
            },
          });

          /*
            PHASE 1 — SPLIT REVEAL
          */

          tl.to(
            leftClipRef.current,
            {
              clipPath: LEFT_CLIP,
              duration: 1,
              ease: "power2.out",
            },
            0
          );

          tl.to(
            rightClipRef.current,
            {
              clipPath: RIGHT_CLIP,
              duration: 1,
              ease: "power2.out",
            },
            mobile ? 0.16 : 0.025
          );

          tl.to(
            leftImgRef.current,
            {
              scale: mobile ? 1.035 : 1.012,
              duration: 1.15,
              ease: "power1.out",
            },
            0
          );

          tl.to(
            rightImgRef.current,
            {
              scale: mobile ? 1.04 : 1.02,
              duration: 1.18,
              ease: "power1.out",
            },
            mobile ? 0.08 : 0
          );

          /*
            PHASE 2 — SEAM + EYEBROW
          */

          tl.to(
            seamRef.current,
            {
              opacity: mobile ? 0.1 : 0.085,
              scaleY: 1,
              duration: 0.72,
              ease: "sine.inOut",
            },
            mobile ? 0.4 : 0.44
          );

          tl.to(
            eyebrowRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power2.out",
            },
            0.52
          );

          /*
            PHASE 3 — DESTINATION CONTENT
          */

          tl.to(
            leftContentRef.current,
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
            },
            mobile ? 0.58 : 0.76
          );

          tl.to(
            rightContentRef.current,
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
            },
            mobile ? 0.72 : 0.81
          );

          /*
            PHASE 4 — CTA
          */

          tl.to(
            ctaRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
            },
            mobile ? 0.9 : 1.12
          );

          /*
            PHASE 5 — ENVIRONMENTAL DRIFT
            integrated into the pinned timeline
          */

          tl.to(
            leftImgRef.current,
            {
              y: mobile ? -18 : -26,
              duration: 0.95,
              ease: "none",
            },
            mobile ? 0.98 : 1.12
          );

          tl.to(
            rightImgRef.current,
            {
              y: mobile ? -24 : -38,
              duration: 0.95,
              ease: "none",
            },
            mobile ? 1.02 : 1.12
          );

          /*
            PHASE 6 — SEAM RELEASE
          */

          tl.to(
            seamRef.current,
            {
              opacity: mobile ? 0.055 : 0.04,
              duration: 0.75,
              ease: "sine.out",
            },
            mobile ? 1.08 : 1.2
          );
        }, sectionRef);

        return () => ctx.revert();
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
        bg-[#0B1322]
      "
    >
      <div
        className="
          relative
          h-[100svh]
          min-h-[620px]
          overflow-hidden
          md:h-screen
          md:min-h-[720px]
        "
      >
        {/* GLOBAL ATMOSPHERE */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[3]
            bg-gradient-to-t
            from-[#0B1322]/54
            via-[#0B1322]/[0.06]
            to-[#0B1322]/14
            md:from-[#0B1322]/46
            md:via-transparent
            md:to-[#0B1322]/16
          "
        />

        {/* ATMOSPHERIC BRIDGE — IN */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            z-[4]
            h-[220px]
            bg-gradient-to-b
            from-[#F4F5F2]/10
            via-[#F4F5F2]/[0.025]
            to-transparent
          "
        />

        {/* ATMOSPHERIC BRIDGE — OUT */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-[4]
            h-[180px]
            bg-gradient-to-b
            from-transparent
            via-[#F4F5F2]/[0.035]
            to-[#F4F5F2]/10
          "
        />

        {/* MOBILE RADIAL DEPTH */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[5]
            md:hidden
          "
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_72%,rgba(11,19,34,0.28),transparent_44%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_34%,rgba(11,19,34,0.20),transparent_38%)]" />
        </div>

        {/* LEFT CLIP */}
        <div
          ref={leftClipRef}
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            willChange: "clip-path",
          }}
        >
          <div
            ref={leftImgRef}
            className="absolute inset-0"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute inset-x-0 -top-[10%] h-[120%]">
              <Image
                src={DESTINATIONS[0].img}
                alt={DESTINATIONS[0].name.join(" ")}
                fill
                sizes="100vw"
                draggable={false}
                className="
                  select-none
                  object-cover
                  object-center
                "
              />
            </div>

            <div className="absolute inset-0 bg-[#243657]/10 mix-blend-multiply" />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-[#0B1322]/22
                via-[#0B1322]/[0.035]
                to-transparent
                md:from-[#0B1322]/14
                md:via-transparent
              "
            />
          </div>
        </div>

        {/* RIGHT CLIP */}
        <div
          ref={rightClipRef}
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath:
              "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
            willChange: "clip-path",
          }}
        >
          <div
            ref={rightImgRef}
            className="absolute inset-0"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute inset-x-0 -top-[14%] h-[126%] md:-top-[12%] md:h-[124%]">
              <Image
                src={DESTINATIONS[1].img}
                alt={DESTINATIONS[1].name.join(" ")}
                fill
                sizes="100vw"
                draggable={false}
                className="
                  select-none
                  object-cover
                  object-center
                "
              />
            </div>

            <div className="absolute inset-0 bg-[#1F2533]/18 mix-blend-multiply" />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-l
                from-[#0B1322]/24
                via-[#0B1322]/[0.04]
                to-transparent
                md:from-[#0B1322]/16
                md:via-transparent
              "
            />
          </div>
        </div>

        {/* SEAM — SVG LINE MATCHES CLIP PATH */}
        <svg
          className="
            pointer-events-none
            absolute
            inset-0
            z-20
            h-full
            w-full
          "
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <line
            ref={seamRef}
            x1="53.5%"
            y1="0%"
            x2="49.5%"
            y2="100%"
            stroke="rgba(244,245,242,0.24)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{
              opacity: 0,
              filter: "blur(0.1px)",
              transformOrigin: "center center",
              willChange: "transform, opacity",
            }}
          />
        </svg>

        {/* CONTENT */}
        <div
          className="
            absolute
            inset-0
            z-30
            flex
            flex-col
            justify-end
            px-6
            pb-[max(36px,env(safe-area-inset-bottom))]
            md:px-10
            md:pb-16
          "
        >
          {/* EYEBROW */}
          <div
            ref={eyebrowRef}
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-[13.5%]
              flex
              justify-center
              md:top-[15%]
            "
          >
            <span
              className="
                whitespace-nowrap
                text-[10px]
                uppercase
                tracking-[0.34em]
                text-[#F4F5F2]/26
              "
            >
              Indonesian Archipelago
            </span>
          </div>

          {/* DESTINATIONS ROW */}
          <div
            className="
              flex
              items-end
              justify-between
              gap-3
              md:gap-4
            "
          >
            {/* LEFT */}
            <div
              ref={leftContentRef}
              className="
                relative
                z-10
                max-w-[190px]
                md:max-w-[420px]
              "
            >
              <h2
                className="
                  font-[Gambarino]
                  text-[42px]
                  leading-[0.88]
                  tracking-[-0.055em]
                  text-[#F4F5F2]
                  md:text-[76px]
                "
              >
                {DESTINATIONS[0].name[0]}
                <br />
                {DESTINATIONS[0].name[1]}
              </h2>

              <p
                className="
                  mt-4
                  max-w-[185px]
                  text-[11px]
                  leading-[1.82]
                  tracking-[0.04em]
                  text-[#F4F5F2]/52
                  md:max-w-[300px]
                  md:text-[12px]
                  md:leading-[1.88]
                  md:tracking-[0.045em]
                "
              >
                {DESTINATIONS[0].sub}
              </p>
            </div>

            {/* RIGHT */}
            <div
              ref={rightContentRef}
              className="
                relative
                z-10
                max-w-[180px]
                text-right
                md:mb-[-2vh]
                md:mr-[5vw]
                md:max-w-[390px]
              "
            >
              <h2
                className="
                  font-[Gambarino]
                  text-[38px]
                  leading-[0.88]
                  tracking-[-0.055em]
                  text-[#F4F5F2]
                  md:text-[64px]
                "
              >
                {DESTINATIONS[1].name[0]}
                <br />
                {DESTINATIONS[1].name[1]}
              </h2>

              <p
                className="
                  ml-auto
                  mt-3
                  max-w-[170px]
                  text-[11px]
                  leading-[1.82]
                  tracking-[0.04em]
                  text-[#F4F5F2]/50
                  md:max-w-[270px]
                  md:text-[12px]
                  md:leading-[1.85]
                "
              >
                {DESTINATIONS[1].sub}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div
            ref={ctaRef}
            className="
              mt-8
              flex
              justify-center
              md:absolute
              md:inset-x-0
              md:bottom-12
            "
          >
            <Link
              href="/destinations"
              className="
                group
                inline-flex
                items-center
                gap-4
                border-b
                border-[#F4F5F2]/28
                pb-[10px]
                text-[11px]
                uppercase
                tracking-[0.24em]
                text-[#F4F5F2]/80
                transition-colors
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:border-[#F4F5F2]/72
                hover:text-[#F4F5F2]
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#B08D57]
              "
            >
              Explore the Routes
              <span className="transition-transform duration-500 group-hover:translate-x-[4px]">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 

function Yacht() {
  const configRef = useRef(null);

  if (!configRef.current) {
    configRef.current = {
      images: {
        yacht:
          "https://res.cloudinary.com/dombq6plz/image/upload/v1777394633/e75ce606-c6fd-4eae-8739-12516236bfec_1_ohoghl.png",

        upperDeck:
          "https://res.cloudinary.com/dombq6plz/image/upload/v1776068967/40_oxbvdi.webp",

        cabins:
          "https://res.cloudinary.com/dombq6plz/image/upload/v1776068961/27_unvtvm.webp",

        crew:
          "https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/07_iujxr6.webp",
      },

      text: {
        label: "The Yacht",

        headlineLine1: "Designed for the way",

        headlineLine2: "people live at sea",

        description:
          "Open decks, quiet cabins, shared spaces, and enough room for twelve people to move through the day without ever feeling crowded.",

        upperDeckTitle: "Upper Deck",

        upperDeckDesc:
          "Sunbeds, open sky, and the full width of the sea on every side.",

        cabinsTitle: "Four Cabins",

        cabinsDesc:
          "Private rooms designed for calm, rest, and time entirely your own.",

        crewTitle: "Crew",

        crewDesc: "Ten crew who know every current by name.",

        microLabel: "Vessel",

        microNumber: "40.75m",

        microMobileDesc:
          "Handcrafted phinisi, built 2025 in South Sulawesi.",

        microDesktopDesc:
          "Handcrafted phinisi, built 2025 in Tanah Beru, South Sulawesi.",

        primaryCta: "Explore The Yacht",

        utilityDeckPlan: "View Deck Plan",

        utilityBrochure: "Download Brochure",

        utilitySpecs: "View Specifications",
      },

      routes: {
        yacht: "/yacht",

        deckPlan: "/yacht#deck-plan",

        brochure: "/brochure.pdf",

        specifications: "/yacht#specifications",
      },

      animation: {
        ease: "power3.out",

        label: {
          from: {
            opacity: 0,
            y: 10,
          },

          to: {
            opacity: 1,
            y: 0,
            duration: 1.05,
          },
        },

        headline: {
          from: {
            opacity: 0,
            y: 24,
            filter: "blur(7px)",
          },

          to: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.36,
          },
        },

        description: {
          from: {
            opacity: 0,
            y: 18,
            filter: "blur(5px)",
          },

          to: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.28,
          },
        },

        mobileCards: {
          from: {
            opacity: 0,
            y: 28,
            filter: "blur(7px)",
          },

          to: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.04,
            stagger: 0.12,
          },
        },

        desktopYacht: {
          from: {
            opacity: 0,
            scale: 0.965,
            y: 36,
            filter: "blur(12px)",
          },

          to: {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.7,
          },
        },

        desktopCards: {
          from: {
            opacity: 0,
            y: 34,
            filter: "blur(8px)",
          },

          to: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.13,
          },
        },

        cta: {
          from: {
            opacity: 0,
            y: 18,
          },

          to: {
            opacity: 1,
            y: 0,
            duration: 0.9,
          },
        },
      },

      classes: {
        section:
          "relative w-full overflow-hidden bg-[#F4F5F2] px-5 pb-[120px] pt-[88px] text-[#2D3C68] md:px-6 md:pb-[130px] md:pt-[120px]",

        topBridge:
          "pointer-events-none absolute inset-x-0 top-0 h-[150px] bg-gradient-to-b from-[#2D3C68]/[0.07] via-[#2D3C68]/[0.025] to-transparent",

        bottomBridge:
          "pointer-events-none absolute bottom-0 left-0 h-[130px] w-full bg-gradient-to-b from-transparent to-[#2D3C68]/[0.05]",

        coolAtmosphere:
          "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(45,60,104,0.05),transparent_48%)]",

        warmAtmosphere:
          "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(176,141,87,0.05),transparent_38%)]",

        container: "relative mx-auto max-w-[1440px]",

        header:
          "mx-auto mb-14 max-w-[680px] text-center md:mb-32",

        label:
          "text-[11px] uppercase tracking-[0.34em] text-[#2D3C68]/56",

        headline:
          "mt-6 font-[Gambarino] text-[42px] leading-[0.96] tracking-[-0.03em] text-[#2D3C68] md:text-[66px]",

        description:
          "mx-auto mt-5 max-w-[520px] text-[15px] leading-[1.86] text-[#2D3C68]/72 md:leading-[1.9]",

        mobileStack: "mx-auto max-w-[390px] md:hidden",

        mobileYachtPanel:
          "relative mx-auto flex justify-center pt-2",

        mobileYachtGlow:
          "pointer-events-none absolute left-1/2 top-[9%] h-[360px] w-[150px] -translate-x-1/2 rounded-full bg-[#D7C3A0]/18 blur-[72px]",

        mobileYachtFrame:
          "relative h-[430px] w-[122px]",

        mobileYachtShadow:
          "absolute inset-0 translate-y-[16px] scale-[0.92] rounded-full bg-[#2D3C68]/[0.075] blur-[24px]",

        mobileYachtHaze:
          "absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.12),transparent_58%)]",

        mobileYachtImageWrap:
          "relative h-full w-full opacity-[0.985] saturate-[0.95]",

        mobileYachtImage:
          "object-contain drop-shadow-[0_26px_42px_rgba(18,28,48,0.12)]",

        mobileSpecCard:
          "relative mt-9 overflow-hidden border border-[#2D3C68]/[0.08] bg-[#F4F5F2]/82 px-6 py-6 shadow-[0_26px_70px_rgba(20,30,50,0.06)] backdrop-blur-md",

        mobileSpecWarm:
          "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(176,141,87,0.09),transparent_56%)]",

        mobileSpecShine:
          "pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.16] to-transparent",

        mobileSpecLabel:
          "relative text-[10px] uppercase tracking-[0.24em] text-[#2D3C68]/50",

        mobileSpecNumber:
          "relative mt-2 font-[Gambarino] text-[40px] leading-none tracking-[-0.03em] text-[#2D3C68]",

        mobileSpecDesc:
          "relative mt-3 max-w-[280px] text-[13px] leading-[1.72] text-[#2D3C68]/68",

        mobileFeatureList:
          "mt-10 divide-y divide-[#2D3C68]/10 border-y border-[#2D3C68]/10",

        mobileFeatureRow:
          "grid grid-cols-[96px_1fr] items-center gap-5 py-5",

        mobileFeatureThumb:
          "relative aspect-[4/5] overflow-hidden shadow-[0_18px_42px_rgba(45,60,104,0.075)]",

        mobileFeatureImage:
          "object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",

        mobileFeatureOverlay:
          "pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2D3C68]/12 via-transparent to-transparent",

        mobileFeatureTitle:
          "font-[Gambarino] text-[26px] leading-[1.06] tracking-[-0.02em] text-[#2D3C68]",

        mobileFeatureDesc:
          "mt-2 text-[13px] leading-[1.7] text-[#2D3C68]/68",

        microCard:
          "relative overflow-hidden border border-[#2D3C68]/[0.06] bg-[#F4F5F2]/80 px-5 py-5 shadow-[0_28px_70px_rgba(20,30,50,0.05)] backdrop-blur-md md:px-7 md:py-7 md:shadow-[0_30px_80px_rgba(20,30,50,0.05)]",

        microWarm:
          "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(176,141,87,0.09),transparent_54%)] md:bg-[radial-gradient(circle_at_50%_0%,rgba(176,141,87,0.08),transparent_58%)]",

        microShine:
          "pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.14] to-transparent",

        microLabel:
          "relative text-[10px] uppercase tracking-[0.24em] text-[#2D3C68]/50",

        microNumber:
          "relative mt-2 font-[Gambarino] text-[36px] leading-none text-[#2D3C68] md:mt-3 md:text-[44px]",

        microDesc:
          "relative mt-2 text-[12px] leading-[1.75] text-[#2D3C68]/68 md:mt-3 md:text-[13px] md:leading-[1.8]",

        desktop: "hidden md:block",

        desktopStage: "relative h-[clamp(1180px,92vw,1320px)]",

        yachtGlow:
          "pointer-events-none absolute left-1/2 top-[18%] z-10 h-[560px] w-[240px] -translate-x-1/2 rounded-full bg-[#D7C3A0]/15 opacity-0 blur-[92px]",

        svg:
          "pointer-events-none absolute inset-0 z-20 h-full w-full",

        yachtParallax:
          "pointer-events-none absolute left-1/2 top-[-3%] z-20 -translate-x-1/2",

        yachtSize:
          "relative h-[clamp(900px,72vw,1020px)] w-[clamp(224px,17.5vw,252px)]",

        yachtShadow:
          "absolute inset-0 translate-y-[22px] scale-[0.94] rounded-full bg-black/[0.07] blur-[36px]",

        yachtHaze:
          "absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_58%)]",

        yachtImageWrap:
          "relative h-full w-full opacity-[0.985] saturate-[0.95]",

        yachtImage:
          "object-contain drop-shadow-[0_34px_56px_rgba(18,28,48,0.10)]",

        desktopCardA:
          "absolute left-[6.25%] top-[12.9%] z-30 w-[clamp(300px,25vw,360px)]",

        desktopCardB:
          "absolute right-[8.33%] top-[25%] z-30 w-[clamp(248px,20.1vw,290px)]",

        desktopCardC:
          "absolute left-[8.33%] top-[62.9%] z-30 w-[clamp(265px,21.5vw,310px)]",

        desktopMicro:
          "absolute right-[10.42%] top-[70.5%] z-30 w-[clamp(220px,17.3vw,250px)]",

        ctaWrapMobile:
          "flex flex-col items-center gap-5 pt-10",

        ctaWrapDesktop:
          "mt-10 flex justify-center",

        ctaInner: "flex flex-col items-center gap-6",

        ctaDivider:
          "h-px w-[140px] bg-gradient-to-r from-transparent via-[#B08D57]/40 to-transparent md:w-[150px]",

        primaryCta:
          "group inline-flex items-center gap-3 rounded-full border border-[#2D3C68]/18 px-7 py-3 text-[12px] uppercase tracking-[0.22em] text-[#2D3C68] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#2D3C68] hover:bg-[#2D3C68] hover:text-[#F4F5F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B08D57]",

        primaryArrow:
          "transition-transform duration-500 group-hover:translate-x-[3px] md:group-hover:translate-x-[4px]",

        utilityMobile:
          "flex flex-col items-center gap-3 pt-1",

        utilityDesktop: "flex items-center gap-7",

        utilityLink:
          "text-[11px] uppercase tracking-[0.18em] text-[#2D3C68]/44 transition-colors duration-300 hover:text-[#2D3C68]/72 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B08D57]",

        utilityDivider: "h-3 w-px bg-[#2D3C68]/14",
      },
    };
  }

  const config = configRef.current;

  const sectionRef = useRef(null);

  const labelRef = useRef(null);
  const headlineRef = useRef(null);
  const descRef = useRef(null);

  const mobileYachtRef = useRef(null);
  const mobileSpecRef = useRef(null);
  const mobileFeatureARef = useRef(null);
  const mobileFeatureBRef = useRef(null);
  const mobileFeatureCRef = useRef(null);
  const mobileCtaRef = useRef(null);

  const yachtParallaxRef = useRef(null);
  const yachtFloatRef = useRef(null);
  const yachtGlowRef = useRef(null);
  const svgRef = useRef(null);

  const desktopCardARef = useRef(null);
  const desktopCardBRef = useRef(null);
  const desktopCardCRef = useRef(null);
  const desktopMicroRef = useRef(null);
  const desktopCtaRef = useRef(null);

  useEffect(() => {
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

        const headerNodes = [
          labelRef.current,
          headlineRef.current,
          descRef.current,
        ].filter(Boolean);

        const mobileNodes = [
          mobileYachtRef.current,
          mobileSpecRef.current,
          mobileFeatureARef.current,
          mobileFeatureBRef.current,
          mobileFeatureCRef.current,
          mobileCtaRef.current,
        ].filter(Boolean);

        const desktopNodes = [
          yachtGlowRef.current,
          yachtParallaxRef.current,
          desktopCardARef.current,
          desktopCardBRef.current,
          desktopCardCRef.current,
          desktopMicroRef.current,
          desktopCtaRef.current,
        ].filter(Boolean);

        if (reduce) {
          gsap.set([...headerNodes, ...mobileNodes, ...desktopNodes], {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          });

          if (svgRef.current) {
            const paths = svgRef.current.querySelectorAll("path");

            gsap.set(paths, {
              strokeDashoffset: 0,
              opacity: 0.14,
            });
          }

          return;
        }

        const ctx = gsap.context(() => {
          const ease = config.animation.ease;

          const tl = gsap.timeline({
            defaults: {
              ease,
            },

            scrollTrigger: {
              trigger: sectionRef.current,
              start: mobile ? "top bottom-=40" : "top bottom-=100",
              once: true,
            },
          });

          /*
            TEXT — SEA-BREATH SYSTEM
          */

          if (labelRef.current) {
            tl.fromTo(
              labelRef.current,
              config.animation.label.from,
              {
                ...config.animation.label.to,
                ease,
              },
              0
            );
          }

          if (headlineRef.current) {
            tl.fromTo(
              headlineRef.current,
              config.animation.headline.from,
              {
                ...config.animation.headline.to,
                ease,
              },
              0.08
            );
          }

          if (descRef.current) {
            tl.fromTo(
              descRef.current,
              config.animation.description.from,
              {
                ...config.animation.description.to,
                ease,
              },
              0.22
            );
          }

          /*
            MOBILE FLOW
          */

          if (mobile) {
            tl.fromTo(
              [
                mobileYachtRef.current,
                mobileSpecRef.current,
                mobileFeatureARef.current,
                mobileFeatureBRef.current,
                mobileFeatureCRef.current,
              ].filter(Boolean),
              config.animation.mobileCards.from,
              {
                ...config.animation.mobileCards.to,
                ease,
              },
              0.5
            );

            if (mobileCtaRef.current) {
              tl.fromTo(
                mobileCtaRef.current,
                config.animation.cta.from,
                {
                  ...config.animation.cta.to,
                  ease,
                },
                "-=0.3"
              );
            }

            return;
          }

          /*
            DESKTOP FLOW
          */

          if (yachtGlowRef.current) {
            tl.fromTo(
              yachtGlowRef.current,
              {
                opacity: 0,
                scale: 0.98,
              },
              {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease,
              },
              0.34
            );
          }

          if (yachtParallaxRef.current) {
            tl.fromTo(
              yachtParallaxRef.current,
              config.animation.desktopYacht.from,
              {
                ...config.animation.desktopYacht.to,
                ease,
              },
              0.42
            );
          }

          tl.fromTo(
            [
              desktopCardARef.current,
              desktopCardBRef.current,
              desktopCardCRef.current,
              desktopMicroRef.current,
            ].filter(Boolean),
            config.animation.desktopCards.from,
            {
              ...config.animation.desktopCards.to,
              ease,
            },
            0.9
          );

          if (desktopCtaRef.current) {
            tl.fromTo(
              desktopCtaRef.current,
              config.animation.cta.from,
              {
                ...config.animation.cta.to,
                ease,
              },
              1.15
            );
          }

          /*
            CONNECTOR LINES
          */

          if (svgRef.current) {
            const paths = svgRef.current.querySelectorAll("path");

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
              opacity: 0.16,
              duration: 2,
              stagger: 0.24,
              ease: "power2.out",

              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
                once: true,
              },
            });
          }

          /*
            PARALLAX — STRUCTURAL, NOT FLOATING CARDS
          */

          if (yachtParallaxRef.current) {
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
          }

          /*
            SINGLE AMBIENT LOOP — YACHT ONLY
          */

          if (yachtFloatRef.current) {
            gsap.to(yachtFloatRef.current, {
              y: "+=10",
              duration: 5.4,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }
        }, sectionRef);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, [config]);

  return (
    <section ref={sectionRef} className={config.classes.section}>
      {/* ATMOSPHERIC TRANSITIONS */}
      <div className={config.classes.topBridge} />
      <div className={config.classes.bottomBridge} />

      {/* GLOBAL ATMOSPHERE */}
      <div className={config.classes.coolAtmosphere} />
      <div className={config.classes.warmAtmosphere} />

      <div className={config.classes.container}>
        {/* HEADER */}
        <div className={config.classes.header}>
          <p ref={labelRef} className={config.classes.label}>
            {config.text.label}
          </p>

          <h2 ref={headlineRef} className={config.classes.headline}>
            {config.text.headlineLine1}
            <br />
            {config.text.headlineLine2}
          </h2>

          <p ref={descRef} className={config.classes.description}>
            {config.text.description}
          </p>
        </div>

        {/* MOBILE — VESSEL BRIEFING */}
        <div className={config.classes.mobileStack}>
          {/* TOP-DOWN YACHT RENDER */}
          <div ref={mobileYachtRef} className={config.classes.mobileYachtPanel}>
            <div className={config.classes.mobileYachtGlow} />

            <div className={config.classes.mobileYachtFrame}>
              <div className={config.classes.mobileYachtShadow} />
              <div className={config.classes.mobileYachtHaze} />

              <div className={config.classes.mobileYachtImageWrap}>
                <Image
                  src={config.images.yacht}
                  alt="Top down Serenity phinisi yacht"
                  fill
                  priority
                  sizes="122px"
                  className={config.classes.mobileYachtImage}
                />
              </div>
            </div>
          </div>

          {/* VESSEL SPEC */}
          <div ref={mobileSpecRef} className={config.classes.mobileSpecCard}>
            <div className={config.classes.mobileSpecWarm} />
            <div className={config.classes.mobileSpecShine} />

            <p className={config.classes.mobileSpecLabel}>
              {config.text.microLabel}
            </p>

            <p className={config.classes.mobileSpecNumber}>
              {config.text.microNumber}
            </p>

            <p className={config.classes.mobileSpecDesc}>
              {config.text.microMobileDesc}
            </p>
          </div>

          {/* FEATURE ROWS */}
          <div className={config.classes.mobileFeatureList}>
            <MobileFeatureRow
              refProp={mobileFeatureARef}
              image={config.images.upperDeck}
              title={config.text.upperDeckTitle}
              desc={config.text.upperDeckDesc}
              sizes="96px"
              config={config}
            />

            <MobileFeatureRow
              refProp={mobileFeatureBRef}
              image={config.images.cabins}
              title={config.text.cabinsTitle}
              desc={config.text.cabinsDesc}
              sizes="96px"
              config={config}
            />

            <MobileFeatureRow
              refProp={mobileFeatureCRef}
              image={config.images.crew}
              title={config.text.crewTitle}
              desc={config.text.crewDesc}
              sizes="96px"
              config={config}
            />
          </div>

          {/* CTA CLUSTER */}
          <div ref={mobileCtaRef} className={config.classes.ctaWrapMobile}>
            <div className={config.classes.ctaDivider} />

            <Link
              href={config.routes.yacht}
              className={config.classes.primaryCta}
            >
              {config.text.primaryCta}

              <span className={config.classes.primaryArrow}>→</span>
            </Link>

            <div className={config.classes.utilityMobile}>
              <Link
                href={config.routes.deckPlan}
                className={config.classes.utilityLink}
              >
                {config.text.utilityDeckPlan}
              </Link>

              <a
                href={config.routes.brochure}
                download
                className={config.classes.utilityLink}
              >
                {config.text.utilityBrochure}
              </a>

              <Link
                href={config.routes.specifications}
                className={config.classes.utilityLink}
              >
                {config.text.utilitySpecs}
              </Link>
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className={config.classes.desktop}>
          <div className={config.classes.desktopStage}>
            {/* YACHT GLOW — STATIC / ENTRANCE ONLY */}
            <div ref={yachtGlowRef} className={config.classes.yachtGlow} />

            {/* CONNECTOR LINES */}
            <svg
              ref={svgRef}
              className={config.classes.svg}
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

            {/* CENTER YACHT */}
            <div
              ref={yachtParallaxRef}
              className={config.classes.yachtParallax}
            >
              <div ref={yachtFloatRef}>
                <div className={config.classes.yachtSize}>
                  <div className={config.classes.yachtShadow} />
                  <div className={config.classes.yachtHaze} />

                  <div className={config.classes.yachtImageWrap}>
                    <Image
                      src={config.images.yacht}
                      alt="Top down Serenity phinisi yacht"
                      fill
                      priority
                      sizes="(min-width: 768px) 252px, 0px"
                      className={config.classes.yachtImage}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CARD A */}
            <div
              ref={desktopCardARef}
              className={config.classes.desktopCardA}
            >
              <CardBlock
                image={config.images.upperDeck}
                title={config.text.upperDeckTitle}
                desc={config.text.upperDeckDesc}
                sizes="360px"
                large
              />
            </div>

            {/* CARD B */}
            <div
              ref={desktopCardBRef}
              className={config.classes.desktopCardB}
            >
              <CardBlock
                image={config.images.cabins}
                title={config.text.cabinsTitle}
                desc={config.text.cabinsDesc}
                sizes="290px"
              />
            </div>

            {/* CARD C */}
            <div
              ref={desktopCardCRef}
              className={config.classes.desktopCardC}
            >
              <CardBlock
                image={config.images.crew}
                title={config.text.crewTitle}
                desc={config.text.crewDesc}
                sizes="310px"
              />
            </div>

            {/* MICRO CARD */}
            <div
              ref={desktopMicroRef}
              className={config.classes.desktopMicro}
            >
              <div className={config.classes.microCard}>
                <div className={config.classes.microWarm} />
                <div className={config.classes.microShine} />

                <p className={config.classes.microLabel}>
                  {config.text.microLabel}
                </p>

                <p className={config.classes.microNumber}>
                  {config.text.microNumber}
                </p>

                <p className={config.classes.microDesc}>
                  {config.text.microDesktopDesc}
                </p>
              </div>
            </div>
          </div>

          {/* CTA CLUSTER */}
          <div ref={desktopCtaRef} className={config.classes.ctaWrapDesktop}>
            <div className={config.classes.ctaInner}>
              <div className={config.classes.ctaDivider} />

              <Link
                href={config.routes.yacht}
                className={config.classes.primaryCta}
              >
                {config.text.primaryCta}

                <span className={config.classes.primaryArrow}>→</span>
              </Link>

              <div className={config.classes.utilityDesktop}>
                <Link
                  href={config.routes.deckPlan}
                  className={config.classes.utilityLink}
                >
                  {config.text.utilityDeckPlan}
                </Link>

                <span className={config.classes.utilityDivider} />

                <a
                  href={config.routes.brochure}
                  download
                  className={config.classes.utilityLink}
                >
                  {config.text.utilityBrochure}
                </a>

                <span className={config.classes.utilityDivider} />

                <Link
                  href={config.routes.specifications}
                  className={config.classes.utilityLink}
                >
                  {config.text.utilitySpecs}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileFeatureRow({ refProp, image, title, desc, sizes, config }) {
  return (
    <article ref={refProp} className={config.classes.mobileFeatureRow}>
      <div className={config.classes.mobileFeatureThumb}>
        <Image
          src={image}
          alt={title}
          fill
          sizes={sizes}
          className={config.classes.mobileFeatureImage}
        />

        <div className={config.classes.mobileFeatureOverlay} />
      </div>

      <div>
        <h3 className={config.classes.mobileFeatureTitle}>{title}</h3>

        <p className={config.classes.mobileFeatureDesc}>{desc}</p>
      </div>
    </article>
  );
}

function CardBlock({ image, title, desc, sizes = "100vw", large = false }) {
  return (
    <article className="group">
      <div
        className={`
          relative
          overflow-hidden
          shadow-[0_24px_60px_rgba(45,60,104,0.08)]
          ${large ? "aspect-[4/5]" : "aspect-[4/5]"}
        `}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes={sizes}
          className="
            object-cover
            transition-transform
            duration-[1800ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:scale-[1.03]
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#2D3C68]/12 via-transparent to-transparent" />
      </div>

      <div className="mt-5 md:mt-6">
        <h3
          className="
            font-[Gambarino]
            text-[27px]
            leading-[1.08]
            tracking-[-0.02em]
            text-[#2D3C68]
            md:text-[28px]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-3
            max-w-[430px]
            text-[14px]
            leading-[1.78]
            text-[#2D3C68]/68
          "
        >
          {desc}
        </p>
      </div>
    </article>
  );
}

function OnboardCare() {
  const configRef = useRef(null);

  if (!configRef.current) {
    configRef.current = {
      images: {
        human:
          "https://res.cloudinary.com/dombq6plz/image/upload/v1777271186/ChatGPT_Image_Apr_27_2026_01_24_38_PM_iuf3mw.png",
      },

      text: {
        label: "Onboard Care",

        headlineLine1: "Ten crew around",

        headlineLine2: "twelve guests",

        description:
          "From meals and cabins to tender rides, anchorages, and the small timing of each day, the crew keeps the voyage moving without making it feel managed.",

        detailLabel: "Galley to Table",

        detailText:
          "Breakfast can follow the first swim. Dinner can wait until the anchorage settles and the light begins to fade.",
      },

      animation: {
        ease: "power3.out",

        label: {
          from: {
            opacity: 0,
            y: 10,
          },

          to: {
            opacity: 1,
            y: 0,
            duration: 1.05,
          },
        },

        headline: {
          from: {
            opacity: 0,
            y: 24,
            filter: "blur(7px)",
          },

          to: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.38,
            stagger: 0.14,
          },
        },

        description: {
          from: {
            opacity: 0,
            y: 18,
            filter: "blur(5px)",
          },

          to: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.28,
          },
        },

        rule: {
          from: {
            opacity: 0,
            scaleX: 0,
          },

          to: {
            opacity: 1,
            scaleX: 1,
            duration: 1.1,
          },
        },

        detail: {
          from: {
            opacity: 0,
            y: 14,
          },

          to: {
            opacity: 1,
            y: 0,
            duration: 1,
          },
        },

        image: {
          from: {
            opacity: 0,
            y: 30,
            scale: 1.018,
            filter: "blur(7px)",
          },

          to: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.45,
          },
        },
      },

      classes: {
        section:
          "relative w-full overflow-hidden bg-[#2D3C68] px-6 py-22 text-[#F4F5F2] md:px-10 md:py-28 lg:py-32",

        topBridge:
          "pointer-events-none absolute inset-x-0 top-0 z-[5] h-[150px] bg-gradient-to-b from-[#F4F5F2]/[0.105] via-[#F4F5F2]/[0.03] to-transparent md:h-[190px]",

        bottomBridge:
          "pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[145px] bg-gradient-to-b from-transparent via-[#1A2844]/[0.055] to-[#1A2844]/[0.16] md:h-[160px] md:via-[#1A2844]/[0.06] md:to-[#1A2844]/[0.18]",

        rightDepthSlab:
          "pointer-events-none absolute bottom-0 right-0 top-0 hidden w-[44%] bg-gradient-to-b from-[#172641]/88 via-[#1A2844]/66 to-[#142139]/90 md:block",

        rightDepthEdge:
          "pointer-events-none absolute bottom-0 right-[44%] top-0 hidden w-[22vw] bg-gradient-to-l from-[#172641]/42 via-[#172641]/14 to-transparent md:block",

        rightDepthLight:
          "pointer-events-none absolute right-0 top-0 hidden h-full w-[50%] bg-[radial-gradient(circle_at_58%_24%,rgba(176,141,87,0.13)_0%,rgba(176,141,87,0.04)_34%,transparent_64%)] md:block",

        depthAtmosphere:
          "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,rgba(11,19,34,0.32)_0%,transparent_50%)]",

        surfaceLight:
          "pointer-events-none absolute inset-0 bg-gradient-to-b from-[#F4F5F2]/[0.026] via-transparent to-[#0B1322]/[0.07]",

        container:
          "relative z-10 mx-auto max-w-[1240px]",

        layout:
          "grid items-center gap-10 md:grid-cols-12 md:gap-x-10 lg:gap-x-14",

        content:
          "order-1 md:col-span-5",

        label:
          "text-[10px] uppercase tracking-[0.34em] text-[#F4F5F2]/58 md:text-[11px]",

        headline:
          "mt-5 font-[Gambarino] text-[40px] leading-[1] tracking-[-0.035em] text-[#F4F5F2] sm:text-[48px] md:text-[clamp(48px,5vw,66px)] lg:text-[68px]",

        description:
          "mt-6 max-w-[470px] text-[15px] leading-[1.82] text-[#F4F5F2]/74 md:text-[16px] md:leading-[1.86]",

        rule:
          "mt-8 h-px w-full max-w-[340px] origin-left bg-gradient-to-r from-[#B08D57]/56 via-[#B08D57]/20 to-transparent md:mt-9 md:max-w-[520px]",

        desktopDetailBlock:
          "mt-8 hidden border-l border-[#B08D57]/40 pl-5 md:block",

        mobileDetailBlock:
          "order-3 mt-8 border-l border-[#B08D57]/40 pl-5 md:hidden",

        detailLabel:
          "text-[10px] uppercase tracking-[0.28em] text-[#F4F5F2]/54",

        detailText:
          "mt-2 max-w-[390px] text-[14px] leading-[1.76] text-[#F4F5F2]/69",

        imageWrap:
          "order-2 mx-auto w-[86%] max-w-[340px] md:relative md:col-span-6 md:col-start-7 md:mx-0 md:w-full md:max-w-none",

        imageBackplate:
          "pointer-events-none absolute -bottom-6 -right-6 -top-6 left-8 hidden bg-[#0B1322]/16 shadow-[0_36px_100px_rgba(5,10,20,0.18)] md:block",

        imageFrame:
          "relative aspect-[4/5] overflow-hidden shadow-[0_24px_64px_rgba(5,10,20,0.22)] md:aspect-auto md:h-[clamp(540px,66vh,720px)] md:shadow-[0_40px_104px_rgba(5,10,20,0.32)]",

        image:
          "object-cover object-center transition-transform duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.025]",

        imageOverlay:
          "pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1322]/38 via-transparent to-[#0B1322]/[0.05]",
      },
    };
  }

  const config = configRef.current;

  const sectionRef = useRef(null);

  const labelRef = useRef(null);
  const headlineRef = useRef(null);
  const descRef = useRef(null);
  const ruleRef = useRef(null);
  const desktopDetailRef = useRef(null);
  const mobileDetailRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
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

        const headlineLines =
          headlineRef.current?.querySelectorAll(".line") ?? [];

        const activeDetail = mobile
          ? mobileDetailRef.current
          : desktopDetailRef.current;

        const allNodes = [
          labelRef.current,
          ...headlineLines,
          descRef.current,
          ruleRef.current,
          activeDetail,
          imageRef.current,
        ].filter(Boolean);

        if (reduce) {
          gsap.set(allNodes, {
            opacity: 1,
            y: 0,
            scale: 1,
            scaleX: 1,
            filter: "blur(0px)",
          });

          return;
        }

        const ctx = gsap.context(() => {
          const ease = config.animation.ease;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: mobile ? "top 84%" : "top 72%",
              once: true,
            },
          });

          if (labelRef.current) {
            tl.fromTo(
              labelRef.current,
              config.animation.label.from,
              {
                ...config.animation.label.to,
                ease,
              },
              0
            );
          }

          if (headlineLines.length > 0) {
            tl.fromTo(
              headlineLines,
              config.animation.headline.from,
              {
                ...config.animation.headline.to,
                ease,
              },
              0.08
            );
          }

          if (descRef.current) {
            tl.fromTo(
              descRef.current,
              config.animation.description.from,
              {
                ...config.animation.description.to,
                ease,
              },
              0.28
            );
          }

          if (ruleRef.current) {
            tl.fromTo(
              ruleRef.current,
              config.animation.rule.from,
              {
                ...config.animation.rule.to,
                ease,
              },
              0.44
            );
          }

          if (imageRef.current) {
            tl.fromTo(
              imageRef.current,
              config.animation.image.from,
              {
                ...config.animation.image.to,
                ease,
              },
              mobile ? 0.58 : 0.12
            );
          }

          if (activeDetail) {
            tl.fromTo(
              activeDetail,
              config.animation.detail.from,
              {
                ...config.animation.detail.to,
                ease,
              },
              mobile ? 0.78 : 0.58
            );
          }
        }, sectionRef);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, [config]);

  return (
    <section
      ref={sectionRef}
      className={config.classes.section}
      style={{
        backgroundColor: "#2D3C68",
      }}
    >
      {/* DESKTOP DEPTH ARCHITECTURE */}
      <div className={config.classes.rightDepthSlab} />
      <div className={config.classes.rightDepthEdge} />
      <div className={config.classes.rightDepthLight} />

      {/* ATMOSPHERIC BRIDGES */}
      <div className={config.classes.topBridge} />
      <div className={config.classes.bottomBridge} />

      {/* GLOBAL ATMOSPHERE */}
      <div className={config.classes.depthAtmosphere} />
      <div className={config.classes.surfaceLight} />

      <div className={config.classes.container}>
        <div className={config.classes.layout}>
          {/* TEXT */}
          <div className={config.classes.content}>
            <p ref={labelRef} className={config.classes.label}>
              {config.text.label}
            </p>

            <h2 ref={headlineRef} className={config.classes.headline}>
              <span className="line block">
                {config.text.headlineLine1}
              </span>

              <span className="line block">
                {config.text.headlineLine2}
              </span>
            </h2>

            <p ref={descRef} className={config.classes.description}>
              {config.text.description}
            </p>

            <div ref={ruleRef} className={config.classes.rule} />

            {/* DESKTOP DETAIL */}
            <div
              ref={desktopDetailRef}
              className={config.classes.desktopDetailBlock}
            >
              <p className={config.classes.detailLabel}>
                {config.text.detailLabel}
              </p>

              <p className={config.classes.detailText}>
                {config.text.detailText}
              </p>
            </div>
          </div>

          {/* HUMAN ANCHOR IMAGE */}
          <figure ref={imageRef} className={config.classes.imageWrap}>
            <div className={config.classes.imageBackplate} />

            <div className={config.classes.imageFrame}>
              <Image
                src={config.images.human}
                alt="Crew member preparing food aboard Serenity"
                fill
                sizes="(max-width: 767px) 340px, (max-width: 1240px) 50vw, 600px"
                className={config.classes.image}
              />

              <div className={config.classes.imageOverlay} />
            </div>
          </figure>

          {/* MOBILE DETAIL */}
          <div
            ref={mobileDetailRef}
            className={config.classes.mobileDetailBlock}
          >
            <p className={config.classes.detailLabel}>
              {config.text.detailLabel}
            </p>

            <p className={config.classes.detailText}>
              {config.text.detailText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
  
function RatesSnapshot() {
  const configRef = useRef(null);

  if (!configRef.current) {
    configRef.current = {
      text: {
        label: "Rates & Schedule",
        headline: "Your voyage awaits.",
        intro: "Private charter. Per vessel.",
        minimumLabel: "Minimum",
        minimum: "5 nights",
        includedLabel: "Included",
        cta: "View Rates & Schedule",
      },

      routes: {
        rates: "/rates-and-schedule",
      },

      destinations: [
        {
          name: "Labuan Bajo",
          season: "May – Sep",
          rate: "$9,500",
          unit: "per night",
        },
        {
          name: "Raja Ampat",
          season: "Nov – Apr",
          rate: "$10,500",
          unit: "per night",
        },
      ],

      included: [
        "Full crew",
        "All meals",
        "Watersports equipment",
        "Fuel",
        "Park fees",
      ],
    };
  }

  const config = configRef.current;

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const ratesRef = useRef(null);
  const termsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

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

        const ratePanels =
          ratesRef.current?.querySelectorAll(".rate-panel") ?? [];

        const allNodes = [
          headerRef.current,
          ...ratePanels,
          termsRef.current,
          ctaRef.current,
        ].filter(Boolean);

        if (reduce) {
          gsap.set(allNodes, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          });

          return;
        }

        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: mobile ? "top 84%" : "top 76%",
              once: true,
            },
          });

          if (headerRef.current) {
            tl.fromTo(
              headerRef.current,
              {
                opacity: 0,
                y: mobile ? 14 : 18,
                filter: "blur(5px)",
              },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1,
                ease: serenityEase,
              },
              0
            );
          }

          if (ratePanels.length > 0) {
            tl.fromTo(
              ratePanels,
              {
                opacity: 0,
                y: mobile ? 18 : 22,
                filter: "blur(6px)",
              },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.08,
                stagger: mobile ? 0.08 : 0.1,
                ease: serenityEase,
              },
              mobile ? 0.16 : 0.14
            );
          }

          if (termsRef.current) {
            tl.fromTo(
              termsRef.current,
              {
                opacity: 0,
                y: 14,
                filter: "blur(4px)",
              },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.95,
                ease: serenityEase,
              },
              mobile ? 0.34 : 0.28
            );
          }

          if (ctaRef.current) {
            tl.fromTo(
              ctaRef.current,
              {
                opacity: 0,
                y: 10,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.88,
                ease: serenityEase,
              },
              mobile ? 0.48 : 0.42
            );
          }
        }, sectionRef);

        return () => ctx.revert();
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
        px-6
        pb-[58px]
        pt-[78px]
        text-[#2D3C68]
        md:px-10
        md:pb-[72px]
        md:pt-[104px]
      "
      style={{
        backgroundColor: "#F4F5F2",
        colorScheme: "light",
      }}
    >
      {/* SOFT BRIDGE FROM ONBOARD CARE */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-[160px]
          bg-gradient-to-b
          from-[#1A2844]/[0.105]
          via-[#2D3C68]/[0.034]
          to-transparent
          md:h-[180px]
        "
      />

      {/* RESTRAINED ATMOSPHERE */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_12%_18%,rgba(45,60,104,0.03),transparent_48%)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_84%_70%,rgba(176,141,87,0.032),transparent_48%)]
        "
      />

      <div className="relative mx-auto max-w-[1240px]">
        <div
          className="
            grid
            items-start
            gap-10
            md:grid-cols-12
            md:grid-rows-[auto_auto_auto]
            md:gap-x-10
            md:gap-y-0
            lg:gap-x-14
          "
        >
          {/* HEADER / INTRO */}
          <div
            ref={headerRef}
            className="
              md:col-span-5
              md:row-start-1
              md:pt-2
            "
          >
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.34em]
                text-[#2D3C68]/48
                md:text-[11px]
              "
            >
              {config.text.label}
            </p>

            <h2
              className="
                mt-5
                max-w-[470px]
                font-[Gambarino]
                text-[40px]
                leading-[1]
                tracking-[-0.035em]
                text-[#2D3C68]
                min-[390px]:text-[42px]
                sm:text-[50px]
                md:text-[clamp(54px,5vw,68px)]
              "
            >
              {config.text.headline}
            </h2>

            <p
              className="
                mt-5
                max-w-[340px]
                text-[11px]
                uppercase
                leading-[1.85]
                tracking-[0.17em]
                text-[#2D3C68]/46
                sm:text-[12px]
                sm:tracking-[0.18em]
              "
            >
              {config.text.intro}
            </p>
          </div>

          {/* RATE PROOF — MOBILE COMES BEFORE TERMS / CTA */}
          <div
            ref={ratesRef}
            className="
              md:col-span-6
              md:col-start-7
              md:row-start-1
              md:row-span-3
              md:self-start
            "
          >
            <div
              className="
                ml-auto
                w-full
                max-w-[660px]
                overflow-hidden
                border-y
                border-[#2D3C68]/12
                bg-white/[0.18]
              "
            >
              {config.destinations.map((destination) => (
                <article
                  key={destination.name}
                  className="
                    rate-panel
                    relative
                    grid
                    gap-5
                    border-t
                    border-[#2D3C68]/10
                    px-0
                    py-7
                    first:border-t-0
                    sm:px-2
                    md:grid-cols-[minmax(150px,0.62fr)_auto]
                    md:items-end
                    md:gap-8
                    md:px-7
                    md:py-8
                  "
                >
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-x-0
                      top-0
                      h-px
                      bg-gradient-to-r
                      from-transparent
                      via-[#B08D57]/22
                      to-transparent
                      opacity-70
                    "
                  />

                  <div>
                    <p
                      className="
                        text-[10px]
                        uppercase
                        tracking-[0.24em]
                        text-[#2D3C68]/62
                        md:text-[11px]
                        md:tracking-[0.26em]
                      "
                    >
                      {destination.name}
                    </p>

                    <p
                      className="
                        mt-2
                        text-[13px]
                        leading-[1.65]
                        text-[#8B6A4F]/82
                      "
                    >
                      {destination.season}
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      flex-wrap
                      items-end
                      gap-x-2
                      gap-y-1
                      md:justify-end
                      md:gap-x-2.5
                    "
                  >
                    <p
                      className="
                        font-[Gambarino]
                        text-[50px]
                        leading-none
                        tracking-[-0.045em]
                        text-[#2D3C68]
                        min-[390px]:text-[54px]
                        sm:text-[60px]
                        md:text-[clamp(58px,5.2vw,72px)]
                      "
                    >
                      {destination.rate}
                    </p>

                    <p
                      className="
                        mb-1
                        text-[10px]
                        uppercase
                        tracking-[0.14em]
                        text-[#2D3C68]/44
                        sm:text-[11px]
                        sm:tracking-[0.16em]
                        md:mb-2
                      "
                    >
                      {destination.unit}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* TERMS — DESKTOP LEFT COLUMN, MOBILE AFTER RATES */}
          <div
            ref={termsRef}
            className="
              md:col-span-5
              md:row-start-2
              md:mt-10
            "
          >
            <div
              className="
                border-t
                border-[#2D3C68]/10
                pt-7
              "
            >
              <div
                className="
                  grid
                  gap-6
                  sm:grid-cols-[0.42fr_1fr]
                  md:grid-cols-1
                "
              >
                <div>
                  <p
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.28em]
                      text-[#B08D57]/78
                    "
                  >
                    {config.text.minimumLabel}
                  </p>

                  <p
                    className="
                      mt-2
                      font-[Gambarino]
                      text-[24px]
                      leading-none
                      tracking-[-0.02em]
                      text-[#2D3C68]
                      sm:text-[25px]
                    "
                  >
                    {config.text.minimum}
                  </p>
                </div>

                <div>
                  <p
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.28em]
                      text-[#B08D57]/78
                    "
                  >
                    {config.text.includedLabel}
                  </p>

                  <p
                    className="
                      mt-2
                      max-w-[480px]
                      text-[13px]
                      leading-[1.82]
                      text-[#2D3C68]/62
                      md:text-[14px]
                      md:leading-[1.85]
                    "
                  >
                    {config.included.map((item, index) => (
                      <span key={item}>
                        {item}
                        {index < config.included.length - 1 && (
                          <span className="mx-1.5 text-[#B08D57]/58 sm:mx-2">
                            ·
                          </span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA — DESKTOP LEFT COLUMN, MOBILE LAST */}
          <div
            ref={ctaRef}
            className="
              md:col-span-5
              md:row-start-3
              md:mt-8
            "
          >
            <div
              className="
                mb-8
                h-px
                w-full
                max-w-[420px]
                bg-gradient-to-r
                from-[#B08D57]/34
                to-transparent
              "
            />

            <Link
              href={config.routes.rates}
              className="
                group
                inline-flex
                min-h-[46px]
                w-full
                items-center
                justify-center
                gap-3
                rounded-full
                border
                border-[#2D3C68]/18
                px-5
                py-3
                text-[11px]
                uppercase
                tracking-[0.16em]
                text-[#2D3C68]
                transition-all
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:border-[#2D3C68]
                hover:bg-[#2D3C68]
                hover:text-[#F4F5F2]
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#B08D57]
                sm:w-fit
                sm:px-7
                sm:text-[12px]
                sm:tracking-[0.22em]
              "
            >
              {config.text.cta}

              <span
                className="
                  transition-transform
                  duration-500
                  group-hover:translate-x-[3px]
                "
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FramesAtSea() {
  const configRef = useRef(null);

  if (!configRef.current) {
    configRef.current = {
      images: [
        {
          src: "https://res.cloudinary.com/dombq6plz/image/upload/v1778425837/ChatGPT_Image_May_10_2026_10_10_05_PM_1_dv3ebm.png",
          alt: "Quiet onboard dining detail aboard Serenity",
        },
        {
          src: "https://res.cloudinary.com/dombq6plz/image/upload/v1778511762/ChatGPT_Image_May_11_2026_09_55_36_PM_a2mixz.png",
          alt: "Calm Indonesian water and islands during a Serenity voyage",
        },
        {
          src: "https://res.cloudinary.com/dombq6plz/image/upload/v1778424753/ChatGPT_Image_May_10_2026_09_51_01_PM_xfhbnv.png",
          alt: "Human service moment aboard Serenity",
        },
        {
          src: "https://res.cloudinary.com/dombq6plz/image/upload/v1776869679/ChatGPT_Image_Apr_22_2026_09_52_27_PM_sk1t1e.png",
          alt: "Warm evening atmosphere aboard Serenity",
        },
      ],

      animation: {
        from: {
          opacity: 0,
          y: 14,
          filter: "blur(5px)",
        },

        to: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.95,
          stagger: 0.055,
        },
      },

      classes: {
        section:
          "relative w-full overflow-hidden bg-[#F4F5F2] px-6 pb-[76px] pt-0 text-[#2D3C68] md:px-10 md:pb-[96px]",

        container:
          "relative mx-auto max-w-[1240px]",

        grid:
          "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5",

        frame:
          "silent-frame group relative overflow-hidden bg-[#2D3C68]/[0.035]",

        imageBox:
          "relative aspect-[4/5] overflow-hidden",

        image:
          "object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.018]",

        imageOverlay:
          "pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1322]/12 via-transparent to-transparent",

        imageRing:
          "pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#2D3C68]/[0.055]",
      },
    };
  }

  const config = configRef.current;

  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const frames = gridRef.current?.querySelectorAll(".silent-frame") ?? [];

    if (reduce) {
      gsap.set(frames, {
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

    const ctx = gsap.context(() => {
      gsap.fromTo(
        frames,
        config.animation.from,
        {
          ...config.animation.to,
          ease: serenityEase,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 84%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [config]);

  return (
    <section
      ref={sectionRef}
      aria-label="Visual moments aboard Serenity"
      className={config.classes.section}
      style={{
        backgroundColor: "#F4F5F2",
        colorScheme: "light",
      }}
    >
      <div className={config.classes.container}>
        <div ref={gridRef} className={config.classes.grid}>
          {config.images.map((image, index) => (
            <article
              key={`${image.src}-${index}`}
              className={config.classes.frame}
            >
              <div className={config.classes.imageBox}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="
                    (max-width: 767px) 50vw,
                    (max-width: 1279px) 25vw,
                    300px
                  "
                  className={config.classes.image}
                />

                <div className={config.classes.imageOverlay} />
              </div>

              <div className={config.classes.imageRing} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


















function FinalCTA() {
  const configRef = useRef(null);

  if (!configRef.current) {
    configRef.current = {
      image: {
        src: "https://res.cloudinary.com/dombq6plz/image/upload/v1778922404/ChatGPT_Image_May_16_2026_04_03_53_PM_yqjf6x.png",
      },

      text: {
        label: "Private Charter Inquiry",
        headlineLine1: "Your voyage begins",
        headlineLine2: "with a conversation",
        body:
          "Share your preferred route, dates, and guest count. Serenity’s team will prepare the next step.",
        cta: "Begin Your Voyage",
      },

      routes: {
        contact: "/contact",
      },
    };
  }

  const config = configRef.current;

  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const labelRef = useRef(null);
  const headlineRef = useRef(null);
  const bodyRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const headlineLines =
      headlineRef.current?.querySelectorAll(".line") ?? [];

    const allNodes = [
      imageRef.current,
      labelRef.current,
      ...headlineLines,
      bodyRef.current,
      ctaRef.current,
    ].filter(Boolean);

    if (reduce) {
      gsap.set(allNodes, {
        opacity: 1,
        y: 0,
        scale: 1,
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

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      tl.fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: 1.03,
          filter: "blur(5px)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.32,
          ease: serenityEase,
        },
        0
      );

      tl.fromTo(
        labelRef.current,
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.88,
          ease: serenityEase,
        },
        0.12
      );

      if (headlineLines.length > 0) {
        tl.fromTo(
          headlineLines,
          {
            opacity: 0,
            y: 22,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.16,
            stagger: 0.1,
            ease: serenityEase,
          },
          0.22
        );
      }

      tl.fromTo(
        bodyRef.current,
        {
          opacity: 0,
          y: 16,
          filter: "blur(4px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: serenityEase,
        },
        0.44
      );

      tl.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          y: 12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.88,
          ease: serenityEase,
        },
        0.6
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        flex
        min-h-[68svh]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#0B1322]
        px-6
        py-24
        text-[#F4F5F2]
        md:min-h-[74svh]
        md:px-10
        md:py-32
      "
      style={{
        backgroundColor: "#0B1322",
        colorScheme: "dark",
      }}
    >
      {/* BACKGROUND IMAGE — DECORATIVE */}
      <div
        ref={imageRef}
        aria-hidden="true"
        className="absolute inset-0 z-0"
      >
        <Image
          src={config.image.src}
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="
            object-cover
            object-center
          "
        />
      </div>

      {/* SOFT LIGHT-TO-DARK BRIDGE FROM FRAMES */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-[4]
          h-[170px]
          md:h-[200px]
        "
        style={{
          background:
            "linear-gradient(180deg, rgba(244,245,242,0.62) 0%, rgba(244,245,242,0.44) 16%, rgba(244,245,242,0.23) 38%, rgba(244,245,242,0.09) 66%, rgba(244,245,242,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.82) 42%, rgba(0,0,0,0.36) 78%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.82) 42%, rgba(0,0,0,0.36) 78%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-[3]
          h-[220px]
          md:h-[260px]
        "
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(244,245,242,0.16) 0%, rgba(244,245,242,0.075) 38%, rgba(244,245,242,0) 72%)",
          filter: "blur(14px)",
          transform: "translateY(-42px)",
        }}
      />

      {/* READABILITY FIELD */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          bg-[#0B1322]/50
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          bg-gradient-to-b
          from-[#0B1322]/34
          via-[#0B1322]/28
          to-[#0B1322]/80
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          bg-[radial-gradient(circle_at_50%_43%,rgba(176,141,87,0.078)_0%,rgba(176,141,87,0.022)_34%,transparent_62%)]
        "
      />

      {/* FOOTER DEPTH BRIDGE */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[3]
          h-[130px]
          bg-gradient-to-b
          from-transparent
          via-[#07101D]/34
          to-[#07101D]
          md:h-[140px]
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          max-w-[860px]
          flex-col
          items-center
          text-center
        "
      >
        <p
          ref={labelRef}
          className="
            text-[10px]
            uppercase
            tracking-[0.34em]
            text-[#F4F5F2]/58
            md:text-[11px]
          "
        >
          {config.text.label}
        </p>

        <h2
          ref={headlineRef}
          className="
            mt-6
            font-[Gambarino]
            text-[42px]
            leading-[0.99]
            tracking-[-0.04em]
            text-[#F4F5F2]
            sm:text-[50px]
            md:text-[clamp(60px,6vw,78px)]
          "
        >
          <span className="line block">
            {config.text.headlineLine1}
          </span>

          <span className="line block">
            {config.text.headlineLine2}
          </span>
        </h2>

        <p
          ref={bodyRef}
          className="
            mt-7
            max-w-[540px]
            text-[15px]
            leading-[1.78]
            text-[#F4F5F2]/74
            md:text-[16px]
            md:leading-[1.82]
          "
        >
          {config.text.body}
        </p>

        <div ref={ctaRef} className="mt-10">
          <Link
            href={config.routes.contact}
            className="
              group
              inline-flex
              min-h-[46px]
              items-center
              justify-center
              gap-3
              rounded-full
              border
              border-[#F4F5F2]/22
              px-7
              py-3.5
              text-[11px]
              uppercase
              tracking-[0.18em]
              text-[#F4F5F2]
              transition-all
              duration-500
              ease-[cubic-bezier(0.22,1,0.36,1)]
              hover:border-[#F4F5F2]
              hover:bg-[#F4F5F2]
              hover:text-[#0B1322]
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#B08D57]
              sm:px-8
              sm:text-[12px]
              sm:tracking-[0.22em]
            "
          >
            {config.text.cta}

            <span className="transition-transform duration-500 group-hover:translate-x-[3px]">
              →
            </span>
          </Link>
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


 
