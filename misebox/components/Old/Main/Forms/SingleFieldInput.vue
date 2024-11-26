<template>
  <div class="edit-container">
    <div class="label-close-wrapper">
      <label :for="inputId" class="edit-label">{{ label }}</label>
      <XMarkIcon class="close-button" @click.stop="cancelEdit" />
    </div>
    <div class="input-button-wrapper">
      <input
        :type="type"
        :id="inputId"
        :value="model"
        @input="$emit('update:model', $event.target.value)"
        :class="inputClass"
        :placeholder="placeholder"
      />
      <ArrowUpCircleIcon @click.stop="updateModel" class="update-icon" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  inputId: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  inputClass: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  cancelEdit: {
    type: Function,
    required: true,
  },
  updateModel: {
    type: Function,
    required: true,
  },
});
</script>
