<script lang="ts" setup>
import { ref } from 'vue'
import api from '@/utils/api'
import Button from './Button.vue'

const isLoading = ref(false)
const surveyStarted = ref(false)

async function renderSurvey() {
  isLoading.value = true

  const { data } = await api.get('surveys?id=survey-rizoma-2025')

  isLoading.value = false
  if (data) {
    const surveyJson = data.survey

    // @ts-ignore
    const survey = new Survey.Model(surveyJson)
    
    survey.render(document.getElementById('surveyContainer'))
    surveyStarted.value = true
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
</template>


<style scoped>
  #surveyContainer {
    width: 100%;
  }
</style>