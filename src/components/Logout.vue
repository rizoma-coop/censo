<template>
  <button @click="logout">
    <slot />
  </button>
</template>


<script setup lang="ts">
import loggedInClass from '@/utils/loggedInClass';
const logout = () => {
  localStorage.removeItem('passwordId')
  window.location.href = '/'
  loggedInClass.remove()
}
</script>