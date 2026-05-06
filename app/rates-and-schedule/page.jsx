"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "../../lib/gsap"
import Image from "next/image";
import { motion, AnimatePresence,useInView } from "framer-motion";

import Footer from '../../components/Footer'


export default function Page() {
  return (
    <main className="bg-[#0a0f14] text-white overflow-hidden">
       <Hero/> 
       <WhatsIncluded/>
       <Rate/>
       <SailingCalendar/>
       {/* <RateOverview/> */}
       {/* <IncludedSection/> */}
       {/* <PricingDetails/>   */}
       {/* <SampleJourney/> */}
       {/* <FinalCTA/> */}
       {/* <CharterRates/> */}
       {/* <Schedule/> */}
       {/* <InclusionsExclusions/> */}
      <Footer/> 
    </main>
  )
}


function Hero() {
  const pathRefD = useRef(null);
  const pathRefM = useRef(null);

  useEffect(() => {
    function setup(path, speed = 0.0016) {
      if (!path) return;
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      let progress = 0;

      function animate() {
        progress += speed;
        path.style.strokeDashoffset = length * (1 - progress);

        if (progress < 1) requestAnimationFrame(animate);
      }

      animate();
    }

    setup(pathRefD.current, 0.0016);
    setup(pathRefM.current, 0.003);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#2D3C68] text-[#F4F5F2]">

      {/* ================= BACKGROUND ATMOSPHERE ================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* radial light — top left */}
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] md:h-[700px] md:w-[700px] rounded-full bg-[#F4F5F2]/[0.04] blur-3xl" />

        {/* radial light — bottom right */}
        <div className="absolute bottom-[-20%] right-[-10%] h-[400px] w-[400px] md:h-[600px] md:w-[600px] rounded-full bg-[#B08D57]/[0.08] blur-3xl" />

        {/* subtle grid — hidden on mobile for perf */}
        <div
          className="absolute inset-0 opacity-[0.045] hidden md:block"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(244,245,242,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(244,245,242,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "90px 90px",
          }}
        />

        {/* grain */}
        <div className="absolute inset-0 opacity-[0.025] mix-blend-soft-light bg-[radial-gradient(circle_at_center,black_1px,transparent_1px)] bg-[size:14px_14px]" />
      </div>

      {/* ================= ROUTE LINE — DESKTOP ================= */}
      <svg
        viewBox="0 0 1600 900"
        className="absolute inset-0 h-full w-full pointer-events-none hidden md:block"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="routeGradientD" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#B08D57" stopOpacity="0" />
            <stop offset="20%" stopColor="#B08D57" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#B08D57" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#B08D57" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#B08D57" stopOpacity="0" />
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
          stroke="url(#routeGradientD)"
          strokeWidth="1.4"
          strokeLinecap="round"
          filter="url(#glowD)"
        />
      </svg>

      {/* ================= ROUTE LINE — MOBILE ================= */}
      <svg
        viewBox="0 0 390 844"
        className="absolute inset-0 h-full w-full pointer-events-none block md:hidden"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="routeGradientM" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B08D57" stopOpacity="0" />
            <stop offset="35%" stopColor="#B08D57" stopOpacity="0.8" />
            <stop offset="65%" stopColor="#B08D57" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#B08D57" stopOpacity="0" />
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
          stroke="url(#routeGradientM)"
          strokeWidth="1.8"
          strokeLinecap="round"
          filter="url(#glowM)"
        />
      </svg>

      {/* ================= MAIN LAYOUT ================= */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10 pt-[160px] pb-[120px] md:pt-[200px] md:pb-[140px]">

          <div className="grid grid-cols-1 gap-y-14 md:grid-cols-12 md:gap-8 items-end">

            {/* ================= LEFT ================= */}
            <div className="md:col-span-7">

              {/* MICRO LABEL */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8 text-[10px] tracking-[0.38em] text-[#F4F5F2]/44 uppercase"
              >
                Rates & Sailing Schedule
              </motion.div>

              {/* HEADLINE */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  className="font-[Gambarino] text-[52px] md:text-[72px] lg:text-[84px] leading-[1.0] tracking-[-0.03em] text-[#F4F5F2]"
                >
                  Journeys
                  <br />
                  by Season
                </motion.h1>
              </div>

              {/* SUBTEXT */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 max-w-[480px] text-[15px] md:text-[16px] leading-[1.75] text-[#F4F5F2]/68"
              >
                Seasonal routes across Komodo and Raja Ampat shaped around sea
                conditions, weather rhythms, and the pace of life on board.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6"
              >
                <a
                  href="#rates"
                  className="inline-flex items-center justify-center rounded-full bg-[#F4F5F2] px-8 py-3.5 text-[13px] tracking-[0.02em] text-[#2D3C68] transition-all duration-500 hover:bg-[#E8E9E6] hover:-translate-y-[2px] active:scale-[0.97]"
                >
                  View Rates
                </a>

                <a
                  href="#schedule"
                  className="text-[13px] tracking-[0.01em] text-[#F4F5F2]/50 transition-colors duration-300 hover:text-[#F4F5F2] text-center sm:text-left"
                >
                  Sailing Calendar →
                </a>
              </motion.div>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="md:col-span-4 md:col-start-9 mt-14 md:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-8 md:space-y-12"
              >

                {/* KOMODO */}
                <div className="border-t border-[#F4F5F2]/10 pt-5">
                  <div className="mb-2 text-[10px] tracking-[0.28em] text-[#F4F5F2]/38 uppercase">
                    Komodo Season
                  </div>

                  <div className="font-[Gambarino] text-[22px] md:text-[24px] leading-none text-[#F4F5F2]">
                    May — September
                  </div>

                  <p className="mt-3 text-[13px] md:text-[14px] leading-[1.7] text-[#F4F5F2]/58 max-w-[300px] md:max-w-[280px]">
                    Dry season sailing with calmer waters, island trekking, and
                    clear visibility for diving.
                  </p>
                </div>

                {/* RAJA AMPAT */}
                <div className="border-t border-[#F4F5F2]/10 pt-5">
                  <div className="mb-2 text-[10px] tracking-[0.28em] text-[#F4F5F2]/38 uppercase">
                    Raja Ampat Season
                  </div>

                  <div className="font-[Gambarino] text-[22px] md:text-[24px] leading-none text-[#F4F5F2]">
                    November — April
                  </div>

                  <p className="mt-3 text-[13px] md:text-[14px] leading-[1.7] text-[#F4F5F2]/58 max-w-[300px] md:max-w-[280px]">
                    Remote island routes through rich coral ecosystems and
                    slower expedition rhythms.
                  </p>
                </div>

                {/* ON BOARD */}
                <div className="border-t border-[#F4F5F2]/10 pt-5">
                  <div className="mb-2 text-[10px] tracking-[0.28em] text-[#F4F5F2]/38 uppercase">
                    On Board
                  </div>

                  <div className="flex items-end gap-3">
                    <div className="font-[Gambarino] text-[38px] md:text-[42px] leading-none text-[#F4F5F2]">
                      12
                    </div>

                    <div className="pb-[6px] text-[12px] md:text-[13px] tracking-[0.06em] text-[#F4F5F2]/50">
                      guests · 10 crew · 4 cabins
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= SCROLL INDICATOR ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.28em] text-[#F4F5F2]/32">
            SCROLL
          </span>

          <div className="relative h-8 w-[1px] overflow-hidden bg-[#F4F5F2]/10">
            <motion.div
              animate={{ y: ["-100%", "120%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 top-0 h-4 w-full bg-[#B08D57]/70"
            />
          </div>
        </div>
      </motion.div>

    </section>
  );
}

function WhatsIncluded() {
  const included = [
    {
      label: "Full Crew",
      desc: "Captain, chef, dive master, and 7 supporting crew — on board throughout.",
    },
    {
      label: "All Meals & Non-Alcoholic Beverages",
      desc: "Three meals daily plus snacks, prepared fresh by the onboard chef.",
    },
    {
      label: "Watersports Equipment",
      desc: "Wakeboard, paddle boards, snorkel sets, and dive equipment included.",
    },
    {
      label: "Fuel & Standard Cruising",
      desc: "All fuel for the agreed route. No surcharges for standard navigation.",
    },
    {
      label: "Park Fees & Permits",
      desc: "Komodo National Park and Raja Ampat entry fees covered in full.",
    },
  ];

  const notIncluded = [
    "Flights and transfers to departure port",
    "Alcoholic beverages",
    "Tips for crew (customary, not mandatory)",
    "Personal dive equipment rental",
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        delay: i * 0.08,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section className="relative bg-[#F4F5F2] overflow-hidden">

      {/* TOP BORDER — visual connector dari hero */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2D3C68]/10 to-transparent" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-[120px] md:py-[140px]">

        {/* ================= HEADER ================= */}
        <div className="md:grid md:grid-cols-12 md:gap-8 mb-16 md:mb-20">

          <div className="md:col-span-5">

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 text-[10px] md:text-[11px] tracking-[0.34em] text-[#2D3C68]/40 uppercase"
            >
              What's Included
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-[Gambarino] text-[42px] md:text-[56px] lg:text-[64px] leading-[1.0] tracking-[-0.03em] text-[#2D3C68]"
            >
              One price.
              <br />
              Everything
              <br />
              arranged.
            </motion.h2>

          </div>

          <div className="md:col-span-5 md:col-start-8 flex items-end mt-8 md:mt-0">

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.1,
                delay: 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[14px] md:text-[15px] leading-[1.85] text-[#2D3C68]/62 max-w-[400px]"
            >
              The charter rate covers everything on board. No itemised bills,
              no surprises at the end of the week. Arrive and let the crew
              handle the rest.
            </motion.p>

          </div>

        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="md:grid md:grid-cols-12 md:gap-8 md:items-start">

          {/* LEFT — INCLUDED LIST */}
          <div className="md:col-span-6">

            <div className="divide-y divide-[#2D3C68]/8">

              {included.map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="py-6 md:py-7 flex gap-5 items-start"
                >

                  {/* INDEX */}
                  <span className="text-[11px] tracking-[0.14em] text-[#B08D57]/70 mt-[3px] shrink-0 w-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>

                    <div className="text-[14px] md:text-[15px] font-medium tracking-[-0.01em] text-[#2D3C68] mb-1">
                      {item.label}
                    </div>

                    <div className="text-[13px] md:text-[14px] leading-[1.7] text-[#2D3C68]/55">
                      {item.desc}
                    </div>

                  </div>

                </motion.div>
              ))}

            </div>

            {/* NOT INCLUDED */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10 pt-8 border-t border-[#2D3C68]/8"
            >

              <div className="mb-4 text-[10px] tracking-[0.28em] text-[#2D3C68]/35 uppercase">
                Not Included
              </div>

              <ul className="space-y-2">

                {notIncluded.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[13px] leading-[1.6] text-[#2D3C68]/42"
                  >
                    <span className="mt-[6px] h-[3px] w-[3px] rounded-full bg-[#2D3C68]/25 shrink-0" />
                    {item}
                  </li>
                ))}

              </ul>

            </motion.div>

          </div>

          {/* RIGHT — IMAGE (offset, asymmetric) */}
          <div className="md:col-span-5 md:col-start-8 mt-14 md:mt-0 md:-translate-y-[40px]">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >

              {/* IMAGE */}
              <div className="relative w-full aspect-[4/5] overflow-hidden">

                <Image
                  src="https://res.cloudinary.com/dombq6plz/image/upload/v1777307172/ChatGPT_Image_Apr_27_2026_10_24_29_PM_1_ou4x2n.png"
                  alt="Guests dining together on Serenity's deck"
                  fill
                  className="object-cover"
                />

                {/* subtle overlay */}
                <div className="absolute inset-0 bg-[#2D3C68]/8" />

              </div>

              {/* CAPTION CHIP — offset bottom left */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute -bottom-5 -left-5 md:-left-8 bg-[#2D3C68] px-5 py-3"
              >

                <div className="text-[10px] tracking-[0.22em] text-[#F4F5F2]/50 uppercase mb-[2px]">
                  On Board
                </div>

                <div className="text-[13px] tracking-[0.04em] text-[#F4F5F2]">
                  Chef · Crew · Everything
                </div>

              </motion.div>

            </motion.div>

          </div>

        </div>

      </div>

      {/* BOTTOM BORDER */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2D3C68]/10 to-transparent" />

    </section>
  );
}

function Rate() {
  const sectionRef = useRef(null);

  const inView = useInView(sectionRef, {
    once: true,
    margin: "-20%",
  });

  const [prices, setPrices] = useState([0, 0, 0]);

  const tiers = [
    {
      season: "Low Season",
      months: "Jan – Apr",
      price: 18000,
      note: "per week · full charter",
      context:
        "Shoulder season sailing. Quieter waters, fewer vessels. Best for Raja Ampat before peak crowds.",
      highlight: false,
    },
    {
      season: "High Season",
      months: "May – Sep",
      price: 24000,
      note: "per week · full charter",
      context:
        "Prime Komodo season. Dry winds, clear visibility, optimal conditions for diving and trekking.",
      highlight: true,
    },
    {
      season: "Peak Season",
      months: "Oct – Dec",
      price: 28000,
      note: "per week · full charter",
      context:
        "Transition period. Raja Ampat opens up. Strong demand — availability fills quickly.",
      highlight: false,
    },
  ];

  useEffect(() => {
    if (!inView) return;

    const duration = 1400;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setPrices(
        tiers.map((tier) =>
          progress < 1
            ? Math.floor(eased * tier.price)
            : tier.price
        )
      );

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [inView]);

  return (
    <section
      id="rates"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F4F5F2]"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2D3C68]/10 to-transparent" />

      <div className="mx-auto max-w-[1200px] px-6 py-[100px] md:px-10 md:py-[120px]">

        {/* HEADER */}
        <div className="mb-16 md:mb-20 md:grid md:grid-cols-12 md:items-end md:gap-8">

          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-5 text-[10px] uppercase tracking-[0.34em] text-[#2D3C68]/40 md:text-[11px]"
            >
              Charter Rates
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
              className="font-[Gambarino] text-[42px] leading-[1] tracking-[-0.03em] text-[#2D3C68] md:text-[56px]"
            >
              Full charter,
              <br />
              three seasons.
            </motion.h2>
          </div>

          <div className="mt-6 md:col-span-5 md:col-start-8 md:mt-0">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.1,
                delay: 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-[400px] text-[14px] leading-[1.85] text-[#2D3C68]/60 md:text-[15px]"
            >
              Serenity charters as a whole vessel — one group, one crew, one
              route. Rates vary by season and sea conditions across the
              Indonesian archipelago.
            </motion.p>
          </div>
        </div>

        {/* RATE GRID */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-start md:gap-6">

          {tiers.map((tier, index) => {
            const isHighlight = tier.highlight;

            return (
              <motion.div
                key={tier.season}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.1,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={
                  isHighlight
                    ? "relative bg-[#2D3C68] px-8 py-10 md:-translate-y-6 md:px-10 md:py-12 md:shadow-[0_32px_80px_rgba(45,60,104,0.18)]"
                    : "border-t border-[#2D3C68]/10 px-0 pt-8 md:px-2"
                }
              >

                {isHighlight && (
                  <div className="absolute -top-3 left-8 bg-[#B08D57] px-4 py-1 md:left-10">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#F4F5F2]">
                      Most Requested
                    </span>
                  </div>
                )}

                <div
                  className={
                    isHighlight
                      ? "mb-3 text-[10px] uppercase tracking-[0.28em] text-[#F4F5F2]/44"
                      : "mb-3 text-[10px] uppercase tracking-[0.28em] text-[#2D3C68]/38"
                  }
                >
                  {tier.season}
                </div>

                <div
                  className={
                    isHighlight
                      ? "mb-1 text-[11px] tracking-[0.14em] text-[#B08D57]/80"
                      : "mb-1 text-[11px] tracking-[0.14em] text-[#B08D57]/70"
                  }
                >
                  {tier.months}
                </div>

                <div
                  className={
                    isHighlight
                      ? "mt-6 mb-1 font-[Gambarino] text-[48px] leading-none tracking-[-0.02em] text-[#F4F5F2] md:text-[52px]"
                      : "mt-6 mb-1 font-[Gambarino] text-[42px] leading-none tracking-[-0.02em] text-[#2D3C68] md:text-[46px]"
                  }
                >
                  USD {prices[index].toLocaleString()}
                </div>

                <div
                  className={
                    isHighlight
                      ? "mb-8 text-[12px] text-[#F4F5F2]/44"
                      : "mb-8 text-[12px] text-[#2D3C68]/40"
                  }
                >
                  {tier.note}
                </div>

                <div
                  className={
                    isHighlight
                      ? "mb-8 h-[1px] bg-[#F4F5F2]/10"
                      : "mb-8 h-[1px] bg-[#2D3C68]/8"
                  }
                />

                <p
                  className={
                    isHighlight
                      ? "text-[13px] leading-[1.75] text-[#F4F5F2]/65 md:text-[14px]"
                      : "text-[13px] leading-[1.75] text-[#2D3C68]/55 md:text-[14px]"
                  }
                >
                  {tier.context}
                </p>
              </motion.div>
            );
          })}

        </div>

        {/* FOOTER */}
        <div className="mt-16 md:mt-20 md:grid md:grid-cols-12 md:items-end md:gap-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-10 space-y-2 md:col-span-7 md:mb-0"
          >
            <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-[#2D3C68]/32">
              Notes
            </div>

            {[
              "Minimum charter: 7 nights",
              "Rates quoted in USD. Subject to availability.",
              "Custom itineraries and extended charters available on request.",
              "A 30% deposit confirms your booking. Balance due 60 days prior.",
            ].map((note) => (
              <div
                key={note}
                className="flex items-start gap-3"
              >
                <span className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full bg-[#2D3C68]/22" />

                <span className="text-[13px] leading-[1.6] text-[#2D3C68]/42">
                  {note}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: 0.16,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col items-start gap-3 md:col-span-4 md:col-start-9 md:items-end"
          >
            <a
              href="#inquiry"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#2D3C68] px-10 py-4 text-[13px] tracking-[0.04em] text-[#F4F5F2] transition-all duration-500 hover:-translate-y-[2px] hover:bg-[#24345D] active:scale-[0.97] md:w-auto"
            >
              Inquire Now
            </a>

            <span className="text-center text-[12px] text-[#2D3C68]/36 md:text-right">
              Response within 24 hours
            </span>
          </motion.div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2D3C68]/10 to-transparent" />
    </section>
  );
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
  return (
    <section className="relative w-full h-[80vh] min-h-[640px] flex items-center overflow-hidden text-white">

      {/* ================= BACKGROUND (HUMAN — CONTINUITY) ================= */}
      <div className="absolute inset-0">
        <motion.img
          src="https://res.cloudinary.com/dombq6plz/image/upload/v1776176462/people_relaxing_phinisi_sunset_softlight_h8k2dj.png"
          alt=""
          className="w-full h-full object-cover scale-[1.05]"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 6 }}
        />
      </div>

      {/* ================= OVERLAY ================= */}
      <div className="absolute inset-0 bg-[#2D3C68]/75" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 w-full px-6">

        <div className="max-w-[1200px] mx-auto">

          {/* slight offset (no perfect symmetry) */}
          <div className="max-w-[520px] md:ml-[40px]">

            {/* HEADLINE */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-[Gambarino] text-[48px] md:text-[64px] leading-[1.05]"
            >
              Start with a few details
            </motion.h2>

            {/* SUBCOPY */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-[16px] text-white/80 leading-relaxed"
            >
              Tell us when you want to go and who you’re traveling with.
              We’ll take care of the rest and shape the trip around you.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 flex items-center gap-6"
            >
              <button className="px-8 py-3 rounded-full bg-white text-[#2D3C68] text-[14px] font-medium hover:bg-[#F4F5F2] transition">
                Check availability
              </button>

              {/* MICRO TRUST */}
              <span className="text-[13px] text-white/60">
                No commitment
              </span>
            </motion.div>

          </div>

        </div>

      </div>

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

