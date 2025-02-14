<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import api from '@/utils/api'
import Button from './Button.vue'
import type { SurveysRecord } from '@/utils/xata'
import Loading from '@/components/Loading.vue'

type Period = 'before' | 'during' | 'after'

const period = ref<Period>('before')
const survey = ref<SurveysRecord | null>(null)

onMounted(async () => {
  survey.value = await getSurvey()
  period.value = getPeriod(survey.value)
})

const props = defineProps({
  surveyId: {
    type: String,
    required: true
  }
})

const isLoading = ref(false)
const surveyStarted = ref(false)
const surveyComplete = ref(false)

async function getSurvey() {
  isLoading.value = true
  const { data } = await api.GET(`survey?id=${props.surveyId}`)
  isLoading.value = false
  return data
}

function renderSurvey() {

  const surveyJson = survey.value?.survey

  if (surveyJson) {

    //@ts-ignore
    const survey = new Survey.Model(surveyJson)

    survey.render(document.getElementById('surveyContainer'))
    surveyStarted.value = true

    survey.onComplete.add(saveAnswer)
  }
}

async function saveAnswer(sender: any) {

  const {data, error} = await api.POST('answer', {
    surveyId: props.surveyId,
    answer: JSON.stringify(sender.data)
  })

  if (!error) {
    surveyComplete.value = true
  } else {
    alert('Ocorreu um erro ao gravar a tua resposta. Por favor, tenta novamente.')
  }
}

function getPeriod(survey: SurveysRecord | null): Period {
  if (survey && survey.start && survey.end) {
    const today = new Date()
    const start = new Date(survey.start)
    const end = new Date(survey.end)

    if (today.getTime() < start.getTime()) {
      return 'before'
    } else if (today.getTime() > end.getTime()) {
      return 'after'
    } else {
      return 'during'
    }
  } else {
    return 'before'
  }
}

</script>

<template>

  <Loading v-if="isLoading || !survey" />
  <template v-else>
    <div v-if="!surveyStarted" class="l-stack">

      <div v-if="survey.introduction" v-html="survey.introduction" class="l-stack"></div>

      <p v-if="survey.start && survey.end">Período: de {{new Date(survey.start).toLocaleDateString('pt-PT')}} a {{new Date(survey.end).toLocaleDateString('pt-PT')}}</p>

      <template v-if="period === 'before'">
        <p>O {{survey.title}} está a ser preparado.</p>
        <p v-if="survey.start && survey.end">Estará disponível entre os dias {{ new Date(survey.start).toLocaleDateString('pt-PT') }} e {{ new Date(survey.end).toLocaleDateString('pt-PT') }}.</p>
      </template>
      <template v-else-if="period === 'during'">
        <p v-if="survey.end">Preenche o {{survey.title}} até dia {{ new Date(survey.end).toLocaleDateString('pt-PT') }}.</p>
      </template>
      <template v-else>
        <p>O {{survey.title}} já terminou. Vamos disponibilizar os resultados em breve.</p>
      </template>
      <div class="l-row l-row--small" v-if="period === 'during'">
        <Button @click="renderSurvey">Iniciar</Button>
      </div>

    </div>
    <div id="surveyContainer"></div>

    <div v-if="surveyComplete">
      <p>Obrigado pela tua participação!</p>
    </div>
  </template>
</template>


<style scoped>
  #surveyContainer {
    width: 100%;
  }
</style>