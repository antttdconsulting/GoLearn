"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Flame } from "lucide-react"

interface StreakCelebrationProps {
  streakCount: number
  signsLearned: number
  onFinish: () => void
}

export function StreakCelebration({ streakCount, signsLearned, onFinish }: StreakCelebrationProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center space-y-6">
        {/* Streak Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
            <Flame className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-foreground">You're on a streak!</h1>

        {/* Achievement Text */}
        <div className="space-y-4 text-muted-foreground">
          <p>
            You've already discovered your first{" "}
            <span className="font-semibold text-foreground">{signsLearned} signs</span> in British Sign Language!
          </p>

          <p>
            The next session will be a special one. You will experience a short dialogue that shows you how to use the
            signs you've already learned in a real-life conversation!
          </p>
        </div>

        {/* Action Button */}
        <Button size="lg" className="w-full bg-primary hover:bg-primary/90 mt-8" onClick={onFinish}>
          Finish
        </Button>
      </Card>
    </div>
  )
}
