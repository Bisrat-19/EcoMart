"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Search } from "lucide-react"
import { useState } from "react"

export function SearchResults({ results, isLoading, query, onResultClick }) {
  const [imageErrors, setImageErrors] = useState({})

  const handleImageError = (productId) => {
    setImageErrors((prev) => ({ ...prev, [productId]: true }))
  }

  const getImageSrc = (product) => {
    if (imageErrors[product.id] || !product.image) {
      return "/placeholder.svg?height=100&width=100"
    }
    return product.image
  }

  if (isLoading) {
    return (
      <Card className="absolute top-full left-0 right-0 mt-2 shadow-xl border-0 bg-white/95 backdrop-blur-sm z-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            <span className="text-sm text-gray-600">Searching...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!query) return null

  return (
    <Card className="absolute top-full left-0 right-0 mt-2 shadow-xl border-0 bg-white/95 backdrop-blur-sm z-50 max-h-96 overflow-y-auto">
      <CardContent className="p-4">
        {results.length > 0 ? (
          <div className="space-y-2">
            <div className="text-sm text-gray-600 mb-3">
              Found {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
            </div>
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                onClick={onResultClick}
                className="block hover:bg-green-50 rounded-lg p-2 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={getImageSrc(product) || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                      onError={() => handleImageError(product.id)}
                      unoptimized={!product.image?.startsWith("/placeholder")}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{product.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                      <span className="text-sm font-bold text-green-600">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            <div className="border-t pt-2 mt-2">
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                onClick={onResultClick}
                className="block text-center text-sm text-blue-600 hover:text-blue-800 py-2"
              >
                View all results →
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <Search className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">No products found for "{query}"</p>
            <p className="text-xs text-gray-500 mt-1">Try different keywords or check spelling</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
