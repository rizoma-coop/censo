<template>
  <button @click="logout">Sair</button>
</template>

<script setup>
  import { isAuthenticated } from '@/stores/auth'

  const logout = () => {
    isAuthenticated.set(false)
  }
</script>