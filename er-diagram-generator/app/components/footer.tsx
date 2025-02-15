import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <Card className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* <div>
              <h2 className="text-2xl font-bold mb-4">Coming Soon: Arsana Charts</h2>
              <p className="text-gray-600 mb-4">
                We're excited to announce that we'll be integrating Arsana Charts into our ER Diagram Generator. This
                powerful charting library will allow you to create even more sophisticated and interactive diagrams.
                Stay tuned for updates!
              </p>
            </div> */}
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="https://github.com/mansi104-ai" target="_blank" rel="noopener noreferrer">
                <Github className="w-6 h-6 text-gray-600 hover:text-gray-900" />
              </Link>
              <Link href="https://x.com/Mansikalra7079" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-6 h-6 text-gray-600 hover:text-gray-900" />
              </Link>
              <Link href="https://www.linkedin.com/in/kalra-mansi/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-6 h-6 text-gray-600 hover:text-gray-900" />
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </footer>
  )
}

