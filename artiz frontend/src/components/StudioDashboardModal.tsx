"use client";

import React, { useEffect, useState } from "react";
import { useStore } from "@/context/StoreContext";
import { fetchOrders, fetchConsultations, formatRupees } from "@/lib/api";
import { X, LayoutDashboard, ShoppingBag, MessageSquare, RefreshCw, Calendar, MapPin } from "lucide-react";

export default function StudioDashboardModal() {
  const { isStudioDashboardOpen, closeStudioDashboard } = useStore();
  const [activeTab, setActiveTab] = useState<"orders" | "consultations">("orders");
  const [orders, setOrders] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const [o, c] = await Promise.all([fetchOrders(), fetchConsultations()]);
    setOrders(o);
    setConsultations(c);
    setLoading(false);
  };

  useEffect(() => {
    if (isStudioDashboardOpen) {
      loadData();
    }
  }, [isStudioDashboardOpen]);

  if (!isStudioDashboardOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-japandi-bg rounded-2xl max-w-4xl w-full p-6 sm:p-8 border border-japandi-border shadow-2xl relative space-y-6 max-h-[88vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-japandi-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-japandi-dark text-white flex items-center justify-center font-bold">
              <LayoutDashboard className="w-5 h-5 text-japandi-brass" />
            </div>
            <div>
              <h3 className="font-display-luxury text-2xl sm:text-3xl text-japandi-dark">
                ARTIZ Studio Backoffice
              </h3>
              <p className="text-xs text-japandi-muted">
                Live order management and client consultation request pipeline.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              title="Refresh Data"
              className="p-2 rounded-lg border border-[#DDD3C1] hover:bg-japandi-surface text-japandi-dark"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={closeStudioDashboard}
              className="p-2 text-japandi-subtle hover:text-japandi-dark"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
              activeTab === "orders"
                ? "bg-japandi-dark text-white"
                : "bg-white border border-[#DDD3C1] text-japandi-muted hover:bg-japandi-surface"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Client Orders ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab("consultations")}
            className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
              activeTab === "consultations"
                ? "bg-japandi-dark text-white"
                : "bg-white border border-[#DDD3C1] text-japandi-muted hover:bg-japandi-surface"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Design Inquiries ({consultations.length})
          </button>
        </div>

        {/* Tab Content List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {activeTab === "orders" ? (
            orders.length > 0 ? (
              orders.map((ord: any) => (
                <div
                  key={ord.orderNumber}
                  className="bg-white p-5 rounded-xl border border-japandi-border space-y-3 shadow-sm hover:shadow transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-japandi-border pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-japandi-dark text-base">
                          {ord.orderNumber}
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                          {ord.orderStatus || "CONFIRMED"}
                        </span>
                      </div>
                      <span className="text-xs text-japandi-muted block mt-0.5">
                        Client: <strong>{ord.customerName}</strong> ({ord.email})
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-serif text-lg font-bold text-japandi-dark block">
                        {formatRupees(ord.totalAmount || 0)}
                      </span>
                      <span className="text-[11px] text-emerald-700 font-medium">
                        White Glove Delivery Included
                      </span>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-2 text-xs text-japandi-muted">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-japandi-brass flex-shrink-0" />
                      <span>{ord.shippingAddress}, {ord.city} {ord.postalCode}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-japandi-brass flex-shrink-0" />
                      <span>Delivery Target: {ord.deliveryDate}</span>
                    </div>
                  </div>

                  {ord.items && ord.items.length > 0 && (
                    <div className="pt-2 border-t border-japandi-surface text-xs space-y-1">
                      <span className="font-semibold text-japandi-dark block text-[11px]">Line Items:</span>
                      {ord.items.map((it: any, i: number) => (
                        <div key={i} className="flex justify-between text-japandi-muted">
                          <span>{it.quantity}x {it.productName} ({it.selectedSwatchName})</span>
                          <span className="font-medium text-japandi-dark">{formatRupees(it.totalPrice || it.unitPrice || 0)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-japandi-muted py-10 text-center">No orders recorded yet.</p>
            )
          ) : (
            consultations.length > 0 ? (
              consultations.map((c: any) => (
                <div
                  key={c.id}
                  className="bg-white p-5 rounded-xl border border-japandi-border space-y-3 shadow-sm hover:shadow transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-japandi-border pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-japandi-dark text-base">
                          {c.id}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {c.status || "NEW"}
                        </span>
                      </div>
                      <span className="text-xs text-japandi-muted block mt-0.5">
                        Client: <strong>{c.customerName}</strong> ({c.email}) {c.phone && `â€¢ ${c.phone}`}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-semibold text-japandi-brass block">
                        Budget: {c.budgetRange}
                      </span>
                      <span className="text-[11px] text-japandi-muted">
                        Target: {c.roomType}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs space-y-1">
                    <span className="font-medium text-japandi-dark">Preferred Style: <strong>{c.preferredStyle}</strong></span>
                    {c.projectNotes && (
                      <p className="text-japandi-muted bg-japandi-surface p-2.5 rounded-lg border border-[#E5DEC9] italic">
                        &ldquo;{c.projectNotes}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-japandi-muted py-10 text-center">No consultation requests recorded yet.</p>
            )
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-japandi-border flex justify-between items-center text-xs text-japandi-muted">
          <span>Persisted via Next.js REST API &amp; ready for Java Spring Boot SQL.</span>
          <button
            onClick={closeStudioDashboard}
            className="px-4 py-2 rounded-lg bg-japandi-dark text-white font-semibold"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}

