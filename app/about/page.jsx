"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "../../lib/gsap"
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageTransition } from "@/components/PageTransitionProvider";
import TransitionLink from "@/components/TransitionLink";
import { SITE_CONTACT } from "@/lib/siteConfig";

gsap.registerPlugin(ScrollTrigger);

import Footer from '../../components/Footer'


export default function Page() {
  return (
    <main className="bg-[#0a0f14] text-white overflow-hidden">
      <Hero/> 
      <OurStory/>
      <PhinisiHistory/>
      <TheCrew/>
      <BeforeYouSail/>
      <MomentsOnBoard/>
      {/* <Testimonial/> */}
      {/* <Conversion/> */}
      {/* <AboutOrigin/> */}
      {/* <Philosophy/>  */}
      {/* <AboutCrew/> */}
      {/* <ForWho/> */}
      {/* <BuiltInIndonesia/> */}
      {/* <PrivateByDesign/> */}
      {/* <ThePeopleWhoShapeTheJourney/> */}
      {/* <WhyGuestsReturn/> */}
      {/* <PlanYourJourney/> */}
      {/* <ThePeople/> */}
      {/* <SerenityWay/> */}
      {/* <WhySerenityExists/> */}
      {/* <WhatMakesItDifferent/> */}
      {/* <PhinisiSection/> */}
      {/* <ExperienceSummary/> */}
      {/* <ClosingCTA/>       */}
      <Footer/> 
    </main>
  )
}


function Hero() {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const hasPlayedEntranceRef = useRef(false);
  const entranceTlRef = useRef(null);

  const shouldReduceMotion = useReducedMotion();
  const { stage } = usePageTransition();

  useEffect(() => {
    return () => {
      entranceTlRef.current?.kill();
      entranceTlRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !imageWrapRef.current || !contentRef.current) {
      return;
    }

    const revealNodes = Array.from(
      contentRef.current.querySelectorAll(".about-hero-reveal")
    );

    const allNodes = [imageWrapRef.current, ...revealNodes].filter(Boolean);

    if (stage === "covering") {
      entranceTlRef.current?.kill();
      entranceTlRef.current = null;

      gsap.set(imageWrapRef.current, {
        opacity: 0,
        scale: 1.012,
      });

      gsap.set(revealNodes, {
        opacity: 0,
        y: 18,
        filter: "blur(5px)",
      });
      return;
    }

    if (hasPlayedEntranceRef.current) {
      gsap.set(imageWrapRef.current, {
        opacity: 1,
        scale: 1,
      });
      gsap.set(revealNodes, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      });
      return;
    }

    if (shouldReduceMotion) {
      gsap.set(allNodes, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      });

      hasPlayedEntranceRef.current = true;
      return;
    }

    hasPlayedEntranceRef.current = true;
    entranceTlRef.current?.kill();
    entranceTlRef.current = gsap.timeline();

    entranceTlRef.current.fromTo(
      imageWrapRef.current,
      {
        opacity: 0,
        scale: 1.012,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.55,
        ease: "power3.out",
      },
      0
    );

    if (revealNodes.length > 0) {
      entranceTlRef.current.fromTo(
        revealNodes,
        {
          opacity: 0,
          y: 18,
          filter: "blur(5px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.05,
          stagger: 0.075,
          ease: "power3.out",
        },
        0.18
      );
    }
  }, [stage, shouldReduceMotion]);

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current || shouldReduceMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(imageRef.current, {
        yPercent: -1.4,
        scale: 1.035,
        transformOrigin: "center center",
      });

      gsap.to(imageRef.current, {
        yPercent: 2.8,
        scale: 1.055,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.3,
        },
      });

      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: -8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-hero-title"
      className="
        relative
        flex
        h-[100svh]
        min-h-[720px]
        overflow-hidden
        bg-[#F4F5F2]
        text-[#2D3C68]
        md:h-[92svh]
        md:min-h-[820px]
      "
      style={{
        backgroundColor: "#F4F5F2",
        colorScheme: "light",
      }}
    >
      {/* IMAGE ENVIRONMENT */}
      <div className="absolute inset-0">
        <div
          ref={imageWrapRef}
          className="
            relative
            h-full
            w-full
            overflow-hidden
          "
        >
          <img
            ref={imageRef}
            src="https://res.cloudinary.com/dombq6plz/image/upload/v1778524009/ChatGPT_Image_May_12_2026_01_25_22_AM_rultco.png"
            alt="Serenity sailing through Indonesian waters"
            loading="eager"
            decoding="async"
            draggable="false"
            className="
              h-full
              w-full
              object-cover
              object-[66%_center]
              will-change-transform
              md:object-[72%_center]
            "
            style={{
              filter: "brightness(0.94) saturate(0.92) contrast(1.04)",
            }}
          />

          {/* GLOBAL NAVY DISCIPLINE */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[#2D3C68]/[0.105]
            "
          />

          {/* TEXT-SIDE SAIL VEIL — LESS FOG, MORE STRUCTURE */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
            "
            style={{
              background:
                "linear-gradient(to right, rgba(244,245,242,0.80) 0%, rgba(244,245,242,0.58) 24%, rgba(244,245,242,0.28) 44%, rgba(244,245,242,0.08) 64%, rgba(244,245,242,0) 82%)",
            }}
          />

          {/* LEFT READABILITY FIELD — SOFT NAVY UNDER THE SAIL-WHITE */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
            "
            style={{
              background:
                "radial-gradient(ellipse at 19% 54%, rgba(45,60,104,0.105) 0%, rgba(45,60,104,0.045) 34%, rgba(45,60,104,0) 68%)",
            }}
          />

          {/* TOP NAV SUPPORT */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              h-[170px]
              md:h-[190px]
            "
            style={{
              background:
                "linear-gradient(to bottom, rgba(45,60,104,0.18) 0%, rgba(45,60,104,0.055) 42%, rgba(45,60,104,0) 100%)",
            }}
          />

          {/* BOTTOM / SEA DEPTH */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
            "
            style={{
              background:
                "linear-gradient(to top, rgba(8,12,18,0.16) 0%, rgba(8,12,18,0.055) 28%, rgba(8,12,18,0) 58%)",
            }}
          />

          {/* SUBTLE SURFACE LIGHT */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
            "
            style={{
              background:
                "radial-gradient(ellipse at 52% 12%, rgba(244,245,242,0.08), rgba(244,245,242,0) 54%)",
            }}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-[1320px]
          items-center
          px-6
          md:px-10
          lg:px-16
        "
      >
        <div
          ref={contentRef}
          className="
            max-w-[620px]
            pt-16
            md:pt-20
          "
        >
          <p
            className="
              about-hero-reveal
              text-[10px]
              uppercase
              tracking-[0.34em]
              text-[#2D3C68]/48
              md:text-[11px]
            "
          >
            The Story of Serenity
          </p>

          <div
            aria-hidden="true"
            className="
              about-hero-reveal
              mt-5
              h-px
              w-10
              bg-[#B08D57]/62
            "
          />

          <h1
            id="about-hero-title"
            className="
              about-hero-reveal
              mt-6
              font-[Gambarino]
              text-[48px]
              leading-[0.96]
              tracking-[-0.045em]
              text-[#2D3C68]
              sm:text-[64px]
              md:text-[78px]
              xl:text-[86px]
            "
          >
            There is only
            <br />
            one Serenity
          </h1>

          <p
            className="
              about-hero-reveal
              mt-8
              max-w-[460px]
              text-[14px]
              leading-[1.9]
              text-[#2D3C68]/72
              md:text-[16px]
            "
          >
            Built in Tanah Beru, South Sulawesi, Serenity carries twelve guests
            in four cabins, with ten crew and routes shaped by sea, weather,
            and curiosity.
          </p>
        </div>
      </div>

      {/* BOTTOM TRANSITION — COMPRESSED, NOT FOGGY */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-[132px]
          md:h-[168px]
        "
        style={{
          background:
            "linear-gradient(to bottom, rgba(244,245,242,0) 0%, rgba(244,245,242,0.16) 62%, #F4F5F2 100%)",
        }}
      />
    </section>
  );
}

function OurStory() {
  const sectionRef = useRef(null);
  const openingRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageInnerRef = useRef(null);
  const pillarsRef = useRef(null);

  const shouldReduceMotion = useReducedMotion();

  const PILLARS = [
    {
      num: "01",
      headline: "Made for twelve guests.",
      body:
        "Twelve keeps the voyage close without making it crowded. With ten crew on board, attention stays personal without becoming intrusive.",
    },
    {
      num: "02",
      headline: "Guided by weather and anchorage.",
      body:
        "Each route begins with a plan, then adjusts to weather, anchorage, and the group on board.",
    },
    {
      num: "03",
      headline: "Built from phinisi lineage.",
      body:
        "Built in the South Sulawesi phinisi tradition, Serenity carries that origin into a contemporary yacht.",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const openingNodes = openingRef.current
      ? Array.from(openingRef.current.querySelectorAll(".story-reveal"))
      : [];

    const pillarNodes = pillarsRef.current
      ? Array.from(pillarsRef.current.querySelectorAll(".pillar-reveal"))
      : [];

    const allNodes = [
      ...openingNodes,
      imageWrapRef.current,
      ...pillarNodes,
    ].filter(Boolean);

    if (shouldReduceMotion) {
      gsap.set(allNodes, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      });

      if (imageInnerRef.current) {
        gsap.set(imageInnerRef.current, {
          yPercent: 0,
          scale: 1,
        });
      }

      return;
    }

    const ctx = gsap.context(() => {
      if (openingNodes.length > 0 && openingRef.current) {
        gsap.fromTo(
          openingNodes,
          {
            opacity: 0,
            y: 18,
            filter: "blur(5px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.05,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: openingRef.current,
              start: "top 84%",
              once: true,
            },
          }
        );
      }

      if (imageWrapRef.current) {
        gsap.fromTo(
          imageWrapRef.current,
          {
            opacity: 0,
            y: 22,
            scale: 1.01,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.16,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageWrapRef.current,
              start: "top 86%",
              once: true,
            },
          }
        );
      }

      if (pillarNodes.length > 0 && pillarsRef.current) {
        gsap.fromTo(
          pillarNodes,
          {
            opacity: 0,
            y: 18,
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.96,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: "top 86%",
              once: true,
            },
          }
        );
      }

      if (imageInnerRef.current && imageWrapRef.current) {
        gsap.set(imageInnerRef.current, {
          yPercent: -2,
          scale: 1.035,
          transformOrigin: "center center",
        });

        gsap.to(imageInnerRef.current, {
          yPercent: 2.4,
          scale: 1.052,
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: "top bottom",
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
      aria-labelledby="our-story-title"
      className="
        relative
        overflow-hidden
        bg-[#F4F5F2]
        pt-[56px]
        pb-[92px]
        text-[#2D3C68]
        md:pt-[96px]
        md:pb-[128px]
      "
      style={{
        backgroundColor: "#F4F5F2",
        colorScheme: "light",
      }}
    >
      <h2 id="our-story-title" className="sr-only">
        Our Story
      </h2>

      {/* SOFT SURFACE ATMOSPHERE */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(circle at 78% 18%, rgba(176,141,87,0.04) 0%, rgba(176,141,87,0) 46%)",
        }}
      />

      {/* GRAIN */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-[-10%]
          opacity-[0.022]
          mix-blend-soft-light
        "
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dombq6plz/image/upload/v1747227718/noise_t0x7vx.png')",
        }}
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1280px]
          px-6
          md:px-10
          lg:px-14
        "
      >
        {/* OPENING */}
        <div
          className="
            grid
            grid-cols-1
            gap-9
            lg:grid-cols-[52fr_48fr]
            lg:items-center
            lg:gap-20
          "
        >
          {/* TEXT */}
          <div
            ref={openingRef}
            className="
              order-2
              max-w-[640px]
              lg:order-1
            "
          >
            <div
              aria-hidden="true"
              className="
                story-reveal
                h-px
                w-10
                bg-[#B08D57]/62
              "
            />

            <p
              className="
                story-reveal
                mt-7
                max-w-[590px]
                text-[15px]
                leading-[1.9]
                text-[#2D3C68]/68
                md:text-[16px]
              "
            >
              Serenity is a 40.75-meter phinisi from Tanah Beru, South Sulawesi,
              built for twelve guests in four cabins, with ten crew on board.
              The scale is deliberate: small enough for the voyage to stay
              personal, structured enough for each day to respond to weather,
              anchorage, and the people on board.
            </p>
          </div>

          {/* IMAGE */}
          <figure
            ref={imageWrapRef}
            className="
              relative
              order-1
              w-full
              overflow-hidden
              bg-[#2D3C68]/[0.045]
              shadow-[0_18px_44px_rgba(22,32,55,0.07)]
              ring-1
              ring-[#2D3C68]/[0.07]
              md:shadow-[0_24px_60px_rgba(22,32,55,0.08)]
              lg:order-2
              lg:ml-auto
              lg:max-w-[640px]
            "
          >
            <div
              className="
                relative
                aspect-[4/3]
                overflow-hidden
              "
            >
              <div
                ref={imageInnerRef}
                className="
                  absolute
                  inset-[-4%]
                  will-change-transform
                "
              >
                <img
                  src="https://celestiayacht.com/api/media/file/VESSEL_CELESTIA-4(1).webp"
                  alt="Serenity phinisi sailing through Indonesian waters"
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  className="
                    h-full
                    w-full
                    object-cover
                    object-center
                  "
                  style={{
                    filter: "brightness(0.96) saturate(0.92) contrast(1.04)",
                  }}
                />
              </div>

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-[#2D3C68]/[0.035]
                "
              />

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#2D3C68]/[0.10]
                  via-transparent
                  to-[#F4F5F2]/[0.04]
                "
              />
            </div>
          </figure>
        </div>

        {/* DIVIDER */}
        <div
          aria-hidden="true"
          className="
            mt-12
            mb-10
            h-px
            w-full
            bg-[#2D3C68]/10
            md:mt-20
            md:mb-16
          "
        />

        {/* THREE QUIET CONVICTIONS */}
        <div
          ref={pillarsRef}
          className="
            grid
            grid-cols-1
            gap-9
            md:grid-cols-3
            md:gap-10
            lg:gap-14
          "
        >
          {PILLARS.map((pillar) => (
            <article key={pillar.num} className="pillar-reveal">
              <div
                className="
                  mb-4
                  flex
                  items-center
                  gap-4
                "
              >
                <span
                  className="
                    text-[10px]
                    uppercase
                    tracking-[0.28em]
                    text-[#2D3C68]/34
                  "
                >
                  {pillar.num}
                </span>

                <span
                  aria-hidden="true"
                  className="
                    h-px
                    w-10
                    bg-[#B08D57]/46
                  "
                />
              </div>

              <h3
                className="
                  font-[Gambarino]
                  text-[25px]
                  leading-[1.08]
                  tracking-[-0.03em]
                  text-[#2D3C68]
                  md:text-[clamp(25px,2vw,30px)]
                "
              >
                {pillar.headline}
              </h3>

              <p
                className="
                  mt-4
                  max-w-[38ch]
                  text-[14px]
                  leading-[1.85]
                  text-[#2D3C68]/62
                "
              >
                {pillar.body}
              </p>
            </article>
          ))}
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
          h-[72px]
          md:h-[96px]
        "
        style={{
          background:
            "linear-gradient(to bottom, rgba(244,245,242,0) 0%, rgba(45,60,104,0.035) 100%)",
        }}
      />
    </section>
  );
}

function PhinisiHistory() {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageInnerRef = useRef(null);
  const copyRef = useRef(null);

  const shouldReduceMotion = useReducedMotion();

  const IKAT_URL =
    "https://res.cloudinary.com/dombq6plz/image/upload/v1778486752/ChatGPT_Image_May_11_2026_03_01_56_PM_2_k2aiwl.png";

  const IMAGE_URL =
    "https://plus.unsplash.com/premium_photo-1664121799894-eb6c2af13bc8?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  useEffect(() => {
    if (!sectionRef.current) return;

    const copyNodes = copyRef.current
      ? Array.from(copyRef.current.querySelectorAll(".phinisi-reveal"))
      : [];

    const allNodes = [imageWrapRef.current, ...copyNodes].filter(Boolean);

    if (shouldReduceMotion) {
      gsap.set(allNodes, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      });

      if (imageInnerRef.current) {
        gsap.set(imageInnerRef.current, {
          yPercent: 0,
          scale: 1,
        });
      }

      return;
    }

    const ctx = gsap.context(() => {
      if (imageWrapRef.current) {
        gsap.fromTo(
          imageWrapRef.current,
          {
            opacity: 0,
            y: 24,
            scale: 1.012,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageWrapRef.current,
              start: "top 86%",
              once: true,
            },
          }
        );
      }

      if (copyNodes.length > 0 && copyRef.current) {
        gsap.fromTo(
          copyNodes,
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
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: copyRef.current,
              start: "top 86%",
              once: true,
            },
          }
        );
      }

      if (imageInnerRef.current && imageWrapRef.current) {
        gsap.set(imageInnerRef.current, {
          yPercent: -2,
          scale: 1.035,
          transformOrigin: "center center",
        });

        gsap.to(imageInnerRef.current, {
          yPercent: 2.5,
          scale: 1.055,
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.45,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Phinisi history"
      className="
        relative
        overflow-hidden
        bg-[#2D3C68]
        px-6
        py-[88px]
        text-[#F4F5F2]
        md:px-10
        md:py-[128px]
        lg:px-14
      "
      style={{
        backgroundColor: "#2D3C68",
        colorScheme: "dark",
      }}
    >
      {/* BRIDGE IN FROM SAIL-WHITE */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-[5]
          h-[140px]
          md:h-[170px]
        "
        style={{
          background:
            "linear-gradient(to bottom, rgba(244,245,242,0.085) 0%, rgba(244,245,242,0.028) 38%, rgba(244,245,242,0) 100%)",
        }}
      />

      {/* STATIC IKAT FIELD — SUBTLE SIGNATURE ONLY */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-24%]
          top-[-14%]
          h-[620px]
          w-[min(920px,90vw)]
          opacity-[0.22]
          mix-blend-soft-light
          md:left-[-14%]
          md:top-[-10%]
          md:h-[740px]
          md:w-[min(1040px,68vw)]
        "
        style={{
          backgroundImage: `url(${IKAT_URL})`,
          backgroundRepeat: "repeat",
          backgroundSize: "280px auto",
          backgroundPosition: "center",
          filter: "blur(0.15px)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.76) 0%, rgba(0,0,0,0.32) 54%, rgba(0,0,0,0) 78%)",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.76) 0%, rgba(0,0,0,0.32) 54%, rgba(0,0,0,0) 78%)",
        }}
      />

      {/* NAVY DEPTH */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(circle at 34% 42%, rgba(244,245,242,0.045) 0%, rgba(244,245,242,0.014) 28%, rgba(244,245,242,0) 58%)",
        }}
      />

      {/* WARM CRAFT ATMOSPHERE */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(circle at 82% 28%, rgba(176,141,87,0.095) 0%, rgba(176,141,87,0.032) 34%, rgba(176,141,87,0) 64%)",
        }}
      />

      {/* SURFACE DEPTH */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "linear-gradient(to bottom, rgba(244,245,242,0.016) 0%, rgba(8,12,18,0) 42%, rgba(8,12,18,0.13) 100%)",
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

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          max-w-[1280px]
          grid-cols-1
          gap-9
          lg:grid-cols-[47fr_53fr]
          lg:items-center
          lg:gap-14
        "
      >
        {/* IMAGE — FIRST ON MOBILE, LEFT ON DESKTOP */}
        <figure
          ref={imageWrapRef}
          className="
            relative
            order-1
            overflow-hidden
            bg-[#0B1322]/24
            shadow-[0_22px_64px_rgba(5,10,20,0.20)]
            ring-1
            ring-[#F4F5F2]/[0.045]
            lg:min-h-[520px]
          "
        >
          <div
            className="
              relative
              aspect-[4/3]
              overflow-hidden
              lg:h-full
              lg:min-h-[520px]
              lg:aspect-auto
            "
          >
            <div
              ref={imageInnerRef}
              className="
                absolute
                inset-[-4%]
                will-change-transform
              "
            >
              <img
                src={IMAGE_URL}
                alt="Traditional wooden phinisi vessel in Indonesia"
                loading="lazy"
                decoding="async"
                draggable="false"
                className="
                  h-full
                  w-full
                  object-cover
                  object-center
                "
                style={{
                  filter: "brightness(0.78) saturate(0.86) contrast(1.05)",
                }}
              />
            </div>

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                bg-[#2D3C68]/[0.12]
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
                  "linear-gradient(to top, rgba(8,12,18,0.58) 0%, rgba(8,12,18,0.22) 38%, rgba(8,12,18,0) 72%)",
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
                ring-[#F4F5F2]/[0.032]
              "
            />
          </div>
        </figure>

        {/* COPY — NO HEADER */}
        <div
          ref={copyRef}
          className="
            order-2
            max-w-[640px]
            lg:pl-2
          "
        >
          <div
            aria-hidden="true"
            className="
              phinisi-reveal
              mb-7
              h-px
              w-10
              bg-[#B08D57]/56
            "
          />

          <p
            className="
              phinisi-reveal
              text-[15px]
              leading-[1.9]
              text-[#F4F5F2]/72
              md:text-[16px]
              md:leading-[1.86]
            "
          >
            Serenity was built in Tanah Beru, South Sulawesi — one of the
            recognized centres of Pinisi construction, alongside Bira and Batu
            Licin. Pinisi is not just a visual style; UNESCO describes it as the
            art of boatbuilding in South Sulawesi, connected to the rig and sail
            of the Sulawesi schooner.
          </p>

          <p
            className="
              phinisi-reveal
              mt-6
              max-w-[560px]
              text-[14px]
              leading-[1.82]
              text-[#F4F5F2]/60
            "
          >
            In 2017, Pinisi: Art of Boatbuilding in South Sulawesi was inscribed
            on UNESCO&apos;s Representative List of the Intangible Cultural
            Heritage of Humanity.
          </p>

          <div
            aria-hidden="true"
            className="
              phinisi-reveal
              my-7
              h-px
              w-full
              max-w-[480px]
              bg-[#F4F5F2]/10
              md:my-8
            "
          />

          <p
            className="
              phinisi-reveal
              max-w-[560px]
              text-[14px]
              leading-[1.85]
              text-[#F4F5F2]/54
            "
          >
            For Serenity, that origin matters because the yacht is not borrowing
            a shape from Indonesian maritime culture. She was built on the
            coastline where the craft is still practiced, then finished as a
            contemporary private yacht for twelve guests, four cabins, and ten
            crew.
          </p>
        </div>
      </div>

      {/* BRIDGE OUT */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-[104px]
          md:h-[124px]
        "
        style={{
          background:
            "linear-gradient(to bottom, rgba(244,245,242,0) 0%, rgba(244,245,242,0.04) 100%)",
        }}
      />
    </section>
  );
}

function TheCrew() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageInnerRef = useRef(null);

  const shouldReduceMotion = useReducedMotion();

  const CREW_IMAGE =
    "https://res.cloudinary.com/dombq6plz/image/upload/v1780142533/38140754-66e0-4ab7-9cec-c6e690dd7ed6_1_ephzjz.png";

  useEffect(() => {
    if (!sectionRef.current) return;

    const textNodes = textRef.current
      ? Array.from(textRef.current.querySelectorAll(".crew-reveal"))
      : [];

    const allNodes = [imageWrapRef.current, ...textNodes].filter(Boolean);

    if (shouldReduceMotion) {
      gsap.set(allNodes, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      });

      if (imageInnerRef.current) {
        gsap.set(imageInnerRef.current, {
          yPercent: 0,
          scale: 1,
        });
      }

      return;
    }

    const ctx = gsap.context(() => {
      if (textNodes.length > 0 && textRef.current) {
        gsap.fromTo(
          textNodes,
          {
            opacity: 0,
            y: 20,
            filter: "blur(5px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.08,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      if (imageWrapRef.current) {
        gsap.fromTo(
          imageWrapRef.current,
          {
            opacity: 0,
            y: 24,
            scale: 1.008,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageWrapRef.current,
              start: "top 86%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    const mm = gsap.matchMedia();

    if (imageInnerRef.current && imageWrapRef.current) {
      mm.add(
        {
          mobile: "(max-width: 767px)",
          desktop: "(min-width: 768px)",
        },
        (context) => {
          const { mobile } = context.conditions;

          gsap.set(imageInnerRef.current, {
            yPercent: mobile ? -2.5 : -3.5,
            scale: mobile ? 1.035 : 1.045,
            transformOrigin: "center center",
          });

          const parallaxTween = gsap.to(imageInnerRef.current, {
            yPercent: mobile ? 2.5 : 3.5,
            scale: mobile ? 1.055 : 1.065,
            ease: "none",
            scrollTrigger: {
              trigger: imageWrapRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.25,
            },
          });

          return () => {
            parallaxTween.kill();
          };
        }
      );
    }

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="crew-title"
      className="
        relative
        overflow-hidden
        bg-[#F4F5F2]
        text-[#2D3C68]
      "
      style={{
        backgroundColor: "#F4F5F2",
        colorScheme: "light",
      }}
    >
      {/* BRIDGE IN FROM DARK NAVY */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-[5]
          h-[128px]
          md:h-[156px]
        "
        style={{
          background:
            "linear-gradient(to bottom, rgba(45,60,104,0.075) 0%, rgba(45,60,104,0.026) 42%, rgba(45,60,104,0) 100%)",
        }}
      />

      {/* WARM HUMAN ATMOSPHERE */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(circle at 70% 22%, rgba(176,141,87,0.055) 0%, rgba(176,141,87,0) 50%)",
        }}
      />

      {/* SURFACE GRAIN */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-[-10%]
          opacity-[0.02]
          mix-blend-soft-light
        "
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dombq6plz/image/upload/v1747227718/noise_t0x7vx.png')",
        }}
      />

      {/* TEXT BLOCK */}
      <div
        ref={textRef}
        className="
          relative
          z-10
          mx-auto
          max-w-[1280px]
          px-6
          pt-[88px]
          pb-[42px]
          md:px-10
          md:pt-[124px]
          md:pb-[54px]
          lg:px-14
        "
      >
        <p
          className="
            crew-reveal
            mb-7
            text-[10px]
            uppercase
            tracking-[0.34em]
            text-[#2D3C68]/42
            md:mb-8
            md:text-[11px]
          "
        >
          The Crew
        </p>

        <div
          className="
            grid
            grid-cols-1
            items-end
            gap-10
            lg:grid-cols-[52fr_44fr]
            lg:gap-20
          "
        >
          <h2
            id="crew-title"
            className="
              crew-reveal
              max-w-[13ch]
              font-[Gambarino]
              text-[40px]
              leading-[1.02]
              tracking-[-0.04em]
              text-[#2D3C68]
              sm:text-[50px]
              md:text-[clamp(54px,4.8vw,66px)]
            "
          >
            They keep the voyage
            <br />
            quietly moving.
          </h2>

          <div className="max-w-[570px] lg:pb-1">
            <p
              className="
                crew-reveal
                text-[15px]
                leading-[1.9]
                text-[#2D3C68]/66
                md:text-[16px]
                md:leading-[1.86]
              "
            >
              Ten crew are aboard for twelve guests — handling cabins, meals,
              tenders, anchorages, safety, and the small timing that makes each
              day feel unforced. They read the sea, not a script, and adjust the
              rhythm around the group on board.
            </p>

            <div
              aria-hidden="true"
              className="
                crew-reveal
                mt-8
                h-px
                w-10
                bg-[#B08D57]/62
              "
            />
          </div>
        </div>
      </div>

      {/* FULL-WIDTH CREW PHOTO */}
      <figure
        ref={imageWrapRef}
        className="
          relative
          z-10
          w-full
          overflow-hidden
          bg-[#2D3C68]/[0.04]
        "
      >
        <div
          className="
            relative
            aspect-[4/5]
            overflow-hidden
            sm:aspect-[3/4]
            md:aspect-[16/9]
            lg:aspect-[16/7]
          "
        >
          <div
            ref={imageInnerRef}
            className="
              absolute
              inset-[-5%]
              will-change-transform
            "
          >
            <img
              src={CREW_IMAGE}
              alt="The Serenity crew gathered on deck"
              loading="lazy"
              decoding="async"
              draggable="false"
              className="
                h-full
                w-full
                object-cover
                object-[50%_42%]
                md:object-center
              "
              style={{
                filter: "brightness(0.88) saturate(0.92) contrast(1.04)",
              }}
            />
          </div>

          {/* PHOTO NAVY DISCIPLINE */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[#2D3C68]/[0.055]
            "
          />

          {/* TOP FADE — TEXT FIELD TO PHOTO FIELD */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              h-[150px]
              md:h-[180px]
            "
            style={{
              background:
                "linear-gradient(to bottom, #F4F5F2 0%, rgba(244,245,242,0.78) 24%, rgba(244,245,242,0.32) 58%, rgba(244,245,242,0) 100%)",
            }}
          />

          {/* BOTTOM READABILITY / DEPTH */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
            "
            style={{
              background:
                "linear-gradient(to top, rgba(8,12,18,0.28) 0%, rgba(8,12,18,0.09) 34%, rgba(8,12,18,0) 68%)",
            }}
          />

          {/* SUBTLE WARM HUMAN FIELD */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
            "
            style={{
              background:
                "radial-gradient(circle at 48% 44%, rgba(176,141,87,0.06) 0%, rgba(176,141,87,0) 56%)",
            }}
          />

          {/* FINE PHOTO EDGE */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              ring-1
              ring-inset
              ring-[#F4F5F2]/[0.04]
            "
          />
        </div>
      </figure>
    </section>
  );
}

function Testimonial() {
  return (
    <section
      className="relative"
      style={{ background: '#F4F5F2' }}
    >
      {/* ── Bridge in — dari warm crew photo ── */}
      <div
        className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(20,14,8,0.06) 0%, transparent 100%)',
        }}
      />
 
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-14 py-28 md:py-40">
        <div className="max-w-[720px] mx-auto text-center">
 
          {/* Quote — Gambarino, no quotation marks */}
          <blockquote
            className="mb-10"
            style={{
              fontFamily: 'Gambarino, serif',
              fontSize: 'clamp(26px, 3vw, 42px)',
              lineHeight: '1.18',
              letterSpacing: '-0.02em',
              color: '#2D3C68',
              fontStyle: 'normal',
            }}
          >
            REPLACE WITH GUEST QUOTE
          </blockquote>
 
          {/* Divider — brass */}
          <div
            className="mx-auto mb-6"
            style={{
              width: '32px',
              height: '1px',
              background: '#B08D57',
            }}
          />
 
          {/* Attribution */}
          <p
            style={{
              fontFamily: 'Switzer, sans-serif',
              fontWeight: 300,
              fontSize: '12px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#6A6A6A',
            }}
          >
            GUEST NAME · ORIGIN · CHARTER DETAIL
          </p>
 
        </div>
      </div>
 
      {/* ── Bridge out — ke dark Conversion ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(45,60,104,0.05) 100%)',
        }}
      />
    </section>
  )
}

function Conversion() {
  const IKAT_URL =
  'https://res.cloudinary.com/dombq6plz/image/upload/v1778486588/ChatGPT_Image_May_11_2026_03_01_56_PM_1_v2exmt.png'
 
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: '#F4F5F2' }}
    >
      {/* ── Sumba Ikat — rotating ambient texture ── */}
      <style>{`
        @keyframes ikatRotateConv {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
 
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.045, overflow: 'hidden' }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '110%',
            aspectRatio: '1',
            backgroundImage: `url(${IKAT_URL})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: 'ikatRotateConv 120s linear infinite',
          }}
        />
      </div>
 
      {/* ── Atmospheric radial — cool subtle ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(45,60,104,0.03), transparent 60%)',
        }}
      />
 
      {/* ── Content — centered, narrow ── */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-14 py-28 md:py-40">
        <div className="max-w-[680px] mx-auto text-center">
 
          {/* Eyebrow */}
          <p
            className="mb-8"
            style={{
              fontFamily: 'Switzer, sans-serif',
              fontWeight: 300,
              fontSize: '11px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#6A6A6A',
            }}
          >
            Begin Your Voyage
          </p>
 
          {/* Headline */}
          <h2
            className="mb-8"
            style={{
              fontFamily: 'Gambarino, serif',
              fontSize: 'clamp(36px, 4.2vw, 58px)',
              lineHeight: '1.05',
              letterSpacing: '-0.03em',
              color: '#2D3C68',
            }}
          >
            Your voyage begins<br />
            with a conversation.
          </h2>
 
          {/* Support line */}
          <p
            style={{
              fontFamily: 'Switzer, sans-serif',
              fontWeight: 300,
              fontSize: '15px',
              lineHeight: '1.8',
              color: '#5C5C5C',
              maxWidth: '420px',
              margin: '0 auto 48px',
            }}
          >
            Tell us when you want to travel, how many are in your group,
            and where you want to go. We'll take it from there.
          </p>
 
          {/* CTA */}
          <TransitionLink
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'Switzer, sans-serif',
              fontWeight: 300,
              fontSize: '13px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#2D3C68',
              border: '1px solid rgba(45,60,104,0.35)',
              padding: '16px 36px',
              borderRadius: '1px',
              textDecoration: 'none',
              transition: 'border-color 0.4s ease, color 0.4s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#B08D57'
              e.currentTarget.style.color = '#B08D57'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(45,60,104,0.35)'
              e.currentTarget.style.color = '#2D3C68'
            }}
          >
            Begin Your Voyage
            <span style={{ fontSize: '16px', lineHeight: 1 }}>↗</span>
          </TransitionLink>
 
          {/* Email — secondary */}
          <p
            className="mt-10"
            style={{
              fontFamily: 'Switzer, sans-serif',
              fontWeight: 300,
              fontSize: '13px',
              letterSpacing: '0.06em',
              color: '#6A6A6A',
            }}
          >
            or write directly at{' '}
            <a
              href={SITE_CONTACT.primaryEmailHref}
              style={{
                color: '#8B6A4F',
                textDecoration: 'none',
              }}
            >
              {SITE_CONTACT.primaryEmail}
            </a>
          </p>
 
        </div>
      </div>
    </section>
  )
}
 
function MomentsOnBoard() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const galleryRef = useRef(null);
  const firstImageInnerRef = useRef(null);

  const shouldReduceMotion = useReducedMotion();

  const FRAMES = [
    {
      id: "vessel",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1778922404/ChatGPT_Image_May_16_2026_04_05_14_PM_liebfi.png",
      alt: "Serenity phinisi moving through Indonesian waters",
      position: "50% 50%",
      desktopClass:
        "md:col-span-7 md:row-span-2 md:min-h-[620px] lg:min-h-[680px]",
      priority: true,
    },
    {
      id: "service",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1777271186/ChatGPT_Image_Apr_27_2026_01_24_38_PM_iuf3mw.png",
      alt: "Crew preparing food aboard Serenity",
      position: "50% 46%",
      desktopClass: "md:col-span-5 md:min-h-[300px] lg:min-h-[330px]",
      priority: false,
    },
    {
      id: "dining",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1778922404/ChatGPT_Image_May_16_2026_04_03_53_PM_yqjf6x.png",
      alt: "Dining atmosphere aboard Serenity",
      position: "58% 50%",
      desktopClass: "md:col-span-5 md:min-h-[300px] lg:min-h-[330px]",
      priority: false,
    },
    {
      id: "water",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776152590/Phinisi_yacht_and_vibrant_coral_reef_1_i59pqn.png",
      alt: "Coral reef and water around Serenity",
      position: "50% 58%",
      desktopClass: "md:col-span-6 md:min-h-[320px]",
      priority: false,
    },
    {
      id: "quiet",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776869887/ChatGPT_Image_Apr_22_2026_09_57_35_PM_1_vwbdwb.png",
      alt: "Quiet deck moment aboard Serenity",
      position: "50% 50%",
      desktopClass: "md:col-span-6 md:min-h-[320px]",
      priority: false,
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const headerNodes = headerRef.current
      ? Array.from(headerRef.current.querySelectorAll(".moments-reveal"))
      : [];

    const cardNodes = galleryRef.current
      ? Array.from(galleryRef.current.querySelectorAll(".moment-card"))
      : [];

    const allNodes = [...headerNodes, ...cardNodes].filter(Boolean);

    if (shouldReduceMotion) {
      gsap.set(allNodes, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      });

      if (firstImageInnerRef.current) {
        gsap.set(firstImageInnerRef.current, {
          yPercent: 0,
          scale: 1,
        });
      }

      return;
    }

    const ctx = gsap.context(() => {
      if (headerNodes.length > 0 && headerRef.current) {
        gsap.fromTo(
          headerNodes,
          {
            opacity: 0,
            y: 18,
            filter: "blur(5px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.05,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 84%",
              once: true,
            },
          }
        );
      }

      if (cardNodes.length > 0 && galleryRef.current) {
        gsap.fromTo(
          cardNodes,
          {
            opacity: 0,
            y: 24,
            scale: 1.01,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.12,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 84%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    const mm = gsap.matchMedia();

    if (firstImageInnerRef.current && galleryRef.current) {
      mm.add("(min-width: 768px)", () => {
        gsap.set(firstImageInnerRef.current, {
          yPercent: -3,
          scale: 1.04,
          transformOrigin: "center center",
        });

        const parallaxTween = gsap.to(firstImageInnerRef.current, {
          yPercent: 3,
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.3,
          },
        });

        return () => {
          parallaxTween.kill();
        };
      });
    }

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="moments-on-board-title"
      className="
        relative
        overflow-hidden
        bg-[#F4F5F2]
        py-[84px]
        text-[#2D3C68]
        md:py-[124px]
      "
      style={{
        backgroundColor: "#F4F5F2",
        colorScheme: "light",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .moments-scrollbar {
              scrollbar-width: none;
            }

            .moments-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `,
        }}
      />

      {/* WARM SURFACE */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(circle at 72% 18%, rgba(176,141,87,0.05) 0%, rgba(176,141,87,0) 48%)",
        }}
      />

      {/* SOFT NAVY DEPTH */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(circle at 14% 82%, rgba(45,60,104,0.045) 0%, rgba(45,60,104,0) 54%)",
        }}
      />

      {/* GRAIN */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-[-10%]
          opacity-[0.022]
          mix-blend-soft-light
        "
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dombq6plz/image/upload/v1747227718/noise_t0x7vx.png')",
        }}
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1280px]
          px-6
          md:px-10
          lg:px-14
        "
      >
        {/* HEADER — SMALL, NOT A HERO */}
        <div
          ref={headerRef}
          className="
            mb-10
            grid
            grid-cols-1
            gap-6
            md:mb-14
            md:grid-cols-12
            md:items-end
            md:gap-10
          "
        >
          <div className="md:col-span-4">
            <h2
              id="moments-on-board-title"
              className="
                moments-reveal
                text-[10px]
                uppercase
                tracking-[0.34em]
                text-[#2D3C68]/44
                md:text-[11px]
              "
            >
              Moments On Board
            </h2>

            <div
              aria-hidden="true"
              className="
                moments-reveal
                mt-5
                h-px
                w-10
                bg-[#B08D57]/62
              "
            />
          </div>

          <p
            className="
              moments-reveal
              max-w-[520px]
              text-[15px]
              leading-[1.9]
              text-[#2D3C68]/66
              md:col-span-6
              md:col-start-7
              md:text-[16px]
              md:leading-[1.86]
            "
          >
            Meals, crossings, quiet hours, and the small movements of a day at
            sea.
          </p>
        </div>

        {/* EDITORIAL IMAGE SEQUENCE */}
        <div
          ref={galleryRef}
          className="
            moments-scrollbar
            -mx-6
            flex
            snap-x
            snap-mandatory
            gap-4
            overflow-x-auto
            px-6
            pb-2
            md:mx-0
            md:grid
            md:grid-cols-12
            md:gap-4
            md:overflow-visible
            md:px-0
            md:pb-0
            lg:gap-5
          "
        >
          {FRAMES.map((frame, index) => (
            <figure
              key={frame.id}
              className={`
                moment-card
                relative
                flex-none
                w-[78vw]
                snap-start
                overflow-hidden
                bg-[#2D3C68]/[0.045]
                shadow-[0_18px_44px_rgba(22,32,55,0.07)]
                ring-1
                ring-[#2D3C68]/[0.065]
                md:w-auto
                md:shadow-[0_24px_70px_rgba(22,32,55,0.08)]
                ${frame.desktopClass}
              `}
            >
              <div
                className="
                  relative
                  aspect-[4/5]
                  overflow-hidden
                  md:h-full
                  md:aspect-auto
                "
              >
                <div
                  ref={index === 0 ? firstImageInnerRef : null}
                  className="
                    absolute
                    inset-[-4%]
                    will-change-transform
                  "
                >
                  <img
                    src={frame.image}
                    alt={frame.alt}
                    loading={frame.priority ? "eager" : "lazy"}
                    decoding="async"
                    draggable="false"
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                    style={{
                      objectPosition: frame.position,
                      filter: "brightness(0.94) saturate(0.9) contrast(1.045)",
                    }}
                  />
                </div>

                {/* NAVY UNIFIER */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-[#2D3C68]/[0.035]
                  "
                />

                {/* IMAGE DEPTH */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                  "
                  style={{
                    background:
                      "linear-gradient(to top, rgba(8,12,18,0.28) 0%, rgba(8,12,18,0.08) 34%, rgba(8,12,18,0) 70%)",
                  }}
                />

                {/* WARM FILM */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                  "
                  style={{
                    background:
                      "radial-gradient(circle at 52% 34%, rgba(176,141,87,0.055) 0%, rgba(176,141,87,0) 58%)",
                  }}
                />

                {/* FINE EDGE */}
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
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* BRIDGE OUT */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-[88px]
          md:h-[112px]
        "
        style={{
          background:
            "linear-gradient(to bottom, rgba(244,245,242,0) 0%, rgba(45,60,104,0.035) 100%)",
        }}
      />
    </section>
  );
}

function BeforeYouSail() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const listRef = useRef(null);

  const shouldReduceMotion = useReducedMotion();

  const QUESTIONS = [
    {
      question: "How many guests does Serenity carry?",
      answer:
        "Serenity carries twelve guests across four cabins, with ten crew aboard.",
    },
    {
      question: "Where does Serenity sail?",
      answer:
        "Serenity sails through Indonesian waters including Raja Ampat and Labuan Bajo, depending on season, route, and sea conditions.",
    },
    {
      question: "Is the itinerary fixed?",
      answer:
        "Each voyage begins with a route plan, then adjusts to weather, anchorage, and the rhythm of the group on board.",
    },
    {
      question: "What does the crew handle?",
      answer:
        "The crew handles cabins, meals, tenders, anchorages, safety, and the small timing that keeps each day moving without feeling managed.",
    },
    {
      question: "Who is Serenity best suited for?",
      answer:
        "Serenity is best suited for guests who want a slower, more personal voyage: fewer people, more space, and days shaped by the sea rather than a fixed schedule.",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const introNodes = introRef.current
      ? Array.from(introRef.current.querySelectorAll(".sail-reveal"))
      : [];

    const questionNodes = listRef.current
      ? Array.from(listRef.current.querySelectorAll(".sail-question"))
      : [];

    const allNodes = [...introNodes, ...questionNodes].filter(Boolean);

    if (shouldReduceMotion) {
      gsap.set(allNodes, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      });

      return;
    }

    const ctx = gsap.context(() => {
      if (introNodes.length > 0 && introRef.current) {
        gsap.fromTo(
          introNodes,
          {
            opacity: 0,
            y: 18,
            filter: "blur(5px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.04,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: introRef.current,
              start: "top 84%",
              once: true,
            },
          }
        );
      }

      if (questionNodes.length > 0 && listRef.current) {
        gsap.fromTo(
          questionNodes,
          {
            opacity: 0,
            y: 18,
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.96,
            stagger: 0.075,
            ease: "power3.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 84%",
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
      aria-labelledby="before-you-sail-title"
      className="
        relative
        overflow-hidden
        bg-[#F4F5F2]
        py-[84px]
        text-[#2D3C68]
        md:py-[124px]
      "
      style={{
        backgroundColor: "#F4F5F2",
        colorScheme: "light",
      }}
    >
      {/* SOFT NAVY SURFACE */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(circle at 84% 16%, rgba(45,60,104,0.045) 0%, rgba(45,60,104,0) 48%)",
        }}
      />

      {/* LOWER DEPTH */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(circle at 10% 86%, rgba(45,60,104,0.038) 0%, rgba(45,60,104,0) 54%)",
        }}
      />

      {/* GRAIN */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-[-10%]
          opacity-[0.022]
          mix-blend-soft-light
        "
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dombq6plz/image/upload/v1747227718/noise_t0x7vx.png')",
        }}
      />

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          max-w-[1280px]
          grid-cols-1
          gap-12
          px-6
          md:grid-cols-12
          md:gap-10
          md:px-10
          lg:gap-14
          lg:px-14
        "
      >
        {/* INTRO */}
        <div
          ref={introRef}
          className="
            md:col-span-4
            lg:col-span-4
          "
        >
          <p
            className="
              sail-reveal
              text-[10px]
              uppercase
              tracking-[0.34em]
              text-[#2D3C68]/42
              md:text-[11px]
            "
          >
            Before You Sail
          </p>

          <h2
            id="before-you-sail-title"
            className="
              sail-reveal
              mt-7
              max-w-[11ch]
              font-[Gambarino]
              text-[34px]
              leading-[1.04]
              tracking-[-0.038em]
              text-[#2D3C68]
              sm:text-[40px]
              md:text-[clamp(42px,3.6vw,52px)]
            "
          >
            A few practical notes
          </h2>
 
        </div>

        {/* PRACTICAL LIST */}
        <div
          ref={listRef}
          className="
            md:col-span-7
            md:col-start-6
            lg:col-span-7
            lg:col-start-6
          "
        >
          <div className="border-t border-[#2D3C68]/10">
            {QUESTIONS.map((item, index) => {
              const number = String(index + 1).padStart(2, "0");

              return (
                <article
                  key={item.question}
                  className="
                    sail-question
                    border-b
                    border-[#2D3C68]/10
                    py-8
                    md:py-9
                  "
                >
                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-4
                      md:grid-cols-12
                      md:gap-8
                    "
                  >
                    <div
                      className="
                        md:col-span-2
                        md:pt-[3px]
                      "
                    >
                      <p
                        className="
                          text-[10px]
                          uppercase
                          tracking-[0.28em]
                          text-[#2D3C68]/34
                        "
                      >
                        {number}
                      </p>
                    </div>

                    <div className="md:col-span-4">
                      <h3
                        className="
                          max-w-[28ch]
                          text-[15px]
                          leading-[1.45]
                          tracking-[-0.01em]
                          text-[#2D3C68]/88
                          md:text-[16px]
                        "
                      >
                        {item.question}
                      </h3>
                    </div>

                    <div className="md:col-span-6">
                      <p
                        className="
                          max-w-[560px]
                          text-[14px]
                          leading-[1.82]
                          text-[#2D3C68]/62
                          md:text-[15px]
                        "
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* BRIDGE OUT */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-[88px]
          md:h-[112px]
        "
        style={{
          background:
            "linear-gradient(to bottom, rgba(244,245,242,0) 0%, rgba(45,60,104,0.035) 100%)",
        }}
      />
    </section>
  );
}

function AboutOrigin() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headlineRef = useRef(null);
  const bodyRef = useRef(null);
  const imageRef = useRef(null);
  const quoteRef = useRef(null);
 
  useEffect(() => {
    const ctx = gsap.context(() => {
      // LABEL + HEADLINE
      gsap.fromTo(
        [labelRef.current, headlineRef.current],
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );
 
      // BODY
      gsap.fromTo(
        bodyRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        }
      );
 
      // IMAGE
      gsap.fromTo(
        imageRef.current,
        { y: 32, opacity: 0, scale: 1.02 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
 
      // QUOTE
      gsap.fromTo(
        quoteRef.current,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 88%",
          },
        }
      );
 
      // IMAGE PARALLAX
      gsap.to(imageRef.current, {
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
 
    return () => ctx.revert();
  }, []);
 
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F4F5F2] py-[120px]"
    >
 
      {/* SUBTLE ATMOSPHERE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_12%,rgba(45,60,104,0.04),transparent_28%)] pointer-events-none" />
 
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10">
 
        {/* ASYMMETRIC GRID — text left offset, image right */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_0.82fr] lg:gap-24 lg:items-start">
 
          {/* LEFT — TEXT BLOCK */}
          <div className="lg:pt-10">
 
            {/* MICRO LABEL */}
            <p
              ref={labelRef}
              className="mb-8 text-[10px] uppercase tracking-[0.36em] text-[#5C5C5C]"
              style={{ opacity: 0.6 }}
            >
              Why Serenity Exists
            </p>
 
            {/* HEADLINE */}
            <h2
              ref={headlineRef}
              className="font-[Gambarino] leading-[1.02] tracking-[-0.03em] text-[#2D3C68]"
              style={{ fontSize: "clamp(34px, 4.2vw, 58px)" }}
            >
              Indonesia has the
              <br />
              best sea in the world.
              <br />
              <span style={{ opacity: 0.4 }}>
                Something was always missing.
              </span>
            </h2>
 
            {/* BODY */}
            <div ref={bodyRef}>
              <p
                className="mt-9 text-[15px] leading-[1.95] text-[#2D3C68] max-w-[480px]"
                style={{ opacity: 0.8 }}
              >
                Every journey felt too crowded, too scheduled, too far from
                the water itself. The archipelago was there — Raja Ampat,
                Komodo, Labuan Bajo — but the way people accessed it kept
                getting in the way.
              </p>
 
              <p
                className="mt-6 text-[15px] leading-[1.95] text-[#2D3C68] max-w-[480px]"
                style={{ opacity: 0.8 }}
              >
                Serenity was built to close that gap. Not a bigger boat.
                Not a resort that floats. A phinisi — the vessel Indonesia
                has used to read the sea for centuries — scaled for twelve
                people who want to actually be there.
              </p>
 
              <p
                className="mt-6 text-[15px] leading-[1.95] text-[#2D3C68] max-w-[480px]"
                style={{ opacity: 0.8 }}
              >
                One group. No rigid schedule. Ten crew whose only job is
                to make sure nothing gets in the way.
              </p>
 
              {/* BRASS DIVIDER */}
              <div
                className="mt-12 h-px max-w-[200px] bg-gradient-to-r from-[#B08D57]/40 to-transparent"
              />
 
              {/* QUOTE */}
              <p
                ref={quoteRef}
                className="mt-7 text-[13px] leading-[1.8] text-[#2D3C68] max-w-[380px]"
                style={{ opacity: 0.4 }}
              >
                "Not simply a vessel — a way to experience the sea."
              </p>
            </div>
          </div>
 
          {/* RIGHT — IMAGE OFFSET */}
          <div className="relative lg:mt-0 mt-4">
 
            {/* IMAGE — 4:5 portrait */}
            <div
              ref={imageRef}
              className="relative overflow-hidden"
              style={{ aspectRatio: "4/5" }}
            >
              <img
                src="https://res.cloudinary.com/dombq6plz/image/upload/v1777307172/ChatGPT_Image_Apr_27_2026_10_24_29_PM_1_ou4x2n.png"
                alt="Guests sharing a meal on the deck of Serenity"
                className="h-full w-full object-cover object-center"
              />
 
              {/* MARITIME TINT */}
              <div className="absolute inset-0 bg-[#2D3C68]/14" />
 
              {/* BOTTOM DEPTH */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D3C68]/30 via-transparent to-transparent" />
            </div>
 
            {/* FLOATING META — bottom left of image */}
            <div className="absolute bottom-6 left-6 z-10">
              <p
                className="text-[10px] uppercase tracking-[0.28em] text-[#F4F5F2]"
                style={{ opacity: 0.6 }}
              >
                Tanah Beru, South Sulawesi
              </p>
            </div>
 
          </div>
 
        </div>
 
      </div>
    </section>
  );
}

function Philosophy() {
  const decisions = [
    {
      number: "01",
      headline: "Twelve guests. Not more.",
      body: "A larger boat carries more people. It also carries more noise, more distance, more of everything that gets between you and the sea. Twelve is not a limitation — it is the number at which a journey still feels like one.",
    },
    {
      number: "02",
      headline: "No schedule. Not by accident.",
      body: "Every morning on Serenity begins without an agenda. The sea, the season, and what the group wants — that is what shapes the day. Rigidity is the enemy of the kind of experience we are trying to create.",
    },
    {
      number: "03",
      headline: "A phinisi. Always.",
      body: "Indonesia's maritime heritage is not decoration here. The phinisi is the reason the boat sits the way it does in the water, moves the way it does through a channel, feels the way it does underfoot. We did not choose it for aesthetics. We chose it because nothing else is built for this sea the way a phinisi is.",
    },
  ];
   
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const decisionsRef = useRef([]);
  const closingRef = useRef(null);
 
  useEffect(() => {
    const ctx = gsap.context(() => {
 
      // HEADER
      gsap.fromTo(
        headerRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
        }
      );
 
      // DECISIONS
      decisionsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 84%",
            },
          }
        );
      });
 
      // CLOSING
      gsap.fromTo(
        closingRef.current,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: closingRef.current,
            start: "top 90%",
          },
        }
      );
 
    }, sectionRef);
 
    return () => ctx.revert();
  }, []);
 
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F4F5F2] py-[100px] md:py-[120px]"
    >
 
      {/* ATMOSPHERE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(45,60,104,0.04),transparent_50%)] pointer-events-none" />
 
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10">
 
        {/* HEADER — full width centered */}
        <div
          ref={headerRef}
          className="text-center mb-16 md:mb-24"
        >
          {/* MICRO LABEL */}
          <p
            className="mb-6 text-[10px] uppercase tracking-[0.36em] text-[#5C5C5C]"
            style={{ opacity: 0.6 }}
          >
            The Way We Think
          </p>
 
          {/* HEADLINE — large, centered, full width */}
          <h2
            className="font-[Gambarino] leading-[1.02] tracking-[-0.03em] text-[#2D3C68] mx-auto"
            style={{ fontSize: "clamp(38px, 5.5vw, 72px)" }}
          >
            Every decision here
            <br />
            was made on purpose.
          </h2>
 
          {/* BODY — narrow centered */}
          <p
            className="mt-7 text-[14px] md:text-[15px] leading-[1.95] text-[#2D3C68] max-w-[480px] mx-auto"
            style={{ opacity: 0.8 }}
          >
            Serenity is not the result of what was easiest or most expected.
            It is the result of deliberate choices — each one made to protect
            the quality of what happens on board.
          </p>
        </div>
 
        {/* DECISIONS */}
        <div className="flex flex-col">
          {decisions.map((d, i) => (
            <div
              key={i}
              ref={(el) => (decisionsRef.current[i] = el)}
              className={`
                grid grid-cols-[32px_1fr] md:grid-cols-[64px_1fr] gap-6 md:gap-12
                py-10 md:py-12
                border-t border-[#2D3C68]/10
                ${i === decisions.length - 1 ? "border-b" : ""}
              `}
            >
              {/* NUMBER */}
              <div className="pt-[5px]">
                <span
                  className="font-[Gambarino] text-[#2D3C68] text-[12px] tracking-[0.1em]"
                  style={{ opacity: 0.2 }}
                >
                  {d.number}
                </span>
              </div>
 
              {/* CONTENT */}
              <div>
                <h3
                  className="font-[Gambarino] leading-[1.06] tracking-[-0.02em] text-[#2D3C68]"
                  style={{ fontSize: "clamp(22px, 2.6vw, 34px)" }}
                >
                  {d.headline}
                </h3>
 
                <p
                  className="mt-4 text-[13px] md:text-[14px] leading-[1.95] text-[#2D3C68] max-w-[600px]"
                  style={{ opacity: 0.6 }}
                >
                  {d.body}
                </p>
              </div>
            </div>
          ))}
        </div>
 
        {/* CLOSING */}
        <div
          ref={closingRef}
          className="mt-12 md:mt-14 text-center"
        >
          <div className="h-px w-[120px] bg-gradient-to-r from-transparent via-[#B08D57]/38 to-transparent mx-auto mb-6" />
          <p
            className="text-[12px] md:text-[13px] leading-[1.8] text-[#2D3C68] italic"
            style={{ opacity: 0.4 }}
          >
            These are not policies. They are the reasons Serenity exists.
          </p>
        </div>
 
      </div>
    </section>
  );
}

function AboutCrew() {
  const crew = [
    {
      role: "Captain",
      name: "Arif",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1777271186/ChatGPT_Image_Apr_27_2026_01_24_43_PM_xylsa1.png",
      body:
        "Steady, experienced, and quietly attentive. Arif reads the sea the way most people read a room — instinctively, and without making a show of it.",
      fact: "Has navigated Indonesian waters for over a decade.",
    },
    {
      role: "Chef",
      name: "Rani",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1777271186/ChatGPT_Image_Apr_27_2026_01_24_38_PM_iuf3mw.png",
      body:
        "Every meal on Serenity is built around what the group actually wants — dietary preferences, local catch, and what time people naturally wake up.",
      fact: "Menus change daily. Nothing is pre-set before the journey begins.",
    },
  ];
 
  const sectionRef = useRef(null);
  const groupImageRef = useRef(null);
  const introRef = useRef(null);
  const cardsRef = useRef([]);
 
  useEffect(() => {
    const ctx = gsap.context(() => {
 
      // GROUP IMAGE
      gsap.fromTo(
        groupImageRef.current,
        { scale: 1.03, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: groupImageRef.current,
            start: "top 82%",
          },
        }
      );
 
      // INTRO
      gsap.fromTo(
        introRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 80%",
          },
        }
      );
 
      // CARDS
      cardsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
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
      className="relative overflow-hidden bg-[#F4F5F2] py-[100px] md:py-[120px]"
    >
 
      {/* ATMOSPHERE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,106,79,0.04),transparent_30%)] pointer-events-none" />
 
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10">
 
        {/* GROUP IMAGE — fixed height, not full bleed */}
        <div
          ref={groupImageRef}
          className="relative overflow-hidden w-full mb-14 md:mb-16"
          style={{ height: "clamp(280px, 52vh, 520px)" }}
        >
          <img
            src="https://res.cloudinary.com/dombq6plz/image/upload/v1777227225/ChatGPT_Image_Apr_27_2026_01_12_43_AM_1_l0xnxm.png"
            alt="The full crew of Serenity on deck"
            className="h-full w-full object-cover object-center"
          />
 
          {/* TINT */}
          <div className="absolute inset-0 bg-[#2D3C68]/14" />
 
          {/* BOTTOM DEPTH */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D3C68]/30 via-transparent to-transparent" />
 
          {/* META */}
          <div className="absolute bottom-5 left-5 z-10">
            <p
              className="text-[10px] uppercase tracking-[0.28em] text-[#F4F5F2]"
              style={{ opacity: 0.6 }}
            >
              10 crew · Serenity
            </p>
          </div>
        </div>
 
        {/* INTRO */}
        <div
          ref={introRef}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-20 border-b border-[#2D3C68]/10 pb-14 md:pb-16"
        >
          {/* LEFT */}
          <div>
            <p
              className="mb-6 text-[10px] uppercase tracking-[0.36em] text-[#5C5C5C]"
              style={{ opacity: 0.6 }}
            >
              The Crew
            </p>
 
            <h2
              className="font-[Gambarino] leading-[1.02] tracking-[-0.03em] text-[#2D3C68]"
              style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
            >
              Ten people.
              <br />
              <span style={{ opacity: 0.4 }}>All of them matter.</span>
            </h2>
          </div>
 
          {/* RIGHT */}
          <div className="lg:pt-4 flex flex-col justify-end">
            <p
              className="text-[14px] md:text-[15px] leading-[1.95] text-[#2D3C68] max-w-[480px]"
              style={{ opacity: 0.8 }}
            >
              Every crew member comes from Indonesia's maritime communities.
              They know this sea — not from training, but from living near it
              their entire lives. Ten crew for twelve guests is not a selling
              point. It is a structural decision that changes how every day
              feels.
            </p>
          </div>
        </div>
 
        {/* CREW CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-10 pt-14 md:pt-16">
          {crew.map((person, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
            >
              {/* IMAGE — 4:5 */}
              <div
                className="relative overflow-hidden w-full"
                style={{ aspectRatio: "4/5" }}
              >
                <img
                  src={person.image}
                  alt={`${person.name} — ${person.role} on Serenity`}
                  className="h-full w-full object-cover object-top"
                />
 
                {/* TINT */}
                <div className="absolute inset-0 bg-[#2D3C68]/10" />
 
                {/* BOTTOM DEPTH */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D3C68]/24 via-transparent to-transparent" />
 
                {/* ROLE TAG */}
                <div className="absolute bottom-5 left-5 z-10">
                  <p
                    className="text-[10px] uppercase tracking-[0.28em] text-[#F4F5F2]"
                    style={{ opacity: 0.7 }}
                  >
                    {person.role}
                  </p>
                </div>
              </div>
 
              {/* TEXT */}
              <div className="pt-7">
 
                {/* NAME */}
                <h3
                  className="font-[Gambarino] leading-none tracking-[-0.02em] text-[#2D3C68]"
                  style={{ fontSize: "clamp(32px, 3.2vw, 44px)" }}
                >
                  {person.name}
                </h3>
 
                {/* BODY */}
                <p
                  className="mt-4 text-[14px] md:text-[15px] leading-[1.9] text-[#2D3C68] max-w-[460px]"
                  style={{ opacity: 0.8 }}
                >
                  {person.body}
                </p>
 
                {/* DIVIDER */}
                <div className="mt-6 h-px max-w-[120px] bg-gradient-to-r from-[#B08D57]/40 to-transparent" />
 
                {/* FACT */}
                <p
                  className="mt-4 text-[12px] md:text-[13px] leading-[1.8] text-[#2D3C68] italic"
                  style={{ opacity: 0.4 }}
                >
                  {person.fact}
                </p>
 
              </div>
            </div>
          ))}
        </div>
 
      </div>
    </section>
  );
}

function ForWho() {
  const traits = [
    "People who want to be close to the sea — not above it.",
    "Those who travel in small groups and mean it.",
    "Anyone who finds rigid itineraries exhausting.",
    "People who eat well, sleep soundly, and need nothing performed for them.",
    "Those who understand that the best days are unplanned.",
  ];
 
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const traitsRef = useRef([]);
  const closingRef = useRef(null);
 
  useEffect(() => {
    const ctx = gsap.context(() => {
 
      // HEADER
      gsap.fromTo(
        headerRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
        }
      );
 
      // TRAITS
      traitsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
            },
          }
        );
      });
 
      // CLOSING
      gsap.fromTo(
        closingRef.current,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: closingRef.current,
            start: "top 90%",
          },
        }
      );
 
    }, sectionRef);
 
    return () => ctx.revert();
  }, []);
 
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#2D3C68] py-[100px] md:py-[120px]"
    >
 
      {/* DEPTH */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(176,141,87,0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#2D3C68] pointer-events-none" />
 
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10">
 
        {/* HEADER */}
        <div
          ref={headerRef}
          className="max-w-[640px] mb-16 md:mb-20"
        >
          <p
            className="mb-6 text-[10px] uppercase tracking-[0.36em] text-[#F4F5F2]"
            style={{ opacity: 0.4 }}
          >
            Who This Is For
          </p>
 
          <h2
            className="font-[Gambarino] leading-[1.02] tracking-[-0.03em] text-[#F4F5F2]"
            style={{ fontSize: "clamp(34px, 4.8vw, 64px)" }}
          >
            Serenity is not
            <br />
            for everyone.
            <br />
            <span style={{ opacity: 0.35 }}>That is the point.</span>
          </h2>
 
          <p
            className="mt-7 text-[14px] md:text-[15px] leading-[1.95] text-[#F4F5F2] max-w-[460px]"
            style={{ opacity: 0.6 }}
          >
            We built this for a specific kind of person. Not defined by budget
            or background — but by how they want to experience the world.
          </p>
        </div>
 
        {/* TRAITS */}
        <div className="flex flex-col border-t border-[#F4F5F2]/10">
          {traits.map((trait, i) => (
            <div
              key={i}
              ref={(el) => (traitsRef.current[i] = el)}
              className="grid grid-cols-[28px_1fr] md:grid-cols-[48px_1fr] gap-4 md:gap-8 py-7 md:py-8 border-b border-[#F4F5F2]/10"
            >
              {/* NUMBER */}
              <div className="pt-[3px]">
                <span
                  className="font-[Gambarino] text-[#F4F5F2] text-[12px] tracking-[0.1em]"
                  style={{ opacity: 0.2 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
 
              {/* TRAIT */}
              <p
                className="text-[15px] md:text-[17px] leading-[1.7] text-[#F4F5F2] font-[Gambarino] tracking-[-0.01em]"
                style={{ opacity: 0.88 }}
              >
                {trait}
              </p>
            </div>
          ))}
        </div>
 
        {/* CLOSING */}
        <div
          ref={closingRef}
          className="mt-12 md:mt-14"
        >
          <div className="h-px max-w-[120px] bg-gradient-to-r from-[#B08D57]/50 to-transparent mb-6" />
          <p
            className="text-[12px] md:text-[13px] leading-[1.8] text-[#F4F5F2] italic"
            style={{ opacity: 0.35 }}
          >
            If this sounds like you, the rest will make sense.
          </p>
        </div>
 
      </div>
    </section>
  );
}


 

  
 








function SerenityWay  () {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const blockOneRef = useRef(null);
  const blockTwoRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 76%",
        },
        defaults: {
          ease: "power3.out",
        },
      });

      tl.fromTo(
        headerRef.current.children,
        {
          y: 28,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1,
        }
      )
        .fromTo(
          blockOneRef.current.children,
          {
            y: 32,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
          },
          "-=0.45"
        )
        .fromTo(
          blockTwoRef.current.children,
          {
            y: 32,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
          },
          "-=0.55"
        )
        .fromTo(
          quoteRef.current,
          {
            y: 24,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
          },
          "-=0.4"
        );

      gsap.to(".parallax-image-a", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: blockOneRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".parallax-image-b", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: blockTwoRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F4F5F2] py-28 md:py-36"
    >
      {/* atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_16%,rgba(176,141,87,0.06),transparent_24%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_82%,rgba(45,60,104,0.04),transparent_22%)]" />

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 md:px-10 lg:px-16">
        {/* ===================================================== */}
        {/* HEADER */}
        {/* ===================================================== */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 gap-10 border-b border-[#2D3C68]/10 pb-14 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div>
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.34em] text-[#5C5C5C]">
              A Different Rhythm
            </p>

            <h2 className="font-[Gambarino] text-[44px] leading-[0.98] tracking-[-0.03em] text-[#2D3C68] sm:text-[56px] md:text-[72px]">
              Luxury feels
              <br />
              quieter here
            </h2>
          </div>

          <div className="lg:pt-8">
            <p className="max-w-[500px] text-[15px] leading-[1.95] text-[#2D3C68]/72 md:text-[16px]">
              Serenity was shaped around a slower, more human pace — where
              privacy, comfort, and freedom are felt naturally rather than
              announced.
            </p>
          </div>
        </div>

        {/* ===================================================== */}
        {/* BLOCK ONE */}
        {/* ===================================================== */}
        <div
          ref={blockOneRef}
          className="grid grid-cols-1 items-center gap-10 pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
        >
          {/* text */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#8B6A4F]">
              Slow Mornings
            </p>

            <h3 className="mt-5 text-[34px] leading-[1.08] tracking-[-0.02em] text-[#2D3C68] md:text-[42px]">
              Coffee arrives quietly.
              <br />
              The sea is already awake.
            </h3>

            <p className="mt-6 max-w-[440px] text-[15px] leading-[1.9] text-[#2D3C68]/72">
              No timetable pressing the day forward. Space to swim, read,
              disappear for a while, or simply watch the water move.
            </p>
          </div>

          {/* image */}
          <div className="overflow-hidden rounded-[30px] shadow-[0_24px_70px_rgba(0,0,0,0.08)]">
            <div className="parallax-image-a relative h-[380px] md:h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1800&auto=format&fit=crop"
                alt="Morning sea view"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-[#2D3C68]/14" />
            </div>
          </div>
        </div>

        {/* ===================================================== */}
        {/* BLOCK TWO */}
        {/* ===================================================== */}
        <div
          ref={blockTwoRef}
          className="grid grid-cols-1 items-center gap-10 pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
        >
          {/* image */}
          <div className="order-2 overflow-hidden rounded-[30px] shadow-[0_24px_70px_rgba(0,0,0,0.08)] lg:order-1">
            <div className="parallax-image-b relative h-[380px] md:h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1800&auto=format&fit=crop"
                alt="Open sea afternoon"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-[#2D3C68]/16" />
            </div>
          </div>

          {/* text */}
          <div className="order-1 lg:order-2">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#8B6A4F]">
              Open Afternoons
            </p>

            <h3 className="mt-5 text-[34px] leading-[1.08] tracking-[-0.02em] text-[#2D3C68] md:text-[42px]">
              Routes follow weather,
              <br />
              not rigid plans.
            </h3>

            <p className="mt-6 max-w-[440px] text-[15px] leading-[1.9] text-[#2D3C68]/72">
              A quieter bay. Better light. Clearer water ahead. The best days
              rarely happen by sticking to a script.
            </p>
          </div>
        </div>

        {/* ===================================================== */}
        {/* QUOTE / FOOTER */}
        {/* ===================================================== */}
        <div
          ref={quoteRef}
          className="mt-20 border-t border-[#2D3C68]/10 pt-10"
        >
          <p className="max-w-[760px] font-[Gambarino] text-[34px] leading-[1.15] tracking-[-0.02em] text-[#2D3C68] md:text-[46px]">
            The details are quiet.
            <br />
            The feeling stays with you.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-[11px] uppercase tracking-[0.24em] text-[#2D3C68]/48">
            <span>12 Guests</span>
            <span>10 Crew</span>
            <span>Private Charter</span>
            <span>Indonesia</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhySerenityExists() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const rowsRef = useRef([]);
  const proofRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 76%",
        },
        defaults: {
          ease: "power3.out",
        },
      });

      tl.fromTo(
        headerRef.current.children,
        {
          y: 24,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1,
        }
      )
        .fromTo(
          rowsRef.current,
          {
            y: 28,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.95,
          },
          "-=0.45"
        )
        .fromTo(
          proofRef.current.children,
          {
            y: 16,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.8,
          },
          "-=0.35"
        );

      rowsRef.current.forEach((row) => {
        if (!row) return;

        row.addEventListener("mouseenter", () => {
          gsap.to(row, {
            x: 6,
            duration: 0.28,
            ease: "power2.out",
          });
        });

        row.addEventListener("mouseleave", () => {
          gsap.to(row, {
            x: 0,
            duration: 0.28,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const tradeoffs = [
    {
      left: "Large enough to impress",
      right: "Often too large to feel personal",
    },
    {
      left: "Beautifully traditional",
      right: "Sometimes limited in comfort or capability",
    },
    {
      left: "Highly structured itineraries",
      right: "Often leave little room for instinct or spontaneity",
    },
  ];

  const proofs = [
    "12 Guests",
    "10 Crew",
    "4 Cabins",
    "Private Charter Only",
    "Flexible Routing",
    "Indonesia",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F4F5F2] py-28 md:py-36"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(176,141,87,0.06),transparent_24%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_82%,rgba(45,60,104,0.04),transparent_22%)]" />

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 md:px-10 lg:px-16">
        {/* ===================================================== */}
        {/* HEADER */}
        {/* ===================================================== */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 gap-10 border-b border-[#2D3C68]/10 pb-14 lg:grid-cols-[1fr_0.9fr]"
        >
          <div>
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.34em] text-[#5C5C5C]">
              Why Serenity Exists
            </p>

            <h2 className="font-[Gambarino] text-[44px] leading-[0.98] tracking-[-0.03em] text-[#2D3C68] sm:text-[56px] md:text-[72px]">
              The tradeoff
              <br />
              never made sense
            </h2>
          </div>

          <div className="lg:pt-8">
            <p className="max-w-[500px] text-[15px] leading-[1.95] text-[#2D3C68]/72 md:text-[16px]">
              Too many sea journeys ask guests to compromise between intimacy,
              comfort, and freedom. Serenity was created to offer all three in
              balance.
            </p>
          </div>
        </div>

        {/* ===================================================== */}
        {/* TRADEOFF ROWS */}
        {/* ===================================================== */}
        <div className="mt-14 space-y-4">
          {tradeoffs.map((item, index) => (
            <div
              key={index}
              ref={(el) => (rowsRef.current[index] = el)}
              className="grid cursor-default grid-cols-1 gap-5   border border-[#2D3C68]/10 bg-white/44 px-6 py-6 transition-all duration-300 hover:border-[#B08D57]/24 hover:shadow-[0_18px_50px_rgba(0,0,0,0.05)] md:grid-cols-[0.9fr_auto_1.1fr] md:items-center md:px-8"
            >
              {/* left */}
              <p className="text-[17px] leading-[1.6] text-[#2D3C68]">
                {item.left}
              </p>

              {/* divider */}
              <div className="hidden h-px w-10 bg-gradient-to-r from-[#B08D57]/40 to-transparent md:block" />

              {/* right */}
              <p className="text-[15px] leading-[1.8] text-[#2D3C68]/62">
                {item.right}
              </p>
            </div>
          ))}
        </div>

        {/* ===================================================== */}
        {/* SERENITY ANSWER */}
        {/* ===================================================== */}
        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-[#2D3C68]/10 pt-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#8B6A4F]">
              The Serenity Answer
            </p>

            <h3 className="mt-5 font-[Gambarino] text-[38px] leading-[1.04] tracking-[-0.02em] text-[#2D3C68] md:text-[52px]">
              Small enough to feel personal.
              <br />
              Structured enough to feel effortless.
            </h3>
          </div>

          <div className="lg:pt-6">
            <p className="max-w-[500px] text-[15px] leading-[1.95] text-[#2D3C68]/72 md:text-[16px]">
              A private phinisi yacht with modern systems, experienced crew, and
              the flexibility to let the best days happen naturally.
            </p>
          </div>
        </div>

        {/* ===================================================== */}
        {/* PROOF BAR */}
        {/* ===================================================== */}
        <div
          ref={proofRef}
          className="mt-14 flex flex-wrap gap-3"
        >
          {proofs.map((item, index) => (
            <div
              key={index}
              className="rounded-full border border-[#2D3C68]/10 bg-white/76 px-4 py-2"
            >
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#2D3C68]/62">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatMakesItDifferent() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const rowsRef = useRef([]);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => { 
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 76%",
        },
        defaults: {
          ease: "power3.out",
        },
      });

      tl.fromTo(
        headerRef.current.children,
        {
          y: 24,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1,
        }
      )
        .fromTo(
          rowsRef.current,
          {
            y: 28,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.95,
          },
          "-=0.45"
        )
        .fromTo(
          imageRef.current,
          {
            y: 24,
            opacity: 0,
            scale: 1.04,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.4,
          },
          "-=0.65"
        );

      gsap.to(imageRef.current, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const items = [
    {
      number: "12",
      label: "Guests",
      body: "Enough company when desired, never enough to feel crowded.",
    },
    {
      number: "10",
      label: "Crew",
      body: "High attention, quick response, and space to remain discreet.",
    },
    {
      number: "4",
      label: "Cabins",
      body: "Privacy built in, with room to settle properly.",
    },
    {
      number: "1",
      label: "Private Charter",
      body: "The yacht is yours for the journey — never shared with strangers.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F4F5F2] py-28 md:py-36"
    >
      {/* atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(176,141,87,0.06),transparent_24%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_80%,rgba(45,60,104,0.04),transparent_22%)]" />

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 md:px-10 lg:px-16">
        {/* ===================================================== */}
        {/* HEADER */}
        {/* ===================================================== */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 gap-10 border-b border-[#2D3C68]/10 pb-14 lg:grid-cols-[1fr_0.9fr]"
        >
          <div>
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.34em] text-[#5C5C5C]">
              What Makes It Different
            </p>

            <h2 className="font-[Gambarino] text-[44px] leading-[0.98] tracking-[-0.03em] text-[#2D3C68] sm:text-[56px] md:text-[72px]">
              Scale kept small.
              <br />
              Standards kept high.
            </h2>
          </div>

          <div className="lg:pt-8">
            <p className="max-w-[500px] text-[15px] leading-[1.95] text-[#2D3C68]/72 md:text-[16px]">
              Serenity was designed to feel personal, capable, and effortless —
              where every detail works better because the scale remains
              intentional.
            </p>
          </div>
        </div>

        {/* ===================================================== */}
        {/* CONTENT */}
        {/* ===================================================== */}
        <div className="grid grid-cols-1 gap-12 pt-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* LEFT / PROOF ROWS */}
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                ref={(el) => (rowsRef.current[index] = el)}
                className="rounded-[26px] border border-[#2D3C68]/10 bg-white/76 px-6 py-6 transition-all duration-300 hover:border-[#B08D57]/26 hover:shadow-[0_18px_50px_rgba(0,0,0,0.05)] md:px-8"
              >
                <div className="flex items-end gap-3">
                  <span className="font-[Gambarino] text-[48px] leading-none tracking-[-0.03em] text-[#2D3C68]">
                    {item.number}
                  </span>

                  <span className="pb-1 text-[12px] uppercase tracking-[0.24em] text-[#8B6A4F]">
                    {item.label}
                  </span>
                </div>

                <div className="mt-5 h-px w-full bg-gradient-to-r from-[#B08D57]/30 to-transparent" />

                <p className="mt-5 max-w-[420px] text-[15px] leading-[1.85] text-[#2D3C68]/72">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT / IMAGE + DETAIL */}
          <div>
            <div className="overflow-hidden rounded-[30px] shadow-[0_24px_70px_rgba(0,0,0,0.08)]">
              <div
                ref={imageRef}
                className="relative h-[420px] md:h-[620px]"
              >
                <img
                  src="https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1800&auto=format&fit=crop"
                  alt="Luxury yacht teak deck detail"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-[#2D3C68]/14" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/26 via-transparent to-white/8" />
              </div>
            </div>

            <div className="mt-8 border-t border-[#2D3C68]/10 pt-7">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#8B6A4F]">
                Heritage + Modern Systems
              </p>

              <p className="mt-4 max-w-[520px] text-[15px] leading-[1.9] text-[#2D3C68]/72">
                A traditional phinisi silhouette paired with the operational
                confidence expected from a modern private yacht.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BuiltInIndonesia() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
        },
        defaults: {
          ease: "power3.out",
        },
      });

      tl.fromTo(
        introRef.current.children,
        {
          y: 18,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.72,
        }
      )
        .fromTo(
          imageRef.current,
          {
            y: 24,
            opacity: 0,
            scale: 1.02,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
          },
          "-=0.34"
        )
        .fromTo(
          textRef.current.children,
          {
            y: 16,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.72,
          },
          "-=0.58"
        );

      gsap.to(imageRef.current, {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F4F5F2] py-28 md:py-36"
    >
      {/* ===================================================== */}
      {/* ATMOSPHERE */}
      {/* ===================================================== */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(176,141,87,0.05),transparent_22%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_78%,rgba(45,60,104,0.03),transparent_24%)]" />

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 md:px-10 lg:px-16">
        {/* ===================================================== */}
        {/* INTRO */}
        {/* ===================================================== */}
        <div
          ref={introRef}
          className="grid grid-cols-1 gap-10 border-b border-[#2D3C68]/10 pb-14 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.34em] text-[#5C5C5C]">
              Built in Indonesia
            </p>

            <h2 className="font-[Gambarino] text-[42px] leading-[0.98] tracking-[-0.03em] text-[#2D3C68] sm:text-[54px] md:text-[68px]">
              Crafted where the
              <br />
              phinisi began
            </h2>
          </div>

          <div className="lg:pt-7">
            <p className="max-w-[560px] text-[15px] leading-[1.95] text-[#2D3C68]/72 md:text-[16px]">
              Serenity was built in Indonesia, where shipbuilders in South
              Sulawesi have shaped wooden vessels for generations with a deep
              understanding of sea, balance, and endurance.
            </p>
          </div>
        </div>

        {/* ===================================================== */}
        {/* MAIN EDITORIAL */}
        {/* ===================================================== */}
        <div className="grid grid-cols-1 gap-14 pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-18">
          {/* IMAGE */}
          <div className="overflow-hidden">
            <div
              ref={imageRef}
              className="relative h-[430px] md:h-[560px]"
            >
              <img
                src="https://res.cloudinary.com/dombq6plz/image/upload/v1777222647/ChatGPT_Image_Apr_26_2026_11_55_42_PM_2_oyj4jw.png"
                alt="Teak deck and craftsmanship aboard Serenity"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-[#2D3C68]/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/8" />
            </div>
          </div>

          {/* TEXT */}
          <div
            ref={textRef}
            className="max-w-[520px]"
          >
            <h3 className="text-[34px] leading-[1.08] tracking-[-0.02em] text-[#2D3C68] md:text-[44px]">
              Warm in detail.
              <br />
              Proven at sea.
            </h3>

            <p className="mt-6 text-[15px] leading-[1.95] text-[#2D3C68]/72 md:text-[16px]">
              Teak surfaces bring warmth to life onboard. Traditional hull
              knowledge brings steadiness in changing waters. Modern systems add
              the comfort expected of a private yacht today.
            </p>

            <div className="mt-10 h-px w-full max-w-[220px] bg-gradient-to-r from-[#B08D57]/38 to-transparent" />

            <p className="mt-7 text-[14px] leading-[1.85] text-[#2D3C68]/62">
              Heritage craftsmanship, adapted for contemporary private travel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrivateByDesign() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const statRef = useRef(null);
  const imageRef = useRef(null);
  const pointsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
        },
        defaults: {
          ease: "power3.out",
        },
      });

      tl.fromTo(
        introRef.current.children,
        {
          y: 18,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.72,
        }
      )
        .fromTo(
          statRef.current.children,
          {
            y: 24,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.82,
          },
          "-=0.38"
        )
        .fromTo(
          imageRef.current,
          {
            y: 28,
            opacity: 0,
            scale: 1.015,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.05,
          },
          "-=0.45"
        )
        .fromTo(
          pointsRef.current.children,
          {
            y: 16,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.72,
          },
          "-=0.56"
        );

      gsap.to(imageRef.current, {
        yPercent: 4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const points = [
    {
      title: "Gather well",
      body:
        "Meals, conversations, and sunset moments feel open and relaxed rather than crowded.",
    },
    {
      title: "Retreat easily",
      body:
        "Quiet corners, private cabins, and open deck areas make solitude natural when wanted.",
    },
    {
      title: "Move at your pace",
      body:
        "With one private group onboard, each day follows your rhythm instead of competing priorities.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F4F5F2] py-28 md:py-36"
    >
      {/* atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(176,141,87,0.05),transparent_22%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_78%,rgba(45,60,104,0.03),transparent_24%)]" />

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 md:px-10 lg:px-16">
        {/* ===================================================== */}
        {/* INTRO */}
        {/* ===================================================== */}
        <div
          ref={introRef}
          className="max-w-[820px]"
        >
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.34em] text-[#5C5C5C]">
            Private by Design
          </p>

          <h2 className="font-[Gambarino] text-[42px] leading-[0.97] tracking-[-0.03em] text-[#2D3C68] sm:text-[56px] md:text-[74px]">
            Designed around
            <br />
            one private group
          </h2>

          <p className="mt-7 max-w-[620px] text-[15px] leading-[1.95] text-[#2D3C68]/72 md:text-[16px]">
            Large enough to celebrate together. Small enough to still feel
            personal.
          </p>
        </div>

        {/* ===================================================== */}
        {/* STAT + COPY */}
        {/* ===================================================== */}
        <div
          ref={statRef}
          className="grid grid-cols-1 gap-10 pt-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"
        >
          <div>
            <p className="font-[Gambarino] text-[110px] leading-none tracking-[-0.06em] text-[#2D3C68] md:text-[170px]">
              12
            </p>

            <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-[#8B6A4F]">
              Up to 12 Guests
            </p>
          </div>

          <div className="lg:pb-5">
            <p className="max-w-[620px] text-[22px] leading-[1.35] tracking-[-0.02em] text-[#2D3C68] md:text-[32px]">
              Serenity is intentionally limited to preserve atmosphere, privacy,
              and the feeling that the yacht is truly yours.
            </p>
          </div>
        </div>

        {/* ===================================================== */}
        {/* IMAGE */}
        {/* ===================================================== */}
        <div className="mt-16 overflow-hidden">
          <div
            ref={imageRef}
            className="relative h-[420px] md:h-[560px] lg:h-[640px]"
          >
            <img
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1777225111/ChatGPT_Image_Apr_27_2026_12_35_42_AM_1_pzm9cu.png"
              alt="Guests enjoying the spacious private deck aboard Serenity"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-[#2D3C68]/12" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/24 via-transparent to-white/10" />
          </div>
        </div>

        {/* ===================================================== */}
        {/* POINTS */}
        {/* ===================================================== */}
        <div
          ref={pointsRef}
          className="grid grid-cols-1 gap-x-14 gap-y-12 border-t border-[#2D3C68]/10 pt-14 md:grid-cols-3"
        >
          {points.map((item, index) => (
            <div key={index}>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#8B6A4F]">
                {item.title}
              </p>

              <p className="mt-5 text-[17px] leading-[1.85] text-[#2D3C68]/72">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const actionsRef = useRef(null);
  const footRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 84%",
        },
        defaults: {
          ease: "power3.out",
        },
      });

      tl.fromTo(
        contentRef.current?.children || [],
        {
          y: 22,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
        }
      )
        .fromTo(
          actionsRef.current?.children || [],
          {
            y: 16,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.7,
          },
          "-=0.45"
        )
        .fromTo(
          footRef.current?.children || [],
          {
            y: 10,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.55,
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F4F5F2] py-28 md:py-36"
    >
      {/* atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(176,141,87,0.05),transparent_26%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_82%,rgba(45,60,104,0.03),transparent_24%)]" />

      <div className="relative z-10 mx-auto max-w-[1120px] px-6 text-center md:px-10 lg:px-16">
        {/* ===================================================== */}
        {/* MAIN COPY */}
        {/* ===================================================== */}
        <div
          ref={contentRef}
          className="mx-auto max-w-[860px]"
        >
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.34em] text-[#5C5C5C]">
            Begin Properly
          </p>

          <h2 className="font-[Gambarino] text-[44px] leading-[0.98] tracking-[-0.03em] text-[#2D3C68] sm:text-[58px] md:text-[76px]">
            If you’re going to do it,
            <br />
            do it properly.
          </h2>

          <p className="mx-auto mt-7 max-w-[620px] text-[15px] leading-[1.95] text-[#2D3C68]/72 md:text-[16px]">
            Private journeys through Indonesia, shaped with space, warmth, and
            quiet precision from the moment you step aboard.
          </p>
        </div>

        {/* ===================================================== */}
        {/* ACTIONS */}
        {/* ===================================================== */}
        <div
          ref={actionsRef}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button className="group inline-flex min-w-[220px] items-center justify-center gap-3 rounded-full bg-[#2D3C68] px-8 py-3.5 text-[14px] font-medium text-[#F4F5F2] transition-all duration-300 hover:bg-[#24345B]">
            Explore Journeys

            <svg
              className="transition-transform duration-300 group-hover:translate-x-1"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M5 12h14" />
              <path d="M13 5l7 7-7 7" />
            </svg>
          </button>

          <button className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-[#2D3C68]/14 px-8 py-3.5 text-[14px] font-medium text-[#2D3C68] transition-all duration-300 hover:border-[#2D3C68]/28 hover:bg-white/70">
            Check Availability
          </button>
        </div>

        {/* ===================================================== */}
        {/* TRUST FOOTNOTE */}
        {/* ===================================================== */}
        <div
          ref={footRef}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[11px] uppercase tracking-[0.24em] text-[#2D3C68]/42"
        >
          <span>Private Charter</span>
          <span>12 Guests</span>
          <span>Indonesia</span>
          <span>Tailored Journeys</span>
        </div>
      </div>
    </section>
  );
}

function ThePeopleWhoShapeTheJourney() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const introRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 86%",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        imageRef.current,
        {
          scale: 1.03,
          opacity: 0,
          y: 24,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.12,
          ease: "power4.out",
        }
      )
        .fromTo(
          introRef.current.children,
          {
            y: 18,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.72,
          },
          "-=0.42"
        )
        .fromTo(
          cardsRef.current.children,
          {
            y: 22,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.76,
          },
          "-=0.30"
        );

      gsap.to(imageRef.current, {
        yPercent: 2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const people = [
    {
      role: "Captain",
      name: "Arif",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1777271186/ChatGPT_Image_Apr_27_2026_01_24_43_PM_xylsa1.png",
      body:
        "Steady, experienced, and quietly attentive. Arif guides each route with calm judgment as conditions shift through the day.",
    },
    {
      role: "Chef",
      name: "Rani",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1777271186/ChatGPT_Image_Apr_27_2026_01_24_38_PM_iuf3mw.png",
      body:
        "Fresh meals shaped around your timing, preferences, and the natural rhythm of life onboard from morning to evening.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F4F5F2]"
    >
      {/* HERO IMAGE */}
      <div className="relative h-[92svh] min-h-[760px] w-full overflow-hidden">
        <img
          ref={imageRef}
          src="https://res.cloudinary.com/dombq6plz/image/upload/v1777227225/ChatGPT_Image_Apr_27_2026_01_12_43_AM_1_l0xnxm.png"
          alt="The crew of Serenity together on deck"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[#2D3C68]/14" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        {/* INTRO */}
        <div
          ref={introRef}
          className="grid grid-cols-1 gap-10 border-b border-[#2D3C68]/10 pb-14 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.34em] text-[#5C5C5C]">
              The People Who Shape The Journey
            </p>

            <h2 className="font-[Gambarino] text-[42px] leading-[0.97] tracking-[-0.03em] text-[#2D3C68] sm:text-[56px] md:text-[72px]">
              Good hands
              <br />
              change everything
            </h2>
          </div>

          <div className="lg:pt-6">
            <p className="max-w-[540px] text-[15px] leading-[1.95] text-[#2D3C68]/70 md:text-[16px]">
              A private yacht is remembered not only for where it goes, but for
              the people who shape each day along the way.
            </p>
          </div>
        </div>

        {/* PEOPLE */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-14 pt-14 lg:grid-cols-2"
        >
          {people.map((person, index) => (
            <div key={index}>
              <div className="overflow-hidden">
                <div className="relative aspect-[4/5] w-full">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="pt-8">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#8B6A4F]">
                  {person.role}
                </p>

                <h3 className="mt-4 font-[Gambarino] text-[38px] leading-none tracking-[-0.02em] text-[#2D3C68] md:text-[48px]">
                  {person.name}
                </h3>

                <p className="mt-6 max-w-[520px] text-[17px] leading-[1.85] text-[#2D3C68]/74">
                  {person.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyGuestsReturn() {
  /**
   * HARD CONSTRAINTS FOLLOWED
   * - No top header
   * - No intro text
   * - No re-adding removed opener
   * - Keep user's structure
   * - Only refine existing parts
   * - Carousel + proof strip only
   */

  const testimonials = [
    {
      quote:
        "We booked for Komodo, but what we still talk about is how the whole week felt.",
      guest: "Returning Couple",
      meta: "4 Nights",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1777221118/ChatGPT_Image_Apr_26_2026_11_31_27_PM_1_fd8cat.png",
    },
    {
      quote:
        "The yacht was beautiful, but the calm onboard stayed with us longer than the photos.",
      guest: "Family of Five",
      meta: "5 Nights",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1777222647/ChatGPT_Image_Apr_26_2026_11_55_42_PM_2_oyj4jw.png",
    },
    {
      quote:
        "We thought we'd remember the islands most. We remember the mornings at anchor.",
      guest: "Private Group",
      meta: "3 Nights",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1777225111/ChatGPT_Image_Apr_27_2026_12_35_42_AM_1_pzm9cu.png",
    },
  ];

  const proof = [
    {
      title: "Return",
      body: "Families often come back later with friends or relatives.",
    },
    {
      title: "Referred",
      body: "Many first charters begin through past guests.",
    },
    {
      title: "Remembered",
      body: "Guests often mention the feeling as much as the route.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F8F8F5] py-28 md:py-36">
      {/* atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(176,141,87,0.05),transparent_24%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_78%,rgba(45,60,104,0.03),transparent_24%)]" />

      <div className="relative z-10 mx-auto max-w-[1380px] px-6 md:px-10 lg:px-16">
        {/* ===================================================== */}
        {/* CAROUSEL ONLY */}
        {/* ===================================================== */}
        <div className="overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex snap-x snap-mandatory gap-5 md:gap-6">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="min-w-[92%] snap-start md:min-w-[640px] lg:min-w-[760px]"
              >
                <div className="overflow-hidden rounded-[24px] border border-[#2D3C68]/8 bg-white/92 shadow-[0_20px_60px_rgba(20,20,20,0.05)]">
                  {/* image */}
                  <div className="relative h-[260px] md:h-[340px]">
                    <img
                      src={item.image}
                      alt={item.guest}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                  </div>

                  {/* content */}
                  <div className="p-7 md:p-10">
                    <p className="font-[Gambarino] text-[28px] leading-[1.14] tracking-[-0.02em] text-[#2D3C68] md:text-[40px]">
                      “{item.quote}”
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.28em] text-[#8B6A4F]">
                      <span>{item.guest}</span>

                      <span className="h-[3px] w-[3px] rounded-full bg-[#8B6A4F]/55" />

                      <span>{item.meta}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================== */}
        {/* LOWER PROOF STRIP */}
        {/* ===================================================== */}
        <div className="mt-14 grid grid-cols-1 gap-y-8 border-t border-[#2D3C68]/10 pt-10 md:grid-cols-3 md:gap-x-12">
          {proof.map((item, index) => (
            <div key={index}>
              <p className="font-[Gambarino] text-[32px] leading-none text-[#2D3C68] md:text-[36px]">
                {item.title}
              </p>

              <p className="mt-3 text-[15px] leading-[1.85] text-[#2D3C68]/68">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanYourJourney() {
  /**
   * RESET PRINCIPLE
   * Closing section should feel calm and decisive.
   *
   * One focal point.
   * One primary CTA.
   * One support line.
   *
   * No competing grids.
   * No numbered steps.
   * No dual CTA.
   * No attention chaos.
   */

  return (
    <section className="relative overflow-hidden bg-[#EEF0EB] py-32 md:py-40">
      {/* atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(176,141,87,0.06),transparent_26%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_76%,rgba(45,60,104,0.04),transparent_26%)]" />

      <div className="relative z-10 mx-auto max-w-[980px] px-6 text-center md:px-10 lg:px-16">
        {/* quiet label */}
        <p className="text-[11px] uppercase tracking-[0.34em] text-[#8B6A4F]">
          Begin When Ready
        </p>

        {/* single focal point */}
        <h2 className="mt-8 font-[Gambarino] text-[44px] leading-[1] tracking-[-0.03em] text-[#2D3C68] sm:text-[58px] md:text-[82px]">
          Your journey can
          <br />
          begin with a
          <br />
          simple message.
        </h2>

        {/* support */}
        <p className="mx-auto mt-8 max-w-[620px] text-[15px] leading-[1.95] text-[#2D3C68]/68 md:text-[16px]">
          Tell us your dates, your group, or simply where you are in the
          planning process. We’ll guide the next step from there.
        </p>

        {/* one CTA */}
        <div className="mt-10">
          <TransitionLink
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[#2D3C68] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.24em] text-white transition duration-300 hover:bg-[#223054]"
          >
            Enquire Availability
          </TransitionLink>
        </div>

        {/* quiet trust line */}
        <p className="mt-8 text-[13px] leading-[1.8] text-[#2D3C68]/58">
          Private charters only • Personal replies typically within 24 hours
        </p>
      </div>
    </section>
  );
}



function ThePeople() {
  return (
    <section className="relative w-full bg-[#F4F5F2] py-[220px] px-6 overflow-hidden">

      <div className="max-w-[1200px] mx-auto">

        {/* ================= HEADER ================= */}
        <div className="max-w-[520px] mb-20">
          <p className="text-[11px] tracking-[0.35em] text-[#6A6A6A] uppercase">
            The People
          </p>

          <h2 className="mt-6 font-[Gambarino] text-[44px] md:text-[60px] leading-[1.05] text-[#2D3C68]">
            Always there,
            <br />
            never in the way
          </h2>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid md:grid-cols-2 gap-24 items-start">

          {/* ================= LEFT (MAIN IMAGE) ================= */}
          <div className="relative w-full">

            <div className="relative w-[85%] aspect-[4/5] overflow-hidden">

              <img
                src="https://images.unsplash.com/photo-1559628233-100c798642d4?q=80&w=1600&auto=format&fit=crop"
                alt="Crew serving food"
                className="w-full h-full object-cover scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#2D3C68]/20 to-transparent" />
            </div>

            {/* SECOND IMAGE (OFFSET TOP) */}
            <div className="absolute -top-10 right-0 w-[40%] aspect-[3/4] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]">

              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
                alt="Chef preparing meal"
                className="w-full h-full object-cover"
              />

            </div>

          </div>

          {/* ================= RIGHT (CONTENT + IMAGE) ================= */}
          <div className="max-w-[480px] md:ml-auto">

            {/* TEXT */}
            <div className="space-y-6 text-[16px] text-[#2A2A2A] leading-[1.7]">

              <p>
                A full crew is on board throughout the journey, handling navigation, meals, and everything in between.
              </p>

              <p>
                The captain manages the route and conditions, adjusting plans as needed without disrupting the flow.
              </p>

              <p>
                Meals are prepared fresh during the day, while the rest of the team keeps the space clean, ready, and running.
              </p>

            </div>

            {/* THIRD IMAGE (LOWER DETAIL) */}
            <div className="mt-16 w-[70%] aspect-[4/5] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]">

              <img
                src="https://images.unsplash.com/photo-1529692236671-f1dc5c4d1d53?q=80&w=1200&auto=format&fit=crop"
                alt="Crew assisting guest"
                className="w-full h-full object-cover"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}


 

function PhinisiSection() {
  return (
    <section className="relative w-full bg-[#F4F5F2] py-[220px] px-6 overflow-hidden">

      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-24 items-center">

        {/* ================= LEFT (CONTENT) ================= */}
        <div className="max-w-[520px]">

          {/* MICRO */}
          <p className="text-[11px] tracking-[0.35em] text-[#6A6A6A] uppercase">
            Phinisi
          </p>

          {/* HEADLINE */}
          <h2 className="mt-6 font-[Gambarino] text-[44px] md:text-[60px] leading-[1.05] text-[#2D3C68]">
            Not built like a modern yacht
          </h2>

          {/* CORE */}
          <p className="mt-8 text-[18px] text-[#1A1A1A] leading-[1.7]">
            Wood, open space, and constant exposure to air, light, and movement.
          </p>

          {/* DATA */}
          <div className="mt-10 space-y-6 text-[16px] text-[#2A2A2A]">

            <p>
              You’re not inside sealed rooms — most of the day happens out on deck, with nothing separating you from the surroundings.
            </p>

            <p>
              The structure moves with the water, not against it, making the entire space feel alive rather than fixed.
            </p>

            <p>
              Everything is arranged horizontally, so movement across the boat feels natural, without levels cutting the flow.
            </p>

          </div>

        </div>

        {/* ================= RIGHT (VISUAL SYSTEM) ================= */}
        <div className="relative w-full h-full">

          {/* MAIN IMAGE */}
          <div className="relative w-[85%] aspect-[4/5] overflow-hidden ml-auto">

            <img
              src="https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1600&auto=format&fit=crop"
              alt="People relaxing on phinisi deck"
              className="w-full h-full object-cover scale-[1.04]"
            />

            {/* DEPTH */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D3C68]/25 to-transparent" />
          </div>

          {/* SECONDARY IMAGE (OFFSET) */}
          <div className="absolute -left-6 bottom-[-40px] w-[45%] aspect-[3/4] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]">

            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
              alt="Phinisi wood detail"
              className="w-full h-full object-cover"
            />

          </div>

        </div>

      </div>

    </section>
  )
}


 
function ExperienceSummary() {
  return (
    <section className="relative w-full bg-[#F4F5F2] py-[180px] overflow-hidden">

      <div className="max-w-[1400px] mx-auto px-6">

        {/* ================= IMAGE ================= */}
        <div className="relative w-full aspect-[16/9] overflow-hidden">

          <img
            src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2000&auto=format&fit=crop"
            alt="Ocean lifestyle on yacht"
            className="w-full h-full object-cover scale-[1.03]"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D3C68]/70 via-[#2D3C68]/30 to-transparent" />

          {/* TEXT ON IMAGE */}
          <div className="absolute bottom-0 left-0 p-10 md:p-16 max-w-[600px]">

            <p className="text-[11px] tracking-[0.35em] text-white/60 uppercase">
              On Board
            </p>

            <h2 className="mt-4 font-[Gambarino] text-[36px] md:text-[56px] leading-[1.1] text-white">
              This is how it actually feels
            </h2>

          </div>

        </div>

        {/* ================= ACTION STRIP ================= */}
        <div className="mt-20 flex flex-col items-center text-center">

          <p className="text-[18px] text-[#2D3C68] font-[Gambarino]">
            Start planning your time on board
          </p>

          <button className="mt-6 text-[13px] tracking-[0.18em] uppercase text-[#2D3C68]/80 border-b border-[#2D3C68]/40 hover:border-[#2D3C68] hover:text-[#2D3C68] transition">
            Explore Options →
          </button>

        </div>

      </div>

    </section>
  )
}

function FinalCTA() {
  return (
    <section className="relative w-full bg-[#F4F5F2] py-[260px] px-6 overflow-hidden">

      <div className="max-w-[900px] mx-auto text-center">

        {/* ================= HEADLINE ================= */}
        <h2 className="font-[Gambarino] text-[42px] md:text-[64px] leading-[1.05] tracking-[-0.02em] text-[#2D3C68]">
          Plan your time on board
        </h2>

        {/* ================= SUBTEXT (OPTIONAL, LIGHT) ================= */}
        <p className="mt-6 text-[16px] text-[#5C5C5C] leading-[1.7] max-w-[520px] mx-auto">
          Share your dates, route, and preferences — we’ll shape the journey around you.
        </p>

        {/* ================= CTA ================= */}
        <div className="mt-12 flex justify-center">
          <button className="px-10 py-4 rounded-full border border-[#2D3C68]/60 text-[13px] tracking-[0.18em] uppercase text-[#2D3C68] transition hover:bg-[#2D3C68] hover:text-[#F4F5F2]">
            Request Your Journey
          </button>
        </div>

      </div>

    </section>
  )
}
