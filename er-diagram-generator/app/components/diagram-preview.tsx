import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface DiagramPreviewProps {
  diagram: string
}

export function DiagramPreview({ diagram }: DiagramPreviewProps) {
  return (
    <Card className="p-4">
      <div className="mb-4 overflow-hidden rounded-lg border bg-white p-4">
        <div dangerouslySetInnerHTML={{ __html: diagram }} />
      </div>
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Download PNG</Button>
        <Button variant="outline">Download PDF</Button>
        <Button>Share</Button>
      </div>
    </Card>
  )
}

