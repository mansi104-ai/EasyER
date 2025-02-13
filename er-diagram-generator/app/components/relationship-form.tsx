"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RelationshipFormProps {
  entities: string[]
  relationships: [string, string, string, string][]
  onUpdate: (relationships: [string, string, string, string][]) => void
}

export function RelationshipForm({ entities, relationships, onUpdate }: RelationshipFormProps) {
  const [numRelationships, setNumRelationships] = useState(1)

  const handleRelationshipChange = (index: number, field: number, value: string) => {
    const newRelationships = [...relationships]
    if (!newRelationships[index]) {
      newRelationships[index] = ["", "", "", "One-to-One"]
    }
    newRelationships[index][field] = value
    onUpdate(newRelationships)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Number of Relationships</Label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setNumRelationships(Math.max(1, numRelationships - 1))}
            disabled={numRelationships <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="min-w-[3ch] text-center">{numRelationships}</span>
          <Button variant="outline" size="icon" onClick={() => setNumRelationships(numRelationships + 1)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {Array.from({ length: numRelationships }).map((_, i) => (
          <div key={i} className="grid gap-4 rounded-lg border p-4 md:grid-cols-4">
            <div>
              <Label>Entity 1</Label>
              <Select
                value={relationships[i]?.[0] || ""}
                onValueChange={(value) => handleRelationshipChange(i, 0, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select entity" />
                </SelectTrigger>
                <SelectContent>
                  {entities.map((entity) => (
                    <SelectItem key={entity} value={entity}>
                      {entity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Entity 2</Label>
              <Select
                value={relationships[i]?.[1] || ""}
                onValueChange={(value) => handleRelationshipChange(i, 1, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select entity" />
                </SelectTrigger>
                <SelectContent>
                  {entities.map((entity) => (
                    <SelectItem key={entity} value={entity}>
                      {entity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Relationship Name</Label>
              <Input
                value={relationships[i]?.[2] || ""}
                onChange={(e) => handleRelationshipChange(i, 2, e.target.value)}
                placeholder="Relationship name"
              />
            </div>

            <div>
              <Label>Type</Label>
              <Select
                value={relationships[i]?.[3] || "One-to-One"}
                onValueChange={(value) => handleRelationshipChange(i, 3, value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="One-to-One">One-to-One</SelectItem>
                  <SelectItem value="One-to-Many">One-to-Many</SelectItem>
                  <SelectItem value="Many-to-Many">Many-to-Many</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

