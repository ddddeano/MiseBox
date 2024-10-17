<template>
  <div class="component">
    <div class="form-field">
      <div class="top">
        <label>{{ label }}</label>
        <!-- Pencil icon to enter edit mode -->
        <PencilIcon
          v-if="!isEditing"
          class="icon edit-icon"
          @click="startEditing"
        />
      </div>

      <!-- Display Mode -->
      <div v-if="!isEditing" class="display">
        <ul>
          <!-- Simple display of items, no controls -->
          <li
            v-for="(item, index) in firebaseValue"
            :key="index"
            class="list-item"
          >
            <span>{{ item }}</span>
          </li>
          <li v-if="!firebaseValue.length">{{ placeholder }}</li>
        </ul>
      </div>

      <!-- Edit Mode -->
      <div v-else class="editing">
        <ul>
          <li
            v-for="(item, index) in firebaseValue"
            :key="index"
            class="list-item"
          >
            <!-- If the item is being edited, show input -->
            <input 
              v-if="editingIndex === index"
              v-model="viewModel[index]"
              class="editable-input"
            />

            <!-- If not editing, just display the item with edit/delete controls -->
            <span v-else>{{ item }}</span>
            <div class="component-icons">
              <!-- Pencil icon for editing this specific item -->
              <PencilIcon v-if="editingIndex !== index" class="icon edit-icon" @click="editItem(index)" />
              <!-- Delete icon -->
              <XCircleIcon class="icon delete-icon" @click="removeItem(index)" />
            </div>

            <!-- Confirm button for saving edited item -->
            <CheckCircleIcon v-if="editingIndex === index" class="icon confirm-icon" @click="overwriteItem(index)" />
          </li>
          <li v-if="!firebaseValue.length">{{ placeholder }}</li>
        </ul>

        <!-- Input for adding a new item -->
        <div class="input-container">
          <input
            v-model="viewModel[firebaseValue.length]"
            :placeholder="itemPlaceholder"
            class="editable-input"
          />
          <div class="component-icons">
            <CheckCircleIcon class="icon confirm-icon" @click="confirmItem(firebaseValue.length)" />
            <XCircleIcon class="icon cancel-icon" @click="cancelEditing" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

const firestore = useFirestore()

const props = defineProps({
  label: {
    type: String,
    default: 'Array of Strings',
  },
  firebaseValue: {
    type: Array,
    default: () => [], // Default empty array
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
  itemPlaceholder: {
    type: String,
    default: '',
  },
})

const isEditing = ref(false)
const editingIndex = ref(null) // Track which item is being edited
const viewModel = ref([...props.firebaseValue]);

// Sync viewModel with firebaseValue when it changes
watch(() => props.firebaseValue, (newVal) => {
  viewModel.value = [...newVal]; // Re-sync the viewModel when firebaseValue changes
})

// Start editing (toggle edit mode)
const startEditing = () => {
  isEditing.value = true
}

// Cancel editing
const cancelEditing = () => {
  isEditing.value = false
  editingIndex.value = null // Reset editing index
}

// Confirm and send the item to Firestore (for adding new items)
const confirmItem = async (index) => {
  const newItem = viewModel.value[index];
  
  if (newItem.trim() === '') {
    console.error('Input cannot be empty');
    return;
  }

  try {
    const documentRef = doc(firestore, props.collectionName, props.documentID);
    await updateDoc(documentRef, {
      [props.target]: arrayUnion(newItem), // Add new item from viewModel to Firestore
    });
  } catch (error) {
    console.error('Error updating Firestore:', error);
  }
}

// Remove an item from the array
const removeItem = async (index) => {
  const itemToRemove = props.firebaseValue[index]

  try {
    const documentRef = doc(firestore, props.collectionName, props.documentID)
    await updateDoc(documentRef, {
      [props.target]: arrayRemove(itemToRemove), // Remove item from Firestore array
    })
  } catch (error) {
    console.error('Error removing item:', error)
  }
}

// Set the item being edited
const editItem = (index) => {
  editingIndex.value = index
}

// Overwrite the existing item at the index
const overwriteItem = async (index) => {
  editingIndex.value = null; // Reset the editing index
  const updatedItem = viewModel.value[index];
  if (updatedItem.trim() === '') {
    console.error('Input cannot be empty');
    return;
  }

  try {
    const documentRef = doc(firestore, props.collectionName, props.documentID);

    // Remove the original item first
    const itemToRemove = props.firebaseValue[index];
    await updateDoc(documentRef, {
      [props.target]: arrayRemove(itemToRemove),
    });

    // Add the updated item in its place
    await updateDoc(documentRef, {
      [props.target]: arrayUnion(updatedItem),
    });

  } catch (error) {
    console.error('Error overwriting Firestore item:', error);
  }
}
</script>

<style>

</style>