import { ProductManagement } from "@/components/admin/product-management"

export default function AdminProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>
      <ProductManagement />
    </div>
  )
}
