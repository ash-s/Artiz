"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const { openConsultation } = useStore();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply tilt on larger screens with fine pointer
    if (window.innerWidth < 1024) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-12 sm:pb-16">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* Left Column: Editorial Headline */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE2D2] text-[#635548] text-[11px] sm:text-xs font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-japandi-brass"></span>
            Japandi Warm Minimalist 2026 Collection
          </div>

          <h1 className="font-display-luxury text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] text-japandi-dark">
            Quiet Spaces, <br />
            <span className="italic font-normal text-japandi-brass">Crafted for Life.</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed max-w-md font-sans font-normal">
            A balanced synergy of architectural interior design and bespoke handcrafted furniture. Built for daily comfort, quiet beauty, and tactile longevity.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <a
              href="#furniture-catalog"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 text-xs font-semibold rounded-full bg-japandi-dark text-white hover:bg-black transition-all shadow-md tracking-wide"
            >
              Explore Furniture
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => openConsultation()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 text-xs font-semibold rounded-full border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 transition-all tracking-wide shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-japandi-brass" />
              Book Room Design
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200 text-xs">
            <div>
              <span className="block font-display-luxury text-xl sm:text-2xl font-normal text-japandi-dark">100%</span>
              <span className="text-gray-500 text-[10px] sm:text-[11px]">FSC® Oak &amp; Walnut</span>
            </div>
            <div>
              <span className="block font-display-luxury text-xl sm:text-2xl font-normal text-japandi-dark">10-Yr</span>
              <span className="text-gray-500 text-[10px] sm:text-[11px]">Frame Warranty</span>
            </div>
            <div>
              <span className="block font-display-luxury text-xl sm:text-2xl font-normal text-japandi-dark">Bespoke</span>
              <span className="text-gray-500 text-[10px] sm:text-[11px]">Custom Sizing</span>
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
            className="preserve-3d relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-200 group p-2.5 sm:p-3"
          >
            <div className="relative rounded-xl overflow-hidden h-[340px] xs:h-[400px] sm:h-[460px] lg:h-[480px]">
              <Image
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80"
                alt="Japandi Living Room"
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10 pointer-events-none"></div>

              {/* Floating Architectural Badge (Pure Solid White UI, no glass) */}
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-200 shadow-md flex items-center gap-2.5 sm:gap-3">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-700"></div>
                <div>
                  <span className="block text-[8px] sm:text-[9px] uppercase tracking-luxury text-gray-500 font-semibold">
                    Curated Concept #08
                  </span>
                  <span className="block font-display-luxury text-sm sm:text-base font-normal text-japandi-dark">
                    Kyoto Serenity Living Suite
                  </span>
                </div>
              </div>

              {/* Floating Bottom Action Bar (Pure Solid White UI, no glass) */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 bg-white p-3 sm:p-4 rounded-xl border border-gray-200 shadow-xl">
                <div>
                  <span className="text-[10px] sm:text-xs text-gray-500 block">Complete 3-Piece Suite Package</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display-luxury text-xl sm:text-2xl font-normal text-japandi-dark">₹2,45,000</span>
                    <span className="text-[11px] sm:text-xs line-through text-gray-400">₹2,85,000</span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-japandi-brass bg-[#F4EFEB] px-1.5 sm:px-2 py-0.5 rounded">
                      Save ₹40,000
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="#shoppable-rooms"
                    className="flex-1 sm:flex-none text-center px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold rounded-lg bg-japandi-dark text-white hover:bg-black transition-colors"
                  >
                    Explore Shoppable Pins
                  </a>
                  <button
                    onClick={() => openConsultation("Kyoto Serenity Suite")}
                    className="p-2 sm:p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-800 transition-colors"
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
