"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { ShoppingBag, Sparkles, Compass, LayoutDashboard, Search } from "lucide-react";

export default function Navbar() {
  const { cartCount, toggleCart, activeRoomTab, setActiveRoomTab, openConsultation, openStudioDashboard, searchQuery, setSearchQuery } = useStore();

  const roomTabs = [
    { id: "all", label: "All Collections" },
    { id: "living", label: "Living Room" },
    { id: "dining", label: "Dining" },
    { id: "bedroom", label: "Bedroom" },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-japandi-dark text-[#EDE8DF] text-[11px] py-2 px-4 text-center tracking-editorial font-medium flex justify-center items-center gap-3">
        <span>Crafted with sustainably sourced FSC® Oak &amp; Walnut</span>
        <span className="opacity-40">•</span>
        <span className="text-japandi-brass">Complimentary Virtual Design Consultation Across India</span>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer flex-shrink-0" onClick={() => setActiveRoomTab("all")}>
            <div className="w-9 h-9 rounded-sm bg-japandi-dark flex items-center justify-center text-japandi-bg font-display-luxury text-2xl">
              A
            </div>
            <div>
              <span className="font-display-luxury text-3xl font-normal tracking-wide text-japandi-dark block leading-none">
                ARTIZ
              </span>
              <span className="block text-[9px] tracking-luxury text-japandi-subtle uppercase font-semibold mt-0.5">
                Living &amp; Interiors
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-xs relative">
            <Search className="w-3.5 h-3.5 text-japandi-subtle absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search furniture (e.g. Sofa, Oak, Table)..."
              className="w-full bg-japandi-surface border border-[#E5DEC9] rounded-full pl-9 pr-4 py-1.5 text-xs text-japandi-dark focus:outline-none focus:border-japandi-brass transition-all placeholder:text-japandi-subtle font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2 text-xs text-japandi-subtle hover:text-japandi-dark"
              >
                ✕
              </button>
            )}
          </div>

          {/* Center Room-Centric Hub Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-japandi-surface p-1.5 rounded-full border border-[#E5DEC9]">
            {roomTabs.map((tab) => {
              const isActive = activeRoomTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveRoomTab(tab.id)}
                  className={`px-4 py-1.5 text-xs rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-japandi-dark text-japandi-bg font-semibold shadow-sm"
                      : "text-japandi-muted font-medium hover:text-japandi-dark"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5">
            <a
              href="#shoppable-rooms"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-japandi-brass hover:text-japandi-dark transition-colors py-2 px-2.5"
            >
              <Compass className="w-4 h-4" />
              Shoppable
            </a>

            <button
              onClick={() => openConsultation()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-full bg-japandi-brass hover:bg-japandi-brassHover text-japandi-bg shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Consultation
            </button>

            {/* Studio Backoffice Trigger */}
            <button
              onClick={openStudioDashboard}
              title="Studio Backoffice (Orders & Leads)"
              className="p-2.5 rounded-full hover:bg-japandi-surface text-japandi-dark transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>

            {/* Cart Trigger */}
            <button
              onClick={toggleCart}
              className="relative p-2.5 rounded-full hover:bg-japandi-surface text-japandi-dark transition-colors"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-japandi-dark text-japandi-bg text-[10px] font-bold flex items-center justify-center animate-fade-in">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>
    </>
  );
}

