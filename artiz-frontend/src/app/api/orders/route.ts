import { NextResponse } from "next/server";
import { FALLBACK_PRODUCTS } from "@/lib/api";

export interface StoredOrderItem {
  productId: number;
  productName: string;
  selectedSwatchName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image: string;
}

export interface StoredOrder {
  orderNumber: string;
  customerName: string;
  email: string;
  phone?: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  deliveryDate?: string;
  paymentMethod: string;
  items: StoredOrderItem[];
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  totalAmount: number;
  orderStatus: "CONFIRMED" | "IN_WORKSHOP" | "DISPATCHED" | "DELIVERED";
  createdAt: string;
}

let ordersStore: StoredOrder[] = [
  {
    orderNumber: "ARTIZ-2026-8912",
    customerName: "Vikram Singhania",
    email: "vikram.s@example.com",
    phone: "+91 98201 54819",
    shippingAddress: "42 Sanctuary Boulevard, Bandra West",
    city: "Mumbai",
    postalCode: "400050",
    deliveryDate: "2026-10-15",
    paymentMethod: "White Glove In-Home Card Payment",
    items: [
      {
        productId: 1,
        productName: "Sora Modular 3-Seater Sofa",
        selectedSwatchName: "Warm Oat Bouclé",
        quantity: 1,
        unitPrice: 145000,
        totalPrice: 145000,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      },
      {
        productId: 4,
        productName: "Komorebi Low Coffee Table",
        selectedSwatchName: "Natural Oak Finish",
        quantity: 1,
        unitPrice: 42000,
        totalPrice: 42000,
        image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
      }
    ],
    subtotal: 187000,
    discountAmount: 18700,
    deliveryFee: 0,
    totalAmount: 168300,
    orderStatus: "IN_WORKSHOP",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  }
];

export async function GET() {
  return NextResponse.json(ordersStore);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.customerName || !body.email || !body.shippingAddress || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Missing required checkout information or empty cart" },
        { status: 400 }
      );
    }

    let subtotal = 0;
    const items: StoredOrderItem[] = [];

    for (const item of body.items) {
      const prod = FALLBACK_PRODUCTS.find((p) => p.id === item.productId) || {
        name: "Custom Furniture Piece",
        basePrice: 50000,
        featuredImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      };

      const unitPrice = item.unitPrice || prod.basePrice;
      const quantity = item.quantity || 1;
      const totalPrice = unitPrice * quantity;
      subtotal += totalPrice;

      items.push({
        productId: item.productId,
        productName: prod.name,
        selectedSwatchName: item.selectedSwatchName || "Standard Finish",
        quantity,
        unitPrice,
        totalPrice,
        image: prod.featuredImage,
      });
    }

    const discountAmount = body.discountAmount || 0;
    const totalAmount = Math.max(0, subtotal - discountAmount);

    const newOrder: StoredOrder = {
      orderNumber: `ARTIZ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: body.customerName,
      email: body.email,
      phone: body.phone || "",
      shippingAddress: body.shippingAddress,
      city: body.city || "Mumbai",
      postalCode: body.postalCode || "400001",
      deliveryDate: body.deliveryDate || "Estimated in 2-3 weeks",
      paymentMethod: body.paymentMethod || "White Glove Delivery",
      items,
      subtotal,
      discountAmount,
      deliveryFee: 0,
      totalAmount,
      orderStatus: "CONFIRMED",
      createdAt: new Date().toISOString(),
    };

    ordersStore.unshift(newOrder);

    return NextResponse.json({
      success: true,
      orderNumber: newOrder.orderNumber,
      order: newOrder,
      message: "Order placed successfully with White Glove In-Home Delivery!",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to process order checkout" },
      { status: 500 }
    );
  }
}
