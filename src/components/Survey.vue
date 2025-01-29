<script lang="ts" setup>
import { onMounted } from 'vue'
import api from '@/utils/api'

onMounted(async () => {

  const {data, error} = await api.get('surveys?id=survey-rizoma-2025')

  if (data) {
    const surveyJson = data.survey

    // @ts-ignore
    const survey = new Survey.Model(surveyJson)
    
    survey.render(document.getElementById('surveyContainer'))
  }
})

</script>

<template>
  <div id="surveyContainer"></div>
</template>


<style scoped>
  #surveyContainer {
    width: 100%;
  }
</style>