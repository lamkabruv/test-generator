export interface IsQuestion {
  question: string
  type: 'single-choice' | 'input'
  answers: IsAnswer[]
}

export interface IsAnswer {
  answer: string
  isCorrect: boolean

  checkIfCorrect(): boolean
}
