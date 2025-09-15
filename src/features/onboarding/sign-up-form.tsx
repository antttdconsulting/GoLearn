"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../../shared/ui/button"
import { Card } from "../../shared/ui/card"
import { Input } from "../../shared/ui/input"
import { Label } from "../../shared/ui/label"
import { Checkbox } from "../../shared/ui/checkbox"
import { Eye, EyeOff, Info, CheckCircle } from "lucide-react"
import { cn } from "../../lib/utils"

interface SignUpFormProps {
  onComplete: (userData: { email: string; firstName: string; password: string }) => void
  onBack?: () => void
}

export function SignUpForm({ onComplete, onBack: _onBack }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.firstName) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!acceptedTerms) {
      newErrors.terms = "Please accept the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onComplete(formData)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const isPasswordValid = formData.password.length >= 6
  const isFormValid = formData.email && formData.firstName && isPasswordValid && acceptedTerms

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
        <div className="p-6 pb-24 space-y-8">
          {/* Progress Indicator */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">6/6</div>
            <div className="flex space-x-1">
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-primary rounded-full"></div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground text-balance leading-tight">
              Đăng ký miễn phí và bắt đầu học!
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("email", e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border-2 transition-colors",
                  errors.email ? "border-destructive" : "border-border focus:border-primary",
                )}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            {/* First Name Field */}
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
                Tên của bạn
              </Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("firstName", e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border-2 transition-colors",
                  errors.firstName ? "border-destructive" : "border-border focus:border-primary",
                )}
                placeholder="Enter your first name"
              />
              {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Mật khẩu
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("password", e.target.value)}
                  className={cn(
                    "w-full px-4 py-3 pr-12 rounded-xl border-2 transition-colors",
                    errors.password ? "border-destructive" : "border-border focus:border-primary",
                  )}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                {isPasswordValid ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Info className="w-4 h-4 text-muted-foreground" />
                )}
                <span className={cn("text-sm", isPasswordValid ? "text-green-500" : "text-muted-foreground")}>
                  Tối thiểu 6 ký tự
                </span>
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked: boolean) => {
                    setAcceptedTerms(checked as boolean)
                    if (errors.terms) {
                      setErrors((prev) => ({ ...prev, terms: "" }))
                    }
                  }}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  Bằng việc đăng ký, bạn đồng ý với
                  <button type="button" className="text-primary hover:underline"> Điều khoản </button>
                  và
                  <button type="button" className="text-primary hover:underline"> Chính sách bảo mật</button>.
                </Label>
              </div>
              {errors.terms && <p className="text-sm text-destructive">{errors.terms}</p>}
            </div>

            {/* Submit Button */}
            <div className="hidden" aria-hidden>
              <Button type="submit" />
            </div>
          </form>
        </div>
        <div className="sticky bottom-0 inset-x-0 p-4 bg-card/80 backdrop-blur-sm border-t border-border/50">
          <div className="flex gap-3">
            <Button variant="outline" className="w-1/3" disabled>
              Back
            </Button>
            <Button type="submit" formAction="submit" onClick={handleSubmit as unknown as any} disabled={!isFormValid} className="flex-1">
              Đăng ký
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
