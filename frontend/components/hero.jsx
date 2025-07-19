import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg leading-tight">
          Welcome to EcoMart
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto opacity-95">
          Discover sustainable, eco-friendly products that make a difference. Shop consciously and help protect our
          planet.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:space-x-4 sm:gap-0 w-full max-w-md mx-auto">
          <Link href="#products">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-green-600 hover:bg-green-50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Shop Eco Products
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto text-white border-white/50 hover:bg-white/10 hover:border-white backdrop-blur-sm bg-transparent"
          >
            Learn More
          </Button>
        </div>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-4 left-4 w-12 h-12 sm:w-20 sm:h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-4 right-4 w-20 h-20 sm:w-32 sm:h-32 bg-white/5 rounded-full blur-2xl"></div>
    </section>
  )
}
