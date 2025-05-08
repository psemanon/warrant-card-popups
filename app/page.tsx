import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { WarrantyPopupDemo } from "@/components/warranty-popup-demo"
import { MerchantDashboardPreview } from "@/components/merchant-dashboard-preview"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Aftersales Warranty Registration System
          </h1>
          <p className="mt-2 text-slate-600">
            A complete solution for e-commerce merchants to offer extended warranty registrations
          </p>
        </div>

        <Tabs defaultValue="customer" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="customer">Customer Popup</TabsTrigger>
            <TabsTrigger value="merchant">Merchant Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="customer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Warranty Registration Popup</CardTitle>
                <CardDescription>
                  Multi-step popup for customers to register their product warranty after purchase
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center p-6">
                <WarrantyPopupDemo />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="merchant" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Merchant Admin Dashboard</CardTitle>
                <CardDescription>
                  Manage warranty registrations, customize branding, and approve requests
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <MerchantDashboardPreview />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-center gap-4">
          <Button asChild>
            <Link href="/customer-demo">Try Customer Demo</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/merchant">Merchant Portal</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
