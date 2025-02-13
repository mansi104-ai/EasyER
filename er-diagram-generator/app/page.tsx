"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navigation } from "./components/navigation"
import { EntityForm } from "./components/entity-form"
import { RelationshipForm } from "./components/relationship-form"
import { DiagramPreview } from "./components/diagram-preview"
import { FileUpload } from "./components/file-upload"

// Constants from original code
const MAX_ENTITIES = 10
const MAX_ATTRIBUTES = 5

export default function Page() {
  const [entities, setEntities] = useState<Record<string, string[]>>({})
  const [relationships, setRelationships] = useState<[string, string, string, string][]>([])
  const [numEntities, setNumEntities] = useState(2)
  const [diagram, setDiagram] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileUpload = async (content: string) => {
    try {
      const data = JSON.parse(content)
      if (data.entities && data.relationships) {
        setEntities(data.entities)
        setRelationships(data.relationships)
      }
    } catch (error) {
      console.error("Error parsing file:", error)
    }
  }

  const generateDiagram = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ entities, relationships }),
      })

      const data = await response.json()
      setDiagram(data.diagram)
    } catch (error) {
      console.error("Error generating diagram:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900">Enhanced ER Diagram Generator</h1>

          {/* File Upload Section */}
          <Card className="mb-8 p-6">
            <h2 className="mb-4 text-xl font-semibold">Upload Existing Schema</h2>
            <FileUpload onUpload={handleFileUpload} />
          </Card>

          {/* Entity Definition Section */}
          <Card className="mb-8 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Define Entities</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setNumEntities(Math.max(1, numEntities - 1))}
                  disabled={numEntities <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="min-w-[3ch] text-center">{numEntities}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setNumEntities(Math.min(MAX_ENTITIES, numEntities + 1))}
                  disabled={numEntities >= MAX_ENTITIES}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {Array.from({ length: numEntities }).map((_, i) => (
                <EntityForm
                  key={i}
                  index={i}
                  maxAttributes={MAX_ATTRIBUTES}
                  entities={entities}
                  onUpdate={(entityName, attributes) => {
                    setEntities((prev) => ({
                      ...prev,
                      [entityName]: attributes,
                    }))
                  }}
                />
              ))}
            </div>
          </Card>

          {/* Relationship Definition Section */}
          <Card className="mb-8 p-6">
            <h2 className="mb-4 text-xl font-semibold">Define Relationships</h2>
            <RelationshipForm
              entities={Object.keys(entities)}
              relationships={relationships}
              onUpdate={setRelationships}
            />
          </Card>

          {/* Generate Button */}
          <div className="mb-8 flex justify-center">
            <Button size="lg" onClick={generateDiagram} disabled={loading || Object.keys(entities).length === 0}>
              {loading ? "Generating..." : "Generate ER Diagram"}
            </Button>
          </div>

          {/* Diagram Preview */}
          {diagram && <DiagramPreview diagram={diagram} />}
        </div>
      </main>
    </div>
  )
}

