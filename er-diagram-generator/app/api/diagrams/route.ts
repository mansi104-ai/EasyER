import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const diagrams = await prisma.diagram.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    })
    return NextResponse.json(diagrams.map((d) => d.svg))
  } catch (error) {
    console.error("Error fetching diagrams:", error)
    return NextResponse.json({ error: "Failed to fetch diagrams" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { diagram } = await req.json()
    await prisma.diagram.create({
      data: { svg: diagram },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving diagram:", error)
    return NextResponse.json({ error: "Failed to save diagram" }, { status: 500 })
  }
}

