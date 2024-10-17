<template>
  <div class="profile-forms">
    <!-- Display Mode -->
    <div v-if="state === 'display'" @click="enterEditMode">
      <!-- Loop through items if there are any -->
      <div v-if="items.length" v-for="(item, index) in items" :key="index">
        {{ item }}
      </div>
    </div>

    <!-- Editing Mode -->
    <div v-else-if="state === 'edit'">
      <div v-for="(item, index) in items" :key="index" class="edit-item">
        {{ item }}
        <XCircleIcon class="icon delete-icon" @click="deleteItem(index)" />
      </div>
    </div>

    <!-- Create Block -->
    <div v-if="state === 'edit' && createState || !items.length">
      <input
        v-model="newItem"
        :placeholder="placeholder"
        class="editable-text"
      />
      <div class="icon-container">
        <PlusCircleIcon class="icon add-icon" @click="addItem" />
        <MinusCircleIcon class="icon cancel-icon" @click="cancelCreate" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import { ref, watch } from 'vue';

const firestore = useFirestore();

const props = defineProps({
  userId: { type: String, required: true },
  items: { type: Array, default: () => [] },
  isEditing: { type: Boolean, default: false },
  collectionName: { type: String, required: true },
  target: { type: String, required: true },
  placeholder: { type: String, default: 'Enter a speciality' }
});

const newItem = ref('');
const state = ref('display');
const createState = ref(false);

// Watch for isEditing changes to toggle between display and edit states
watch(() => props.isEditing, (newVal) => {
  if (newVal) {
    enterEditMode();
  } else {
    state.value = 'display';
  }
});

// Function to enter edit mode, automatically enter create mode if no items
const enterEditMode = () => {
  state.value = 'edit';
  createState.value = true;
};

// Helper function to convert string to title case
const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

// Method to delete an item in edit mode, interacting with Firestore
const deleteItem = async (index) => {
  const itemToRemove = props.items[index];
  try {
    const documentRef = doc(firestore, props.collectionName, props.userId);
    await updateDoc(documentRef, {
      [props.target]: arrayRemove(itemToRemove)
    });
  } catch (error) {
    console.error('Error removing item from Firebase:', error);
  }
};

// Method to add a new item in create mode, interacting with Firestore
const addItem = async () => {
  if (!newItem.value.trim()) return;
  
  const titleCaseItem = toTitleCase(newItem.value.trim());
  
  try {
    const documentRef = doc(firestore, props.collectionName, props.userId);
    await updateDoc(documentRef, {
      [props.target]: arrayUnion(titleCaseItem)
    });
    newItem.value = '';
    enterEditMode();
  } catch (error) {
    console.error('Error adding item to Firebase:', error);
  }
};

// Method to cancel create mode and switch back to display
const cancelCreate = () => {
  createState.value = false;
  state.value = 'display';
};
</script>

<style scoped>
.icon-container {
  display: flex;
  justify-content: center;
}
.edit-item {
  display: flex;
  justify-content: space-between;
}
</style>
