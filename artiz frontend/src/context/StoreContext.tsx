"use client";

import React, { createContext, useContext, useState } from "react";
import { Product, Swatch } from "@/lib/api";

export interface CartItem {
  id: string;
  product: Product;
  selectedSwatch?: Swatch;
  quantity: number;
  finalPrice: number;
}

interface StoreContextType {
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;
  addToCart: (product: Product, swatch?: Swatch, qty?: number) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toggleCart: () => void;

  // Promo code
  promoCode: string;
  discountPercent: number;
  promoError: string | null;
  applyPromoCode: (code: string) => boolean;

  // Wishlist
  wishlist: number[];
  toggleWishlist: (productId: number) => void;

  // Room tab & Search
  activeRoomTab: string;
  setActiveRoomTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Fit guide
  fitGuideProduct: Product | null;
  openFitGuide: (product: Product) => void;
  closeFitGuide: () => void;

  // Quick View
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Consultation
  consultationPreselect: string | null;
  openConsultation: (preselectedRoomOrLook?: string) => void;
  closeConsultation: () => void;
  isConsultationOpen: boolean;

  // Checkout
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;

  // Studio Dashboard (view orders and leads)
  isStudioDashboardOpen: boolean;
  openStudioDashboard: () => void;
  closeStudioDashboard: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([1]);
  const [activeRoomTab, setActiveRoomTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState<string | null>(null);

  const [fitGuideProduct, setFitGuideProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationPreselect, setConsultationPreselect] = useState<string | null>(null);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isStudioDashboardOpen, setIsStudioDashboardOpen] = useState(false);

  const addToCart = (product: Product, swatch?: Swatch, qty = 1) => {
    const swatchMod = swatch ? swatch.priceModifier : 0;
    const finalPrice = product.basePrice + swatchMod;
    const cartItemId = `${product.id}-${swatch ? swatch.id : "default"}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { id: cartItemId, product, selectedSwatch: swatch, quantity: qty, finalPrice }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const applyPromoCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === "JAPANDI10" || normalized === "ARTIZ10") {
      setPromoCode(normalized);
      setDiscountPercent(10);
      setPromoError(null);
      return true;
    } else if (normalized === "WELCOME20") {
      setPromoCode(normalized);
      setDiscountPercent(20);
      setPromoError(null);
      return true;
    } else {
      setPromoError("Invalid promotional code. Try 'JAPANDI10'.");
      return false;
    }
  };

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const openFitGuide = (product: Product) => setFitGuideProduct(product);
  const closeFitGuide = () => setFitGuideProduct(null);

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const openConsultation = (preselected?: string) => {
    if (preselected) setConsultationPreselect(preselected);
    setIsConsultationOpen(true);
    const elem = document.getElementById("consultation-wizard");
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };
  const closeConsultation = () => {
    setIsConsultationOpen(false);
    setConsultationPreselect(null);
  };

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const openStudioDashboard = () => setIsStudioDashboardOpen(true);
  const closeStudioDashboard = () => setIsStudioDashboardOpen(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);
  const cartDiscount = Math.round((cartSubtotal * discountPercent) / 100);
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);

  return (
    <StoreContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        toggleCart,
        promoCode,
        discountPercent,
        promoError,
        applyPromoCode,
        wishlist,
        toggleWishlist,
        activeRoomTab,
        setActiveRoomTab,
        searchQuery,
        setSearchQuery,
        fitGuideProduct,
        openFitGuide,
        closeFitGuide,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        consultationPreselect,
        openConsultation,
        closeConsultation,
        isConsultationOpen,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        isStudioDashboardOpen,
        openStudioDashboard,
        closeStudioDashboard,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
