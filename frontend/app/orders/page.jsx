"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Truck, CheckCircle, Clock, ArrowLeft } from "lucide-react"
import { apiService } from "@/services/api-service"

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await apiService.get("/orders/my")
        setOrders(data)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  // Order summary
  const totalOrders = orders.length
  const pending = orders.filter(o => o.status === "pending").length
  const shipped = orders.filter(o => o.status === "shipped").length
  const delivered = orders.filter(o => o.status === "delivered").length

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Back to Store Button */}
      <div className="mb-4">
        <Link href="/">
          <Button variant="ghost" className="flex items-center text-gray-700 hover:text-green-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Store
          </Button>
        </Link>
      </div>
      {/* Page Title & Subtitle */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">My Orders</h1>
        <p className="text-gray-500 text-sm sm:text-base">Track your order history and status here.</p>
      </div>

      {/* Order summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Shipped</CardTitle>
            <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{shipped}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Delivered</CardTitle>
            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{delivered}</div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Your Orders</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto p-2 sm:p-4">
          <Table className="min-w-[600px] w-full text-xs sm:text-sm">
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5}>Loading...</TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>No orders found.</TableCell>
                </TableRow>
              ) : (
                orders.map(order => (
                  <TableRow key={order._id}>
                    <TableCell>#{order._id.slice(-6).toUpperCase()}</TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[order.status] || "bg-gray-100 text-gray-800"}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      ${order.total ? order.total.toFixed(2) : "0.00"}
                    </TableCell>
                    <TableCell>
                      <Link href={`/order-confirmation?id=${order._id}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}