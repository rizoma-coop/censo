<script lang="ts" setup>

import api from '@/utils/api'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'

import { ref } from 'vue'

const isLoggedIn = ref(false)

async function handleSubmit(event: Event) {
  const password = (event.target as HTMLFormElement).password.value
  const { data } = await api.get(`auth?password=${password}`)

  if (data.success) {
    isLoggedIn.value = true
  } else {
    alert('Wrong password')
  }
}

</script>

<template>
  <template v-if="isLoggedIn">
    <p>Logged in</p>
  </template>
  <template v-else>
    <form @submit.prevent="handleSubmit" class="l-stack">
      <Input type="password" label="Password" id="password" />
      <Button type="submit">Entrar</Button>
    </form>
  </template>
</template>