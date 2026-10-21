import { NextResponse } from "next/server";

type LeadPayload = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  consent?: boolean;
};

export async function POST(request: Request) {
  let body: LeadPayload;

  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const email = body.email?.trim() ?? "";

  if (!firstName || !lastName || !phone || !email) {
    return NextResponse.json(
      { error: "Please complete all required fields." },
      { status: 400 },
    );
  }

  if (!body.consent) {
    return NextResponse.json(
      { error: "Please agree to the privacy notice to continue." },
      { status: 400 },
    );
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  // Ready for CRM / GHL webhook wiring. For now, accept and confirm.
  console.info("[lead]", {
    firstName,
    lastName,
    phone,
    email,
    program: "Adult IOP",
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
