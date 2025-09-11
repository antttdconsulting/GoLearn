"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp, Award, Flame } from "lucide-react"

interface ProgressAnalyticsProps {
  userStats: {
    totalXP: number
    currentStreak: number
    longestStreak: number
    lessonsCompleted: number
    totalLessons: number
    weeklyMinutes: number[]
    achievements: string[]
    currentLevel: number
  }
}

export function ProgressAnalytics({ userStats }: ProgressAnalyticsProps) {
  const progressPercentage = (userStats.lessonsCompleted / userStats.totalLessons) * 100
  const weeklyTotal = userStats.weeklyMinutes.reduce((sum, minutes) => sum + minutes, 0)
  const weeklyAverage = Math.round(weeklyTotal / 7)

  const achievements = [
    { id: "first-lesson", name: "First Steps", icon: "🎯", description: "Complete your first lesson" },
    { id: "week-streak", name: "Week Warrior", icon: "🔥", description: "7-day learning streak" },
    { id: "hundred-xp", name: "XP Hunter", icon: "⭐", description: "Earn 1000 XP" },
    { id: "chapter-one", name: "Greeting Master", icon: "👋", description: "Complete Chapter 1" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 pt-8">
          <h1 className="text-2xl font-bold text-foreground">Your Progress</h1>
          <p className="text-muted-foreground">Track your sign language learning journey</p>
        </div>

        {/* Level and XP Card */}
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Level {userStats.currentLevel}</h2>
                <p className="text-sm text-muted-foreground">{userStats.totalXP} XP earned</p>
              </div>
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">{userStats.currentLevel}</span>
              </div>
            </div>
            <Progress value={75} className="h-3" />
            <p className="text-sm text-muted-foreground">250 XP to next level</p>
          </div>
        </Card>

        {/* Streak Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{userStats.currentStreak}</div>
                <div className="text-sm text-muted-foreground">Current Streak</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{userStats.longestStreak}</div>
                <div className="text-sm text-muted-foreground">Best Streak</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Weekly Activity */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">This Week</h3>
            </div>

            {/* Weekly Chart */}
            <div className="flex items-end justify-between h-20 space-x-2">
              {userStats.weeklyMinutes.map((minutes, index) => {
                const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                const height = Math.max((minutes / Math.max(...userStats.weeklyMinutes)) * 100, 8)

                return (
                  <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                    <div
                      className="w-full bg-primary rounded-t-md transition-all duration-300"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-muted-foreground">{dayLabels[index]}</span>
                  </div>
                )
              })}
            </div>

            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{weeklyTotal} minutes total</span>
              <span>{weeklyAverage} min/day avg</span>
            </div>
          </div>
        </Card>

        {/* Learning Progress */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-foreground">Learning Progress</h3>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Lessons Completed</span>
                <span className="font-medium text-foreground">
                  {userStats.lessonsCompleted}/{userStats.totalLessons}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">4</div>
                  <div className="text-xs text-muted-foreground">Chapters</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">28</div>
                  <div className="text-xs text-muted-foreground">Signs Learned</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Award className="w-5 h-5 text-secondary" />
              <h3 className="font-semibold text-foreground">Achievements</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement) => {
                const isUnlocked = userStats.achievements.includes(achievement.id)

                return (
                  <div
                    key={achievement.id}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      isUnlocked ? "border-primary bg-primary/5" : "border-border bg-muted/30 opacity-60"
                    }`}
                  >
                    <div className="text-center space-y-2">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{achievement.name}</div>
                        <div className="text-xs text-muted-foreground">{achievement.description}</div>
                      </div>
                      {isUnlocked && (
                        <Badge variant="secondary" className="text-xs">
                          Unlocked
                        </Badge>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>

        {/* Motivational Message */}
        <div className="text-center space-y-4 pb-8">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
            <div className="text-2xl">🦜</div>
          </div>
          <p className="text-sm text-muted-foreground italic">
            "Amazing progress! You're {Math.round(progressPercentage)}% through your journey!" - Mano
          </p>
        </div>
      </div>
    </div>
  )
}
