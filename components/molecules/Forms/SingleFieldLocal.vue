<!-- components/molecules/forms/SingleFieldLocal.vue -->
<template>
  <div class="form-field-local">
    <label v-if="label" class="form-label">{{ label }}</label>
    <input
      v-model="localValue"
      :placeholder="placeholder"
      class="editable-input"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:value']);

const localValue = ref(props.value);

watch(
  () => localValue.value,
  (newValue) => {
    emit('update:value', newValue);
  }
);
</script>

<style scoped>
.form-field-local {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs); /* Space between label and input */
  width: 100%; /* Ensure full width */
}

</style>
