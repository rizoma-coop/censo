<script lang="ts" setup>
const props = defineProps({
  class: String
})
</script>

<template>
  <div :class="`button-group ${props.class}`">
    <slot />
  </div>
</template>