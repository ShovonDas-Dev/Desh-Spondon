import Link from 'next/link';
import React from 'react'
interface RightHeadlineProps {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  link: string;
  source: string;
  isLive: boolean;
}
const RightHeadLine = ({rightArticles} : {rightArticles: RightHeadlineProps[]}) => {
  return (
    <div className="w-full">
      {rightArticles.map((article) => (
        <article key={article.id} className="mb-6">
          <div className="flex items-start gap-4">
            {/* Image */}
            <img
              src={article.imageUrl}
              alt={article.title}
              className="h-16 w-16 shrink-0 rounded-full object-cover"
            />

            {/* Title */}
            <div>
                <Link href={article.link} className="pt-1 text-[16px] font-bold leading-7 text-gray-900 hover:text-red-500">
              {article.title}
            </Link>
            </div>
          </div>

          {/* Author */}
          <p className="mt-2 ml-1 text-[13px] text-gray-500">
            👤 {article.author || "সম্পাদকীয়"}
          </p>
        </article>
      ))}
    </div>
    
  )
}

export default RightHeadLine