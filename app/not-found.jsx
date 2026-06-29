import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#2D3C68] text-[#F4F5F2]">
      {/* QUIET BACKGROUND */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#07101f]/20" />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 28%, rgba(244,245,242,0.06) 0%, rgba(244,245,242,0) 38%), radial-gradient(circle at 50% 100%, rgba(11,19,34,0.36) 0%, rgba(11,19,34,0) 54%)",
          }}
        />
      </div>

      {/* VERY SUBTLE CHART TEXTURE */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.11]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,245,242,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(244,245,242,0.055) 1px, transparent 1px)",
          backgroundSize: "84px 84px",
          maskImage:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 48%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 48%, transparent 82%)",
        }}
      />

      {/* CONTENT */}
      <div
        className="
          relative
          z-[1]
          flex
          min-h-[100svh]
          items-center
          justify-center
          px-6
          py-16
          sm:px-10
          lg:px-16
        "
      >
        <section
          aria-labelledby="not-found-title"
          className="
            relative
            w-full
            max-w-[760px]
            overflow-hidden
            border-y
            border-[#F4F5F2]/12
            px-1
            py-10
            text-center
            sm:px-8
            sm:py-12
            md:px-10
          "
        >
          {/* ROUTE TRACE INSIDE THE NOTICE ONLY */}
          <svg
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[210px]
              w-[760px]
              -translate-x-1/2
              -translate-y-1/2
              opacity-45
            "
            viewBox="0 0 760 210"
            fill="none"
          >
            <path
              d="M62 146 C178 54 284 104 382 58 C492 6 584 42 698 24"
              stroke="rgba(244,245,242,0.14)"
              strokeWidth="1"
              strokeDasharray="6 11"
              strokeLinecap="round"
            />

            <circle cx="62" cy="146" r="3" fill="rgba(244,245,242,0.2)" />
            <circle cx="382" cy="58" r="2.5" fill="rgba(244,245,242,0.14)" />
            <circle cx="698" cy="24" r="3" fill="rgba(244,245,242,0.11)" />
          </svg>

          <div className="relative z-[1]">
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.34em]
                text-[#F4F5F2]/56
                md:text-[11px]
              "
              style={{
                fontFamily: "Switzer, Arial, sans-serif",
              }}
            >
              404 / Route Not Found
            </p>

            <h1
              id="not-found-title"
              className="
                mx-auto
                mt-6
                max-w-[760px]
                text-[clamp(30px,3vw,40px)]
                leading-[1.08]
                tracking-[-0.045em]
                text-[#F4F5F2]
                md:whitespace-nowrap
              "
              style={{
                fontFamily: "Gambarino, Georgia, serif",
              }}
            >
              This route is no longer on the chart.
            </h1>

            <p
              className="
                mx-auto
                mt-5
                max-w-[520px]
                text-[14px]
                leading-[1.82]
                text-[#F4F5F2]/62
                sm:text-[15px]
              "
              style={{
                fontFamily: "Switzer, Arial, sans-serif",
              }}
            >
              The page may have moved, changed course, or is no longer
              available.
            </p>

            <nav
              aria-label="404 navigation"
              className="
                mt-8
                flex
                flex-col
                items-center
                justify-center
                gap-3
                sm:flex-row
                sm:flex-wrap
                sm:gap-x-6
              "
            >
              <Link
                href="/"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F4F5F2]
                  px-5
                  py-2.5
                  text-[12px]
                  uppercase
                  tracking-[0.14em]
                  text-[#2D3C68]
                  transition
                  duration-300
                  hover:bg-white
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#F4F5F2]/70
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#2D3C68]
                "
                style={{
                  fontFamily: "Switzer, Arial, sans-serif",
                }}
              >
                Return Home
              </Link>

              <Link
                href="/destinations"
                className="
                  inline-flex
                  items-center
                  justify-center
                  px-1
                  py-2
                  text-[12px]
                  uppercase
                  tracking-[0.14em]
                  text-[#F4F5F2]/68
                  transition
                  duration-300
                  hover:text-[#F4F5F2]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#F4F5F2]/45
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#2D3C68]
                "
                style={{
                  fontFamily: "Switzer, Arial, sans-serif",
                }}
              >
                Explore Destinations
              </Link>

              <Link
                href="/contact"
                className="
                  inline-flex
                  items-center
                  justify-center
                  px-1
                  py-2
                  text-[12px]
                  uppercase
                  tracking-[0.14em]
                  text-[#F4F5F2]/68
                  transition
                  duration-300
                  hover:text-[#F4F5F2]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#F4F5F2]/45
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#2D3C68]
                "
                style={{
                  fontFamily: "Switzer, Arial, sans-serif",
                }}
              >
                Contact Serenity
              </Link>
            </nav>
          </div>
        </section>
      </div>

      {/* BOTTOM DEPTH */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[26svh]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,19,34,0) 0%, rgba(11,19,34,0.28) 100%)",
        }}
      />
    </main>
  );
}