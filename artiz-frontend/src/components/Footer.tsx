"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";

export default function Footer() {
  const { setActiveRoomTab, openConsultation } = useStore();

  return (
    <footer className="bg-japandi-dark text-japandi-bg py-12 sm:py-16 border-t border-[#40352D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-xs">
        
        {/* Col 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-sm bg-japandi-bg text-japandi-dark font-serif font-bold flex items-center justify-center text-sm shadow-sm">
              A
            </div>
            <span className="font-display-luxury text-2xl tracking-widest text-white">ARTIZ</span>
          </div>
          <p className="text-[#A69C90] leading-relaxed">
            Bespoke architectural interiors and timeless handcrafted furniture. Conceived in Kyoto &amp; Stockholm by ARTIZ for serene everyday living.
          </p>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="font-display-luxury text-base tracking-wider text-white mb-3">Room Hubs</h4>
          <ul className="space-y-2 text-[#A69C90]">
            <li>
              <button onClick={() => setActiveRoomTab("living")} className="hover:text-white transition-colors">
                Living Room Suite
              </button>
            </li>
            <li>
              <button onClick={() => setActiveRoomTab("dining")} className="hover:text-white transition-colors">
                Dining &amp; Refectory Tables
              </button>
            </li>
            <li>
              <button onClick={() => setActiveRoomTab("bedroom")} className="hover:text-white transition-colors">
                Platform Beds &amp; Sanctuaries
              </button>
            </li>
            <li>
              <button onClick={() => setActiveRoomTab("workspace")} className="hover:text-white transition-colors">
                Minimal Home Offices
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="font-display-luxury text-base tracking-wider text-white mb-3">Design Studio</h4>
          <ul className="space-y-2 text-[#A69C90]">
            <li>
              <button onClick={() => openConsultation()} className="hover:text-white transition-colors text-left">
                Virtual 3D Room Concept
              </button>
            </li>
            <li>
              <button onClick={() => openConsultation()} className="hover:text-white transition-colors text-left">
                Full Residence Turnkey Package
              </button>
            </li>
            <li>
              <button onClick={() => openConsultation()} className="hover:text-white transition-colors text-left">
                Bespoke Joinery &amp; Millwork
              </button>
            </li>
            <li>
              <button onClick={() => openConsultation()} className="hover:text-white transition-colors text-left">
                Architectural Swatch Kit
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="font-display-luxury text-base tracking-wider text-white mb-3">Concierge &amp; Workshop</h4>
          <p className="text-[#A69C90] leading-relaxed">
            Showroom consultations available by appointment.<br />
            <span className="text-white mt-2 block font-medium">concierge@artiz-interiors.com</span>
            <span className="text-[11px] text-japandi-brass mt-1 block">Concierge: 1800-209-ARTIZ (27849) / +91 80 4920 1888</span>
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 sm:mt-12 pt-6 border-t border-[#40352D] text-[10px] sm:text-[11px] text-[#8C827A] flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-center sm:text-left">
        <span>&copy; 2026 ARTIZ Living &amp; Interiors Ltd. All rights reserved.</span>
        <span>Crafted with Warmth, Performance &amp; 2.5D Quiet Aesthetics.</span>
      </div>
    </footer>
  );
}
