import { NextResponse } from "next/server";

const notImplemented = () =>
  NextResponse.json(
    { error: "This endpoint is not implemented in the frontend app." },
    { status: 501 }
  );

export async function GET() {
  return notImplemented();
}

export async function POST() {
  return notImplemented();
}
