"use client"

import { useMemo, useState } from "react"
import { Card } from "../../shared/ui/card"
import { Button } from "../../shared/ui/button"
import { Badge } from "../../shared/ui/badge"

type AssessmentItem = {
  id: string
  title: string
  prompt: string
  mediaType: "video" | "gif"
  mediaUrl: string
  choices: { id: string; label: string; correct?: boolean }[]
}

export function OnboardingAssessment({ onComplete, onBack }: { onComplete: (result: { score: number; level: string }) => void; onBack?: () => void }) {
  const items: AssessmentItem[] = useMemo(() => [
    {
      id: "greet",
      title: "Chào hỏi",
      prompt: "Ký hiệu nào thể hiện lời chào cơ bản?",
      mediaType: "video",
      mediaUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
      choices: [
        { id: "a", label: "Xin chào", correct: true },
        { id: "b", label: "Cảm ơn" },
        { id: "c", label: "Tạm biệt" },
      ],
    },
    {
      id: "thanks",
      title: "Cảm ơn",
      prompt: "Ký hiệu nào mang nghĩa Cảm ơn?",
      mediaType: "video",
      mediaUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
      choices: [
        { id: "a", label: "Xin chào" },
        { id: "b", label: "Cảm ơn", correct: true },
        { id: "c", label: "Xin lỗi" },
      ],
    },
    {
      id: "number",
      title: "Số đếm",
      prompt: "Ký hiệu cho số 1 là lựa chọn nào?",
      mediaType: "gif",
      mediaUrl: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
      choices: [
        { id: "a", label: "1", correct: true },
        { id: "b", label: "2" },
        { id: "c", label: "3" },
      ],
    },
  ], [])

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const isLast = step === items.length

  const score = useMemo(() => {
    return items.reduce((acc, item) => {
      const picked = answers[item.id]
      const correctId = item.choices.find((c) => c.correct)?.id
      return acc + (picked && picked === correctId ? 1 : 0)
    }, 0)
  }, [answers, items])

  const level = useMemo(() => {
    if (score >= 3) return "Cơ bản vững"
    if (score === 2) return "Cơ bản"
    return "Mới bắt đầu"
  }, [score])

  const handlePick = (itemId: string, choiceId: string) => {
    setAnswers((prev) => ({ ...prev, [itemId]: choiceId }))
  }

  const goNext = () => {
    if (isLast) {
      onComplete({ score, level })
    } else {
      setStep((s) => Math.min(s + 1, items.length))
    }
  }

  const goPrev = () => {
    if (step === 0) return
    setStep((s) => Math.max(s - 1, 0))
  }

  if (isLast) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
          <div className="p-6 pb-24 space-y-6 text-center">
            <h2 className="text-2xl font-bold">Kết quả đánh giá</h2>
            <div className="text-6xl">🎉</div>
            <p className="text-muted-foreground">Điểm: {score}/{items.length}</p>
            <div className="flex items-center justify-center gap-2">
              <span>Cấp độ đề xuất:</span>
              <Badge>{level}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Bạn có thể điều chỉnh mục tiêu sau trong phần cài đặt.</p>
          </div>
          <div className="sticky bottom-0 inset-x-0 p-4 bg-card/80 backdrop-blur-sm border-t border-border/50">
            <div className="flex gap-3">
              <Button variant="outline" className="w-1/3" onClick={() => setStep(items.length - 1)}>Quay lại</Button>
              <Button className="flex-1" onClick={() => onComplete({ score, level })}>Tiếp tục</Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  const item = items[step]
  const picked = answers[item.id]
  const progressPct = Math.round(((step + 1) / items.length) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
        <div className="p-6 pb-24 space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Đánh giá khởi đầu</div>
            <div className="w-32 h-2 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${progressPct}%` }}></div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-muted-foreground text-sm">{item.prompt}</p>
          </div>

          <div className="aspect-video w-full overflow-hidden rounded-md border bg-black/5 flex items-center justify-center">
            {item.mediaType === "video" ? (
              <video className="w-full h-full object-cover" src={item.mediaUrl} muted playsInline loop />
            ) : (
              <img className="w-full h-full object-cover" src={item.mediaUrl} alt={item.title} />
            )}
          </div>

          <div className="space-y-2">
            {item.choices.map((c) => (
              <button key={c.id} onClick={() => handlePick(item.id, c.id)} className={`w-full p-3 rounded-xl border-2 text-left transition ${picked === c.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <div className="sticky bottom-0 inset-x-0 p-4 bg-card/80 backdrop-blur-sm border-t border-border/50">
          <div className="flex gap-3">
            <Button variant="outline" className="w-1/3" onClick={onBack ?? goPrev} disabled={step === 0 && !onBack}>Quay lại</Button>
            <Button className="flex-1" onClick={goNext} disabled={!picked}>Tiếp tục</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
