export interface QuizQuestion {
  id: string
  question: string
  type: 'multiple-choice' | 'true-false' | 'image-choice' | 'sign-recognition' | 'fill-blank' | 'translation'
  options?: string[]
  correctAnswer: string | boolean
  explanation: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  imageUrl?: string
  signVideo?: string
  points?: number
}

export interface QuizCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

export const quizCategories: QuizCategory[] = [
  {
    id: 'greetings',
    name: 'Chào hỏi',
    description: 'Các ký hiệu chào hỏi cơ bản',
    icon: '👋',
    color: 'bg-blue-500'
  },
  {
    id: 'family',
    name: 'Gia đình',
    description: 'Các ký hiệu thành viên gia đình',
    icon: '👨‍👩‍👧‍👦',
    color: 'bg-green-500'
  },
  {
    id: 'emotions',
    name: 'Cảm xúc',
    description: 'Biểu đạt cảm xúc',
    icon: '😊',
    color: 'bg-yellow-500'
  },
  {
    id: 'numbers',
    name: 'Số đếm',
    description: 'Các ký hiệu số',
    icon: '🔢',
    color: 'bg-purple-500'
  }
]

export const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'Ký hiệu này có nghĩa là gì?',
    type: 'multiple-choice',
    options: ['Xin chào', 'Tạm biệt', 'Cảm ơn', 'Xin lỗi'],
    correctAnswer: 'Xin chào',
    explanation: 'Đây là ký hiệu "Xin chào" - vẫy tay từ bên này sang bên kia.',
    category: 'greetings',
    difficulty: 'easy',
    signVideo: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4'
  },
  {
    id: '2',
    question: 'Ký hiệu "mẹ" được thực hiện bằng cách chạm vào cằm.',
    type: 'true-false',
    correctAnswer: true,
    explanation: 'Ký hiệu "mẹ" được thực hiện bằng cách chạm ngón cái vào cằm.',
    category: 'family',
    difficulty: 'easy'
  },
  {
    id: '3',
    question: 'Ký hiệu này thể hiện cảm xúc gì?',
    type: 'multiple-choice',
    options: ['Vui vẻ', 'Buồn', 'Giận dữ', 'Ngạc nhiên'],
    correctAnswer: 'Vui vẻ',
    explanation: 'Ký hiệu này thể hiện sự vui vẻ - cười và chỉ vào miệng.',
    category: 'emotions',
    difficulty: 'medium',
    signVideo: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4'
  },
  {
    id: '4',
    question: 'Làm thế nào để ký hiệu số "5"?',
    type: 'multiple-choice',
    options: ['Tất cả ngón tay đưa lên', 'Ngón cái đưa lên', 'Ngón trỏ đưa lên', 'Hai ngón tay đưa lên'],
    correctAnswer: 'Tất cả ngón tay đưa lên',
    explanation: 'Số 5 được ký hiệu bằng cách đưa tất cả năm ngón tay lên.',
    category: 'numbers',
    difficulty: 'easy',
    signVideo: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4'
  },
  {
    id: '5',
    question: 'Chọn nghĩa đúng của ký hiệu trong video này.',
    type: 'multiple-choice',
    options: ['Chào mừng', 'Xin chào', 'Chúc ngủ ngon', 'Chào buổi sáng'],
    correctAnswer: 'Chào mừng',
    explanation: 'Hai tay mở rộng chuyển động vào trong thường có nghĩa là "Chào mừng".',
    category: 'greetings',
    difficulty: 'easy',
    signVideo: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4'
  },
  {
    id: '6',
    question: 'Ký hiệu "bố" được thực hiện gần trán.',
    type: 'true-false',
    correctAnswer: true,
    explanation: 'Trong nhiều hệ thống, ngón cái chạm trán có nghĩa là "bố".',
    category: 'family',
    difficulty: 'easy',
    signVideo: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4'
  },
  {
    id: '7',
    question: 'Chọn bản dịch cho ký hiệu có nghĩa "Cảm ơn".',
    type: 'translation',
    options: ['Cảm ơn', 'Xin lỗi', 'Làm ơn', 'Xin phép'],
    correctAnswer: 'Cảm ơn',
    explanation: 'Tay từ cằm chuyển động ra ngoài có nghĩa là "Cảm ơn".',
    category: 'greetings',
    difficulty: 'easy',
    signVideo: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4'
  },
  {
    id: '8',
    question: 'Số nào được biểu hiện bằng cách chỉ đưa ngón trỏ lên?',
    type: 'multiple-choice',
    options: ['1', '2', '3', '5'],
    correctAnswer: '1',
    explanation: 'Một ngón tay đưa lên biểu hiện số 1.',
    category: 'numbers',
    difficulty: 'easy',
    signVideo: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4'
  },
  {
    id: '9',
    question: 'Ký hiệu này biểu đạt sự buồn bã.',
    type: 'true-false',
    correctAnswer: true,
    explanation: 'Biểu cảm khuôn mặt buồn với tay gần mặt biểu hiện "buồn".',
    category: 'emotions',
    difficulty: 'medium',
    signVideo: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4'
  },
  {
    id: '10',
    question: 'Chọn lựa chọn đúng cho ký hiệu có nghĩa "Tôi".',
    type: 'sign-recognition',
    options: ['Tôi', 'Bạn'],
    correctAnswer: 'Tôi',
    explanation: 'Chỉ vào ngực thường có nghĩa là "Tôi".',
    category: 'greetings',
    difficulty: 'easy',
    signVideo: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4'
  }
]

export function getRandomQuestions(category?: string, count: number = 5): QuizQuestion[] {
  let filteredQuestions = quizQuestions
  
  if (category) {
    filteredQuestions = quizQuestions.filter(q => q.category === category)
  }
  
  const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
