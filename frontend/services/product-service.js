import { apiService } from "./api-service"

class ProductService {
  async getAllProducts() {
    try {
      return await apiService.get('/products')
    } catch (error) {
      console.error("Error fetching products:", error)
      return []
    }
  }

  async getProductById(id) {
    try {
      return await apiService.get(`/products/${id}`)
    } catch (error) {
      console.error("Error fetching product:", error)
      return null
    }
  }

  async searchProducts(query) {
    try {
      return await apiService.get(`/products/search?q=${encodeURIComponent(query)}`)
    } catch (error) {
      console.error("Error searching products:", error)
      return []
    }
  }

  async getProductsByCategory(category) {
    try {
      return await apiService.get(`/products/category/${category}`)
    } catch (error) {
      console.error("Error fetching products by category:", error)
      return []
    }
  }
}

export const productService = new ProductService()
