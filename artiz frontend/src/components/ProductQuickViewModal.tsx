"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { Swatch, formatRupees } from "@/lib/api";
import { X, ShoppingBag, Ruler, Heart, Sparkles, ShieldCheck, Truck } from "lucide-react";

export default function ProductQuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart, wishlist, toggleWishlist, openFitGuide, openConsultation } = useStore();
  const [selectedSwatch, setSelectedSwatch] = useState<Swatch | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const currentSwatch = selectedSwatch || (quickViewProduct.swatches.length > 0 ? quickViewProduct.swatches[0] : undefined);
  const currentPrice = quickViewProduct.basePrice + (currentSwatch ? currentSwatch.priceModifier : 0);
  const isFavorited = wishlist.includes(quickViewProduct.id);

  const handleAdd = () => {
    addToCart(quickViewProduct, currentSwatch, quantity);
    closeQuickView();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 sm:p-6 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 border border-gray-200 shadow-2xl relative space-y-6 my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black z-20 transition-all"
          title="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Full Uncropped Image View (Solid White UI, 100% Uncropped) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="relative h-80 sm:h-[420px] w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 flex items-center justify-center p-4">
              <Image
                src={quickViewProduct.featuredImage}
                alt={quickViewProduct.name}
                fill
                priority
                className="object-contain p-2"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Badge */}
              <span className="absolute bottom-3 left-3 bg-white text-[10px] font-semibold text-gray-700 px-2.5 py-1 rounded border border-gray-200 shadow-sm">
                Full Architectural View • Uncropped
              </span>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`absolute top-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md border border-gray-200 transition-colors ${
                  isFavorited ? "text-rose-600" : "text-gray-400 hover:text-japandi-brass"
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* In-Home Delivery & Warranty Guarantees */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-japandi-brass flex-shrink-0" />
                <span className="text-[11px] text-gray-800 font-medium leading-tight">
                  Free White Glove Delivery Across India
                </span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-japandi-brass flex-shrink-0" />
                <span className="text-[11px] text-gray-800 font-medium leading-tight">
                  10-Year Master Joinery Warranty
                </span>
              </div>
            </div>
          </div>

          {/* Right: Full Details */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-japandi-brass" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-japandi-brass">
                  ARTIZ {quickViewProduct.roomType} Collection
                </span>
              </div>
              <h2 className="font-display-luxury text-3xl sm:text-4xl text-japandi-dark mt-1 tracking-tight leading-tight">
                {quickViewProduct.name}
              </h2>
              
              <div className="flex flex-wrap items-baseline gap-3 mt-2">
                <span className="font-display-luxury text-3xl font-semibold text-japandi-dark">
                  {formatRupees(currentPrice)}
                </span>
                <span className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium">
                  ✓ In Stock &amp; Hand-Finished
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              {quickViewProduct.description}
            </p>

            {/* Material Finish Swatches */}
            {quickViewProduct.swatches.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-gray-200">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-gray-800">Select Handcrafted Finish:</span>
                  <span className="text-japandi-brass font-bold">{currentSwatch?.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  {quickViewProduct.swatches.map((swatch) => {
                    const isSelected = (currentSwatch?.id === swatch.id);
                    return (
                      <button
                        key={swatch.id}
                        onClick={() => setSelectedSwatch(swatch)}
                        style={{ backgroundColor: swatch.hexColor }}
                        className={`w-8 h-8 rounded-full border-2 transition-all shadow-sm ${
                          isSelected
                            ? "border-japandi-dark scale-110 ring-2 ring-japandi-brass"
                            : "border-gray-300 hover:border-japandi-dark"
                        }`}
                        title={`${swatch.name} (+${formatRupees(swatch.priceModifier)})`}
                      />
                    );
                  })}
                  <span className="text-[11px] text-gray-500">
                    {currentSwatch?.priceModifier ? `+${formatRupees(currentSwatch.priceModifier)}` : "Standard Finish"}
                  </span>
                </div>
              </div>
            )}

            {/* Complete Specifications Grid */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2.5 text-xs">
              <div className="flex justify-between items-baseline border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-medium">Product Dimensions:</span>
                <span className="font-semibold text-gray-900 text-right">{quickViewProduct.dimensionsSummary}</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-medium">Entryway Clearance:</span>
                <span className="font-semibold text-gray-900 text-right max-w-[220px]">{quickViewProduct.clearanceGuide}</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-medium">Artisanal Materials:</span>
                <span className="font-semibold text-gray-900 text-right">{quickViewProduct.materialsSummary}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-gray-500 font-medium">Organic Surface Care:</span>
                <span className="font-semibold text-gray-900 text-right">Zero-VOC Organic Hardwax-Oil</span>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg bg-white shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-100"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-2.5 text-xs font-semibold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-100"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-3.5 rounded-lg bg-[#26221F] hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md tracking-wide"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Bag • {formatRupees(currentPrice * quantity)}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  onClick={() => openFitGuide(quickViewProduct)}
                  className="text-gray-600 hover:text-black flex items-center gap-1.5 transition-colors font-medium"
                >
                  <Ruler className="w-3.5 h-3.5 text-japandi-brass" />
                  Space Fit &amp; Doorway Check
                </button>

                <button
                  onClick={() => {
                    closeQuickView();
                    openConsultation(quickViewProduct.name);
                  }}
                  className="text-japandi-brass hover:text-black flex items-center gap-1.5 font-semibold transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Request Custom Sizing
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
