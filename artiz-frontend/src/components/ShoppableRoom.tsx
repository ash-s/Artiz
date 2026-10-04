"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { RoomLook, formatRupees } from "@/lib/api";
import { ShoppingBag, Ruler, X, Sparkles } from "lucide-react";

interface ShoppableRoomProps {
  roomLooks: RoomLook[];
}

export default function ShoppableRoom({ roomLooks }: ShoppableRoomProps) {
  const { addToCart, openFitGuide, openConsultation, openQuickView } = useStore();
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [activePinId, setActivePinId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const currentLook = roomLooks[activeLookIndex] || roomLooks[0];
  const activeHotspot = currentLook?.hotspots?.find((h) => h.id === activePinId);

  return (
    <section id="shoppable-rooms" className="bg-[#FAF8F5] py-12 sm:py-20 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="text-[10px] font-bold tracking-luxury text-japandi-brass uppercase block mb-1">
              ARTIZ Interactive Room Canvas
            </span>
            <h2 className="font-display-luxury text-3xl xs:text-4xl sm:text-5xl text-japandi-dark font-normal">
              Shop the Designed Room
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1.5 sm:mt-2 max-w-xl leading-relaxed">
              Touch any pin (1, 2, 3) on the image to inspect finishes, view full details, or add pieces directly to your bag.
            </p>
          </div>

          {/* Lookbook Switcher */}
          <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap items-center gap-2 pb-1 sm:pb-0">
            {roomLooks.map((look, idx) => (
              <button
                key={look.id}
                onClick={() => {
                  setActiveLookIndex(idx);
                  setActivePinId(null);
                }}
                className={`px-3.5 sm:px-4 py-2 text-xs rounded-lg whitespace-nowrap transition-all flex-shrink-0 ${
                  activeLookIndex === idx
                    ? "bg-japandi-dark text-white font-semibold shadow-sm"
                    : "bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50"
                }`}
              >
                {look.title}
              </button>
            ))}
          </div>
        </div>

        {/* Room Stage (Solid Clean White Container) */}
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl bg-white select-none">
          <div className="relative w-full h-[420px] xs:h-[480px] sm:h-[560px] lg:h-[640px]">
            <Image
              src={currentLook.mainImageUrl}
              alt={currentLook.title}
              fill
              className="object-cover transition-opacity duration-300"
              priority
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
            <div className="absolute inset-0 bg-black/5 pointer-events-none" />

            {/* Interactive Hotspot Pins (1, 2, 3) */}
            {currentLook.hotspots && currentLook.hotspots.map((hotspot) => {
              const isSelected = activePinId === hotspot.id;
              return (
                <div
                  key={hotspot.id}
                  style={{
                    top: `${hotspot.pinYPercent}%`,
                    left: `${hotspot.pinXPercent}%`,
                  }}
                  onClick={() => setActivePinId(isSelected ? null : hotspot.id)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group"
                >
                  <span className="absolute -top-1 -left-1 w-8 h-8 rounded-full bg-white/60 animate-ping opacity-75"></span>
                  
                  <button
                    aria-label={`View ${hotspot.customLabel}`}
                    className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 shadow-2xl flex items-center justify-center text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-japandi-dark text-white border-white scale-125 ring-4 ring-japandi-brass/60 shadow-2xl"
                        : "bg-white text-japandi-dark border-gray-300 hover:scale-110 hover:border-japandi-dark"
                    }`}
                  >
                    {hotspot.pinNumber}
                  </button>
                </div>
              );
            })}

            {/* Solid Pure White Pop-up Card (Responsive: Mobile bottom card / Desktop side popup) */}
            {activeHotspot && (
              <div
                style={
                  isMobile
                    ? undefined
                    : {
                        left:
                          activeHotspot.pinXPercent > 55
                            ? undefined
                            : `clamp(16px, calc(${activeHotspot.pinXPercent}% + 24px), calc(100% - 340px))`,
                        right:
                          activeHotspot.pinXPercent > 55
                            ? `clamp(16px, calc(${100 - activeHotspot.pinXPercent}% + 24px), calc(100% - 340px))`
                            : undefined,
                        top: `clamp(16px, calc(${activeHotspot.pinYPercent}% - 70px), calc(100% - 280px))`,
                      }
                }
                className={`absolute z-40 bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-200 shadow-2xl animate-fade-in space-y-2.5 sm:space-y-3 ${
                  isMobile
                    ? "left-3 right-3 bottom-24 w-auto max-h-[260px] overflow-y-auto"
                    : "w-80"
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-japandi-brass" />
                    <span className="text-[10px] uppercase font-bold tracking-luxury text-japandi-brass">
                      Piece #{activeHotspot.pinNumber} • {activeHotspot.product.roomType}
                    </span>
                  </div>
                  <button
                    onClick={() => setActivePinId(null)}
                    className="p-1 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Info with Thumbnail Preview */}
                <div className="flex gap-3 items-center">
                  <div 
                    onClick={() => {
                      openQuickView(activeHotspot.product);
                      setActivePinId(null);
                    }}
                    className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gray-50 border border-gray-200 overflow-hidden flex-shrink-0 p-1 cursor-pointer hover:border-japandi-dark transition-colors"
                    title="Click for full uncropped view"
                  >
                    <Image
                      src={activeHotspot.product.featuredImage}
                      alt={activeHotspot.product.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 
                      onClick={() => {
                        openQuickView(activeHotspot.product);
                        setActivePinId(null);
                      }}
                      className="font-display-luxury text-base sm:text-lg font-normal text-japandi-dark leading-snug truncate cursor-pointer hover:text-japandi-brass transition-colors"
                      title={activeHotspot.product.name}
                    >
                      {activeHotspot.product.name}
                    </h4>
                    
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="font-display-luxury text-sm sm:text-base font-semibold text-japandi-dark">
                        {formatRupees(activeHotspot.product.basePrice)}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-medium border border-emerald-200">
                        In Stock
                      </span>
                    </div>

                    <span className="text-[10px] sm:text-[11px] text-gray-500 block truncate mt-0.5">
                      {activeHotspot.product.dimensionsSummary}
                    </span>
                  </div>
                </div>

                {/* Swatches preview */}
                {activeHotspot.product.swatches && activeHotspot.product.swatches.length > 0 && (
                  <div className="flex items-center justify-between text-[11px] bg-gray-50 p-1.5 sm:p-2 rounded-lg border border-gray-100">
                    <span className="text-gray-500 font-medium">Standard Finish:</span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-gray-300"
                        style={{ backgroundColor: activeHotspot.product.swatches[0].hexColor }}
                      />
                      <span className="font-semibold text-gray-800 text-[10px] sm:text-[11px]">
                        {activeHotspot.product.swatches[0].name}
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Buttons: Add to Bag & Full Details */}
                <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                  <button
                    onClick={() => {
                      addToCart(
                        activeHotspot.product,
                        activeHotspot.product.swatches?.length > 0
                          ? activeHotspot.product.swatches[0]
                          : undefined
                      );
                      setActivePinId(null);
                    }}
                    className="flex-1 py-2 rounded-lg bg-[#26221F] text-white text-xs font-semibold hover:bg-black flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => {
                      openQuickView(activeHotspot.product);
                      setActivePinId(null);
                    }}
                    className="px-2.5 sm:px-3 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-medium flex items-center gap-1 transition-colors"
                    title="View Full Details"
                  >
                    Details
                  </button>

                  <button
                    onClick={() => openFitGuide(activeHotspot.product)}
                    className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-gray-600 text-xs transition-colors"
                    title="Fit & Clearance"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Room Summary Toolbar (Solid Clean Bar) */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-[#26221F] text-white p-3 sm:p-4 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 shadow-xl z-10 border border-[#3E3832]">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-japandi-brass text-[#26221F] flex items-center justify-center font-bold text-xs flex-shrink-0">
                  ✦
                </div>
                <div className="min-w-0">
                  <span className="font-display-luxury text-sm sm:text-base font-normal block text-white truncate">
                    Room Concept: &ldquo;{currentLook.title}&rdquo;
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#CFC7BA] hidden xs:block truncate">
                    Includes all {currentLook.hotspots?.length || 3} pieces + lighting layout + 3D rendering
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pt-1 sm:pt-0 border-t sm:border-t-0 border-[#3E3832]">
                <span className="font-display-luxury text-xl sm:text-2xl font-normal text-white">
                  {formatRupees(currentLook.packagePrice || 245000)}
                </span>
                <button
                  onClick={() => openConsultation(currentLook.title)}
                  className="px-3.5 sm:px-4 py-2 text-xs font-bold rounded-lg bg-japandi-brass text-[#26221F] hover:bg-white flex items-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Book Full Room</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
