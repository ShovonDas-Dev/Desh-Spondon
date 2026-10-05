
import Image from "next/image";
import Link from "next/link";
import { ApiService } from "../../lib/ApiService";

interface Article {
  category: string;
  description: string;
  firstPublished: string;
  id: string;
  imageAlt: string;
  imageUrl: string;
  isLive: boolean;
  lastPublished: string;
  link: string;
  source: string;
  title: string;
  type: string;
}

interface SportsResponse {
  data: Article[];
}





export default async function SportsPage( {params}) {
    const {category} = await params
    
  const data = await ApiService(`https://news-api-v2.vercel.app/api/category/${category}`)
  const sportsNews = data.data

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4">
        
        {/* Page Header */}
        <div className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Sports News
          </h1>

          <p className="mt-2 text-gray-500">
            Latest sports news and updates
          </p>
        </div>

        {/* News Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sportsNews.map((article) => (
           <Link href={`/news/${article.id}`}>
             <article
              key={article.title}
              className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <div className="h-56 overflow-hidden">
                <Image
                  src={article.imageUrl}
                  alt={article.imageAlt}
                  width={500}
                  height={300}
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-sm font-medium text-red-600">
                  {article.category}
                </span>

                <h2 className="mt-2 line-clamp-2 text-xl font-bold text-gray-900">
                  {article.title}
                </h2>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                  {article.description}
                </p>

                <div className="mt-5">
                  <Link
                    href={`/article/${article._id}`}
                    className="inline-block rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
           </Link>
          ))}
        </div>

        {/* Empty State */}
        {sportsNews.length === 0 && (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-semibold">
              No sports news found
            </h2>
            <p className="mt-2 text-gray-500">
              There are currently no sports articles available.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
