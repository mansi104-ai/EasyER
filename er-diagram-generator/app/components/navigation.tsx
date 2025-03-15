import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ThemeToggle } from "./theme-toggle"

export function Navigation() {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
          src ="/logo_final.png"
          alt="ERDiagram"
          width={35}
          height={35}
          ></Image>
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

