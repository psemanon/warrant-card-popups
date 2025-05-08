"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { MerchantDashboard } from "@/components/merchant-dashboard"

export default function MerchantPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    // For demo purposes, any valid-looking email and password will work
    if (email.includes("@") && password.length >= 6) {
      setIsLoggedIn(true)
      setError("")
    } else {
      setError("Invalid credentials. For demo, use any valid email and password (min 6 chars)")
    }
  }

  if (isLoggedIn) {
    return <MerchantDashboard onLogout={() => setIsLoggedIn(false)} />
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">
            &larr; Back to Home
          </Link>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Merchant Portal</h1>
          <p className="mt-2 text-slate-600">Access your warranty registration dashboard</p>
        </div>

        <div className="mx-auto max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Enter your credentials to access the merchant dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="phone">Phone</TabsTrigger>
                </TabsList>

                <TabsContent value="email">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="#" className="text-xs text-slate-500 hover:text-slate-900">
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>}

                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                      Sign In
                    </Button>

                    <div className="text-center text-xs text-slate-500">
                      <p>For demo purposes, use any valid email and password (min 6 chars)</p>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="phone">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                    </div>

                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Send Verification Code</Button>

                    <div className="text-center text-xs text-slate-500">
                      <p>Phone authentication is disabled in this demo</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="mt-4 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link href="#" className="font-medium text-emerald-600 hover:text-emerald-700">
              Contact sales
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
