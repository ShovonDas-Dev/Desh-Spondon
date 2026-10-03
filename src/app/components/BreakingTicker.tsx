// components/BreakingTicker.tsx
// Server Component – নিজেই API call করে, আলাদা CSS file লাগে না।
import Link from "next/link";

type News = { id: string; title: string; type: string };

const API = "https://news-api-v2.vercel.app/api/news";

async function getHeadlines(limit: number) {
  try {
    const res = await fetch(API, { next: { revalidate: 300 } }); // ৫ মিনিট পরপর refresh
    if (!res.ok) return [];
    const json = await res.json();
    const items: News[] = json?.data ?? [];
    return items.filter((n) => n.type !== "link").slice(0, limit);
  } catch {
    return [];
  }
}

export default async function BreakingTicker({
  limit = 8,
  secondsPerItem = 9, // কমালে speed বাড়বে
}: {
  limit?: number;
  secondsPerItem?: number;
}) {
  const headlines = await getHeadlines(limit);
  if (!headlines.length) return null;

  const loop = [...headlines, ...headlines]; // seamless loop এর জন্য ২ বার
  const duration = Math.max(headlines.length * secondsPerItem, 30);

  return (
    <div className="bg-[#F5F1E8] text-[#1a1a1a]">
      <style>{`
        @keyframes bt-marquee { to { transform: translateX(-50%); } }
        .bt-track { animation: bt-marquee ${duration}s linear infinite; }
        .bt-wrap:hover .bt-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .bt-track { animation: none; } }
      `}</style>

      <div className="mx-auto max-w-[1700px] px-4 md:px-8">
        <div className="bt-wrap flex items-center gap-6 border-b border-[#ddd8cc] py-5">
          {/* Label */}
          <div className="flex shrink-0 items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#7B1C32]" />
            <span className="font-bold text-[#7B1C32]">ব্রেকিং</span>
          </div>

          {/* Running headlines */}
          <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_24px,#000_calc(100%-48px),transparent)]">
            <ul className="bt-track flex w-max items-center whitespace-nowrap">
              {loop.map((n, i) => (
                <li key={`${n.id}-${i}`} className="flex items-center" aria-hidden={i >= headlines.length}>
                  <Link
                    href={`/news/${n.id}`}
                    tabIndex={i >= headlines.length ? -1 : 0}
                    className="text-[15px] transition-colors hover:text-[#7B1C32] focus-visible:text-[#7B1C32] focus-visible:outline-none"
                  >
                    {n.title}
                  </Link>
                  <span className="mx-8">•</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
