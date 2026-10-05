interface NewsDetailsProps {
  params: Promise<{
    newsid: string;
  }>;
}

interface Byline {
  name: string;
  role: string;
}

interface Topic {
  id: string;
  name: string;
}

interface BodyItem {
  type: "text" | "image" | "subheading";
  text?: string;
  url?: string;
  width?: number;
  height?: number;
  caption?: string;
  altText?: string;
}

interface NewsData {
  id: string;
  title: string;
  link: string;
  firstPublished: string;
  lastPublished: string;
  byline: Byline[];
  topics: Topic[];
  tags: string[];
  imageUrl: string;
  body: BodyItem[];
}

interface NewsResponse {
  success: boolean;
  data: NewsData;
}

const NewsDetails = async ({ params }: NewsDetailsProps) => {
  const { newsid } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsid}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  const result: NewsResponse = await res.json();

  const news = result.data;

  const date = new Date(news.firstPublished).toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const time = new Date(news.firstPublished).toLocaleTimeString("bn-BD", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <main className="bg-[#F5F1E8]">
      <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-8">

        {/* Category */}
        {news.topics?.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {news.topics.slice(0, 3).map((topic) => (
              <span
                key={topic.id}
                className="text-sm font-semibold text-[#9B1735]"
              >
                {topic.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="max-w-[950px] text-3xl font-bold leading-[1.3] text-gray-900 md:text-5xl">
          {news.title}
        </h1>

        {/* Author + Date */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-gray-300 pb-6 text-sm text-gray-600">
          {news.byline?.map((author, index) => (
            <div key={index}>
              <span className="font-semibold text-gray-900">
                {author.name}
              </span>

              {author.role && (
                <span className="ml-2">
                  ({author.role})
                </span>
              )}
            </div>
          ))}

          <span>•</span>

          <span>
            {date} • {time}
          </span>
        </div>

        {/* Main Image */}
        

        {/* Article Content */}
        <article className="mx-auto mt-8 max-w-[850px]">
          {news.body?.map((item, index) => {
            /* Text */
            if (item.type === "text") {
              return (
                <p
                  key={index}
                  className="mb-6 text-[18px] leading-[2] text-gray-800"
                >
                  {item.text}
                </p>
              );
            }

            /* Subheading */
            if (item.type === "subheading") {
              return (
                <h2
                  key={index}
                  className="mb-5 mt-10 text-2xl font-bold leading-tight text-gray-900 md:text-3xl"
                >
                  {item.text}
                </h2>
              );
            }

            /* Image */
            if (item.type === "image") {
              return (
                <figure key={index} className="my-8">
                  <img
                    src={item.url}
                    alt={item.altText || item.caption || news.title}
                    className="h-auto w-full object-cover"
                  />

                  {item.caption && (
                    <figcaption className="mt-2 text-sm leading-6 text-gray-500">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }

            return null;
          })}
        </article>

        {/* Tags */}
        {news.tags?.length > 0 && (
          <div className="mx-auto mt-10 max-w-[850px] border-t border-gray-300 pt-6">
            <div className="flex flex-wrap gap-2">
              {news.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
};

export default NewsDetails;