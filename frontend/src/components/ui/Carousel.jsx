import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = ({ children, className = "" }) => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const scrollAmount = dir === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        {children}
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => scroll("left")}
          className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-sm pointer-events-auto hover:bg-background transition-colors"
          aria-label="Előző"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-sm pointer-events-auto hover:bg-background transition-colors"
          aria-label="Következő"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
