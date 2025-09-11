"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface LessonResultsProps {
  score: number
  onContinue: () => void
  onRetake: () => void
}

export function LessonResults({ score, onContinue, onRetake }: LessonResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getEncouragement = (score: number) => {
    if (score >= 90) return "Excellent work!"
    if (score >= 70) return "Great job!"
    return "Keep practicing!"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center space-y-6">
        {/* Score */}
        <div className="space-y-2">
          <div className={`text-6xl font-bold ${getScoreColor(score)}`}>{score}%</div>
          <h2 className="text-2xl font-semibold text-foreground">{getEncouragement(score)}</h2>
          <p className="text-muted-foreground">You completed the lesson.</p>
        </div>

        {/* Mascot Illustration */}
        <div className="py-8">
          <div className="w-32 h-32 mx-auto bg-primary rounded-full flex items-center justify-center shadow-lg">
            <div className="text-4xl">🐦</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button size="lg" className="w-full bg-primary hover:bg-primary/90" onClick={onContinue}>
            Continue
          </Button>

          <Button variant="outline" size="lg" className="w-full bg-transparent" onClick={onRetake}>
            Retake lesson
          </Button>
        </div>
      </Card>
    </div>
  )
}
