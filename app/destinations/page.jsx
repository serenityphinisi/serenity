"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "../../lib/gsap"
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import Footer from '../../components/Footer'


export default function Page() {
  return (
    <main className="bg-[#0a0f14] text-white overflow-hidden">
       <Hero/>
       {/* <WorldDefinition/>    */}
       <RegionSystem/>
       {/* <IndonesiaKosmik/> */}
       <RegionFragment/>
       <ExperienceStructure/> 
       {/* <ExperienceBreak/> */}
       {/* <HowItWorks/> */}
       <ClosingCTA/>
      <Footer/> 
    </main>
  )
}


function Hero() {
  const pathRefD = useRef(null);
  const pathRefM = useRef(null);

  useEffect(() => {
    function setup(path, isMobile = false) {
      if (!path) return;

      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;

      let progress = 0;

      function animate() {
        const speed = isMobile ? 0.003 : 0.0016;
        progress += speed;

        path.style.strokeDashoffset = length * (1 - progress);

        if (progress < 1) requestAnimationFrame(animate);
      }

      animate();
    }

    setup(pathRefD.current, false);
    setup(pathRefM.current, true);
  }, []);

  return (
    <section className="relative h-screen bg-[#2D3C68] overflow-hidden">

      {/* MAP */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <img
          src="https://res.cloudinary.com/dombq6plz/image/upload/v1776257972/indonesia_ruqj89.svg"
          alt="Indonesia Map"
          className="
            w-[220%] md:w-[180%]
            opacity-[0.18] md:opacity-[0.12]
            invert
            object-contain
            md:translate-x-[-18%] translate-x-[-10%]
            translate-y-[8%] md:translate-y-[6%]
            scale-[1.3] md:scale-[1.4]
            blur-[1px]
          "
        />
      </div>

      {/* ROUTE — desktop */}
      <svg
        viewBox="0 0 1000 500"
        className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
      >
        <defs>
          <linearGradient id="routeGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#B08D57" stopOpacity="0.08" />
            <stop offset="30%" stopColor="#D4A853" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#E0C48A" stopOpacity="1" />
            <stop offset="100%" stopColor="#B08D57" stopOpacity="0.15" />
          </linearGradient>
          <filter id="routeGlow">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          ref={pathRefD}
          d="M220 340 C340 295, 450 255, 560 278 S740 318, 880 240"
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="1.6"
          strokeLinecap="round"
          filter="url(#routeGlow)"
        />
      </svg>

      {/* ROUTE — mobile */}
      <svg
        viewBox="0 0 500 800"
        className="absolute inset-0 w-full h-full pointer-events-none block md:hidden"
      >
        <defs>
          <linearGradient id="routeGradientM" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B08D57" stopOpacity="0.15" />
            <stop offset="40%" stopColor="#D4A853" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#E0C48A" stopOpacity="1" />
            <stop offset="100%" stopColor="#B08D57" stopOpacity="0.2" />
          </linearGradient>
          <filter id="routeGlowM">
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          ref={pathRefM}
          d="M60 300 C140 260, 220 230, 280 260 S380 310, 450 200"
          fill="none"
          stroke="url(#routeGradientM)"
          strokeWidth="2.6"
          strokeLinecap="round"
          filter="url(#routeGlowM)"
        />
      </svg>

      {/* DEPTH */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_50%,rgba(255,255,255,0.04)_0%,rgba(45,60,104,0.9)_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2D3C68] via-transparent to-transparent opacity-90" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-end md:items-center">
        <div className="w-full max-w-[1200px] mx-auto px-6 pb-14 md:pb-0 md:grid md:grid-cols-12">

          <div className="md:col-span-7 md:col-start-2">

            <div className="mb-5 text-[10px] md:text-[11px] tracking-[0.28em] text-[#F4F5F2]/70">
              DESTINATIONS
            </div>

            <h1 className="font-[Gambarino] text-[40px] md:text-[76px] leading-[1.05] tracking-[-0.03em] text-[#F4F5F2]">
              Nowhere to be
              <br />
              Nothing to follow
            </h1>

            <p className="mt-5 md:mt-6 text-[14px] md:text-[15px] text-[#F4F5F2]/80 max-w-full md:max-w-[520px] leading-[1.7]">
              Twelve guests across a shifting archipelago — no fixed route, only the sea, the season, and where it takes you next
            </p>

            <div className="mt-8 md:mt-10">
              <button
                className="
                  w-full md:w-auto
                  flex items-center justify-center md:inline-flex
                  min-h-[48px] md:min-h-[44px]
                  px-8 py-3
                  rounded-full
                  text-[13px]
                  transition

                  bg-[#F4F5F2] text-[#2D3C68]
                  active:scale-[0.97]

                  md:bg-transparent md:text-[#F4F5F2]
                  md:border md:border-[#F4F5F2]/70
                  md:hover:bg-[#F4F5F2]
                  md:hover:text-[#2D3C68]
                "
              >
                Explore Destinations →
              </button>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}



function WorldDefinition() {
  return (
    <section className="bg-[#F4F5F2] py-[140px] overflow-hidden">

      <div className="max-w-[1200px] mx-auto px-6">

        {/* ===== INTRO (SUBTLE) ===== */}
        <div className="mb-24 max-w-xl">
          <p className="text-[11px] tracking-[0.28em] text-[#2D3C68]/60 mb-6">
            DESTINATIONS
          </p>

          <h2 className="font-[Gambarino] text-[42px] md:text-[56px] leading-[1.08] tracking-[-0.02em] text-[#2D3C68]">
            Two regions, two
            <br />
            distinct worlds
          </h2>
        </div>

        {/* ===== LABUAN BAJO (STABLE) ===== */}
        <div className="grid grid-cols-12 items-center mb-[160px]">

          {/* IMAGE */}
          <div className="col-span-6">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068973/49_ph3xr3.webp"
                alt="Labuan Bajo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* TEXT */}
          <div className="col-span-5 col-start-8">

            <p className="text-[11px] tracking-[0.28em] text-[#2D3C68]/50 mb-6">
              LABUAN BAJO
            </p>

            <h3 className="font-[Gambarino] text-[34px] leading-[1.1] text-[#2D3C68] mb-6">
              Where land and sea
              <br />
              meet in contrast
            </h3>

            <p className="text-[15px] leading-[1.7] text-[#2D3C68]/80">
              A gateway into Komodo National Park, where rugged islands rise
              from turquoise waters. Here, days move between coral reefs,
              quiet bays, and encounters with Komodo dragons — a landscape
              that feels both raw and accessible.
            </p>

          </div>

        </div>

        {/* ===== RAJA AMPAT (BREAK / OFFSET) ===== */}
        <div className="grid grid-cols-12 items-center">

          {/* TEXT (SHIFTED LEFT = TENSION) */}
          <div className="col-span-5 col-start-1">

            <p className="text-[11px] tracking-[0.28em] text-[#2D3C68]/50 mb-6">
              RAJA AMPAT
            </p>

            <h3 className="font-[Gambarino] text-[34px] leading-[1.1] text-[#2D3C68] mb-6">
              A world beneath
              <br />
              the surface
            </h3>

            <p className="text-[15px] leading-[1.7] text-[#2D3C68]/80">
              One of the most biodiverse marine regions on earth, where over
              1,300 species of reef fish inhabit crystal-clear waters.
              Surrounded by limestone islands and hidden lagoons, this is a
              place defined by depth, isolation, and extraordinary life below
              the surface.
            </p>

          </div>

          {/* IMAGE (OFFSET BREAK) */}
          <div className="col-span-6 col-start-7 translate-y-[80px]">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_06_28_PM_fkhsss.png"
                alt="Raja Ampat"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

      </div>

    </section>
  )
}

function RegionSystem() {
  const mapRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    let raf;
    let t = 0;

    const animate = () => {
      t += 0.0025;

      if (mapRef.current) {
        const isMobile = window.innerWidth < 768;

        const x = Math.cos(t * 0.6) * (isMobile ? 6 : 10);
        const y = Math.sin(t) * (isMobile ? 10 : 14);
        const scale = isMobile ? 1.04 : 1.06;

        mapRef.current.style.transform = `
          translate(${x}px, ${y}px) scale(${scale})
        `;
      }

      raf = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) animate();
        else cancelAnimationFrame(raf);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      cancelAnimationFrame(raf);
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F4F5F2] overflow-hidden py-[80px] md:py-[100px]"
    >
      {/* BACKGROUND SOFT DEPTH */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_50%,rgba(45,60,104,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative">

        {/* ================= MOBILE ================= */}
        <div className="block md:hidden text-center">

          {/* MAP */}
          <div className="relative h-[300px] flex items-center justify-center mb-10">
            <div
              ref={mapRef}
              className="relative w-[150%] will-change-transform"
            >
              <img
                src="https://res.cloudinary.com/dombq6plz/image/upload/v1776257972/indonesia_ruqj89.svg"
                alt="Indonesia Map"
                className="w-full h-auto object-contain opacity-[0.5]"
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="max-w-[360px] mx-auto">

            <p className="text-[10px] tracking-[0.28em] text-[#2D3C68]/50 mb-4">
              THE ARCHIPELAGO
            </p>

            <h3 className="font-[Gambarino] text-[36px] leading-[1.1] text-[#2D3C68] mb-4">
              17,000 islands.<br />
              Mostly ocean.
            </h3>

            <p className="text-[14px] leading-[1.6] text-[#2D3C68]/75 mb-6">
              Across Indonesia, movement isn’t fixed. It follows the sea —
              currents, weather, and what each moment allows.
            </p>

            <button className="
              px-6 py-3 rounded-full
              bg-[#2D3C68] text-[#F4F5F2]
              text-[13px]
              active:scale-[0.97]
              transition
            ">
              Explore Regions →
            </button>

          </div>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:grid grid-cols-12 items-center">

          {/* MAP */}
          <div className="col-span-6 relative h-[640px] flex items-center justify-center">
            <div
              ref={mapRef}
              className="relative w-[160%] will-change-transform"
            >
              <img
                src="https://res.cloudinary.com/dombq6plz/image/upload/v1776257972/indonesia_ruqj89.svg"
                alt="Indonesia Map"
                className="w-full h-auto object-contain opacity-[0.45]"
              />

              {/* SOFT EDGE */}
              <div className="absolute left-0 top-0 w-[30%] h-full bg-gradient-to-r from-[#F4F5F2] to-transparent" />
            </div>
          </div>

          {/* CONTENT */}
          <div className="col-span-5 col-start-8 relative z-10">
            <div className="max-w-[460px]">

              <p className="text-[11px] tracking-[0.30em] text-[#2D3C68]/40 mb-6">
                THE ARCHIPELAGO
              </p>

              <h3 className="font-[Gambarino] text-[52px] leading-[1.05] text-[#2D3C68] mb-6">
                17,000+ islands.<br />
                Mostly ocean.
              </h3>

              <p className="text-[15px] leading-[1.8] text-[#2D3C68]/75 mb-8">
                Indonesia stretches across thousands of kilometers, shaped more by water than land.
                Movement here follows currents, seasons, and visibility between regions — not fixed routes.
              </p>

              <p className="text-[13px] leading-[1.7] text-[#2D3C68]/45 mb-10">
                Serenity moves through Komodo and Raja Ampat.<br />
                Not the most visited. The most worth being in.
              </p>

              <button className="
                px-8 py-3 rounded-full
                border border-[#2D3C68]/20
                text-[#2D3C68]
                text-[13px]
                transition
                hover:bg-[#2D3C68]
                hover:text-[#F4F5F2]
              ">
                Explore Regions →
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

function RegionFragment() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F4F5F2] overflow-hidden py-[110px] md:py-[120px]"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative">

        {/* ================= MOBILE ================= */}
        <div className="block md:hidden">

          <div className="max-w-[420px] mx-auto">

            {/* HEADLINE */}
            <h3 className="font-[Gambarino] text-[38px] leading-[1.08] text-[#2D3C68] mb-8 text-center">
              Two regions,<br />
              two conditions.
            </h3>

            {/* INTRO */}
            <p className="text-[14px] leading-[1.7] text-[#2D3C68]/70 mb-12 text-center">
              Movement here depends on where you are — each region follows a different rhythm.
            </p>

            {/* ================= REGION BLOCKS ================= */}
            <div className="space-y-8">

              {/* LABUAN BAJO */}
              <div className="relative p-5 rounded-[5px] bg-[#2D3C68]/[0.04]">

                <p className="text-[11px] tracking-[0.28em] text-[#2D3C68]/50 mb-3">
                  LABUAN BAJO
                </p>

                <p className="text-[14px] leading-[1.7] text-[#2D3C68]/80">
                  Dry season runs April to November, with underwater visibility reaching 20–30 meters.
                  Volcanic ridgelines transition quickly into dense coral systems.
                </p>

              </div>

              {/* RAJA AMPAT */}
              <div className="relative p-5 rounded-[5px] bg-[#2D3C68]/[0.02]">

                <p className="text-[11px] tracking-[0.28em] text-[#2D3C68]/50 mb-3">
                  RAJA AMPAT
                </p>

                <p className="text-[14px] leading-[1.7] text-[#2D3C68]/70">
                  Over 1,300 species of reef fish and some of the highest coral diversity recorded.
                  Best explored between October and April, with calmer seas and longer dives.
                </p>

              </div>

            </div>

          </div>

          {/* ================= VISUAL (SUBTLE, NON-DOMINANT) ================= */}
          <div className="relative mt-16 h-[260px] flex items-center justify-center overflow-hidden">

            {/* fade supaya gak tabrakan dengan section berikutnya */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#F4F5F2] via-transparent to-transparent pointer-events-none" />

            <div
              className="relative w-[150%] opacity-[0.35]"
              style={{ transform: "scale(1.08)" }}
            >
              <img
                src="https://res.cloudinary.com/dombq6plz/image/upload/v1776862471/svg-image-1_rgzioi.svg"
                alt="Island Fragment"
                className="w-full h-auto object-contain"
              />
            </div>

          </div>

        </div>

        {/* ================= DESKTOP (UNCHANGED — EXACT COPY) ================= */}
        <div className="hidden md:grid grid-cols-12 items-center relative">

          {/* CONTENT */}
          <div className="col-span-5 relative z-10">
            <div className="max-w-[440px]">

              <p className="text-[11px] tracking-[0.32em] text-[#2D3C68]/40 mb-6">
                THE REGIONS
              </p>

              <h3 className="font-[Gambarino] text-[52px] leading-[1.04] tracking-[-0.02em] text-[#2D3C68] mb-6">
                Two regions,<br />
                two conditions.
              </h3>

              <p className="text-[15px] leading-[1.8] text-[#2D3C68]/75 mb-5">
                Labuan Bajo sits at the edge of the Lesser Sundas — dry season runs
                April to November, with underwater visibility reaching 20–30 meters.
                Terrain shifts from volcanic ridgelines to dense coral within a short
                distance.
              </p>

              <p className="text-[15px] leading-[1.8] text-[#2D3C68]/75">
                Raja Ampat, 1,500 kilometers east, holds over 1,300 species of reef
                fish and some of the highest coral diversity recorded. Best explored
                between October and April — calmer seas, longer dives.
              </p>

            </div>
          </div>

          {/* VISUAL */}
          <div className="col-span-6 col-start-7 relative h-[660px]">

            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <div
                className="w-[520px] opacity-[0.55]"
                style={{
                  transform: "scale(1.18)",
                  transformOrigin: "right center",
                }}
              >
                <img
                  src="https://res.cloudinary.com/dombq6plz/image/upload/v1776862471/svg-image-1_rgzioi.svg"
                  alt="Island Fragment"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}


function IndonesiaKosmik() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const dividerRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setTimeout(() => {
          labelRef.current?.classList.add("sr-show");
        }, 100);

        setTimeout(() => {
          dividerRef.current?.classList.add("sr-show");
        }, 300);

        setTimeout(() => {
          leftRef.current?.classList.add("sr-show");
        }, 500);

        setTimeout(() => {
          rightRef.current?.classList.add("sr-show");
        }, 780);

        observer.disconnect();
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F4F5F2] overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      <style>{`
        .sr-show { opacity: 1 !important; transform: none !important; }

        .sr-left {
          opacity: 0;
          transform: translateX(-28px);
          transition: opacity 1.2s cubic-bezier(0.22,1,0.36,1), transform 1.2s cubic-bezier(0.22,1,0.36,1);
        }

        .sr-right {
          opacity: 0;
          transform: translateX(28px);
          transition: opacity 1.2s cubic-bezier(0.22,1,0.36,1), transform 1.2s cubic-bezier(0.22,1,0.36,1);
        }

        .sr-divider {
          opacity: 0;
          transform: scaleY(0);
          transform-origin: top;
          transition: opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1);
        }

        .sr-label {
          opacity: 0;
          transform: translateY(-6px);
          transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1);
        }

        .sr-tag {
          display: inline-block;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border: 0.5px solid rgba(45,60,104,0.18);
          border-radius: 1px;
          padding: 3px 9px;
          color: rgba(45,60,104,0.45);
          font-family: 'Switzer', sans-serif;
        }

        .sr-activity {
          display: flex;
          align-items: baseline;
          gap: 12px;
          padding: 14px 0;
          border-bottom: 0.5px solid rgba(45,60,104,0.1);
        }

        .sr-activity:first-child {
          border-top: 0.5px solid rgba(45,60,104,0.1);
        }

        .sr-num {
          font-family: 'Switzer', sans-serif;
          font-size: 9px;
          font-weight: 400;
          color: rgba(45,60,104,0.3);
          letter-spacing: 0.1em;
          min-width: 20px;
        }

        .sr-act-name {
          font-family: 'Switzer', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: rgba(45,60,104,0.8);
          letter-spacing: 0.02em;
          flex: 1;
        }

        .sr-act-duration {
          font-family: 'Switzer', sans-serif;
          font-size: 10px;
          font-weight: 300;
          color: rgba(45,60,104,0.35);
          letter-spacing: 0.06em;
        }

        .sr-ghost-num {
          position: absolute;
          font-family: 'Gambarino', serif;
          font-size: clamp(160px, 22vw, 280px);
          font-weight: 400;
          line-height: 1;
          pointer-events: none;
          user-select: none;
          color: rgba(45,60,104,0.045);
          bottom: -0.1em;
        }

        .sr-col-label {
          font-family: 'Switzer', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(45,60,104,0.4);
        }

        .sr-col-headline {
          font-family: 'Gambarino', serif;
          font-weight: 400;
          color: #2D3C68;
          line-height: 1.0;
        }

        .sr-col-desc {
          font-family: 'Switzer', sans-serif;
          font-size: 13px;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(45,60,104,0.6);
        }
      `}</style>

      {/* TOP LABEL */}
      <div
        ref={labelRef}
        className="sr-label absolute top-10 left-0 right-0 z-10 flex items-center justify-center"
      >
        <p
          style={{
            fontFamily: "Switzer, sans-serif",
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            color: "rgba(45,60,104,0.35)",
          }}
        >
          Destinations
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="relative w-full h-full flex" style={{ minHeight: "100svh" }}>

        {/* ── LEFT: LABUAN BAJO ── */}
        <div
          ref={leftRef}
          className="sr-left relative flex-1 flex flex-col justify-between overflow-hidden"
          style={{ padding: "clamp(64px, 8vh, 112px) clamp(40px, 5vw, 80px) clamp(48px, 6vh, 80px)" }}
        >
          {/* ghost number */}
          <span className="sr-ghost-num" style={{ left: "-0.05em" }}>01</span>

          {/* top content */}
          <div className="relative z-10 flex flex-col gap-6" style={{ marginTop: "clamp(32px, 5vh, 64px)" }}>
            <div className="flex items-center gap-4">
              <span className="sr-col-label">Labuan Bajo</span>
              <span className="sr-tag">West Nusa Tenggara</span>
            </div>

            <h2
              className="sr-col-headline"
              style={{ fontSize: "clamp(40px, 5.5vw, 72px)", maxWidth: "380px" }}
            >
              Rugged.<br />
              Alive.<br />
              Primordial.
            </h2>

            <p className="sr-col-desc" style={{ maxWidth: "340px" }}>
              Gateway to Komodo. Dry volcanic terrain drops into coral reefs
              of extraordinary density. Above and below the surface,
              nothing repeats.
            </p>
          </div>

          {/* activities */}
          <div className="relative z-10" style={{ maxWidth: "360px" }}>
            {[
              { name: "Diving & Snorkeling", duration: "5 hr" },
              { name: "Komodo Trekking", duration: "2 hr" },
              { name: "Padar Hiking", duration: "3 hr" },
              { name: "Pink Beach", duration: "Open" },
            ].map((a, i) => (
              <div key={a.name} className="sr-activity">
                <span className="sr-num">0{i + 1}</span>
                <span className="sr-act-name">{a.name}</span>
                <span className="sr-act-duration">{a.duration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div
          ref={dividerRef}
          className="sr-divider relative flex-shrink-0 flex flex-col items-center justify-center"
          style={{ width: "1px", background: "rgba(45,60,104,0.12)" }}
        >
          <div
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "rgba(45,60,104,0.25)",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        {/* ── RIGHT: RAJA AMPAT ── */}
        <div
          ref={rightRef}
          className="sr-right relative flex-1 flex flex-col justify-between overflow-hidden"
          style={{ padding: "clamp(64px, 8vh, 112px) clamp(40px, 5vw, 80px) clamp(48px, 6vh, 80px)" }}
        >
          {/* ghost number */}
          <span className="sr-ghost-num" style={{ right: "-0.05em" }}>02</span>

          {/* top content */}
          <div className="relative z-10 flex flex-col gap-6" style={{ marginTop: "clamp(32px, 5vh, 64px)" }}>
            <div className="flex items-center gap-4">
              <span className="sr-col-label">Raja Ampat</span>
              <span className="sr-tag">West Papua</span>
            </div>

            <h2
              className="sr-col-headline"
              style={{ fontSize: "clamp(40px, 5.5vw, 72px)", maxWidth: "380px" }}
            >
              Dense.<br />
              Remote.<br />
              Alive.
            </h2>

            <p className="sr-col-desc" style={{ maxWidth: "340px" }}>
              Over 1,300 species of reef fish. Manta rays, turtles,
              dugong — visible from the surface. The most biodiverse
              marine region on earth.
            </p>
          </div>

          {/* activities */}
          <div className="relative z-10" style={{ maxWidth: "360px" }}>
            {[
              { name: "Diving & Snorkeling", duration: "5 hr" },
              { name: "Village Tour", duration: "2 hr" },
              { name: "Piaynemo Hiking", duration: "3 hr" },
              { name: "Manta Watching", duration: "Open" },
            ].map((a, i) => (
              <div key={a.name} className="sr-activity">
                <span className="sr-num">0{i + 1}</span>
                <span className="sr-act-name">{a.name}</span>
                <span className="sr-act-duration">{a.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}







function ExperienceStructure() {
  const sectionRef = useRef(null);

  const destinations = [
    {
      name: "Raja Ampat",
      hero:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776869679/ChatGPT_Image_Apr_22_2026_09_52_18_PM_ylbg4q.png",
      mainImage:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776869680/ChatGPT_Image_Apr_22_2026_08_28_23_PM_1_pbeqgf.png",
      description:
        "Over 1,300 reef fish species. Visibility up to 30 meters. The densest marine ecosystem on the planet — where movement happens beneath you, not around you.",
      meta: "Best: Oct – Apr · Calm seas · Long dives",
      gallery: [
        {
          img: "https://res.cloudinary.com/dombq6plz/image/upload/v1776869680/ChatGPT_Image_Apr_22_2026_08_27_54_PM_n8evgp.png",
          text: "Everything moves without needing direction",
        },
        {
          img: "https://res.cloudinary.com/dombq6plz/image/upload/v1776869680/ChatGPT_Image_Apr_22_2026_08_29_52_PM_fzz6eu.png",
          text: "Islands appear, then disappear behind you",
        },
        {
          img: "https://res.cloudinary.com/dombq6plz/image/upload/v1776869887/ChatGPT_Image_Apr_22_2026_09_57_35_PM_1_vwbdwb.png",
          text: "Evenings settle into still water and low light",
        },
      ],
    },
    {
      name: "Komodo",
      hero:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776869680/ChatGPT_Image_Apr_22_2026_09_52_24_PM_ksm8ag.png",
      mainImage:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776869679/ChatGPT_Image_Apr_22_2026_09_52_27_PM_sk1t1e.png",
      description:
        "Dry terrain. Strong currents. Visibility shifts fast. A region defined by exposure — where land, heat, and elevation shape the pace of movement.",
      meta: "Best: Apr – Nov · Dry season · Strong contrast",
      gallery: [
        {
          img: "https://res.cloudinary.com/dombq6plz/image/upload/v1776869679/ChatGPT_Image_Apr_22_2026_09_52_31_PM_maxcdv.png",
          text: "Life here holds its ground, quietly",
        },
        {
          img: "https://res.cloudinary.com/dombq6plz/image/upload/v1776869679/ChatGPT_Image_Apr_22_2026_09_52_34_PM_ot1mm8.png",
          text: "Elevation reveals the full terrain",
        },
        {
          img: "https://res.cloudinary.com/dombq6plz/image/upload/v1776869679/ChatGPT_Image_Apr_22_2026_09_52_38_PM_u9zpja.png",
          text: "By evening, everything slows again",
        },
      ],
    },
  ];

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions;

        const ctx = gsap.context(() => {
          const blocks = gsap.utils.toArray(".dest-block");

          blocks.forEach((block) => {
            const hero = block.querySelector(".hero");
            const heroInner = block.querySelector(".hero-inner");
            const overlay = block.querySelector(".hero-overlay");
            const title = block.querySelector(".hero-title");
            const mainWrap = block.querySelector(".main-wrap");
            const mainImg = block.querySelector(".main-img");
            const text = block.querySelector(".text-block");
            const gallery = block.querySelectorAll(".gallery-item");

            // HERO
            gsap.fromTo(
              heroInner,
              {
                scale: isDesktop ? 1.6 : 1.15,
                clipPath: isDesktop
                  ? "inset(30% 38% 30% 38%)"
                  : "inset(10% 5% 10% 5%)",
                filter: "blur(10px)",
              },
              {
                scale: 1,
                clipPath: "inset(0% 0% 0% 0%)",
                filter: "blur(0px)",
                ease: "power3.out",
                scrollTrigger: {
                  trigger: hero,
                  start: "top 95%",
                  end: "top 40%",
                  scrub: isDesktop ? 2.8 : 1.4,
                },
              }
            );

            gsap.fromTo(
              overlay,
              { opacity: 0 },
              {
                opacity: 0.08,
                ease: "none",
                scrollTrigger: {
                  trigger: hero,
                  start: "top 55%",
                  end: "top 0%",
                  scrub: isDesktop ? 2 : 1,
                },
              }
            );

            if (isDesktop) {
              gsap.to(heroInner, {
                y: -90,
                ease: "none",
                scrollTrigger: {
                  trigger: hero,
                  start: "top top",
                  end: "bottom top",
                  scrub: 3.2,
                },
              });
            }

            // TITLE
            gsap.fromTo(
              title,
              { y: isMobile ? 50 : 120, opacity: 0, scale: 1.05 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: isMobile ? 1.6 : 2.4,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: hero,
                  start: "top 70%",
                },
              }
            );

            // MAIN IMAGE
            gsap.fromTo(
              mainWrap,
              { clipPath: "inset(100% 0% 0% 0%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: isMobile ? 1.4 : 2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: mainWrap,
                  start: "top 85%",
                },
              }
            );

            gsap.fromTo(
              mainImg,
              { scale: 1.15 },
              {
                scale: 1,
                ease: "power2.out",
                duration: isMobile ? 1.4 : 2,
                scrollTrigger: {
                  trigger: mainWrap,
                  start: "top 85%",
                },
              }
            );

            if (isDesktop) {
              gsap.to(mainImg, {
                y: -40,
                ease: "none",
                scrollTrigger: {
                  trigger: mainWrap,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 2.6,
                },
              });
            }

            // TEXT
            gsap.fromTo(
              text.children,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: isMobile ? 1.2 : 1.8,
                ease: "power2.out",
                stagger: 0.14,
                delay: 0.1,
                scrollTrigger: {
                  trigger: text,
                  start: "top 88%",
                },
              }
            );

            // GALLERY
            gallery.forEach((el, i) => {
              const img = el.querySelector("img");

              gsap.fromTo(
                el,
                { y: isMobile ? 24 : 40, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: isMobile ? 1.1 : 1.6,
                  ease: "power2.out",
                  delay: i * 0.08,
                  scrollTrigger: {
                    trigger: el,
                    start: "top 92%",
                  },
                }
              );

              gsap.fromTo(
                img,
                { scale: isMobile ? 1.04 : 1.05 },
                {
                  scale: 1,
                  duration: isMobile ? 1.2 : 2,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                  },
                }
              );
            });
          });
        }, sectionRef);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F4F5F2]">
      {destinations.map((dest, i) => (
        <div key={i} className="dest-block">

          {/* HERO */}
          <div className="hero w-full h-[75vh] md:h-[90vh] relative overflow-hidden">
            <div className="hero-inner absolute inset-0">
              <img src={dest.hero} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 pointer-events-none" />
             {/* <div className="hero-overlay absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" /> */}
            </div>

            <div className="absolute inset-0 flex items-end md:items-center justify-start md:justify-center px-5 pb-10 md:pb-0">
              <h2 className="hero-title text-white font-[Gambarino] text-[56px] md:text-[72px] opacity-0">
                {dest.name}
              </h2>
            </div>
          </div>

          {/* MAIN */}
          <div className="mt-[48px] md:mt-[120px]">

            {/* MOBILE */}
            <div className="md:hidden">
              <div className="main-wrap overflow-hidden aspect-[3/2] mr-8">
                <img src={dest.mainImage} className="main-img w-full h-full object-cover" />
              </div>

              <div className="text-block mt-8 pl-6 pr-4 border-l border-[#2D3C68]/15 ml-5">
                <p className="text-[14px] leading-[1.9] text-[#2D3C68]/85 mb-5">
                  {dest.description}
                </p>

                <p className="text-[11px] tracking-[0.18em] uppercase text-[#2D3C68]/40 mb-7">
                  {dest.meta}
                </p>

                <button className="group border border-[#2D3C68]/40 px-5 py-[10px] text-[11px] tracking-[0.12em] text-[#2D3C68] transition min-h-[44px]">
                  <span className="inline-block transition-transform duration-300 group-hover:-translate-y-[1px]">
                    Explore →
                  </span>
                </button>
              </div>
            </div>

            {/* DESKTOP */}
            <div className="hidden md:block max-w-[1200px] mx-auto px-6">
              <div className="grid grid-cols-12 gap-14 items-center">
                <div className="col-span-7">
                  <div className="main-wrap overflow-hidden aspect-[16/10]">
                    <img src={dest.mainImage} className="main-img w-full h-full object-cover" />
                  </div>
                </div>

                <div className="col-span-5">
                  <div className="text-block max-w-[340px]">
                    <p className="text-[15px] leading-[1.8] text-[#2D3C68]/85 mb-6">
                      {dest.description}
                    </p>

                    <p className="text-[12px] tracking-[0.15em] text-[#2D3C68]/45 mb-8">
                      {dest.meta}
                    </p>

                    <button className="border border-[#2D3C68]/50 px-6 py-3 text-[12px] tracking-[0.12em] text-[#2D3C68] hover:bg-[#2D3C68] hover:text-white transition">
                      Explore →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GALLERY */}
          <div className="mt-[52px] md:mt-[120px] pb-[80px] md:pb-[140px]">

            {/* MOBILE */}
            <div className="md:hidden px-4">
              <div className="gallery-item mb-3">
                <div className="aspect-[3/2] overflow-hidden mb-2">
                  <img src={dest.gallery[0].img} className="w-full h-full object-cover" />
                </div>
                <p className="text-[13px] text-[#2D3C68]/65 pl-1">
                  {dest.gallery[0].text}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 items-start">
                <div className="gallery-item">
                  <div className="aspect-[4/5] overflow-hidden mb-2">
                    <img src={dest.gallery[1].img} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[12px] text-[#2D3C68]/65">
                    {dest.gallery[1].text}
                  </p>
                </div>

                <div className="gallery-item mt-8">
                  <div className="aspect-[4/5] overflow-hidden mb-2">
                    <img src={dest.gallery[2].img} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[12px] text-[#2D3C68]/65">
                    {dest.gallery[2].text}
                  </p>
                </div>
              </div>
            </div>

            {/* DESKTOP */}
            <div className="hidden md:block max-w-[1200px] mx-auto px-6">
              <div className="grid grid-cols-3 gap-10">
                {dest.gallery.map((item, j) => (
                  <div key={j} className="gallery-item">
                    <div className="aspect-[16/10] overflow-hidden mb-4">
                      <img src={item.img} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[14px] text-[#2D3C68]/70">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      ))}
    </section>
  );
}



 function HowItWorks() {
  const elRefs = useRef([]);
 
  useEffect(() => {
    elRefs.current.filter(Boolean).forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(14px)";
 
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.transition =
                "opacity 900ms ease, transform 900ms cubic-bezier(0.22,1,0.36,1)";
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, i * 100);
            obs.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      obs.observe(el);
    });
  }, []);
 
  const r = (i) => (el) => (elRefs.current[i] = el);
 
  return (
    <section className="bg-[#F4F5F2] py-[80px] px-6">
      <div className="max-w-[1200px] mx-auto">
 
        {/* Label */}
        <p
          ref={r(0)}
          className="text-[10px] tracking-[0.4em] uppercase mb-[64px]"
          style={{ color: "rgba(45,60,104,0.38)" }}
        >
          How It Works
        </p>
 
        {/* PRIMARY STATEMENT — large, dominant, the one thing */}
        <div ref={r(1)} className="mb-[56px] max-w-[680px]">
          <h2
            className="font-[Gambarino] leading-[1.06]"
            style={{
              fontSize: "clamp(40px, 4.5vw, 58px)",
              color: "#2D3C68",
            }}
          >
            You book the whole boat.
            <br />
            <span style={{ color: "rgba(45,60,104,0.38)" }}>
              Not a cabin. Not a shared trip.
            </span>
          </h2>
        </div>
 
        {/* SUPPORTING — different weight, different rhythm, NOT a list */}
        <div
          ref={r(2)}
          className="max-w-[560px] ml-auto"
          style={{ paddingTop: "8px" }}
        >
          <p
            className="text-[15px] leading-[1.9]"
            style={{ color: "rgba(45,60,104,0.65)" }}
          >
            The vessel holds up to 12 guests across 4 cabins.
            When you book, those slots are yours entirely.
          </p>
 
          <p
            className="text-[15px] leading-[1.9] mt-6"
            style={{ color: "rgba(45,60,104,0.65)" }}
          >
            There is no fixed itinerary. The route is planned
            with you before departure — and adjusted as you go,
            based on conditions and preference.
          </p>
        </div>
 
        {/* DIVIDER — subtle, gives breathing room */}
        <div
          ref={r(3)}
          className="my-[72px]"
          style={{
            height: "1px",
            background: "rgba(45,60,104,0.09)",
            maxWidth: "480px",
          }}
        />
 
        {/* BRIDGE — low weight, leads to pricing */}
        <div
          ref={r(4)}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        >
          <p
            className="text-[13px] leading-[1.85]"
            style={{ color: "rgba(45,60,104,0.45)", maxWidth: "340px" }}
          >
            Pricing is based on trip duration and destination.
            <br />No hidden fees.
          </p>
 
          <button
            className="self-start md:self-auto text-[11px] tracking-[0.2em] uppercase"
            style={{
              background: "#2D3C68",
              color: "#F4F5F2",
              padding: "14px 36px",
              border: "none",
              cursor: "pointer",
              transition: "background 300ms ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(45,60,104,0.85)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#2D3C68")
            }
          >
            See Pricing
          </button>
        </div>
 
      </div>
    </section>
  );
}


function ClosingCTA() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (!sectionRef.current || !imageRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      let progress = rect.top / windowH;

      // clamp biar stabil di semua device
      progress = Math.max(-1, Math.min(1, progress));

      // responsive strength (mobile lebih subtle)
      const isMobile = window.innerWidth < 768;
      const strength = isMobile ? -14 : -28;

      const translateY = progress * strength;

      imageRef.current.style.transform = `translateY(${translateY}px) scale(1.05)`;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        handleScroll();
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-[80px] md:py-[120px]"
      style={{
        background: "var(--color-dark)",
      }}
    >
      {/* IMAGE LAYER */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imageRef}
          src="https://res.cloudinary.com/dombq6plz/image/upload/v1777217651/ChatGPT_Image_Apr_26_2026_10_30_34_PM_1_yc2ihk.png"
          alt=""
          className="w-full h-full object-cover will-change-transform"
          style={{
            transform: "scale(1.05)",
          }}
        />
      </div>

      {/* DARK WASH (UNCHANGED) */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(26,26,26,0.68)",
        }}
      />

      {/* DEPTH GRADIENT (UNCHANGED) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(45,60,104,0.32), transparent)",
        }}
      />

      {/* CONTENT */}
      <div className="max-w-[1200px] mx-auto relative">
        {/* LABEL */}
        <p
          className="text-[11px] tracking-[0.3em] uppercase mb-[32px] md:mb-[48px]"
          style={{
            color: "rgba(244,245,242,0.4)",
          }}
        >
          Plan Your Trip
        </p>

        {/* HEADLINE */}
        <div className="mb-[40px] md:mb-[56px]">
          <h2
            className="font-[Gambarino] leading-[1.05]"
            style={{
              fontSize: "clamp(42px, 8vw, 72px)",
              color: "var(--color-base)",
              maxWidth: "640px",
            }}
          >
            When do you
            <br />
            want to leave?
          </h2>
        </div>

        {/* CONTENT ROW */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 md:gap-12">
          {/* TEXT */}
          <p
            className="text-[14px] leading-[1.8] max-w-[520px] md:max-w-[320px]"
            style={{
              color: "rgba(244,245,242,0.8)",
            }}
          >
            Share your dates, your pace, and who you’re coming with.
            We’ll shape the journey around you.
          </p>

          {/* CTA GROUP */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 sm:gap-10 md:translate-y-[6px] w-full sm:w-auto">
            {/* PRIMARY */}
            <button
              className="w-full sm:w-auto text-[11px] tracking-[0.2em] uppercase"
              style={{
                background: "var(--color-base)",
                color: "var(--color-dark)",
                padding: "16px 42px",
                border: "none",
                cursor: "pointer",
                transition:
                  "transform 300ms ease, opacity 300ms ease, box-shadow 300ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.92";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 30px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Start a Conversation
            </button>

            {/* SECONDARY */}
            <button
              className="group flex items-center gap-3 text-[11px] tracking-[0.18em] uppercase"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(244,245,242,0.6)",
                transition: "color 300ms ease",
                padding: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "rgba(244,245,242,0.8)";
                e.currentTarget.querySelector("span").style.width = "40px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(244,245,242,0.6)";
                e.currentTarget.querySelector("span").style.width = "24px";
              }}
            >
              See Pricing
              <span
                style={{
                  display: "block",
                  height: "1px",
                  width: "24px",
                  background: "currentColor",
                  transition: "width 400ms cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
 


function Destinations() {
  const data = [
    {
      title: "Komodo Islands",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_24_PM_lzlhwx.png",
      description:
        "Experience the raw beauty of Komodo National Park, where dramatic landscapes meet thriving marine life. From rugged trails to vibrant reefs, every moment feels untouched and alive.",
      highlights: [
        "Hiking",
        "Snorkeling",
        "Paddle boarding",
        "Diving",
        "Private beach dinner",
        "Komodo dragons",
      ],
    },
    {
      title: "Raja Ampat",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_18_PM_dihjfs.png",
      description:
        "Raja Ampat’s untouched islands and crystalline waters create a sanctuary of biodiversity. Every journey here feels like entering a different world — quiet, vast, and deeply immersive.",
      highlights: [
        "Birdwatching",
        "Snorkeling",
        "Kayaking",
        "Diving",
        "Private beach dinner",
        "Manta rays",
      ],
    },
  ];

  return (
    <section className="bg-[#F5F2ED]">

      {/* ================= KOMODO — CENTERED CINEMATIC ================= */}
      <div className="py-[140px] px-6">

        <div className="max-w-[1100px] mx-auto text-center">

          <h2 className="font-[Canela] text-[36px] md:text-[56px] text-[#0F172A] tracking-[0.2em] uppercase">
            {data[0].title}
          </h2>

          <div className="mt-12 w-full h-[420px] md:h-[520px] overflow-hidden">

            <img
              src={data[0].image}
              alt={data[0].title}
              className="w-full h-full object-cover"
            />

          </div>

          <p className="mt-10 max-w-[720px] mx-auto text-[15px] text-[#0F172A]/70 leading-relaxed">
            {data[0].description}
          </p>

          {/* highlights — editorial inline */}
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[13px] text-[#0F172A]/60">

            {data[0].highlights.map((item, i) => (
              <span key={i}>
                {item}
              </span>
            ))}

          </div>

          {/* CTA — only here */}
          <div className="mt-12 flex justify-center gap-4">

            <button className="px-6 py-3 text-[12px] tracking-[0.25em] uppercase bg-[#8FA7A3] text-white rounded-full">
              Reserve
            </button>

            <button className="px-6 py-3 text-[12px] tracking-[0.25em] uppercase border border-[#0F172A]/30 text-[#0F172A] rounded-full">
              Book Initial Call
            </button>

          </div>

        </div>

      </div>

      {/* ================= RAJA AMPAT — SPLIT (BREAK RHYTHM) ================= */}
      <div className="py-[140px] px-6">

        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT — TEXT */}
          <div>

            <h2 className="font-[Canela] text-[36px] md:text-[56px] text-[#0F172A] leading-[1.1]">
              {data[1].title}
            </h2>

            <p className="mt-6 text-[15px] text-[#0F172A]/70 leading-relaxed max-w-[480px]">
              {data[1].description}
            </p>

            {/* highlights — stacked minimal */}
            <div className="mt-8 space-y-2 text-[14px] text-[#0F172A]/60">

              {data[1].highlights.map((item, i) => (
                <div key={i}>{item}</div>
              ))}

            </div>

          </div>

          {/* RIGHT — IMAGE */}
          <div className="w-full h-[420px] md:h-[520px] overflow-hidden">

            <img
              src={data[1].image}
              alt={data[1].title}
              className="w-full h-full object-cover"
            />

          </div>

        </div>

      </div>

    </section>
  );
}


function ExperienceBreak() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (!sectionRef.current || !imageRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // progress: -1 → 1
      const progress = rect.top / windowH;

      // subtle parallax
      const translateY = progress * -40;

      imageRef.current.style.transform = `translateY(${translateY}px) scale(1.04)`;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        handleScroll();
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[55vh] w-full  overflow-hidden bg-black"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imageRef}
          src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/06_f2yr7e.webp"
          alt=""
          className="w-full h-full object-cover will-change-transform"
          style={{
            transform: "scale(1.04)",
          }}
        />
      </div>
    </section>
  );
}