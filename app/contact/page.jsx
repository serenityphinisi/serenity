"use client"

import { useEffect, useRef, useState } from "react"
import { gsap, ScrollTrigger } from "../../lib/gsap"
import Image from "next/image";
import { motion, AnimatePresence,useInView, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePageTransition } from "@/components/PageTransitionProvider";


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
  const lineRef     = useRef(null);
  const headlineRef = useRef(null);
  const supportRef  = useRef(null);
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

    if (hasPlayedEntranceRef.current) return;

    if (stage === "covering") {
      entranceTlRef.current?.kill();
      entranceTlRef.current = null;
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(headlineRef.current, { opacity: 0, y: 24, filter: 'blur(8px)' });
      gsap.set(supportRef.current, { opacity: 0, y: 20, filter: 'blur(6px)' });
      return;
    }

    hasPlayedEntranceRef.current = true;
 
    if (reduce) {
      gsap.set([lineRef.current, headlineRef.current, supportRef.current], {
        opacity: 1, y: 0, scaleX: 1, filter: 'blur(0px)',
      });
      return;
    }
 
    gsap.set(lineRef.current,     { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(headlineRef.current, { opacity: 0, y: 28, filter: 'blur(8px)' });
    gsap.set(supportRef.current,  { opacity: 0, y: 20, filter: 'blur(6px)' });
 
    entranceTlRef.current?.kill();
    entranceTlRef.current = gsap.timeline({ delay: 0.3 });
 
    entranceTlRef.current.to(lineRef.current, {
      scaleX:   1,
      duration: 0.5,
      ease:     'power2.out',
    })
    .to(headlineRef.current, {
      opacity:  1,
      y:        0,
      filter:   'blur(0px)',
      duration: 1.05,
      ease:     [0.22, 1, 0.36, 1],
    }, '-=0.15')
    .to(supportRef.current, {
      opacity:  1,
      y:        0,
      filter:   'blur(0px)',
      duration: 0.9,
      ease:     [0.22, 1, 0.36, 1],
    }, '-=0.65');
  }, [stage]);
 
  return (
    <section
      className="relative min-h-[55vh] flex items-end overflow-hidden"
      style={{ backgroundColor: '#2D3C68' }}
    >
      {/* ── Atmospheric layers — cool section ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(circle at 35% 45%, rgba(255,255,255,0.04), transparent 55%)',
            'radial-gradient(circle at 68% 22%, rgba(176,141,87,0.06), transparent 50%)',
          ].join(', '),
        }}
      />
 
      {/* ── Content ── */}
      <div className="relative w-full px-6 md:px-10 lg:px-14 pb-14 md:pb-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-24">
 
            {/* LEFT — Headline */}
            <div className="flex-1 max-w-[700px]">
              <div
                ref={lineRef}
                aria-hidden="true"
                style={{
                  height:          '1px',
                  width:           '64px',
                  backgroundColor: '#B08D57',
                  marginBottom:    '24px',
                }}
              />
              <h1
                ref={headlineRef}
                style={{
                  fontFamily:    'Gambarino',
                  fontSize:      'clamp(38px, 5vw, 64px)',
                  lineHeight:    1.02,
                  letterSpacing: '-0.03em',
                  color:         '#F4F5F2',
                  margin:        0,
                }}
              >
                Your voyage begins<br />
                with a conversation
              </h1>
            </div>
 
            {/* RIGHT — Human reassurance */}
            <div ref={supportRef} style={{ maxWidth: '220px' }}>
              <p style={{
                fontFamily:    'Switzer',
                fontWeight:    400,
                fontSize:      '10px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color:         'rgba(244,245,242,0.45)',
                marginBottom:  '12px',
              }}>
                Guest Inquiries
              </p>
              <p style={{
                fontFamily: 'Switzer',
                fontWeight: 300,
                fontSize:   '13px',
                lineHeight: 1.78,
                color:      'rgba(244,245,242,0.65)',
              }}>
                Alexandra Wira personally reviews
                every inquiry and responds
                within 24 hours.
              </p>
            </div>
 
          </div>
        </div>
      </div>
 
      {/* ── Atmospheric bridge → sail-white form below ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height:     '80px',
          background: 'linear-gradient(to bottom, transparent, rgba(244,245,242,0.05) 70%, rgba(244,245,242,0.12) 100%)',
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
         value: "hello@serenityphinisi.com",
         href:  "mailto:hello@serenityphinisi.com",
       },
       {
         label: "WhatsApp",
         value: "+62 xxx xxxx xxxx", // REPLACE with actual number
         href:  "https://wa.me/62xxxxxxxxxx",
       },
       {
         label: "Instagram",
         value: "@serenity.phinisi",
         href:  "https://instagram.com/serenity.phinisi",
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
     });
    
     const [submitted,       setSubmitted]       = useState(false);
     const [submitAttempted, setSubmitAttempted] = useState(false);
    
     const sectionRef = useRef(null);
     const triggerRef = useRef(null);
     const rowRefs    = useRef([]);
    
     const set    = (key) => (val) => setFields((f) => ({ ...f, [key]: val }));
     const addRef = (i)   => (el)  => { rowRefs.current[i] = el; };
    
     const hasErrors = REQUIRED.some((k) => !fields[k]);
    
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
     const handleSubmit = (e) => {
       e.preventDefault();
       setSubmitAttempted(true);
       if (hasErrors) return;
       // TODO: replace with actual API call (e.g. fetch POST to /api/contact)
       setSubmitted(true);
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
                         error={submitAttempted}
                         autoComplete="email"
                       />
                     </div>
    
                     {/* ROW 2 — Phone (optional) */}
                     <div ref={addRef(2)} className="max-w-[320px]">
                       <TextInput
                         label="Phone or WhatsApp — optional"
                         value={fields.phone}
                         onChange={set("phone")}
                         placeholder="+62 xxx xxxx xxxx"
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
                         className="
                           font-[Switzer] font-light
                           text-[11px] uppercase tracking-[0.28em]
                           text-[#F4F5F2]
                           bg-[#2D3C68]
                           px-12 py-[16px]
                           transition-colors duration-500
                           hover:bg-[#B08D57]
                           cursor-pointer
                           border-none
                           outline-none
                         "
                       >
                         Send Enquiry
                       </button>
    
                       {/* Validation feedback — only shows after submit attempt */}
                       <AnimatePresence>
                         {submitAttempted && hasErrors && (
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
