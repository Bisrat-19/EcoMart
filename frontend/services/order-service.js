import { apiService } from "./api-service"

class OrderService {
  async createOrder(orderData) {
    try {
      return await apiService.post('/orders', orderData)
    } catch (error) {
      console.error("Error creating order:", error)
      throw new Error("Failed to create order")
    }
  }

  async getOrderById(orderId) {
    try {
      return await apiService.get(`/orders/${orderId}`)
    } catch (error) {
      console.error("Error fetching order:", error)
      throw new Error("Order not found")
    }
  }

  async getUserOrders(userId) {
    try {
      return await apiService.get(`/users/${userId}/orders`)
    } catch (error) {
      console.error("Error fetching user orders:", error)
      return []
    }
  }
}

export const orderService = new OrderService()
