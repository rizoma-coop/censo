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
  outline: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as () => 'medium' | 'small',
    default: 'medium',
  }
})

const attributes = {
  class: `button ${props.outline ? 'button--outline' : ''} button--${props.size}`,
}
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
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  border: 2px solid var(--color-primary);
  color: #FFF;
  font-weight: 500;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;

}
.button--outline {
  background-color: #FFF;
  color: var(--color-primary);
}
.button--small {
  padding: .6rem 1.2rem;
  font-size: 1.2rem;
}

.button-group {
  .button:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .button:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>