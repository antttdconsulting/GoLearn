"use client"

import { useState } from "react"
import { LearningDashboard } from "./learning-dashboard"
import { CourseOverview } from "./course-overview"
import { LessonInterface } from "./lesson-interface"
import { MirrorPractice } from "./mirror-practice"
import { QuizInterface } from "./quiz-interface"
import { FillGapExercise } from "./fill-gap-exercise"
import { LessonResults } from "./lesson-results"
import { StreakCelebration } from "./streak-celebration"
import { Dictionary } from "./dictionary"
import { PracticeHub } from "./practice-hub"
import { ProfileSystem } from "./profile-system"

type LearningStep =
  | "dashboard"
  | "course"
  | "lesson"
  | "mirror"
  | "quiz"
  | "fillgap"
  | "results"
  | "streak"
  | "complete"
  | "dictionary"
  | "practice"
  | "profile"

interface LearningFlowProps {
  userPreferences: {
    firstName: string
    language: string
    goal: string
  }
}

export function LearningFlow({ userPreferences }: LearningFlowProps) {
  const [currentStep, setCurrentStep] = useState<LearningStep>("course")
  const [lessonScore, setLessonScore] = useState(85)

  const handleStartLesson = () => {
    setCurrentStep("lesson")
  }

  const handleLessonNext = () => {
    setCurrentStep("mirror")
  }

  const handleLessonBack = () => {
    setCurrentStep("course")
  }

  const handleMirrorPractice = () => {
    setCurrentStep("mirror")
  }

  const handleMirrorNext = () => {
    setCurrentStep("quiz")
  }

  const handleMirrorBack = () => {
    setCurrentStep("lesson")
  }

  const handleQuizNext = () => {
    setCurrentStep("fillgap")
  }

  const handleQuizBack = () => {
    setCurrentStep("mirror")
  }

  const handleFillGapNext = () => {
    setCurrentStep("results")
  }

  const handleFillGapBack = () => {
    setCurrentStep("quiz")
  }

  const handleResultsContinue = () => {
    setCurrentStep("streak")
  }

  const handleResultsRetake = () => {
    setCurrentStep("lesson")
  }

  const handleStreakFinish = () => {
    setCurrentStep("course")
  }

  const handleStartChapter = (chapterId: string) => {
    setCurrentStep("lesson")
  }

  const handleNavigate = (section: string) => {
    if (section === "home") {
      setCurrentStep("dashboard")
    }
    if (section === "dictionary") {
      setCurrentStep("dictionary")
    }
    if (section === "practice") {
      setCurrentStep("practice")
    }
    if (section === "profile") {
      setCurrentStep("profile")
    }
    if (section === "course") {
      setCurrentStep("course")
    }
  }

  const handleStartPractice = (mode: string) => {
    console.log("[v0] Starting practice mode:", mode)
    setCurrentStep("lesson")
  }

  switch (currentStep) {
    case "dashboard":
      return (
        <LearningDashboard
          userPreferences={userPreferences}
          onStartLesson={() => setCurrentStep("course")}
          onNavigate={handleNavigate}
        />
      )
    case "course":
      return <CourseOverview onStartChapter={handleStartChapter} onNavigate={handleNavigate} />
    case "dictionary":
      return <Dictionary onBack={() => setCurrentStep("course")} onNavigate={handleNavigate} />
    case "practice":
      return (
        <PracticeHub
          onBack={() => setCurrentStep("course")}
          onStartPractice={handleStartPractice}
          onNavigate={handleNavigate}
        />
      )
    case "profile":
      return (
        <ProfileSystem
          onBack={() => setCurrentStep("course")}
          userPreferences={userPreferences}
          onNavigate={handleNavigate}
        />
      )
    case "lesson":
      return (
        <LessonInterface onNext={handleLessonNext} onMirrorPractice={handleMirrorPractice} onBack={handleLessonBack} />
      )
    case "mirror":
      return <MirrorPractice signName="HELLO" onNext={handleMirrorNext} onBack={handleMirrorBack} />
    case "quiz":
      return <QuizInterface onNext={handleQuizNext} onBack={handleQuizBack} />
    case "fillgap":
      return <FillGapExercise onNext={handleFillGapNext} onBack={handleFillGapBack} />
    case "results":
      return <LessonResults score={lessonScore} onContinue={handleResultsContinue} onRetake={handleResultsRetake} />
    case "streak":
      return <StreakCelebration streakCount={3} signsLearned={6} onFinish={handleStreakFinish} />
    case "complete":
      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <div className="text-6xl">🎉</div>
            <h1 className="text-2xl font-bold text-foreground">Lesson Complete!</h1>
            <p className="text-muted-foreground">Great job learning the "HELLO" sign!</p>
            <button
              onClick={() => setCurrentStep("course")}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              Back to Course
            </button>
          </div>
        </div>
      )
    default:
      return <CourseOverview onStartChapter={handleStartChapter} onNavigate={handleNavigate} />
  }
}
