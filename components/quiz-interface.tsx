"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, Check, X, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuizOption {
  id: string
  label: string
  isCorrect: boolean
}

const quizOptions: QuizOption[] = [
  { id: "hello", label: "HELLO", isCorrect: true },
  { id: "welcome", label: "WELCOME", isCorrect: false },
]

interface QuizInterfaceProps {
  onNext: () => void
  onBack?: () => void
}

export function QuizInterface({ onNext, onBack }: QuizInterfaceProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleAnswerSelect = (optionId: string) => {
    if (showResult) return

    setSelectedAnswer(optionId)
    const selected = quizOptions.find((opt) => opt.id === optionId)
    setIsCorrect(selected?.isCorrect || false)
    setShowResult(true)
  }

  const handleNext = () => {
    if (isCorrect) {
      onNext()
    } else {
      // Reset for another try
      setSelectedAnswer("")
      setShowResult(false)
      setIsCorrect(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
        <div className="p-8 space-y-8">
          {onBack && (
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
          )}

          {/* Progress Indicator */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Quiz</div>
            <div className="flex space-x-1">
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
            </div>
          </div>

          {/* Question */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground text-balance leading-tight mb-6">
              Choose the correct sign!
            </h1>

            {/* Video Area */}
            <div className="w-full h-48 bg-muted/30 rounded-2xl border-2 border-dashed border-border flex items-center justify-center mb-6">
              <div className="text-center space-y-2">
                <div className="text-4xl">👋</div>
                <p className="text-sm text-muted-foreground">Sign demonstration</p>
              </div>
            </div>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {quizOptions.map((option, index) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                disabled={showResult}
                className={cn(
                  "w-full p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
                  "flex items-center justify-between text-left",
                  !showResult && "hover:border-primary/50",
                  selectedAnswer === option.id && showResult
                    ? option.isCorrect
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : selectedAnswer === option.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background",
                  showResult && "cursor-not-allowed",
                )}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-accent">{index + 1}</span>
                  </div>
                  <div className="font-semibold text-foreground">{option.label}</div>
                </div>
                {showResult && selectedAnswer === option.id && (
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center",
                      option.isCorrect ? "bg-green-500" : "bg-red-500",
                    )}
                  >
                    {option.isCorrect ? <Check className="w-4 h-4 text-white" /> : <X className="w-4 h-4 text-white" />}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Result Message */}
          {showResult && (
            <div
              className={cn(
                "text-center p-4 rounded-xl",
                isCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700",
              )}
            >
              {isCorrect ? "Correct! Well done!" : "Not quite right. Try again!"}
            </div>
          )}

          {/* Next Button */}
          <Button
            onClick={handleNext}
            disabled={!showResult}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:scale-100 disabled:hover:scale-100"
            size="lg"
          >
            {isCorrect ? "Continue" : "Try Again"}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
