import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const diagrams = await prisma.diagram.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    })

    // Validate the response data
    if (!Array.isArray(diagrams)) {
      throw new Error("Invalid data format from database")
    }

    // Map and filter to ensure we only return valid SVG strings
    const svgDiagrams = diagrams
      .map((d) => d?.svg)
      .filter((svg): svg is string => typeof svg === "string" && svg.length > 0)

    return NextResponse.json(svgDiagrams)
  } catch (error) {
    console.error("Error fetching diagrams:", error)
    // Return empty array instead of error in production
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(req: Request) {
  try {
    const { diagram } = await req.json()

    // Validate the input
    if (typeof diagram !== "string" || diagram.trim().length === 0) {
      return NextResponse.json(
        { error: "Invalid diagram data" },
        { status: 400 }
      )
    }

    const savedDiagram = await prisma.diagram.create({
      data: { svg: diagram },
    })

    // Validate the created diagram
    if (!savedDiagram?.svg) {
      throw new Error("Failed to save diagram properly")
    }

    return NextResponse.json({ success: true, diagram: savedDiagram.svg })
  } catch (error) {
    console.error("Error saving diagram:", error)
    return NextResponse.json(
      { error: "Failed to save diagram" },
      { status: 500 }
    )
  }
}