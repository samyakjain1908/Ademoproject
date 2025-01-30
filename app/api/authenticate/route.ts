import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { password } = await req.json()

  if (password === process.env.PASSWORD) {
    return NextResponse.json({ authenticated: true })
  } else {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}

