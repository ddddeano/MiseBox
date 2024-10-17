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
        <span>
          {{ formattedValue || placeholder }}
        </span>
      </div>
      <!-- Edit Mode -->
      <div v-else class="editing">
        <div
          v-for="(placeholder, key) in placeholders"
          :key="key"
          class="input-group"
        >
          <input
            v-model="localValue[key]"
            :placeholder="placeholder"
            class="editable-input"
          />
        </div>
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
    default: () => ({
    }),
  },
  placeholder: {
    type: String,
    default: '',
  },
});

const isEditing = ref(false);
const localValue = ref({ ...props.firebaseValue }); // Initialize with a copy of firebaseValue

// Computed property for displaying full name
const formattedValue = computed(() => {
  return Object.values(localValue.value).filter(Boolean).join(' ');
});

// Methods
const startEditing = () => {
  localValue.value = { ...props.firebaseValue }; // Reset localValue on edit start
  isEditing.value = true;
};

const cancelEditing = () => {
  isEditing.value = false;
  localValue.value = { ...props.firebaseValue }; // Reset to original value on cancel
};

const updateField = async () => {
  if (!props.documentID) {
    console.error('No document ID provided');
    return;
  }
  try {
    const documentRef = doc(firestore, props.collectionName, props.documentID);
    await updateDoc(documentRef, { [props.target]: localValue.value }); // Update object in Firestore
    isEditing.value = false;
  } catch (error) {
    console.error('Error updating document:', error);
  }
};
</script>
