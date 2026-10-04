"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product, Swatch, formatRupees } from "@/lib/api";
import { useStore } from "@/context/StoreContext";
import { Heart, ShoppingBag, Ruler } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, wishlist, toggleWishlist, openFitGuide, openQuickView } = useStore();
  const [selectedSwatch, setSelectedSwatch] = useState<Swatch | undefined>(
    product.swatches.length > 0 ? product.swatches[0] : undefined
  );

  const isFavorited = wishlist.includes(product.id);
  const currentPrice = product.basePrice + (selectedSwatch?.priceModifier || 0);

  return (
    <div className="product-card group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      
      {/* Product Image Container (Clicking opens Full Details) */}
      <div 
        onClick={() => openQuickView(product)}
        className="relative h-56 xs:h-64 overflow-hidden bg-gray-50 cursor-pointer"
        title="Click to view full details"
      >
        <Image
          src={product.featuredImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        {product.isFeatured && (
          <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white border border-gray-200 text-[9px] uppercase font-bold tracking-luxury text-japandi-dark px-2.5 py-1 rounded shadow-sm">
            Curated Heirloom
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="Save to Wishlist"
          className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm transition-colors ${
            isFavorited ? "text-rose-600" : "text-gray-400 hover:text-japandi-brass"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Card Details */}
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div 
              onClick={() => openQuickView(product)}
              className="cursor-pointer min-w-0"
              title="Click to view full details"
            >
              <span className="text-[9px] uppercase font-bold tracking-luxury text-japandi-brass block mb-0.5">
                {product.roomType} Suite
              </span>
              <h3 className="font-display-luxury text-xl sm:text-2xl font-normal text-japandi-dark hover:text-japandi-brass transition-colors truncate">
                {product.name}
              </h3>
            </div>
            <span className="font-display-luxury text-lg sm:text-xl font-normal text-japandi-dark whitespace-nowrap">
              {formatRupees(currentPrice)}
            </span>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed mt-1.5 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Interactive Swatch Switcher */}
        {product.swatches.length > 0 && (
          <div>
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-gray-500 font-medium">Selected Finish:</span>
              <span className="font-semibold text-gray-800">
                {selectedSwatch?.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {product.swatches.map((swatch) => {
                const isSelected = selectedSwatch?.id === swatch.id;
                return (
                  <button
                    key={swatch.id}
                    onClick={() => setSelectedSwatch(swatch)}
                    title={`${swatch.name} (+${formatRupees(swatch.priceModifier)})`}
                    style={{ backgroundColor: swatch.hexColor }}
                    className={`w-6 h-6 rounded-full border-2 transition-all shadow-sm ${
                      isSelected
                        ? "border-japandi-dark scale-110 ring-1 ring-japandi-brass"
                        : "border-transparent hover:border-gray-400"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-3 flex items-center gap-2 border-t border-gray-200">
          <button
            onClick={() => addToCart(product, selectedSwatch)}
            className="flex-1 py-2.5 rounded-lg bg-japandi-dark hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors tracking-wide shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>

          <button
            onClick={() => openFitGuide(product)}
            className="px-3 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-xs font-medium text-gray-700 flex items-center gap-1 transition-colors"
            title="View dimensions and clearance"
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Fit</span>
          </button>
        </div>

      </div>

    </div>
  );
}

