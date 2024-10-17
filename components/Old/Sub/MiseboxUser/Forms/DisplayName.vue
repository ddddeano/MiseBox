      <!-- Display Name Field -->

<template>
  <div class="component" v-if="hasInfo || editingState || createState">
    <!-- Display State -->
    <div v-if="displayState" class="display" @click="enterEditMode">
      <span class="display-name">{{ subscription }}</span>
    </div>

    <!-- Editing State -->
    <div v-if="editingState" class="edit">
      <div class="label">{{ label }}</div>
      <div class="edit-cell">
        <span>{{ subscription }}</span>
        <MinusCircleIcon class="icon" @click.stop="clickDelete" />
      </div>
      <CheckCircleIcon class="icon" @click="enterDisplayMode" />
    </div>

    <!-- Create State -->
    <div v-if="createState" class="create">
      <div class="label">{{ label }}</div>
      <div class="create-field">
        <input v-model="model" placeholder="Display Name" />
      </div>
      <ErrorMessage v-if="error.message" :error="error" @click="resolveError"/>
      <ArrowUpCircleIcon v-else class="icon" @click="clickUpdate" />
    </div>
  </div>
</template>

<script setup>
import { useFirestore } from 'vuefire';
import { doc, updateDoc } from 'firebase/firestore';

const firestore = useFirestore();
const label = "Display Name";
const collectionName = "misebox-users";
const target = "display_name";

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
    format(); // Apply formatting before update
    try {
      const documentRef = doc(firestore, collectionName, props.userId);
      await updateDoc(documentRef, { [target]: model.value });
      console.log('Display name updated successfully');
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
      console.log('Display name deleted successfully');
      enterEditMode();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }
};

const validate = () => {
  return true; // Simple validation, always return true
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
  error.value.message = '';
  model.value = "";
  enterEditMode();
};
</script>
