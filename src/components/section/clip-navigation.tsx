// Komponen baru untuk navigasi/filter klip
//

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter } from "lucide-react";
import React from "react";
export function ClipsNavigation() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1260px] sm:px-6 lg:px-8">
        <div className="border-b-border flex items-center justify-between">
          {/* Sisi Kiri: Toggle dan Tabs */}
          <div className="flex items-center gap-8">
            <Tabs defaultValue="latest" className="hidden md:block">
              <TabsList className="group flex gap-4 bg-transparent p-0">
                <TabsTrigger
                  value="latest"
                  className="text-muted-foreground data-[state=active]:text-foreground bg-transparent text-lg font-semibold transition-all duration-300 group-hover:opacity-50 hover:!opacity-100 data-[state=active]:shadow-none"
                >
                  Latest
                </TabsTrigger>
                <TabsTrigger
                  value="popular"
                  className="text-muted-foreground data-[state=active]:text-foreground bg-transparent text-lg font-semibold transition-all duration-300 group-hover:opacity-50 hover:!opacity-100 data-[state=active]:shadow-none"
                >
                  Most popular
                </TabsTrigger>
                <TabsTrigger
                  value="rated"
                  className="text-muted-foreground data-[state=active]:text-foreground bg-transparent text-lg font-semibold transition-all duration-300 group-hover:opacity-50 hover:!opacity-100 data-[state=active]:shadow-none"
                >
                  Top rated
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Sisi Kanan: Tombol Filter */}
          <Button variant="ghost" className="text-md font-semibold">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
    </section>
  );
}
