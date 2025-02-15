import { Navigation } from "../components/navigation"
import { Footer } from "../components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">EasyER</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p>
              At EasyER, we're passionate about simplifying the process of creating Entity-Relationship
              Diagrams. Our mission is to provide an intuitive, AI-powered tool that helps developers, database
              administrators, and students visualize complex data structures with ease.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">The Power of AI</h2>
            <p>
              We leverage cutting-edge AI technology to transform your ideas into professional-grade ER diagrams.
              Whether you're starting from scratch or working with an existing schema, our AI assistant understands your
              intent and generates accurate, visually appealing diagrams in seconds.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">Features</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>AI-powered diagram generation</li>
              <li>Manual customization options</li>
              <li>File upload for existing schemas</li>
              <li>Interactive and responsive design</li>
              <li>Diagram history and quick retrieval</li>
              <li>Export options (PNG, PDF)</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">Our Team</h2>
            <p>
              We're a dedicated team of developers, designers, and database enthusiasts committed to creating the best
              ER diagram tool on the market. With our diverse backgrounds in software engineering, UX design, and
              database management, we bring a wealth of experience to tackle the challenges of data visualization.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">Open Source</h2>
            <p>
              We believe in the power of community-driven development. That's why ER Diagram Generator is open source,
              welcoming contributions from developers around the world. Together, we're building a tool that evolves
              with the needs of its users and pushes the boundaries of what's possible in database design visualization.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

