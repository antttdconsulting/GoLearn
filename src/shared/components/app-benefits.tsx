"use client"

import type React from "react"

import { Button } from "../../shared/ui/button"
import { Card } from "../../shared/ui/card"
import { ChevronRight, GraduationCap, Users, Video } from "lucide-react"

interface Benefit {
  id: string
  icon: React.ReactNode
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    id: "teachers",
    icon: <GraduationCap className="w-8 h-8" />,
    title: "Expert Instruction",
    description: "Learn from Deaf teachers in more than 250 interactive BSL lessons.",
  },
  {
    id: "community",
    icon: <Users className="w-8 h-8" />,
    title: "Join the Community",
    description: "Connect with 3 million people learning sign language worldwide.",
  },
  {
    id: "interactive",
    icon: <Video className="w-8 h-8" />,
    title: "Interactive Learning",
    description: "Practice with video lessons and real-time feedback systems.",
  },
]

interface AppBenefitsProps {
  onNext: () => void
  onBack?: () => void
}

export function AppBenefits({ onNext, onBack: _onBack }: AppBenefitsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
        <div className="p-8 space-y-8">
          {/* Progress Indicator */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">4/6</div>
            <div className="flex space-x-1">
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground text-balance leading-tight">Here's how you benefit</h1>
          </div>

          {/* Benefits List */}
          <div className="space-y-6">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <div className="text-primary">{benefit.icon}</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <Button
            onClick={onNext}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            size="lg"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
