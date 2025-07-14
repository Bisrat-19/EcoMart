import { ProductGrid } from "@/components/product-grid"
import { Hero } from "@/components/hero"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <ProductGrid />
      </main>
    </div>
  )
}
