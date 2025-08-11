"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { motion } from "framer-motion";
export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="flex min-h-screen items-start justify-center px-4 pt-24">
      <div className="relative flex h-[559px] w-full max-w-[1350px] items-center justify-center overflow-hidden rounded-2xl text-center">
        {/* Background dengan animasi fade+zoom */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-background.jpg')" }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />

        {/* Konten muncul berurutan */}
        <motion.div
          className="text-foreground relative z-10 p-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="mb-8 text-5xl font-medium tracking-tight text-white md:text-7xl"
            variants={itemVariants}
          >
            Every idea works better
            <br />
            with the right tools
          </motion.h1>
        </motion.div>
      </div>
    </section>
  );
}
