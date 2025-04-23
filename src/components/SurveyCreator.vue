<script lang="ts" setup>
import { ref, onMounted } from 'vue'
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

const isLoading = ref(true)

onMounted(() => {
  renderSurveyCreator()
})

async function renderSurveyCreator() {

  const { data } = await api.GET(`survey?id=${props.surveyId}`)

  isLoading.value = false
  if (data) {

    // @ts-ignore
    const creator = new SurveyCreator.SurveyCreator(creatorOptions)
    Survey.surveyLocalization.defaultLocale = 'pt' // set default language to Portuguese
    creator.survey.locale = 'pt'
    creator.locale = 'pt'

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
