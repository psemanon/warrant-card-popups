"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { WarrantyPopup } from "@/components/warranty-popup"
import Image from "next/image"
import Link from "next/link"

export default function CustomerDemo() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">
            &larr; Back to Home
          </Link>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Customer Demo: Post-Purchase Experience
          </h1>
          <p className="mt-2 text-slate-600">This simulates the customer experience after completing a purchase</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Confirmation</CardTitle>
              <CardDescription>Your order has been successfully placed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Order #ORD-12350</h3>
                      <p className="text-sm text-slate-500">May 8, 2023</p>
                    </div>
                    <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
                      Confirmed
                    </div>
                  </div>

                  <div className="mt-4 flex items-center space-x-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src="/placeholder.svg?height=64&width=64"
                        alt="Product image"
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Premium Blender X200</h4>
                      <p className="text-xs text-slate-500">Color: Silver</p>
                      <p className="text-xs text-slate-500">Quantity: 1</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">$199.99</p>
                    </div>
                  </div>

                  <div className="mt-4 border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <p>Subtotal</p>
                      <p>$199.99</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p>Shipping</p>
                      <p>$9.99</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p>Tax</p>
                      <p>$20.00</p>
                    </div>
                    <div className="mt-2 flex justify-between font-medium">
                      <p>Total</p>
                      <p>$229.98</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                  <h3 className="font-medium text-emerald-800">Register for Extended Warranty</h3>
                  <p className="mt-1 text-sm text-emerald-700">
                    Your product comes with a standard 1-year warranty. Register now to get an additional 1-year
                    warranty for free!
                  </p>
                  <Button className="mt-3 bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsPopupOpen(true)}>
                    Register Warranty
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">View Order Details</Button>
              <Button variant="outline">Track Shipment</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>The warranty registration process explained</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium">Register Your Product</h3>
                    <p className="text-sm text-slate-500">
                      Click the "Register Warranty" button and fill in your order details in the popup form.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">Verify Your Email</h3>
                    <p className="text-sm text-slate-500">
                      After submission, you'll receive a verification email. Click the link to confirm your
                      registration.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Enjoy Extended Warranty</h3>
                    <p className="text-sm text-slate-500">
                      Once verified, your product will be covered with an additional 1-year warranty at no extra cost.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <h3 className="font-medium">Why Register?</h3>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600">
                    <li>Double your warranty coverage from 1 to 2 years</li>
                    <li>Faster support and service for registered products</li>
                    <li>Receive product updates and maintenance tips</li>
                    <li>No additional cost - completely free benefit</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsPopupOpen(true)}>
                Register Your Warranty Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {isPopupOpen && (
        <WarrantyPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          merchantLogo="/placeholder.svg?height=60&width=180"
          primaryColor="#10b981"
        />
      )}
    </main>
  )
}
