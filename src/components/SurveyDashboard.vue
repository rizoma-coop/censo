<script setup lang="ts">
import 'survey-analytics/survey.analytics.css'
import { onMounted, ref, type PropType } from 'vue'
import Loading from '@/components/Loading.vue'
import type { SurveysRecord, AnswersRecord } from '@/utils/xata'

const props = defineProps({
  surveyJson: {
    type: Object as PropType<SurveysRecord>,
    required: true
  },
  answersJson: {
    type: Array as PropType<AnswersRecord[]>,
    required: true
  }
})

const isLoading = ref(true)

onMounted(async () => {
  setTimeout(() => {
    renderDashboard(props.surveyJson, props.answersJson)
  }, 10);
})

async function renderDashboard(surveyJson: SurveysRecord, answersJson: AnswersRecord[]) {

  if (surveyJson && answersJson) {
    // @ts-ignore
    const survey = new Survey.Model(surveyJson)
    // @ts-ignore
    const vizPanel = new SurveyAnalytics.VisualizationPanel(
      survey.getAllQuestions(),
      answersJson
    )

    vizPanel.render(document.getElementById('surveyDashboardContainer'))

    isLoading.value = false
  }
}

</script>

<template>
  <div id="surveyDashboardContainer">
    <Loading v-if="isLoading" />
  </div>
</template>