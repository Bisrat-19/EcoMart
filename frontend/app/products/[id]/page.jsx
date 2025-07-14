import { ProductDetail } from "@/components/product-detail"
import { notFound } from "next/navigation"
import { productService } from "@/services/product-service"

export default async function ProductPage({ params }) {
  const { id } = await params;
  try {
    const product = await productService.getProductById(id)

    if (!product) {
      notFound()
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <ProductDetail product={product} />
      </div>
    )
  } catch (error) {
    console.error("Error loading product:", error)
    notFound()
  }
}
