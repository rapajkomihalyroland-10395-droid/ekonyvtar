import React, { useRef, useState, useEffect } from "react";
import Icon from "../AppIcon";
import Button from "./Button";

const Carousel = ({ children, className = "" }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [children]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount =
        direction === "left" ? -clientWidth / 2 : clientWidth / 2;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {}
      {showLeftArrow && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4">
          <Button
            variant="default"
            size="icon"
            className="rounded-full shadow-lg bg-background border border-border text-foreground hover:bg-muted"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <Icon name="ChevronLeft" size={24} />
          </Button>
        </div>
      )}

      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
              display: none;
          }
          .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
          }
        `}
      </style>
      {}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-1"
        onScroll={checkScroll}
      >
        {children}
      </div>

      {}
      {showRightArrow && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4">
          <Button
            variant="default"
            size="icon"
            className="rounded-full shadow-lg bg-background border border-border text-foreground hover:bg-muted"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <Icon name="ChevronRight" size={24} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Carousel;
