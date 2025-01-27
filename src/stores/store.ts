import { defineStore } from 'pinia'
import { Question } from '@/entity/Question'
import { Answer, SingleChoiceAnswer, InputTextAnswer } from '@/entity/Answer'

export const useQuestionsStore = defineStore('questions', {
  state: () => ({
    questions: [] as Question[],
    currentQuestionIndex: 0,
    result: 0,
  }),

  actions: {
    loadQuestions(questions: Question[]) {
      this.questions = questions
    },

    selectAnswer(answer: Answer, input?: string) {
      if (answer instanceof InputTextAnswer && input && answer.checkIfCorrect(input)) {
        this.result++
      } else if (answer instanceof SingleChoiceAnswer && answer.checkIfCorrect()) {
        this.result++
      }
    },

    getCurrentQuestion(): Question {
      return this.questions[this.currentQuestionIndex]
    },

    nextQuestion() {
      this.currentQuestionIndex++
    },

    restartQuiz() {
      this.currentQuestionIndex = 0
      this.result = 0
    },
  },
})
