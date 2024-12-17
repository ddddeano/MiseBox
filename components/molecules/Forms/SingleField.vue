<!-- components/molecules/forms/SingleField.vue -->
<template>
  <div class="form-field">
    <div class="top">
      <label>{{ label }}</label>
      <div class="component-icons">
        <PencilIcon
          v-if="!isEditing"
          class="icon"
          @click="pencilButtonClicked"
        />
        <template v-else>
          <CheckCircleIcon
            class="icon"
            @click="checkButtonClicked"
          />
          <MinusCircleIcon
            class="icon"
            @click="minusButtonClicked"
          />
          <XCircleIcon
            v-if="vModel"
            class="icon"
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
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  firebaseValue: String,
  collectionName: String,
  documentID: String,
  target: String,
  placeholder: String,
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
/* No local styles - all styles are moved to shared/global */
</style>
