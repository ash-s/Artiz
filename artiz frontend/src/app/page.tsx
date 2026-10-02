import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ShoppableRoom from "@/components/ShoppableRoom";
import CatalogSection from "@/components/CatalogSection";
import ConsultationWizard from "@/components/ConsultationWizard";
import CartDrawer from "@/components/CartDrawer";
import FitGuideModal from "@/components/FitGuideModal";
import ProductQuickViewModal from "@/components/ProductQuickViewModal";
import CheckoutModal from "@/components/CheckoutModal";
import StudioDashboardModal from "@/components/StudioDashboardModal";
import Footer from "@/components/Footer";
import { fetchProducts, fetchRoomLooks } from "@/lib/api";

export default async function HomePage() {
  const [products, roomLooks] = await Promise.all([
    fetchProducts(),
    fetchRoomLooks(),
  ]);

  return (
    <main className="min-h-screen bg-japandi-bg flex flex-col justify-between">
      <div>
        <Navbar />
        <HeroSection />
        <ShoppableRoom roomLooks={roomLooks} />
        <CatalogSection initialProducts={products} />
        <ConsultationWizard />
      </div>

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <FitGuideModal />
      <ProductQuickViewModal />
      <CheckoutModal />
      <StudioDashboardModal />

      <Footer />
    </main>
  );
}
