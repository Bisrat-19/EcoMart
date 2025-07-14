import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { CartProvider } from "@/hooks/use-cart"
import { AuthProvider } from "@/hooks/use-auth"
import { SearchProvider } from "@/hooks/use-search"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "EcoMart - Sustainable Shopping for a Better Tomorrow",
  description: "Discover eco-friendly products that make a positive impact on our planet",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-green-50/30 via-white to-emerald-50/30 min-h-screen`}>
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <SearchProvider>
                <Header />
                {children}
              </SearchProvider>
            </Suspense>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
