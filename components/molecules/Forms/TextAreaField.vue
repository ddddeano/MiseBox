<template>
    <div class="form-field">
      <div class="top">
        <label>{{ label }}</label>
        <div class="component-icons">
          <PencilIcon
            v-if="!isEditing"
            class="icon edit-icon"
            @click="pencilButtonClicked"
          />
          <template v-else>
            <CheckCircleIcon
              class="icon confirm-icon"
              @click="checkButtonClicked"
            />
            <MinusCircleIcon
              class="icon cancel-icon"
              @click="minusButtonClicked"
            />
            <XCircleIcon
              v-if="vModel"
              class="icon clear-icon"
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
        <textarea
          v-model="vModel"
          :placeholder="placeholder"
          class="editable-input editable-textarea"
          :maxlength="maxLength"
        ></textarea>
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
  maxLength: {
    type: Number,
    default: null, // Used in the template
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

/* Editable Textarea */
.editable-textarea {
  resize: vertical;
  height: fit-content;
  min-height: 150px;
}

/* For larger screens, allow both vertical and horizontal resizing */
@media (min-width: 768px) {
  .editable-textarea {
    resize: both;
  }
}

</style>