import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"

export function Navigation() {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">ERDiagram</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/about" className="text-foreground/60 hover:text-foreground">
            About
          </Link>
          <Link href="/blog" className="text-foreground/60 hover:text-foreground">
            Blog
          </Link>
          <Link href="/schedule" className="text-foreground/60 hover:text-foreground">
            Schedule Meeting
          </Link>
          <ThemeToggle />
          <Button asChild>
            <Link href="/">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}

