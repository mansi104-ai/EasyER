import { Card } from "@/components/ui/card"
import Link from "next/link"

// This would typically come from a CMS or API
const blogPosts = [
  {
    id: 1,
    title: "Introduction to ER Diagrams",
    excerpt: "Learn the basics of Entity-Relationship Diagrams and why they're crucial for database design.",
    date: "2023-06-01",
  },
  {
    id: 2,
    title: "AI in Database Design: A Game Changer",
    excerpt: "Explore how AI is revolutionizing the way we approach database design and ER diagramming.",
    date: "2023-06-15",
  },
  {
    id: 3,
    title: "Best Practices for Creating Clear ER Diagrams",
    excerpt: "Discover tips and tricks to make your ER diagrams more readable and effective.",
    date: "2023-07-01",
  },
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.id} className="p-6">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{post.date}</span>
              <Link href={`/blog/${post.id}`} className="text-blue-600 hover:underline">
                Read more
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

