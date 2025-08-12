"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";

export function HeroScroll() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <span className="mt-1 text-4xl leading-none font-bold md:text-[6rem]">Buat Mukamu Ada Di</span>
            <span className="mt-1 text-4xl leading-none font-bold md:text-[6rem]">Mana - Mana .</span>
            <h1 className="bg-gradient-to-b from-black from-60% to-transparent bg-clip-text text-4xl font-semibold text-transparent dark:from-white dark:from-40%">
              buat semua orang ngajak selfie kamu
              <br />
            </h1>
          </>
        }
      >
        <img
          src={`/linear.webp`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto h-full rounded-2xl object-cover object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
