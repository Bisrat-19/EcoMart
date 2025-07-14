"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, SlidersHorizontal } from "lucide-react"
import { productService } from "@/services/product-service"

export function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState("relevance")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priceRange, setPriceRange] = useState("all")

  const categories = ["Electronics", "Accessories", "Clothing", "Home & Garden", "Sports", "Books", "Beauty", "Toys"]
  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-25", label: "$0 - $25" },
    { value: "25-50", label: "$25 - $50" },
    { value: "50-100", label: "$50 - $100" },
    { value: "100+", label: "$100+" },
  ]

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [initialQuery])

  const performSearch = async (query) => {
    if (!query.trim()) return

    setLoading(true)
    try {
      const searchResults = await productService.searchProducts(query)
      setResults(searchResults)
    } catch (error) {
      console.error("Search error:", error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    performSearch(searchQuery)
  }

  const filteredAndSortedResults = results
    .filter((product) => {
      // Category filter
      if (categoryFilter !== "all" && product.category !== categoryFilter) {
        return false
      }

      // Price filter
      if (priceRange !== "all") {
        const price = product.price
        switch (priceRange) {
          case "0-25":
            return price <= 25
          case "25-50":
            return price > 25 && price <= 50
          case "50-100":
            return price > 50 && price <= 100
          case "100+":
            return price > 100
          default:
            return true
        }
      }

      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0 // relevance (original order)
      }
    })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Search Products</h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search eco-friendly products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </form>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Filters & Sorting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Price Range</label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSortBy("relevance")
                    setCategoryFilter("all")
                    setPriceRange("all")
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      {initialQuery && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Search Results for "{initialQuery}"</h2>
              <p className="text-gray-600">
                {filteredAndSortedResults.length} product{filteredAndSortedResults.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* Active Filters */}
            <div className="flex items-center space-x-2">
              {categoryFilter !== "all" && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setCategoryFilter("all")}>
                  {categoryFilter} ×
                </Badge>
              )}
              {priceRange !== "all" && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setPriceRange("all")}>
                  {priceRanges.find((r) => r.value === priceRange)?.label} ×
                </Badge>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <span className="ml-2">Searching...</span>
            </div>
          ) : filteredAndSortedResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="text-center py-12">
              <Filter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products match your filters</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
              <Button
                variant="outline"
                onClick={() => {
                  setCategoryFilter("all")
                  setPriceRange("all")
                }}
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600">Try different keywords or check your spelling</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
