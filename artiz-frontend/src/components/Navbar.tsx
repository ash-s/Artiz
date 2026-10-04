"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { ShoppingBag, Sparkles, Compass, LayoutDashboard, Search, X } from "lucide-react";

export default function Navbar() {
  const { cartCount, toggleCart, activeRoomTab, setActiveRoomTab, openConsultation, openStudioDashboard, searchQuery, setSearchQuery } = useStore();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const roomTabs = [
    { id: "all", label: "All Collections" },
    { id: "living", label: "Living Room" },
    { id: "dining", label: "Dining" },
    { id: "bedroom", label: "Bedroom" },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-japandi-dark text-[#EDE8DF] text-[10px] sm:text-[11px] py-1.5 sm:py-2 px-3 sm:px-4 text-center tracking-editorial font-medium flex flex-wrap sm:flex-nowrap justify-center items-center gap-1.5 sm:gap-3">
        <span>Crafted with sustainably sourced FSC® Oak &amp; Walnut</span>
        <span className="hidden xs:inline opacity-40">•</span>
        <span className="text-japandi-brass hidden xs:inline">Complimentary Virtual Design Consultation Across India</span>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5 sm:gap-3 cursor-pointer flex-shrink-0" onClick={() => setActiveRoomTab("all")}>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-japandi-dark flex items-center justify-center text-white font-display-luxury text-xl sm:text-2xl shadow-sm">
              A
            </div>
            <div>
              <span className="font-display-luxury text-2xl sm:text-3xl font-normal tracking-wide text-japandi-dark block leading-none">
                ARTIZ
              </span>
              <span className="block text-[8px] sm:text-[9px] tracking-luxury text-japandi-subtle uppercase font-semibold mt-0.5">
                Living &amp; Interiors
              </span>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-xs relative">
            <Search className="w-3.5 h-3.5 text-japandi-subtle absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search furniture (e.g. Sofa, Oak)..."
              className="w-full bg-[#FAF8F5] border border-gray-200 rounded-full pl-9 pr-4 py-1.5 text-xs text-japandi-dark focus:outline-none focus:border-japandi-brass transition-all placeholder:text-gray-400 font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2 text-xs text-gray-400 hover:text-black"
              >
                ✕
              </button>
            )}
          </div>

          {/* Center Room-Centric Hub Tabs (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#FAF8F5] p-1.5 rounded-full border border-gray-200">
            {roomTabs.map((tab) => {
              const isActive = activeRoomTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveRoomTab(tab.id)}
                  className={`px-4 py-1.5 text-xs rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-japandi-dark text-white font-semibold shadow-sm"
                      : "text-gray-600 font-medium hover:text-black"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
              aria-label="Toggle Search"
            >
              {mobileSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            </button>

            <a
              href="#shoppable-rooms"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-japandi-brass hover:text-japandi-dark transition-colors py-2 px-2"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Shoppable</span>
            </a>

            <button
              onClick={() => openConsultation()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-full bg-japandi-brass hover:bg-japandi-brassHover text-white shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Consultation</span>
              <span className="xs:hidden">Design</span>
            </button>

            {/* Studio Backoffice Trigger */}
            <button
              onClick={openStudioDashboard}
              title="Studio Backoffice (Orders & Leads)"
              className="p-2 sm:p-2.5 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>

            {/* Cart Trigger */}
            <button
              onClick={toggleCart}
              className="relative p-2 sm:p-2.5 rounded-full hover:bg-gray-100 text-gray-800 transition-colors"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-japandi-dark text-white text-[10px] font-bold flex items-center justify-center animate-fade-in shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Search Bar Dropdown */}
        {mobileSearchOpen && (
          <div className="md:hidden px-4 pb-3 pt-1 border-t border-gray-100 bg-white animate-fade-in">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search furniture (e.g. Sofa, Oak, Table)..."
                className="w-full bg-[#FAF8F5] border border-gray-200 rounded-full pl-9 pr-8 py-2 text-xs text-japandi-dark focus:outline-none focus:border-japandi-brass transition-all placeholder:text-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-black"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile / Tablet Horizontal Category Scroll Strip */}
        <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto px-4 py-2 bg-white border-t border-gray-100 no-scrollbar">
          {roomTabs.map((tab) => {
            const isActive = activeRoomTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveRoomTab(tab.id)}
                className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-all flex-shrink-0 ${
                  isActive
                    ? "bg-japandi-dark text-white font-semibold shadow-sm"
                    : "bg-[#FAF8F5] border border-gray-200 text-gray-700 font-medium hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>
    </>
  );
}

