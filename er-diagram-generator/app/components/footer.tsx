import { Card } from "@/components/ui/card"

export function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Coming Soon: Arsana Charts</h2>
          <p className="text-gray-600">
            We're excited to announce that we'll be integrating Arsana Charts into our ER Diagram Generator. This
            powerful charting library will allow you to create even more sophisticated and interactive diagrams. Stay
            tuned for updates!
          </p>
        </Card>
      </div>
    </footer>
  )
}

