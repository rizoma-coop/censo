<script lang="ts" setup>

import api from '@/utils/api'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import Loading from '@/components/Loading.vue'
import loggedInClass from '@/utils/loggedInClass'

import { ref, onMounted } from 'vue'

const isLoading = ref(true)

onMounted(() => {
  if (localStorage.getItem('passwordId')) {
    loggedInClass.add()
  } else {
    isLoading.value = false
  }
})

async function handleSubmit(event: Event) {
  const password = (event.target as HTMLFormElement).password.value

  isLoading.value = true
  const { data } = await api.GET(`auth?password=${password}`)

  if (data.passwordId) {
    localStorage.setItem('passwordId', data.passwordId)
    loggedInClass.add()
  } else {
    isLoading.value = false
    alert('Password errada')
  }
}

</script>

<template>
  <Loading v-if="isLoading" />
  <form v-else @submit.prevent="handleSubmit" class="l-stack">
    <Input type="password" label="Password" id="password" />
    <Button type="submit">Entrar</Button>
  </form>
</template>

<style scoped>
  form {
    width: 100%;
    max-width: 30rem;
    margin: 0 auto;
  }
</style>
