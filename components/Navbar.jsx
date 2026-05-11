"use client";

import { useState, useEffect, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";

import Link from "next/link";

import Image from "next/image";

import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const [show, setShow] = useState(true);

  const [scrolled, setScrolled] = useState(false);

  const lastScroll = useRef(0);

  /*
    ========================================
    SCROLL SYSTEM
    ========================================
  */

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const current = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(current > 24);

          if (current < 40) {
            setShow(true);

            lastScroll.current = current;

            ticking = false;

            return;
          }

          if (
            current > lastScroll.current &&
            current > 120
          ) {
            setShow(false);
          } else {
            setShow(true);
          }

          lastScroll.current = current;

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  /*
    ========================================
    BODY LOCK
    ========================================
  */

  useEffect(() => {
    document.body.style.overflow = open
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /*
    ========================================
    MENU ITEMS
    ========================================
  */

  const menuItems = [
    {
      label: "Home",

      href: "/",
    },

    {
      label: "The Yacht",

      href: "/yacht",
    },

    {
      label: "Experiences",

      href: "/experiences",
    },

    {
      label: "Destinations",

      href: "/destinations",
    },

    {
      label: "Rates & Schedule",

      href: "/rates-and-schedule",
    },

    {
      label: "About",

      href: "/about",
    },
  ];

  return (
    <>
      {/* ========================================= */}
      {/* NAVBAR */}
      {/* ========================================= */}

      <motion.header
        animate={{
          y: show ? 0 : -140,

          opacity: show ? 1 : 0,
        }}
        transition={{
          duration: 0.55,

          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          fixed
          top-5
          left-1/2
          z-50
          w-[94%]
          max-w-[1240px]
          -translate-x-1/2
        "
      >
        <div
          className={`
            relative
            overflow-hidden
            rounded-full
            border
            transition-all
            duration-500
            ${
              scrolled
                ? "border-[#2D3C68]/10 bg-[#F4F5F2]/92 shadow-[0_14px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl"
                : "border-white/14 bg-black/[0.08] backdrop-blur-[14px]"
            }
          `}
        >
          {/* ========================================= */}
          {/* ATMOSPHERIC EDGE */}
          {/* ========================================= */}

          <div
            className={`
              absolute
              left-0
              top-0
              h-px
              w-full
              transition-all
              duration-500
              ${
                scrolled
                  ? "bg-gradient-to-r from-transparent via-[#B08D57]/26 to-transparent"
                  : "bg-gradient-to-r from-transparent via-white/12 to-transparent"
              }
            `}
          />

          {/* ========================================= */}
          {/* INNER */}
          {/* ========================================= */}

          <div
            className={`
              grid
              grid-cols-3
              items-center
              px-5
              py-3
              transition-colors
              duration-500
              md:px-7
              md:py-4
              ${
                scrolled
                  ? "text-[#2D3C68]"
                  : "text-[#F4F5F2]"
              }
            `}
          >
            {/* ========================================= */}
            {/* LEFT */}
            {/* ========================================= */}

            <div className="flex items-center justify-start gap-4">
              <button
                onClick={() => setOpen(true)}
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  transition-all
                  duration-300
                "
              >
                <Menu
                  strokeWidth={1.5}
                  className="
                    h-[15px]
                    w-[15px]
                    opacity-[0.86]
                    transition-all
                    duration-300
                    group-hover:opacity-100
                  "
                />

                <span
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.32em]
                    opacity-[0.88]
                    transition-all
                    duration-300
                    group-hover:opacity-100
                  "
                >
                  Menu
                </span>
              </button>
            </div>

            {/* ========================================= */}
            {/* CENTER */}
            {/* ========================================= */}

            <div className="flex justify-center">
              <Link
                href="/"
                className="
                  relative
                  block
                  h-[34px]
                  w-[150px]
                  md:h-[40px]
                  md:w-[180px]
                "
              >
                {/* LIGHT */}

                <Image
                  src="https://res.cloudinary.com/dombq6plz/image/upload/v1777356413/SERENITY_LOGO-02_u1bcf2_1_zc65st.png"
                  alt="Serenity"
                  fill
                  priority
                  className={`
                    object-contain
                    transition-all
                    duration-500
                    ${
                      scrolled
                        ? "opacity-0"
                        : "opacity-[0.95]"
                    }
                  `}
                />

                {/* DARK */}

                <Image
                  src="https://res.cloudinary.com/dombq6plz/image/upload/v1777356413/SERENITY_LOGO-02_u1bcf2_1_zc65st.png"
                  alt="Serenity"
                  fill
                  priority
                  className={`
                    object-contain
                    brightness-0
                    transition-all
                    duration-500
                    ${
                      scrolled
                        ? "opacity-[0.9]"
                        : "opacity-0"
                    }
                  `}
                />
              </Link>
            </div>

            {/* ========================================= */}
            {/* RIGHT */}
            {/* ========================================= */}

            <div className="flex justify-end">
              <Link
                href="/contact"
                className={`
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  px-4
                  py-2
                  text-[11px]
                  uppercase
                  tracking-[0.28em]
                  transition-all
                  duration-300
                  md:px-5
                  md:text-[12px]
                  ${
                    scrolled
                      ? "border-[#2D3C68]/14 bg-[#2D3C68] text-[#F4F5F2] hover:scale-[1.03]"
                      : "border-[#F4F5F2]/32 text-[#F4F5F2] hover:bg-[#F4F5F2] hover:text-[#2D3C68]"
                  }
                `}
              >
                <span>Reserve</span>

                <ArrowUpRight
                  strokeWidth={1.5}
                  className="
                    h-[13px]
                    w-[13px]
                    transition-transform
                    duration-300
                    group-hover:translate-x-[1px]
                    group-hover:-translate-y-[1px]
                  "
                />
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ========================================= */}
      {/* FULLSCREEN MENU */}
      {/* ========================================= */}

      <AnimatePresence mode="wait">
        {open && (
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
              duration: 0.45,
            }}
            className="
              fixed
              inset-0
              z-[100]
              overflow-hidden
              bg-[#2D3C68]
              text-[#F4F5F2]
            "
          >
            {/* ========================================= */}
            {/* ATMOSPHERE */}
            {/* ========================================= */}

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_22%,rgba(176,141,87,0.08),transparent_50%)]" />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_45%,rgba(255,255,255,0.03),transparent_55%)]" />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.04] via-transparent to-black/[0.12]" />

            {/* ========================================= */}
            {/* CONTENT */}
            {/* ========================================= */}

            <div
              className="
                relative
                flex
                h-full
                flex-col
                px-6
                py-6
                md:px-12
                md:py-10
              "
            >
              {/* ========================================= */}
              {/* TOP */}
              {/* ========================================= */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/[0.08]
                  pb-5
                "
              >
                <div
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.32em]
                    text-white/46
                  "
                >
                  Serenity
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="
                    group
                    inline-flex
                    items-center
                    gap-3
                    text-white/56
                    transition-all
                    duration-500
                    hover:text-white/90
                  "
                >
                  <span
                    className="
                      text-[11px]
                      uppercase
                      tracking-[0.32em]
                    "
                  >
                    Close
                  </span>

                  <X
                    strokeWidth={1.4}
                    className="
                      h-[15px]
                      w-[15px]
                      transition-transform
                      duration-500
                      group-hover:rotate-90
                    "
                  />
                </button>
              </div>

              {/* ========================================= */}
              {/* LINKS */}
              {/* ========================================= */}

              <div className="flex flex-1 items-center">
                <div className="w-full">
                  {menuItems.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{
                        opacity: 0,

                        y: 24,
                      }}
                      animate={{
                        opacity: 1,

                        y: 0,
                      }}
                      transition={{
                        duration: 0.55,

                        delay: 0.06 + i * 0.06,

                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="
                        border-b
                        border-white/[0.08]
                      "
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="
                          group
                          flex
                          items-center
                          justify-between
                          py-4
                          md:py-6
                        "
                      >
                        <span
                          className="
                            font-[Gambarino]
                            text-[34px]
                            leading-none
                            tracking-[-0.04em]
                            md:text-[58px]
                          "
                        >
                          {item.label}
                        </span>

                        <span
                          className="
                            text-[11px]
                            uppercase
                            tracking-[0.28em]
                            opacity-0
                            transition-all
                            duration-300
                            group-hover:opacity-70
                          "
                        >
                          Enter
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ========================================= */}
              {/* FOOTER */}
              {/* ========================================= */}

              <div
                className="
                  grid
                  gap-3
                  border-t
                  border-white/[0.08]
                  pt-6
                  text-[11px]
                  uppercase
                  tracking-[0.2em]
                  text-white/36
                  md:grid-cols-3
                "
              >
                <div>Indonesia Archipelago</div>

                <div className="md:text-center">
                  Quiet journeys across the sea
                </div>

                <div className="md:text-right">
                  Serenity Yacht
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}