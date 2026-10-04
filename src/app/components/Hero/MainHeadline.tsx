import Link from 'next/link';
import React from 'react'
interface MainHeadlineProps {
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
const MainHeadline = ({ middleArticles }: { middleArticles: MainHeadlineProps[] }) => {
  
  return (
    <div className="mx-auto max-w-5xl border border-gray-300  p-3">

  {/* Main Featured News */}
  <div>
    <img
      src={middleArticles[0].imageUrl}
      alt={middleArticles[0].imageAlt}
      className="h-[300px] w-full object-cover"
    />

    <div className='my-4'>
      <Link href={middleArticles[0].link} className=" text-xl font-bold hover:text-red-500">
      {middleArticles[0].title}
    </Link>
    </div>

    <p className="text-sm text-gray-500">
      {middleArticles[0].description}
    </p>
  </div>


  {/* 2 Small News */}
  <div className="mt-8 grid grid-cols-2 gap-5">

    {middleArticles.slice(1, 3).map((article) => (
      <div key={article.id}>

        <img
          src={article.imageUrl}
          alt={article.imageAlt}
          className="h-[130px] w-full object-cover"
        />

        <div className='mt-1'>
          <Link href={article.link} className="mt-1 text-sm font-bold hover:text-red-500">
          {article.title}
        </Link>
        </div>

      </div>
    ))}

  </div>


  {/* Remaining News */}
  <div className="mt-4">

    {middleArticles.slice(3 , 5).map((article) => (
      <div
        key={article.id}
        className="border-t border-gray-300 py-8"
      >

       <div>
         <Link href={article.link} className="text-base font-bold hover:text-red-500">
          {article.title}
        </Link>
       </div>

        <p className="mt-1 text-sm text-gray-600">
          {article.description}
        </p>

      </div>
    ))}

  </div>

</div>
  )
}

export default MainHeadline