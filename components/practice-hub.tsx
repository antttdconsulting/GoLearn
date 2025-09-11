"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Target, Zap, BookOpen, Play, RotateCcw, Trophy, Star, Timer, Shuffle } from "lucide-react"
import { BottomNavigation } from "./bottom-navigation"

interface PracticeMode {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  difficulty: "easy" | "medium" | "hard"
  duration: string
  type: "flashcards" | "quiz" | "timed" | "review"
}

interface PracticeHubProps {
  onBack: () => void
  onStartPractice: (mode: string) => void
  onNavigate?: (section: string) => void
}

export function PracticeHub({ onBack, onStartPractice, onNavigate }: PracticeHubProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [practiceStats] = useState({
    totalPracticeTime: 45,
    signsReviewed: 23,
    accuracy: 87,
    streak: 5,
  })

  const practiceModes: PracticeMode[] = [
    {
      id: "flashcards",
      title: "Flashcards",
      description: "Review signs at your own pace with interactive flashcards",
      icon: <BookOpen className="w-6 h-6" />,
      difficulty: "easy",
      duration: "5-15 min",
      type: "flashcards",
    },
    {
      id: "quick-quiz",
      title: "Quick Quiz",
      description: "Test your knowledge with a short quiz",
      icon: <Zap className="w-6 h-6" />,
      difficulty: "medium",
      duration: "3-5 min",
      type: "quiz",
    },
    {
      id: "timed-challenge",
      title: "Timed Challenge",
      description: "Race against the clock to identify signs",
      icon: <Timer className="w-6 h-6" />,
      difficulty: "hard",
      duration: "2 min",
      type: "timed",
    },
    {
      id: "review-mistakes",
      title: "Review Mistakes",
      description: "Practice signs you've gotten wrong before",
      icon: <RotateCcw className="w-6 h-6" />,
      difficulty: "medium",
      duration: "5-10 min",
      type: "review",
    },
    {
      id: "random-practice",
      title: "Random Practice",
      description: "Mixed practice with random signs from all categories",
      icon: <Shuffle className="w-6 h-6" />,
      difficulty: "medium",
      duration: "10-20 min",
      type: "quiz",
    },
    {
      id: "mastery-test",
      title: "Mastery Test",
      description: "Comprehensive test of all learned signs",
      icon: <Trophy className="w-6 h-6" />,
      difficulty: "hard",
      duration: "15-25 min",
      type: "quiz",
    },
  ]

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "greetings", name: "Greetings" },
    { id: "courtesy", name: "Courtesy" },
    { id: "questions", name: "Questions" },
    { id: "family", name: "Family" },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "hard":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted pb-20">
      {/* Header */}
      <div className="bg-card border-b p-4">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Practice Hub</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Practice Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{practiceStats.totalPracticeTime}m</div>
                <div className="text-sm text-muted-foreground">Practice Time</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{practiceStats.signsReviewed}</div>
                <div className="text-sm text-muted-foreground">Signs Reviewed</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{practiceStats.accuracy}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{practiceStats.streak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Choose Category</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Practice Modes */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Practice Modes</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {practiceModes.map((mode) => (
              <Card
                key={mode.id}
                className="p-6 hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => onStartPractice(mode.id)}
              >
                <div className="space-y-4">
                  {/* Mode Icon and Title */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {mode.icon}
                    </div>
                    <Badge className={getDifficultyColor(mode.difficulty)}>{mode.difficulty}</Badge>
                  </div>

                  {/* Mode Info */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">{mode.title}</h3>
                    <p className="text-sm text-muted-foreground">{mode.description}</p>
                  </div>

                  {/* Duration and Start Button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {mode.duration}
                    </div>
                    <Button size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                      <Play className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Practice */}
        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Continue Recent Practice</h2>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Greetings Review</h3>
                <p className="text-sm text-muted-foreground">You were practicing basic greetings</p>
                <div className="flex items-center gap-2">
                  <Progress value={65} className="w-32 h-2" />
                  <span className="text-sm text-muted-foreground">65% complete</span>
                </div>
              </div>
              <Button onClick={() => onStartPractice("continue-greetings")}>
                <Play className="w-4 h-4 mr-2" />
                Continue
              </Button>
            </div>
          </Card>
        </div>

        {/* Daily Goal */}
        <Card className="mt-6 p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Daily Practice Goal</h3>
                <p className="text-sm text-muted-foreground">Keep up your learning streak!</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">8/15</div>
                <div className="text-sm text-muted-foreground">minutes</div>
              </div>
            </div>
            <Progress value={53} className="h-3" />
            <p className="text-sm text-muted-foreground">7 more minutes to reach your daily goal</p>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentSection="practice" onNavigate={onNavigate || (() => {})} />
    </div>
  )
}
