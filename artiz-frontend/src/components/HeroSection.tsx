"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const { openConsultation } = useStore();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 pt-10 pb-16">
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Editorial Headline */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE2D2] text-[#635548] text-xs font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-japandi-brass"></span>
            Japandi Warm Minimalist 2026 Collection
          </div>

          <h1 className="font-display-luxury text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.06] text-japandi-dark">
            Quiet Spaces, <br />
            <span className="italic font-normal text-japandi-brass">Crafted for Life.</span>
          </h1>

          <p className="text-sm sm:text-base text-japandi-muted leading-relaxed max-w-md font-sans font-normal">
            A balanced synergy of architectural interior design and bespoke handcrafted furniture. Built for daily comfort, quiet beauty, and tactile longevity.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#furniture-catalog"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold rounded-full bg-japandi-dark text-japandi-bg hover:bg-japandi-darkHover transition-all shadow-md tracking-wide"
            >
              Explore Furniture
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => openConsultation()}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold rounded-full border border-[#D1C6B4] text-japandi-dark hover:bg-japandi-surface transition-all tracking-wide"
            >
              <Sparkles className="w-3.5 h-3.5 text-japandi-brass" />
              Book Room Design
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-japandi-border text-xs">
            <div>
              <span className="block font-display-luxury text-2xl font-normal text-japandi-dark">100%</span>
              <span className="text-japandi-subtle text-[11px]">FSC® Oak &amp; Walnut</span>
            </div>
            <div>
              <span className="block font-display-luxury text-2xl font-normal text-japandi-dark">10-Yr</span>
              <span className="text-japandi-subtle text-[11px]">Frame Warranty</span>
            </div>
            <div>
              <span className="block font-display-luxury text-2xl font-normal text-japandi-dark">Bespoke</span>
              <span className="text-japandi-subtle text-[11px]">Custom Sizing</span>
            </div>
          </div>
        </div>

        {/* Right Column: 2.5D Interactive Hero Card */}
        <div className="lg:col-span-7 perspective-container">
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="preserve-3d relative rounded-2xl overflow-hidden shadow-2xl bg-[#EBE4D5] border border-[#DDD3C1] group p-3"
          >
            <div className="relative rounded-xl overflow-hidden h-[420px] sm:h-[480px]">
              <Image
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80"
                alt="Japandi Living Room"
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-japandi-dark/80 via-transparent to-black/10"></div>

              {/* Floating Architectural Badge */}
              <div className="absolute top-6 left-6 bg-japandi-bg/90 backdrop-blur-md px-4 py-2 rounded-lg border border-white/60 shadow-lg flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-japandi-sage"></div>
                <div>
                  <span className="block text-[9px] uppercase tracking-luxury text-japandi-subtle font-semibold">
                    Curated Concept #08
                  </span>
                  <span className="block font-display-luxury text-base font-normal text-japandi-dark">
                    Kyoto Serenity Living Suite
                  </span>
                </div>
              </div>

              {/* Floating Bottom Action Bar */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-japandi-bg/95 backdrop-blur-md p-4 rounded-xl border border-white/60 shadow-xl">
                <div>
                  <span className="text-xs text-japandi-subtle block">Complete 3-Piece Suite Package</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display-luxury text-2xl font-normal text-japandi-dark">₹2,45,000</span>
                    <span className="text-xs line-through text-[#A69C90]">₹2,85,000</span>
                    <span className="text-[10px] font-bold text-japandi-brass bg-[#F4EFEB] px-2 py-0.5 rounded">
                      Package Save ₹40,000
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href="#shoppable-rooms"
                    className="flex-1 sm:flex-none text-center px-4 py-2.5 text-xs font-semibold rounded-lg bg-japandi-dark text-japandi-bg hover:bg-japandi-darkHover transition-colors"
                  >
                    Explore Shoppable Pins
                  </a>
                  <button
                    onClick={() => openConsultation("Kyoto Serenity Suite")}
                    className="p-2.5 rounded-lg border border-[#DDD3C1] hover:bg-japandi-surface text-japandi-dark transition-colors"
                    title="Book Consultation"
                  >
                    <Sparkles className="w-4 h-4 text-japandi-brass" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
