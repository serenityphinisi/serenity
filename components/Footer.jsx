"use client";

const nav = [
  { label: "The Yacht", href: "/yacht" },
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/experiences" },
  { label: "Rates & Schedule", href: "/rates-and-schedule" },
  { label: "About", href: "/about" },
];

const stats = ["12 Guests", "4 Cabins", "10 Crew", "Phinisi Yacht"];

export default function Footer() {
  return (
    <>
      <footer className="serenity-footer relative overflow-hidden border-t border-[#D9DDD6] bg-[#F4F5F2] text-[#2D3C68]">

        {/* ATMOSPHERE */}
        <div className="pointer-events-none absolute inset-0">
          <div className="serenity-gold-line absolute inset-x-0 top-0 h-[1.5px]" />

          {/*
            IKAT — top band only, fade ke bawah.
            Pattern Cloudinary di-mask dengan gradient vertikal:
            visible di top, transparent di bottom.
            Konten footer di bawahnya clean.
            opacity dikurangi ke 0.10 — cukup terasa, tidak jadi wallpaper.
          */}
          <div className="serenity-ikat-band absolute inset-x-0 top-0 h-[220px] overflow-hidden">
            <img
              src="https://res.cloudinary.com/dombq6plz/image/upload/v1777477537/ChatGPT_Image_Apr_29_2026_10_44_09_PM_1_hrigkq.png"
              alt=""
              className="h-full w-full object-cover opacity-[0.10] mix-blend-multiply scale-[1.04]"
            />
            <div className="serenity-ikat-mask absolute inset-0" />
          </div>
        </div>

        <div className="relative mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-14">

          {/* MAIN */}
          <section className="pt-16 pb-12 sm:pt-20 sm:pb-14 lg:pt-24 lg:pb-20">

            {/* ── DESKTOP: 3-col ── */}
            <div className="hidden lg:grid gap-x-10 lg:grid-cols-[220px_minmax(0,1fr)_220px] lg:items-start">

              {/* LEFT — CONTACT */}
              <div>
                <p className="mb-[18px] text-[9.5px] uppercase tracking-[0.34em] text-[#2D3C68]/36 font-normal">
                  Contact
                </p>
                <div className="space-y-0">
                  <a href="mailto:hello@serenityyacht.com" className="block text-[13.5px] leading-[2] text-[#2D3C68]/70 transition-all duration-300 hover:text-[#2D3C68] hover:tracking-[0.01em]">
                    hello@serenityyacht.com
                  </a>
                  <a href="https://wa.me/620000000000" className="block text-[13.5px] leading-[2] text-[#2D3C68]/70 transition-all duration-300 hover:text-[#2D3C68] hover:tracking-[0.01em]">
                    +62 000 0000 0000
                  </a>
                </div>
                <p className="mt-5 text-[13px] leading-[2] text-[#2D3C68]/46 font-light">
                  Indonesia<br />Komodo · Raja Ampat
                </p>
              </div>

              {/* CENTER */}
              <div className="flex flex-col items-center text-center">
                <img
                  src="https://res.cloudinary.com/dombq6plz/image/upload/v1777356413/SERENITY_LOGO-02_u1bcf2_1_1_ahyyak.png"
                  alt="Serenity Yacht"
                  className="h-28 w-auto object-contain sm:h-32"
                />
                <div className="serenity-divider mt-5 flex w-[100px] items-center gap-[6px]">
                  <span className="serenity-divider-line" />
                  <span className="h-[4px] w-[4px] shrink-0 rounded-full bg-[#B08D57]/75" />
                  <span className="serenity-divider-line serenity-divider-line--right" />
                </div>
                <p className="mt-5 max-w-[480px] text-[14px] leading-[1.85] text-[#2D3C68]/60 font-light tracking-[0.01em]">
                  A private phinisi yacht shaped by Indonesian craft, calm waters, and journeys that move at a better pace.
                </p>
                <div className="mt-7 w-full max-w-[400px]">
                  <p className="text-[9.5px] uppercase tracking-[0.34em] text-[#2D3C68]/36 font-normal">
                    Private Access
                  </p>
                  <div className="mt-[14px] flex items-center gap-3 border-b border-[#2D3C68]/16 pb-[10px]">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="h-9 w-full bg-transparent text-[13px] font-light outline-none placeholder:text-[#2D3C68]/32"
                    />
                    <button type="button" className="shrink-0 text-[10px] font-normal uppercase tracking-[0.24em] text-[#2D3C68] transition duration-300 hover:opacity-45">
                      Join
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT — NAV */}
              <div className="lg:text-right">
                <p className="mb-[18px] text-[9.5px] uppercase tracking-[0.34em] text-[#2D3C68]/36 font-normal">
                  Explore
                </p>
                <nav className="space-y-0">
                  {nav.map((item) => (
                    <a key={item.label} href={item.href} className="block text-[13.5px] leading-[2] text-[#2D3C68]/70 transition-all duration-300 hover:text-[#2D3C68] hover:tracking-[0.01em]">
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* ── MOBILE LAYOUT ── */}
            <div className="lg:hidden flex flex-col items-center">
              <div className="flex flex-col items-center text-center w-full">
                <img
                  src="https://res.cloudinary.com/dombq6plz/image/upload/v1777356413/SERENITY_LOGO-02_u1bcf2_1_1_ahyyak.png"
                  alt="Serenity Yacht"
                  className="h-24 w-auto object-contain"
                />
                <div className="serenity-divider mt-4 flex w-[80px] items-center gap-[6px]">
                  <span className="serenity-divider-line" />
                  <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-[#B08D57]/75" />
                  <span className="serenity-divider-line serenity-divider-line--right" />
                </div>
                <p className="mt-4 max-w-[300px] text-[13px] leading-[1.85] text-[#2D3C68]/55 font-light tracking-[0.01em]">
                  A private phinisi yacht shaped by Indonesian craft, calm waters, and journeys that move at a better pace.
                </p>
                <div className="mt-6 w-full max-w-[320px]">
                  <p className="text-[9px] uppercase tracking-[0.34em] text-[#2D3C68]/36 font-normal mb-[12px]">
                    Private Access
                  </p>
                  <div className="flex items-center gap-3 border-b border-[#2D3C68]/16 pb-[10px]">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="h-10 w-full bg-transparent text-[13px] font-light outline-none placeholder:text-[#2D3C68]/32"
                    />
                    <button type="button" className="shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center text-[10px] font-normal uppercase tracking-[0.24em] text-[#2D3C68] transition duration-300 hover:opacity-45">
                      Join
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-10 w-full grid grid-cols-2 gap-x-6 border-t border-[#2D3C68]/10 pt-8">
                <div>
                  <p className="mb-3 text-[9px] uppercase tracking-[0.34em] text-[#2D3C68]/36 font-normal">Contact</p>
                  <a href="mailto:hello@serenityyacht.com" className="block text-[12.5px] leading-[2] text-[#2D3C68]/65">hello@serenityyacht.com</a>
                  <a href="https://wa.me/620000000000" className="block text-[12.5px] leading-[2] text-[#2D3C68]/65">+62 000 0000 0000</a>
                  <p className="mt-3 text-[12px] leading-[1.9] text-[#2D3C68]/40 font-light">Indonesia<br />Komodo · Raja Ampat</p>
                </div>
                <div className="text-right">
                  <p className="mb-3 text-[9px] uppercase tracking-[0.34em] text-[#2D3C68]/36 font-normal">Explore</p>
                  <nav>
                    {nav.map((item) => (
                      <a key={item.label} href={item.href} className="block text-[12.5px] leading-[2] text-[#2D3C68]/65">{item.label}</a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </section>

          {/* VALUE STRIP */}
          <section className="relative overflow-hidden border-y border-[#2D3C68]/10 py-[14px]">
            <div className="serenity-strip absolute inset-0" />
            <div className="relative flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {stats.map((item, i) => (
                <div key={item} className="flex items-center gap-6">
                  <span className="text-[9px] uppercase tracking-[0.28em] text-[#2D3C68]/50 font-normal">{item}</span>
                  {i !== stats.length - 1 && (
                    <span className="hidden h-[3px] w-[3px] rounded-full bg-[#B08D57]/60 sm:block" />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* BOTTOM */}
          <section className="py-5">
            <div className="flex flex-col gap-3 text-[11px] text-[#2D3C68]/44 sm:text-xs lg:flex-row lg:items-center lg:justify-between">
              <p>© 2026 Serenity Yacht</p>
              <div className="flex flex-wrap gap-4">
                <a href="/privacy-policy" className="transition duration-300 hover:text-[#2D3C68]">Privacy Policy</a>
                <a href="/terms-and-conditions" className="transition duration-300 hover:text-[#2D3C68]">Terms & Conditions</a>
              </div>
              <div className="flex gap-4">
                <a href="https://instagram.com" className="transition duration-300 hover:text-[#2D3C68]">Instagram</a>
                <a href="https://wa.me/620000000000" className="transition duration-300 hover:text-[#2D3C68]">WhatsApp</a>
              </div>
            </div>
          </section>

        </div>
      </footer>

      <style jsx>{`
        .serenity-gold-line {
          background: linear-gradient(
            90deg,
            rgba(176, 141, 87, 0) 0%,
            rgba(176, 141, 87, 0) 15%,
            rgba(176, 141, 87, 0.72) 50%,
            rgba(176, 141, 87, 0) 85%,
            rgba(176, 141, 87, 0) 100%
          );
        }

        /*
          IKAT MASK — fade ke bawah agresif.
          Top 30%: pattern visible.
          Bottom: fully transparent — konten footer clean.
          Kiri kanan juga fade supaya tidak hard edge.
        */
        .serenity-ikat-mask {
          background:
            linear-gradient(
              to bottom,
              rgba(244, 245, 242, 0) 0%,
              rgba(244, 245, 242, 0.4) 45%,
              rgba(244, 245, 242, 0.85) 70%,
              rgba(244, 245, 242, 1) 100%
            ),
            linear-gradient(
              to right,
              rgba(244, 245, 242, 0.88) 0%,
              rgba(244, 245, 242, 0) 12%,
              rgba(244, 245, 242, 0) 88%,
              rgba(244, 245, 242, 0.88) 100%
            );
        }

        .serenity-strip {
          background: linear-gradient(
            90deg,
            rgba(45, 60, 104, 0) 0%,
            rgba(45, 60, 104, 0.028) 25%,
            rgba(176, 141, 87, 0.025) 50%,
            rgba(45, 60, 104, 0.028) 75%,
            rgba(45, 60, 104, 0) 100%
          );
        }

        .serenity-divider-line {
          flex: 1;
          height: 0.5px;
          background: linear-gradient(to right, transparent, rgba(176, 141, 87, 0.55));
        }

        .serenity-divider-line--right {
          background: linear-gradient(to left, transparent, rgba(176, 141, 87, 0.55));
        }
      `}</style>
    </>
  );
}