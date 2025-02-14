import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { entities, relationships } = await req.json()

    // Call Flask backend
    const response = await fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ entities, relationships }),
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Failed to generate diagram" }, { status: 500 })
  }
}

