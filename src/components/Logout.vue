<template>
  <button @click="logout">
    <slot />
  </button>
</template>


<script setup lang="ts">
import { isAuthenticated } from '@/stores/auth'

const logout = () => {
  localStorage.removeItem('passwordId')
  window.location.href = '/'
  isAuthenticated.set(false)
}
</script>