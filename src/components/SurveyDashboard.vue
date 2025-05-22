<script setup lang="ts">
import { onMounted, ref } from 'vue'
import api from '@/utils/api'
import Loading from '@/components/Loading.vue'

const props = defineProps({
  surveyId: {
    type: String,
    required: true
  },
  answers: Array,
  survey: Object
})

onMounted(async () => {
  renderDashboard(props.survey, props.answers)
})

async function renderDashboard(surveyJson: any, surveyResults: any) {

  if (surveyJson && surveyResults) {
    //@ts-ignore
    const survey = new Survey.Model(surveyJson)
    //@ts-ignore
    const vizPanel = new SurveyAnalytics.VisualizationPanel(
      survey.getAllQuestions(),
    )

    vizPanel.render(document.getElementById('surveyDashboardContainer'));
  }
}

</script>

<template>
  <div id="surveyDashboardContainer">
    <Loading client:load />
  </div>
</template>