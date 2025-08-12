"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { ArrowUp, ArrowDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image, { type ImageProps } from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTop = initialScroll;
      checkScrollability();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialScroll]);

  const checkScrollability = () => {
    const el = carouselRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    setCanScrollUp(scrollTop > 0);
    setCanScrollDown(scrollTop < scrollHeight - clientHeight - 1);
  };

  const scrollUp = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ top: -300, behavior: "smooth" });
    }
  };

  const scrollDown = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ top: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;

    // find the element by class (we add `card-item` to each card wrapper)
    const nodes = el.querySelectorAll<HTMLElement>(".card-item");
    const target = nodes[index];
    if (target) {
      el.scrollTo({ top: target.offsetTop, behavior: "smooth" });
      setCurrentIndex(index);
      // update scrollability soon after motion (give the browser a tick)
      setTimeout(checkScrollability, 350);
    }
  };

  useEffect(() => {
    // optional: update boolean when resize occurs
    const onResize = () => checkScrollability();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        {/* Vertical scrolling container. snap-y optional for snapping */}
        <div
          ref={carouselRef}
          onScroll={checkScrollability}
          className="w-full overflow-y-scroll overscroll-y-auto scroll-smooth py-10 md:py-20 snap-y snap-mandatory [scrollbar-width:none] relative"
          // style={{ scrollbarWidth: 'none' }} // fine to keep or style with custom CSS
        >
          {/* fade gradient on bottom so end feels nicer */}

          {/* Inner column wrapper — center items horizontally */}
          <div
            className={cn(
              "mx-auto   grid gap-4 pt-4",
              "max-w-[1200px]",
              "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            )}
          >
            {items.map((item, index) => (
              <motion.div
                key={`card${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.08 * index, ease: "easeOut" } }}
                className="card-item w-full md:w-96 rounded-3xl last:pb-[5%] md:last:pb-[33%] snap-start"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
      // optional: keyboard navigation for open cards (up/down to scroll)
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[60] mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-white p-4 font-sans md:p-10 dark:bg-neutral-900"
            >
              <button className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white" onClick={handleClose}>
                <X className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <motion.p layoutId={layout ? `category-${card.title}` : undefined} className="text-base font-medium text-black dark:text-white">
                {card.category}
              </motion.p>
              <motion.p layoutId={layout ? `title-${card.title}` : undefined} className="mt-4 text-2xl font-semibold text-neutral-700 md:text-5xl dark:text-white">
                {card.title}
              </motion.p>
              <div className="py-10">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* clickable card (stacked vertically now) */}
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="relative z-10 mx-auto flex h-80 w-full flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[40rem] md:w-96 dark:bg-neutral-900"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="relative z-40 p-8">
          <motion.p layoutId={layout ? `category-${card.category}` : undefined} className="text-left font-sans text-sm font-medium text-white md:text-base">
            {card.category}
          </motion.p>
          <motion.p layoutId={layout ? `title-${card.title}` : undefined} className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl">
            {card.title}
          </motion.p>
        </div>
        <BlurImage src={card.src} alt={card.title} fill className="absolute inset-0 z-10 object-cover" />
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  return (
    <Image
      className={cn("h-full w-full transition duration-300", className)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      // placeholder blurDataURL requires a base64 string; keep as-is if you provide the blurDataURL,
      // otherwise omit placeholder/blurDataURL to avoid warnings.
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
