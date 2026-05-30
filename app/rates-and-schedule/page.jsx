"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "../../lib/gsap"
import Image from "next/image";
import { motion, AnimatePresence,useInView, useReducedMotion } from "framer-motion";
import { usePageTransition } from "@/components/PageTransitionProvider";
import TransitionLink from "@/components/TransitionLink";
import { SITE_CONTACT } from "@/lib/siteConfig";


import Footer from '../../components/Footer'


export default function Page() {
  return (
    <main className="bg-[#0a0f14] text-white overflow-hidden">
       <Hero/> 
       <WhatsIncluded/>
       <Rate/>
       {/* <SailingCalendar/> */}
       <HowItWorks/>
       {/* <RateOverview/> */}
       {/* <IncludedSection/> */}
       {/* <PricingDetails/>   */}
       {/* <SampleJourney/> */}
       {/* <CharterRates/> */}
       {/* <Schedule/> */}
       {/* <InclusionsExclusions/> */}
       {/* <FinalCTA/> */}
      <Footer/> 
    </main>
  )
}


function Hero() {
  const pathRefD    = useRef(null)
  const pathRefM    = useRef(null)
  const labelRef    = useRef(null)
  const headlineRef = useRef(null)
  const subcopyRef  = useRef(null)
  const ctaRef      = useRef(null)
  const rightRef    = useRef(null)
  const scrollRef   = useRef(null)
  const { stage } = usePageTransition();
  const hasPlayedEntranceRef = useRef(false);
  const entranceTlRef = useRef(null);

  useEffect(() => {
    return () => {
      entranceTlRef.current?.kill();
      entranceTlRef.current = null;
    };
  }, []);
 
  useEffect(() => {
 
    // --- Route line draw — RAF ---
    function setupLine(path, speed) {
      if (!path) return
      const length = path.getTotalLength()
      path.style.strokeDasharray = length
      path.style.strokeDashoffset = length
      let progress = 0
      function tick() {
        progress += speed
        path.style.strokeDashoffset = length * (1 - progress)
        if (progress < 1) requestAnimationFrame(tick)
      }
      tick()
    }
 
    setupLine(pathRefD.current, 0.0016);
    setupLine(pathRefM.current, 0.003);

    // --- Entrance ---
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (stage === "covering") {
      entranceTlRef.current?.kill();
      entranceTlRef.current = null;
      const routePaths = [pathRefD.current, pathRefM.current];
      routePaths.forEach((path) => {
        if (!path) return;
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
      });

      gsap.set(labelRef.current, { opacity: 0, y: 16, filter: 'blur(6px)' });
      gsap.set(headlineRef.current, { opacity: 0, y: 24, filter: 'blur(10px)' });
      gsap.set(subcopyRef.current, { opacity: 0, y: 20, filter: 'blur(8px)' });
      gsap.set(ctaRef.current, { opacity: 0, y: 18, filter: 'blur(6px)' });
      gsap.set(rightRef.current, { opacity: 0, y: 18, filter: 'blur(6px)' });
      gsap.set(scrollRef.current, { opacity: 0, y: 14, filter: 'blur(6px)' });
      return;
    }

    if (hasPlayedEntranceRef.current) return;
    hasPlayedEntranceRef.current = true;
 
    if (reduce) {
      gsap.set(
        [labelRef.current, headlineRef.current, subcopyRef.current,
         ctaRef.current, rightRef.current, scrollRef.current],
        { opacity: 1, y: 0, filter: 'blur(0px)' }
      );
      return;
    }
 
    gsap.set(
      [labelRef.current, headlineRef.current, subcopyRef.current,
       ctaRef.current, rightRef.current, scrollRef.current],
      { opacity: 0, y: 20 }
    )
    gsap.set(headlineRef.current, { filter: 'blur(8px)', y: 48 })

    entranceTlRef.current?.kill();
    entranceTlRef.current = gsap.timeline();

    entranceTlRef.current.to(labelRef.current, {
      opacity: 1, y: 0,
      filter: 'blur(0px)',
      duration: 0.9, delay: 0.1,
      ease: [0.22, 1, 0.36, 1],
    })
    entranceTlRef.current.to(headlineRef.current, {
      opacity: 1, y: 0, filter: 'blur(0px)',
      duration: 1.4, delay: 0.2,
      ease: [0.22, 1, 0.36, 1],
    }, 0)
    entranceTlRef.current.to(subcopyRef.current, {
      opacity: 1, y: 0,
      filter: 'blur(0px)',
      duration: 1.1, delay: 0.38,
      ease: [0.22, 1, 0.36, 1],
    }, 0)
    entranceTlRef.current.to(ctaRef.current, {
      opacity: 1, y: 0,
      filter: 'blur(0px)',
      duration: 1.0, delay: 0.52,
      ease: [0.22, 1, 0.36, 1],
    }, 0)
    entranceTlRef.current.to(rightRef.current, {
      opacity: 1, y: 0,
      filter: 'blur(0px)',
      duration: 1.1, delay: 0.48,
      ease: [0.22, 1, 0.36, 1],
    }, 0)
    entranceTlRef.current.to(scrollRef.current, {
      opacity: 1, y: 0,
      filter: 'blur(0px)',
      duration: 1.0, delay: 1.4,
      ease: [0.22, 1, 0.36, 1],
    }, 0)

    entranceTlRef.current.eventCallback("onComplete", () => {
      gsap.set(
        [
          labelRef.current,
          headlineRef.current,
          subcopyRef.current,
          ctaRef.current,
          rightRef.current,
          scrollRef.current,
        ].filter(Boolean),
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }
      );
    });
 
  }, [stage]);
 
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#2D3C68] text-[#F4F5F2]">
 
      {/* ── Atmospheric — radials + grain only, no grid ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
 
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            left: '-10%', top: '-10%',
            width: 'clamp(400px, 45vw, 700px)',
            height: 'clamp(400px, 45vw, 700px)',
            background: 'rgba(244,245,242,0.04)',
          }}
        />
 
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            right: '-10%', bottom: '-20%',
            width: 'clamp(320px, 38vw, 600px)',
            height: 'clamp(320px, 38vw, 600px)',
            background: 'rgba(176,141,87,0.08)',
          }}
        />
 
        {/* Grain */}
        <div
          className="absolute inset-0 mix-blend-soft-light"
          style={{
            opacity: 0.025,
            backgroundImage: 'radial-gradient(circle at center, black 1px, transparent 1px)',
            backgroundSize: '14px 14px',
          }}
        />
 
      </div>
 
      {/* ── Route line — desktop ── */}
      <svg
        viewBox="0 0 1600 900"
        className="absolute inset-0 h-full w-full pointer-events-none hidden md:block"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="routeGradD" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#B08D57" stopOpacity="0"   />
            <stop offset="20%"  stopColor="#B08D57" stopOpacity="0.2" />
            <stop offset="50%"  stopColor="#B08D57" stopOpacity="0.9" />
            <stop offset="80%"  stopColor="#B08D57" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#B08D57" stopOpacity="0"   />
          </linearGradient>
          <filter id="glowD">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          ref={pathRefD}
          d="M-120 520 C260 380, 520 620, 920 500 S1380 360, 1740 480"
          fill="none"
          stroke="url(#routeGradD)"
          strokeWidth="1.4"
          strokeLinecap="round"
          filter="url(#glowD)"
        />
      </svg>
 
      {/* ── Route line — mobile ── */}
      <svg
        viewBox="0 0 390 844"
        className="absolute inset-0 h-full w-full pointer-events-none block md:hidden"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="routeGradM" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#B08D57" stopOpacity="0"   />
            <stop offset="35%"  stopColor="#B08D57" stopOpacity="0.8" />
            <stop offset="65%"  stopColor="#B08D57" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#B08D57" stopOpacity="0"   />
          </linearGradient>
          <filter id="glowM">
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          ref={pathRefM}
          d="M-20 560 C80 480, 160 620, 260 540 S360 420, 420 480"
          fill="none"
          stroke="url(#routeGradM)"
          strokeWidth="1.8"
          strokeLinecap="round"
          filter="url(#glowM)"
        />
      </svg>
 
      {/* ── Main layout ── */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div
          className="mx-auto w-full max-w-[1200px] px-6 md:px-10"
          style={{
            paddingTop: 'clamp(140px, 18vh, 200px)',
            paddingBottom: 'clamp(100px, 14vh, 140px)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-8 items-end gap-y-14">
 
            {/* ── LEFT ── */}
            <div className="md:col-span-7">
 
              <p
                ref={labelRef}
                className="uppercase mb-8"
                style={{
                  fontFamily: 'Switzer, sans-serif',
                  fontWeight: 300,
                  fontSize: '10px',
                  letterSpacing: '0.38em',
                  color: 'rgba(244,245,242,0.44)',
                }}
              >
                Rates & Sailing Schedule
              </p>
 
              <h1
                ref={headlineRef}
                style={{
                  fontFamily: 'Gambarino, serif',
                  fontSize: 'clamp(52px, 7vw, 84px)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.03em',
                  color: '#F4F5F2',
                }}
              >
                Journeys<br />by Season
              </h1>
 
              <p
                ref={subcopyRef}
                style={{
                  fontFamily: 'Switzer, sans-serif',
                  fontWeight: 300,
                  fontSize: '15px',
                  lineHeight: 1.78,
                  color: 'rgba(244,245,242,0.68)',
                  maxWidth: '420px',
                  marginTop: '40px',
                }}
              >
                Seasonal routes across Komodo and Raja Ampat,
                shaped around sea conditions and the rhythm
                of life on board.
              </p>
 
              {/* Single navigational CTA — not transactional */}
              <div ref={ctaRef} style={{ marginTop: '40px' }}>
                <a
                  href="#charter"
                  style={{
                    fontFamily: 'Switzer, sans-serif',
                    fontWeight: 300,
                    fontSize: '13px',
                    letterSpacing: '0.06em',
                    color: 'rgba(244,245,242,0.44)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    transition: 'color 300ms ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(244,245,242,0.86)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(244,245,242,0.44)'}
                >
                  View charter rates
                  <span style={{ color: '#B08D57' }}>↓</span>
                </a>
              </div>
 
            </div>
 
            {/* ── RIGHT — months only, no descriptions, no On Board ── */}
            <div
              ref={rightRef}
              className="md:col-span-4 md:col-start-9"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
 
                {/* Komodo */}
                <div
                  style={{
                    borderTop: '1px solid rgba(244,245,242,0.12)',
                    paddingTop: '20px',
                    paddingBottom: '28px',
                  }}
                >
                  <p
                    className="uppercase"
                    style={{
                      fontFamily: 'Switzer, sans-serif',
                      fontWeight: 300,
                      fontSize: '10px',
                      letterSpacing: '0.28em',
                      color: 'rgba(244,245,242,0.36)',
                      marginBottom: '10px',
                    }}
                  >
                    Komodo
                  </p>
                  <p
                    style={{
                      fontFamily: 'Gambarino, serif',
                      fontSize: '26px',
                      lineHeight: 1.0,
                      letterSpacing: '-0.01em',
                      color: '#F4F5F2',
                    }}
                  >
                    May — September
                  </p>
                </div>
 
                {/* Raja Ampat */}
                <div
                  style={{
                    borderTop: '1px solid rgba(244,245,242,0.12)',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                  }}
                >
                  <p
                    className="uppercase"
                    style={{
                      fontFamily: 'Switzer, sans-serif',
                      fontWeight: 300,
                      fontSize: '10px',
                      letterSpacing: '0.28em',
                      color: 'rgba(244,245,242,0.36)',
                      marginBottom: '10px',
                    }}
                  >
                    Raja Ampat
                  </p>
                  <p
                    style={{
                      fontFamily: 'Gambarino, serif',
                      fontSize: '26px',
                      lineHeight: 1.0,
                      letterSpacing: '-0.01em',
                      color: '#F4F5F2',
                    }}
                  >
                    November — April
                  </p>
                </div>
 
              </div>
            </div>
 
          </div>
        </div>
      </div>
 
      {/* ── Scroll indicator ── */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
      >
        <span
          style={{
            fontFamily: 'Switzer, sans-serif',
            fontSize: '10px',
            letterSpacing: '0.28em',
            color: 'rgba(244,245,242,0.28)',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '32px',
            background: 'rgba(244,245,242,0.1)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%',
            height: '40%',
            background: 'rgba(176,141,87,0.7)',
            animation: 'scrollDrop 1.8s ease-in-out infinite',
          }} />
        </div>
        <style>{`
          @keyframes scrollDrop {
            0%   { transform: translateY(-100%); }
            100% { transform: translateY(280%); }
          }
        `}</style>
      </div>
 
      {/* ── Exit bridge ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '80px',
          background: 'linear-gradient(to bottom, transparent, rgba(45,60,104,0.5))',
        }}
      />
 
    </section>
  )
}

function WhatsIncluded() {
 
  const included = [
    {
      label: 'Full Crew',
      desc: 'Captain, chef, dive master, and 7 supporting crew — on board throughout.',
    },
    {
      label: 'All Meals & Non-Alcoholic Beverages',
      desc: 'Three meals daily plus snacks, prepared fresh by the onboard chef.',
    },
    {
      label: 'Watersports Equipment',
      desc: 'Wakeboard, paddle boards, snorkel sets, and dive equipment included.',
    },
    {
      label: 'Fuel & Standard Cruising',
      desc: 'All fuel for the agreed route. No surcharges for standard navigation.',
    },
    {
      label: 'Park Fees & Permits',
      desc: 'Komodo National Park and Raja Ampat entry fees covered in full.',
    },
  ]
 
  const notIncluded = [
    'Flights and transfers to departure port',
    'Alcoholic beverages',
    'Tips for crew (customary, not mandatory)',
    'Personal dive equipment rental',
  ]
 
  const sectionRef  = useRef(null)
  const headlineRef = useRef(null)
  const rightRef    = useRef(null)
  const listRef     = useRef(null)
  const notIncRef   = useRef(null)
  const itemsRef    = useRef([])
 
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
 
    if (reduce) {
      gsap.set(
        [headlineRef.current, rightRef.current,
         notIncRef.current, ...itemsRef.current.filter(Boolean)],
        { opacity: 1, y: 0 }
      )
      return
    }
 
    const ctx = gsap.context(() => {
 
      // Eyebrow + headline
      gsap.set(headlineRef.current, { opacity: 0, y: 28 })
      gsap.to(headlineRef.current, {
        opacity: 1, y: 0,
        duration: 1.0,
        ease: [0.22, 1, 0.36, 1],
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
 
      // Right column
      gsap.set(rightRef.current, { opacity: 0, y: 32 })
      gsap.to(rightRef.current, {
        opacity: 1, y: 0,
        duration: 1.1,
        delay: 0.12,
        ease: [0.22, 1, 0.36, 1],
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
 
      // List items stagger
      const items = itemsRef.current.filter(Boolean)
      gsap.set(items, { opacity: 0, y: 16 })
      gsap.to(items, {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        stagger: 0.07,
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 85%',
        },
      })
 
      // Not included
      gsap.set(notIncRef.current, { opacity: 0, y: 16 })
      gsap.to(notIncRef.current, {
        opacity: 1, y: 0,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        scrollTrigger: {
          trigger: notIncRef.current,
          start: 'top 88%',
        },
      })
 
    }, sectionRef)
 
    return () => ctx.revert()
  }, [])
 
  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ backgroundColor: '#F4F5F2' }}
    >
 
      {/* ── Atmospheric bridge ── */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '100px',
          background: 'linear-gradient(to bottom, rgba(45,60,104,0.07) 0%, transparent 100%)',
        }}
      />
 
      <div
        className="relative max-w-[1200px] mx-auto px-6 md:px-10"
        style={{
          paddingTop: 'clamp(88px, 11vh, 128px)',
          paddingBottom: 'clamp(80px, 10vh, 112px)',
        }}
      >
 
        {/* ── Main grid ── */}
        <div className="md:grid md:grid-cols-12 md:gap-8 md:items-start">
 
          {/* LEFT — eyebrow + headline + list */}
          <div className="md:col-span-6">
 
            <div ref={headlineRef}>
              <p
                className="uppercase mb-5"
                style={{
                  fontFamily: 'Switzer, sans-serif',
                  fontWeight: 300,
                  fontSize: '10px',
                  letterSpacing: '0.34em',
                  color: 'rgba(45,60,104,0.40)',
                }}
              >
                What's Included
              </p>
 
              <h2
                style={{
                  fontFamily: 'Gambarino, serif',
                  fontSize: 'clamp(40px, 5vw, 64px)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.03em',
                  color: '#2D3C68',
                  marginBottom: 'clamp(16px, 2.5vh, 24px)',
                }}
              >
                One price.<br />Everything<br />arranged.
              </h2>
            </div>
 
            {/* Included list */}
            <div
              ref={listRef}
              style={{ borderTop: '1px solid rgba(45,60,104,0.08)' }}
            >
              {included.map((item, i) => (
                <div
                  key={item.label}
                  ref={el => itemsRef.current[i] = el}
                  className="flex gap-5 items-start"
                  style={{
                    padding: '24px 0',
                    borderBottom: '1px solid rgba(45,60,104,0.08)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Switzer, sans-serif',
                      fontSize: '11px',
                      letterSpacing: '0.14em',
                      color: 'rgba(176,141,87,0.70)',
                      marginTop: '3px',
                      flexShrink: 0,
                      width: '20px',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
 
                  <div>
                    <p
                      style={{
                        fontFamily: 'Switzer, sans-serif',
                        fontWeight: 500,
                        fontSize: '14px',
                        letterSpacing: '-0.01em',
                        color: '#2D3C68',
                        marginBottom: '4px',
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontFamily: 'Switzer, sans-serif',
                        fontWeight: 300,
                        fontSize: '13px',
                        lineHeight: 1.7,
                        color: 'rgba(45,60,104,0.55)',
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
 
          </div>
 
          {/* RIGHT — paragraph + image */}
          <div
            ref={rightRef}
            className="md:col-span-5 md:col-start-8 mt-14 md:mt-0"
          >
            <p
              style={{
                fontFamily: 'Switzer, sans-serif',
                fontWeight: 300,
                fontSize: '15px',
                lineHeight: 1.85,
                color: 'rgba(45,60,104,0.62)',
                maxWidth: '380px',
                marginBottom: 'clamp(32px, 4vh, 48px)',
              }}
            >
              The charter rate covers everything on board. No itemised bills,
              no surprises at the end of the week. Arrive and let the crew
              handle the rest.
            </p>
 
            <div className="relative">
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: '4 / 5' }}
              >
                <Image
                  src="https://res.cloudinary.com/dombq6plz/image/upload/v1778534687/ChatGPT_Image_May_12_2026_04_07_19_AM_lu1htz.png"
                  alt="Guests on Serenity's deck"
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'rgba(45,60,104,0.06)' }}
                />
              </div>
 
              {/* Caption chip */}
              <div
                className="absolute"
                style={{
                  bottom: '-20px',
                  left: '-20px',
                  background: '#2D3C68',
                  padding: '12px 20px',
                }}
              >
                <p
                  className="uppercase"
                  style={{
                    fontFamily: 'Switzer, sans-serif',
                    fontWeight: 300,
                    fontSize: '10px',
                    letterSpacing: '0.22em',
                    color: 'rgba(244,245,242,0.50)',
                    marginBottom: '2px',
                  }}
                >
                  On Board
                </p>
                <p
                  style={{
                    fontFamily: 'Switzer, sans-serif',
                    fontSize: '13px',
                    letterSpacing: '0.04em',
                    color: '#F4F5F2',
                  }}
                >
                  Chef · Crew · Everything
                </p>
              </div>
            </div>
          </div>
 
        </div>
 
        {/* ── Not Included — full-width row below grid ── */}
        <div
          ref={notIncRef}
          style={{
            marginTop: 'clamp(64px, 8vh, 96px)',
            paddingTop: '32px',
            borderTop: '1px solid rgba(45,60,104,0.08)',
          }}
        >
          <div className="md:grid md:grid-cols-12 md:gap-8 md:items-start">
 
            {/* Label */}
            <div className="md:col-span-2">
              <p
                className="uppercase mb-6 md:mb-0"
                style={{
                  fontFamily: 'Switzer, sans-serif',
                  fontWeight: 300,
                  fontSize: '10px',
                  letterSpacing: '0.28em',
                  color: 'rgba(45,60,104,0.35)',
                  paddingTop: '2px',
                }}
              >
                Not Included
              </p>
            </div>
 
            {/* Items — horizontal on desktop */}
            <div
              className="md:col-span-9 md:col-start-4"
            >
              <ul className="flex flex-col md:flex-row md:flex-wrap md:gap-x-12 gap-y-3">
                {notIncluded.map(item => (
                  <li
                    key={item}
                    className="flex items-start gap-3"
                    style={{
                      fontFamily: 'Switzer, sans-serif',
                      fontWeight: 300,
                      fontSize: '13px',
                      lineHeight: 1.6,
                      color: 'rgba(45,60,104,0.42)',
                    }}
                  >
                    <span
                      style={{
                        marginTop: '8px',
                        width: '3px',
                        height: '3px',
                        borderRadius: '50%',
                        background: 'rgba(45,60,104,0.25)',
                        flexShrink: 0,
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
 
          </div>
        </div>
 
      </div>
 
      {/* ── Exit bridge ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '80px',
          background: 'linear-gradient(to bottom, transparent, rgba(45,60,104,0.04))',
        }}
      />
 
    </section>
  )
}

function Rate() {
 
  const rates = [
    {
      destination: 'Labuan Bajo',
      season: 'May — September',
      price: '$9,500',
    },
    {
      destination: 'Raja Ampat',
      season: 'November — April',
      price: '$10,500',
    },
  ]
 
  const notes = [
    'Minimum 5 nights',
    'Rates quoted in USD',
    'Custom durations available on inquiry',
  ]
 
  const sectionRef  = useRef(null)
  const headerRef   = useRef(null)
  const rulesRef    = useRef([])
  const rowsRef     = useRef([])
  const ctaRef      = useRef(null)
 
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
 
    if (reduce) {
      gsap.set(
        [headerRef.current, ctaRef.current, ...rowsRef.current.filter(Boolean)],
        { opacity: 1, y: 0 }
      )
      gsap.set(rulesRef.current.filter(Boolean), { scaleX: 1 })
      return
    }
 
    const ctx = gsap.context(() => {
 
      // Header
      gsap.set(headerRef.current, { opacity: 0, y: 24 })
      gsap.to(headerRef.current, {
        opacity: 1, y: 0,
        duration: 1.0,
        ease: [0.22, 1, 0.36, 1],
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
      })
 
      // Rules + rows — sequential reveal
      const rules = rulesRef.current.filter(Boolean)
      const rows  = rowsRef.current.filter(Boolean)
 
      gsap.set(rules, { scaleX: 0, transformOrigin: 'left center' })
      gsap.set(rows,  { opacity: 0, y: 14 })
 
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
      })
 
      tl
        .to(rules[0], { scaleX: 1, duration: 0.7, ease: 'power2.out' })
        .to(rows[0],  { opacity: 1, y: 0, duration: 0.75, ease: [0.22, 1, 0.36, 1] }, '-=0.25')
        .to(rules[1], { scaleX: 1, duration: 0.7, ease: 'power2.out' }, '-=0.15')
        .to(rows[1],  { opacity: 1, y: 0, duration: 0.75, ease: [0.22, 1, 0.36, 1] }, '-=0.25')
        .to(rules[2], { scaleX: 1, duration: 0.7, ease: 'power2.out' }, '-=0.15')
 
      // CTA
      gsap.set(ctaRef.current, { opacity: 0, y: 20 })
      gsap.to(ctaRef.current, {
        opacity: 1, y: 0,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 88%',
        },
      })
 
    }, sectionRef)
 
    return () => ctx.revert()
  }, [])
 
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: '#2D3C68' }}
    >
 
      {/* ── Atmospheric bridge — sail-white memory dissolving in ── */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '90px',
          background: 'linear-gradient(to bottom, rgba(244,245,242,0.05) 0%, transparent 100%)',
        }}
      />
 
      {/* ── Atmospheric layer ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 35% 45%, rgba(255,255,255,0.03), transparent 55%)',
        }}
      />
 
      <div
        className="relative max-w-[1200px] mx-auto px-6 md:px-10"
        style={{
          paddingTop: 'clamp(88px, 11vh, 120px)',
          paddingBottom: 'clamp(88px, 11vh, 120px)',
        }}
      >
 
        {/* ── Header ── */}
        <div
          ref={headerRef}
          style={{ marginBottom: 'clamp(48px, 7vh, 72px)' }}
        >
          <p
            className="uppercase mb-5"
            style={{
              fontFamily: 'Switzer, sans-serif',
              fontWeight: 300,
              fontSize: '10px',
              letterSpacing: '0.34em',
              color: 'rgba(244,245,242,0.38)',
            }}
          >
            Charter Rates
          </p>
 
          <p
            style={{
              fontFamily: 'Switzer, sans-serif',
              fontWeight: 300,
              fontSize: '15px',
              lineHeight: 1.8,
              color: 'rgba(244,245,242,0.58)',
              maxWidth: '400px',
            }}
          >
            Exclusive full vessel charter. Rates vary
            by destination and season.
          </p>
        </div>
 
        {/* ── Rate rows ── */}
        <div>
          {rates.map((rate, i) => (
            <div key={rate.destination}>
 
              {/* Rule */}
              <div
                ref={el => rulesRef.current[i] = el}
                style={{
                  height: '1px',
                  background: 'rgba(244,245,242,0.14)',
                  width: '100%',
                }}
              />
 
              {/* Row */}
              <div
                ref={el => rowsRef.current[i] = el}
                className="flex items-center justify-between"
                style={{ padding: 'clamp(22px, 3.2vh, 34px) 0' }}
              >
 
                {/* Left — destination + season */}
                <div>
                  <p
                    style={{
                      fontFamily: 'Gambarino, serif',
                      fontSize: 'clamp(34px, 4vw, 52px)',
                      lineHeight: 0.95,
                      letterSpacing: '-0.02em',
                      color: '#F4F5F2',
                      marginBottom: '9px',
                    }}
                  >
                    {rate.destination}
                  </p>
                  <p
                    className="uppercase"
                    style={{
                      fontFamily: 'Switzer, sans-serif',
                      fontWeight: 300,
                      fontSize: '11px',
                      letterSpacing: '0.24em',
                      color: 'rgba(244,245,242,0.38)',
                    }}
                  >
                    {rate.season}
                  </p>
                </div>
 
                {/* Right — price */}
                <div style={{ textAlign: 'right' }}>
                  <p
                    style={{
                      fontFamily: 'Gambarino, serif',
                      fontSize: 'clamp(34px, 4vw, 52px)',
                      lineHeight: 0.95,
                      letterSpacing: '-0.02em',
                      color: '#F4F5F2',
                      marginBottom: '9px',
                    }}
                  >
                    {rate.price}
                  </p>
                  <p
                    className="uppercase"
                    style={{
                      fontFamily: 'Switzer, sans-serif',
                      fontWeight: 300,
                      fontSize: '11px',
                      letterSpacing: '0.24em',
                      color: 'rgba(244,245,242,0.38)',
                    }}
                  >
                    per night · USD
                  </p>
                </div>
 
              </div>
            </div>
          ))}
 
          {/* Bottom rule */}
          <div
            ref={el => rulesRef.current[2] = el}
            style={{
              height: '1px',
              background: 'rgba(244,245,242,0.14)',
              width: '100%',
            }}
          />
        </div>
 
        {/* ── CTA + Notes ── */}
        <div
          ref={ctaRef}
          className="flex flex-col md:flex-row md:items-center md:justify-between"
          style={{
            marginTop: 'clamp(44px, 6vh, 64px)',
            gap: '32px',
          }}
        >
 
          {/* Notes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {notes.map(note => (
              <div key={note} className="flex items-center gap-3">
                <span
                  style={{
                    width: '3px',
                    height: '3px',
                    borderRadius: '50%',
                    background: 'rgba(244,245,242,0.22)',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'Switzer, sans-serif',
                    fontWeight: 300,
                    fontSize: '13px',
                    color: 'rgba(244,245,242,0.36)',
                  }}
                >
                  {note}
                </span>
              </div>
            ))}
          </div>
 
          {/* CTA */}
          <div
            className="flex flex-col items-start md:items-end"
            style={{ gap: '10px', flexShrink: 0 }}
          >
            <TransitionLink
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#F4F5F2',
                color: '#2D3C68',
                fontFamily: 'Switzer, sans-serif',
                fontWeight: 400,
                fontSize: '13px',
                letterSpacing: '0.04em',
                padding: '14px 36px',
                borderRadius: '9999px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'background 500ms ease, transform 500ms ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#E8E9E6'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#F4F5F2'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Begin Your Voyage
            </TransitionLink>
            <span
              style={{
                fontFamily: 'Switzer, sans-serif',
                fontWeight: 300,
                fontSize: '12px',
                color: 'rgba(244,245,242,0.30)',
              }}
            >
              Response within 24 hours
            </span>
          </div>
 
        </div>
 
      </div>
 
      {/* ── Sumba Ikat — titik di halaman ini ── */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none overflow-hidden"
        style={{ width: '220px', height: '220px' }}
      >
        <img
          src="https://res.cloudinary.com/dombq6plz/image/upload/v1778486588/ChatGPT_Image_May_11_2026_03_01_56_PM_1_v2exmt.png"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: 0.05,
            animation: 'ikatRotate 120s linear infinite',
          }}
        />
      </div>
 
      <style>{`
        @keyframes ikatRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
 
      {/* ── Exit bridge — carries darkness into Destinations ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '80px',
          background: 'linear-gradient(to bottom, transparent, rgba(45,60,104,0.5))',
        }}
      />
 
    </section>
  )
}


function MonthCard({ item, index }) {
  const destinationStyles = {
    komodo: {
      dot: "bg-[#2D3C68]",
      text: "text-[#2D3C68]",
      label: "Komodo",
    },
    ampat: {
      dot: "bg-[#B08D57]",
      text: "text-[#B08D57]",
      label: "Raja Ampat",
    },
    transition: {
      dot: "bg-[#2D3C68]/26",
      text: "text-[#2D3C68]/42",
      label: "Transition",
    },
  };

  const slotStyles = {
    available: {
      wrap: "bg-[#2D3C68]/7 hover:bg-[#2D3C68]/11",
      bar: "bg-[#2D3C68]/38",
      text: "text-[#2D3C68]/58",
      label: "Available",
    },
    limited: {
      wrap: "bg-[#B08D57]/10 hover:bg-[#B08D57]/15",
      bar: "bg-[#B08D57]/72",
      text: "text-[#B08D57]/78",
      label: "Limited",
    },
    booked: {
      wrap: "bg-[#2D3C68]/4",
      bar: "bg-[#2D3C68]/14",
      text: "text-[#2D3C68]/28",
      label: "Booked",
    },
  };

  const destination = destinationStyles[item.destinationColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        duration: 0.85,
        delay: (index % 4) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="border-t border-[#2D3C68]/10 pt-5"
    >

      {/* HEADER */}
      <div className="mb-5 flex items-start justify-between">

        <div>
          <div className="font-[Gambarino] text-[22px] leading-none tracking-[-0.03em] text-[#2D3C68]">
            {item.short}
          </div>

          <div className="mt-1 text-[10px] tracking-[0.16em] text-[#2D3C68]/28">
            {item.year}
          </div>
        </div>

        <div className="mt-[2px] flex items-center gap-1.5">

          <span
            className={`h-[5px] w-[5px] rounded-full shrink-0 ${destination.dot}`}
          />

          <span
            className={`text-[10px] tracking-[0.14em] ${destination.text}`}
          >
            {destination.label}
          </span>

        </div>

      </div>

      {/* WEEK STRIPS */}
      <div className="space-y-[6px]">

        {item.weeks.map((status, wi) => {
          const style = slotStyles[status];
          const isBooked = status === "booked";

          return (
            <div
              key={wi}
              className={`
                flex items-center gap-2.5 px-3 py-2 transition-colors duration-300
                ${style.wrap}
                ${!isBooked ? "cursor-pointer" : "cursor-default"}
              `}
            >

              <div className={`h-[2px] w-5 shrink-0 ${style.bar}`} />

              <span
                className={`flex-1 text-[10px] tracking-[0.1em] ${style.text}`}
              >
                Week {wi + 1}
              </span>

              <span
                className={`text-[10px] uppercase tracking-[0.12em] ${style.text}`}
              >
                {style.label}
              </span>

            </div>
          );
        })}

      </div>

    </motion.div>
  );
}

function SailingCalendar() {
  const calendar = [
    {
      month: "January",
      short: "Jan",
      year: 2026,
      destinationColor: "ampat",
      weeks: ["available", "available", "limited", "available"],
    },
    {
      month: "February",
      short: "Feb",
      year: 2026,
      destinationColor: "ampat",
      weeks: ["limited", "booked", "booked", "limited"],
    },
    {
      month: "March",
      short: "Mar",
      year: 2026,
      destinationColor: "ampat",
      weeks: ["available", "available", "available", "limited"],
    },
    {
      month: "April",
      short: "Apr",
      year: 2026,
      destinationColor: "transition",
      weeks: ["available", "limited", "available", "available"],
    },
    {
      month: "May",
      short: "May",
      year: 2026,
      destinationColor: "komodo",
      weeks: ["booked", "booked", "limited", "available"],
    },
    {
      month: "June",
      short: "Jun",
      year: 2026,
      destinationColor: "komodo",
      weeks: ["booked", "booked", "booked", "limited"],
    },
    {
      month: "July",
      short: "Jul",
      year: 2026,
      destinationColor: "komodo",
      weeks: ["booked", "booked", "booked", "booked"],
    },
    {
      month: "August",
      short: "Aug",
      year: 2026,
      destinationColor: "komodo",
      weeks: ["booked", "booked", "limited", "booked"],
    },
    {
      month: "September",
      short: "Sep",
      year: 2026,
      destinationColor: "komodo",
      weeks: ["limited", "available", "available", "available"],
    },
    {
      month: "October",
      short: "Oct",
      year: 2026,
      destinationColor: "ampat",
      weeks: ["available", "available", "limited", "limited"],
    },
    {
      month: "November",
      short: "Nov",
      year: 2026,
      destinationColor: "ampat",
      weeks: ["limited", "booked", "available", "available"],
    },
    {
      month: "December",
      short: "Dec",
      year: 2026,
      destinationColor: "ampat",
      weeks: ["available", "limited", "booked", "booked"],
    },
  ];

  const totalBooked = calendar.reduce(
    (acc, month) =>
      acc + month.weeks.filter((week) => week === "booked").length,
    0
  );

  const totalSlots = calendar.reduce(
    (acc, month) => acc + month.weeks.length,
    0
  );

  const percentBooked = Math.round(
    (totalBooked / totalSlots) * 100
  );

  return (
    <section
      id="schedule"
      className="relative overflow-hidden bg-[#F4F5F2]"
    >

      {/* TOP BORDER */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2D3C68]/10 to-transparent" />

      {/* ATMOSPHERE */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute right-[-10%] top-[0%] h-[520px] w-[520px] rounded-full bg-[#2D3C68]/[0.03] blur-3xl" />

        <div className="absolute left-[-15%] bottom-[-10%] h-[620px] w-[620px] rounded-full bg-[#B08D57]/[0.05] blur-3xl" />

        <div
          className="absolute inset-0 hidden md:block opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(45,60,104,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(45,60,104,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />

      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-[100px] md:px-10 md:py-[120px]">

        {/* HEADER */}
        <div className="mb-14 md:mb-18 md:grid md:grid-cols-12 md:items-end md:gap-8">

          {/* LEFT */}
          <div className="md:col-span-5">

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-5 text-[10px] md:text-[11px] tracking-[0.34em] uppercase text-[#2D3C68]/40"
            >
              Sailing Calendar
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                font-[Gambarino]
                text-[42px]
                md:text-[56px]
                leading-[1]
                tracking-[-0.03em]
                text-[#2D3C68]
              "
            >
              2026
              <br />
              Availability
            </motion.h2>

          </div>

          {/* RIGHT */}
          <div className="mt-8 flex flex-col gap-8 md:col-span-6 md:col-start-7 md:mt-0 md:flex-row md:items-end md:justify-between">

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.1,
                delay: 0.16,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                max-w-[360px]
                text-[14px]
                md:text-[15px]
                leading-[1.85]
                text-[#2D3C68]/58
              "
            >
              Charter windows shown by week. Route and destination are shaped
              by season — not fixed in advance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                delay: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="shrink-0 text-right"
            >

              <div className="font-[Gambarino] text-[42px] leading-none tracking-[-0.03em] text-[#2D3C68]">
                {percentBooked}%
              </div>

              <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#2D3C68]/36">
                of 2026 booked
              </div>

            </motion.div>

          </div>

        </div>

        {/* LEGEND */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-10 flex flex-wrap items-center gap-6"
        >

          {[
            {
              bar: "bg-[#2D3C68]/40",
              text: "text-[#2D3C68]/60",
              label: "Available",
            },
            {
              bar: "bg-[#B08D57]/70",
              text: "text-[#B08D57]/80",
              label: "Limited",
            },
            {
              bar: "bg-[#2D3C68]/14",
              text: "text-[#2D3C68]/28",
              label: "Booked",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2"
            >

              <div className={`h-[2px] w-4 ${item.bar}`} />

              <span
                className={`text-[10px] uppercase tracking-[0.18em] ${item.text}`}
              >
                {item.label}
              </span>

            </div>
          ))}

          <div className="ml-auto hidden items-center gap-6 md:flex">

            {[
              {
                dot: "bg-[#2D3C68]",
                text: "text-[#2D3C68]",
                label: "Komodo",
              },
              {
                dot: "bg-[#B08D57]",
                text: "text-[#B08D57]",
                label: "Raja Ampat",
              },
              {
                dot: "bg-[#2D3C68]/30",
                text: "text-[#2D3C68]/50",
                label: "Transition",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-1.5"
              >

                <span
                  className={`h-[5px] w-[5px] rounded-full ${item.dot}`}
                />

                <span
                  className={`text-[10px] tracking-[0.14em] ${item.text}`}
                >
                  {item.label}
                </span>

              </div>
            ))}

          </div>

        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-8 md:gap-y-12">

          {calendar.map((item, index) => (
            <MonthCard
              key={item.month}
              item={item}
              index={index}
            />
          ))}

        </div>

        {/* FOOTER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-16
            border-t
            border-[#2D3C68]/8
            pt-8

            md:mt-20
            md:flex
            md:items-center
            md:justify-between
            md:gap-6
          "
        >

          <p className="max-w-[460px] text-[13px] md:text-[14px] leading-[1.75] text-[#2D3C68]/46">
            Availability updates in real time. If your preferred window shows
            limited or booked, reach out — cancellations open occasionally.
          </p>

          <a
            href="#inquiry"
            className="
              inline-flex
              items-center
              justify-center
              shrink-0
              rounded-full
              border
              border-[#2D3C68]/18
              px-8
              py-3.5
              mt-6
              text-[13px]
              tracking-[0.02em]
              text-[#2D3C68]
              transition-all
              duration-500
              hover:border-[#2D3C68]/40
              hover:-translate-y-[2px]
              active:scale-[0.97]

              md:mt-0
            "
          >
            Inquire About a Window →
          </a>

        </motion.div>

      </div>

      {/* BOTTOM BORDER */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2D3C68]/10 to-transparent" />

    </section>
  );
}
 
function HowItWorks() {
 
  const steps = [
    {
      id: '01',
      title: 'Send an Inquiry',
      duration: 'Response within 24 hours',
      desc: 'Tell us your preferred dates, group size, and any specific requests. No commitment required — just a conversation.',
      primary: true,
    },
    {
      id: '02',
      title: 'We Plan Together',
      duration: '2–5 days',
      desc: 'We send a tailored proposal — route, itinerary, and any customisations based on your group and the season.',
      primary: false,
    },
    {
      id: '03',
      title: 'Confirm with Deposit',
      duration: '30% of charter rate',
      desc: 'A deposit secures your window. Balance is due 60 days before departure. Full refund if we cancel on our end.',
      primary: false,
    },
    {
      id: '04',
      title: 'Board Serenity',
      duration: 'From Labuan Bajo or Sorong',
      desc: 'Arrive at the departure port. The crew handles everything from there — provisions, route, and the pace of each day.',
      primary: false,
    },
  ]
 
  const sectionRef  = useRef(null)
  const headerRef   = useRef(null)
  const rightRef    = useRef(null)
  const stepRefsD   = useRef([])
  const stepRefsM   = useRef([])
 
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
 
    if (reduce) {
      gsap.set(
        [headerRef.current, rightRef.current,
         ...stepRefsD.current.filter(Boolean),
         ...stepRefsM.current.filter(Boolean)],
        { opacity: 1, y: 0 }
      )
      return
    }
 
    const ctx = gsap.context(() => {
 
      // Header
      gsap.set(headerRef.current, { opacity: 0, y: 24 })
      gsap.to(headerRef.current, {
        opacity: 1, y: 0,
        duration: 1.0,
        ease: [0.22, 1, 0.36, 1],
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
      })
 
      // Right column — image
      gsap.set(rightRef.current, { opacity: 0, y: 40 })
      gsap.to(rightRef.current, {
        opacity: 1, y: 0,
        duration: 1.2,
        delay: 0.25,
        ease: [0.22, 1, 0.36, 1],
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
      })
 
      // Desktop step cards
      const dCards = stepRefsD.current.filter(Boolean)
      if (dCards.length) {
        gsap.set(dCards, { opacity: 0, y: 28 })
        gsap.to(dCards, {
          opacity: 1, y: 0,
          duration: 0.95,
          ease: [0.22, 1, 0.36, 1],
          stagger: 0.09,
          scrollTrigger: {
            trigger: dCards[0],
            start: 'top 80%',
          },
        })
      }
 
      // Mobile step cards
      const mCards = stepRefsM.current.filter(Boolean)
      if (mCards.length) {
        gsap.set(mCards, { opacity: 0, y: 24 })
        gsap.to(mCards, {
          opacity: 1, y: 0,
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
          stagger: 0.08,
          scrollTrigger: {
            trigger: mCards[0],
            start: 'top 85%',
          },
        })
      }
 
    }, sectionRef)
 
    return () => ctx.revert()
  }, [])
 
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: '#F4F5F2' }}
    >
 
      {/* ── Atmospheric bridge — dark maritime from Rates ── */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '100px',
          background:
            'linear-gradient(to bottom, rgba(45,60,104,0.07) 0%, transparent 100%)',
        }}
      />
 
      {/* ── Subtle warm radial — no grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 68% 22%, rgba(176,141,87,0.05), transparent 50%)',
        }}
      />
 
      <div
        className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10"
        style={{
          paddingTop: 'clamp(88px, 11vh, 128px)',
          paddingBottom: 'clamp(96px, 12vh, 144px)',
        }}
      >
 
        {/* ── Header ── */}
        <div
          ref={headerRef}
          className="mb-16 md:mb-20 md:grid md:grid-cols-12 md:gap-8 md:items-end"
        >
          <div className="md:col-span-5">
            <p
              className="uppercase mb-5"
              style={{
                fontFamily: 'Switzer, sans-serif',
                fontWeight: 300,
                fontSize: '10px',
                letterSpacing: '0.34em',
                color: 'rgba(45,60,104,0.40)',
              }}
            >
              How It Works
            </p>
 
            <h2
              style={{
                fontFamily: 'Gambarino, serif',
                fontSize: 'clamp(40px, 5vw, 64px)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                color: '#2D3C68',
              }}
            >
              Four steps<br />from here<br />to the sea.
            </h2>
          </div>
 
          <div className="md:col-span-5 md:col-start-8 mt-8 md:mt-0">
            <p
              style={{
                fontFamily: 'Switzer, sans-serif',
                fontWeight: 300,
                fontSize: '15px',
                lineHeight: 1.85,
                color: 'rgba(45,60,104,0.58)',
                maxWidth: '380px',
              }}
            >
              The booking process is straightforward. One conversation is
              enough to get started — the crew handles the rest once you
              step on board.
            </p>
          </div>
        </div>
 
        {/* ── Steps + Image ── */}
        <div className="md:grid md:grid-cols-12 md:gap-8 md:items-start">
 
          {/* Steps — left 7 cols */}
          <div className="md:col-span-7">
 
            {/* Desktop: 2x2 grid */}
            <div className="hidden md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-0">
              {steps.map((step, i) => (
                <StepCard
                  key={step.id}
                  stepRef={el => stepRefsD.current[i] = el}
                  step={step}
                  index={i}
                />
              ))}
            </div>
 
            {/* Mobile: vertical timeline */}
            <div className="md:hidden flex flex-col">
              {steps.map((step, i) => (
                <StepCardMobile
                  key={step.id}
                  stepRef={el => stepRefsM.current[i] = el}
                  step={step}
                  index={i}
                  last={i === steps.length - 1}
                />
              ))}
            </div>
 
          </div>
 
          {/* Image — right 4 cols, offset up desktop only */}
          <div
            ref={rightRef}
            className="md:col-span-4 md:col-start-9 mt-14 md:mt-0 md:-translate-y-[48px]"
          >
            <div className="relative">
 
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: '4 / 5' }}
              >
                <Image
                  src="https://res.cloudinary.com/dombq6plz/image/upload/v1776869680/ChatGPT_Image_Apr_22_2026_08_27_54_PM_n8evgp.png"
                  alt="Serenity crew preparing the deck before departure"
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'rgba(45,60,104,0.12)' }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(45,60,104,0.45) 0%, transparent 50%)',
                  }}
                />
              </div>
 
              {/* Caption chip — dark bg on light section */}
              <div
                className="absolute"
                style={{
                  bottom: '-20px',
                  right: '-20px',
                  background: '#2D3C68',
                  padding: '12px 20px',
                }}
              >
                <p
                  className="uppercase"
                  style={{
                    fontFamily: 'Switzer, sans-serif',
                    fontWeight: 300,
                    fontSize: '10px',
                    letterSpacing: '0.22em',
                    color: 'rgba(244,245,242,0.50)',
                    marginBottom: '2px',
                  }}
                >
                  Crew
                </p>
                <p
                  style={{
                    fontFamily: 'Switzer, sans-serif',
                    fontSize: '13px',
                    letterSpacing: '0.04em',
                    color: '#F4F5F2',
                  }}
                >
                  Ready when you are
                </p>
              </div>
 
            </div>
          </div>
 
        </div>
 
      </div>
 
      {/* ── Exit bridge ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '60px',
          background:
            'linear-gradient(to bottom, transparent, rgba(45,60,104,0.03))',
        }}
      />
 
    </section>
  )
}


function StepCard({ stepRef, step, index }) {
  return (
    <div
      ref={stepRef}
      className={index % 2 === 0 ? 'pr-8' : 'pl-8'}
      style={{
        position: 'relative',
        paddingTop: '28px',
        paddingBottom: '40px',
        borderTop: '1px solid rgba(45,60,104,0.10)',
        borderRight: index % 2 === 0
          ? '1px solid rgba(45,60,104,0.06)'
          : 'none',
      }}
    >
      {/* Ghost number */}
      <div
        className="pointer-events-none select-none absolute right-3 top-2"
        style={{
          fontFamily: 'Gambarino, serif',
          fontSize: '100px',
          lineHeight: 1,
          letterSpacing: '-0.06em',
          color: 'rgba(45,60,104,0.04)',
        }}
      >
        {step.id}
      </div>
 
      {/* ID */}
      <p
        className="uppercase"
        style={{
          fontFamily: 'Switzer, sans-serif',
          fontWeight: 300,
          fontSize: '10px',
          letterSpacing: '0.28em',
          color: 'rgba(176,141,87,0.75)',
          marginBottom: '14px',
        }}
      >
        {step.id}
      </p>
 
      {/* Title */}
      <p
        style={{
          fontFamily: 'Gambarino, serif',
          fontSize: step.primary ? '26px' : '22px',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: '#2D3C68',
          marginBottom: '10px',
        }}
      >
        {step.title}
      </p>
 
      {/* Duration */}
      <p
        className="uppercase"
        style={{
          fontFamily: 'Switzer, sans-serif',
          fontWeight: 300,
          fontSize: '11px',
          letterSpacing: '0.16em',
          color: 'rgba(176,141,87,0.75)',
          marginBottom: '14px',
        }}
      >
        {step.duration}
      </p>
 
      {/* Description */}
      <p
        style={{
          fontFamily: 'Switzer, sans-serif',
          fontWeight: 300,
          fontSize: '13px',
          lineHeight: 1.75,
          color: 'rgba(45,60,104,0.55)',
        }}
      >
        {step.desc}
      </p>
    </div>
  )
}
 
function StepCardMobile({ stepRef, step, index, last }) {
  return (
    <div ref={stepRef} className="relative flex gap-5">
 
      {/* Connector line + dot */}
      <div className="flex flex-col items-center shrink-0 w-8">
        <div style={{ width: '1px', height: '20px', background: 'transparent' }} />
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'rgba(176,141,87,0.70)',
            flexShrink: 0,
            marginTop: '14px',
          }}
        />
        {!last && (
          <div
            style={{
              flex: 1,
              width: '1px',
              background: 'rgba(45,60,104,0.10)',
              marginTop: '8px',
            }}
          />
        )}
      </div>
 
      {/* Content */}
      <div className="relative flex-1 min-w-0" style={{ paddingBottom: '40px' }}>
 
        {/* Ghost number */}
        <div
          className="pointer-events-none select-none absolute right-0 top-0"
          style={{
            fontFamily: 'Gambarino, serif',
            fontSize: '80px',
            lineHeight: 1,
            letterSpacing: '-0.06em',
            color: 'rgba(45,60,104,0.04)',
          }}
        >
          {step.id}
        </div>
 
        <p
          className="uppercase"
          style={{
            fontFamily: 'Switzer, sans-serif',
            fontWeight: 300,
            fontSize: '10px',
            letterSpacing: '0.28em',
            color: 'rgba(176,141,87,0.70)',
            paddingTop: '10px',
            marginBottom: '10px',
          }}
        >
          {step.id}
        </p>
 
        <p
          style={{
            fontFamily: 'Gambarino, serif',
            fontSize: step.primary ? '22px' : '19px',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#2D3C68',
            marginBottom: '8px',
          }}
        >
          {step.title}
        </p>
 
        <p
          className="uppercase"
          style={{
            fontFamily: 'Switzer, sans-serif',
            fontWeight: 300,
            fontSize: '11px',
            letterSpacing: '0.14em',
            color: 'rgba(176,141,87,0.75)',
            marginBottom: '10px',
          }}
        >
          {step.duration}
        </p>
 
        <p
          style={{
            fontFamily: 'Switzer, sans-serif',
            fontWeight: 300,
            fontSize: '13px',
            lineHeight: 1.75,
            color: 'rgba(45,60,104,0.55)',
          }}
        >
          {step.desc}
        </p>
      </div>
    </div>
  )
}












function RateOverview() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F4F5F2] py-[170px] md:py-[190px] px-6">
      {/* ===================================================== */}
      {/* TRANSITION FROM HERO */}
      {/* ===================================================== */}
      <div className="pointer-events-none absolute top-0 left-0 h-[140px] w-full bg-gradient-to-b from-[#2D3C68]/12 to-transparent" />

      {/* ===================================================== */}
      {/* ATMOSPHERE */}
      {/* ===================================================== */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(176,141,87,0.045),transparent_24%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_76%,rgba(45,60,104,0.028),transparent_22%)]" />

      <div className="relative mx-auto max-w-[1180px]">

        {/* ===================================================== */}
        {/* TOP INTRO */}
        {/* ===================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
          className="max-w-[760px]"
        >
          <p className="text-[11px] uppercase tracking-[0.34em] text-[#6A6A6A]">
            Rates
          </p>

          <h2 className="mt-6 font-[Gambarino] text-[54px] md:text-[72px] leading-[1] tracking-[-0.035em] text-[#2D3C68]">
            Private charter rates,
            <br />
            made clear
          </h2>

          <p className="mt-7 max-w-[520px] text-[15px] md:text-[16px] leading-[1.9] text-[#2D3C68]/72">
            Reserve the entire yacht for your group. Pricing is per night and
            shaped by season, route, and journey length.
          </p>
        </motion.div>

        {/* ===================================================== */}
        {/* MONUMENT PRICING */}
        {/* ===================================================== */}
        <div className="mt-20 border-y border-[#2D3C68]/8 py-14 md:py-16">
          <div className="grid items-end gap-16 md:grid-cols-2 md:gap-10">

            {/* PEAK */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72 }}
              viewport={{ once: true }}
            >
              <p className="text-[12px] uppercase tracking-[0.26em] text-[#6A6A6A]">
                Peak Season
              </p>

              <div className="mt-5 flex items-start gap-3">
                <span className="pt-4 text-[13px] uppercase tracking-[0.22em] text-[#6A6A6A]">
                  USD
                </span>

                <span className="font-[Gambarino] text-[74px] md:text-[96px] leading-none tracking-[-0.04em] text-[#1A1A1A]">
                  8,500
                </span>
              </div>

              <p className="mt-4 text-[14px] text-[#5C5C5C]">
                per night
              </p>
            </motion.div>

            {/* LOW */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.08 }}
              viewport={{ once: true }}
              className="md:border-l md:border-[#2D3C68]/8 md:pl-10"
            >
              <p className="text-[12px] uppercase tracking-[0.26em] text-[#6A6A6A]">
                Low Season
              </p>

              <div className="mt-5 flex items-start gap-3">
                <span className="pt-3 text-[12px] uppercase tracking-[0.22em] text-[#6A6A6A]">
                  USD
                </span>

                <span className="font-[Gambarino] text-[58px] md:text-[74px] leading-none tracking-[-0.04em] text-[#1A1A1A]">
                  6,500
                </span>
              </div>

              <p className="mt-4 text-[14px] text-[#5C5C5C]">
                per night
              </p>
            </motion.div>

          </div>
        </div>

        {/* ===================================================== */}
        {/* SUPPORTING NOTES */}
        {/* ===================================================== */}
        <div className="mt-14 grid items-start gap-10 md:grid-cols-[1fr_auto]">

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
            viewport={{ once: true }}
            className="max-w-[560px] text-[15px] leading-[1.9] text-[#2D3C68]/72"
          >
            Includes crew, onboard meals, and water activities.
            Final quotes are confirmed once route and dates are selected.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-x-5 gap-y-3 text-[11px] uppercase tracking-[0.24em] text-[#2D3C68]/42 md:justify-end"
          >
            <span>Up to 12 Guests</span>
            <span>Private Charter</span>
            <span>Tailored Quotes</span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function IncludedSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F1F3EE] py-[170px] md:py-[190px] px-6">
      {/* ===================================================== */}
      {/* TRANSITION FROM PREVIOUS SECTION */}
      {/* ===================================================== */}
      <div className="pointer-events-none absolute top-0 left-0 h-[120px] w-full bg-gradient-to-b from-[#F4F5F2] to-transparent" />

      {/* ===================================================== */}
      {/* ATMOSPHERE */}
      {/* ===================================================== */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(176,141,87,0.04),transparent_24%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_78%,rgba(45,60,104,0.025),transparent_22%)]" />

      <div className="relative mx-auto max-w-[1280px]">

        {/* ===================================================== */}
        {/* TOP GRID */}
        {/* ===================================================== */}
        <div className="grid items-start gap-24 md:grid-cols-[0.95fr_1.05fr]">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
            className="max-w-[460px]"
          >
            <p className="text-[11px] uppercase tracking-[0.34em] text-[#6A6A6A]">
              Included
            </p>

            <h2 className="mt-6 font-[Gambarino] text-[52px] md:text-[64px] leading-[1.02] tracking-[-0.03em] text-[#2D3C68]">
              Everything
              <br />
              already handled
            </h2>

            <p className="mt-7 max-w-[420px] text-[15px] md:text-[16px] leading-[1.9] text-[#2D3C68]/72">
              From meals to movement, the details are prepared before you arrive.
              Once aboard, very little is asked of you.
            </p>

            <div className="mt-12 border-l border-[#2D3C68]/14 pl-6">
              <p className="font-[Gambarino] text-[26px] leading-[1.18] text-[#2D3C68]">
                Your time stays yours.
              </p>
            </div>
          </motion.div>

          {/* RIGHT */}
          <div className="md:pt-8">

            {/* CLUSTER 1 */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="grid gap-8 border-b border-[#2D3C68]/10 pb-12 sm:grid-cols-[180px_1fr]"
            >
              <p className="text-[12px] uppercase tracking-[0.26em] text-[#6A6A6A]">
                Yacht & Crew
              </p>

              <p className="max-w-[520px] text-[17px] leading-[1.75] text-[#1A1A1A]">
                Private yacht with captain, chef, and full onboard crew
                dedicated to your group throughout the journey.
              </p>
            </motion.div>

            {/* CLUSTER 2 */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              viewport={{ once: true }}
              className="grid gap-8 border-b border-[#2D3C68]/10 py-12 sm:grid-cols-[180px_1fr]"
            >
              <p className="text-[12px] uppercase tracking-[0.26em] text-[#6A6A6A]">
                Onboard Living
              </p>

              <p className="max-w-[520px] text-[17px] leading-[1.75] text-[#1A1A1A]">
                Breakfast, lunch, dinner, snacks, water, and the daily comfort
                of a fully serviced yacht.
              </p>
            </motion.div>

            {/* CLUSTER 3 */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14 }}
              viewport={{ once: true }}
              className="grid gap-8 border-b border-[#2D3C68]/10 py-12 sm:grid-cols-[180px_1fr]"
            >
              <p className="text-[12px] uppercase tracking-[0.26em] text-[#6A6A6A]">
                Exploration
              </p>

              <p className="max-w-[520px] text-[17px] leading-[1.75] text-[#1A1A1A]">
                Snorkeling equipment, paddle boards, and access to the water
                whenever conditions are right.
              </p>
            </motion.div>

            {/* CLUSTER 4 */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid gap-8 pt-12 sm:grid-cols-[180px_1fr]"
            >
              <p className="text-[12px] uppercase tracking-[0.26em] text-[#6A6A6A]">
                Not Included
              </p>

              <p className="max-w-[520px] text-[16px] leading-[1.85] text-[#2D3C68]/72">
                Flights, park fees, alcohol on request, and personal expenses.
                Final trip planning is confirmed before departure.
              </p>
            </motion.div>

          </div>
        </div>

        {/* ===================================================== */}
        {/* FOOTNOTE */}
        {/* ===================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-wrap gap-x-5 gap-y-3 text-[11px] uppercase tracking-[0.24em] text-[#2D3C68]/42"
        >
          <span>Private Charter</span>
          <span>Up to 12 Guests</span>
          <span>Full Crew</span>
          <span>Prepared Before Arrival</span>
        </motion.div>

      </div>
    </section>
  );
}

function PricingDetails() {
  return (
    <section className="w-full bg-[#E9EDF5] py-[180px] px-6">

      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-20 items-start">

        {/* ================= LEFT (IMAGE) ================= */}
        <div className="relative w-full aspect-[4/5] overflow-hidden">

          <img
            src="https://res.cloudinary.com/dombq6plz/image/upload/v1776176459/Aerial_view_of_phinisi_yacht_indonesia_f4zq1l.png"
            alt=""
            className="w-full h-full object-cover"
          />

        </div>

        {/* ================= RIGHT (DATA) ================= */}
        <div>

          <p className="text-[11px] tracking-[0.35em] text-[#6A6A6A] uppercase">
            Pricing Details
          </p>

          <h2 className="mt-6 font-[Gambarino] text-[42px] leading-[1.1] text-[#2D3C68]">
            Where the cost comes from
          </h2>

          <div className="mt-10 space-y-10 text-[15px] text-[#1A1A1A]">

            {/* FUEL */}
            <div>
              <p className="font-medium">Fuel</p>
              <p className="text-[#5C5C5C] mt-1">
                300–600 liters per day depending on route and speed.
              </p>
            </div>

            {/* CREW */}
            <div>
              <p className="font-medium">Crew</p>
              <p className="text-[#5C5C5C] mt-1">
                8–10 crew members on board throughout the trip.
              </p>
            </div>

            {/* FOOD */}
            <div>
              <p className="font-medium">Food & Supplies</p>
              <p className="text-[#5C5C5C] mt-1">
                Fresh ingredients restocked before each trip and during longer routes.
              </p>
            </div>

            {/* ROUTE */}
            <div>
              <p className="font-medium">Distance</p>
              <p className="text-[#5C5C5C] mt-1">
                Longer routes (e.g. Raja Ampat) require higher fuel and logistics cost.
              </p>
            </div>

            {/* SEASON */}
            <div>
              <p className="font-medium">Season</p>
              <p className="text-[#5C5C5C] mt-1">
                Peak season (Jun–Sep) has higher demand and limited availability.
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

function SampleJourney() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F4F5F2] py-[190px] md:py-[210px] px-6">
      {/* ===================================================== */}
      {/* ATMOSPHERE */}
      {/* ===================================================== */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(176,141,87,0.05),transparent_24%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_78%,rgba(45,60,104,0.03),transparent_22%)]" />

      <div className="relative max-w-[1280px] mx-auto">
        {/* ===================================================== */}
        {/* HEADER */}
        {/* ===================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
          className="max-w-[700px]"
        >
          <p className="text-[11px] uppercase tracking-[0.34em] text-[#6A6A6A]">
            Example Journeys
          </p>

          <h2 className="mt-6 font-[Gambarino] text-[54px] md:text-[72px] leading-[1] tracking-[-0.035em] text-[#2D3C68]">
            A few directions
            <br />
            the journey can take
          </h2>

          <p className="mt-7 max-w-[520px] text-[15px] md:text-[16px] leading-[1.9] text-[#2D3C68]/72">
            No route is fixed. These examples simply show different moods,
            landscapes, and rhythms available by sea.
          </p>
        </motion.div>

        {/* ===================================================== */}
        {/* JOURNEY GRID */}
        {/* ===================================================== */}
        <div className="mt-20 grid md:grid-cols-[1fr_0.86fr] gap-20 items-start">
          {/* ===================================================== */}
          {/* KOMODO / FEATURED */}
          {/* ===================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden  ">
              <div className="aspect-[4/5]">
                <img
                  src="https://res.cloudinary.com/dombq6plz/image/upload/v1776869679/ChatGPT_Image_Apr_22_2026_09_52_34_PM_ot1mm8.png"
                  alt="Komodo journey"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/34 via-black/6 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/65">
                  4 Nights
                </p>

                <h3 className="mt-3 font-[Gambarino] text-[42px] md:text-[56px] leading-[0.95] tracking-[-0.03em] text-white">
                  Komodo
                </h3>

                <p className="mt-4 max-w-[420px] text-[15px] leading-[1.8] text-white/78">
                  Dramatic islands, clear reefs, sunrise hikes, and one of
                  Indonesia’s most iconic landscapes.
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-[11px] uppercase tracking-[0.24em] text-[#2D3C68]/44">
              <span>Padar Sunrise</span>
              <span>Pink Beach</span>
              <span>Wildlife</span>
              <span>Snorkeling</span>
            </div>
          </motion.div>

          {/* ===================================================== */}
          {/* RAJA AMPAT / SECONDARY */}
          {/* ===================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.08 }}
            viewport={{ once: true }}
            className="md:pt-16"
          >
            <div className="relative overflow-hidden  ">
              <div className="aspect-[4/5]">
                <img
                  src="https://res.cloudinary.com/dombq6plz/image/upload/v1776869680/ChatGPT_Image_Apr_22_2026_08_27_54_PM_n8evgp.png"
                  alt="Raja Ampat journey"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/34 via-black/6 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/65">
                  5 Nights
                </p>

                <h3 className="mt-3 font-[Gambarino] text-[36px] md:text-[48px] leading-[0.96] tracking-[-0.03em] text-white">
                  Raja Ampat
                </h3>

                <p className="mt-4 max-w-[380px] text-[15px] leading-[1.8] text-white/78">
                  Hidden lagoons, rich marine life, and a slower rhythm across
                  remote tropical waters.
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-[11px] uppercase tracking-[0.24em] text-[#2D3C68]/44">
              <span>Remote Reefs</span>
              <span>Lagoon Stops</span>
              <span>Diving</span>
              <span>Quiet Cruising</span>
            </div>
          </motion.div>
        </div>

        {/* ===================================================== */}
        {/* FOOTNOTE */}
        {/* ===================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.14 }}
          viewport={{ once: true }}
          className="mt-24 max-w-[560px]"
        >
          <p className="text-[15px] leading-[1.9] text-[#2D3C68]/72">
            Every trip is shaped around your dates, preferences, and sea
            conditions. These routes are starting points, not fixed programs.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTA() {

  const sectionRef   = useRef(null)
  const eyebrowRef   = useRef(null)
  const headlineRef  = useRef(null)
  const ruleRef      = useRef(null)
  const actionRef    = useRef(null)

  useEffect(() => {

    const reduce =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      gsap.set(
        [
          eyebrowRef.current,
          headlineRef.current,
          actionRef.current,
        ],
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
        }
      )

      gsap.set(ruleRef.current, {
        scaleX: 1,
        opacity: 1,
      })

      return
    }

    const ctx = gsap.context(() => {

      gsap.set(eyebrowRef.current, {
        opacity: 0,
        y: 12,
      })

      gsap.set(headlineRef.current, {
        opacity: 0,
        y: 34,
        filter: 'blur(8px)',
      })

      gsap.set(ruleRef.current, {
        opacity: 0,
        scaleX: 0,
        transformOrigin: 'left center',
      })

      gsap.set(actionRef.current, {
        opacity: 0,
        y: 18,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 74%',
        },
      })

      tl

        .to(eyebrowRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        })

        .to(headlineRef.current, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.55,
          ease: [0.22, 1, 0.36, 1],
        }, '-=0.28')

        .to(ruleRef.current, {
          opacity: 1,
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.out',
        }, '-=0.95')

        .to(actionRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.05,
          ease: [0.22, 1, 0.36, 1],
        }, '-=0.12')

    }, sectionRef)

    return () => ctx.revert()

  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor: '#2D3C68',
      }}
    >

      {/* ── Atmospheric bridge ── */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '120px',
          background:
            'linear-gradient(to bottom, rgba(244,245,242,0.06) 0%, transparent 100%)',
        }}
      />

      {/* ── Atmospheric layer ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 25% 55%, rgba(255,255,255,0.03), transparent 58%)',
        }}
      />

      <div
        className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10"
        style={{
          paddingTop: 'clamp(104px, 13vh, 152px)',
          paddingBottom: 'clamp(104px, 13vh, 152px)',
        }}
      >

        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className="uppercase"
          style={{
            fontFamily: 'Switzer, sans-serif',
            fontWeight: 300,
            fontSize: '10px',
            letterSpacing: '0.34em',
            color: 'rgba(244,245,242,0.32)',
            marginBottom: '28px',
          }}
        >
          Contact Serenity
        </p>

        {/* Headline */}
        <h2
          ref={headlineRef}
          style={{
            fontFamily: 'Gambarino, serif',
            fontSize: 'clamp(52px, 7.2vw, 94px)',
            lineHeight: 0.92,
            letterSpacing: '-0.045em',
            color: '#F4F5F2',
            marginBottom: 'clamp(42px, 6vh, 68px)',
            maxWidth: '760px',
          }}
        >
          Your voyage begins<br />
          with a conversation
        </h2>

        {/* Brass rule */}
        <div
          ref={ruleRef}
          style={{
            height: '1px',
            width: '100%',
            marginBottom: 'clamp(34px, 5vh, 52px)',
            background:
              'linear-gradient(to right, rgba(176,141,87,0.38), rgba(176,141,87,0.04))',
          }}
        />

        {/* Action row */}
        <div
          ref={actionRef}
          className="flex flex-col md:flex-row md:items-center md:justify-between"
          style={{
            gap: '32px',
          }}
        >

          {/* Contact */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <p
              style={{
                fontFamily: 'Switzer, sans-serif',
                fontWeight: 300,
                fontSize: '14px',
                color: 'rgba(244,245,242,0.68)',
              }}
            >
              Alexandra Wira
            </p>

            <p
              className="uppercase"
              style={{
                fontFamily: 'Switzer, sans-serif',
                fontWeight: 300,
                fontSize: '10px',
                letterSpacing: '0.22em',
                color: 'rgba(244,245,242,0.32)',
                marginBottom: '10px',
              }}
            >
              Guest Experience
            </p>

            <a
              href={SITE_CONTACT.primaryEmailHref}
              style={{
                width: 'fit-content',
                fontFamily: 'Switzer, sans-serif',
                fontWeight: 300,
                fontSize: '14px',
                color: 'rgba(244,245,242,0.58)',
                textDecoration: 'none',
                opacity: 0.72,
                transition: 'opacity 400ms ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = '1'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = '0.72'
              }}
            >
              {SITE_CONTACT.primaryEmail}
            </a>
          </div>

          {/* CTA */}
          <div
            className="flex flex-col items-start md:items-end"
            style={{
              gap: '12px',
              flexShrink: 0,
            }}
          >

            <TransitionLink
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#F4F5F2',
                color: '#2D3C68',
                fontFamily: 'Switzer, sans-serif',
                fontWeight: 400,
                fontSize: '13px',
                letterSpacing: '0.05em',
                padding: '13px 32px',
                borderRadius: '999px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition:
                  'background 500ms ease, box-shadow 500ms ease, opacity 500ms ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#ECEDE9'
                e.currentTarget.style.boxShadow =
                  '0 0 40px rgba(255,255,255,0.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#F4F5F2'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Begin Your Voyage
            </TransitionLink>

            <span
              style={{
                fontFamily: 'Switzer, sans-serif',
                fontWeight: 300,
                fontSize: '12px',
                color: 'rgba(244,245,242,0.24)',
              }}
            >
              Response within 24 hours
            </span>

          </div>

        </div>

      </div>

      {/* ── Sumba Ikat ── */}
      <div
        className="absolute pointer-events-none overflow-hidden"
        style={{
          width: '320px',
          height: '320px',
          right: '-90px',
          bottom: '-90px',
        }}
      >
        <img
          src="https://res.cloudinary.com/dombq6plz/image/upload/v1778486588/ChatGPT_Image_May_11_2026_03_01_56_PM_1_v2exmt.png"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: 0.035,
            animation: 'ikatSpin 120s linear infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes ikatSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

    </section>
  )
}







function CharterRates() {
  return (
    <section className="bg-[#F5F2ED] py-[140px] px-6">

      <div className="max-w-[1200px] mx-auto">

        {/* TOP */}
        <div className="grid md:grid-cols-2 gap-20 items-start">

          {/* LEFT */}
          <div>
            <p className="text-[12px] tracking-[0.35em] text-[#0F172A]/40 uppercase">
              Rates
            </p>

            <h2 className="mt-6 font-[Canela] text-[40px] md:text-[56px] leading-[1.1] text-[#0F172A]">
              Chartering
              <br />
              With Us
            </h2>
          </div>

          {/* RIGHT */}
          <div className="max-w-[520px] text-[15px] text-[#0F172A]/70 leading-relaxed">
            Explore our rates and schedules to plan your Sanctuary journey.
            With flexible itineraries, each voyage offers a unique blend of
            luxury and adventure through Indonesia’s archipelago.
          </div>

        </div>

        {/* RATES */}
        <div className="mt-20 grid md:grid-cols-2 gap-16">

          {/* LEFT RATE */}
          <div className="border-t border-[#0F172A]/20 pt-10">

            <div className="flex items-baseline gap-3">
              <span className="font-[Canela] text-[40px] md:text-[52px] text-[#0F172A]">
                45,000
              </span>
              <span className="text-[14px] text-[#0F172A]/60">
                USD / week
              </span>
            </div>

            <p className="mt-6 text-[14px] text-[#0F172A]/60 leading-relaxed max-w-[420px]">
              Private charter of the entire vessel with seven staterooms,
              accommodating up to fourteen guests.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-[12px] tracking-wide text-[#0F172A]/50 uppercase">
              <span>Raja Ampat</span>
              <span>•</span>
              <span>Banda Sea</span>
              <span>•</span>
              <span>Ambon</span>
            </div>

          </div>

          {/* RIGHT RATE */}
          <div className="border-t border-[#0F172A]/20 pt-10">

            <div className="flex items-baseline gap-3">
              <span className="font-[Canela] text-[40px] md:text-[52px] text-[#0F172A]">
                55,000
              </span>
              <span className="text-[14px] text-[#0F172A]/60">
                USD / week
              </span>
            </div>

            <p className="mt-6 text-[14px] text-[#0F172A]/60 leading-relaxed max-w-[420px]">
              Private charter of the entire vessel with seven staterooms,
              accommodating up to fourteen guests.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-[12px] tracking-wide text-[#0F172A]/50 uppercase">
              <span>Komodo</span>
              <span>•</span>
              <span>Flores</span>
              <span>•</span>
              <span>Alor</span>
            </div>

          </div>

        </div>

        {/* PAYMENT TERMS */}
        <div className="mt-24 pt-12 border-t border-[#0F172A]/20">

          <h3 className="font-[Canela] text-[26px] text-[#0F172A]">
            Payment Terms
          </h3>

          <p className="mt-4 text-[14px] text-[#0F172A]/60 max-w-[520px] leading-relaxed">
            A fifty percent non-refundable deposit is required at the time of
            booking. The remaining balance is due sixty days prior to departure.
          </p>

        </div>

      </div>

    </section>
  );
}


function Schedule() {
  return (
    <section className="bg-[#F5F2ED] py-[140px] px-6">

      <div className="max-w-[1100px] mx-auto">

        {/* HEADER */}
        <div className="text-center">
          <p className="text-[12px] tracking-[0.35em] text-[#0F172A]/40 uppercase">
            Schedule
          </p>

          <h2 className="mt-6 font-[Canela] text-[42px] md:text-[56px] text-[#0F172A]">
            Choose Your Trip
          </h2>
        </div>

        {/* LIST */}
        <div className="mt-20 divide-y divide-[#0F172A]/10">

          {/* ROW 1 */}
          <div className="group grid grid-cols-[1fr_1fr_auto] items-center py-10">

            <p className="font-[Canela] text-[18px] tracking-wide text-[#0F172A]">
              JAN–APR
            </p>

            <p className="text-[13px] tracking-[0.2em] text-[#0F172A]/50 uppercase">
              Raja Ampat · West Papua
            </p>

            <img
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_06_28_PM_fkhsss.png"
              className="w-[120px] h-[80px] object-cover transition-transform duration-500 group-hover:scale-105"
            />

          </div>

          {/* ROW 2 */}
          <div className="group grid grid-cols-[1fr_1fr_auto] items-center py-10 pl-6">

            <p className="font-[Canela] text-[18px] tracking-wide text-[#0F172A]">
              APR
            </p>

            <p className="text-[13px] tracking-[0.2em] text-[#0F172A]/50 uppercase">
              Spice Islands · Maluku
            </p>

            <img
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_15_PM_otnwp1.png"
              className="w-[120px] h-[80px] object-cover transition-transform duration-500 group-hover:scale-105"
            />

          </div>

          {/* HERO ROW (highlight) */}
          <div className="group grid grid-cols-[1fr_1fr_auto] items-center py-14">

            <p className="font-[Canela] text-[22px] text-[#0F172A]">
              MAY–SEP
            </p>

            <p className="text-[14px] tracking-[0.2em] text-[#0F172A]/60 uppercase">
              Komodo · Sumbawa · Alor
            </p>

            <img
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_08_12_PM_xxx.png"
              className="w-[160px] h-[110px] object-cover transition-transform duration-500 group-hover:scale-105"
            />

          </div>

          {/* ROW 4 */}
          <div className="group grid grid-cols-[1fr_1fr_auto] items-center py-10 pl-6">

            <p className="font-[Canela] text-[18px] text-[#0F172A]">
              SEP–OCT
            </p>

            <p className="text-[13px] tracking-[0.2em] text-[#0F172A]/50 uppercase">
              Spice Islands · Maluku
            </p>

            <img
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_15_PM_otnwp1.png"
              className="w-[120px] h-[80px] object-cover transition-transform duration-500 group-hover:scale-105"
            />

          </div>

          {/* ROW 5 */}
          <div className="group grid grid-cols-[1fr_1fr_auto] items-center py-10">

            <p className="font-[Canela] text-[18px] text-[#0F172A]">
              OCT–DEC
            </p>

            <p className="text-[13px] tracking-[0.2em] text-[#0F172A]/50 uppercase">
              Raja Ampat · West Papua
            </p>

            <img
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_06_28_PM_fkhsss.png"
              className="w-[120px] h-[80px] object-cover transition-transform duration-500 group-hover:scale-105"
            />

          </div>

        </div>

        {/* CTA */}
        <div className="mt-20 flex flex-col items-center gap-4">

          <div className="flex gap-4">

            <button className="px-6 py-3 rounded-full bg-[#9FB7B1] text-white text-[12px] tracking-[0.2em] uppercase">
              Reserve
            </button>

            <button className="px-6 py-3 rounded-full border border-[#0F172A]/30 text-[#0F172A] text-[12px] tracking-[0.2em] uppercase">
              Book an Initial Call
            </button>

          </div>

          <p className="text-[11px] text-[#0F172A]/40 italic">
            Typical schedule. Subject to change.
          </p>

        </div>

      </div>

    </section>
  );
}


function InclusionsExclusions() {
  return (
    <section className="bg-[#0B0B0B] text-white py-[140px] px-6">

      <div className="max-w-[1200px] mx-auto">

        {/* INTRO */}
        <div className="text-center max-w-[620px] mx-auto">
          <p className="text-[12px] tracking-[0.35em] text-white/40 uppercase">
            Details
          </p>

          <h2 className="mt-6 font-[Canela] text-[40px] md:text-[56px] leading-[1.1]">
            What’s Included
          </h2>

          <p className="mt-6 text-[15px] text-white/60 leading-relaxed">
            Everything you need for a seamless journey is thoughtfully arranged.
            Additional services can be tailored to your preferences.
          </p>
        </div>

        {/* CONTENT */}
        <div className="mt-24 grid md:grid-cols-2 gap-20">

          {/* INCLUSIONS */}
          <div>

            <h3 className="font-[Canela] text-[28px] text-white">
              Inclusions
            </h3>

            <div className="mt-6 border-t border-white/10" />

            <div className="mt-10 space-y-10">

              {/* GROUP 1 */}
              <div>
                <p className="text-[11px] tracking-[0.3em] text-white/40 uppercase">
                  Experience
                </p>

                <ul className="mt-4 space-y-4">

                  {[
                    "Freshly cooked meals by Michelin-trained chef",
                    "Activities and guided excursions",
                    "Use of all water toys onboard",
                    "National Park fees"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="text-[#9FB7B1] text-[14px] mt-[2px]">✓</span>
                      <span className="text-[14px] text-white/80">{item}</span>
                    </li>
                  ))}

                </ul>
              </div>

              {/* GROUP 2 */}
              <div>
                <p className="text-[11px] tracking-[0.3em] text-white/40 uppercase">
                  Service
                </p>

                <ul className="mt-4 space-y-4">

                  {[
                    "Fully crewed vessel",
                    "Expedition leader",
                    "Dive master and equipment",
                    "Nitrox for certified divers"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="text-[#9FB7B1] text-[14px] mt-[2px]">✓</span>
                      <span className="text-[14px] text-white/80">{item}</span>
                    </li>
                  ))}

                </ul>
              </div>

              {/* GROUP 3 */}
              <div>
                <p className="text-[11px] tracking-[0.3em] text-white/40 uppercase">
                  Comfort & Logistics
                </p>

                <ul className="mt-4 space-y-4">

                  {[
                    "Free-flow local beer & house wine",
                    "Soft drinks, tea, coffee",
                    "Return airport / hotel transfers",
                    "Starlink satellite internet",
                    "Daily massage therapy (3 hours)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="text-[#9FB7B1] text-[14px] mt-[2px]">✓</span>
                      <span className="text-[14px] text-white/80">{item}</span>
                    </li>
                  ))}

                </ul>
              </div>

            </div>

          </div>

          {/* EXCLUSIONS */}
          <div>

            <h3 className="font-[Canela] text-[28px] text-white/90">
              Exclusions
            </h3>

            <div className="mt-6 border-t border-white/10" />

            <ul className="mt-10 space-y-5">

              {[
                "Alcoholic beverages beyond house selection",
                "Travel & dive insurance",
                "Crew gratuities (customary 10–15%)",
                "Fuel surcharge when applicable",
                "Hotels before and after the cruise",
                "Dive certifications and dive computer",
                "Additional massage treatments"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-white/40 text-[14px] mt-[2px]">×</span>
                  <span className="text-[14px] text-white/60">{item}</span>
                </li>
              ))}

            </ul>

          </div>

        </div>

      </div>

    </section>
  );
}
