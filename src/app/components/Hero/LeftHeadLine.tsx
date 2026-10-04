import React from 'react'
interface LeftHeadlineProps {
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
const LeftHeadLine = ({leftArticles}: {leftArticles :LeftHeadlineProps[]}) => {
  return (
    <div className="w-full">
      {leftArticles.map((article) => (
        <article
          key={article.id}
          className="border-b border-gray-300 py-4"
        >
          {/* Title */}
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[16px] font-bold leading-6 text-gray-900 hover:text-red-500"
          >
            {article.title}
          </a>

          {/* Description */}
          <p className="mt-2 text-[13px] leading-5 text-gray-600">
            {article.description}
          </p>
        </article>
      ))}
    </div>
  )
} 

export default LeftHeadLine