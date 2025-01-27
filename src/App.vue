<template>
  <div class="app">
    <div v-if="currentQuestion" class="question-container">
      <h2>{{ currentQuestion.question }}</h2>

      <div v-if="currentQuestion.type === 'single-choice'">
        <label v-for="(answer, index) in currentQuestion.answers" :key="index">
          <input type="radio" :value="answer" v-model="selectedAnswer" />
          {{ answer.answer }}
        </label>
      </div>

      <div v-if="currentQuestion.type === 'input'">
        <input type="text" v-model="inputAnswer" placeholder="Введите ваш ответ" />
      </div>

      <button @click="submitAnswer">Дальше</button>
    </div>

    <div v-else class="result-screen">
      <h2>Вы ответили правильно на {{ correctAnswersCount }} из {{ totalQuestions }} вопросов!</h2>
      <button @click="restartQuiz">Начать заново</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useQuestionsStore } from '@/stores/store'
import { useQuestionLoader } from '@/composables/loadQuestions'

export default defineComponent({
  setup() {
    const store = useQuestionsStore()
    const { loadQuestions } = useQuestionLoader()

    onMounted(() => {
      loadQuestions()
    })

    const selectedAnswer = ref(null)
    const inputAnswer = ref<string>('')

    const totalQuestions = computed(() => store.questions.length)
    const currentQuestion = computed(() => store.getCurrentQuestion())
    const correctAnswersCount = computed(() => store.result)

    const submitAnswer = () => {
      if (currentQuestion.value.type === 'single-choice' && selectedAnswer.value) {
        store.selectAnswer(selectedAnswer.value)
      } else if (currentQuestion.value.type === 'input') {
        store.selectAnswer(currentQuestion.value.answers[0], inputAnswer.value)
      }

      store.nextQuestion()
      selectedAnswer.value = null
      inputAnswer.value = ''
    }

    const restartQuiz = () => {
      store.restartQuiz()
    }

    return {
      currentQuestion,
      totalQuestions,
      correctAnswersCount,
      selectedAnswer,
      inputAnswer,
      submitAnswer,
      restartQuiz,
    }
  },
})
</script>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
  text-align: center;
}

.question-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1.1rem;
}

button:hover {
  background-color: #45a049;
}

.result-screen {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.result-screen h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

input[type='text'] {
  padding: 10px;
  width: 80%;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

label {
  font-size: 1.2rem;
  display: block;
  margin-bottom: 8px;
}
</style>
