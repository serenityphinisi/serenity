"use client"

import { useEffect, useRef, useState, useLayoutEffect, useMemo } from "react"
import { gsap } from "../../lib/gsap"
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

import Footer from '../../components/Footer'


export default function Page() {
  return (
    <main className="bg-[#0a0f14] text-white overflow-hidden">
      <Hero />  
      {/* <ExperienceSelection/>  */}
      <ExperienceMoments/> 
      <SplitHorizon/>
      <SampleJourney/>
      {/* <JourneyLens  /> */}
      {/* <ExperienceFlow2/> */}
      {/* <WhatsIncluded/> */}
      {/* <RatesBridge/> */}
      <FinalClosing/>
      {/* <ExperiencesIntro/> */}
      {/* <ExperienceModes/> */}
      {/* <Culinary/> */}
      <Footer/> 
    </main>
  )
}

function Hero() {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef({
    autoProgress: 0,
    lastTime: null,
    userHasScrolled: false,
    scrollCurrent: 0,
    scrollTarget: 0,
  });

  useEffect(() => {
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    const handleScroll = () => {
      const s = stateRef.current;
      if (window.scrollY > 10) s.userHasScrolled = true;
      s.scrollTarget = window.scrollY;
    };

    const loop = (timestamp) => {
      rafRef.current = requestAnimationFrame(loop);
      if (!isVisible) return;

      const s = stateRef.current;
      let shift;

      if (!s.userHasScrolled) {
        // AUTO-PLAY — smooth sine loop, ~5 detik per cycle
        if (s.lastTime !== null) {
          const delta = timestamp - s.lastTime;
          s.autoProgress = (s.autoProgress + delta / 5000) % 1;
        }
        s.lastTime = timestamp;
        shift = Math.sin(s.autoProgress * Math.PI);
      } else {
        // SCROLL TAKES OVER — auto mati total
        s.lastTime = null;
        s.scrollCurrent += (s.scrollTarget - s.scrollCurrent) * 0.06;
        shift = Math.min(s.scrollCurrent * 0.004, 1);
      }

      if (containerRef.current) {
        containerRef.current.style.setProperty("--shift", shift);
      }
    };

    window.addEventListener("scroll", handleScroll);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  const angles = [120, 200, 300, 60];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[92vh] min-h-[720px] overflow-hidden"
    >
      {/* PANELS */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1">
        {angles.map((angle, i) => (
          <div key={i} className="relative overflow-hidden">

            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(${angle}deg, #2D3C68 0%, #F4F5F2 120%)`,
              }}
            />

            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(${angle}deg, #8B6A4F 0%, #F4F5F2 120%)`,
                opacity: "var(--shift)",
              }}
            />

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(
                  circle at ${i % 2 === 0 ? "30%" : "70%"} 40%,
                  rgba(176,141,87, calc(var(--shift) * 0.15)),
                  transparent 60%
                )`,
              }}
            />

            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(
                  to bottom,
                  rgba(45,60,104, calc(0.15 + var(--shift) * 0.2)),
                  rgba(45,60,104, calc(0.25 + var(--shift) * 0.3))
                )`,
              }}
            />

            {/* DIVIDER DESKTOP */}
            {i !== 3 && (
              <div className="hidden md:block absolute top-0 right-0 w-[1px] h-full bg-[#F4F5F2]/25" />
            )}
            {/* DIVIDER MOBILE HORIZONTAL */}
            {i < 2 && (
              <div className="md:hidden absolute bottom-0 left-0 w-full h-[1px] bg-[#F4F5F2]/25" />
            )}
            {/* DIVIDER MOBILE VERTICAL */}
            {i % 2 === 0 && (
              <div className="md:hidden absolute top-0 right-0 w-[1px] h-full bg-[#F4F5F2]/25" />
            )}
          </div>
        ))}
      </div>

      {/* TEXT */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center px-6 max-w-[600px] mx-auto">

          <p className="text-[10px] tracking-[0.35em] text-[#F4F5F2]/60 uppercase mb-6">
            Experiences
          </p>

          <h1
            className="font-[Gambarino] text-[#F4F5F2] leading-[1.1]"
            style={{ fontSize: "clamp(36px, 6vw, 68px)" }}
          >
            No two days look the same
          </h1>

          <p className="mt-5 text-[14px] md:text-[15px] text-[#F4F5F2]/70 leading-[1.75] max-w-[450px] mx-auto">
          Some days unfold around the water. Others shift between islands,
          conversations, and quiet time on deck. No single path defines the experience.
          </p>

        </div>
      </div>
    </section>
  );
}

function ExperienceMoments() {
  const containerRef = useRef(null);
  const framesRef = useRef([]);
  const tailRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(framesRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power2.out",
      });

      tl.from(
        tailRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const items = [
    {
      title: "move",
      type: "image",
      src: "https://images.pexels.com/photos/15763646/pexels-photo-15763646.jpeg",
    },
    {
      title: "gather",
      type: "image",
      src: "https://images.pexels.com/photos/9750736/pexels-photo-9750736.jpeg",
    },
    {
      title: "unwind",
      type: "video",
      src: "https://www.pexels.com/download/video/35594933/",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#F4F5F2] py-[120px] md:py-[140px] px-6"
    >
      <div className="max-w-[1100px] mx-auto">

        {/* ================= FRAMES ================= */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 items-start">

          {items.map((item, i) => (
            <div
              key={i}
              ref={(el) => (framesRef.current[i] = el)}
              className={`relative w-full aspect-[4/5] overflow-hidden group transition-opacity duration-500
              ${i === 1 ? "-translate-y-3 md:-translate-y-5" : ""}`}
            >

              {/* MEDIA */}
              {item.type === "video" ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-[900ms]
                  scale-[1.02] group-hover:scale-[1.05]"
                >
                  <source src={item.src} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={item.src}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-[900ms]
                  scale-[1.02] group-hover:scale-[1.05]"
                />
              )}

              {/* OVERLAY BASE */}
              <div className="absolute inset-0 bg-black/20" />

              {/* GRADIENT (REQUESTED) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D3C68]/60 to-transparent" />

              {/* TITLE */}
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="font-[Gambarino] text-[28px] md:text-[36px] text-white">
                  {item.title}
                </h3>
              </div>

            </div>
          ))}

        </div>

        {/* ================= CONTINUATION (TAIL) ================= */}
        <div
          ref={tailRef}
          className="mt-[64px] md:mt-[80px] max-w-[620px] md:ml-[4px]"
        >
          <p className="font-[Gambarino] text-[30px] md:text-[42px] leading-[1.2] text-[#2D3C68]">
            the day doesn’t follow a sequence
            <br />
            it shifts between moments without needing to decide
          </p>
        </div>

      </div>
    </section>
  );
}

function SplitHorizon() {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(leftRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      tl.from(
        rightRef.current,
        {
          x: 60,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.7"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full h-[80vh] min-h-[640px] bg-[#F4F5F2] overflow-hidden"
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
            src="https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg"
            className="w-full h-full object-cover scale-[1.02]"
          />

          {/* BLUE OVERLAY */}
          <div className="absolute inset-0 bg-[#2D3C68]/40 mix-blend-multiply" />
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
            src="https://images.pexels.com/photos/12302257/pexels-photo-12302257.jpeg"
            className="w-full h-full object-cover scale-[1.02]"
          />

          {/* BLUE OVERLAY */}
          <div className="absolute inset-0 bg-[#2D3C68]/25 mix-blend-multiply" />
        </div>

        {/* SUBTLE DEPTH (GLOBAL) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-b from-transparent via-transparent to-[#2D3C68]/20" />
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
          <a
            href="/rates-and-schedules"
            className="inline-block text-[12px] tracking-[0.35em] uppercase text-[#2D3C68] border-b border-[#2D3C68] pb-2 hover:opacity-60 transition"
          >
            View Rates & Schedules
          </a>
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
              <a
                href="/rates-and-schedules"
                className="text-[13px] tracking-[0.18em] uppercase text-[#2D3C68] border-b border-[#2D3C68]/30 hover:border-[#2D3C68] transition"
              >
                View full rates →
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

function FinalClosing() {
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
    <section className="w-full bg-[#2D3C68] py-[220px] px-6">
      <div
        ref={containerRef}
        className="max-w-[720px] mx-auto text-center text-white"
      >

        {/* HEADLINE */}
        <h2 className="font-[Gambarino] text-[40px] md:text-[60px] leading-[1.1]">
          When you’re ready, we’ll take it from there
        </h2>

        {/* SUBTEXT */}
        <p className="mt-6 text-[16px] text-white/75 leading-[1.7]">
          Tell us what kind of journey you have in mind. We’ll help shape the rest.
        </p>

        {/* CTA PRIMARY */}
        <div className="mt-[60px]">
          <a
            href="https://wa.me/your-number"
            className="inline-block text-[12px] tracking-[0.35em] uppercase border-b border-white pb-2 hover:opacity-60 transition"
          >
            Start Your Journey
          </a>
        </div>

        {/* CTA SECONDARY (OPTIONAL, HALUS) */}
        <div className="mt-6">
          <a
            href="/rates-and-schedules"
            className="text-[11px] tracking-[0.3em] uppercase text-white/50 hover:text-white transition"
          >
            Or view rates & schedules
          </a>
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

