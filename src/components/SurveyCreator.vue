<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import api from '@/utils/api'

const isLoading = ref(true)

const creatorOptions = {
  showLogicTab: true,
  isAutoSave: true
}

onMounted(() => {
  renderSurveyCreator()
})

async function renderSurveyCreator() {

  const { data } = await api.get('surveys?id=survey-rizoma-2025')

  isLoading.value = false
  if (data) {

    // @ts-ignore
    const creator = new SurveyCreator.SurveyCreator(creatorOptions)
    creator.text = JSON.stringify(data.survey)
    creator.saveSurveyFunc = (saveNo: any, callback: any) => { 
      console.log('saveNo', saveNo)
      console.log('callback', callback)
    }
    
    creator.render(document.getElementById('surveyCreatorContainer'))
  }
}
</script>

<template>
  <div id="surveyCreatorContainer"></div>
</template>

<style>
  #surveyCreatorContainer {
    height: 100%;
  }
  .svc-creator__banner {
    display: none;
  }
</style>
