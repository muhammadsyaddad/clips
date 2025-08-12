// src/app/(external)/layout.tsx

import { NavbarResize } from "@/components/section/navbar-resize";
import React from "react";

export default function ExternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground w-full">
      <NavbarResize>{children}</NavbarResize>
    </div>
  );
}
