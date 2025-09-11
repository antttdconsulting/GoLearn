"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, Check, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface LanguageOption {
  id: string
  name: string
  fullName: string
  flag: string
}

const languages: LanguageOption[] = [
  {
    id: "asl",
    name: "ASL",
    fullName: "American Sign Language",
    flag: "🇺🇸",
  },
  {
    id: "bsl",
    name: "BSL",
    fullName: "British Sign Language",
    flag: "🇬🇧",
  },
  {
    id: "ogs",
    name: "ÖGS",
    fullName: "Austrian Sign Language",
    flag: "🇦🇹",
  },
]

interface LanguageSelectionProps {
  onNext: (selectedLanguage: string) => void
  onBack?: () => void
}

export function LanguageSelection({ onNext, onBack }: LanguageSelectionProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("")

  const handleNext = () => {
    if (selectedLanguage) {
      onNext(selectedLanguage)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-card border-border shadow-lg">
        <div className="p-8 space-y-8">
          {/* Progress Indicator */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">1/6</div>
            <div className="flex space-x-1">
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
            </div>
          </div>

          {onBack && (
            <div className="flex justify-start">
              <Button
                onClick={onBack}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            </div>
          )}

          {/* Question */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground text-balance leading-tight">
              Which sign language do you want to learn?
            </h1>
          </div>

          {/* Language Options */}
          <div className="space-y-3">
            {languages.map((language) => (
              <button
                key={language.id}
                onClick={() => setSelectedLanguage(language.id)}
                className={cn(
                  "w-full p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
                  "flex items-center justify-between text-left",
                  selectedLanguage === language.id
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-background hover:border-primary/50",
                )}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{language.flag}</div>
                  <div>
                    <div className="font-semibold text-foreground">{language.name}</div>
                    <div className="text-sm text-muted-foreground">{language.fullName}</div>
                  </div>
                </div>
                {selectedLanguage === language.id && (
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
            disabled={!selectedLanguage}
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
