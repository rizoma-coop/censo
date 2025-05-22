<script lang="ts" setup>
import { onMounted } from 'vue'
import api from '@/utils/api'
import Loading from '@/components/Loading.vue'

const props = defineProps({
  surveyId: {
    type: String,
    required: true
  }
})

const creatorOptions = {
  showLogicTab: true,
  isAutoSave: true,
  showTranslationTab: true
}

onMounted(() => {
  renderSurveyCreator()
})

async function renderSurveyCreator() {

  const { data } = await api.GET(`survey?id=${props.surveyId}`)

  if (data) {

    // @ts-ignore
    const creator = new SurveyCreator.SurveyCreator(creatorOptions)

    //@ts-ignore
    Survey.surveyLocalization.defaultLocale = 'pt' // set default language to Portuguese
    //@ts-ignore
    Survey.surveyLocalization.supportedLocales = ['pt', 'en'];

    creator.text = JSON.stringify(data.survey)
    creator.saveSurveyFunc = async () => {
      const response = await api.PUT('survey', {
        id: props.surveyId,
        survey: creator.text,
      })

      if (response.error) {
        alert('Não foi possível gravar o questionário')
      }
    }

    creator.render(document.getElementById('surveyCreatorContainer'))
  }
}
</script>

<template>
  <div id="surveyCreatorContainer">
    <Loading client:load />
  </div>
</template>

<style>
  #surveyCreatorContainer {
    height: 100%;
  }
  .svc-creator__banner {
    display: none;
  }
</style>
