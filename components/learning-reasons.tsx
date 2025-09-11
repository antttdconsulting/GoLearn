"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, Check, Heart, Briefcase, Users, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface LearningReason {
  id: string
  label: string
  icon: React.ReactNode
  description: string
}

const reasons: LearningReason[] = [
  {
    id: "fun",
    label: "Just For Fun",
    icon: <Heart className="w-6 h-6" />,
    description: "Personal interest and enjoyment",
  },
  {
    id: "work",
    label: "Work Or Business",
    icon: <Briefcase className="w-6 h-6" />,
    description: "Professional development",
  },
  {
    id: "friends",
    label: "Friends",
    icon: <Users className="w-6 h-6" />,
    description: "Communicate with friends",
  },
  {
    id: "family",
    label: "Family",
    icon: <Home className="w-6 h-6" />,
    description: "Connect with family members",
  },
]

interface LearningReasonsProps {
  onNext: (selectedReasons: string[]) => void
}

export function LearningReasons({ onNext }: LearningReasonsProps) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([])

  const toggleReason = (reasonId: string) => {
    setSelectedReasons((prev) => (prev.includes(reasonId) ? prev.filter((id) => id !== reasonId) : [...prev, reasonId]))
  }

  const handleNext = () => {
    onNext(selectedReasons)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
        <div className="p-8 space-y-8">
          {/* Progress Indicator */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">3/6</div>
            <div className="flex space-x-1">
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
            </div>
          </div>

          {/* Question */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground text-balance leading-tight">
              Why would you like to learn British Sign Language?
            </h1>
          </div>

          {/* Reason Options */}
          <div className="space-y-3">
            {reasons.map((reason) => (
              <button
                key={reason.id}
                onClick={() => toggleReason(reason.id)}
                className={cn(
                  "w-full p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
                  "flex items-center justify-between text-left",
                  selectedReasons.includes(reason.id)
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-background hover:border-primary/50",
                )}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                      selectedReasons.includes(reason.id)
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent/10 text-accent",
                    )}
                  >
                    {reason.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{reason.label}</div>
                    <div className="text-sm text-muted-foreground">{reason.description}</div>
                  </div>
                </div>
                {selectedReasons.includes(reason.id) && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <Button
            onClick={handleNext}
            disabled={selectedReasons.length === 0}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:scale-100 disabled:hover:scale-100"
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
