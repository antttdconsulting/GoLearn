"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, Play, Volume2, Carrot as Mirror, ArrowLeft } from "lucide-react"

interface LessonInterfaceProps {
  onNext: () => void
  onMirrorPractice?: () => void
  onBack?: () => void
}

export function LessonInterface({ onNext, onMirrorPractice, onBack }: LessonInterfaceProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlaySign = () => {
    setIsPlaying(true)
    // Simulate video playback
    setTimeout(() => {
      setIsPlaying(false)
    }, 2000)
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
            <div className="text-sm text-muted-foreground">Lesson 1</div>
            <div className="flex space-x-1">
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
            </div>
          </div>

          {/* Lesson Title */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground text-balance leading-tight mb-2">Learn a new sign!</h1>
            <div className="text-4xl font-bold text-primary">HELLO</div>
          </div>

          {/* Video/Animation Area */}
          <div className="relative">
            <div className="w-full h-64 bg-muted/30 rounded-2xl border-2 border-dashed border-border flex items-center justify-center">
              {isPlaying ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center animate-pulse">
                    <div className="text-2xl text-primary-foreground">👋</div>
                  </div>
                  <p className="text-sm text-muted-foreground">Playing sign for "HELLO"</p>
                </div>
              ) : (
                <button
                  onClick={handlePlaySign}
                  className="flex flex-col items-center space-y-4 hover:scale-105 transition-transform"
                >
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  </div>
                  <p className="text-sm text-muted-foreground">Tap to see the sign</p>
                </button>
              )}
            </div>

            {/* Audio Button */}
            <button className="absolute top-4 right-4 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform">
              <Volume2 className="w-5 h-5 text-foreground" />
            </button>

            {/* Mirror Practice Button */}
            {onMirrorPractice && (
              <button
                onClick={onMirrorPractice}
                className="absolute top-4 left-4 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                title="Practice with camera"
              >
                <Mirror className="w-5 h-5 text-foreground" />
              </button>
            )}
          </div>

          {/* Learning Tip */}
          <div className="bg-accent/10 rounded-xl p-4">
            <p className="text-sm text-foreground leading-relaxed">
              <strong>Tip:</strong> Watch how the hand moves from a closed fist to an open palm while waving. This is
              the universal greeting in sign language!
            </p>
          </div>

          {/* Next Button */}
          <Button
            onClick={onNext}
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
