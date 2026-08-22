import { NextResponse } from "next/server";
import { getPublicSupabase } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid enquiry." }, { status: 400 });
  const record = body as Record<string, unknown>;
  const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().replace(/[<>]/g, "").slice(0, max) : "";
  const name = clean(record.name, 120);
  const phone = clean(record.phone, 30);
  const email = clean(record.email, 254);
  const interestedIn = clean(record.interestedIn, 120);
  const message = clean(record.message, 3000);
  if (name.length < 2 || phone.length < 7 || !/^\+?[0-9 ()-]+$/.test(phone) || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return NextResponse.json({ error: "Please enter a valid name, phone number and email address." }, { status: 400 });
  const client = getPublicSupabase();
  if (!client) return NextResponse.json({ error: "Enquiries are temporarily unavailable. Please call or WhatsApp our team." }, { status: 503 });
  const { error } = await client.from("enquiries").insert({ name, phone, email: email || null, interested_in: interestedIn || null, message: message || null });
  if (error) return NextResponse.json({ error: "We could not send your enquiry. Please try again or contact our team." }, { status: 503 });
  return NextResponse.json({ success: true });
}
