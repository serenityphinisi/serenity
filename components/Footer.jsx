"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const FOOTER_CONFIG = {
  pattern: {
    ikat:
      "https://res.cloudinary.com/dombq6plz/image/upload/v1778486752/ChatGPT_Image_May_11_2026_03_01_56_PM_2_k2aiwl.png",
  },

  logo: {
    src: "https://res.cloudinary.com/dombq6plz/image/upload/v1777356413/SERENITY_LOGO-02_u1bcf2_1_1_ahyyak.png",
    alt: "Serenity Yacht",
  },

  text: {
    label: "Private Charter Inquiry",
    headlineLine1: "Your voyage begins",
    headlineLine2: "with a conversation",
    cta: "Begin Your Voyage",
  },

  routes: {
    contact: "/contact",
  },

  railImages: [
    {
      src: "https://res.cloudinary.com/dombq6plz/image/upload/v1776068973/49_ph3xr3.webp",
      alt: "Quiet sea view aboard Serenity",
    },
    {
      src: "https://res.cloudinary.com/dombq6plz/image/upload/v1778511762/ChatGPT_Image_May_11_2026_09_55_36_PM_a2mixz.png",
      alt: "Calm Indonesian water and islands during a Serenity voyage",
    },
    {
      src: "https://res.cloudinary.com/dombq6plz/image/upload/v1778425837/ChatGPT_Image_May_10_2026_10_10_05_PM_1_dv3ebm.png",
      alt: "Quiet onboard dining detail aboard Serenity",
    },
    {
      src: "https://res.cloudinary.com/dombq6plz/image/upload/v1776068967/40_oxbvdi.webp",
      alt: "Interior space aboard Serenity",
    },
    {
      src: "https://res.cloudinary.com/dombq6plz/image/upload/v1776869679/ChatGPT_Image_Apr_22_2026_09_52_27_PM_sk1t1e.png",
      alt: "Warm evening atmosphere aboard Serenity",
    },
    {
      src: "https://res.cloudinary.com/dombq6plz/image/upload/v1778509540/ChatGPT_Image_May_11_2026_09_24_55_PM_1_bc9y57.png",
      alt: "Life aboard Serenity at sea",
    },
  ],

  contact: {
    whatsappLabel: "WhatsApp",
    whatsappText: "+62 000 0000 0000",
    whatsappHref: "https://wa.me/620000000000",

    locationText: "Komodo & Raja Ampat",

    emailLabel: "Email",
    emailText: "hello@serenityyacht.com",
    emailHref: "mailto:hello@serenityyacht.com",
  },

  nav: [
    { label: "The Yacht", href: "/yacht" },
    { label: "Destinations", href: "/destinations" },
    { label: "Experiences", href: "/experiences" },
    { label: "Rates & Schedule", href: "/rates-and-schedule" },
    { label: "About", href: "/about" },
  ],

  stats: ["12 Guests", "4 Cabins", "10 Crew", "Phinisi Yacht"],

  legal: ["Privacy Policy", "Terms & Conditions"],

  social: {
    instagram: "https://instagram.com",
    whatsapp: "https://wa.me/620000000000",
  },
};

export default function ClosingSuite() {
  const config = FOOTER_CONFIG;

  const sectionRef = useRef(null);
  const ctaRef = useRef(null);
  const railRef = useRef(null);
  const contactRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const headlineLines =
      ctaRef.current?.querySelectorAll(".headline-line") ?? [];

    const ctaNodes = [
      ctaRef.current?.querySelector(".cta-label"),
      ...headlineLines,
      ctaRef.current?.querySelector(".cta-button"),
    ].filter(Boolean);

    const railItems = railRef.current?.querySelectorAll(".rail-frame") ?? [];
    const contactItems =
      contactRef.current?.querySelectorAll(".contact-reveal") ?? [];
    const bottomItems =
      bottomRef.current?.querySelectorAll(".bottom-reveal") ?? [];

    const allNodes = [
      ...ctaNodes,
      ...railItems,
      ...contactItems,
      ...bottomItems,
    ].filter(Boolean);

    if (reduce) {
      gsap.set(allNodes, {
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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      tl.fromTo(
        ctaRef.current?.querySelector(".cta-label"),
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: serenityEase,
        },
        0
      );

      if (headlineLines.length > 0) {
        tl.fromTo(
          headlineLines,
          {
            opacity: 0,
            y: 24,
            filter: "blur(7px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.18,
            stagger: 0.1,
            ease: serenityEase,
          },
          0.12
        );
      }

      tl.fromTo(
        ctaRef.current?.querySelector(".cta-button"),
        {
          opacity: 0,
          y: 12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: serenityEase,
        },
        0.36
      );

      if (railItems.length > 0) {
        gsap.fromTo(
          railItems,
          {
            opacity: 0,
            y: 18,
            filter: "blur(5px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.95,
            stagger: 0.055,
            ease: serenityEase,
            scrollTrigger: {
              trigger: railRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      if (contactItems.length > 0) {
        gsap.fromTo(
          contactItems,
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
            stagger: 0.06,
            ease: serenityEase,
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }

      if (bottomItems.length > 0) {
        gsap.fromTo(
          bottomItems,
          {
            opacity: 0,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.05,
            ease: serenityEase,
            scrollTrigger: {
              trigger: bottomRef.current,
              start: "top 94%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Private charter inquiry and Serenity closing information"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#2D3C68]
        text-[#F4F5F2]
      "
      style={{
        backgroundColor: "#2D3C68",
        colorScheme: "dark",
      }}
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          bg-[#2D3C68]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
        "
        style={{
          background:
            "linear-gradient(180deg, rgba(26,26,26,0.2) 0%, rgba(26,26,26,0.36) 54%, rgba(26,26,26,0.52) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-[6]
          h-[150px]
          md:h-[180px]
        "
        style={{
          background:
            "linear-gradient(180deg, rgba(244,245,242,0.24) 0%, rgba(244,245,242,0.11) 28%, rgba(244,245,242,0.035) 62%, rgba(244,245,242,0) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-12%]
          top-[2%]
          z-[3]
          hidden
          h-[560px]
          w-[min(820px,68vw)]
          rotate-[-3deg]
          opacity-[0.07]
          mix-blend-screen
          md:block
        "
        style={{
          backgroundImage: `url(${config.pattern.ikat})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
          filter: "saturate(0.72) brightness(1.04) contrast(1.04)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.56) 42%, rgba(0,0,0,0.2) 68%, rgba(0,0,0,0) 86%)",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.56) 42%, rgba(0,0,0,0.2) 68%, rgba(0,0,0,0) 86%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[10%]
          right-[2%]
          z-[3]
          hidden
          h-[410px]
          w-[min(580px,46vw)]
          rotate-[4deg]
          opacity-[0.034]
          mix-blend-screen
          md:block
        "
        style={{
          backgroundImage: `url(${config.pattern.ikat})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
          filter: "saturate(0.68) brightness(1.02) contrast(1.03)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.4) 48%, rgba(0,0,0,0.12) 72%, rgba(0,0,0,0) 88%)",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.4) 48%, rgba(0,0,0,0.12) 72%, rgba(0,0,0,0) 88%)",
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
          h-[40%]
          opacity-[0.038]
          mix-blend-screen
          md:hidden
        "
        style={{
          backgroundImage: `url(${config.pattern.ikat})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "520px auto",
          backgroundPosition: "center top",
          filter: "saturate(0.72) brightness(1.04) contrast(1.04)",
          WebkitMaskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0.25) 62%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0.25) 62%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
        "
        style={{
          background:
            "radial-gradient(circle at 50% 8%, rgba(244,245,242,0.055) 0%, rgba(244,245,242,0.016) 30%, rgba(244,245,242,0) 62%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
        "
        style={{
          background:
            "radial-gradient(circle at 50% 31%, rgba(176,141,87,0.062) 0%, rgba(176,141,87,0.018) 32%, rgba(176,141,87,0) 62%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[2]
          h-[44%]
        "
        style={{
          background:
            "linear-gradient(180deg, rgba(26,26,26,0) 0%, rgba(26,26,26,0.28) 42%, rgba(26,26,26,0.48) 100%)",
        }}
      />

      <div
        ref={ctaRef}
        className="
          relative
          z-10
          mx-auto
          flex
          max-w-[980px]
          flex-col
          items-center
          px-6
          pb-[86px]
          pt-[132px]
          text-center
          sm:px-8
          sm:pb-[96px]
          sm:pt-[144px]
          md:px-10
          md:pb-[112px]
          md:pt-[164px]
          lg:pb-[122px]
          lg:pt-[172px]
        "
      >
        <p
          className="
            cta-label
            text-[10px]
            uppercase
            tracking-[0.34em]
            text-[#F4F5F2]/62
            md:text-[11px]
          "
        >
          {config.text.label}
        </p>

        <h2
          className="
            mt-6
            font-[Gambarino]
            text-[42px]
            leading-[0.99]
            tracking-[-0.045em]
            text-[#F4F5F2]
            sm:text-[52px]
            md:text-[clamp(62px,6.6vw,84px)]
          "
        >
          <span className="headline-line block">
            {config.text.headlineLine1}
          </span>

          <span className="headline-line block">
            {config.text.headlineLine2}
          </span>
        </h2>

        <div className="cta-button mt-9">
          <TransitionLink
            href={config.routes.contact}
            className="
              group
              inline-flex
              min-h-[48px]
              items-center
              justify-center
              gap-3
              rounded-full
              border
              border-[#F4F5F2]
              bg-[#F4F5F2]
              px-7
              py-3.5
              text-[11px]
              uppercase
              tracking-[0.18em]
              text-[#2D3C68]
              shadow-[0_18px_54px_rgba(0,0,0,0.18)]
              transition-all
              duration-500
              ease-[cubic-bezier(0.22,1,0.36,1)]
              hover:bg-transparent
              hover:text-[#F4F5F2]
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
          </TransitionLink>
        </div>
      </div>

      <div
        ref={railRef}
        aria-label="Serenity voyage moments"
        className="
          relative
          z-10
          w-full
          overflow-hidden
          pb-[58px]
          md:pb-[76px]
        "
      >
        <div
          className="
            flex
            gap-4
            overflow-x-auto
            px-6
            [scrollbar-width:none]
            sm:px-8
            md:gap-5
            md:px-10
            lg:px-14
            [&::-webkit-scrollbar]:hidden
          "
        >
          {config.railImages.map((image, index) => (
            <article
              key={`${image.src}-${index}`}
              className="
                rail-frame
                group
                relative
                h-[166px]
                w-[78vw]
                max-w-[380px]
                shrink-0
                overflow-hidden
                rounded-[7px]
                bg-[#F4F5F2]/[0.035]
                sm:h-[188px]
                sm:w-[58vw]
                md:h-[218px]
                md:w-[34vw]
                lg:h-[236px]
                lg:w-[29vw]
                xl:w-[26vw]
              "
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="
                  (max-width: 639px) 78vw,
                  (max-width: 767px) 58vw,
                  (max-width: 1023px) 34vw,
                  (max-width: 1279px) 29vw,
                  26vw
                "
                className="
                  object-cover
                  object-center
                  transition-transform
                  duration-[1800ms]
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  group-hover:scale-[1.025]
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#2D3C68]/26
                  via-transparent
                  to-transparent
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  ring-1
                  ring-inset
                  ring-[#F4F5F2]/[0.08]
                "
              />
            </article>
          ))}
        </div>
      </div>

      <div
        ref={contactRef}
        className="
          relative
          z-10
          mx-auto
          max-w-[1280px]
          px-6
          pb-[54px]
          pt-[22px]
          sm:px-8
          md:px-10
          md:pb-[64px]
          lg:px-14
        "
      >
        <div
          className="
            grid
            gap-10
            border-y
            border-[#F4F5F2]/[0.075]
            py-9
            text-center
            md:grid-cols-[1fr_1.1fr_1fr]
            md:items-center
            md:gap-10
            md:py-10
          "
        >
          <div className="contact-reveal md:text-left">
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.3em]
                text-[#F4F5F2]/38
              "
            >
              {config.contact.whatsappLabel}
            </p>

            <a
              href={config.contact.whatsappHref}
              className="
                mt-4
                block
                font-[Gambarino]
                text-[25px]
                leading-none
                tracking-[-0.02em]
                text-[#F4F5F2]
                transition-colors
                duration-300
                hover:text-[#F4F5F2]/72
                md:text-[28px]
              "
            >
              {config.contact.whatsappText}
            </a>
          </div>

          <div
            className="
              contact-reveal
              flex
              flex-col
              items-center
              justify-center
              text-center
            "
          >
            <img
              src={config.logo.src}
              alt={config.logo.alt}
              className="
                h-14
                w-auto
                object-contain
                opacity-90
                sm:h-16
                md:h-[72px]
              "
              style={{
                filter: "invert(1) brightness(1.92) contrast(0.86)",
              }}
            />

            <div className="mt-5 flex w-[88px] items-center gap-[6px]">
              <span
                className="h-px flex-1"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(176,141,87,0.56))",
                }}
              />

              <span className="h-[4px] w-[4px] shrink-0 rounded-full bg-[#B08D57]/75" />

              <span
                className="h-px flex-1"
                style={{
                  background:
                    "linear-gradient(to left, transparent, rgba(176,141,87,0.56))",
                }}
              />
            </div>

            <p
              className="
                mt-4
                text-[11px]
                uppercase
                tracking-[0.22em]
                text-[#F4F5F2]/46
              "
            >
              {config.contact.locationText}
            </p>

            <div
              className="
                mt-4
                grid
                grid-cols-2
                gap-x-5
                gap-y-2
                text-center
                sm:flex
                sm:flex-wrap
                sm:items-center
                sm:justify-center
                sm:gap-x-5
                sm:gap-y-2
              "
            >
              {config.stats.map((item) => (
                <span
                  key={item}
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.24em]
                    text-[#F4F5F2]/36
                  "
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="contact-reveal md:text-right">
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.3em]
                text-[#F4F5F2]/38
              "
            >
              {config.contact.emailLabel}
            </p>

            <a
              href={config.contact.emailHref}
              className="
                mt-4
                block
                break-words
                font-[Gambarino]
                text-[24px]
                leading-none
                tracking-[-0.02em]
                text-[#F4F5F2]
                transition-colors
                duration-300
                hover:text-[#F4F5F2]/72
                md:text-[27px]
              "
            >
              {config.contact.emailText}
            </a>
          </div>
        </div>
      </div>

      <div
        ref={bottomRef}
        className="
          relative
          z-10
          mx-auto
          max-w-[1280px]
          px-6
          pb-8
          sm:px-8
          md:px-10
          lg:px-14
        "
      >
        <div
          className="
            bottom-reveal
            h-px
            w-full
          "
          style={{
            background:
              "linear-gradient(90deg, rgba(244,245,242,0) 0%, rgba(244,245,242,0.075) 50%, rgba(244,245,242,0) 100%)",
          }}
        />

        <div
          className="
            bottom-reveal
            grid
            gap-5
            py-7
            text-center
            text-[11px]
            text-[#F4F5F2]/42
            sm:text-xs
            lg:grid-cols-[1fr_auto_1fr]
            lg:items-center
            lg:text-left
          "
        >
          <p>© 2026 Serenity Yacht</p>

          <nav
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-5
              gap-y-2
            "
          >
            {config.nav.map((item) => (
              <TransitionLink
                key={item.label}
                href={item.href}
                className="
                  transition-colors
                  duration-300
                  hover:text-[#F4F5F2]/76
                "
              >
                {item.label}
              </TransitionLink>
            ))}
          </nav>

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-4
              gap-y-2
              lg:justify-end
            "
          >
            {config.legal.map((item) => (
              <span
                key={item}
                className="
                  transition-colors
                  duration-300
                  hover:text-[#F4F5F2]/76
                "
              >
                {item}
              </span>
            ))}

            <a
              href={config.social.instagram}
              aria-label="Instagram"
              className="
                inline-flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-[#F4F5F2]/10
                text-[#F4F5F2]/48
                transition-all
                duration-300
                ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:border-[#F4F5F2]/26
                hover:text-[#F4F5F2]/82
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#B08D57]
              "
            >
              <FaInstagram className="h-[17px] w-[17px]" />
            </a>

            <a
              href={config.social.whatsapp}
              aria-label="WhatsApp"
              className="
                inline-flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-[#F4F5F2]/10
                text-[#F4F5F2]/48
                transition-all
                duration-300
                ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:border-[#F4F5F2]/26
                hover:text-[#F4F5F2]/82
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#B08D57]
              "
            >
              <FaWhatsapp className="h-[17px] w-[17px]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
