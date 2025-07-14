import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-6xl font-bold mb-6 drop-shadow-lg">Welcome to EcoMart</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
          Discover sustainable, eco-friendly products that make a difference. Shop consciously and help protect our
          planet.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="#products">
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-green-50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Shop Eco Products
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white/50 hover:bg-white/10 hover:border-white backdrop-blur-sm bg-transparent"
          >
            Learn More
          </Button>
        </div>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
    </section>
  )
}
