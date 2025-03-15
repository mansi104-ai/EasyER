"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DiagramPreview } from "./components/diagram-preview"
import { FileUpload } from "./components/file-upload"

const MAX_ENTITIES = 10
const MAX_ATTRIBUTES = 10
const MAX_RELATIONSHIPS = 20

export default function Page() {
  const [isManualMode, setIsManualMode] = useState(true)
  const [entities, setEntities] = useState<Record<string, string[]>>({})
  const [relationships, setRelationships] = useState<[string, string, string, string][]>([])
  const [numEntities, setNumEntities] = useState(2)
  const [numAttributes, setNumAttributes] = useState(3)
  const [numRelationships, setNumRelationships] = useState(1)
  const [diagram, setDiagram] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [savedDiagrams, setSavedDiagrams] = useState<string[]>([])

  useEffect(() => {
    // Fetch saved diagrams from the database
    fetch("/api/diagrams")
      .then((res) => res.json())
      .then((data) => setSavedDiagrams(data))
      .catch((err) => console.error("Error fetching saved diagrams:", err))
  }, [])

  const handleFileUpload = async (content: string) => {
    try {
      const data = JSON.parse(content)
      if (data.entities && data.relationships) {
        setEntities(data.entities)
        setRelationships(data.relationships)
        await generateDiagram(data.entities, data.relationships)
      }
    } catch (error) {
      console.error("Error parsing file:", error)
    }
  }

  const generateDiagram = async (ent = entities, rel = relationships) => {
    try {
      setLoading(true)
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ entities: ent, relationships: rel }),
      })

      const data = await response.json()
      if (data.error) {
        console.error("Error generating diagram:", data.error)
        return
      }
      setDiagram(data.diagram)

      // Save the generated diagram
      await fetch("/api/diagrams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ diagram: data.diagram }),
      })
    } catch (error) {
      console.error("Error generating diagram:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleManualGenerate = () => {
    generateDiagram(entities, relationships)
  }

  const handleEntityNameChange = (oldName: string, newName: string) => {
    setEntities((prev) => {
      const newEntities = { ...prev }
      newEntities[newName] = newEntities[oldName]
      delete newEntities[oldName]
      return newEntities
    })
    setRelationships((prev) =>
      prev.map(([e1, e2, name, type]) => [e1 === oldName ? newName : e1, e2 === oldName ? newName : e2, name, type]),
    )
  }

  const handleAttributeNameChange = (entityName: string, index: number, newName: string) => {
    setEntities((prev) => ({
      ...prev,
      [entityName]: prev[entityName].map((attr, i) => (i === index ? newName : attr)),
    }))
  }

  const handleRelationshipChange = (index: number, field: 0 | 1 | 2 | 3, value: string) => {
    setRelationships((prev) =>
      prev.map((rel, i) =>
        i === index
          ? ([...rel.slice(0, field), value, ...rel.slice(field + 1)] as [string, string, string, string])
          : rel,
      ),
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">EasyER</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Parameters */}
        <div className="w-full md:w-1/3">
          <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between">
            <Label htmlFor="manual-mode" className="text-xl ">{isManualMode? "Automatic Mode":"Manual Mode"}</Label>
              <Switch id="manual-mode" checked={isManualMode} onCheckedChange={setIsManualMode} />
            </div>

            {isManualMode ? (
              <>
                <div className="space-y-2">
                  <Label>Number of Entities: {numEntities}</Label>
                  <Slider
                    min={1}
                    max={MAX_ENTITIES}
                    step={1}
                    value={[numEntities]}
                    onValueChange={([value]) => {
                      setNumEntities(value)
                      setEntities((prev) => {
                        const newEntities: Record<string, string[]> = {}
                        for (let i = 0; i < value; i++) {
                          const entityName = `Entity${i + 1}`
                          newEntities[entityName] =
                            prev[entityName] ||
                            Array(numAttributes)
                              .fill("")
                              .map((_, j) => `Attribute${j + 1}`)
                        }
                        return newEntities
                      })
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Attributes per Entity: {numAttributes}</Label>
                  <Slider
                    min={1}
                    max={MAX_ATTRIBUTES}
                    step={1}
                    value={[numAttributes]}
                    onValueChange={([value]) => {
                      setNumAttributes(value)
                      setEntities((prev) => {
                        const newEntities: Record<string, string[]> = {}
                        Object.keys(prev).forEach((entityName) => {
                          newEntities[entityName] = Array(value)
                            .fill("")
                            .map((_, j) => prev[entityName][j] || `Attribute${j + 1}`)
                        })
                        return newEntities
                      })
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Number of Relationships: {numRelationships}</Label>
                  <Slider
                    min={1}
                    max={MAX_RELATIONSHIPS}
                    step={1}
                    value={[numRelationships]}
                    onValueChange={([value]) => {
                      setNumRelationships(value)
                      setRelationships((prev) => {
                        const newRelationships: [string, string, string, string][] = [...prev]
                        while (newRelationships.length < value) {
                          const entity1 = `Entity${(newRelationships.length % numEntities) + 1}`
                          const entity2 = `Entity${((newRelationships.length + 1) % numEntities) + 1}`
                          newRelationships.push([
                            entity1,
                            entity2,
                            `Relationship${newRelationships.length + 1}`,
                            "One-to-Many",
                          ])
                        }
                        return newRelationships.slice(0, value)
                      })
                    }}
                  />
                </div>
                <div className="space-y-4">
                  <Label>Entities and Attributes</Label>
                  {Object.entries(entities).map(([entityName, attributes], entityIndex) => (
                    <div key={entityIndex} className="space-y-2">
                      <Select value={entityName} onValueChange={(value) => handleEntityNameChange(entityName, value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select entity name" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: numEntities }).map((_, i) => (
                            <SelectItem key={i} value={`Entity${i + 1}`}>
                              Entity {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {attributes.map((attr, attrIndex) => (
                        <Select
                          key={attrIndex}
                          value={attr}
                          onValueChange={(value) => handleAttributeNameChange(entityName, attrIndex, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select attribute name" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: numAttributes }).map((_, i) => (
                              <SelectItem key={i} value={`Attribute${i + 1}`}>
                                Attribute {i + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <Label>Relationships</Label>
                  {relationships.map((rel, index) => (
                    <div key={index} className="space-y-2">
                      <Select value={rel[0]} onValueChange={(value) => handleRelationshipChange(index, 0, value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select entity 1" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(entities).map((entity) => (
                            <SelectItem key={entity} value={entity}>
                              {entity}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={rel[1]} onValueChange={(value) => handleRelationshipChange(index, 1, value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select entity 2" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(entities).map((entity) => (
                            <SelectItem key={entity} value={entity}>
                              {entity}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        value={rel[2]}
                        onChange={(e) => handleRelationshipChange(index, 2, e.target.value)}
                        placeholder="Relationship name"
                      />
                      <Select value={rel[3]} onValueChange={(value) => handleRelationshipChange(index, 3, value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="One-to-One">One-to-One</SelectItem>
                          <SelectItem value="One-to-Many">One-to-Many</SelectItem>
                          <SelectItem value="Many-to-Many">Many-to-Many</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
                <Button onClick={handleManualGenerate} disabled={loading}>
                  Generate Diagram
                </Button>
              </>
            ) : (
              <FileUpload onUpload={handleFileUpload} />
            )}
          </Card>
        </div>

        {/* Right Column - Diagram and Saved Diagrams */}
        <div className="w-full md:w-2/3">
          {diagram && <DiagramPreview diagram={diagram} />}

          <h2 className="text-2xl font-bold mt-8 mb-4">Saved Diagrams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedDiagrams.map((savedDiagram, index) => (
              <Card key={index} className="p-4">
                <div dangerouslySetInnerHTML={{ __html: savedDiagram }} />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

