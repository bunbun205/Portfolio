'use client';
import { useEffect, useRef, useState } from 'react';
import { mockProjects } from '../../utils/mockProjects';
import { ChevronLeft, ChevronRight } from 'react-feather';

interface Props {
  category: string;
  slug: string;
}

export default function CategorySection({ category, slug }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scrollByAmount = (amount: number) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const projects = mockProjects.slice(0, 5);

  return (
    <section className="p-6 relative w-full">
      <div className="flex justify-between items-center mb-3 px-1">
        <h2 className="text-xl font-semibold">{category}</h2>
        <a href={`/projects/${slug}`} className="text-blue-500 hover:underline">View All</a>
      </div>

      {/* Arrow Buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scrollByAmount(-260)}
          className="absolute left-0 top-1/2 translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scrollByAmount(260)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full"
        >
          <ChevronRight size={24} />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 no-scrollbar pr-4"
      >
        {projects.map((p) => (
          <a key={p.id} href={p.link} className="flex-none w-[260px] h-[180px] rounded-lg overflow-hidden shadow-lg">
            <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
          </a>
        ))}
      </div>
    </section>
  );
}
