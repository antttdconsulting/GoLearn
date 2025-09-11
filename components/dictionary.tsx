"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Heart, Play, Filter, ArrowLeft, BookOpen } from "lucide-react"
import { BottomNavigation } from "./bottom-navigation"

interface Sign {
  id: string
  word: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  description: string
  videoUrl?: string
  isFavorite: boolean
  relatedSigns: string[]
}

interface DictionaryProps {
  onBack: () => void
  onNavigate?: (section: string) => void
}

export function Dictionary({ onBack, onNavigate }: DictionaryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSign, setSelectedSign] = useState<Sign | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  // Mock data for signs
  const signs: Sign[] = [
    {
      id: "hello",
      word: "HELLO",
      category: "greetings",
      difficulty: "beginner",
      description: "A basic greeting sign. Raise your hand with palm facing forward and wave slightly.",
      isFavorite: false,
      relatedSigns: ["goodbye", "nice-to-meet-you"],
    },
    {
      id: "goodbye",
      word: "GOODBYE",
      category: "greetings",
      difficulty: "beginner",
      description: "A farewell sign. Wave your hand with palm facing the person you're saying goodbye to.",
      isFavorite: true,
      relatedSigns: ["hello", "see-you-later"],
    },
    {
      id: "thank-you",
      word: "THANK YOU",
      category: "courtesy",
      difficulty: "beginner",
      description: "Express gratitude by touching your chin with your fingertips and moving your hand forward.",
      isFavorite: false,
      relatedSigns: ["please", "you-welcome"],
    },
    {
      id: "how-are-you",
      word: "HOW ARE YOU?",
      category: "questions",
      difficulty: "intermediate",
      description:
        "Ask about someone's wellbeing. Combine the signs for 'how', 'you', and raise eyebrows for question.",
      isFavorite: true,
      relatedSigns: ["fine", "good", "bad"],
    },
    {
      id: "please",
      word: "PLEASE",
      category: "courtesy",
      difficulty: "beginner",
      description: "Make a polite request by placing your hand on your chest and making a circular motion.",
      isFavorite: false,
      relatedSigns: ["thank-you", "excuse-me"],
    },
    {
      id: "family",
      word: "FAMILY",
      category: "relationships",
      difficulty: "intermediate",
      description: "Represent family by making two 'F' handshapes and moving them in a circle.",
      isFavorite: false,
      relatedSigns: ["mother", "father", "brother", "sister"],
    },
  ]

  const categories = [
    { id: "all", name: "All Signs", count: signs.length },
    { id: "greetings", name: "Greetings", count: signs.filter((s) => s.category === "greetings").length },
    { id: "courtesy", name: "Courtesy", count: signs.filter((s) => s.category === "courtesy").length },
    { id: "questions", name: "Questions", count: signs.filter((s) => s.category === "questions").length },
    { id: "relationships", name: "Relationships", count: signs.filter((s) => s.category === "relationships").length },
  ]

  const filteredSigns = signs.filter((sign) => {
    const matchesSearch =
      sign.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sign.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || sign.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFavorite = (signId: string) => {
    setFavorites((prev) => (prev.includes(signId) ? prev.filter((id) => id !== signId) : [...prev, signId]))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (selectedSign) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted pb-20">
        {/* Header */}
        <div className="bg-card border-b p-4">
          <div className="flex items-center gap-4 max-w-4xl mx-auto">
            <Button variant="ghost" size="sm" onClick={() => setSelectedSign(null)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-bold text-foreground">{selectedSign.word}</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleFavorite(selectedSign.id)}
              className={favorites.includes(selectedSign.id) ? "text-red-500" : ""}
            >
              <Heart className={`w-4 h-4 ${favorites.includes(selectedSign.id) ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Sign Detail */}
        <div className="max-w-4xl mx-auto p-6">
          <div className="space-y-6">
            {/* Video/Demo Area */}
            <Card className="p-6">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Play className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-muted-foreground">Sign demonstration video</p>
                  <p className="text-2xl font-bold text-foreground">{selectedSign.word}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getDifficultyColor(selectedSign.difficulty)}>{selectedSign.difficulty}</Badge>
                <Badge variant="outline">{selectedSign.category}</Badge>
              </div>
            </Card>

            {/* Description */}
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-3">How to sign</h3>
              <p className="text-muted-foreground leading-relaxed">{selectedSign.description}</p>
            </Card>

            {/* Related Signs */}
            {selectedSign.relatedSigns.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Related Signs</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSign.relatedSigns.map((relatedId) => {
                    const relatedSign = signs.find((s) => s.id === relatedId)
                    return relatedSign ? (
                      <Button key={relatedId} variant="outline" size="sm" onClick={() => setSelectedSign(relatedSign)}>
                        {relatedSign.word}
                      </Button>
                    ) : null
                  })}
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation currentSection="dictionary" onNavigate={onNavigate || (() => {})} />
      </div>
    )
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
            <BookOpen className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Sign Dictionary</h1>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-4 mb-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search signs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                {category.name}
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {filteredSigns.length} sign{filteredSigns.length !== 1 ? "s" : ""} found
            </p>
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Sort
            </Button>
          </div>

          {/* Sign Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSigns.map((sign) => (
              <Card
                key={sign.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedSign(sign)}
              >
                <div className="space-y-3">
                  {/* Sign Preview */}
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Play className="w-6 h-6 text-primary" />
                      </div>
                      <p className="font-semibold text-foreground">{sign.word}</p>
                    </div>
                  </div>

                  {/* Sign Info */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className={getDifficultyColor(sign.difficulty)}>{sign.difficulty}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(sign.id)
                        }}
                        className={favorites.includes(sign.id) ? "text-red-500" : ""}
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(sign.id) ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{sign.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredSigns.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No signs found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentSection="dictionary" onNavigate={onNavigate || (() => {})} />
    </div>
  )
}
