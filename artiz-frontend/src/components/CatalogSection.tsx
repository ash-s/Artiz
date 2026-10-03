"use client";

import React, { useState } from "react";
import { Product } from "@/lib/api";
import { useStore } from "@/context/StoreContext";
import ProductCard from "./ProductCard";
import { Filter, ArrowUpDown } from "lucide-react";

interface CatalogSectionProps {
  initialProducts: Product[];
}

export default function CatalogSection({ initialProducts }: CatalogSectionProps) {
  const { activeRoomTab, setActiveRoomTab, searchQuery, setSearchQuery } = useStore();
  const [filterType, setFilterType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  let filteredProducts = initialProducts.filter((product) => {
    // Room tab filter
    const matchesRoom =
      activeRoomTab === "all" ||
      product.roomType.toLowerCase() === activeRoomTab.toLowerCase();

    // Category filter
    let matchesType = true;
    if (filterType === "seating") {
      matchesType = product.slug.includes("sofa") || product.slug.includes("armchair");
    } else if (filterType === "tables") {
      matchesType = product.slug.includes("table") || product.slug.includes("desk");
    } else if (filterType === "bedroom") {
      matchesType = product.slug.includes("bed");
    }

    // Search query filter
    let matchesSearch = true;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      matchesSearch =
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.materialsSummary.toLowerCase().includes(q);
    }

    return matchesRoom && matchesType && matchesSearch;
  });

  // Sorting
  if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => a.basePrice - b.basePrice);
  } else if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => b.basePrice - a.basePrice);
  }

  return (
    <section id="furniture-catalog" className="max-w-7xl mx-auto px-6 py-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <span className="text-[10px] font-bold tracking-luxury text-japandi-brass uppercase block mb-1">
            Artisanal Furniture Collection
          </span>
          <h2 className="font-display-luxury text-4xl sm:text-5xl text-japandi-dark font-normal">
            {activeRoomTab === "all"
              ? "All Room Pieces"
              : `${activeRoomTab.charAt(0).toUpperCase() + activeRoomTab.slice(1)} Collection`}
          </h2>
          <p className="text-xs sm:text-sm text-japandi-muted mt-2">
            Click finish swatches to preview material textures and real-time custom pricing in Rupees.
          </p>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 text-japandi-subtle">
            <Filter className="w-3.5 h-3.5" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-japandi-surface border border-[#DDD3C1] text-japandi-dark py-2 px-3 rounded-lg focus:outline-none focus:border-japandi-brass text-xs"
            >
              <option value="all">All Furniture Types</option>
              <option value="seating">Sofas &amp; Armchairs</option>
              <option value="tables">Refectory Tables &amp; Desks</option>
              <option value="bedroom">Platform Beds</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 text-japandi-subtle">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-japandi-surface border border-[#DDD3C1] text-japandi-dark py-2 px-3 rounded-lg focus:outline-none focus:border-japandi-brass text-xs"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {(activeRoomTab !== "all" || filterType !== "all" || searchQuery) && (
            <button
              onClick={() => {
                setActiveRoomTab("all");
                setFilterType("all");
                setSearchQuery("");
                setSortBy("featured");
              }}
              className="text-xs text-japandi-brass hover:underline ml-1 font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-japandi-surface rounded-2xl border border-japandi-border space-y-3">
          <p className="font-display-luxury text-2xl text-japandi-dark">No pieces match your search query &ldquo;{searchQuery}&rdquo;</p>
          <button
            onClick={() => {
              setActiveRoomTab("all");
              setFilterType("all");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-lg bg-japandi-dark text-japandi-bg text-xs font-semibold"
          >
            Clear Search &amp; Show All
          </button>
        </div>
      )}

    </section>
  );
}
