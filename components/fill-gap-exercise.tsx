"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react"

interface FillGapExerciseProps {
  onNext: () => void
  onBack?: () => void
}

export function FillGapExercise({ onNext, onBack }: FillGapExerciseProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const question = {
    sentence: ["HELLO", "_____"],
    options: ["YOU", "WELCOME", "FINE"],
    correctAnswer: "YOU",
    translation: "Hello, you!",
  }

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    const correct = answer === question.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
  }

  const handleNext = () => {
    if (showResult) {
      onNext()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {onBack && (
          <div className="mb-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        )}

        {/* Progress */}
        <div className="mb-8">
          <Progress value={75} className="h-2" />
        </div>

        <Card className="p-8 text-center space-y-6">
          {/* Question */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Fill in the gap!</h2>

            {/* Sentence with gap */}
            <div className="flex items-center justify-center gap-3 text-2xl font-bold">
              <span className="text-foreground">{question.sentence[0]}</span>
              <div className="min-w-[100px] h-12 border-2 border-dashed border-muted-foreground rounded-lg flex items-center justify-center bg-muted">
                {selectedAnswer && (
                  <span
                    className={`font-bold ${showResult ? (isCorrect ? "text-green-600" : "text-red-600") : "text-foreground"}`}
                  >
                    {selectedAnswer}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Answer Options */}
          {!showResult && (
            <div className="grid grid-cols-1 gap-3">
              {question.options.map((option, index) => (
                <Button
                  key={option}
                  variant="outline"
                  size="lg"
                  className="h-12 text-lg font-semibold bg-transparent"
                  onClick={() => handleAnswerSelect(option)}
                >
                  <span className="mr-2 text-muted-foreground">{index + 1}</span>
                  {option}
                </Button>
              ))}
            </div>
          )}

          {/* Result */}
          {showResult && (
            <div className="space-y-4">
              <div
                className={`flex items-center justify-center gap-2 text-lg font-semibold ${
                  isCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    Correct!
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6" />
                    Incorrect!
                  </>
                )}
              </div>

              {isCorrect && <p className="text-muted-foreground">English translation: "{question.translation}"</p>}

              <Button size="lg" className="w-full bg-primary hover:bg-primary/90" onClick={handleNext}>
                Next
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
