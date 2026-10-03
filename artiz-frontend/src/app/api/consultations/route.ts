import { NextResponse } from "next/server";

export interface StoredConsultation {
  id: string;
  customerName: string;
  email: string;
  phone?: string;
  roomType: string;
  preferredStyle: string;
  budgetRange: string;
  projectNotes?: string;
  status: "NEW" | "REVIEWED" | "SCHEDULED";
  createdAt: string;
}

let consultationsStore: StoredConsultation[] = [
  {
    id: "ARTIZ-CNS-101",
    customerName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98192 48190",
    roomType: "Living Room",
    preferredStyle: "Japandi Serenity",
    budgetRange: "₹5 Lakh – ₹15 Lakh",
    projectNotes: "Renovating our main open-plan living room with natural garden light. Need solid oak low coffee table and modular bouclé seating.",
    status: "REVIEWED",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

export async function GET() {
  return NextResponse.json(consultationsStore);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.customerName || !body.email) {
      return NextResponse.json(
        { error: "Customer name and email are required" },
        { status: 400 }
      );
    }

    const newRecord: StoredConsultation = {
      id: `ARTIZ-CNS-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: body.customerName,
      email: body.email,
      phone: body.phone || "",
      roomType: body.roomType || "Living Room",
      preferredStyle: body.preferredStyle || "Japandi Serenity",
      budgetRange: body.budgetRange || "₹2.5 Lakh – ₹5 Lakh",
      projectNotes: body.projectNotes || "",
      status: "NEW",
      createdAt: new Date().toISOString(),
    };

    consultationsStore.unshift(newRecord);

    return NextResponse.json({
      success: true,
      id: newRecord.id,
      message: "Consultation booked successfully! Our interior architect will reach out within 24 hours.",
      data: newRecord,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to parse consultation request" },
      { status: 500 }
    );
  }
}
