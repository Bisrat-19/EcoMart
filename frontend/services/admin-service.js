import { apiService } from "./api-service"

class AdminService {
  async getDashboardStats() {
    try {
      return await apiService.get('/admin/dashboard')
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
      return null
    }
  }

  async getAllProducts() {
    try {
      return await apiService.get('/admin/products')
    } catch (error) {
      console.error("Error fetching products:", error)
      return []
    }
  }

  async getProductById(id) {
    try {
      return await apiService.get(`/admin/products/${id}`)
    } catch (error) {
      console.error("Error fetching product:", error)
      return null
    }
  }

  async createProduct(productData) {
    try {
      return await apiService.post('/admin/products', productData)
    } catch (error) {
      console.error("Error creating product:", error)
      throw error
    }
  }

  async updateProduct(id, productData) {
    try {
      return await apiService.put(`/admin/products/${id}`, productData)
    } catch (error) {
      console.error("Error updating product:", error)
      throw error
    }
  }

  async deleteProduct(id) {
    try {
      return await apiService.delete(`/admin/products/${id}`)
    } catch (error) {
      console.error("Error deleting product:", error)
      throw error
    }
  }

  async getAllUsers() {
    try {
      return await apiService.get('/admin/users')
    } catch (error) {
      console.error("Error fetching users:", error)
      return []
    }
  }

  async updateUserRole(userId, role) {
    try {
      return await apiService.put(`/admin/users/${userId}/role`, { role })
    } catch (error) {
      console.error("Error updating user role:", error)
      throw error
    }
  }

  async deleteUser(userId) {
    try {
      return await apiService.delete(`/admin/users/${userId}`)
    } catch (error) {
      console.error("Error deleting user:", error)
      throw error
    }
  }

  async getAllOrders() {
    try {
      return await apiService.get('/admin/orders')
    } catch (error) {
      console.error("Error fetching orders:", error)
      return []
    }
  }

  async updateOrderStatus(orderId, status) {
    try {
      return await apiService.put(`/admin/orders/${orderId}/status`, { status })
    } catch (error) {
      console.error("Error updating order status:", error)
      throw error
    }
  }
}

export const adminService = new AdminService()
