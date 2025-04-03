import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return 'An unknown error occurred'
}

export async function GET() {
  try {
    const diagrams = await prisma.diagram.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    })

    if (!Array.isArray(diagrams)) {
      console.error('Invalid data format from database - diagrams is not an array')
      return NextResponse.json([], { status: 200 })
    }

    const svgDiagrams = diagrams
      .map((d) => d?.svg)
      .filter((svg): svg is string => typeof svg === "string" && svg.length > 0)

    return NextResponse.json(svgDiagrams)
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    console.error("Error fetching diagrams:", errorMessage)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(req: Request) {
  try {
    const { diagram } = await req.json()

    if (typeof diagram !== "string" || diagram.trim().length === 0) {
      console.error('Invalid diagram data received')
      return NextResponse.json(
        { error: "Invalid diagram data" },
        { status: 400 }
      )
    }

    const savedDiagram = await prisma.diagram.create({
      data: { svg: diagram },
    })

    if (!savedDiagram?.svg) {
      console.error('Failed to save diagram properly - no SVG returned')
      throw new Error("Failed to save diagram properly")
    }

    return NextResponse.json({ success: true, diagram: savedDiagram.svg })
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    console.error("Error saving diagram:", errorMessage)
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}