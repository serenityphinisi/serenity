"use client"

import { useEffect, useRef, useState } from "react"
import { gsap, ScrollTrigger } from "../../lib/gsap"
import Image from "next/image";
import { motion, AnimatePresence,useInView, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePageTransition } from "@/components/PageTransitionProvider";
import { SITE_CONTACT, SITE_SOCIAL } from "@/lib/siteConfig";


import Footer from '../../components/Footer'


export default function Page() {
  return (
    <main className="bg-[#0a0f14] text-white overflow-hidden">
     <ContactHero/>
     <ContactSection/>
      <Footer/> 
    </main>
  )
}

function ContactHero() {
  const currentRef = useRef(null);
  const labelRef = useRef(null);
  const headlineRef = useRef(null);

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
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ease = [0.22, 1, 0.36, 1];

    const currentPath = currentRef.current;
    const contentTargets = [labelRef.current, headlineRef.current].filter(
      Boolean
    );

    const resetPath = () => {
      if (!currentPath) return;

      const length = currentPath.getTotalLength();

      gsap.set(currentPath, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0,
      });
    };

    const resetContent = () => {
      if (labelRef.current) {
        gsap.set(labelRef.current, {
          opacity: 0,
          y: 14,
          filter: "blur(6px)",
        });
      }

      if (headlineRef.current) {
        gsap.set(headlineRef.current, {
          opacity: 0,
          y: 32,
          filter: "blur(10px)",
        });
      }
    };

    if (stage === "covering") {
      entranceTlRef.current?.kill();
      entranceTlRef.current = null;

      resetPath();
      resetContent();

      return;
    }

    if (hasPlayedEntranceRef.current) return;

    hasPlayedEntranceRef.current = true;

    if (reduce) {
      if (currentPath) {
        gsap.set(currentPath, {
          opacity: 1,
          strokeDashoffset: 0,
        });
      }

      gsap.set(contentTargets, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      });

      return;
    }

    resetPath();
    resetContent();

    entranceTlRef.current?.kill();

    entranceTlRef.current = gsap.timeline({
      delay: 0.26,
      defaults: {
        ease,
      },
    });

    if (currentPath) {
      entranceTlRef.current.to(
        currentPath,
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1.22,
        },
        0
      );
    }

    entranceTlRef.current
      .to(
        labelRef.current,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.82,
        },
        0.12
      )
      .to(
        headlineRef.current,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.16,
        },
        0.22
      );

    entranceTlRef.current.eventCallback("onComplete", () => {
      if (currentPath) {
        gsap.set(currentPath, {
          opacity: 1,
          strokeDashoffset: 0,
        });
      }

      gsap.set(contentTargets, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      });
    });
  }, [stage]);

  return (
    <section
      className="
        relative
        flex
        min-h-[60vh]
        items-end
        overflow-hidden
        bg-[#2D3C68]
        text-[#F4F5F2]
        md:min-h-[64vh]
      "
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                circle at 34% 42%,
                rgba(244,245,242,0.055),
                transparent 54%
              ),
              radial-gradient(
                circle at 74% 18%,
                rgba(176,141,87,0.08),
                transparent 42%
              ),
              linear-gradient(
                to bottom,
                rgba(45,60,104,1) 0%,
                rgba(34,48,83,1) 52%,
                rgba(24,34,60,1) 100%
              )
            `,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,26,26,0.06), rgba(26,26,26,0.34))",
          }}
        />

        <div
          className="
            absolute
            left-[-12%]
            top-[-24%]
            h-[52vw]
            w-[52vw]
            rounded-full
            blur-3xl
          "
          style={{
            background: "rgba(244,245,242,0.032)",
          }}
        />

        <div
          className="
            absolute
            bottom-[-28%]
            right-[-14%]
            h-[42vw]
            w-[42vw]
            rounded-full
            blur-3xl
          "
          style={{
            background: "rgba(176,141,87,0.07)",
          }}
        />

        <svg
          className="
            absolute
            inset-0
            h-full
            w-full
          "
          viewBox="0 0 1600 760"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="contactCurrentPrimary"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="#B08D57" stopOpacity="0" />
              <stop offset="20%" stopColor="#B08D57" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#B08D57" stopOpacity="0.46" />
              <stop offset="80%" stopColor="#B08D57" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#B08D57" stopOpacity="0" />
            </linearGradient>

            <filter id="contactCurrentGlow">
              <feGaussianBlur stdDeviation="1.25" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            ref={currentRef}
            d="M-120 520 C250 400, 470 610, 760 500 S1160 330, 1500 470 S1740 600, 1880 500"
            fill="none"
            stroke="url(#contactCurrentPrimary)"
            strokeWidth="1.15"
            strokeLinecap="round"
            filter="url(#contactCurrentGlow)"
          />
        </svg>

        <div
          className="
            absolute
            inset-[-8%]
            opacity-[0.014]
            mix-blend-soft-light
          "
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(244,245,242,0.75) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
      </div>

      <div
        className="
          relative
          z-10
          w-full
          px-6
          pb-20
          pt-[148px]
          md:px-10
          md:pb-24
          md:pt-[168px]
          lg:px-14
        "
      >
        <div className="mx-auto w-full max-w-[1280px]">
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-12
              md:items-end
              md:gap-8
            "
          >
            <div className="md:col-span-10">
              <p
                ref={labelRef}
                className="mb-5 uppercase"
                style={{
                  fontFamily: "Switzer, sans-serif",
                  fontWeight: 400,
                  fontSize: "10px",
                  letterSpacing: "0.32em",
                  color: "rgba(244,245,242,0.45)",
                }}
              >
                Inquiry
              </p>

              <h1
                ref={headlineRef}
                style={{
                  fontFamily: "Gambarino, serif",
                  fontSize: "clamp(42px, 5.6vw, 74px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.04em",
                  color: "#F4F5F2",
                  margin: 0,
                  maxWidth: "880px",
                }}
              >
                Begin with the route, and we shape the rest.
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          z-[4]
        "
        style={{
          height: "132px",
          background:
            "linear-gradient(to bottom, transparent, rgba(244,245,242,0.055) 58%, rgba(244,245,242,0.16) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-6
          right-6
          z-[5]
          h-px
          md:left-10
          md:right-10
          lg:left-14
          lg:right-14
        "
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(176,141,87,0.24), transparent)",
        }}
      />
    </section>
  );
}
 

 
/* ============================================================
   CONSTANTS
   ============================================================ */
 
   const ease = [0.22, 1, 0.36, 1];
 
   const DESTINATIONS = ["Labuan Bajo", "Raja Ampat", "Both", "Not sure yet"];
   const DURATIONS    = ["5–7 nights", "7–10 nights", "10+ nights", "Not sure yet"];
   const GUESTS_OPTS  = ["1–4 guests", "5–8 guests", "9–12 guests"];
    
   // Required field keys — name, email, message minimum
const REQUIRED = ["name", "email", "message"];

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
    
   /* ============================================================
      TEXT INPUT
      Label above, border-bottom only.
      Focus → brass. Error (required + empty) → terracotta.
      ============================================================ */
    
   function TextInput({
     label,
     value,
     onChange,
     placeholder,
     type       = "text",
     required   = false,
     error      = false,
     autoComplete,
   }) {
     const [focused, setFocused] = useState(false);
    
     const borderColor =
       error && !value
         ? "#C66A4A"
         : focused
         ? "#B08D57"
         : "rgba(45,60,104,0.42)";
    
     return (
       <div className="flex flex-col">
         <label className="flex flex-col gap-2">
           <span className="text-[10px] uppercase tracking-[0.28em] text-[#5C5C5C] font-[Switzer] font-light">
             {label}
             {required && (
               <span className="ml-1 text-[#B08D57]" aria-hidden="true">*</span>
             )}
           </span>
    
           <input
             type={type}
             value={value}
             onChange={(e) => onChange(e.target.value)}
             onFocus={() => setFocused(true)}
             onBlur={() => setFocused(false)}
             placeholder={placeholder}
             autoComplete={autoComplete}
             className="
               w-full
               bg-transparent
               outline-none
               pb-[11px]
               text-[14px]
               leading-[1.6]
               tracking-[-0.01em]
               font-[Switzer]
               font-light
               text-[#2D3C68]
               placeholder:text-[#6A6A6A]
             "
             style={{
               borderBottom: `1px solid ${borderColor}`,
               transition:   "border-color 300ms ease",
             }}
           />
         </label>
       </div>
     );
   }
    
   /* ============================================================
      SELECT INPUT
      Label above, border-bottom trigger, animated dropdown.
      Keyboard-accessible via native hidden select on mobile.
      ============================================================ */
    
   function SelectInput({
     label,
     value,
     onChange,
     placeholder,
     options,
     required = false,
     error    = false,
   }) {
     const [open, setOpen]     = useState(false);
     const containerRef        = useRef(null);
    
     // close on outside click
     useEffect(() => {
       const handler = (e) => {
         if (containerRef.current && !containerRef.current.contains(e.target)) {
           setOpen(false);
         }
       };
       document.addEventListener("mousedown", handler);
       return () => document.removeEventListener("mousedown", handler);
     }, []);
    
     // close on escape
     useEffect(() => {
       const handler = (e) => { if (e.key === "Escape") setOpen(false); };
       document.addEventListener("keydown", handler);
       return () => document.removeEventListener("keydown", handler);
     }, []);
    
     const borderColor =
       error && !value
         ? "#C66A4A"
         : open
         ? "#B08D57"
         : "rgba(45,60,104,0.42)";
    
     return (
       <div ref={containerRef} className="relative flex flex-col">
         {/* label */}
         <span className="text-[10px] uppercase tracking-[0.28em] text-[#5C5C5C] font-[Switzer] font-light mb-2">
           {label}
           {required && (
             <span className="ml-1 text-[#B08D57]" aria-hidden="true">*</span>
           )}
         </span>
    
         {/* trigger */}
         <button
           type="button"
           aria-haspopup="listbox"
           aria-expanded={open}
           onClick={() => setOpen((o) => !o)}
           className="
             flex items-center justify-between
             w-full pb-[11px]
             bg-transparent outline-none cursor-pointer
             text-left
           "
           style={{
             borderBottom: `1px solid ${borderColor}`,
             transition:   "border-color 300ms ease",
           }}
         >
           <span
             className="text-[14px] tracking-[-0.01em] font-[Switzer] font-light transition-colors duration-300"
             style={{ color: value ? "#2D3C68" : "#6A6A6A" }}
           >
             {value || placeholder}
           </span>
    
           <ChevronDown
             strokeWidth={1.4}
             className="h-[13px] w-[13px] text-[#2D3C68]/36 flex-shrink-0 transition-transform duration-300"
             style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
           />
         </button>
    
         {/* dropdown */}
         <AnimatePresence>
           {open && (
             <motion.ul
               role="listbox"
               initial={{ opacity: 0, y: -6, scaleY: 0.96 }}
               animate={{ opacity: 1, y: 0,  scaleY: 1    }}
               exit={{    opacity: 0, y: -6, scaleY: 0.96 }}
               transition={{ duration: 0.18, ease }}
               style={{ transformOrigin: "top center" }}
               className="
                 absolute top-[calc(100%+6px)] left-0
                 z-[200] w-full min-w-[180px]
                 bg-[#F4F5F2]
                 border border-[#2D3C68]/10
                 shadow-[0_24px_60px_rgba(22,32,55,0.08)]
                 py-1.5
               "
             >
               {options.map((opt) => (
                 <li key={opt} role="option" aria-selected={value === opt}>
                   <button
                     type="button"
                     onClick={() => { onChange(opt); setOpen(false); }}
                     className="
                       block w-full text-left
                       px-5 py-[10px]
                       text-[13px] font-[Switzer] font-light tracking-[0.02em]
                       transition-colors duration-150
                     "
                     style={{ color: value === opt ? "#B08D57" : "#2D3C68" }}
                     onMouseEnter={(e) => { e.currentTarget.style.color = "#B08D57"; }}
                     onMouseLeave={(e) => { e.currentTarget.style.color = value === opt ? "#B08D57" : "#2D3C68"; }}
                   >
                     {opt}
                   </button>
                 </li>
               ))}
             </motion.ul>
           )}
         </AnimatePresence>
       </div>
     );
   }
    
   /* ============================================================
      TEXTAREA INPUT
      Label above, border-bottom, auto-grows via rows.
      ============================================================ */
    
   function TextareaInput({
     label,
     value,
     onChange,
     placeholder,
     required = false,
     error    = false,
     rows     = 4,
   }) {
     const [focused, setFocused] = useState(false);
    
     const borderColor =
       error && !value
         ? "#C66A4A"
         : focused
         ? "#B08D57"
         : "rgba(45,60,104,0.42)";
    
     return (
       <div className="flex flex-col">
         <label className="flex flex-col gap-2">
           <span className="text-[10px] uppercase tracking-[0.28em] text-[#5C5C5C] font-[Switzer] font-light">
             {label}
             {required && (
               <span className="ml-1 text-[#B08D57]" aria-hidden="true">*</span>
             )}
           </span>
    
           <textarea
             value={value}
             onChange={(e) => onChange(e.target.value)}
             onFocus={() => setFocused(true)}
             onBlur={() => setFocused(false)}
             placeholder={placeholder}
             rows={rows}
             className="
               w-full
               bg-transparent
               outline-none
               pb-[11px]
               text-[14px]
               leading-[1.8]
               tracking-[-0.01em]
               font-[Switzer]
               font-light
               text-[#2D3C68]
               placeholder:text-[#6A6A6A]
               resize-none
               block
             "
             style={{
               borderBottom: `1px solid ${borderColor}`,
               transition:   "border-color 300ms ease",
             }}
           />
         </label>
       </div>
     );
   }
    
   /* ============================================================
      CONTACT SIDEBAR
      Alexandra Wira + direct contact channels.
      Links are actionable (mailto, wa.me, instagram).
      "Response within 24 hours" — from Foundation.
      ============================================================ */
    
   function ContactSidebar() {
     const contacts = [
       {
         label: "Email",
         value: SITE_CONTACT.primaryEmail,
         href:  SITE_CONTACT.primaryEmailHref,
       },
       {
         label: "WhatsApp",
         value: SITE_CONTACT.whatsappDisplay,
         href:  SITE_CONTACT.whatsappHref,
       },
       {
         label: "Instagram",
         value: SITE_SOCIAL.instagramHandle,
         href:  SITE_SOCIAL.instagramHref,
       },
     ];
    
     return (
       <div>
         {/* eyebrow */}
         <p className="
           text-[10px] uppercase tracking-[0.28em]
           text-[#6A6A6A] font-[Switzer] font-light
           mb-6
         ">
           Or reach out directly
         </p>
    
         {/* person */}
         <div className="mb-7">
           <p className="font-[Switzer] font-medium text-[14px] text-[#2D3C68] tracking-[-0.01em] leading-[1.4]">
             Alexandra Wira
           </p>
           <p className="font-[Switzer] font-light text-[12px] text-[#6A6A6A] tracking-[0.04em] mt-[5px]">
             Guest Experience Manager
           </p>
         </div>
    
         {/* contacts list */}
         <div className="flex flex-col gap-3">
           {contacts.map(({ label, value, href }) => (
             <div key={label} className="flex gap-4 items-baseline">
               <span className="
                 font-[Switzer] font-light
                 text-[10px] uppercase tracking-[0.22em]
                 text-[#6A6A6A]
                 min-w-[72px] flex-shrink-0
               ">
                 {label}
               </span>
               <a
                 href={href}
                 target={href.startsWith("http") ? "_blank" : undefined}
                 rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                 className="
                   font-[Switzer] font-light
                   text-[13px] text-[#2D3C68]
                   leading-[1.5]
                   hover:text-[#B08D57]
                   transition-colors duration-300
                 "
               >
                 {value}
               </a>
             </div>
           ))}
         </div>
    
         {/* response time */}
         <div className="mt-8 pt-7 border-t border-[#2D3C68]/08">
           <p className="font-[Switzer] font-light text-[12px] text-[#2D3C68]/44 leading-[1.7]">
             We respond within 24 hours.
           </p>
         </div>
       </div>
     );
   }
    
   /* ============================================================
      CONTACT SECTION — main export
      Two-column layout: form (left) + sidebar (right, sticky).
      GSAP stagger reveal per field row on scroll enter.
      AnimatePresence: form ↔ success state.
      Sumba Ikat rotating ambient texture.
      Validation: required fields highlighted on submit attempt.
      ============================================================ */
    
    function ContactSection() {
     const [fields, setFields] = useState({
       name:        "",
       email:       "",
       phone:       "",
       destination: "",
       duration:    "",
       guests:      "",
       dates:       "",
       message:     "",
       website:     "",
     });
    
     const [submitted,       setSubmitted]       = useState(false);
     const [submitAttempted, setSubmitAttempted] = useState(false);
     const [submitting,      setSubmitting]      = useState(false);
     const [serverError,     setServerError]     = useState("");
    
     const sectionRef = useRef(null);
     const triggerRef = useRef(null);
     const rowRefs    = useRef([]);
    
     const set    = (key) => (val) => setFields((f) => ({ ...f, [key]: val }));
     const addRef = (i)   => (el)  => { rowRefs.current[i] = el; };
    
     const missingRequired = REQUIRED.some((k) => !fields[k].trim());
     const invalidEmail    = fields.email.trim() !== "" && !isValidEmail(fields.email.trim());
     const hasErrors       = missingRequired || invalidEmail;
    
     /* ── SUMBA IKAT keyframe injection ─── */
     useEffect(() => {
       if (typeof document === "undefined") return;
       if (document.getElementById("serenity-ikat-kf")) return;
       const s    = document.createElement("style");
       s.id       = "serenity-ikat-kf";
       s.textContent =
         "@keyframes ikatRotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}";
       document.head.appendChild(s);
     }, []);
    
     /* ── GSAP stagger reveal ──────────── */
     useEffect(() => {
       const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
       const rows   = rowRefs.current.filter(Boolean);
    
       if (reduce) {
         gsap.set(rows, { opacity: 1, y: 0 });
         return;
       }
    
       gsap.set(rows, { opacity: 0, y: 20 });
    
       triggerRef.current = ScrollTrigger.create({
         trigger: sectionRef.current,
         start:   "top 74%",
         onEnter: () => {
           gsap.to(rows, {
             opacity:  1,
             y:        0,
             duration: 0.85,
             stagger:  0.09,
             ease:     ease,
           });
         },
         once: true,
       });
    
       return () => { triggerRef.current?.kill(); };
     }, []);
    
     /* ── SUBMIT ───────────────────────── */
     const handleSubmit = async (e) => {
       e.preventDefault();
       setSubmitAttempted(true);
       setServerError("");
       if (hasErrors) return;

       setSubmitting(true);

       try {
         const response = await fetch("/api/contact", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(fields),
         });

         let data = null;

         try {
           data = await response.json();
         } catch {
           data = null;
         }

         if (!response.ok || !data?.ok) {
           setServerError(
             data?.message ||
               "We could not send your enquiry. Please email us directly."
           );
           return;
         }

         setSubmitted(true);
       } catch {
         setServerError(
           "We could not send your enquiry. Please email us directly."
         );
       } finally {
         setSubmitting(false);
       }
     };
    
     return (
       <section
         ref={sectionRef}
         className="
           relative
           bg-[#F4F5F2]
           px-6 py-20
           md:px-10 md:py-28
           lg:px-14
           overflow-hidden
         "
       >
         {/* ── SUMBA IKAT — ambient texture ── */}
         {/* Third Ikat placement on Contact page */}
         <div
           aria-hidden="true"
           className="pointer-events-none absolute bottom-[-40px] right-[-40px] hidden md:block"
           style={{
             width:     "200px",
             height:    "200px",
             opacity:   0.05,
             animation: "ikatRotate 120s linear infinite",
           }}
         >
           <img
             src="https://res.cloudinary.com/dombq6plz/image/upload/v1778486588/ChatGPT_Image_May_11_2026_03_01_56_PM_1_v2exmt.png"
             alt=""
             style={{ width: "100%", height: "100%", objectFit: "contain" }}
           />
         </div>
    
         <div className="relative mx-auto max-w-[1280px]">
    
           {/* ── TWO-COLUMN GRID ─────────────────────── */}
    
           <div className="
             grid grid-cols-1 gap-14
             md:grid-cols-[1fr_300px] md:gap-16
             lg:grid-cols-[1fr_340px] lg:gap-20
             items-start
           ">
    
             {/* ── LEFT: FORM ─────────────────────────── */}
    
             <AnimatePresence mode="wait">
               {!submitted ? (
    
                 <motion.form
                   key="form"
                   onSubmit={handleSubmit}
                   exit={{ opacity: 0, y: -12 }}
                   transition={{ duration: 0.4, ease }}
                   noValidate
                 >
                   <input
                     type="text"
                     name="website"
                     value={fields.website}
                     onChange={(e) => set("website")(e.target.value)}
                     tabIndex={-1}
                     autoComplete="off"
                     aria-hidden="true"
                     className="hidden"
                   />
                   <div className="flex flex-col gap-8">
    
                     {/* ROW 1 — Full Name + Email */}
                     <div
                       ref={addRef(1)}
                       className="grid grid-cols-1 gap-8 sm:grid-cols-2"
                     >
                       <TextInput
                         label="Full Name"
                         value={fields.name}
                         onChange={set("name")}
                         placeholder="Your full name"
                         required
                         error={submitAttempted}
                         autoComplete="name"
                       />
                       <TextInput
                         label="Email"
                         value={fields.email}
                         onChange={set("email")}
                         placeholder="your@email.com"
                         type="email"
                         required
                         error={submitAttempted && (!fields.email.trim() || invalidEmail)}
                         autoComplete="email"
                       />
                     </div>
    
                     {/* ROW 2 — Phone (optional) */}
                     <div ref={addRef(2)} className="max-w-[320px]">
                       <TextInput
                         label="Phone or WhatsApp — optional"
                         value={fields.phone}
                         onChange={set("phone")}
                        placeholder="Your phone or WhatsApp number"
                         type="tel"
                         autoComplete="tel"
                       />
                     </div>
    
                     {/* ROW 3 — Destination + Duration */}
                     <div
                       ref={addRef(3)}
                       className="grid grid-cols-1 gap-8 sm:grid-cols-2"
                     >
                       <SelectInput
                         label="Destination"
                         value={fields.destination}
                         onChange={set("destination")}
                         placeholder="Select a destination"
                         options={DESTINATIONS}
                       />
                       <SelectInput
                         label="Duration"
                         value={fields.duration}
                         onChange={set("duration")}
                         placeholder="How long"
                         options={DURATIONS}
                       />
                     </div>
    
                     {/* ROW 4 — Guests + Preferred Dates */}
                     <div
                       ref={addRef(4)}
                       className="grid grid-cols-1 gap-8 sm:grid-cols-2"
                     >
                       <SelectInput
                         label="Number of Guests"
                         value={fields.guests}
                         onChange={set("guests")}
                         placeholder="How many guests"
                         options={GUESTS_OPTS}
                       />
                       <TextInput
                         label="Preferred Dates"
                         value={fields.dates}
                         onChange={set("dates")}
                         placeholder="Month, window, or exact dates"
                       />
                     </div>
    
                     {/* ROW 5 — Message */}
                     <div ref={addRef(5)}>
                       <TextareaInput
                         label="Message"
                         value={fields.message}
                         onChange={set("message")}
                         placeholder="Tell us about your preferences, activities, or anything we should know."
                         required
                         error={submitAttempted}
                         rows={4}
                       />
                     </div>
    
                     {/* ROW 6 — Submit */}
                     <div ref={addRef(6)} className="pt-2">
                       <button
                         type="submit"
                         disabled={submitting}
                         className="
                           font-[Switzer] font-light
                           text-[11px] uppercase tracking-[0.28em]
                           text-[#F4F5F2]
                           bg-[#2D3C68]
                           px-12 py-[16px]
                           transition-colors duration-500
                           hover:bg-[#B08D57]
                           cursor-pointer
                           disabled:opacity-60 disabled:cursor-not-allowed
                           border-none
                           outline-none
                         "
                       >
                         {submitting ? "Sending" : "Send Enquiry"}
                       </button>
    
                       {/* Validation feedback — only shows after submit attempt */}
                       <AnimatePresence>
                         {submitAttempted && missingRequired && (
                           <motion.p
                             initial={{ opacity: 0, y: -6 }}
                             animate={{ opacity: 1, y: 0  }}
                             exit={{    opacity: 0         }}
                             transition={{ duration: 0.35, ease }}
                             className="
                               font-[Switzer] font-light
                               text-[12px] tracking-[0.03em]
                               text-[#C66A4A]
                               mt-4
                             "
                           >
                             Please fill in your name, email, and message.
                           </motion.p>
                         )}
                       </AnimatePresence>
                       <AnimatePresence>
                         {submitAttempted && !missingRequired && invalidEmail && (
                           <motion.p
                             initial={{ opacity: 0, y: -6 }}
                             animate={{ opacity: 1, y: 0  }}
                             exit={{    opacity: 0         }}
                             transition={{ duration: 0.35, ease }}
                             className="
                               font-[Switzer] font-light
                               text-[12px] tracking-[0.03em]
                               text-[#C66A4A]
                               mt-4
                             "
                           >
                             Please enter a valid email address.
                           </motion.p>
                         )}
                       </AnimatePresence>
                       <AnimatePresence>
                         {serverError && (
                           <motion.p
                             initial={{ opacity: 0, y: -6 }}
                             animate={{ opacity: 1, y: 0  }}
                             exit={{    opacity: 0         }}
                             transition={{ duration: 0.35, ease }}
                             className="
                               font-[Switzer] font-light
                               text-[12px] tracking-[0.03em]
                               text-[#C66A4A]
                               mt-4
                             "
                           >
                             {serverError}
                           </motion.p>
                         )}
                       </AnimatePresence>
                     </div>
    
                   </div>
                 </motion.form>
    
               ) : (
    
                 /* ── SUCCESS STATE ───────────────────── */
    
                 <motion.div
                   key="success"
                   initial={{ opacity: 0, y: 24 }}
                   animate={{ opacity: 1, y: 0  }}
                   transition={{ duration: 0.9, ease }}
                   className="pt-4"
                 >
                   <p className="
                     font-[Gambarino]
                     text-[clamp(28px,3.2vw,46px)]
                     leading-[1.18]
                     tracking-[-0.03em]
                     text-[#2D3C68]
                   ">
                     Thank you, {fields.name}.<br />
                     Alexandra will be<br />
                     in touch shortly.
                   </p>
    
                   {/* brass divider */}
                   <div className="mt-9 h-px w-12 bg-[#B08D57]" />
    
                   <p className="
                     mt-6
                     font-[Switzer] font-light
                     text-[13px] leading-[1.7]
                     text-[#2D3C68]/56
                     max-w-[320px]
                   ">
                     We typically respond within 24 hours.
                     Keep an eye on {fields.email}.
                   </p>
                 </motion.div>
    
               )}
             </AnimatePresence>
    
             {/* ── RIGHT: SIDEBAR ─────────────────────── */}
             {/*
               Sticky on desktop — stays in viewport while
               the form scrolls. top-[120px] accounts for
               the fixed navbar height.
             */}
    
             <div
               ref={addRef(7)}
               className="md:sticky md:top-[120px]"
             >
               <ContactSidebar />
             </div>
    
           </div>
         </div>
       </section>
     );
   }
