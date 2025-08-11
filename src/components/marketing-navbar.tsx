"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function MarketingNavbar() {
  const navLinks = [{ label: "ClipsId.", href: "#" }];

  return (
    <motion.header
      className="absolute top-0 right-0 left-0 z-10 bg-transparent"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-25 items-center justify-between">
          {/* Sisi Kiri: Logo dan Navigasi Utama */}
          <div className="flex items-center gap-5">
            <Link href="/" className="flex-shrink-0">
              <div className="bg-foreground flex h-8 w-8 items-center justify-center">
                <div className="bg-background h-4 w-4" />
              </div>
            </Link>
            <nav className="group hidden items-center md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-foreground text-2xl font-semibold transition-opacity duration-700 group-hover:opacity-50 hover:!opacity-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Sisi Kanan: Aksi Pengguna */}
          <div className="group hidden items-center gap-6 text-2xl font-semibold md:flex">
            <Link
              href="/auth/v2/login"
              className="text-foreground transition-all duration-700 group-hover:opacity-50 hover:!opacity-100"
            >
              Support
            </Link>

            <Link
              href="#"
              className="text-foreground transition-all duration-700 group-hover:opacity-50 hover:!opacity-100"
            >
              Become-Clipper
            </Link>

            <button className="text-foreground transition-all duration-700 group-hover:opacity-50 hover:!opacity-100">
              <Search className="h-5 w-5" strokeWidth={4} />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
