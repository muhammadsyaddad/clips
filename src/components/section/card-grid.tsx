"use client";

import React from "react";

import Image from "next/image";

import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function CardGrid() {
  const cards = data.map((card, index) => (
    <Card
      key={card.src}
      card={{
        ...card,
        content: <DummyContent jobDesc={card.jobDesc} imageUrl={card.imageUrl} />,
      }}
      index={index}
    />
  ));

  return (
    <div className="h-full w-full">
      <Carousel items={cards} />
    </div>
  );
}

// Single source of truth for content layout
const DummyContent = ({ jobDesc, imageUrl }: { jobDesc: string; imageUrl: string }) => (
  <div className="mb-4 rounded-3xl bg-[#F5F5F7] p-8 md:p-14 dark:bg-neutral-800">
    <p className="mx-auto max-w-3xl font-sans text-base text-neutral-600 md:text-2xl dark:text-neutral-400">
      <span className="font-bold text-neutral-700 dark:text-neutral-200">The Job :</span> {jobDesc}
    </p>
    <Image
      src={imageUrl}
      alt="Macbook mockup from Aceternity UI"
      height="500"
      width="500"
      className="mx-auto h-full w-full object-contain md:h-1/2 md:w-1/2"
    />
  </div>
);

const data = [
  {
    category: "Artificial Intelligence",
    title: "You can do more with AI.",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop",
    jobDesc: "AI will automate boring work, so you can automate fun work.",
    imageUrl: "https://assets.aceternity.com/macbook.png",
  },
  {
    category: "Productivity",
    title: "Enhance your productivity.",
    src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop",
    jobDesc: "Boost productivity with less caffeine dependency.",
    imageUrl: "https://assets.aceternity.com/macbook.png",
  },
  {
    category: "Product",
    title: "Launching the new Apple Vision Pro.",
    src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop",
    jobDesc: "Immersive reality, now with immersive price tags.",
    imageUrl: "https://assets.aceternity.com/macbook.png",
  },
];
