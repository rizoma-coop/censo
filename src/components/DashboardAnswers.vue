<script setup lang="ts">
import api from '@/utils/api'
import { onMounted, ref } from 'vue'
import Loading from '@/components/Loading.vue'

const isLoading = ref(true)
const answers = ref<number | null>(null)

onMounted(async () => {

  const { data, error } = await api.GET(`answers?surveyId=survey-comunicacao-comunidade`)
  isLoading.value = false

  if (!error) {
    answers.value = data.length
  }
})
</script>

<template>
  <Loading size="small" v-if="isLoading" />
  <span v-else>
    {{ answers }}
  </span>
</template>

