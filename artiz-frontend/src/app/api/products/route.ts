import { NextResponse } from "next/server";
import { FALLBACK_PRODUCTS } from "@/lib/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const room = searchParams.get("room");
  const featured = searchParams.get("featured");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");

  let products = [...FALLBACK_PRODUCTS];

  if (room && room !== "all") {
    products = products.filter((p) => p.roomType.toLowerCase() === room.toLowerCase());
  }

  if (featured === "true") {
    products = products.filter((p) => p.isFeatured);
  }

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.materialsSummary.toLowerCase().includes(q)
    );
  }

  if (sort === "price-asc") {
    products.sort((a, b) => a.basePrice - b.basePrice);
  } else if (sort === "price-desc") {
    products.sort((a, b) => b.basePrice - a.basePrice);
  }

  return NextResponse.json(products);
}
