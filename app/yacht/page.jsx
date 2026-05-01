"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "../../lib/gsap"
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import Footer from '../../components/Footer'


export default function Page() {
  return (
    <main className="bg-[#0a0f14] text-white overflow-hidden">
      <Hero /> 
      {/* <About/> */}
      <Experience/>
      {/* <Identity/> */}
      {/* <Spaces/> */}
      <Cabins/>
      {/* <LivingSpaces/> */}
      <DeckAndSpecs/>
      {/* <Closing/> */}
      {/* <Gallery/> */}
      <Reservation/>
      <Footer/>
    </main>
  )
}


function Hero() {
  const [scale, setScale] = useState(1.05);

  useEffect(() => {
    const t = setTimeout(() => setScale(1.0), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full bg-[#F4F5F2] overflow-hidden">

      {/* ================= HERO (UPPER LAYER) ================= */}
      <div className="relative min-h-[92vh] w-full overflow-hidden bg-[#2D3C68]">

        {/* BG */}
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/dombq6plz/image/upload/v1776870966/ChatGPT_Image_Apr_22_2026_10_15_17_PM_1_clrjp0.png"
            alt="Serenity yacht"
            className="w-full h-full object-cover transition-transform duration-[4000ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `scale(${scale})` }}
          />
        </div>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D3C68]/40 via-[#2D3C68]/55 to-[#2D3C68]/85" />

        {/* CONTENT (TRUE CENTER) */}
        <div className="relative z-10 flex items-center justify-center min-h-[92vh] text-center px-6">
          <div className="max-w-[720px]">

            <div className="mb-6 text-[11px] tracking-[0.32em] text-[#F4F5F2]/60">
              THE YACHT
            </div>

            <h1 className="font-[Gambarino] text-[46px] md:text-[68px] leading-[1.06] tracking-[-0.03em] text-[#F4F5F2]">
              Traditional Phinisi
              <br />
              Elegance
            </h1>

            <p className="mt-6 text-[15px] text-[#F4F5F2]/75 max-w-[520px] mx-auto leading-[1.7]">
              Not designed as a vessel alone, but as a space where movement,
              rest, and shared time naturally find their place.
            </p>

          </div>
        </div>
      </div>

      {/* ================= ABOUT (OVERLAP LAYER) ================= */}
      <div className="relative z-20 -mt-[120px] px-6">

        <div className="max-w-[1000px] mx-auto bg-[#F4F5F2] p-[48px] md:p-[64px] shadow-[0_30px_80px_rgba(0,0,0,0.08)]">

          {/* LABEL */}
          <p className="text-[11px] tracking-[0.35em] text-[#2D3C68]/40 uppercase mb-6">
            About
          </p>

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-12 items-start">

            <h2 className="font-[Gambarino] text-[34px] md:text-[42px] leading-[1.2] text-[#2D3C68]">
              40.75 meters
              <br />
              12 guests
              <br />
              10 crew
            </h2>

            <p className="text-[15px] leading-[1.7] text-[#2D3C68]/70">
              Serenity is a 40.75 meter phinisi yacht accommodating up to 12 guests,
              supported by a full crew on board. The layout is shaped to balance shared
              moments and private space across multiple decks, allowing each journey to
              unfold naturally over time.
            </p>

          </div>

        </div>
      </div>

    </section>
  );
}

function About() {
  return (
    <section className="bg-[#F4F5F2] pt-[120px] pb-[100px] px-6 text-[#2D3C68]">

      <div className="max-w-[1000px] mx-auto">

        {/* LABEL */}
        <p className="text-[11px] tracking-[0.35em] text-[#2D3C68]/40 uppercase mb-6">
          About
        </p>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* LEFT (PHILOSOPHY BRIDGE) */}
          <h2 className="font-[Gambarino] text-[36px] md:text-[44px] leading-[1.2]">
            A Yacht Designed
            <br />
            for Life On Board
          </h2>

          {/* RIGHT (DATA + CONTEXT) */}
          <p className="text-[15px] leading-[1.7] text-[#2D3C68]/70">
            Serenity is a 40.75 meter phinisi yacht accommodating up to 12 guests,
            supported by a full crew on board. The layout is shaped to balance shared
            moments and private space across multiple decks, allowing each journey to
            unfold naturally over time.
          </p>

        </div>

      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="bg-[#F4F5F2] pt-[140px] pb-[140px] px-6 border-t border-[#2D3C68]/10">

      <div className="max-w-[1000px] mx-auto">

        {/* ================= BLOCK 1 (PRIMARY) ================= */}
        <div className="mb-[180px] grid md:grid-cols-2 gap-20 items-center">

          {/* IMAGE (LEFT) */}
          <div className="relative w-full aspect-[4/5]">
            <img
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068961/27_unvtvm.webp"
              className="w-full h-full object-cover"
            />

            <img
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068973/49_ph3xr3.webp"
              className="absolute -bottom-14 -left-14 w-[240px] h-[280px] object-cover shadow-[0_24px_70px_rgba(0,0,0,0.16)]"
            />
          </div>

          {/* TEXT (RIGHT) */}
          <div className="max-w-[520px] md:ml-auto">
            <h2 className="font-[Gambarino] text-[38px] md:text-[46px] leading-[1.18] text-[#2D3C68]">
              Life Happens
              <br />
              On the Open Deck
            </h2>

            <p className="mt-7 text-[15px] text-[#2D3C68]/75 leading-[1.7]">
              Breakfast stretches longer than planned. Someone moves to the shade,
              another stays in the sun. Nothing needs arranging — the day unfolds on its own.
            </p>
          </div>

        </div>


        {/* ================= BLOCK 2 (SECONDARY) ================= */}
        <div className="mb-[140px] grid md:grid-cols-2 gap-16 items-center">

          {/* TEXT (LEFT) */}
          <div className="max-w-[480px]">
            <h2 className="font-[Gambarino] text-[32px] md:text-[38px] leading-[1.22] text-[#2D3C68]">
              A Space Between
              <br />
              Outside and Inside
            </h2>

            <p className="mt-6 text-[15px] text-[#2D3C68]/70 leading-[1.7]">
              You step inside, but nothing really separates you from the sea.
              Air moves through, light stays present, and conversations continue
              without needing to start over.
            </p>
          </div>

          {/* IMAGE (RIGHT) */}
          <div className="relative w-full aspect-[4/5]">
            <img
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/04_fqtqkn.webp"
              className="w-full h-full object-cover"
            />

            <img
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/08_noz6qg.webp"
              className="absolute top-10 -right-10 w-[180px] h-[220px] object-cover shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
            />
          </div>

        </div>


        {/* ================= CLOSING ================= */}
        <div className="text-center max-w-[680px] mx-auto mb-[56px]">

          <h2 className="font-[Gambarino] text-[42px] md:text-[50px] leading-[1.12] text-[#2D3C68]">
            Always Connected
            <br />
            to What Surrounds You
          </h2>

        </div>

        {/* FULL BLEED */}
        <div className="w-full h-[540px] overflow-hidden">
          <img
            src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/06_f2yr7e.webp"
            className="w-full h-full object-cover"
          />
        </div>

      </div>

    </section>
  );
}

function Identity() {
  return (
    <section className="bg-[#F5F2ED] py-[140px] px-6">

      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-start">

        <div>
          <p className="text-[12px] tracking-[0.3em] text-[#6B7280] uppercase">
            The Phinisi
          </p>

          <h2 className="mt-6 font-[Canela] text-[32px] md:text-[44px] leading-[1.2] text-[#0F172A]">
            Built for Stillness.
            <br />
            Designed for Distance.
          </h2>
        </div>

        <div className="max-w-[460px]">
          <p className="text-[15px] text-[#475569] leading-relaxed">
            A 45-meter handcrafted phinisi, sailing quietly through Indonesia’s most remote waters — with space for only fourteen guests.
          </p>

          <div className="mt-8">
            <button className="text-sm tracking-wide text-[#0F172A] border-b border-[#0F172A]/30 hover:border-[#0F172A] transition">
              View Specifications
            </button>
          </div>
        </div>

      </div>

    </section>
  );
}




/* =========================
   SPACES (DENSE, TANPA DIPAKSA)
========================= */
function Spaces() {
  const exterior = [
    "https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_24_PM_lzlhwx.png",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_18_PM_dihjfs.png",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_06_38_PM_hqx36m.png",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_24_PM_lzlhwx.png",
  ];

  const interior = [
    "https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_56_PM_t7jwul.png",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_15_PM_otnwp1.png",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1775031031/ChatGPT_Image_Apr_1_2026_03_08_01_PM_yfdh57.png",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_56_PM_t7jwul.png",
  ];

  const [mode, setMode] = useState("exterior");
  const [active, setActive] = useState(0);

  const images = mode === "exterior" ? exterior : interior;

  return (
    <section className="bg-[#F5F2ED] py-[120px] px-6">

      <div className="max-w-[1280px] mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">

          <h2 className="font-[Canela] text-[28px] md:text-[36px] text-[#0F172A]">
            Spaces
          </h2>

          <div className="flex items-center gap-4 text-[14px]">

            <button
              onClick={() => {
                setMode("exterior");
                setActive(0);
              }}
              className={mode === "exterior" ? "text-[#0F172A]" : "text-[#0F172A]/30"}
            >
              Exterior
            </button>

            <span className="text-[#0F172A]/20">/</span>

            <button
              onClick={() => {
                setMode("interior");
                setActive(0);
              }}
              className={mode === "interior" ? "text-[#0F172A]" : "text-[#0F172A]/30"}
            >
              Interior
            </button>

          </div>

        </div>

        {/* GRID (PADAT, NO BORDER) */}
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-6">

          {/* LEFT */}
          <div className="grid grid-cols-2 gap-3">

            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                className={`relative h-[160px] md:h-[180px] overflow-hidden cursor-pointer ${
                  active === i
                    ? "ring-2 ring-[#0F172A]"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </div>
            ))}

          </div>

          {/* RIGHT */}
          <div className="relative w-full h-[520px] overflow-hidden">
            <img
              src={images[active]}
              className="w-full h-full object-cover"
            />
          </div>

        </div>

        {/* TEXT */}
        <div className="mt-6 max-w-[520px]">

          <h3 className="font-[Canela] text-[24px] md:text-[30px] text-[#0F172A]">
            Handcrafted by Artisans
          </h3>

          <p className="mt-2 text-[14px] text-[#0F172A]/70 leading-relaxed">
            Built by legendary Bulukumba artisans, every structure reflects
            Indonesia’s maritime heritage. Open decks, natural materials,
            and thoughtful proportions create a space that feels both grounded and expansive.
          </p>

        </div>

      </div>

    </section>
  );
}

function Cabins() {
  const cabins = [
    {
      name: "Forward Cabin",
      location: "Front Section · Bow",
      desc: "Closest to the bow. The movement of the sea is felt more directly here — subtle shifts, gentle rises, constant presence. Morning light arrives first, unobstructed.",
      note: "More movement. Closer to the ocean.",
      units: "1",
      occupancy: "2 Guests",
      deck: "Main",
      beds: "Twin",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068960/34_nlkpdq.webp",
      detail:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068958/28_csbw7z.webp",
    },
    {
      name: "Mid Cabin",
      location: "Center of Vessel",
      desc: "Positioned at the center, where movement settles into balance. Close to shared spaces, yet acoustically and physically removed from them.",
      note: "Most stable. Most balanced.",
      units: "2",
      occupancy: "2 Guests",
      deck: "Main",
      beds: "Twin",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068959/26_uyo84o.webp",
      detail:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068966/39_t9ofoe.webp",
    },
    {
      name: "Lower Cabin",
      location: "Lower Deck",
      desc: "Below the main deck, where external motion softens. Light becomes more controlled, and sound from above fades into the background.",
      note: "Quieter. More contained.",
      units: "1",
      occupancy: "2 Guests",
      deck: "Lower",
      beds: "Twin",
      image:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068955/23_1_gcmciz.webp",
      detail:
        "https://res.cloudinary.com/dombq6plz/image/upload/v1776068966/38_1_cx1idm.webp",
    },
  ];

  const [active, setActive] = useState(0);
  const [show, setShow] = useState(true);
  const [imgKey, setImgKey] = useState(0);

  const current = cabins[active];

  const select = (i) => {
    if (i === active) return;
    setShow(false);
    setTimeout(() => {
      setActive(i);
      setImgKey((k) => k + 1);
      setShow(true);
    }, 300);
  };

  const specs = [
    { label: "Units", value: current.units },
    { label: "Occupancy", value: current.occupancy },
    { label: "Deck", value: current.deck },
    { label: "Beds", value: current.beds },
  ];

  return (
    <section className="relative bg-[#2D3C68] overflow-hidden">

      {/* HEADER */}
      <div className="max-w-[1200px] mx-auto px-6 pt-[100px] pb-[48px]">
        <p className="text-[10px] tracking-[0.36em] uppercase text-white/30 mb-4">
          Cabins
        </p>

        <div className="flex items-end justify-between gap-8">
          <h2 className="font-[Gambarino] text-[52px] md:text-[60px] leading-[1.06] text-white">
            Where You Stay
            <br />
            Shapes the Journey
          </h2>

          <p className="hidden md:block text-[13px] leading-[1.75] text-white/45 max-w-[260px] pb-2">
            Each cabin offers a different way of experiencing the sea.
          </p>
        </div>
      </div>

      {/* TABS */}
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex gap-8 border-b border-white/10">
          {cabins.map((c, i) => (
            <button
              key={i}
              onClick={() => select(i)}
              className="relative pb-4 text-left"
            >
              <span
                className={`block text-[13px] tracking-[0.08em] uppercase transition ${
                  active === i
                    ? "text-white"
                    : "text-white/35 hover:text-white/60"
                }`}
              >
                {c.name.replace(" Cabin", "")}
              </span>

              <span
                className={`absolute bottom-0 left-0 h-[1px] bg-white transition-all duration-500 ${
                  active === i ? "w-full opacity-100" : "w-0 opacity-0"
                }`}
              />
            </button>
          ))}
        </div>
 
      </div>

      {/* SPLIT */}
      <div className="grid md:grid-cols-2">

        {/* IMAGE */}
        <div className="relative h-[520px] md:h-[640px] overflow-hidden">
          <img
            key={imgKey}
            src={current.image}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1400ms] ${
              show ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"
            }`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          <div
            className={`absolute bottom-6 right-6 transition-all duration-700 ${
              show ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="p-[2px] bg-white/20">
              <div className="w-[108px] h-[108px] overflow-hidden">
                <img
                  src={current.detail}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <p className="mt-[6px] text-[9px] text-white/40 text-right uppercase tracking-[0.28em]">
              Interior
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="bg-[#2D3C68] flex flex-col px-10 md:px-16 py-14 md:py-20">

          <div className={`transition duration-500 ${show ? "opacity-100" : "opacity-0"}`}>
            <h3 className="font-[Gambarino] text-[42px] md:text-[48px] text-white">
              {current.name}
            </h3>
            <p className="mt-[6px] text-[10px] text-white/35 uppercase tracking-[0.32em]">
              {current.location}
            </p>
          </div>

          <div className="mt-12">
            <p className="text-[15px] leading-[1.9] text-white/65">
              {current.desc}
            </p>
          </div>

          <div className="mt-5 flex gap-3">
            <span className="w-[14px] h-[1px] bg-white/20 mt-[6px]" />
            <p className="text-[12px] italic text-white/35">
              {current.note}
            </p>
          </div>

          <div className="mt-auto pt-10">
            {specs.map((s) => (
              <div
                key={s.label}
                className="flex justify-between py-[12px] border-t border-white/10 text-white/70"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                  {s.label}
                </span>
                <span>{s.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-8">
            <button className="bg-white text-[#2D3C68] px-9 py-[14px] text-[11px] uppercase tracking-[0.18em]">
              Reserve
            </button>

            <button className="text-white/40 text-[11px] uppercase tracking-[0.16em] hover:text-white">
              Floor Plan →
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}
 

function Gallery() {
  const images = [
    "https://res.cloudinary.com/dombq6plz/image/upload/v1776068957/29_dychc2.webp",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1776068955/21_pdqnqq.webp",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1776068953/19_1_mwv93q.webp",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/08_noz6qg.webp",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/05_ec1k9n.webp",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1776068961/27_unvtvm.webp",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1776068973/49_ph3xr3.webp",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/07_iujxr6.webp",
    "https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/06_f2yr7e.webp",
  ];

  const layout = [
    { i: 0, span: "col-span-6", h: "h-[520px]" },
    { i: 1, span: "col-span-3", h: "h-[300px]" },
    { i: 2, span: "col-span-3", h: "h-[300px]" },
    { i: 3, span: "col-span-6", h: "h-[380px]" },
    { i: 4, span: "col-span-2", h: "h-[260px]" },
    { i: 5, span: "col-span-2", h: "h-[260px]" },
    { i: 6, span: "col-span-2", h: "h-[260px]" },
    { i: 7, span: "col-span-3", h: "h-[300px]" },
    { i: 8, span: "col-span-3", h: "h-[300px]" },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const close = () => setActiveIndex(null);
  const next = () => setActiveIndex((p) => (p + 1) % images.length);
  const prev = () => setActiveIndex((p) => (p === 0 ? images.length - 1 : p - 1));

  useEffect(() => {
    const key = (e) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [activeIndex]);

  return (
    <section className="bg-[#F4F5F2] py-[160px] px-6">
      <div className="max-w-[1200px] mx-auto">

        {/* HEADER */}
        <div className="mb-20 max-w-[520px]">
          <p className="text-[11px] tracking-[0.35em] text-[#2D3C68]/50 uppercase">
            Gallery
          </p>
          <h2 className="mt-4 font-[Gambarino] text-[42px] md:text-[56px] text-[#2D3C68] leading-[1.1]">
            A Closer Look
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {layout.map(({ i, span, h }) => (
            <div
              key={i}
              className={`${span} cursor-pointer group`}
              onClick={() => setActiveIndex(i)}
            >
              <div className="overflow-hidden">
                <img
                  src={images[i]}
                  loading="lazy"
                  className={`w-full ${h} object-cover transition duration-700 group-hover:scale-[1.02]`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center">
          <button onClick={close} className="absolute top-6 right-6 text-white text-[11px] tracking-[0.4em]">
            CLOSE
          </button>

          <button onClick={prev} className="absolute left-6 text-white text-[28px] opacity-40 hover:opacity-100">
            ←
          </button>

          <img
            key={activeIndex}
            src={images[activeIndex]}
            className="max-h-[85vh] max-w-[90vw] object-contain animate-fade"
          />

          <button onClick={next} className="absolute right-6 text-white text-[28px] opacity-40 hover:opacity-100">
            →
          </button>
        </div>
      )}

      <style jsx>{`
        .animate-fade {
          animation: fadeScale 0.4s ease;
        }
        @keyframes fadeScale {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}


function LivingSpaces() {
  return (
    <section className="bg-[#F5F2ED] py-[140px] px-6">

      <div className="max-w-[1200px] mx-auto">

        {/* HEADER */}
        <div className="max-w-[640px]">
          <p className="text-[12px] tracking-[0.3em] text-[#6B7280] uppercase">
            Saloon
          </p>

          <h2 className="mt-6 font-[Canela] text-[36px] md:text-[52px] leading-[1.1] text-[#0F172A]">
            Living Spaces
            <br />
            Home Away From Home
          </h2>
        </div>

        {/* IMAGE COMPOSITION */}
        <div className="mt-14 grid md:grid-cols-[1.3fr_0.7fr] gap-8 items-start">

          {/* LEFT (LEADER) */}
          <div className="relative w-full h-[360px] md:h-[440px] overflow-hidden">
            <img
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_24_PM_lzlhwx.png"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT (SUPPORTING, NAIK + LEBIH KECIL) */}
          <div className="relative w-full h-[300px] md:h-[360px] overflow-hidden md:mt-10">
            <img
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_18_PM_dihjfs.png"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

        {/* CONTENT (DIKETATIN + CTA MASUK FLOW) */}
        <div className="mt-10 max-w-[560px]">

          <p className="text-[15px] text-[#0F172A]/75 leading-relaxed">
            Sanctuary’s communal spaces offer elegant relaxation and connection.
            Panoramic ocean views frame the lounge and dining areas, while
            generous decks invite long conversations and quiet moments at sea.
          </p>

          <div className="mt-8 flex items-center gap-4">

            <button className="px-6 py-2.5 rounded-full bg-[#A8BEB7] text-[#0F172A] text-[13px] tracking-[0.12em] uppercase hover:bg-[#9CB3AC] transition">
              Reserve
            </button>

            <button className="px-6 py-2.5 rounded-full border border-[#0F172A]/20 text-[#0F172A] text-[13px] tracking-[0.12em] uppercase hover:border-[#0F172A] transition">
              Book a Call
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

function DeckAndSpecs() {
  const [deck, setDeck] = useState("main");
  const [visible, setVisible] = useState({
    header: false,
    image: false,
    peak: false,
    specs: false,
  });

  const headerRef = useRef(null);
  const imageRef = useRef(null);
  const peakRef = useRef(null);
  const specsRef = useRef(null);

  const decks = {
    lower:
      "https://res.cloudinary.com/dombq6plz/image/upload/v1776068975/Layout_00_-_Lower_Deck_m92vvk.webp",
    main:
      "https://res.cloudinary.com/dombq6plz/image/upload/v1776068978/Layout_01_-_Main_Deck_yztnzb.webp",
    upper:
      "https://res.cloudinary.com/dombq6plz/image/upload/v1776068974/Layout_-_02_Upper_Deck_pouo1p.webp",
    top:
      "https://res.cloudinary.com/dombq6plz/image/upload/v1776068975/Layout_-_03_Top_Deck_yvyisz.webp",
  };

  const deckList = ["lower", "main", "upper", "top"];

  const specs = [
    ["Vessel Type", "Phinisi Sailing Yacht"],
    ["Flag", "Indonesia"],
    ["Beam", "7.26 m"],
    ["Draft", "2.20 m"],
    ["Year Built", "2025"],
    ["Build Location", "Tanah Beru & Bira, South Sulawesi"],
    ["Cruise Speed", "8–10 knots"],
    ["Maximum Speed", "11 knots"],
    ["Navigation", "Garmin Navigation System"],
  ];

  useEffect(() => {
    const observe = (ref, key) => {
      const o = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setVisible((prev) => ({ ...prev, [key]: true }));
          }
        },
        { threshold: 0.15 }
      );

      if (ref.current) o.observe(ref.current);
      return o;
    };

    const observers = [
      observe(headerRef, "header"),
      observe(imageRef, "image"),
      observe(peakRef, "peak"),
      observe(specsRef, "specs"),
    ];

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="bg-[#F4F5F2] py-[160px] px-6">
      <div className="max-w-[1200px] mx-auto">

        {/* ================= HEADER ================= */}
        <div
          ref={headerRef}
          className={`text-center mb-[80px] transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]
          ${visible.header ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#2D3C68]/40">
            Vessel Overview
          </p>

          <h2 className="mt-6 font-[Gambarino] text-[46px] md:text-[60px] leading-[1.15] text-[#2D3C68]">
            Understand the Vessel
          </h2>
        </div>

        {/* ================= SELECTOR ================= */}
        <div
          className={`flex justify-center gap-10 mb-[60px] transition-all duration-[800ms]
          ${visible.image ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          {deckList.map((key) => (
            <button
              key={key}
              onClick={() => setDeck(key)}
              className={`text-[11px] tracking-[0.3em] uppercase pb-2 transition
              ${
                deck === key
                  ? "text-[#2D3C68] border-b border-[#2D3C68]"
                  : "text-[#2D3C68]/30 hover:text-[#2D3C68]/60"
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        {/* ================= IMAGE ================= */}
        <div
          ref={imageRef}
          className={`relative max-w-[1000px] mx-auto mb-[140px] transition-all duration-[1000ms]
          ${visible.image ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="relative p-[10px] bg-[#F4F5F2] shadow-[0_40px_80px_rgba(0,0,0,0.08)]">
            <div className="absolute inset-0 border border-[#2D3C68]/10 pointer-events-none" />

            <div className="relative p-[14px] bg-white">
              <div className="absolute inset-0 border border-[#2D3C68]/10 pointer-events-none" />

              <div className="relative aspect-[16/9] overflow-hidden">
                {Object.entries(decks).map(([key, src]) => (
                  <img
                    key={key}
                    src={src}
                    alt={`${key} deck`}
                    className={`absolute inset-0 w-full h-full object-contain transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${
                      deck === key
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-[1.01]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= DATA SYSTEM ================= */}
        <div ref={peakRef} className="max-w-[900px] mx-auto text-center">

          {/* 12 */}
          <div
            className={`mb-[32px] transition-all duration-[1000ms]
            ${visible.peak ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="font-[Gambarino] text-[90px] md:text-[110px] leading-none text-[#2D3C68]">
              12
            </div>

            <p className="mt-2 text-[12px] tracking-[0.28em] uppercase text-[#2D3C68]/45">
              Guests
            </p>
          </div>

          {/* MEANING */}
          <div
            className={`mb-[80px] transition-all duration-[1000ms] delay-100
            ${visible.peak ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <p className="text-[16px] leading-[1.8] text-[#2D3C68]/70 max-w-[560px] mx-auto">
              Not crowded. Not empty.
              A scale where people stay close without feeling compressed.
            </p>
          </div>

          {/* STRUCTURE */}
          <div
            className={`grid grid-cols-3 gap-12 mb-[120px] transition-all duration-[1000ms] delay-200
            ${visible.peak ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {[
              ["Length", "40.75 m"],
              ["Cabins", "4"],
              ["Crew", "10"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#2D3C68]/40">
                  {label}
                </p>

                <p className="mt-3 text-[20px] text-[#2D3C68]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SPECS ================= */}
        <div
          ref={specsRef}
          className={`max-w-[900px] mx-auto transition-all duration-[1000ms]
          ${visible.specs ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="text-center text-[11px] tracking-[0.35em] uppercase mb-[32px] text-[#2D3C68]/35">
            Technical Specifications
          </p>

          <div className="grid md:grid-cols-2 gap-x-20">
            {specs.map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between items-baseline py-[14px] border-b border-[#2D3C68]/10"
              >
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#2D3C68]/35">
                  {label}
                </span>

                <span className="text-[14px] text-[#2D3C68] text-right">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function Reservation() {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden">

      {/* ================= BACKGROUND ================= */}
      <img
        src="https://res.cloudinary.com/dombq6plz/image/upload/v1776068893/06_f2yr7e.webp"
        alt="Serenity Reservation"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">

        <div className="text-center max-w-[640px]">

          {/* LABEL */}
          <p className="text-[11px] tracking-[0.35em] text-white/60 uppercase">
            Reservation
          </p>

          {/* HEADLINE */}
          <h2 className="mt-6 font-[Gambarino] text-[44px] md:text-[60px] leading-[1.1] text-white">
            Start Your Journey
          </h2>

          {/* SUBTEXT */}
          <p className="mt-6 text-[15px] text-white/80 leading-[1.7]">
            Share your preferred dates and group size.  
            We’ll take care of the rest.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">

            {/* PRIMARY */}
            <button className="px-8 py-3 bg-white text-[#1A1A1A] text-[13px] tracking-[0.15em] uppercase rounded-full hover:bg-white/90 transition">
              Enquire
            </button>

            {/* SECONDARY */}
            <a
              href="https://wa.me/6281353613617"
              target="_blank"
              className="px-8 py-3 border border-white/40 text-white text-[13px] tracking-[0.15em] uppercase rounded-full hover:border-white transition"
            >
              WhatsApp
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}


function Closing() {
  return (
    <section className="relative h-[100vh] w-full overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <img
        src="https://res.cloudinary.com/dombq6plz/image/upload/v1775031030/ChatGPT_Image_Apr_1_2026_03_07_15_PM_otnwp1.png"
        alt="Closing"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* ATMOSPHERIC OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">

        <div className="text-center max-w-[820px]">

          {/* LABEL */}
          <p className="text-[11px] tracking-[0.4em] text-white/60 uppercase">
            Reservations
          </p>

          {/* HEADLINE */}
          <h2 className="mt-6 text-[42px] md:text-[64px] leading-[1.15] text-white font-[Canela]">

            <span className="block font-light">
              Find the <span className="italic">Sanctuary</span>
            </span>

            <span className="block mt-2">
              You’ve Been Searching For
            </span>

          </h2>

          {/* CTA GROUP */}
          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">

            {/* PRIMARY */}
            <button className="px-8 py-3 bg-white text-[#0F172A] text-[13px] tracking-[0.15em] uppercase rounded-full hover:bg-white/90 transition">
              Reserve
            </button>

            {/* SECONDARY */}
            <button className="px-8 py-3 border border-white/40 text-white text-[13px] tracking-[0.15em] uppercase rounded-full hover:border-white transition">
              Book an Initial Call
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}