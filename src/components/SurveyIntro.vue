<script setup lang="ts">
import Button from '@/components/Button.vue'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  surveyStartDate: Date
  surveyEndDate: Date
}>()

type Period = 'before' | 'during' | 'after'
const period = ref<Period | null>(null)

function getPeriod() {
  const today = new Date()
  if (today.getTime() < props.surveyStartDate.getTime()) {
    return 'before'
  } else if (today.getTime() > props.surveyEndDate.getTime()) {
    return 'after'
  } else {
    return 'during'
  }
}

onMounted(() => {
  period.value = getPeriod()
})

</script>

<template>
  <template v-if="period === 'before'">
    <p>O Censo está a ser preparado.</p>
    <p>Estará disponível entre os dias {{ props.surveyStartDate.toLocaleDateString('pt-PT') }} e {{ props.surveyEndDate.toLocaleDateString('pt-PT') }}.</p>
  </template>
  <template v-else-if="period === 'during'">
    <p>Preenche o censo 2025 até dia {{ props.surveyEndDate.toLocaleDateString('pt-PT') }}.</p>
    <Button href="/censo/">Preencher Censo 2025</Button>
  </template>
  <template v-else>
    <p>O Censo 2025 já terminou. Vamos disponibilizar os resultados em breve.</p>
  </template>
</template>

<style scoped>
p {
  font-size: clamp(1rem, 2.5vw, 2rem);
  text-align: center;
}
</style>

