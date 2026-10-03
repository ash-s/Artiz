"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { submitOrder, formatRupees } from "@/lib/api";
import confetti from "canvas-confetti";
import { X, ShieldCheck, CheckCircle2, Truck, CreditCard, Calendar, Printer } from "lucide-react";

export default function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, cart, cartSubtotal, cartDiscount, cartTotal, clearCart } = useStore();

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "Mumbai",
    postalCode: "400050",
    deliveryDate: "2026-10-18",
    paymentMethod: "Credit Card / UPI (White Glove Safe Checkout)",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  if (!isCheckoutOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.email || !customerInfo.address) {
      alert("Please fill in your delivery details.");
      return;
    }

    setIsSubmitting(true);
    const orderPayload = {
      customerName: customerInfo.name,
      email: customerInfo.email,
      phone: customerInfo.phone,
      shippingAddress: customerInfo.address,
      city: customerInfo.city,
      postalCode: customerInfo.postalCode,
      deliveryDate: customerInfo.deliveryDate,
      paymentMethod: customerInfo.paymentMethod,
      discountAmount: cartDiscount,
      items: cart.map((i) => ({
        productId: i.product.id,
        selectedSwatchName: i.selectedSwatch ? i.selectedSwatch.name : "Natural Finish",
        quantity: i.quantity,
        unitPrice: i.finalPrice,
      })),
    };

    const res = await submitOrder(orderPayload);
    setIsSubmitting(false);

    if (res.success) {
      setCompletedOrder(res.order || {
        orderNumber: res.orderNumber || "ARTIZ-2026-8910",
        totalAmount: cartTotal,
        customerName: customerInfo.name,
        shippingAddress: customerInfo.address,
        deliveryDate: customerInfo.deliveryDate,
      });
      clearCart();

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#B89467", "#2B231D", "#EAE3D2"],
        });
      } catch (err) {}
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="bg-japandi-bg rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-japandi-border shadow-2xl relative space-y-6 my-8">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setCompletedOrder(null);
            closeCheckout();
          }}
          className="absolute top-5 right-5 text-japandi-subtle hover:text-japandi-dark"
        >
          <X className="w-5 h-5" />
        </button>

        {!completedOrder ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-japandi-border">
              <div className="w-9 h-9 rounded-full bg-japandi-brass text-white flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display-luxury text-2xl sm:text-3xl text-japandi-dark">
                  White Glove Secure Checkout
                </h3>
                <span className="text-xs text-japandi-muted">
                  Bespoke in-home delivery and unpackaging included across India.
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 pt-4">
              
              {/* Client Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-japandi-brass">
                  1. Contact Information
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-japandi-muted block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      placeholder="e.g. Sasidharan"
                      className="w-full bg-white border border-[#DDD3C1] rounded-lg p-2.5 text-xs text-japandi-dark focus:outline-none focus:border-japandi-brass"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-japandi-muted block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      placeholder="client@example.com"
                      className="w-full bg-white border border-[#DDD3C1] rounded-lg p-2.5 text-xs text-japandi-dark focus:outline-none focus:border-japandi-brass"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs text-japandi-muted block mb-1">Phone Number for Delivery Coordination</label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      placeholder="+91 98201 01928"
                      className="w-full bg-white border border-[#DDD3C1] rounded-lg p-2.5 text-xs text-japandi-dark focus:outline-none focus:border-japandi-brass"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-3 pt-2 border-t border-japandi-border">
                <h4 className="text-xs font-bold uppercase tracking-wider text-japandi-brass">
                  2. In-Home Delivery Address
                </h4>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-3">
                    <label className="text-xs text-japandi-muted block mb-1">Street Address *</label>
                    <input
                      type="text"
                      required
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      placeholder="120 Sanctuary Way, Suite 400"
                      className="w-full bg-white border border-[#DDD3C1] rounded-lg p-2.5 text-xs text-japandi-dark focus:outline-none focus:border-japandi-brass"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-japandi-muted block mb-1">City</label>
                    <input
                      type="text"
                      value={customerInfo.city}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                      className="w-full bg-white border border-[#DDD3C1] rounded-lg p-2.5 text-xs text-japandi-dark focus:outline-none focus:border-japandi-brass"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-japandi-muted block mb-1">Postal Code (PIN)</label>
                    <input
                      type="text"
                      value={customerInfo.postalCode}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, postalCode: e.target.value })}
                      className="w-full bg-white border border-[#DDD3C1] rounded-lg p-2.5 text-xs text-japandi-dark focus:outline-none focus:border-japandi-brass"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-japandi-muted block mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={customerInfo.deliveryDate}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, deliveryDate: e.target.value })}
                      className="w-full bg-white border border-[#DDD3C1] rounded-lg p-2.5 text-xs text-japandi-dark focus:outline-none focus:border-japandi-brass"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="bg-japandi-surface p-4 rounded-xl border border-[#E5DEC9] space-y-2 text-xs">
                <div className="flex justify-between text-japandi-muted">
                  <span>Subtotal ({cart.length} unique pieces)</span>
                  <span>{formatRupees(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Promotional Courtesy Discount</span>
                    <span>-{formatRupees(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-japandi-muted">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-japandi-brass" />
                    White Glove Placement &amp; Packaging Removal
                  </span>
                  <span className="text-emerald-700 font-semibold">Free Included</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-japandi-dark pt-2 border-t border-[#DDD3C1]">
                  <span>Total Amount Due</span>
                  <span>{formatRupees(cartTotal)}</span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-lg bg-japandi-dark hover:bg-japandi-darkHover text-japandi-bg text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <CreditCard className="w-4 h-4 text-japandi-brass" />
                {isSubmitting ? "Placing Order with Workshop..." : `Confirm Order • ${formatRupees(cartTotal)}`}
              </button>

            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-japandi-brass text-white flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="font-display-luxury text-3xl sm:text-4xl text-japandi-dark">
              Order Confirmed &amp; In Production
            </h3>

            <p className="text-xs text-japandi-muted max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{completedOrder.customerName}</strong>. Your heirloom furniture order <strong>#{completedOrder.orderNumber}</strong> has been saved. Our master joiners are preparing your pieces for White Glove delivery on <strong>{completedOrder.deliveryDate}</strong>.
            </p>

            <div className="bg-japandi-surface p-4 rounded-xl border border-[#E5DEC9] max-w-md mx-auto text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-japandi-muted">Order Number:</span>
                <span className="font-bold text-japandi-dark">{completedOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-japandi-muted">Destination:</span>
                <span className="font-medium text-japandi-dark">{completedOrder.shippingAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-japandi-muted">Total Paid:</span>
                <span className="font-bold text-japandi-brass">{formatRupees(completedOrder.totalAmount || cartTotal)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-lg border border-[#DDD3C1] text-xs font-medium text-japandi-dark hover:bg-japandi-surface flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Invoice
              </button>

              <button
                onClick={() => {
                  setCompletedOrder(null);
                  closeCheckout();
                }}
                className="px-6 py-2 rounded-lg bg-japandi-dark text-white text-xs font-bold"
              >
                Return to Studio
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
