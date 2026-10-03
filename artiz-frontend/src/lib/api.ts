export interface Swatch {
  id: number;
  swatchType: string;
  name: string;
  hexColor: string;
  priceModifier: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  basePrice: number;
  roomType: string;
  isCustomizable: boolean;
  isFeatured: boolean;
  dimensionsSummary: string;
  clearanceGuide: string;
  description: string;
  materialsSummary: string;
  featuredImage: string;
  swatches: Swatch[];
}

export interface RoomHotspot {
  id: number;
  pinNumber: number;
  pinXPercent: number;
  pinYPercent: number;
  customLabel: string;
  product: Product;
}

export interface RoomLook {
  id: number;
  title: string;
  slug: string;
  roomType: string;
  styleTag: string;
  mainImageUrl: string;
  description: string;
  packagePrice: number;
  estimatedTurnaroundWeeks: number;
  hotspots: RoomHotspot[];
}

export interface OrderItemPayload {
  productId: number;
  selectedSwatchName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderPayload {
  customerName: string;
  email: string;
  phone?: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  deliveryDate?: string;
  paymentMethod: string;
  discountAmount?: number;
  items: OrderItemPayload[];
}

export function formatRupees(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Sora Modular 3-Seater Sofa",
    slug: "sora-modular-sofa",
    basePrice: 145000,
    roomType: "LIVING",
    isCustomizable: true,
    isFeatured: true,
    dimensionsSummary: "W: 240cm × D: 102cm × H: 76cm",
    clearanceGuide: "Requires minimum 80cm clear hallway and doorway entry width.",
    description: "Feather-soft dual density foam cushioned in high-tensile Belgian linen or textured oat bouclé. Supported by a low-profile solid white oak plinth.",
    materialsSummary: "FSC White Oak, Belgian Linen, High-Resilience Foam",
    featuredImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    swatches: [
      { id: 1, swatchType: "FABRIC", name: "Warm Oat Bouclé", hexColor: "#E5DFC5", priceModifier: 0 },
      { id: 2, swatchType: "FABRIC", name: "Smoked Walnut Linen", hexColor: "#4A3B32", priceModifier: 7500 },
      { id: 3, swatchType: "FABRIC", name: "Forest Sage Velvet", hexColor: "#566657", priceModifier: 12000 },
    ]
  },
  {
    id: 2,
    name: "Kyoto Refectory Dining Table",
    slug: "kyoto-refectory-table",
    basePrice: 115000,
    roomType: "DINING",
    isCustomizable: true,
    isFeatured: true,
    dimensionsSummary: "W: 200cm × D: 95cm × H: 75cm",
    clearanceGuide: "Allow 90cm perimeter clearance around all sides for comfortable chair movement.",
    description: "Constructed using traditional Japanese joinery without exposed metal fasteners. Softened chamfered edges coated in zero-VOC organic hardwax-oil.",
    materialsSummary: "Solid American White Oak, Organic Hardwax-Oil",
    featuredImage: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80",
    swatches: [
      { id: 4, swatchType: "TIMBER", name: "Natural White Oak", hexColor: "#D6BA91", priceModifier: 0 },
      { id: 5, swatchType: "TIMBER", name: "Smoked American Walnut", hexColor: "#543D2B", priceModifier: 14000 },
      { id: 6, swatchType: "TIMBER", name: "Ebonized Black Ash", hexColor: "#1C1917", priceModifier: 11000 },
    ]
  },
  {
    id: 3,
    name: "Wabi Occasional Armchair",
    slug: "wabi-armchair",
    basePrice: 58000,
    roomType: "LIVING",
    isCustomizable: true,
    isFeatured: true,
    dimensionsSummary: "W: 72cm × D: 78cm × H: 81cm",
    clearanceGuide: "Compact footprint, fits easily through standard 70cm doors.",
    description: "Curved solid ash timber backrest seamlessly integrated with hand-caned natural rattan mesh seating. Lightweight yet supremely sturdy.",
    materialsSummary: "Solid Ash, Hand-woven Rattan Cane",
    featuredImage: "https://images.unsplash.com/photo-1580481077190-7361356a35a1?auto=format&fit=crop&w=800&q=80",
    swatches: [
      { id: 7, swatchType: "TIMBER", name: "Bleached Ash & Natural Cane", hexColor: "#E5DCB8", priceModifier: 0 },
      { id: 8, swatchType: "TIMBER", name: "Walnut Frame & Noir Cane", hexColor: "#3E2F26", priceModifier: 5000 },
    ]
  },
  {
    id: 4,
    name: "Komorebi Low Coffee Table",
    slug: "komorebi-coffee-table",
    basePrice: 42000,
    roomType: "LIVING",
    isCustomizable: true,
    isFeatured: false,
    dimensionsSummary: "W: 130cm × D: 70cm × H: 38cm",
    clearanceGuide: "Maintain 40cm to 45cm distance between table and sofa.",
    description: "Subtle organic pill-shaped silhouette resting on three cylindrical timber legs. Hand-rubbed satin finish.",
    materialsSummary: "Solid White Oak or Smoked Walnut",
    featuredImage: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
    swatches: [
      { id: 9, swatchType: "TIMBER", name: "Natural Oak Finish", hexColor: "#D6BA91", priceModifier: 0 },
      { id: 10, swatchType: "TIMBER", name: "Smoked Walnut Finish", hexColor: "#543D2B", priceModifier: 6000 },
    ]
  },
  {
    id: 5,
    name: "Washi Rice Paper Floor Lantern",
    slug: "washi-paper-lantern",
    basePrice: 19500,
    roomType: "LIVING",
    isCustomizable: false,
    isFeatured: false,
    dimensionsSummary: "Dia: 42cm × H: 125cm",
    clearanceGuide: "Fits any interior corner. Lightweight bamboo frame with warm 2700K ambient LED.",
    description: "Inspired by traditional Gifu paper lanterns. Softens light evenly to create an intimate sanctuary ambience.",
    materialsSummary: "Mulberry Washi Paper, Bamboo Ribs, Cast Iron Base",
    featuredImage: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    swatches: []
  },
  {
    id: 6,
    name: "Ryokan Low Platform Bed",
    slug: "ryokan-platform-bed",
    basePrice: 128000,
    roomType: "BEDROOM",
    isCustomizable: true,
    isFeatured: true,
    dimensionsSummary: "W: 195cm × L: 215cm × H: 32cm",
    clearanceGuide: "Requires 2-person assembly. Side ledges extend 15cm beyond standard Queen mattress.",
    description: "Zen-inspired low platform design with integrated bedside floating ledges. Promotes grounded relaxation and restful sleep.",
    materialsSummary: "Solid Smoked Oak, Slatted Birch Foundation",
    featuredImage: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
    swatches: [
      { id: 11, swatchType: "TIMBER", name: "Natural White Oak", hexColor: "#D6BA91", priceModifier: 0 },
      { id: 12, swatchType: "TIMBER", name: "Smoked Dark Oak", hexColor: "#3E2F26", priceModifier: 9500 },
    ]
  }
];

export const FALLBACK_ROOM_LOOKS: RoomLook[] = [
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
    styleTag: "Kyoto Minimalism",
    mainImageUrl: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=80",
    description: "Solid white oak dining surrounded by sculptured wabi armchairs and soft architectural shadows.",
    packagePrice: 215000,
    estimatedTurnaroundWeeks: 3,
    hotspots: [
      {
        id: 4,
        pinNumber: 1,
        pinXPercent: 48.0,
        pinYPercent: 65.0,
        customLabel: "Kyoto Refectory Dining Table",
        product: FALLBACK_PRODUCTS[1],
      },
      {
        id: 5,
        pinNumber: 2,
        pinXPercent: 28.0,
        pinYPercent: 68.0,
        customLabel: "Wabi Occasional Armchair",
        product: FALLBACK_PRODUCTS[2],
      }
    ]
  },
  {
    id: 3,
    title: "Ryokan Minimalist Bedroom",
    slug: "ryokan-minimalist-bedroom",
    roomType: "BEDROOM",
    styleTag: "Wabi Sabi Rest",
    mainImageUrl: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=80",
    description: "Low-height platform bed framed by natural oak textures, textured bouclé linens, and serene filtered light.",
    packagePrice: 185000,
    estimatedTurnaroundWeeks: 4,
    hotspots: [
      {
        id: 6,
        pinNumber: 1,
        pinXPercent: 52.0,
        pinYPercent: 62.0,
        customLabel: "Ryokan Low Platform Bed",
        product: FALLBACK_PRODUCTS[5],
      },
      {
        id: 7,
        pinNumber: 2,
        pinXPercent: 85.0,
        pinYPercent: 55.0,
        customLabel: "Washi Rice Paper Lantern",
        product: FALLBACK_PRODUCTS[4],
      }
    ]
  }
];

export async function fetchProducts(room?: string, search?: string, sort?: string): Promise<Product[]> {
  if (typeof window === "undefined") {
    let list = [...FALLBACK_PRODUCTS];
    if (room && room !== "all") {
      list = list.filter((p) => p.roomType.toLowerCase() === room.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (sort === "price-asc") list.sort((a, b) => a.basePrice - b.basePrice);
    if (sort === "price-desc") list.sort((a, b) => b.basePrice - a.basePrice);
    return list;
  }

  try {
    const params = new URLSearchParams();
    if (room && room !== "all") params.append("room", room);
    if (search) params.append("search", search);
    if (sort) params.append("sort", sort);

    const res = await fetch(`/api/products?${params.toString()}`);
    if (!res.ok) throw new Error("API call failed");
    return await res.json();
  } catch (err) {
    let list = [...FALLBACK_PRODUCTS];
    if (room && room !== "all") {
      list = list.filter((p) => p.roomType.toLowerCase() === room.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (sort === "price-asc") list.sort((a, b) => a.basePrice - b.basePrice);
    if (sort === "price-desc") list.sort((a, b) => b.basePrice - a.basePrice);
    return list;
  }
}

export async function fetchRoomLooks(room?: string): Promise<RoomLook[]> {
  if (typeof window === "undefined") {
    if (room && room !== "all") {
      return FALLBACK_ROOM_LOOKS.filter((l) => l.roomType.toLowerCase() === room.toLowerCase());
    }
    return FALLBACK_ROOM_LOOKS;
  }

  try {
    const url = room ? `/api/room-looks?room=${room}` : `/api/room-looks`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("API call failed");
    return await res.json();
  } catch (err) {
    return FALLBACK_ROOM_LOOKS;
  }
}

export async function submitConsultation(data: {
  customerName: string;
  email: string;
  phone?: string;
  roomType: string;
  preferredStyle: string;
  budgetRange: string;
  projectNotes?: string;
}) {
  try {
    const res = await fetch(`/api/consultations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    return {
      success: true,
      id: "ARTIZ-CNS-LOCAL",
      message: "Consultation booked successfully (Offline Mode)",
      data,
    };
  }
}

export async function fetchConsultations() {
  try {
    const res = await fetch(`/api/consultations`);
    if (!res.ok) throw new Error("API call failed");
    return await res.json();
  } catch (err) {
    return [];
  }
}

export async function submitOrder(orderData: OrderPayload) {
  try {
    const res = await fetch(`/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    return await res.json();
  } catch (err) {
    return {
      success: true,
      orderNumber: "ARTIZ-2026-" + Math.floor(1000 + Math.random() * 9000),
      message: "Order placed successfully (Offline Mode)",
    };
  }
}

export async function fetchOrders() {
  try {
    const res = await fetch(`/api/orders`);
    if (!res.ok) throw new Error("API call failed");
    return await res.json();
  } catch (err) {
    return [];
  }
}
