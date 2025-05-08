"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LogOut, Menu, X } from "lucide-react"
import { MerchantDashboardPreview } from "@/components/merchant-dashboard-preview"

type MerchantDashboardProps = {
  onLogout: () => void
}

export function MerchantDashboard({ onLogout }: MerchantDashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Mobile header */}
      <div className="flex items-center justify-between border-b bg-white p-4 md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
        <div className="font-medium">Warranty Dashboard</div>
        <Button variant="ghost" size="icon" onClick={onLogout}>
          <LogOut size={20} />
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`${isSidebarOpen ? "block" : "hidden"} w-full border-r bg-white md:block md:w-64`}>
        <div className="flex h-16 items-center border-b px-6">
          <h1 className="text-lg font-bold">Warranty Manager</h1>
        </div>

        <div className="p-4">
          <nav className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800"
            >
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Warranty Requests
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Upload Orders
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Help & Support
            </Button>
          </nav>
        </div>

        <div className="absolute bottom-0 w-full border-t p-4 md:w-64">
          <div className="mb-2 flex items-center">
            <div className="mr-2 h-8 w-8 rounded-full bg-emerald-100 text-center text-emerald-800">
              <span className="leading-8">M</span>
            </div>
            <div>
              <div className="text-sm font-medium">Merchant Demo</div>
              <div className="text-xs text-gray-500">demo@example.com</div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-50">
        <div className="hidden items-center justify-between border-b bg-white p-4 md:flex">
          <h2 className="text-lg font-medium">Warranty Registration Dashboard</h2>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">
              Back to Home
            </Link>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="p-4">
          <MerchantDashboardPreview />
        </div>
      </div>
    </div>
  )
}
