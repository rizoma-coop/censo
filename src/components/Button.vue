<script lang="ts" setup>

const props = defineProps({
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button',
  },
  href: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <a v-if="href" :href="props.href" class="button">
    <slot />
  </a>
  <button v-else :type="props.type" class="button">
    <slot />
  </button>
</template>


<style scoped>
@import '@/css/components/button.css';
</style>