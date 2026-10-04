import LeftHeadLine from "./components/Hero/LeftHeadLine";
import MainHeadline from "./components/Hero/MainHeadline";
import RightHeadLine from "./components/Hero/RightHeadLine";
import { ApiService } from "./lib/ApiService";


export default async function Home() {
  const data = await ApiService("https://news-api-v2.vercel.app/api/news/sections")
  const middleArticles = data.data[0].articles
  const leftArticles = data.data[1].articles
  const rightArticles = data.data[6].articles
  console.log(rightArticles);
  
  
  return (
      <div>
        {/* home-hero-section  */}
        <section className="max-w-[1250px]  mx-auto my-5">
          <div className='grid grid-cols-12 gap-6 '>
              <div className="col-span-3" > <LeftHeadLine leftArticles={leftArticles}/> </div>
              <div className="col-span-6" ><MainHeadline middleArticles={middleArticles} /></div>
              <div className="col-span-3" ><RightHeadLine rightArticles={rightArticles}/></div>
          </div>
        </section>
      </div>
  );
}
