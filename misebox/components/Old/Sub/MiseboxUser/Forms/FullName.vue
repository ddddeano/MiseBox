      <!-- Full Name Field -->

<template>
  <div class="component" v-if="hasInfo || editingState || createState">
    <!-- Display State -->
    <div v-if="displayState" class="display" @click="enterEditMode">
      <span class="display-subscription-multi-field">{{ subscription.first }} {{ subscription.middle }} {{ subscription.last }}</span>
    </div>

    <!-- Editing State -->
    <div v-if="editingState" class="edit">
      <div class="label">{{ label }}</div>
      <div class="edit-cell">
        <span>{{ subscription.first }} {{ subscription.middle }} {{ subscription.last }}</span>
        <MinusCircleIcon class="icon" @click.stop="clickDelete" />
      </div>
      <CheckCircleIcon class="icon" @click="enterDisplayMode" />
    </div>

    <!-- Create State -->
    <div v-if="createState" class="create">
      <div class="label">{{ label }}</div>
      <div class="create-field">
        <input v-model="model.first" placeholder="First Name" />
      </div>
      <div class="create-field">
        <input v-model="model.middle" placeholder="Middle Name" />
      </div>
      <div class="create-field">
        <input v-model="model.last" placeholder="Last Name" />
      </div>
      <ErrorMessage v-if="error.message" :error="error" @click="resolveError"/>
      <ArrowUpCircleIcon class="icon" @click="clickUpdate" />
    </div>
  </div>
</template>
<script setup>
import { useFirestore } from 'vuefire';
import { doc, updateDoc } from 'firebase/firestore';

const firestore = useFirestore();
const label = "Full Name";
const collectionName = "misebox-users";
const target = "full_name";

const props = defineProps({
  userId: {
    type: String,
    default: "",
  },
  subscription: {
    type: Object,
    default: () => ({
      first: '',
      middle: '',
      last: '',
    }),
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
});

// Computed property
const hasInfo = computed(() => {
  return ['first', 'middle', 'last'].some(field => {
    const value = props.subscription[field];
    return value && value.trim() !== '';
  });
});

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
  model.value.first = model.value.first.trim().replace(/\b\w/g, char => char.toUpperCase());
  model.value.middle = model.value.middle.trim().replace(/\b\w/g, char => char.toUpperCase());
  model.value.last = model.value.last.trim().replace(/\b\w/g, char => char.toUpperCase());
};

const clickUpdate = async () => {
  if (validate()) {
    format(); // Apply formatting before update
    try {
      const documentRef = doc(firestore, collectionName, props.userId);
      await updateDoc(documentRef, { [target]: model.value });
      console.log('Update successful');
      error.value.message = ''; // Clear error on successful update
      enterDisplayMode();
    } catch (err) {
      console.error('Update failed:', err);
    }
  } else {
    console.error('Validation failed');
  }
};

const clickDelete = async () => {
  if (props.userId) {
    try {
      const documentRef = doc(firestore, collectionName, props.userId);
      await updateDoc(documentRef, { [target]: { first: '', middle: '', last: '' } });
      model.value = { first: '', middle: '', last: '' };
      console.log('Delete successful');
      enterEditMode();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }
};

const validate = () => {
  return true; // Always return true for simplicity
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
  model.value = { first: '', middle: '', last: '' };
  enterEditMode();
};
</script>
