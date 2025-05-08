"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, Check, X, Search, Filter, Clock, CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type WarrantyRequest = {
  id: string
  orderId: string
  customerName: string
  email: string
  productName: string
  submittedAt: string
  status: "pending" | "verified" | "approved" | "rejected"
}

const mockRequests: WarrantyRequest[] = [
  {
    id: "WR-001",
    orderId: "ORD-12345",
    customerName: "John Smith",
    email: "john.smith@example.com",
    productName: "Premium Blender X200",
    submittedAt: "2023-05-07T14:30:00Z",
    status: "verified",
  },
  {
    id: "WR-002",
    orderId: "ORD-12346",
    customerName: "Emily Johnson",
    email: "emily.j@example.com",
    productName: "Coffee Maker Pro",
    submittedAt: "2023-05-07T15:45:00Z",
    status: "pending",
  },
  {
    id: "WR-003",
    orderId: "ORD-12347",
    customerName: "Michael Chen",
    email: "m.chen@example.com",
    productName: "Smart Toaster T100",
    submittedAt: "2023-05-06T09:15:00Z",
    status: "approved",
  },
  {
    id: "WR-004",
    orderId: "ORD-12348",
    customerName: "Sarah Williams",
    email: "s.williams@example.com",
    productName: "Air Purifier Max",
    submittedAt: "2023-05-06T11:20:00Z",
    status: "rejected",
  },
  {
    id: "WR-005",
    orderId: "ORD-12349",
    customerName: "David Lee",
    email: "david.lee@example.com",
    productName: "Premium Blender X200",
    submittedAt: "2023-05-05T16:10:00Z",
    status: "verified",
  },
]

export function MerchantDashboardPreview() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [selectedRequests, setSelectedRequests] = useState<string[]>([])
  const [primaryColor, setPrimaryColor] = useState("#10b981")
  const [logoUrl, setLogoUrl] = useState("/placeholder.svg?height=60&width=180")
  const [filter, setFilter] = useState("all")

  const filteredRequests = filter === "all" ? mockRequests : mockRequests.filter((req) => req.status === filter)

  const handleSelectAll = () => {
    if (selectedRequests.length === filteredRequests.length) {
      setSelectedRequests([])
    } else {
      setSelectedRequests(filteredRequests.map((req) => req.id))
    }
  }

  const handleSelectRequest = (id: string) => {
    if (selectedRequests.includes(id)) {
      setSelectedRequests(selectedRequests.filter((reqId) => reqId !== id))
    } else {
      setSelectedRequests([...selectedRequests, id])
    }
  }

  const handleApprove = () => {
    // In a real implementation, this would update the status in the database
    alert(
      language === "en" ? `Approved ${selectedRequests.length} requests` : `已批准 ${selectedRequests.length} 个请求`,
    )
    setSelectedRequests([])
  }

  const handleReject = () => {
    // In a real implementation, this would update the status in the database
    alert(
      language === "en" ? `Rejected ${selectedRequests.length} requests` : `已拒绝 ${selectedRequests.length} 个请求`,
    )
    setSelectedRequests([])
  }

  const content = {
    en: {
      tabs: {
        requests: "Warranty Requests",
        settings: "Branding Settings",
        upload: "Upload Orders",
      },
      requests: {
        title: "Warranty Registration Requests",
        search: "Search requests...",
        filter: "Filter",
        filterOptions: {
          all: "All Requests",
          pending: "Pending",
          verified: "Verified",
          approved: "Approved",
          rejected: "Rejected",
        },
        table: {
          id: "ID",
          orderId: "Order ID",
          customer: "Customer",
          product: "Product",
          submitted: "Submitted",
          status: "Status",
          actions: "Actions",
        },
        status: {
          pending: "Pending",
          verified: "Verified",
          approved: "Approved",
          rejected: "Rejected",
        },
        buttons: {
          approve: "Approve Selected",
          reject: "Reject Selected",
        },
      },
      settings: {
        title: "Branding Settings",
        subtitle: "Customize the appearance of your warranty registration popup",
        logoTitle: "Store Logo",
        logoSubtitle: "Upload your store logo (recommended size: 180x60px)",
        logoUpload: "Upload Logo",
        colorTitle: "Primary Color",
        colorSubtitle: "Choose the main color for your popup",
        languageTitle: "Default Language",
        languageSubtitle: "Select the default language for your popup",
        languages: {
          en: "English",
          zh: "Chinese",
        },
        saveButton: "Save Settings",
      },
      upload: {
        title: "Upload Order List",
        subtitle: "Upload an Excel file with your order data to pre-populate the system",
        fileTitle: "Excel File",
        fileSubtitle: "Upload an Excel file (.xlsx) containing your order data",
        fileUpload: "Upload File",
        templateTitle: "File Template",
        templateSubtitle: "Your Excel file should include these columns:",
        columns: [
          "Order ID (required)",
          "Customer Name (required)",
          "Email (required)",
          "Product Name (required)",
          "Product ID (optional)",
          "Purchase Date (optional)",
        ],
        uploadButton: "Upload Orders",
      },
    },
    zh: {
      tabs: {
        requests: "保修请求",
        settings: "品牌设置",
        upload: "上传订单",
      },
      requests: {
        title: "保修注册请求",
        search: "搜索请求...",
        filter: "筛选",
        filterOptions: {
          all: "所有请求",
          pending: "待处理",
          verified: "已验证",
          approved: "已批准",
          rejected: "已拒绝",
        },
        table: {
          id: "ID",
          orderId: "订单号",
          customer: "客户",
          product: "产品",
          submitted: "提交时间",
          status: "状态",
          actions: "操作",
        },
        status: {
          pending: "待处理",
          verified: "已验证",
          approved: "已批准",
          rejected: "已拒绝",
        },
        buttons: {
          approve: "批准所选",
          reject: "拒绝所选",
        },
      },
      settings: {
        title: "品牌设置",
        subtitle: "自定义您的保修注册弹窗外观",
        logoTitle: "商店标志",
        logoSubtitle: "上传您的商店标志（推荐尺寸：180x60px）",
        logoUpload: "上传标志",
        colorTitle: "主要颜色",
        colorSubtitle: "选择您弹窗的主要颜色",
        languageTitle: "默认语言",
        languageSubtitle: "选择您弹窗的默认语言",
        languages: {
          en: "英语",
          zh: "中文",
        },
        saveButton: "保存设置",
      },
      upload: {
        title: "上传订单列表",
        subtitle: "上传包含订单数据的Excel文件以预填充系统",
        fileTitle: "Excel文件",
        fileSubtitle: "上传包含订单数据的Excel文件（.xlsx）",
        fileUpload: "上传文件",
        templateTitle: "文件模板",
        templateSubtitle: "您的Excel文件应包含以下列：",
        columns: [
          "订单号（必填）",
          "客户姓名（必填）",
          "电子邮箱（必填）",
          "产品名称（必填）",
          "产品ID（可选）",
          "购买日期（可选）",
        ],
        uploadButton: "上传订单",
      },
    },
  }

  const currentContent = language === "en" ? content.en : content.zh

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "verified":
        return "bg-blue-100 text-blue-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="mr-1 h-3 w-3" />
      case "verified":
        return <Check className="mr-1 h-3 w-3" />
      case "approved":
        return <CheckCircle className="mr-1 h-3 w-3" />
      case "rejected":
        return <XCircle className="mr-1 h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-[600px] flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-xl font-bold">{language === "en" ? "Merchant Dashboard" : "商家仪表板"}</h2>
        <Select value={language} onValueChange={(value) => setLanguage(value as "en" | "zh")}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="zh">中文</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="requests" className="flex-1">
        <TabsList className="mx-4 mt-4 grid w-[400px] grid-cols-3">
          <TabsTrigger value="requests">{currentContent.tabs.requests}</TabsTrigger>
          <TabsTrigger value="settings">{currentContent.tabs.settings}</TabsTrigger>
          <TabsTrigger value="upload">{currentContent.tabs.upload}</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="flex-1 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">{currentContent.requests.title}</h3>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder={currentContent.requests.search} className="pl-8" />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[160px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>{currentContent.requests.filter}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{currentContent.requests.filterOptions.all}</SelectItem>
                  <SelectItem value="pending">{currentContent.requests.filterOptions.pending}</SelectItem>
                  <SelectItem value="verified">{currentContent.requests.filterOptions.verified}</SelectItem>
                  <SelectItem value="approved">{currentContent.requests.filterOptions.approved}</SelectItem>
                  <SelectItem value="rejected">{currentContent.requests.filterOptions.rejected}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {selectedRequests.length} {language === "en" ? "selected" : "已选择"}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReject}
                disabled={selectedRequests.length === 0}
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <X className="mr-1 h-4 w-4" />
                {currentContent.requests.buttons.reject}
              </Button>
              <Button
                size="sm"
                onClick={handleApprove}
                disabled={selectedRequests.length === 0}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Check className="mr-1 h-4 w-4" />
                {currentContent.requests.buttons.approve}
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={selectedRequests.length === filteredRequests.length && filteredRequests.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>{currentContent.requests.table.id}</TableHead>
                  <TableHead>{currentContent.requests.table.orderId}</TableHead>
                  <TableHead>{currentContent.requests.table.customer}</TableHead>
                  <TableHead>{currentContent.requests.table.product}</TableHead>
                  <TableHead>{currentContent.requests.table.submitted}</TableHead>
                  <TableHead>{currentContent.requests.table.status}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRequests.includes(request.id)}
                        onCheckedChange={() => handleSelectRequest(request.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.orderId}</TableCell>
                    <TableCell>
                      <div>
                        <div>{request.customerName}</div>
                        <div className="text-xs text-gray-500">{request.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{request.productName}</TableCell>
                    <TableCell>{new Date(request.submittedAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                          getStatusBadgeClass(request.status),
                        )}
                      >
                        {getStatusIcon(request.status)}
                        {currentContent.requests.status[request.status as keyof typeof currentContent.requests.status]}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="p-4">
          <div className="max-w-2xl space-y-6">
            <div>
              <h3 className="text-lg font-medium">{currentContent.settings.title}</h3>
              <p className="text-sm text-gray-500">{currentContent.settings.subtitle}</p>
            </div>

            <div className="space-y-4 rounded-md border p-4">
              <div>
                <h4 className="font-medium">{currentContent.settings.logoTitle}</h4>
                <p className="text-sm text-gray-500">{currentContent.settings.logoSubtitle}</p>

                <div className="mt-2 flex items-center space-x-4">
                  <div className="h-16 w-40 overflow-hidden rounded border bg-gray-50 p-2">
                    <img
                      src={logoUrl || "/placeholder.svg"}
                      alt="Store logo"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-1 h-4 w-4" />
                    {currentContent.settings.logoUpload}
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium">{currentContent.settings.colorTitle}</h4>
                <p className="text-sm text-gray-500">{currentContent.settings.colorSubtitle}</p>

                <div className="mt-2 flex items-center space-x-4">
                  <div className="h-8 w-8 rounded-full border" style={{ backgroundColor: primaryColor }}></div>
                  <Input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-16 p-1"
                  />
                  <Input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-32"
                  />
                </div>
              </div>

              <div>
                <h4 className="font-medium">{currentContent.settings.languageTitle}</h4>
                <p className="text-sm text-gray-500">{currentContent.settings.languageSubtitle}</p>

                <div className="mt-2">
                  <Select defaultValue="en">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">{currentContent.settings.languages.en}</SelectItem>
                      <SelectItem value="zh">{currentContent.settings.languages.zh}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button className="bg-emerald-600 hover:bg-emerald-700">{currentContent.settings.saveButton}</Button>
          </div>
        </TabsContent>

        <TabsContent value="upload" className="p-4">
          <div className="max-w-2xl space-y-6">
            <div>
              <h3 className="text-lg font-medium">{currentContent.upload.title}</h3>
              <p className="text-sm text-gray-500">{currentContent.upload.subtitle}</p>
            </div>

            <div className="space-y-4 rounded-md border p-4">
              <div>
                <h4 className="font-medium">{currentContent.upload.fileTitle}</h4>
                <p className="text-sm text-gray-500">{currentContent.upload.fileSubtitle}</p>

                <div className="mt-4 flex flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-6">
                  <div className="mb-2 rounded-full bg-gray-100 p-2">
                    <Upload className="h-6 w-6 text-gray-500" />
                  </div>
                  <p className="mb-1 text-sm font-medium">
                    {language === "en" ? "Drag and drop your file here" : "拖放您的文件到这里"}
                  </p>
                  <p className="mb-4 text-xs text-gray-500">{language === "en" ? "or" : "或"}</p>
                  <Button variant="outline" size="sm">
                    {currentContent.upload.fileUpload}
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium">{currentContent.upload.templateTitle}</h4>
                <p className="text-sm text-gray-500">{currentContent.upload.templateSubtitle}</p>

                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                  {currentContent.upload.columns.map((column, index) => (
                    <li key={index}>{column}</li>
                  ))}
                </ul>
              </div>
            </div>

            <Button className="bg-emerald-600 hover:bg-emerald-700">{currentContent.upload.uploadButton}</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
