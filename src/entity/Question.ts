import type { IsQuestion } from '@/interface/interface'
import { Answer, SingleChoiceAnswer, InputTextAnswer } from './Answer'

export abstract class Question implements IsQuestion {
  question: string
  type: 'single-choice' | 'input'
  answers: Answer[]

  constructor(question: string, type: 'single-choice' | 'input', answers: Answer[]) {
    this.question = question
    this.type = type
    this.answers = answers
  }
}

export class SingleChoiceQuestion extends Question {
  constructor(question: string, answers: Answer[]) {
    super(question, 'single-choice', answers)
  }
}

export class InputTextQuestion extends Question {
  constructor(question: string, answers: Answer[]) {
    super(question, 'input', answers)
  }
}

export class QuestionFactory {
  static createSingleChoiceQuestion(questionText: string, answers: Answer[]): SingleChoiceQuestion {
    return new SingleChoiceQuestion(questionText, answers)
  }

  static createTextQuestion(questionText: string, correctAnswer: string): InputTextQuestion {
    const answer = new InputTextAnswer(correctAnswer, true)
    return new InputTextQuestion(questionText, [answer])
  }
}

// Тут полежит, потом надо будет соединить с пинией, потом в компосабл
export const question1 = QuestionFactory.createSingleChoiceQuestion(
  'What is the capital of France?',
  [
    new SingleChoiceAnswer('Paris', true),
    new SingleChoiceAnswer('London', false),
    new SingleChoiceAnswer('Berlin', false),
  ],
)

export const question2 = QuestionFactory.createTextQuestion("Who wrote 'Hamlet'?", 'Shakespeare')
