"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "../../lib/gsap"
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageTransition } from "@/components/PageTransitionProvider";
import TransitionLink from "@/components/TransitionLink";

gsap.registerPlugin(ScrollTrigger);

import Footer from '../../components/Footer'

const DISABLE_ANIMATION = false; // ubah ke false kalau mau animasi aktif

export default function Page() {
  return (
    <main className="bg-[#0a0f14] text-white overflow-hidden">
       <Hero/>
       {/* <WorldDefinition/>    */}
       <DestinationsArchipelago/>
       {/* <IndonesiaKosmik/> */}
       {/* <RegionFragment/> */}
       <ExperienceStructure/> 
       {/* <ExperienceBreak/> */}
       {/* <HowItWorks/> */}
       {/* <ClosingCTA/> */}
      <Footer/> 
    </main>
  )
}


function Hero() {
  const pathRefD = useRef(null);
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
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const path = pathRefD.current;

    if (!path) return;

    const len = path.getTotalLength();
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    if (stage === "covering") {
      entranceTlRef.current?.kill();
      entranceTlRef.current = null;
      gsap.set(path, {
        strokeDasharray: len,
        strokeDashoffset: len,
        opacity: 1,
      });
      return;
    }

    if (hasPlayedEntranceRef.current) {
      gsap.set(path, {
        strokeDasharray: len,
        strokeDashoffset: 0,
        opacity: 1,
      });
      return;
    }

    if (reduce || !isDesktop) {
      gsap.set(path, {
        strokeDasharray: len,
        strokeDashoffset: 0,
        opacity: 1,
      });
      hasPlayedEntranceRef.current = true;
      return;
    }

    hasPlayedEntranceRef.current = true;
    entranceTlRef.current?.kill();
    gsap.set(path, {
      strokeDasharray: len,
      strokeDashoffset: len,
      opacity: 1,
    });
    entranceTlRef.current = gsap.timeline();
    entranceTlRef.current.to(path, {
      strokeDashoffset: 0,
      duration: 10.4,
      ease: "none",
    });
  }, [stage]);
 
  return (
    <section className="relative h-screen bg-[#2D3C68] overflow-hidden">
 
      {/* MAP — mobile opacity bumped to 0.24 for atmosphere without the line */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <img
          src="https://res.cloudinary.com/dombq6plz/image/upload/v1776257972/indonesia_ruqj89.svg"
          alt=""
          aria-hidden="true"
          className="
            w-[220%] md:w-[180%]
            opacity-[0.24] md:opacity-[0.12]
            invert
            object-contain
            md:translate-x-[-18%] translate-x-[-10%]
            translate-y-[8%] md:translate-y-[6%]
            scale-[1.3] md:scale-[1.4]
            blur-[1px]
          "
        />
      </div>
 
      {/* ROUTE — desktop only */}
      <svg
        viewBox="0 0 1000 500"
        className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="routeGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#B08D57" stopOpacity="0.08" />
            <stop offset="30%"  stopColor="#D4A853" stopOpacity="0.8"  />
            <stop offset="60%"  stopColor="#E0C48A" stopOpacity="1"    />
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
              Twelve guests across a shifting archipelago — no fixed route, only the sea,
              the season, and where it takes you next
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

function DestinationsArchipelago() {
  const sectionRef        = useRef(null);
  const mapDesktopRef     = useRef(null);
  const contentMobileRef  = useRef(null);
  const contentDesktopRef = useRef(null);
 
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
    const ctx = gsap.context(() => {
 
      if (reduce) {
        gsap.set(
          [
            ...Array.from(contentMobileRef.current?.children || []),
            ...Array.from(contentDesktopRef.current?.children || []),
          ],
          { opacity: 1, y: 0 }
        );
        return;
      }
 
      const mm = gsap.matchMedia();
 
      // ── Desktop ───────────────────────────────────────────────
      mm.add('(min-width: 768px)', () => {
 
        // Map: scroll-driven parallax — purposeful, not decorative float
        gsap.fromTo(mapDesktopRef.current,
          { y: 0 },
          {
            y: -28,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
 
        // Content entrance
        gsap.fromTo(
          Array.from(contentDesktopRef.current.children),
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.13,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      });
 
      // ── Mobile ────────────────────────────────────────────────
      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(
          Array.from(contentMobileRef.current.children),
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
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
      className="relative bg-[#F4F5F2] overflow-hidden py-[80px] md:py-[100px]"
    >
 
      {/* ── ATMOSPHERIC BRIDGE IN ── */}
      <div
        className="absolute top-0 left-0 right-0 h-[70px] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(45,60,104,0.06) 0%, transparent 100%)' }}
      />
 
      {/* ── COOL RADIAL ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 40% 50%, rgba(45,60,104,0.04) 0%, transparent 70%)' }}
      />
 
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-14 relative">
 
        {/* ── MOBILE ── */}
        <div className="block md:hidden">
 
          <div className="relative h-[260px] flex items-center justify-center mb-10 overflow-hidden">
            <div className="relative w-[150%]">
              <img
                src="https://res.cloudinary.com/dombq6plz/image/upload/v1776257972/indonesia_ruqj89.svg"
                alt=""
                aria-hidden="true"
                className="w-full h-auto object-contain opacity-[0.45]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#F4F5F2] via-transparent to-[#F4F5F2] pointer-events-none" />
            </div>
          </div>
 
          <div ref={contentMobileRef} className="max-w-[380px]">
 
            <p className="text-[10px] tracking-[0.28em] text-[#2D3C68]/45 uppercase mb-4">
              The Archipelago
            </p>
 
            <h2 className="font-[Gambarino] text-[36px] leading-[1.06] tracking-[-0.02em] text-[#2D3C68] mb-6">
              17,000 islands.
              <br />
              Mostly ocean.
            </h2>
 
            <p className="text-[14px] leading-[1.78] text-[#2D3C68]/70 mb-4">
              Indonesia stretches 5,000 kilometers from west to east —
              wider than continental Europe, shaped more by water than land.
            </p>
 
            <p className="text-[14px] leading-[1.78] text-[#2D3C68]/70 mb-5">
              Serenity moves through two of its waters. Komodo and Raja Ampat —
              1,500 kilometers apart, and nothing alike.
            </p>
 
            <p className="text-[12px] leading-[1.70] text-[#2D3C68]/42">
              Komodo: volcanic ridgelines, strong currents, life that has existed
              here for millions of years. Raja Ampat: still water, limestone
              islands, 1,300 species of reef fish in a single stretch of ocean.
            </p>
 
          </div>
        </div>
 
        {/* ── DESKTOP ── */}
        <div className="hidden md:grid grid-cols-12 items-center">
 
          {/* Map — scroll parallax only, no ambient float */}
          <div className="col-span-6 relative h-[620px] flex items-center justify-center overflow-hidden">
            <div
              ref={mapDesktopRef}
              className="relative w-[160%] will-change-transform"
            >
              <img
                src="https://res.cloudinary.com/dombq6plz/image/upload/v1776257972/indonesia_ruqj89.svg"
                alt=""
                aria-hidden="true"
                className="w-full h-auto object-contain opacity-[0.45]"
              />
              <div className="absolute left-0 top-0 w-[30%] h-full bg-gradient-to-r from-[#F4F5F2] to-transparent pointer-events-none" />
            </div>
          </div>
 
          {/* Content */}
          <div className="col-span-5 col-start-8 relative z-10">
            <div ref={contentDesktopRef} className="max-w-[420px]">
 
              <p className="text-[11px] tracking-[0.30em] text-[#2D3C68]/40 uppercase mb-6">
                The Archipelago
              </p>
 
              <h2 className="font-[Gambarino] text-[54px] leading-[1.04] tracking-[-0.025em] text-[#2D3C68] mb-7">
                17,000+ islands.
                <br />
                Mostly ocean.
              </h2>
 
              {/* Para 1 — scale */}
              <p className="text-[15px] leading-[1.82] text-[#2D3C68]/72 mb-5">
                Indonesia stretches 5,000 kilometers from west to east —
                wider than continental Europe, shaped more by water than land.
              </p>
 
              {/* Para 2 — introduce */}
              <p className="text-[15px] leading-[1.82] text-[#2D3C68]/72 mb-6">
                Serenity moves through two of its waters. Komodo and Raja Ampat —
                1,500 kilometers apart, and nothing alike.
              </p>
 
              {/* Para 3 — character, muted */}
              <p className="text-[13px] leading-[1.75] text-[#2D3C68]/42">
                Komodo: volcanic ridgelines, strong currents, life that has
                existed here for millions of years. Raja Ampat: still water,
                limestone islands, 1,300 species of reef fish in a single
                stretch of ocean.
              </p>
 
            </div>
          </div>
 
        </div>
      </div>
 
      {/* ── ATMOSPHERIC BRIDGE OUT ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[60px] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(45,60,104,0.04))' }}
      />
 
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
  const ikatRef    = useRef(null);
   
const DESTINATIONS = [
  {
    id: "labuan-bajo",
    name: "Labuan Bajo",
    dark: false,
    atmosphere:
      "radial-gradient(circle at 68% 22%, rgba(176,141,87,0.05), transparent 54%)",
    sumbaIkat: true,
    hero: "https://res.cloudinary.com/dombq6plz/image/upload/v1776869680/ChatGPT_Image_Apr_22_2026_09_52_24_PM_ksm8ag.png",
    mainImage:
      "https://res.cloudinary.com/dombq6plz/image/upload/v1776869679/ChatGPT_Image_Apr_22_2026_09_52_27_PM_sk1t1e.png",
    description:
      "The terrain here is ancient. Volcanic ridgelines drop sharply into coral systems, currents run strong through the straits, and Komodo dragons move through the landscape as if forty million years have changed nothing.",
    meta: "Best: April – November · Dry season · Strong currents",
    eyebrow: "East Nusa Tenggara",
    gallery: [
      {
        img: "https://res.cloudinary.com/dombq6plz/image/upload/v1776869679/ChatGPT_Image_Apr_22_2026_09_52_31_PM_maxcdv.png",
        text: "The anchor drops before sunrise. By eight, already on the island.",
      },
      {
        img: "https://res.cloudinary.com/dombq6plz/image/upload/v1776869679/ChatGPT_Image_Apr_22_2026_09_52_34_PM_ot1mm8.png",
        text: "Padar's ridgeline from the top. Serenity below.",
      },
      {
        img: "https://res.cloudinary.com/dombq6plz/image/upload/v1776869679/ChatGPT_Image_Apr_22_2026_09_52_38_PM_u9zpja.png",
        text: "Back on deck by noon — the current took everything it had.",
      },
    ],
  },
 
  {
    id: "raja-ampat",
    name: "Raja Ampat",
    dark: false,
    atmosphere:
      "radial-gradient(circle at 35% 45%, rgba(176,141,87,0.04), transparent 58%)",
    sumbaIkat: false,
    hero: "https://res.cloudinary.com/dombq6plz/image/upload/v1776869679/ChatGPT_Image_Apr_22_2026_09_52_18_PM_ylbg4q.png",
    mainImage:
      "https://res.cloudinary.com/dombq6plz/image/upload/v1776869680/ChatGPT_Image_Apr_22_2026_08_28_23_PM_1_pbeqgf.png",
    description:
      "Nothing prepares you for the stillness. Visibility reaches thirty meters. Beneath the surface, 1,300 species of reef fish — moving slowly, unhurried, the way everything moves in Raja Ampat.",
    meta: "Best: October – April · Calm seas · Deep visibility",
    eyebrow: "West Papua",
    gallery: [
      {
        img: "https://res.cloudinary.com/dombq6plz/image/upload/v1776869680/ChatGPT_Image_Apr_22_2026_08_27_54_PM_n8evgp.png",
        text: "The limestone karst from the water, just after dawn.",
      },
      {
        img: "https://res.cloudinary.com/dombq6plz/image/upload/v1776869680/ChatGPT_Image_Apr_22_2026_08_29_52_PM_fzz6eu.png",
        text: "Thirty meters of visibility. The reef floor feels close.",
      },
      {
        img: "https://res.cloudinary.com/dombq6plz/image/upload/v1776869887/ChatGPT_Image_Apr_22_2026_09_57_35_PM_1_vwbdwb.png",
        text: "Dinner on deck. The kind of quiet you stop trying to fill.",
      },
    ],
  },
];
 
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 
    const ctx = gsap.context(() => {
 
      /* ── REDUCED MOTION — set all final states ── */
 
      if (reduce) {
        gsap.set(
          [
            ".dest-hero-inner",
            ".dest-main-img",
            ".dest-gallery-img",
            ".dest-title-wrap",
            ".dest-eyebrow",
            ".dest-text-block > *",
            ".dest-gallery-item",
          ],
          {
            opacity:  1,
            y:        0,
            scale:    1,
            filter:   "blur(0px)",
            clipPath: "inset(0% 0% 0% 0%)",
          }
        );
        return;
      }
 
      /* ── SUMBA IKAT rotation ── */
 
      if (ikatRef.current) {
        gsap.to(ikatRef.current, {
          rotation: 360,
          duration: 220,
          ease:     "none",
          repeat:   -1,
        });
      }
 
      /* ── RESPONSIVE ANIMATION SYSTEM ── */
 
      const mm = gsap.matchMedia();
 
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile:  "(max-width: 767px)",
        },
        (context) => {
          const { isDesktop } = context.conditions;
 
          gsap.utils.toArray(".dest-block").forEach((block) => {
            const hero      = block.querySelector(".dest-hero");
            const heroInner = block.querySelector(".dest-hero-inner");
            const heroImg   = block.querySelector(".dest-hero-img");
            const eyebrow   = block.querySelector(".dest-eyebrow");
            const titleWrap = block.querySelector(".dest-title-wrap");
            const mainWrap  = block.querySelector(".dest-main-wrap");
            const mainImg   = block.querySelector(".dest-main-img");
            const textChildren = block.querySelectorAll(".dest-text-block > *");
            const gallery   = block.querySelectorAll(".dest-gallery-item");
 
            /* ── HERO REVEAL — clip + scale + blur scrub ── */
 
            gsap.fromTo(
              heroInner,
              {
                scale:    isDesktop ? 1.16 : 1.06,
                clipPath: isDesktop
                  ? "inset(16% 20% 16% 20%)"
                  : "inset(6% 3% 6% 3%)",
                filter: "blur(8px)",
              },
              {
                scale:    1,
                clipPath: "inset(0% 0% 0% 0%)",
                filter:   "blur(0px)",
                ease:     "power3.out",
                scrollTrigger: {
                  trigger:            hero,
                  start:              "top 92%",
                  end:                "top 34%",
                  scrub:              isDesktop ? 1.8 : 1,
                  invalidateOnRefresh: true,
                },
              }
            );
 
            /* ── HERO INTERNAL PARALLAX ── */
 
            gsap.to(heroImg, {
              yPercent: isDesktop ? -10 : -6,
              ease:     "none",
              scrollTrigger: {
                trigger:            hero,
                start:              "top bottom",
                end:                "bottom top",
                scrub:              1.2,
                invalidateOnRefresh: true,
              },
            });
 
            /* ── EYEBROW ── */
 
            gsap.fromTo(
              eyebrow,
              { opacity: 0, y: 18 },
              {
                opacity: 1,
                y:       0,
                duration: 1.1,
                ease:    "power2.out",
                scrollTrigger: {
                  trigger:            hero,
                  start:              "top 60%",
                  invalidateOnRefresh: true,
                },
              }
            );
 
            /* ── TITLE ── */
 
            gsap.fromTo(
              titleWrap,
              { opacity: 0, y: isDesktop ? 72 : 34 },
              {
                opacity:  1,
                y:        0,
                duration: isDesktop ? 1.8 : 1.1,
                ease:     "power3.out",
                scrollTrigger: {
                  trigger:            hero,
                  start:              "top 56%",
                  invalidateOnRefresh: true,
                },
              }
            );
 
            /* ── MAIN IMAGE REVEAL + INTERNAL PARALLAX ── */
 
            gsap.fromTo(
              mainImg,
              { opacity: 0, y: 56, scale: 1.12 },
              {
                opacity:  1,
                y:        0,
                scale:    1.08, // stays slightly scaled to buffer yPercent parallax below
                duration: isDesktop ? 1.6 : 1.05,
                ease:     "power2.out",
                scrollTrigger: {
                  trigger:            mainWrap,
                  start:              "top 82%",
                  invalidateOnRefresh: true,
                },
              }
            );
 
            gsap.to(mainImg, {
              yPercent: isDesktop ? -8 : -5,
              ease:     "none",
              scrollTrigger: {
                trigger:            mainWrap,
                start:              "top bottom",
                end:                "bottom top",
                scrub:              1,
                invalidateOnRefresh: true,
              },
            });
 
            /* ── TEXT BLOCK ── */
 
            gsap.fromTo(
              textChildren,
              { opacity: 0, y: 20 },
              {
                opacity:  1,
                y:        0,
                duration: 1.05,
                stagger:  0.07,
                ease:     "power2.out",
                scrollTrigger: {
                  trigger:            mainWrap,
                  start:              "top 72%",
                  invalidateOnRefresh: true,
                },
              }
            );
 
            /* ── GALLERY ITEMS ── */
 
            gallery.forEach((item, index) => {
              const img = item.querySelector(".dest-gallery-img");
 
              // entrance
              gsap.fromTo(
                item,
                { opacity: 0, y: 18 },
                {
                  opacity:  1,
                  y:        0,
                  duration: 1,
                  ease:     "power2.out",
                  scrollTrigger: {
                    trigger:            item,
                    start:              "top 94%",
                    invalidateOnRefresh: true,
                  },
                }
              );
 
              /*
                Ken Burns — image moves within overflow-hidden container.
                Container stays fixed in grid (not scattered).
                Different rates create visual variety WITHIN each frame,
                not across the grid layout.
              */
              gsap.to(img, {
                yPercent: index % 2 === 0 ? -7 : -11,
                ease:     "none",
                scrollTrigger: {
                  trigger:            item,
                  start:              "top bottom",
                  end:                "bottom top",
                  scrub:              1,
                  invalidateOnRefresh: true,
                },
              });
            });
          });
        }
      );
    }, sectionRef);
 
    return () => ctx.revert();
  }, []);
 
  return (
    <section ref={sectionRef}>
      {DESTINATIONS.map((dest) => (
        <div key={dest.id}>
          <div className="dest-block relative overflow-hidden bg-[#F4F5F2]">
 
            {/* atmosphere */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none z-0"
              style={{ background: dest.atmosphere }}
            />
 
            {/* Sumba Ikat — Labuan Bajo only */}
            {dest.sumbaIkat && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -right-[24%] top-[18%] w-[82vw] max-w-[1200px] opacity-[0.028]">
                  <img
                    ref={ikatRef}
                    src="https://res.cloudinary.com/dombq6plz/image/upload/v1778486588/ChatGPT_Image_May_11_2026_03_01_56_PM_1_v2exmt.png"
                    alt=""
                    aria-hidden="true"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            )}
 
            {/* ── HERO ─────────────────────────────── */}
 
            <div className="dest-hero relative overflow-hidden h-[60vh] md:h-[72vh]">
              <div className="dest-hero-inner absolute inset-0 will-change-transform overflow-hidden">
                <img
                  src={dest.hero}
                  alt={dest.name}
                  className="dest-hero-img absolute inset-0 w-full h-[118%] object-cover will-change-transform"
                />
 
                <div className="absolute inset-0 bg-black/30" />
 
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(
                      to bottom,
                      rgba(0,0,0,0.02),
                      rgba(0,0,0,0.16) 35%,
                      rgba(0,0,0,0.46)
                    )`,
                  }}
                />
 
                <div
                  className="absolute inset-0 opacity-[0.04] mix-blend-soft-light"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 20% 30%, rgba(255,255,255,0.9) 0%, transparent 32%),
                      radial-gradient(circle at 70% 60%, rgba(255,255,255,0.5) 0%, transparent 36%)
                    `,
                  }}
                />
              </div>
 
              <div className="absolute inset-0 flex items-end md:items-center px-6 md:px-10 lg:px-14 pb-10 md:pb-0">
                <div className="max-w-[820px]">
                  <p className="dest-eyebrow text-[#F4F5F2]/70 text-[10px] md:text-[11px] tracking-[0.32em] uppercase mb-5">
                    {dest.eyebrow}
                  </p>
                  <div className="overflow-hidden">
                    <div className="dest-title-wrap">
                      <h2 className="font-[Gambarino] text-[#F4F5F2] text-[48px] md:text-[74px] lg:text-[86px] leading-[0.92] tracking-[-0.045em]">
                        {dest.name}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
 
            {/* ── MAIN ─────────────────────────────── */}
 
            <div className="relative z-10 pt-[76px] md:pt-[132px]">
 
              {/* mobile */}
              <div className="md:hidden">
                <div className="pr-10 pl-6">
                  <div className="dest-main-wrap overflow-hidden aspect-[3/2]">
                    <img
                      src={dest.mainImage}
                      alt={dest.name}
                      className="dest-main-img w-full h-[118%] object-cover will-change-transform"
                    />
                  </div>
                </div>
                <div className="pt-12 px-6">
                  <div className="dest-text-block max-w-[520px]">
                    <p className="text-[#B08D57] text-[11px] tracking-[0.28em] uppercase mb-4">
                      {dest.name}
                    </p>
                    <p className="text-[14px] leading-[1.95] mb-7 text-[#2D3C68]/76">
                      {dest.description}
                    </p>
                    <p className="text-[11px] tracking-[0.18em] uppercase mb-10 text-[#2D3C68]/38">
                      {dest.meta}
                    </p>
                  </div>
                </div>
              </div>
 
              {/* desktop */}
              <div className="hidden md:grid grid-cols-12 gap-12 items-start max-w-[1340px] mx-auto px-10 lg:px-14">
                <div className="col-span-7">
                  <div className="pr-12">
                    <div className="dest-main-wrap overflow-hidden aspect-[16/10] -mr-20">
                      <img
                        src={dest.mainImage}
                        alt={dest.name}
                        className="dest-main-img w-full h-[118%] object-cover will-change-transform"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-4 col-start-9 pt-16">
                  <div className="dest-text-block max-w-[360px]">
                    <p className="text-[#B08D57] text-[11px] tracking-[0.3em] uppercase mb-5">
                      {dest.eyebrow}
                    </p>
                    <p className="text-[15px] leading-[2] mb-8 text-[#2D3C68]/76">
                      {dest.description}
                    </p>
                    <p className="text-[11px] tracking-[0.18em] uppercase mb-12 text-[#2D3C68]/36">
                      {dest.meta}
                    </p>
                  </div>
                </div>
              </div>
 
            </div>
 
            {/* ── GALLERY ──────────────────────────── */}
 
            <div className="relative z-10 pt-[110px] md:pt-[170px] pb-[110px] md:pb-[170px]">
 
              {/* mobile gallery */}
              <div className="md:hidden px-6">
                <div className="space-y-14">
 
                  {/* first image — full width */}
                  <div className="dest-gallery-item">
                    <div className="aspect-[4/5] overflow-hidden mb-5">
                      <img
                        src={dest.gallery[0].img}
                        alt=""
                        className="dest-gallery-img w-full h-[118%] object-cover will-change-transform"
                      />
                    </div>
                    <p className="text-[13px] leading-[1.75] max-w-[270px] text-[#2D3C68]/56">
                      {dest.gallery[0].text}
                    </p>
                  </div>
 
                  {/*
                    FIX 2 — mobile gallery two-column.
                    REMOVED: `pt-12` on j === 2.
                    Both images now top-aligned within the 2-col grid.
                    Structured, no arbitrary vertical offset.
                  */}
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2].map((j) => (
                      <div key={j} className="dest-gallery-item">
                        <div className="aspect-[4/5] overflow-hidden mb-3">
                          <img
                            src={dest.gallery[j].img}
                            alt=""
                            className="dest-gallery-img w-full h-[118%] object-cover will-change-transform"
                          />
                        </div>
                        <p className="text-[12px] leading-[1.75] text-[#2D3C68]/56">
                          {dest.gallery[j].text}
                        </p>
                      </div>
                    ))}
                  </div>
 
                </div>
              </div>
 
              {/* desktop gallery */}
              <div className="hidden md:grid grid-cols-12 gap-6 items-start max-w-[1340px] mx-auto px-10 lg:px-14">
 
                {/* left — portrait, col-span-5 */}
                <div className="dest-gallery-item col-span-5">
                  <div className="pr-10">
                    <div className="aspect-[3/4] overflow-hidden mb-5">
                      <img
                        src={dest.gallery[0].img}
                        alt=""
                        className="dest-gallery-img w-full h-[118%] object-cover will-change-transform"
                      />
                    </div>
                    <p className="text-[13px] leading-[1.8] max-w-[290px] pl-1 text-[#2D3C68]/56">
                      {dest.gallery[0].text}
                    </p>
                  </div>
                </div>
 
                {/*
                  right — two stacked landscape images, col-span-5 col-start-8.
                  FIX 1 — REMOVED: `-ml-10` on index === 1.
                  Both images now sit cleanly within their column.
                  No arbitrary negative margin. Grid always organized.
                */}
                <div className="col-span-5 col-start-8">
                  <div className="space-y-10">
                    {[1, 2].map((j) => (
                      <div key={j} className="dest-gallery-item">
                        <div className="aspect-[16/9] overflow-hidden mb-4">
                          <img
                            src={dest.gallery[j].img}
                            alt=""
                            className="dest-gallery-img w-full h-[118%] object-cover will-change-transform"
                          />
                        </div>
                        <p className="text-[13px] leading-[1.8] max-w-[380px] text-[#2D3C68]/56">
                          {dest.gallery[j].text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
 
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
  const sectionRef   = useRef(null);
  const imageRef     = useRef(null);
  const labelRef     = useRef(null);
  const headlineRef  = useRef(null);
  const bodyRef      = useRef(null);
  const primaryRef   = useRef(null);
  const secondaryRef = useRef(null);
 
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
    const ctx = gsap.context(() => {
 
      // ── Reduced motion ────────────────────────────────────────
      if (reduce) {
        gsap.set(
          [
            imageRef.current,
            labelRef.current,
            headlineRef.current,
            bodyRef.current,
            primaryRef.current,
            secondaryRef.current,
          ],
          { opacity: 1, y: 0, clearProps: 'transform' }
        );
        return;
      }
 
      // ── Image parallax ────────────────────────────────────────
      gsap.to(imageRef.current, {
        y:    -18,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   'top bottom',
          end:     'bottom top',
          scrub:   1.2,
        },
      });
 
      // ── Label ─────────────────────────────────────────────────
      gsap.fromTo(labelRef.current,
        { opacity: 0, y: 10 },
        {
          opacity:  0.4,
          y:        0,
          duration: 0.9,
          ease:     'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start:   'top 74%',
          },
        }
      );
 
      // ── Headline ──────────────────────────────────────────────
      // Ambient float removed — floating text is gimmicky at this position
      gsap.fromTo(headlineRef.current,
        { opacity: 0, y: 28 },
        {
          opacity:  1,
          y:        0,
          duration: 1.25,
          ease:     'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start:   'top 82%',
          },
        }
      );
 
      // ── Body ──────────────────────────────────────────────────
      gsap.fromTo(bodyRef.current,
        { opacity: 0, y: 16 },
        {
          opacity:  0.8,
          y:        0,
          duration: 1,
          ease:     'power2.out',
          delay:    0.08,
          scrollTrigger: {
            trigger: bodyRef.current,
            start:   'top 90%',
          },
        }
      );
 
      // ── Primary CTA ───────────────────────────────────────────
      gsap.fromTo(primaryRef.current,
        { opacity: 0, y: 14 },
        {
          opacity:  1,
          y:        0,
          duration: 0.95,
          ease:     'power2.out',
          delay:    0.16,
          scrollTrigger: {
            trigger: primaryRef.current,
            start:   'top 94%',
          },
        }
      );
 
      // ── Secondary CTA ─────────────────────────────────────────
      gsap.fromTo(secondaryRef.current,
        { opacity: 0, x: -8 },
        {
          opacity:  0.6,
          x:        0,
          duration: 0.9,
          ease:     'power2.out',
          delay:    0.22,
          scrollTrigger: {
            trigger: secondaryRef.current,
            start:   'top 96%',
          },
        }
      );
 
    }, sectionRef);
 
    return () => ctx.revert();
  }, []);
 
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#1A1A1A] px-6 py-[90px] md:px-10 md:py-[130px]"
    >
 
      {/* ── IMAGE ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imageRef}
          src="https://res.cloudinary.com/dombq6plz/image/upload/v1777217651/ChatGPT_Image_Apr_26_2026_10_30_34_PM_1_yc2ihk.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full scale-[1.05] object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-black/48" />
      </div>
 
      {/* ── CONTENT ───────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-[1200px]">
 
        {/* Eyebrow — fixed from "Plan Your Trip" (TripAdvisor tone) */}
        <p
          ref={labelRef}
          className="mb-[34px] text-[11px] uppercase tracking-[0.3em] text-white/40 md:mb-[52px]"
        >
          Begin Your Voyage
        </p>
 
        {/* Headline */}
        <div className="mb-[44px] md:mb-[64px]">
          <h2
            ref={headlineRef}
            className="max-w-[680px] font-[Gambarino] text-[44px] leading-[0.98] tracking-[-0.04em] text-[#F4F5F2] md:text-[72px]"
          >
            When do you
            <br />
            want to leave?
          </h2>
        </div>
 
        {/* Content row */}
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-12">
 
          {/* Body */}
          <p
            ref={bodyRef}
            className="max-w-[520px] text-[14px] leading-[1.85] text-white/80 md:max-w-[340px]"
          >
            Share your dates, your pace, and who you're coming with.
            We'll shape the journey around you.
          </p>
 
          {/* CTA group */}
          <div className="flex flex-col items-stretch gap-6 sm:flex-row sm:items-center sm:gap-10 md:translate-y-[4px] w-full sm:w-auto">
 
            {/* Primary */}
            <TransitionLink
              ref={primaryRef}
              href="/contact"
              className="w-full rounded-full bg-[#F4F5F2] px-10 py-4 text-center text-[11px] uppercase tracking-[0.2em] text-[#1A1A1A] transition-all duration-500 hover:-translate-y-[2px] hover:opacity-95 hover:shadow-[0_14px_36px_rgba(0,0,0,0.28)] sm:w-auto"
            >
              Start a Conversation
            </TransitionLink>
 
            {/* Secondary */}
            <TransitionLink
              ref={secondaryRef}
              href="/rates-and-schedule"
              className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-white/60 transition-colors duration-300 hover:text-white/82"
            >
              See Pricing
              <span className="block h-px w-[24px] bg-current transition-all duration-500 group-hover:w-[40px]" />
            </TransitionLink>
 
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
