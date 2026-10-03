import { NextResponse } from "next/server";
import { FALLBACK_PRODUCTS, RoomLook } from "@/lib/api";

const ROOM_LOOKS: RoomLook[] = [
  {
    id: 1,
    title: "Nordic Sanctuary Living Suite",
    slug: "nordic-sanctuary",
    roomType: "LIVING",
    styleTag: "Japandi Serenity",
    mainImageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
    description: "An airy living space combining low-profile linen seating, organic timber coffee tables, and diffuse warm paper lanterns for mindful everyday relaxation.",
    packagePrice: 245000,
    estimatedTurnaroundWeeks: 4,
    hotspots: [
      {
        id: 1,
        pinNumber: 1,
        pinXPercent: 34.0,
        pinYPercent: 68.0,
        customLabel: "Sora Modular Sofa",
        product: FALLBACK_PRODUCTS[0],
      },
      {
        id: 2,
        pinNumber: 2,
        pinXPercent: 62.0,
        pinYPercent: 76.0,
        customLabel: "Komorebi Low Coffee Table",
        product: FALLBACK_PRODUCTS[3],
      },
      {
        id: 3,
        pinNumber: 3,
        pinXPercent: 82.0,
        pinYPercent: 48.0,
        customLabel: "Washi Rice Paper Lantern",
        product: FALLBACK_PRODUCTS[4],
      }
    ]
  },
  {
    id: 2,
    title: "Kyoto Zen Dining Pavilion",
    slug: "kyoto-zen-dining",
    roomType: "DINING",
    styleTag: "Organic Minimalist",
    mainImageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
    description: "Harmonious dining suite featuring solid oak refectory table, sculptural cane armchairs, and understated ceramics bathed in soft natural daylight.",
    packagePrice: 215000,
    estimatedTurnaroundWeeks: 5,
    hotspots: [
      {
        id: 4,
        pinNumber: 1,
        pinXPercent: 48.0,
        pinYPercent: 64.0,
        customLabel: "Kyoto Refectory Table",
        product: FALLBACK_PRODUCTS[1],
      },
      {
        id: 5,
        pinNumber: 2,
        pinXPercent: 28.0,
        pinYPercent: 72.0,
        customLabel: "Wabi Occasional Armchair",
        product: FALLBACK_PRODUCTS[2],
      }
    ]
  },
  {
    id: 3,
    title: "Ryokan Minimalist Bedroom",
    slug: "ryokan-bedroom",
    roomType: "BEDROOM",
    styleTag: "Japandi Sanctuary",
    mainImageUrl: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=80",
    description: "A restorative master bedroom suite with floating solid oak platform bed, integrated bedside ledges, and warm organic cotton bedding.",
    packagePrice: 185000,
    estimatedTurnaroundWeeks: 3,
    hotspots: [
      {
        id: 6,
        pinNumber: 1,
        pinXPercent: 52.0,
        pinYPercent: 68.0,
        customLabel: "Ryokan Low Platform Bed",
        product: FALLBACK_PRODUCTS[5],
      },
      {
        id: 7,
        pinNumber: 2,
        pinXPercent: 78.0,
        pinYPercent: 54.0,
        customLabel: "Washi Bedside Lantern",
        product: FALLBACK_PRODUCTS[4],
      }
    ]
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const room = searchParams.get("room");

  if (room && room !== "all") {
    const filtered = ROOM_LOOKS.filter((l) => l.roomType.toLowerCase() === room.toLowerCase());
    return NextResponse.json(filtered.length > 0 ? filtered : ROOM_LOOKS);
  }

  return NextResponse.json(ROOM_LOOKS);
}
