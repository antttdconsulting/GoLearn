"use client"

import { useState } from "react"
import { WelcomeScreen } from "./welcome-screen"
import { LanguageSelection } from "./language-selection"
import { LearningGoals } from "./learning-goals"
import { LearningReasons } from "./learning-reasons"
import { AppBenefits } from "./app-benefits"
import { SignUpForm } from "./sign-up-form"
import { CompletionScreen } from "./completion-screen"

type OnboardingStep = "welcome" | "language" | "goals" | "reasons" | "benefits" | "signup" | "complete"

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome")
  const [userPreferences, setUserPreferences] = useState({
    language: "",
    goal: "",
    reasons: [] as string[],
    email: "",
    firstName: "",
    password: "",
  })

  const handleBack = () => {
    switch (currentStep) {
      case "language":
        setCurrentStep("welcome")
        break
      case "goals":
        setCurrentStep("language")
        break
      case "reasons":
        setCurrentStep("goals")
        break
      case "benefits":
        setCurrentStep("reasons")
        break
      case "signup":
        setCurrentStep("benefits")
        break
      default:
        break
    }
  }

  const handleWelcomeNext = () => {
    setCurrentStep("language")
  }

  const handleLanguageNext = (selectedLanguage: string) => {
    setUserPreferences((prev) => ({ ...prev, language: selectedLanguage }))
    setCurrentStep("goals")
  }

  const handleGoalsNext = (selectedGoal: string) => {
    setUserPreferences((prev) => ({ ...prev, goal: selectedGoal }))
    setCurrentStep("reasons")
  }

  const handleReasonsNext = (selectedReasons: string[]) => {
    setUserPreferences((prev) => ({ ...prev, reasons: selectedReasons }))
    setCurrentStep("benefits")
  }

  const handleBenefitsNext = () => {
    setCurrentStep("signup")
  }

  const handleSignUpComplete = (userData: { email: string; firstName: string; password: string }) => {
    setUserPreferences((prev) => ({ ...prev, ...userData }))
    setCurrentStep("complete")
  }

  switch (currentStep) {
    case "welcome":
      return <WelcomeScreen onNext={handleWelcomeNext} />
    case "language":
      return <LanguageSelection onNext={handleLanguageNext} onBack={handleBack} />
    case "goals":
      return <LearningGoals onNext={handleGoalsNext} onBack={handleBack} />
    case "reasons":
      return <LearningReasons onNext={handleReasonsNext} onBack={handleBack} />
    case "benefits":
      return <AppBenefits onNext={handleBenefitsNext} onBack={handleBack} />
    case "signup":
      return <SignUpForm onComplete={handleSignUpComplete} onBack={handleBack} />
    case "complete":
      return <CompletionScreen userPreferences={userPreferences} />
    default:
      return <WelcomeScreen onNext={handleWelcomeNext} />
  }
}
