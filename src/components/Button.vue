<script lang="ts" setup>
import { computed } from 'vue'


const props = defineProps({
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button',
  },
  href: {
    type: String,
    default: null,
  },
  outline: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as () => 'medium' | 'small',
    default: 'medium',
  }
})


const attributes = computed(() => {
  return {
    class: `button ${props.outline ? 'button--outline' : ''} button--${props.size}`,
  }
})
</script>

<template>
  <a v-if="href" :href="props.href" :class="attributes.class">
    <slot />
  </a>
  <button v-else :type="props.type" :class="attributes.class">
    <slot />
  </button>
</template>


<style scoped>
@import '../css/components/button.css';
</style>