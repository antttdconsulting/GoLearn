"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface LearningGoal {
  id: string
  label: string
  duration: string
}

const goals: LearningGoal[] = [
  { id: "5min", label: "5 min", duration: "5 minutes" },
  { id: "10min", label: "10 min", duration: "10 minutes" },
  { id: "15min", label: "15 min", duration: "15 minutes" },
  { id: "20min", label: "20 min", duration: "20 minutes" },
]

interface LearningGoalsProps {
  onNext: (selectedGoal: string) => void
}

export function LearningGoals({ onNext }: LearningGoalsProps) {
  const [selectedGoal, setSelectedGoal] = useState<string>("10min")

  const handleNext = () => {
    onNext(selectedGoal)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
        <div className="p-8 space-y-8">
          {/* Progress Indicator */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">2/6</div>
            <div className="flex space-x-1">
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
            </div>
          </div>

          {/* Question */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground text-balance leading-tight">
              What is your daily learning goal?
            </h1>
          </div>

          {/* Goal Options */}
          <div className="space-y-3">
            {goals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                className={cn(
                  "w-full p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
                  "flex items-center justify-between text-left",
                  selectedGoal === goal.id
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-background hover:border-primary/50",
                )}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-accent">{goal.label}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{goal.duration}</div>
                    <div className="text-sm text-muted-foreground">Daily practice</div>
                  </div>
                </div>
                {selectedGoal === goal.id && (
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
