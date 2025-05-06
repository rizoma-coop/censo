<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import api from '@/utils/api'
import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'
import type { SurveysRecord } from '@/utils/xata'
import Loading from '@/components/Loading.vue'

type Period = 'before' | 'during' | 'after'
type Language = 'pt' | 'en'

const period = ref<Period>('before')
const survey = ref<SurveysRecord | null>(null)

const language = ref<Language>('pt')

onMounted(async () => {
  survey.value = await getSurvey()
  period.value = getPeriod(survey.value)
  language.value = getLanguage()

  setTimeout(() => {
    renderSurvey(language.value)
  }, 1)
})



const props = defineProps({
  surveyId: {
    type: String,
    required: true
  }
})

const isLoading = ref(false)
const surveyComplete = ref(false)

async function getSurvey() {
  isLoading.value = true
  const { data } = await api.GET(`survey?id=${props.surveyId}`)
  isLoading.value = false
  return data
}

function getLanguage() {
  const urlParams = new URLSearchParams(window.location.search)
  const language = urlParams.get('language') as Language || 'pt'
  return language
}

function renderSurvey(lang: Language = 'pt') {

  const surveyJson = survey.value?.survey

  if (surveyJson) {

    //@ts-ignore
    const survey = new Survey.Model(surveyJson)
    survey.render(document.getElementById('surveyContainer'))

    //@ts-ignore
    Survey.surveyLocalization.defaultLocale = 'pt' // set default language to Portuguese
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

function changeLanguage(event: Event) {
  event.preventDefault()
  const target = event.target as HTMLButtonElement
  const lang = target.dataset.lang as Language
  language.value = lang
  renderSurvey(lang)
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