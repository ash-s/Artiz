"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { X, Ruler, CheckCircle } from "lucide-react";

export default function FitGuideModal() {
  const { fitGuideProduct, closeFitGuide } = useStore();

  if (!fitGuideProduct) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-japandi-bg rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-japandi-border shadow-2xl relative space-y-5 animate-scale-up">
        
        {/* Close Button */}
        <button
          onClick={closeFitGuide}
          className="absolute top-5 right-5 text-japandi-subtle hover:text-japandi-dark"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-japandi-brass text-white flex items-center justify-center">
            <Ruler className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display-luxury text-2xl text-japandi-dark">
              Space Fit &amp; Clearance Guide
            </h3>
            <span className="text-xs text-japandi-brass font-medium">
              {fitGuideProduct.name}
            </span>
          </div>
        </div>

        {/* Dimensions Summary */}
        <div className="bg-japandi-surface p-4 rounded-xl space-y-2 border border-[#E5DEC9] text-xs">
          <div className="flex justify-between font-semibold text-japandi-dark">
            <span>Product Dimensions:</span>
            <span>{fitGuideProduct.dimensionsSummary}</span>
          </div>
          <div className="flex justify-between text-japandi-muted pt-1 border-t border-[#DDD3C1]">
            <span>Entryway Clearance:</span>
            <span className="text-right max-w-[240px] font-medium text-japandi-dark">
              {fitGuideProduct.clearanceGuide}
            </span>
          </div>
        </div>

        {/* Standard Architect Rules */}
        <div className="space-y-2 text-xs">
          <h4 className="font-semibold text-japandi-dark flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-japandi-brass" />
            Standard Architectural Guidelines:
          </h4>
          <ul className="space-y-1.5 text-japandi-muted pl-5 list-disc leading-relaxed">
            <li>Allow at least <strong>75cm – 90cm</strong> for natural walking flow between major furniture pieces.</li>
            <li>Maintain <strong>40cm – 45cm</strong> between coffee table edges and sofa seats.</li>
            <li>Ensure doorway and stairway turning radius accommodates the longest dimension before delivery.</li>
          </ul>
        </div>

        {/* Pro Architect Tip Box */}
        <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
          <strong>💡 Pro Studio Advice:</strong> We recommend laying painter&apos;s blue masking tape on your floor to outline this footprint and verify sightlines before finalizing your bespoke order.
        </div>

        <button
          onClick={closeFitGuide}
          className="w-full py-2.5 rounded-lg bg-japandi-dark text-japandi-bg text-xs font-semibold hover:bg-japandi-darkHover transition-colors"
        >
          Got It, Continue Browsing
        </button>

      </div>
    </div>
  );
}
