import Link from "next/link";
import BreakingTicker from "./BreakingTicker";

type Category = {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
};

const API = "https://news-api-v2.vercel.app/api/categories";

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(API, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data ?? [];
  } catch {
    return [];
  }
}

function bengaliDate() {
  return new Intl.DateTimeFormat("bn-BD", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function toBengaliNumber(num: number): string {
  return new Intl.NumberFormat("bn-BD").format(num);
}

async function getDhakaTemp(): Promise<number | null> {
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  if (!API_KEY) return null;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Dhaka&units=metric&appid=${API_KEY}`,
      { next: { revalidate: 1800 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data?.main?.temp === "number" ? Math.round(data.main.temp) : null;
  } catch {
    return null;
  }
}

function hrefFor(c: Category) {
  return c.scrapable ? `/category/${c.slug}` : "/";
}

export default async function Header() {
  const temp = await getDhakaTemp();
  const categories = await getCategories();

  return (
    <header className="border-t-[3px] border-t-[#222] bg-[#F5F1E8] text-[#1a1a1a]">
      {/* Top utility bar */}
      <div className="border-b border-[#ddd8cc]">
        <div className="mx-auto flex h-10 max-w-[1700px] items-center justify-between px-4 text-xs sm:h-12 sm:text-sm md:px-12 lg:px-24">
          <div className="flex items-center">
            <span className="pr-3 sm:pr-4">{bengaliDate()}</span>
            <span className="hidden h-5 w-px bg-[#ccc6b8] sm:block" />
            <Link href="/" className="hidden pl-4 hover:text-[#7B1C32] sm:inline">
              ঢাকা সংস্করণ
            </Link>
          </div>
          <div className="flex items-center gap-4 sm:gap-8">
            <Link href="/about" className="hidden hover:text-[#7B1C32] sm:inline">
              আমাদের সম্পর্কে
            </Link>
            <span>
              ঢাকা {temp !== null ? `${toBengaliNumber(temp)}°সে` : "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Masthead */}
      <div className="mx-auto flex max-w-[1700px] flex-col items-center justify-between gap-4 px-4 py-6 md:grid md:grid-cols-[1fr_auto_1fr] md:px-12 md:py-8 lg:px-24">
        {/* Placeholder for Grid alignment on Desktop */}
        <div className="hidden md:block" />

        {/* Logo */}
        <Link href="/" className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <span
              aria-hidden
              className="flex h-10 w-10 items-center justify-center rounded-[14px] rounded-bl-[4px] bg-[#7B1C32] text-sm font-bold text-white sm:h-12 sm:w-12 sm:text-lg md:h-[50px] md:w-[50px] md:rounded-[18px] md:rounded-bl-[6px] md:text-2xl"
            >
              দে
            </span>
            <span className="font-logo text-3xl font-black leading-none sm:text-3xl md:text-5xl">
              দেশস্পন্দন
            </span>
          </div>
          <span className="mt-1.5 text-[11px] tracking-wide text-[#555] sm:mt-2 sm:text-xs md:text-sm">
            সত্যের সঙ্গে, দেশের স্পন্দনে
          </span>
        </Link>

        {/* Auth Actions (Login / Sign Up) */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:justify-end">
          {/* Log In Button */}
          <Link
            href="/login"
            className="flex h-10 items-center gap-2 border border-[#222] bg-white px-4 text-xs font-semibold text-[#1a1a1a] transition-colors hover:bg-[#f0ece1] sm:h-[45px] sm:px-6 sm:text-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            লগইন
          </Link>

          {/* Sign Up Button */}
          <Link
            href="/signup"
            className="flex h-10 items-center bg-[#7B1C32] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#5f1527] sm:h-[45px] sm:px-6 sm:text-sm"
          >
            সাইন ইন / রেজিস্ট্রেশন
          </Link>
        </div>
      </div>

      {/* Category nav */}
      <nav aria-label="Categories" className="border-y border-[#222]">
        <ul className="mx-auto flex max-w-[1700px] items-center gap-6 overflow-x-auto whitespace-nowrap px-4 py-3 text-sm sm:gap-8 sm:py-4 md:justify-center md:gap-12 md:px-12 md:text-[14px] lg:gap-14 lg:px-24 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={hrefFor(c)}
                className="font-bold transition-colors hover:text-[#7B1C32] focus-visible:text-[#7B1C32] focus-visible:outline-none"
              >
                {c.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <BreakingTicker/>
    </header>
  );
}