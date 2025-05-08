"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { WarrantyPopup } from "@/components/warranty-popup"

export function WarrantyPopupDemo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="max-w-md text-center mb-4">
        <p className="text-sm text-slate-600">
          Click the button below to see how the warranty registration popup appears to customers after purchase
        </p>
      </div>

      <Button size="lg" onClick={() => setIsOpen(true)} className="bg-emerald-600 hover:bg-emerald-700">
        Open Warranty Registration Popup
      </Button>

      {isOpen && (
        <WarrantyPopup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          merchantLogo="/placeholder.svg?height=60&width=180"
          primaryColor="#10b981"
        />
      )}
    </div>
  )
}
