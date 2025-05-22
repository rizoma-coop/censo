<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'
import Loading from '@/components/Loading.vue'
import type { SurveysRecord } from '@/utils/xata'
import api from '@/utils/api'
import type { Language, Period } from '@/types'

import { Model } from 'survey-core'

const props = defineProps({
  surveyId: {
    type: String,
    required: true
  },
  survey: {
    type: Object,
    required: true
  },
  language: {
    type: String as () => Language,
    default: 'pt'
  },
  period: {
    type: String as () => Period,
    default: 'before'
  }
})

const currentLanguage = ref(props.language)

onMounted(async () => {
  renderSurvey(props.survey.value, currentLanguage.value)
})


const isLoading = ref(false)
const surveyComplete = ref(false)

function renderSurvey(surveyJson: any, lang: Language) {

  if (surveyJson) {

    const survey = new Model(surveyJson);

    survey.surveyLocalization.defaultLocale = 'pt' // set default language to Portuguese
    survey.locale = lang

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
    alert('Ocorreu um erro ao gravar a tua resposta. Tenta novamente.')
  }
}


function changeLanguage(event: Event) {
  event.preventDefault()
  const target = event.target as HTMLButtonElement
  const lang = target.dataset.lang as Language
  currentLanguage.value = lang
  renderSurvey(props.survey, lang)
}

</script>

<template>

  <Loading v-if="isLoading || !survey" />
  <template v-else>

    <div v-if="surveyComplete">
      <p>Obrigado pela tua participação!</p>
    </div>
    <div v-else class="l-stack">

      <template v-if="period === 'before'">
        <p>O {{survey.title}} está a ser preparado.</p>
        <p v-if="survey.start && survey.end">Estará disponível entre os dias {{ new Date(survey.start).toLocaleDateString('pt-PT') }} e {{ new Date(survey.end).toLocaleDateString('pt-PT') }}.</p>
      </template>
      <template v-else-if="period === 'during'">
        <ButtonGroup>
          <Button @click="changeLanguage" :outline="language === 'pt'" data-lang="pt" size="small">Português</Button>
          <Button @click="changeLanguage" :outline="language === 'en'" data-lang="en" size="small">English</Button>
        </ButtonGroup>
        <div id="surveyContainer"></div>
      </template>
      <template v-else>
        <p>O {{survey.title}} já terminou. Vamos disponibilizar os resultados em breve.</p>
      </template>

    </div>

  </template>
</template>


<style scoped>
  #surveyContainer {
    width: 100%;
  }
</style>