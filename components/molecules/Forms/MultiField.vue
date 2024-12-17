<!-- components/molecules/forms/MultiField.vue -->
<template>
    <div class="form-field">
      <div class="top">
        <label>{{ label }}</label>
        <!-- Controls in the Header -->
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
              v-if="Object.values(localValue).some(Boolean)"
              class="icon clear-icon"
              @click="deleteButtonClicked"
            />
          </template>
        </div>
      </div>

      <!-- Display Mode -->
      <div v-if="!isEditing" class="display">
        <span>{{ orderedFormattedValue }}</span>
      </div>

      <!-- Edit Mode -->
      <div v-else class="editing">
        <div
          v-for="(placeholder, key) in orderedPlaceholders"
          :key="key"
          class="input-group"
        >
          <input
            v-model="localValue[key]"
            :placeholder="placeholder"
            class="editable-input"
          />
        </div>
        <!-- Error Message -->
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { doc, updateDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

const firestore = useFirestore();

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  firebaseValue: {
    type: Object,
    default: () => ({}),
  },
  collectionName: {
    type: String,
    default: '',
  },
  documentID: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: '',
  },
  placeholders: {
    type: Object,
    default: () => ({}),
  },
  formattingFunction: {
    type: Function,
    default: null, // No formatting by default
  },
  validationFunction: {
    type: Function,
    default: null, // No validation by default
  },
});

const isEditing = ref(false);
const localValue = ref({ ...props.firebaseValue }); // Initialize with a copy of firebaseValue
const errorMessage = ref(''); // Error message for validation feedback

// Sort placeholders based on the key order
const orderedPlaceholders = computed(() => {
  return Object.entries(props.placeholders)
    .sort(([keyA], [keyB]) => keyA - keyB) // Sort by keys to preserve the passed order
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
});

// Computed property for displaying the formatted value following the order of the placeholders
const orderedFormattedValue = computed(() => {
  return Object.keys(orderedPlaceholders.value)
    .map((key) => localValue.value[key])
    .filter(Boolean)
    .join(', ');
});

// Button actions

const deleteButtonClicked = async () => {
  Object.keys(localValue.value).forEach(key => {
    localValue.value[key] = ''; // Clear all fields
  });
  await updateField(); // Update Firestore with the cleared values
  isEditing.value = true; // Keep the edit mode open
};

const pencilButtonClicked = () => {
  errorMessage.value = '';
  localValue.value = { ...props.firebaseValue };
  isEditing.value = true;
};

const checkButtonClicked = async () => {
  isEditing.value = false;
  await updateField();
};

const minusButtonClicked = () => {
  errorMessage.value = '';
  localValue.value = { ...props.firebaseValue };  // Reset fields to original value
  isEditing.value = false;  // Close the editing mode without saving
};

// Validation and Firestore update logic

const validateInput = async () => {
  errorMessage.value = '';
  const value = localValue.value;

  if (props.validationFunction) {
    const validationResult = await props.validationFunction(value);
    if (validationResult) {
      errorMessage.value = validationResult;
      return false;
    }
  }

  return true;
};

const updateField = async () => {
  if (!props.documentID) {
    console.error('No document ID provided');
    return;
  }

  const isValid = await validateInput();
  if (!isValid) return;

  const formattedValue = props.formattingFunction
    ? props.formattingFunction(localValue.value)
    : localValue.value;

  try {
    const documentRef = doc(firestore, props.collectionName, props.documentID);
    await updateDoc(documentRef, { [props.target]: formattedValue });
    console.log('Document updated in Firestore:', formattedValue);
    errorMessage.value = '';
  } catch (error) {
    console.error('Error updating document:', error);
  }
};
</script>

<style scoped>
/* Include your shared styles or specific styles here */
</style>
