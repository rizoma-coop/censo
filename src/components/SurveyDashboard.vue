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
  renderDashboard(props.surveyJson, props.answersJson)
})

async function renderDashboard(surveyJson: SurveysRecord, answersJson: AnswersRecord[]) {

  // @ts-ignore
  if (window.Survey && window.SurveyAnalytics) {

    if (surveyJson && answersJson) {
      // @ts-ignore
      const survey = new window.Survey.Model(surveyJson)
      // @ts-ignore
      const vizPanel = new window.SurveyAnalytics.VisualizationPanel(
        survey.getAllQuestions(),
        answersJson
      )

      vizPanel.render(document.getElementById('surveyDashboardContainer'))

      isLoading.value = false
    }
  } else {
    setTimeout(() => {
      renderDashboard(surveyJson, answersJson)
    }, 10);
  }
}

</script>

<template>
  <div id="surveyDashboardContainer">
    <Loading v-if="isLoading" />
  </div>
</template>