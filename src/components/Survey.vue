<script lang="ts" setup>
import { onMounted, ref, type PropType } from 'vue'
import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'
import Loading from '@/components/Loading.vue'
import api from '@/utils/api'
import type { Language, Period } from '@/types'
import type { SurveysRecord } from '@/utils/xata'

const props = defineProps({
  surveyId: {
    type: String,
    required: true
  },
  surveyJson: {
    type: Object as PropType<SurveysRecord>,
    required: true
  },
  language: {
    type: String as PropType<Language>,
    default: 'pt'
  },
  period: {
    type: String as PropType<Period>,
    default: 'before'
  },
  startDate: Date as PropType<Date | null>,
  endDate: Date as PropType<Date | null>,

})

const language = ref<Language>(props.language)

onMounted(async () => {
  //surveyLocalization.defaultLocale = currentLanguage.value
  //survey.value = new Model(props.surveyJson)
  //survey.value.locale = currentLanguage.value
  //survey.value.onComplete.add(saveAnswer)

  if (props.period === 'during') {
    renderSurvey(props.surveyJson, language.value)
  } else {
    isLoading.value = false
  }
})

const isLoading = ref(false)
const surveyComplete = ref(false)

function renderSurvey(surveyJson: SurveysRecord, lang: Language = 'pt') {

  //@ts-ignore
  if (window.Survey && surveyJson) {
    //@ts-ignore
    const survey = new window.Survey.Model(surveyJson)
    survey.render(document.getElementById('surveyContainer'))

    isLoading.value = false

    //@ts-ignore
    Survey.surveyLocalization.defaultLocale = 'pt' // set default language to Portuguese
    survey.locale = lang

    survey.onComplete.add(saveAnswer)
  } else {
    setTimeout(() => {
      renderSurvey(surveyJson, lang)
    }, 5)
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
  language.value = lang
  renderSurvey(props.surveyJson, lang)
}

</script>

<template>

  <Loading v-if="isLoading" />
  <template v-else>

    <div v-if="surveyComplete">
      <p>Obrigado pela tua participação!</p>
    </div>
    <div v-else class="l-stack">

      <template v-if="period === 'before'">
        <p>O inquérito está a ser preparado.</p>
        <p v-if="startDate && endDate">Estará disponível entre os dias {{ startDate.toLocaleDateString('pt-PT') }} e {{ endDate.toLocaleDateString('pt-PT') }}.</p>
      </template>
      <template v-else-if="period === 'during'">
        <ButtonGroup>
          <Button @click="changeLanguage" :outline="language === 'pt'" data-lang="pt" size="small">Português</Button>
          <Button @click="changeLanguage" :outline="language === 'en'" data-lang="en" size="small">English</Button>
        </ButtonGroup>
        <div id="surveyContainer"></div>
      </template>
      <template v-else>
        <p>O inquérito já terminou. Vamos disponibilizar os resultados em breve.</p>
      </template>

    </div>

  </template>
</template>


<style scoped>
  #surveyContainer {
    width: 100%;
  }
</style>