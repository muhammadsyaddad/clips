// src/app/(external)/layout.tsx
import React from "react";

import { NavbarResize } from "@/components/section/navbar-resize";

export default function ExternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground w-full">
      <NavbarResize>{children}</NavbarResize>
    </div>
  );
}
