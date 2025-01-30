<script lang="ts" setup>
import { ref } from 'vue'
import api from '@/utils/api'
import Button from './Button.vue'

const props = defineProps({
  surveyId: {
    type: String,
    required: true
  }
})

const isLoading = ref(false)
const surveyStarted = ref(false)
const surveyComplete = ref(false)

async function renderSurvey() {
  isLoading.value = true

  const { data } = await api.GET(`survey?id=${props.surveyId}`)

  isLoading.value = false
  if (data) {
    const surveyJson = data.survey

    // @ts-ignore
    const survey = new Survey.Model(surveyJson)

    survey.render(document.getElementById('surveyContainer'))
    surveyStarted.value = true

    survey.onComplete.add(saveAnswer)
  }
}

async function saveAnswer(sender: any) {

  const {data, error} = await api.POST('answer', {
    answer: JSON.stringify(sender.data)
  })

  if (!error) {
    surveyComplete.value = true
  } else {
    alert('Ocorreu um erro ao gravar a tua resposta. Por favor, tenta novamente.')
  }
}

</script>

<template>
  <div v-if="!surveyStarted" class="l-stack">
    <p>O Censo Rizoma é uma iniciativa da RizomaCoop, que visa perceber a população da cooperativa.</p>
    <ul>
      <li>Demora entre 8 e 10 minutos.</li>
      <li>É completamente anónimo.</li>
    </ul>
    <div>
      <Button @click="renderSurvey">Iniciar</Button>
    </div>
  </div>
  <div id="surveyContainer"></div>

  <div v-if="surveyComplete">
    <p>Obrigado pela tua participação!</p>
  </div>
</template>


<style scoped>
  #surveyContainer {
    width: 100%;
  }
</style>