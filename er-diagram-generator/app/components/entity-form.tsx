"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EntityFormProps {
  index: number
  maxAttributes: number
  entities: Record<string, string[]>
  onUpdate: (entityName: string, attributes: string[]) => void
}

export function EntityForm({ index, maxAttributes, entities, onUpdate }: EntityFormProps) {
  const [entityName, setEntityName] = useState(`Entity_${index + 1}`)
  const [numAttributes, setNumAttributes] = useState(1)
  const [attributes, setAttributes] = useState<string[]>([`attr_1`])

  const handleAttributeChange = (index: number, value: string) => {
    const newAttributes = [...attributes]
    newAttributes[index] = value
    setAttributes(newAttributes)
    onUpdate(entityName, newAttributes)
  }

  const handleEntityNameChange = (value: string) => {
    setEntityName(value)
    onUpdate(value, attributes)
  }

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div>
        <Label htmlFor={`entity-${index}`}>Entity Name</Label>
        <Input
          id={`entity-${index}`}
          value={entityName}
          onChange={(e) => handleEntityNameChange(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label>Attributes</Label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const newNum = Math.max(1, numAttributes - 1)
                setNumAttributes(newNum)
                setAttributes((prev) => prev.slice(0, newNum))
              }}
              disabled={numAttributes <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="min-w-[3ch] text-center">{numAttributes}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const newNum = Math.min(maxAttributes, numAttributes + 1)
                setNumAttributes(newNum)
                setAttributes((prev) => [...prev, `attr_${newNum}`])
              }}
              disabled={numAttributes >= maxAttributes}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          {attributes.map((attr, i) => (
            <Input
              key={i}
              value={attr}
              onChange={(e) => handleAttributeChange(i, e.target.value)}
              placeholder={`Attribute ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

