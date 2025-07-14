"use client"

import Image from "next/image"
import { Star, ShoppingCart, Heart, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import { useState } from "react"

export function ProductDetail({ product }) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
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
        quantity,
      })
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setIsAdding(false)
    }
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const getImageSrc = () => {
    if (imageError || !product.image) {
      return "/placeholder.svg?height=600&width=600"
    }
    return product.image
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={getImageSrc() || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
          onError={handleImageError}
          unoptimized={!product.image?.startsWith("/placeholder")}
        />
        {imageError && product.image && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-2">📷</div>
              <div>Image not available</div>
              <div className="text-sm mt-1">Using placeholder instead</div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <Badge variant="secondary" className="mb-2">
            {product.category}
          </Badge>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              ({product.rating}) • {product.reviews} reviews
            </span>
          </div>

          <p className="text-4xl font-bold text-green-600 mb-4">${product.price.toFixed(2)}</p>

          <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

          <div className="flex items-center space-x-4 mb-6">
            <div
              className={`px-3 py-1 rounded-full text-sm ${
                product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border rounded-lg">
              <Button variant="ghost" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={incrementQuantity} disabled={quantity >= product.stock}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button onClick={handleAddToCart} className="flex-1" size="lg" disabled={isAdding || product.stock === 0}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              {isAdding ? "Adding..." : "Add to Cart"}
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Truck className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-sm font-medium">Free Shipping</p>
              <p className="text-xs text-gray-600">On orders over $50</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Shield className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm font-medium">1 Year Warranty</p>
              <p className="text-xs text-gray-600">Full coverage</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <RotateCcw className="h-6 w-6 mx-auto mb-2 text-orange-600" />
              <p className="text-sm font-medium">30-Day Returns</p>
              <p className="text-xs text-gray-600">Easy returns</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
