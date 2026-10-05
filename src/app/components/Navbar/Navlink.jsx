import Link from 'next/link'


const Navlink = ({categories}) => {

  return (
    <div className=''>
       <nav aria-label="Categories" className="border-y border-[#222]">
        <ul className="mx-auto flex max-w-[1700px] items-center gap-6 overflow-x-auto whitespace-nowrap px-4 py-3 text-sm sm:gap-8 sm:py-4 md:justify-center md:gap-12 md:px-12 md:text-[14px] lg:gap-14 lg:px-24 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/category/${c.slug}`}
                className="font-bold transition-colors hover:text-[#7B1C32] focus-visible:text-[#7B1C32] focus-visible:outline-none"
              >
                {c.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Navlink
