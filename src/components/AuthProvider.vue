<script lang="ts" setup>

import api from '@/utils/api'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import loggedInClass from '@/utils/loggedInClass'
import Loading from '@/components/Loading.vue'

import { ref, onMounted } from 'vue'

const isLoading = ref(true)
const isLoggedIn = ref(false)

onMounted(async () => {
  const passwordId = localStorage.getItem('passwordId')
  
  if (passwordId) {

    isLoading.value = true
    const { data } = await api.GET(`auth?passwordId=${passwordId}`)
    isLoggedIn.value = !!data.passwordId
    if (isLoggedIn.value) {
      loggedInClass.add()
    }
  }
  isLoading.value = false
})

async function handleSubmit(event: Event) {
  const password = (event.target as HTMLFormElement).password.value
  
  isLoading.value = true
  const { data } = await api.GET(`auth?password=${password}`)
  isLoading.value = false  

  if (data.passwordId) {
    isLoggedIn.value = true
    localStorage.setItem('passwordId', data.passwordId)
    loggedInClass.add()
  } else {
    alert('Password errada')
  }
}

</script>

<template>
  <Loading v-if="isLoading" />
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

<style scoped>
  form {
    width: 100%;
    max-width: 30rem;
    margin: 0 auto;
  }
</style>
