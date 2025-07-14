"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { adminService } from "@/services/admin-service"
import { CheckCircle, AlertCircle, Eye } from "lucide-react"

const categories = ["Electronics", "Accessories", "Clothing", "Home & Garden", "Sports", "Books", "Beauty", "Toys"]

// Common image URLs for testing
const sampleImages = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
]

export function AddProductForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [imagePreview, setImagePreview] = useState("")
  const [imageError, setImageError] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Handle image URL changes
    if (name === "image") {
      setImagePreview(value)
      setImageError(false)
    }
  }

  const handleCategoryChange = (value) => {
    setFormData({
      ...formData,
      category: value,
    })
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const handleSampleImageSelect = (imageUrl) => {
    setFormData({
      ...formData,
      image: imageUrl,
    })
    setImagePreview(imageUrl)
    setImageError(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      const productData = {
        ...formData,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
      }

      console.log("Submitting product:", productData)

      const newProduct = await adminService.createProduct(productData)
      console.log("Product created successfully:", newProduct)

      setSuccess(true)

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: "",
      })
      setImagePreview("")

      // Redirect after a short delay to show success message
      setTimeout(() => {
        router.push("/admin/products")
      }, 2000)
    } catch (error) {
      console.error("Error creating product:", error)
      alert("Failed to create product. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="max-w-2xl shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-700 mb-2">Product Added Successfully!</h2>
          <p className="text-gray-600 mb-4">Your product has been added to the store.</p>
          <p className="text-sm text-gray-500">Redirecting to products page...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-4xl shadow-xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
        <p className="text-sm text-gray-600">Fill in the details to add a new product to your store</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter product description"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={handleCategoryChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg (optional)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to use placeholder image. Use direct image URLs (jpg, png, webp)
                </p>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {loading ? "Creating Product..." : "Create Product"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <div className="space-y-4">
            <div>
              <Label>Image Preview</Label>
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                    {imageError && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
                        <div className="text-center">
                          <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                          <div className="text-sm">Image failed to load</div>
                          <div className="text-xs">Check URL or try another image</div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <Eye className="h-8 w-8 mx-auto mb-2" />
                      <div className="text-sm">Image preview will appear here</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label>Sample Images (Click to use)</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {sampleImages.map((imageUrl, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSampleImageSelect(imageUrl)}
                    className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-green-400 transition-colors"
                  >
                    <img
                      src={imageUrl || "/placeholder.svg"}
                      alt={`Sample ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Click any sample image to use it for your product</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
