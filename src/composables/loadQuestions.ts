import { useQuestionsStore } from '@/stores/store'
import { QuestionFactory } from '@/entity/Question'
import { SingleChoiceAnswer } from '@/entity/Answer'

export function useQuestionLoader() {
  const store = useQuestionsStore()

  const loadQuestions = () => {
    const question1 = QuestionFactory.createSingleChoiceQuestion('Столица Франции?', [
      new SingleChoiceAnswer('Париж', true),
      new SingleChoiceAnswer('Лондон', false),
      new SingleChoiceAnswer('Берлин', false),
    ])

    const question2 = QuestionFactory.createTextQuestion("Кто написал Гамлета'?", 'Шекспир')
    const question3 = QuestionFactory.createSingleChoiceQuestion('Кто разработал Javascript?', [
      new SingleChoiceAnswer('Гуидо Ван Россум', false),
      new SingleChoiceAnswer('Брендан Эйх', true),
    ])
    const question4 = QuestionFactory.createTextQuestion('2 + 2', '4')

    store.loadQuestions([question1, question2, question3, question4])
  }

  return { loadQuestions }
}
