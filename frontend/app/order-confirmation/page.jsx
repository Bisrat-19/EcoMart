import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function OrderConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="mx-auto mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
          <div className="space-y-4">
            <p className="text-sm">
              Order #: <span className="font-mono">ORD-{Date.now()}</span>
            </p>
            <Link href="/">
              <Button className="w-full">Continue Shopping</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
