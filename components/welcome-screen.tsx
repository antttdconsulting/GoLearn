"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, Globe } from "lucide-react"

export function WelcomeScreen({ onNext }: { onNext?: () => void }) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleNext = () => {
    setIsAnimating(true)
    setTimeout(() => {
      onNext?.()
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
        <div className="p-8 text-center space-y-8">
          {/* App Logo/Brand */}
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
              <span className="text-2xl font-bold text-primary-foreground">SL</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">SignLearn</h1>
          </div>

          {/* Mascot Character */}
          <div className="relative">
            <div className={`transition-transform duration-500 ${isAnimating ? "scale-110" : "scale-100"}`}>
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center shadow-lg">
                <div className="text-6xl">🦜</div>
              </div>
            </div>

            {/* Floating globe */}
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-secondary rounded-full flex items-center justify-center shadow-md animate-bounce">
              <Globe className="w-6 h-6 text-secondary-foreground" />
            </div>
          </div>

          {/* Welcome Message */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground text-balance">Hi, I'm Mano!</h2>
            <p className="text-muted-foreground text-pretty leading-relaxed">
              Nice to meet you! Let's start your sign language journey together. I'll be here to guide you every step of
              the way.
            </p>
          </div>

          {/* Action Button */}
          <Button
            onClick={handleNext}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            size="lg"
          >
            Get Started
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>

          {/* Decorative Elements */}
          <div className="flex justify-center space-x-2 pt-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      </Card>
    </div>
  )
}
