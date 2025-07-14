import { EditProductForm } from "@/components/admin/edit-product-form"

export default function EditProductPage({ params }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <EditProductForm productId={params.id} />
    </div>
  )
}
