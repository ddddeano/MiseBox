<template>
  <div class="component">
    <div class="form-field">
      <div class="top">
        <label>{{ label }}</label>
        <!-- Controls in the Header -->
        <div class="component-icons">
          <PencilIcon
            v-if="!isEditing"
            class="icon edit-icon"
            @click="startEditing"
          />
          <template v-else>
            <CheckCircleIcon
              class="icon confirm-icon"
              @click="updateField"
            />
            <XCircleIcon
              class="icon cancel-icon"
              @click="cancelEditing"
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { doc, updateDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

const firestore = useFirestore();

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  firebaseValue: {
    type: String,
    default: '',
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
  placeholder: {
    type: String,
    default: '',
  },
  maxLength: {
    type: Number,
    default: null,
  },
});

const isEditing = ref(false);
const vModel = ref(props.firebaseValue); // Initialize with the value passed from Firestore

// Methods
const startEditing = () => {
  vModel.value = props.firebaseValue; // Reset the value when entering edit mode
  isEditing.value = true;
};

const cancelEditing = () => {
  isEditing.value = false;
  vModel.value = props.firebaseValue; // Reset to the original value on cancel
};

const updateField = async () => {
  if (!props.documentID) {
    console.error('No document ID provided');
    return;
  }
  try {
    const documentRef = doc(firestore, props.collectionName, props.documentID);
    await updateDoc(documentRef, { [props.target]: vModel.value }); // Update the field in Firestore
    isEditing.value = false;
  } catch (error) {
    console.error('Error updating document:', error);
  }
};
</script>
