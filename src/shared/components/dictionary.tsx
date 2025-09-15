"use client"

import { useState } from "react"
import { Button } from "../../shared/ui/button"
import { Card } from "../../shared/ui/card"
import { Input } from "../../shared/ui/input"
import { Badge } from "../../shared/ui/badge"
import { ArrowLeft, Search, Play, Volume2, Star, Filter } from "lucide-react"
import { cn } from "../../lib/utils"

interface DictionaryEntry {
  word: string
  emoji: string
  description: string
  category: string
  difficulty: "easy" | "medium" | "hard"
  isFavorite: boolean
}

const dictionaryEntries: DictionaryEntry[] = [
  // Greetings
  { word: "Hello", emoji: "👋", description: "Wave your hand", category: "greetings", difficulty: "easy", isFavorite: false },
  { word: "Goodbye", emoji: "👋", description: "Wave your hand", category: "greetings", difficulty: "easy", isFavorite: false },
  { word: "Good morning", emoji: "🌅", description: "Sunrise gesture", category: "greetings", difficulty: "easy", isFavorite: false },
  { word: "Good evening", emoji: "🌙", description: "Moon gesture", category: "greetings", difficulty: "easy", isFavorite: false },
  { word: "Nice to meet you", emoji: "🤝", description: "Handshake gesture", category: "greetings", difficulty: "medium", isFavorite: false },

  // Courtesy
  { word: "Please", emoji: "🤲", description: "Open palms together", category: "courtesy", difficulty: "easy", isFavorite: false },
  { word: "Thank you", emoji: "🙏", description: "Prayer hands gesture", category: "courtesy", difficulty: "easy", isFavorite: false },
  { word: "You're welcome", emoji: "👌", description: "OK gesture", category: "courtesy", difficulty: "easy", isFavorite: false },
  { word: "Excuse me", emoji: "🤚", description: "Raised hand", category: "courtesy", difficulty: "medium", isFavorite: false },
  { word: "Sorry", emoji: "😔", description: "Apologetic gesture", category: "courtesy", difficulty: "easy", isFavorite: false },

  // Questions
  { word: "What", emoji: "❓", description: "Question mark gesture", category: "questions", difficulty: "easy", isFavorite: false },
  { word: "Where", emoji: "📍", description: "Pointing gesture", category: "questions", difficulty: "easy", isFavorite: false },
  { word: "When", emoji: "⏰", description: "Clock gesture", category: "questions", difficulty: "easy", isFavorite: false },
  { word: "Who", emoji: "👤", description: "Person gesture", category: "questions", difficulty: "easy", isFavorite: false },
  { word: "How", emoji: "🤔", description: "Thinking gesture", category: "questions", difficulty: "medium", isFavorite: false },

  // Family
  { word: "Mother", emoji: "👩", description: "Female symbol", category: "family", difficulty: "easy", isFavorite: false },
  { word: "Father", emoji: "👨", description: "Male symbol", category: "family", difficulty: "easy", isFavorite: false },
  { word: "Brother", emoji: "👦", description: "Young male symbol", category: "family", difficulty: "easy", isFavorite: false },
  { word: "Sister", emoji: "👧", description: "Young female symbol", category: "family", difficulty: "easy", isFavorite: false },
  { word: "Baby", emoji: "👶", description: "Infant symbol", category: "family", difficulty: "easy", isFavorite: false },

  // Numbers
  { word: "One", emoji: "1️⃣", description: "One finger up", category: "numbers", difficulty: "easy", isFavorite: false },
  { word: "Two", emoji: "2️⃣", description: "Two fingers up", category: "numbers", difficulty: "easy", isFavorite: false },
  { word: "Three", emoji: "3️⃣", description: "Three fingers up", category: "numbers", difficulty: "easy", isFavorite: false },
  { word: "Four", emoji: "4️⃣", description: "Four fingers up", category: "numbers", difficulty: "easy", isFavorite: false },
  { word: "Five", emoji: "5️⃣", description: "Five fingers up", category: "numbers", difficulty: "easy", isFavorite: false },

  // Colors
  { word: "Red", emoji: "🔴", description: "Red circle", category: "colors", difficulty: "easy", isFavorite: false },
  { word: "Blue", emoji: "🔵", description: "Blue circle", category: "colors", difficulty: "easy", isFavorite: false },
  { word: "Green", emoji: "🟢", description: "Green circle", category: "colors", difficulty: "easy", isFavorite: false },
  { word: "Yellow", emoji: "🟡", description: "Yellow circle", category: "colors", difficulty: "easy", isFavorite: false },
  { word: "Black", emoji: "⚫", description: "Black circle", category: "colors", difficulty: "easy", isFavorite: false },

  // Food
  { word: "Apple", emoji: "🍎", description: "Apple fruit", category: "food", difficulty: "easy", isFavorite: false },
  { word: "Water", emoji: "💧", description: "Water drop", category: "food", difficulty: "easy", isFavorite: false },
  { word: "Bread", emoji: "🍞", description: "Bread loaf", category: "food", difficulty: "easy", isFavorite: false },
  { word: "Milk", emoji: "🥛", description: "Milk glass", category: "food", difficulty: "easy", isFavorite: false },
  { word: "Coffee", emoji: "☕", description: "Coffee cup", category: "food", difficulty: "easy", isFavorite: false },
]

const categories = [
  { id: "all", name: "All", count: dictionaryEntries.length },
  { id: "greetings", name: "Greetings", count: dictionaryEntries.filter(e => e.category === "greetings").length },
  { id: "courtesy", name: "Courtesy", count: dictionaryEntries.filter(e => e.category === "courtesy").length },
  { id: "questions", name: "Questions", count: dictionaryEntries.filter(e => e.category === "questions").length },
  { id: "family", name: "Family", count: dictionaryEntries.filter(e => e.category === "family").length },
  { id: "numbers", name: "Numbers", count: dictionaryEntries.filter(e => e.category === "numbers").length },
  { id: "colors", name: "Colors", count: dictionaryEntries.filter(e => e.category === "colors").length },
  { id: "food", name: "Food", count: dictionaryEntries.filter(e => e.category === "food").length },
]

interface DictionaryProps {
  onBack?: () => void
}

export function Dictionary({ onBack }: DictionaryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [favorites, setFavorites] = useState<string[]>([])
  const [entries] = useState(dictionaryEntries)

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || entry.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFavorite = (word: string) => {
    setFavorites(prev => 
      prev.includes(word) 
        ? prev.filter(f => f !== word)
        : [...prev, word]
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "hard": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted pb-20">
      {/* Header */}
      <div className="bg-card border-b p-4">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
          )}
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Từ điển ký hiệu</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Tìm kiếm ký hiệu..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Chủ đề</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="text-sm"
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Dictionary Entries */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-foreground">
              {filteredEntries.length} kết quả
            </h2>
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchTerm("")}
              >
                Xóa tìm kiếm
              </Button>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEntries.map((entry, index) => (
              <Card
                key={index}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="space-y-4">
                  {/* Entry Header */}
                  <div className="flex items-center justify-between">
                    <div className="text-3xl">{entry.emoji}</div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getDifficultyColor(entry.difficulty)}>
                        {entry.difficulty}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(entry.word)}
                        className="p-1 h-auto"
                      >
                        <Star 
                          className={cn(
                            "w-4 h-4",
                            favorites.includes(entry.word) 
                              ? "text-yellow-500 fill-yellow-500" 
                              : "text-muted-foreground"
                          )} 
                        />
                      </Button>
                    </div>
                  </div>

                  {/* Entry Content */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground text-lg">{entry.word}</h3>
                    <p className="text-sm text-muted-foreground">{entry.description}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Xem
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      <Volume2 className="w-4 h-4 mr-1" />
                      Âm thanh
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredEntries.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Không tìm thấy ký hiệu</h3>
              <p className="text-muted-foreground">
                Thử thay đổi từ khóa hoặc bộ lọc chủ đề
              </p>
            </div>
          )}
        </div>

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div className="mt-8 space-y-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Yêu thích ({favorites.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {favorites.map((word) => {
                const entry = entries.find(e => e.word === word)
                if (!entry) return null
                return (
                  <Badge
                    key={word}
                    variant="outline"
                    className="text-sm cursor-pointer hover:bg-primary/10"
                    onClick={() => toggleFavorite(word)}
                  >
                    {entry.emoji} {entry.word}
                  </Badge>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
