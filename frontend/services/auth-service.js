import { apiService } from "./api-service"

class AuthService {
  async login(email, password) {
    try {
      const response = await apiService.post('/auth/login', { email, password })
      localStorage.setItem('authToken', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      return response.user
    } catch (error) {
      console.error("Login failed:", error)
      throw new Error("Invalid credentials")
    }
  }

  async register(name, email, password) {
    try {
      const response = await apiService.post('/auth/register', { name, email, password })
      localStorage.setItem('authToken', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      return response.user
    } catch (error) {
      console.error("Registration failed:", error)
      throw new Error("Registration failed")
    }
  }

  async getCurrentUser() {
    try {
      const token = localStorage.getItem("authToken")
      if (!token) return null
      const user = await apiService.get('/auth/me')
      return user
    } catch (error) {
      console.error("Error getting current user:", error)
      this.logout()
      return null
    }
  }

  logout() {
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
  }

  isAuthenticated() {
    return !!localStorage.getItem("authToken")
  }
}

export const authService = new AuthService()
