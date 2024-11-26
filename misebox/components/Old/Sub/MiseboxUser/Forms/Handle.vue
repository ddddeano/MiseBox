      <!-- Handle Field -->

<template>
  <div class="component" v-if="hasInfo || editingState || createState">
    <!-- Display State -->
    <div v-if="displayState" class="display" @click="enterEditMode">
      <span class="display-subscription-single-field">{{ subscription }}</span>
    </div>

    <!-- Editing State -->
    <div v-if="editingState" class="edit">
      <div class="label">{{ label }}</div>
      <div class="edit-cell">
        <span>{{ subscription }}</span>
        <MinusCircleIcon class="icon" @click.stop="clickDelete" />
      </div>
      <CheckCircleIcon class="icon" @click="enterDisplayMode" />
      <ErrorMessage v-if="error.message" :error="error" @click="resolveError"/>
    </div>

    <!-- Create State -->
    <div v-if="createState" class="create">
      <div class="label">{{ label }}</div>
      <div class="create-field">
        <input v-model="model" @input="checkHandleUniqueness" placeholder="Enter Handle" />
      </div>
      <ErrorMessage v-if="error.message" :error="error" />
      <ArrowUpCircleIcon v-if="!error.message" class="icon" @click="clickUpdate" />
    </div>
  </div>
</template>

<script setup>
import { useFirestore } from 'vuefire';
import { doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';

const firestore = useFirestore();
const label = "Handle";
const collectionName = "misebox-users";
const target = "handle";

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
  model.value = model.value.trim().toLowerCase(); // Handles are typically lowercase and no spaces
};

const clickUpdate = async () => {
  if (validate()) {
    format();
    try {
      const documentRef = doc(firestore, collectionName, props.userId);
      await updateDoc(documentRef, { [target]: model.value });
      console.log('Handle updated successfully');
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
      console.log('Handle deleted successfully');
      enterEditMode();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }
};

const validate = async () => {
  error.value.message = '';
  if (model.value === props.subscription && hasInfo.value) {
    return true; // If the handle hasn't changed, skip the uniqueness check
  }
  const q = query(collection(firestore, collectionName), where(target, '==', model.value));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    error.value.message = "Handle is already in use";
    return false;
  }
  return true;
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

