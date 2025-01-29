<script lang="ts" setup>

import api from '@/utils/api'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'

import { ref, onMounted } from 'vue'

const isLoading = ref(true)
const isLoggedIn = ref(false)

onMounted(async () => {
  const passwordId = localStorage.getItem('passwordId')
  
  if (passwordId) {

    isLoading.value = true
    const { data } = await api.get(`auth?passwordId=${passwordId}`)
    isLoggedIn.value = !!data.passwordId
    isLoading.value = false
  }
  isLoading.value = false
})

async function handleSubmit(event: Event) {
  const password = (event.target as HTMLFormElement).password.value
  
  isLoading.value = true
  const { data } = await api.get(`auth?password=${password}`)
  isLoading.value = false  

  if (data.passwordId) {
    isLoggedIn.value = true
    localStorage.setItem('passwordId', data.passwordId)
  } else {
    alert('Wrong password')
  }
}

</script>

<template>
  <p v-if="isLoading">Loading...</p>
  <template v-else>
    <template v-if="isLoggedIn">
      <slot />
    </template>
    <template v-else>
      <form @submit.prevent="handleSubmit" class="l-stack">
        <Input type="password" label="Password" id="password" />
        <Button type="submit">Entrar</Button>
      </form>
    </template>
  </template>
</template>