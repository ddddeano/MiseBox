<template>
  <div class="form-field">
    <div class="top">
      <label>{{ label }}</label>
      <div class="component-icons">
        <PencilIcon
          v-if="!isEditing"
          class="icon field-icon edit-icon"
          @click="pencilButtonClicked"
        />
        <template v-else>
          <CheckCircleIcon
            class="icon field-icon confirm-icon"
            @click="checkButtonClicked"
          />
          <MinusCircleIcon
            class="icon field-icon cancel-icon"
            @click="minusButtonClicked"
          />
          <XCircleIcon
            v-if="vModel"
            class="icon field-icon clear-icon"
            @click="deleteButtonClicked"
          />
        </template>
      </div>
    </div>

    <!-- Display Mode -->
    <div v-if="!isEditing" class="display">
      <span>{{ firebaseValue || placeholder }}</span>
    </div>

    <!-- Edit Mode -->
    <div v-else class="editing">
      <input
        v-model="vModel"
        :placeholder="placeholder"
        class="editable-input"
      />
      <!-- Error Message -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  label: {
    type: String,
    default: '', // Critical for rendering
  },
  firebaseValue: {
    type: String,
    default: '', // Critical for rendering
  },
  placeholder: {
    type: String,
    default: '', // Critical for rendering
  },
  // Other props without default values
  collectionName: String,
  documentID: String,
  target: String,
  formattingFunction: Function,
  validationFunction: Function,
});

const {
  isEditing,
  vModel,
  errorMessage,
  startEditing,
  cancelEditing,
  updateField,
  deleteField,
} = useField(props);

const pencilButtonClicked = () => {
  startEditing();
};

const checkButtonClicked = async () => {
  await updateField();
  isEditing.value = false;
};

const minusButtonClicked = () => {
  cancelEditing();
};

const deleteButtonClicked = async () => {
  await deleteField();
};
</script>

<style scoped>
/* Include your shared styles or specific styles here */
</style>
