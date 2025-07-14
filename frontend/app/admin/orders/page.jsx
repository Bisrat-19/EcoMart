import { OrderManagement } from "@/components/admin/order-management"

export default function AdminOrdersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Order Management</h1>
      <OrderManagement />
    </div>
  )
}
