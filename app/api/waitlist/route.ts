import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// TODO: connect to the real mailing list provider before going live.
// Until then sign-ups are only logged to the server console.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  if (!EMAIL.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  const flavour = typeof body?.flavour === "string" ? body.flavour : null;
  console.log("[waitlist]", { email, flavour, at: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
