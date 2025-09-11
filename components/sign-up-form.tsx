"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Info, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface SignUpFormProps {
  onComplete: (userData: { email: string; firstName: string; password: string }) => void
}

export function SignUpForm({ onComplete }: SignUpFormProps) {
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
        <div className="p-8 space-y-8">
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
              Sign up for free and start learning!
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
                onChange={(e) => handleInputChange("email", e.target.value)}
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
                First name
              </Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
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
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
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
                  At least 6 characters
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
                  onCheckedChange={(checked) => {
                    setAcceptedTerms(checked as boolean)
                    if (errors.terms) {
                      setErrors((prev) => ({ ...prev, terms: "" }))
                    }
                  }}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  By signing up you accept our{" "}
                  <button type="button" className="text-primary hover:underline">
                    Terms and Conditions
                  </button>{" "}
                  and{" "}
                  <button type="button" className="text-primary hover:underline">
                    Privacy Policy
                  </button>
                  .
                </Label>
              </div>
              {errors.terms && <p className="text-sm text-destructive">{errors.terms}</p>}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid}
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:scale-100 disabled:hover:scale-100"
              size="lg"
            >
              Sign up
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
