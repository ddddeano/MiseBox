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
      <span class="bio-text" v-html="formattedText"></span>
    </div>

    <!-- Edit Mode -->
    <div v-else class="editing">
      <textarea
        v-model="vModel"
        :placeholder="placeholder"
        class="editable-input editable-textarea"
        :maxlength="maxLength"
      ></textarea>
    </div>

    <!-- Error Message (Always displayed) -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  firebaseValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  maxLength: {
    type: Number,
    default: null,
  },
  collectionName: String,
  documentID: String,
  target: String,
  formattingFunction: Function,
  validationFunction: Function,
})

const {
  isEditing,
  vModel,
  errorMessage,
  startEditing,
  cancelEditing,
  updateField,
  deleteField,
} = useField(props)

const formattedText = computed(() => {
  // Convert newline characters to <br> for display
  return props.firebaseValue.replace(/\n/g, '<br>')
})

const pencilButtonClicked = () => {
  startEditing()
}

const checkButtonClicked = async () => {
  await updateField()
  isEditing.value = false
}

const minusButtonClicked = () => {
  cancelEditing()
}

const deleteButtonClicked = async () => {
  await deleteField()
}
</script>

<style scoped>
.bio-text {
  white-space: pre-wrap; /* Ensures that spaces and line breaks are preserved */
}
</style>
