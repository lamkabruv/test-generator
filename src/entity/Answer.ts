import type { IsAnswer } from '@/interface/interface'

export abstract class Answer implements IsAnswer {
  answer: string
  isCorrect: boolean

  constructor(answer: string, isCorrect: boolean) {
    this.answer = answer
    this.isCorrect = isCorrect
  }

  abstract checkIfCorrect(input?: string): boolean
}

export class SingleChoiceAnswer extends Answer {
  checkIfCorrect(): boolean {
    return this.isCorrect
  }
}

export class InputTextAnswer extends Answer {
  checkIfCorrect(input: string): boolean {
    return input.trim().toLowerCase() === this.answer.trim().toLowerCase()
  }
}
