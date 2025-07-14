"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"
import { useState } from "react"

export function ProductCard({ product }) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    try {
      await addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setIsAdding(false)
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const getImageSrc = () => {
    if (imageError || !product.image) {
      return "/placeholder.svg?height=400&width=400"
    }
    return product.image
  }

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-md bg-white/80 backdrop-blur-sm">
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={getImageSrc() || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={handleImageError}
              unoptimized={!product.image?.startsWith("/placeholder")}
            />
            {imageError && product.image && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
                Image not available
              </div>
            )}
          </div>
        </Link>

        <Badge variant="secondary" className="mb-2">
          {product.category}
        </Badge>

        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </p>
          {product.stock > 0 ? (
            <span className="text-sm text-green-600">In Stock</span>
          ) : (
            <span className="text-sm text-red-600">Out of Stock</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300"
          disabled={isAdding || product.stock === 0}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isAdding ? "Adding..." : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}
