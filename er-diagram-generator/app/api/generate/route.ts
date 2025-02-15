import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { entities, relationships } = await req.json();

    if (!entities || !relationships) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate ER diagram logic (replace with actual implementation)
    const diagram = `<svg><!-- Generated ER diagram here --></svg>`;

    return NextResponse.json({ success: true, diagram });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to generate diagram" }, { status: 500 });
  }
}
