"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { X, Ruler, CheckCircle } from "lucide-react";

export default function FitGuideModal() {
  const { fitGuideProduct, closeFitGuide } = useStore();

  if (!fitGuideProduct) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-4 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-4 sm:p-7 md:p-8 border border-gray-200 shadow-2xl relative space-y-4 sm:space-y-5 animate-scale-up my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={closeFitGuide}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-japandi-brass text-white flex items-center justify-center flex-shrink-0">
            <Ruler className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display-luxury text-xl sm:text-2xl text-japandi-dark">
              Space Fit &amp; Clearance Guide
            </h3>
            <span className="text-xs text-japandi-brass font-medium">
              {fitGuideProduct.name}
            </span>
          </div>
        </div>

        {/* Dimensions Summary */}
        <div className="bg-gray-50 p-3.5 sm:p-4 rounded-xl space-y-2 border border-gray-200 text-xs">
          <div className="flex justify-between font-semibold text-gray-900">
            <span>Product Dimensions:</span>
            <span>{fitGuideProduct.dimensionsSummary}</span>
          </div>
          <div className="flex justify-between text-gray-600 pt-1.5 border-t border-gray-200">
            <span>Entryway Clearance:</span>
            <span className="text-right max-w-[220px] font-medium text-gray-900">
              {fitGuideProduct.clearanceGuide}
            </span>
          </div>
        </div>

        {/* Standard Architect Rules */}
        <div className="space-y-2 text-xs">
          <h4 className="font-semibold text-gray-900 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-japandi-brass" />
            Standard Architectural Guidelines:
          </h4>
          <ul className="space-y-1.5 text-gray-600 pl-5 list-disc leading-relaxed">
            <li>Allow at least <strong>75cm – 90cm</strong> for natural walking flow between major furniture pieces.</li>
            <li>Maintain <strong>40cm – 45cm</strong> between coffee table edges and sofa seats.</li>
            <li>Ensure doorway and stairway turning radius accommodates the longest dimension before delivery.</li>
          </ul>
        </div>

        {/* Pro Architect Tip Box */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
          <strong>💡 Pro Studio Advice:</strong> We recommend laying painter&apos;s blue masking tape on your floor to outline this footprint and verify sightlines before finalizing your bespoke order.
        </div>

        <button
          onClick={closeFitGuide}
          className="w-full py-2.5 rounded-lg bg-japandi-dark text-white text-xs font-semibold hover:bg-black transition-colors"
        >
          Got It, Continue Browsing
        </button>

      </div>
    </div>
  );
}
