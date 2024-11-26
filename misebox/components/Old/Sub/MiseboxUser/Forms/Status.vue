      <!-- Status -->

<template>
  <div class="component" v-if="hasInfo || editingState || createState">
    <!-- Display State -->
   slot

    <!-- Editing State -->
  slot

    <!-- Create State -->
 slot
  </div>
</template>
<script setup>
import { useFirestore } from 'vuefire';
import { doc, updateDoc } from 'firebase/firestore';

const firestore = useFirestore();
const label = "Status";
const collectionName = "misebox-users";
const target = "status";

const props = defineProps({
  userId: {
    type: String,
    default: "",
  },
  subscription: {
    type: String,
    default: "",
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
});

// Computed property
const hasInfo = computed(() => props.subscription.trim() !== '');

// State
const displayState = ref(!props.isEditing);
const editingState = ref(props.isEditing);
const createState = ref(false);
const error = ref({ message: '' });

// Watcher for isEditing prop
watch(() => props.isEditing, (newVal) => {
  if (newVal) {
    enterEditMode();
  } else {
    editingState.value = false;
    createState.value = false;
  }
  displayState.value = !newVal;
});

// Model
const model = ref(props.subscription);

// Methods
const format = () => {
  model.value = model.value.trim().replace(/\b\w/g, char => char.toUpperCase()); // Convert to title case
};

const clickUpdate = async () => {
  if (validate()) {
    format();
    try {
      const documentRef = doc(firestore, collectionName, props.userId);
      await updateDoc(documentRef, { [target]: model.value });
      console.log('Status updated successfully');
      error.value.message = ''; // Clear error on successful update
      enterDisplayMode();
    } catch (err) {
      console.error('Update failed:', err);
    }
  }
};

const clickDelete = async () => {
  if (props.userId) {
    try {
      const documentRef = doc(firestore, collectionName, props.userId);
      await updateDoc(documentRef, { [target]: '' });
      model.value = '';
      console.log('Status deleted successfully');
      enterEditMode();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }
};

const validate = () => {
  return true; // Simple validation as status is just a string
};

// State management
const enterEditMode = () => {
  displayState.value = false;
  editingState.value = hasInfo.value;
  createState.value = !hasInfo.value;
};

const enterDisplayMode = () => {
  editingState.value = false;
  createState.value = false;
  displayState.value = true;
};

// Error resolution
const resolveError = () => {
  error.value.message = ''; // Clear the error message
  model.value = "";
  enterEditMode();
};
</script>
