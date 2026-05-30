import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#2D3C68] text-[#F4F5F2]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,rgba(244,245,242,0.055),transparent_45%),radial-gradient(circle_at_88%_84%,rgba(176,141,87,0.08),transparent_44%)]" />
        <div className="absolute inset-0 bg-[rgba(26,26,26,0.28)]" />
      </div>

      <div className="relative z-[1] flex min-h-screen items-center px-6 py-16 sm:px-10 lg:px-16">
        <section className="w-full max-w-[720px]">
          <p
            className="text-[10px] uppercase tracking-[0.32em]"
            style={{
              fontFamily: "Switzer, Arial, sans-serif",
              color: "rgba(244,245,242,0.62)",
            }}
          >
            404
          </p>

          <div className="mt-5 h-px w-16 bg-[#B08D57]" />

          <h1
            className="mt-7 text-[clamp(44px,7vw,78px)] leading-[1.03]"
            style={{ fontFamily: "Gambarino, Georgia, serif" }}
          >
            The route has drifted.
          </h1>

          <p
            className="mt-6 max-w-[640px] text-[14px] leading-[1.8] sm:text-[15px]"
            style={{
              fontFamily: "Switzer, Arial, sans-serif",
              color: "rgba(244,245,242,0.62)",
            }}
          >
            The page you are looking for may have moved, or the route may no
            longer be available.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/"
              className="inline-flex w-fit items-center justify-center rounded-full border border-[#B08D57] px-5 py-2.5 text-[12px] uppercase tracking-[0.14em] text-[#F4F5F2] transition-colors duration-300 hover:bg-[#B08D57]/10"
              style={{ fontFamily: "Switzer, Arial, sans-serif" }}
            >
              Return Home
            </Link>

            <Link
              href="/destinations"
              className="inline-flex w-fit items-center justify-center px-1 py-2 text-[12px] uppercase tracking-[0.14em] text-[#F4F5F2] transition-colors duration-300 hover:text-[#B08D57]"
              style={{ fontFamily: "Switzer, Arial, sans-serif" }}
            >
              Explore Destinations
            </Link>

            <Link
              href="/contact"
              className="inline-flex w-fit items-center justify-center px-1 py-2 text-[12px] uppercase tracking-[0.14em] text-[#F4F5F2] transition-colors duration-300 hover:text-[#B08D57]"
              style={{ fontFamily: "Switzer, Arial, sans-serif" }}
            >
              Contact Serenity
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
