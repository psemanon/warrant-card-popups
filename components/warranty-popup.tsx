"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import Image from "next/image"

type WarrantyPopupProps = {
  isOpen: boolean
  onClose: () => void
  merchantLogo: string
  primaryColor: string
}

type FormData = {
  orderId: string
  name: string
  email: string
}

export function WarrantyPopup({ isOpen, onClose, merchantLogo, primaryColor }: WarrantyPopupProps) {
  const [step, setStep] = useState(1)
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [formData, setFormData] = useState<FormData>({
    orderId: "",
    name: "",
    email: "",
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [orderExists, setOrderExists] = useState<boolean | null>(null)

  // Simulate checking if order exists in merchant database
  useEffect(() => {
    if (step === 1 && formData.orderId) {
      // For demo purposes, assume orders with even numbers exist in the system
      setOrderExists(formData.orderId.length > 0 && Number.parseInt(formData.orderId) % 2 === 0)
    }
  }, [formData.orderId, step])

  const validateStep1 = () => {
    const newErrors: Partial<FormData> = {}

    if (!formData.orderId.trim()) {
      newErrors.orderId = language === "en" ? "Order ID is required" : "订单号为必填项"
    }

    if (!formData.name.trim()) {
      newErrors.name = language === "en" ? "Name is required" : "姓名为必填项"
    }

    if (!formData.email.trim()) {
      newErrors.email = language === "en" ? "Email is required" : "邮箱为必填项"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === "en" ? "Email is invalid" : "邮箱格式无效"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2)
      }
    } else if (step === 2) {
      // In a real implementation, this would be handled by clicking the verification link
      // For demo purposes, we'll just advance to step 3
      setStep(3)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  // Content based on language and step
  const content = {
    en: {
      step1: {
        title: "Register for Extended Warranty",
        subtitle: "Complete these 3 simple steps to activate your bonus 1-year warranty extension!",
        orderIdLabel: "Order ID",
        orderIdPlaceholder: "Enter your order ID",
        nameLabel: "Full Name",
        namePlaceholder: "Enter your name as on order",
        emailLabel: "Email Address",
        emailPlaceholder: "Enter your email address",
        submitButton: "Register Now",
        steps: ["Enter your order details", "Verify your email", "Enjoy extended warranty"],
      },
      step2: {
        title: "Registration Submitted!",
        subtitle: orderExists
          ? "We've sent a verification link to your email. Please check your inbox and click the link to complete your warranty activation."
          : "Thank you for your submission. Since your order needs verification, please allow several days for processing. You'll receive a verification email once approved.",
        emailSentTo: "Email sent to:",
        checkSpam: "If you don't see it, please check your spam folder.",
        nextSteps: "What's next?",
        nextStepsText: orderExists
          ? "Click the verification link in your email to instantly activate your extended warranty."
          : "Wait for our team to verify your order details. Once approved, you'll receive an email with a verification link.",
        closeButton: "Close Window",
      },
      step3: {
        title: "Congratulations!",
        subtitle: "Your extended warranty has been successfully activated.",
        details: "Your product is now covered with an additional 1-year warranty.",
        thankYou: "Thank you for choosing our products!",
        closeButton: "Close Window",
      },
    },
    zh: {
      step1: {
        title: "注册延长保修",
        subtitle: "完成这3个简单步骤，激活您的额外1年保修期！",
        orderIdLabel: "订单号",
        orderIdPlaceholder: "输入您的订单号",
        nameLabel: "姓名",
        namePlaceholder: "输入您订单上的姓名",
        emailLabel: "电子邮箱",
        emailPlaceholder: "输入您的电子邮箱",
        submitButton: "立即注册",
        steps: ["输入您的订单详情", "验证您的邮箱", "享受延长保修"],
      },
      step2: {
        title: "注册已提交！",
        subtitle: orderExists
          ? "我们已向您的邮箱发送了验证链接。请检查您的收件箱并点击链接完成保修激活。"
          : "感谢您的提交。由于您的订单需要验证，请等待几天进行处理。一旦批准，您将收到验证邮件。",
        emailSentTo: "邮件已发送至：",
        checkSpam: "如果您没有看到，请检查您的垃圾邮件文件夹。",
        nextSteps: "下一步是什么？",
        nextStepsText: orderExists
          ? "点击邮件中的验证链接，立即激活您的延长保修。"
          : "等待我们的团队验证您的订单详情。一旦批准，您将收到一封带有验证链接的邮件。",
        closeButton: "关闭窗口",
      },
      step3: {
        title: "恭喜！",
        subtitle: "您的延长保修已成功激活。",
        details: "您的产品现在享有额外1年的保修期。",
        thankYou: "感谢您选择我们的产品！",
        closeButton: "关闭窗口",
      },
    },
  }

  const currentContent = language === "en" ? content.en : content.zh

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
        style={{ borderTop: `4px solid ${primaryColor}` }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="mb-6 flex justify-between items-center">
          <div className="h-12 w-auto">
            <Image
              src={merchantLogo || "/placeholder.svg"}
              alt="Merchant logo"
              width={120}
              height={40}
              className="h-full w-auto object-contain"
            />
          </div>

          <RadioGroup
            value={language}
            onValueChange={(value) => setLanguage(value as "en" | "zh")}
            className="flex space-x-1"
          >
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="en" id="en" className="h-3.5 w-3.5" />
              <Label htmlFor="en" className="text-xs">
                EN
              </Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="zh" id="zh" className="h-3.5 w-3.5" />
              <Label htmlFor="zh" className="text-xs">
                中文
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                    step >= s ? `bg-[${primaryColor}] text-white` : "bg-gray-200 text-gray-500",
                  )}
                  style={{
                    backgroundColor: step >= s ? primaryColor : undefined,
                    color: step >= s ? "white" : undefined,
                  }}
                >
                  {s}
                </div>
                <span className="mt-1 text-xs text-gray-500">{currentContent.step1.steps[s - 1]}</span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 h-1 w-full bg-gray-200"></div>
            <div
              className="absolute top-0 h-1 bg-[#10b981] transition-all duration-300"
              style={{
                width: `${(step - 1) * 50}%`,
                backgroundColor: primaryColor,
              }}
            ></div>
          </div>
        </div>

        {/* Step content */}
        <div className="mb-6">
          {step === 1 && (
            <div>
              <h2 className="mb-2 text-xl font-bold">{currentContent.step1.title}</h2>
              <p className="mb-4 text-sm text-gray-600">{currentContent.step1.subtitle}</p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="orderId">{currentContent.step1.orderIdLabel}</Label>
                  <Input
                    id="orderId"
                    name="orderId"
                    placeholder={currentContent.step1.orderIdPlaceholder}
                    value={formData.orderId}
                    onChange={handleInputChange}
                    className={cn(errors.orderId && "border-red-500")}
                  />
                  {errors.orderId && <p className="mt-1 text-xs text-red-500">{errors.orderId}</p>}
                </div>

                <div>
                  <Label htmlFor="name">{currentContent.step1.nameLabel}</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={currentContent.step1.namePlaceholder}
                    value={formData.name}
                    onChange={handleInputChange}
                    className={cn(errors.name && "border-red-500")}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="email">{currentContent.step1.emailLabel}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={currentContent.step1.emailPlaceholder}
                    value={formData.email}
                    onChange={handleInputChange}
                    className={cn(errors.email && "border-red-500")}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              <h2 className="mb-2 text-xl font-bold">{currentContent.step2.title}</h2>
              <p className="mb-4 text-sm text-gray-600">{currentContent.step2.subtitle}</p>

              <div className="my-4 rounded-md bg-gray-50 p-3">
                <p className="text-sm font-medium text-gray-700">{currentContent.step2.emailSentTo}</p>
                <p className="text-sm font-bold">{formData.email}</p>
                <p className="mt-2 text-xs text-gray-500">{currentContent.step2.checkSpam}</p>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700">{currentContent.step2.nextSteps}</h3>
                <p className="text-sm text-gray-600">{currentContent.step2.nextStepsText}</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ backgroundColor: primaryColor }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <h2 className="mb-2 text-xl font-bold">{currentContent.step3.title}</h2>
              <p className="mb-2 text-sm text-gray-600">{currentContent.step3.subtitle}</p>
              <p className="mb-4 text-sm text-gray-600">{currentContent.step3.details}</p>
              <p className="font-medium" style={{ color: primaryColor }}>
                {currentContent.step3.thankYou}
              </p>
            </div>
          )}
        </div>

        {/* Footer buttons */}
        <div className="flex justify-center">
          {step === 1 ? (
            <Button
              onClick={handleSubmit}
              className="w-full"
              style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
            >
              {currentContent.step1.submitButton}
            </Button>
          ) : (
            <Button
              onClick={step === 2 ? handleSubmit : onClose}
              variant={step === 2 ? "default" : "outline"}
              className="w-full"
              style={step === 2 ? { backgroundColor: primaryColor, borderColor: primaryColor } : {}}
            >
              {step === 2
                ? language === "en"
                  ? "Simulate Email Verification"
                  : "模拟邮箱验证"
                : currentContent.step3.closeButton}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
