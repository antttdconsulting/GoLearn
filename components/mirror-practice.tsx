"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChevronRight, Camera, CameraOff, RotateCcw, Info } from "lucide-react"

interface MirrorPracticeProps {
  signName: string
  onNext: () => void
  onBack: () => void
}

export function MirrorPractice({ signName, onNext, onBack }: MirrorPracticeProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsStreaming(true)
        setHasPermission(true)
        setError(null)
      }
    } catch (err) {
      console.error("Camera access denied:", err)
      setError("Camera access was denied. Please allow camera access in your browser settings.")
      setHasPermission(false)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setIsStreaming(false)
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
        <div className="p-8 space-y-8">
          {/* Progress Indicator */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Practice Mode</div>
            <div className="flex space-x-1">
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
              <div className="w-8 h-1 bg-border rounded-full"></div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{signName}</div>
            <p className="text-muted-foreground">Practice with your camera</p>
          </div>

          {/* Camera Permission Alert */}
          {hasPermission === false && (
            <Alert className="border-amber-200 bg-amber-50">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Please allow access to the camera in your browser settings to use this feature.
              </AlertDescription>
            </Alert>
          )}

          {/* Error Alert */}
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <Info className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Camera/Video Area */}
          <div className="relative">
            <div className="w-full h-64 bg-muted/30 rounded-2xl border-2 border-dashed border-border overflow-hidden">
              {isStreaming ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover rounded-2xl scale-x-[-1]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Camera className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-sm font-medium text-foreground">Mirror Practice</p>
                    <p className="text-xs text-muted-foreground">Practice the sign while watching yourself</p>
                  </div>
                </div>
              )}
            </div>

            {/* Camera Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {!isStreaming ? (
                <Button
                  onClick={requestCameraAccess}
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Start Camera
                </Button>
              ) : (
                <Button onClick={stopCamera} size="sm" variant="outline" className="bg-background/80">
                  <CameraOff className="w-4 h-4 mr-2" />
                  Stop Camera
                </Button>
              )}
            </div>
          </div>

          {/* Reference Image */}
          <div className="bg-accent/10 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <RotateCcw className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">Reference</p>
            </div>
            <div className="w-full h-32 bg-muted/50 rounded-lg flex items-center justify-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ETS8Zj5GVhn4QvTMt4JVkTfX5CDdnB.png"
                alt="Sign language demonstration for HELLO"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Watch the reference and try to match the hand position and movement.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent">
              Back to Lesson
            </Button>
            <Button
              onClick={onNext}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
