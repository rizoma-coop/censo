<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: 'text',
  },
  id: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div>
    <label :for="id">{{ label }}</label>
    <input :type="type" :id="id" />
  </div>
</template>

<style scoped>
label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
</style>
