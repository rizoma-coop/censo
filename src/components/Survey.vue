<script setup lang="ts">

import 'survey-core/defaultV2.min.css'
import { Model } from 'survey-core'
import { SurveyComponent } from 'survey-vue3-ui'
import surveyJson from '@/model'
const survey = new Model(surveyJson);
</script>

<template>
  <SurveyComponent :model="surveyJson" />
</template>
