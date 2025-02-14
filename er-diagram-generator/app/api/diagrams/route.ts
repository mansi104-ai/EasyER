import { NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma" // Use global prisma client

export async function GET() {
    try {
      const diagrams: { svg: string }[] = await prisma.diagram.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
      })
      
      return NextResponse.json(diagrams.map((d: { svg: string }) => d.svg), { status: 200 })
    } catch (error) {
      console.error("Error fetching diagrams:", error)
      return NextResponse.json({ error: "Failed to fetch diagrams" }, { status: 500 })
    }
  }
  

export async function POST(req: Request) {
  try {
    const { diagram } = await req.json()

    if (!diagram || typeof diagram !== "string") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    await prisma.diagram.create({ data: { svg: diagram } })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error("Error saving diagram:", error)
    return NextResponse.json({ error: "Failed to save diagram" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    await prisma.diagram.delete({ where: { id } })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error deleting diagram:", error)
    return NextResponse.json({ error: "Failed to delete diagram" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const { id, diagram } = await req.json()

    if (!id || !diagram) {
      return NextResponse.json({ error: "ID and diagram are required" }, { status: 400 })
    }

    await prisma.diagram.update({
      where: { id },
      data: { svg: diagram },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error updating diagram:", error)
    return NextResponse.json({ error: "Failed to update diagram" }, { status: 500 })
  }
}
