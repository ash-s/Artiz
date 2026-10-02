"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { formatRupees } from "@/lib/api";
import { X, Trash2, Plus, Minus, Tag, ShieldCheck, ArrowRight } from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    updateQuantity,
    removeFromCart,
    isCartOpen,
    setIsCartOpen,
    promoCode,
    discountPercent,
    promoError,
    applyPromoCode,
    openCheckout,
  } = useStore();

  const [inputCode, setInputCode] = useState("");

  if (!isCartOpen) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode) {
      applyPromoCode(inputCode);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-gray-200 flex flex-col animate-slide-in">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-display-luxury text-2xl text-japandi-dark">Your Curated Bag</span>
              <span className="text-xs bg-japandi-surface px-2 py-0.5 rounded-full text-japandi-subtle font-semibold">
                {cartCount} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-japandi-surface text-japandi-subtle hover:text-japandi-dark"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-japandi-surface flex-shrink-0 border border-japandi-border">
                    <Image
                      src={item.product.featuredImage}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-sm font-bold text-japandi-dark">
                        {item.product.name}
                      </h4>
                      <span className="text-xs font-bold text-japandi-dark">
                        {formatRupees(item.finalPrice * item.quantity)}
                      </span>
                    </div>

                    <p className="text-[11px] text-japandi-muted">
                      Finish: {item.selectedSwatch ? item.selectedSwatch.name : "Natural Finish"}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#DDD3C1] rounded-md bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-xs text-japandi-muted hover:text-japandi-dark"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-xs text-japandi-muted hover:text-japandi-dark"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-japandi-subtle hover:text-rose-600 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 space-y-3">
                <span className="text-3xl">ðŸ§º</span>
                <p className="font-serif text-lg text-japandi-dark">Your bag is currently empty.</p>
                <p className="text-xs text-japandi-subtle">
                  Explore our shoppable room looks or customize furniture pieces.
                </p>
              </div>
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#F4EFEB] border-t border-japandi-border space-y-3">
              
              {/* Promo code form */}
              <form onSubmit={handleApply} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Promo Code (try JAPANDI10)"
                      className="w-full bg-white border border-[#DDD3C1] rounded-lg px-3 py-1.5 text-xs text-japandi-dark focus:outline-none focus:border-japandi-brass uppercase placeholder:normal-case"
                    />
                    <Tag className="w-3.5 h-3.5 text-japandi-subtle absolute right-2.5 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-japandi-dark text-white text-xs font-semibold hover:bg-japandi-darkHover"
                  >
                    Apply
                  </button>
                </div>
                {discountPercent > 0 && (
                  <p className="text-[11px] text-emerald-700 font-semibold">
                    âœ“ Promo {promoCode} applied ({discountPercent}% off subtotal)
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-600 font-medium">{promoError}</p>
                )}
              </form>

              {/* Subtotal calculations in Rupees */}
              <div className="pt-2 space-y-1.5 text-xs text-japandi-muted border-t border-[#DDD3C1]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-japandi-dark">{formatRupees(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-{formatRupees(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White Glove Delivery</span>
                  <span className="text-emerald-700 font-semibold">Free Included</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-japandi-dark pt-1.5 border-t border-[#DDD3C1]">
                  <span>Total Due</span>
                  <span>{formatRupees(cartTotal)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={openCheckout}
                className="w-full py-3.5 rounded-lg bg-japandi-dark hover:bg-japandi-darkHover text-japandi-bg text-xs font-bold transition-all shadow-md mt-2 flex items-center justify-center gap-2"
              >
                <span>Proceed to White Glove Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-japandi-subtle pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-japandi-brass" />
                <span>100-Day In-Home Trial Guarantee â€¢ Pan-India Delivery</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

