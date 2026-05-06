"use client"

import { useEffect, useRef, useState, useLayoutEffect, useMemo, useCallback, Fragment   } from "react"
import { gsap } from "../../lib/gsap"
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger"

import useEmblaCarousel from "embla-carousel-react";

gsap.registerPlugin(ScrollTrigger)

import Footer from '../../components/Footer'

const DISABLE_ANIMATION = false; // ubah ke false kalau mau animasi aktif

export default function Page() {
  return (
    <main className="bg-[#0a0f14] text-white overflow-hidden">
      <Hero />  
      <ExperienceMoments/> 
      <SplitHorizon/>
      <ExperienceActivities/>
      {/* <ExperienceSelection/>  */}
      {/* <SampleJourney/> */}
      {/* <JourneyLens  /> */}
      {/* <ExperienceFlow2/> */}
      {/* <WhatsIncluded/> */}
      {/* <RatesBridge/> */}
      {/* <SocialExperience/> */}
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
  const observerRef = useRef(null);
  const mountedRef = useRef(false);

  const stateRef = useRef({
    autoProgress: 0,
    lastTime: null,
    userHasScrolled: false,
    scrollCurrent: 0,
    scrollTarget: 0,
    transitionMix: 0,
  });

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    let isVisible = true;

    const node = containerRef.current;
    if (!node) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );

    observerRef.current.observe(node);

    const handleScroll = () => {
      const s = stateRef.current;
      const y = window.scrollY || 0;

      if (!s.userHasScrolled && y > 10) {
        s.userHasScrolled = true;
      }

      s.scrollTarget = y;
    };

    const loop = (timestamp) => {
      const s = stateRef.current;

      rafRef.current = requestAnimationFrame(loop);
      if (!isVisible || !containerRef.current) return;

      let autoShift = 0;
      if (s.lastTime !== null) {
        const delta = Math.min(timestamp - s.lastTime, 100);
        s.autoProgress = (s.autoProgress + delta / 5000) % 1;
      }
      s.lastTime = timestamp;
      autoShift = Math.sin(s.autoProgress * Math.PI);

      s.scrollCurrent += (s.scrollTarget - s.scrollCurrent) * 0.06;
      const scrollShift = Math.min(s.scrollCurrent * 0.004, 1);

      const targetMix = s.userHasScrolled ? 1 : 0;
      s.transitionMix += (targetMix - s.transitionMix) * 0.08;

      let shift =
        autoShift * (1 - s.transitionMix) +
        scrollShift * s.transitionMix;

      if (!Number.isFinite(shift)) shift = 0;
      shift = Math.max(0, Math.min(1, shift));

      containerRef.current.style.setProperty("--shift", shift);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      if (observerRef.current && node) {
        observerRef.current.unobserve(node);
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      mountedRef.current = false;
    };
  }, []);

  const angles = [120, 200, 300, 60];

  return (
    <section
      ref={containerRef}
      style={{ "--shift": 0 }}
      className="relative w-full h-[92vh] min-h-[720px] overflow-hidden"
    >
      {/* PANELS */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1">
        {angles.map((angle, i) => (
          <div key={i} className="relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(${angle}deg, #2D3C68 0%, #3D4E7A 60%, #F4F5F2 200%)`,
              }}
            />

            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(${angle}deg, #8B6A4F 0%, #9E7A5E 60%, #F4F5F2 200%)`,
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
                  rgba(45,60,104, calc(0.30 + var(--shift) * 0.25)),
                  rgba(45,60,104, calc(0.50 + var(--shift) * 0.35))
                )`,
              }}
            />

            {i !== 3 && (
              <div className="hidden md:block absolute top-0 right-0 w-[1px] h-full bg-[#F4F5F2]/15" />
            )}
            {i < 2 && (
              <div className="md:hidden absolute bottom-0 left-0 w-full h-[1px] bg-[#F4F5F2]/15" />
            )}
            {i % 2 === 0 && (
              <div className="md:hidden absolute top-0 right-0 w-[1px] h-full bg-[#F4F5F2]/15" />
            )}
          </div>
        ))}
      </div>

      {/* TEXT */}
      <div
        className="
          absolute inset-0 flex pointer-events-none

          /* MOBILE: bawah kiri */
          items-end justify-start pb-[10vh]

          /* DESKTOP: tengah */
          md:items-center md:justify-center md:pb-0
        "
      >
        <div
          className="
            w-full max-w-[600px]
            px-6

            /* MOBILE */
            text-left

            /* DESKTOP */
            md:text-center md:mx-auto
          "
        >
          <p className="text-[10px] tracking-[0.35em] text-[#F4F5F2]/60 uppercase mb-4 md:mb-6 md:text-center">
            Experiences
          </p>

          <h1
            className="font-[Gambarino] text-[#F4F5F2] leading-[1.1] md:text-center"
            style={{ fontSize: "clamp(36px, 6vw, 68px)" }}
          >
            No two days at sea unfold the same
          </h1>

          <p
            className="
              mt-4 md:mt-5
              text-[14px] md:text-[15px]
              text-[#F4F5F2]/70
              leading-[1.7]

              max-w-[420px]
              md:max-w-[480px]

              text-left
              md:mx-auto md:text-center
            "
          >
            Some days revolve around diving and open water. Others shift between
            islands, shared meals, and quiet time on deck.
          </p>
        </div>
      </div>
    </section>
  );
}


 
function ExperienceMoments() {
  const ITEMS = [
    {
      title: "Move",
      sub: "water leads before thought",
      type: "image",
      src: "https://images.pexels.com/photos/15763646/pexels-photo-15763646.jpeg?auto=compress&cs=tinysrgb&w=1200",
      offset: false,
    },
    {
      title: "Gather",
      sub: "shared moments settle on deck",
      type: "image",
      src: "https://images.pexels.com/photos/9750736/pexels-photo-9750736.jpeg?auto=compress&cs=tinysrgb&w=1200",
      offset: true,
    },
    {
      title: "Unwind",
      sub: "stillness returns at sea",
      type: "video",
      src: "https://www.pexels.com/download/video/35594933/",
      offset: false,
    },
  ];

  const containerRef = useRef(null);

  const framesDesktopRef = useRef([]);
  const framesMobileRef = useRef([]);
  const imgRefs = useRef([]);

  const tailRef = useRef(null);
  const threadRef = useRef(null);
  const scrollTrackRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // DESKTOP ANIMATION
      gsap.from(framesDesktopRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 74%",
        },
      });

      gsap.from(threadRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.6,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      // MOBILE ANIMATION
      gsap.from(framesMobileRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(tailRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: tailRef.current,
          start: "top 85%",
        },
      });

      // IMAGE BREATHING (DESKTOP ONLY)
      if (window.innerWidth >= 768) {
        const durations = [7, 10, 8.5];
        imgRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.to(el, {
            scale: 1.06,
            duration: durations[i],
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 1.2,
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // SCROLL INDICATOR SYNC
  useEffect(() => {
    const el = scrollTrackRef.current;
    if (!el) return;

    const onScroll = () => {
      const cardWidth = el.children[0].offsetWidth + 12;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(index);
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#F4F5F2] py-[80px] md:py-[140px]"
    >
      {/* 🔥 DESKTOP WIDTH DIBESARIN */}
      <div className="max-w-[1220px] md:mx-auto md:px-6">

        {/* ================= DESKTOP ================= */}
        <div className="relative hidden md:block">
          <div
            ref={threadRef}
            className="absolute left-0 right-0 h-px bg-[#2D3C68]/15"
            style={{ top: "52%", zIndex: 10 }}
          />

          <div className="grid md:grid-cols-3 gap-4 items-start px-4">
            {ITEMS.map((item, i) => (
              <div
                key={i}
                ref={(el) => (framesDesktopRef.current[i] = el)}
                className={`relative w-full aspect-[4/5] overflow-hidden group
                  ${item.offset ? "md:-translate-y-10" : ""}`}
              >
                {item.type === "video" ? (
                  <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover scale-[1.02]">
                    <source src={item.src} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    ref={(el) => (imgRefs.current[i] = el)}
                    src={item.src}
                    className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
                  />
                )}

                {/* emotional progression (subtle) */}
                <div className={`absolute inset-0 ${
                  i === 2 ? "bg-black/20" : "bg-black/10"
                }`} />

                <div className="absolute inset-0 bg-gradient-to-t from-[#2D3C68]/45 via-transparent to-transparent" />

                <div className="absolute top-5 left-5 text-white/40 text-[11px] tracking-[0.25em]">
                  0{i + 1}
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="font-[Gambarino] text-[38px] text-white leading-none group-hover:-translate-y-6 transition">
                    {item.title}
                  </h3>
                  <p className="text-[12px] text-white/70 mt-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition">
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden">

          <div className="px-6 mb-5">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#2D3C68]/40">
              Moments
            </p>
          </div>

          <div
            ref={scrollTrackRef}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory"
            style={{
              paddingLeft: "24px",
              paddingRight: "24px",
              scrollbarWidth: "none",
            }}
          >
            {ITEMS.map((item, i) => (
              <div
                key={i}
                ref={(el) => (framesMobileRef.current[i] = el)}
                className="relative shrink-0 snap-start overflow-hidden"
                style={{ width: "78vw", aspectRatio: "4/5" }}
              >
                {item.type === "video" ? (
                  <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <img src={item.src} className="absolute inset-0 w-full h-full object-cover" />
                )}

                <div className={`absolute inset-0 ${
                  i === 2 ? "bg-black/20" : "bg-black/10"
                }`} />

                <div className="absolute inset-0 bg-gradient-to-t from-[#2D3C68]/50 to-transparent" />

                <div className="absolute bottom-6 left-5 right-5">
                  <h3 className="font-[Gambarino] text-[32px] text-white">
                    {item.title}
                  </h3>
                  <p className="text-[12px] text-white/65 mt-2 italic">
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}

            <div className="shrink-0 w-[calc(22vw-24px)]" />
          </div>

          {/* REAL INDICATOR */}
          <div className="px-6 mt-5 flex gap-2">
            {ITEMS.map((_, i) => (
              <div
                key={i}
                className="h-px transition-all duration-300"
                style={{
                  width: activeIndex === i ? "28px" : "10px",
                  background:
                    activeIndex === i
                      ? "#2D3C68"
                      : "rgba(45,60,104,0.2)",
                }}
              />
            ))}
          </div>

        </div>

        {/* ================= TAIL ================= */}
        <div
          ref={tailRef}
          className="mt-[56px] md:mt-[96px] max-w-[620px] px-6 md:ml-[4px] flex gap-8 items-start"
        >
          <div className="hidden md:block w-px bg-[#2D3C68]/20" />
          <p className="font-[Gambarino] text-[24px] md:text-[40px] text-[#2D3C68] leading-[1.2]">
            the day moves between water, people, and stillness
            <br />
            without ever needing a fixed sequence
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

function ExperienceActivities() {
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
            href="https://wa.me/your-number"
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

