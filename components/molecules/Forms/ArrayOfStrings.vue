<template>
  <div class="form-field">
    <div class="top">
      <label>{{ label }}</label>
      <PencilIcon
        v-if="!isEditing"
        class="icon edit-icon"
        @click="startEditing"
      />
    </div>

    <!-- Display Mode -->
    <div v-if="!isEditing" class="display">
      <ul>
        <li
          v-for="(item, index) in firebaseValue"
          :key="index"
          class="display-list-item-view"
        >
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>

    <!-- Edit Mode -->
    <div v-else class="editing-item">
      <ul>
        <li
          v-for="(item, index) in firebaseValue"
          :key="index"
          class="editing-list-item"
        >
          <!-- If the item is being edited, show input -->
          <input
            v-if="editingIndex === index"
            v-model="viewModel[index]"
            class="editable-input"
          />
          <!-- If not editing, just display the item with edit/delete controls -->
          <span v-else>{{ item }}</span>

          <div class="list-icons">
            <PencilIcon
              v-if="editingIndex !== index"
              class="icon edit-icon"
              @click="editItem(index)"
            />
            <CheckCircleIcon
              v-if="editingIndex === index"
              class="icon confirm-icon"
              @click="overwriteItem(index)"
            />
            <MinusCircleIcon
              v-if="editingIndex === index"
              class="icon cancel-icon"
              @click="cancelInlineEditing"
            />
            <XCircleIcon class="icon delete-icon" @click="removeItem(index)" />
          </div>
        </li>
        <li v-if="!firebaseValue.length">{{ placeholder }}</li>
      </ul>

      <!-- Input for adding a new item (create mode) -->
      <div class="input-container">
        <input
          v-model="viewModel[firebaseValue.length]"
          :placeholder="itemPlaceholder"
          class="editable-input"
        />
        <div class="centred-icons">
          <CheckCircleIcon
            class="icon confirm-icon"
            @click="sendNewToFirestore(firebaseValue.length)"
          />
          <XCircleIcon class="icon cancel-icon" @click="cancelEditing" />
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

const props = defineProps({
  label: {
    type: String,
    default: '', // Critical for rendering
  },
  firebaseValue: {
    type: Array,
    default: () => [], // Critical for rendering
  },
  placeholder: {
    type: String,
    default: '', // Critical for rendering
  },
  itemPlaceholder: {
    type: String,
    default: '', // Critical for rendering
  },
  // Other props without default values
  collectionName: String,
  documentID: String,
  target: String,
  formattingFunction: Function,
  validationFunction: Function,
});

const firestore = useFirestore();

const {
  errorMessage,
  validateInput,
} = useField(props);

const isEditing = ref(false);
const editingIndex = ref(null); // Track which item is being edited
const viewModel = ref([...props.firebaseValue]); // Clone of firebaseValue

// Sync viewModel with firebaseValue when it changes
watch(
  () => props.firebaseValue,
  (newVal) => {
    viewModel.value = [...newVal];
  }
);

// Start editing (overall)
const startEditing = () => {
  isEditing.value = true; 
};

// Cancel editing (overall)
const cancelEditing = () => {
  isEditing.value = false;
  editingIndex.value = null;
  errorMessage.value = '';
};

// Cancel inline editing of a single item
const cancelInlineEditing = () => {
  editingIndex.value = null;
  errorMessage.value = '';
};

// Add new item to Firestore
const sendNewToFirestore = async (index) => {
  const newItem = viewModel.value[index]?.trim();

  if (!newItem) {
    errorMessage.value = 'Input cannot be empty';
    return;
  }

  const isValid = await validateInput(newItem);
  if (!isValid) return;

  const formattedItem = props.formattingFunction
    ? props.formattingFunction(newItem)
    : newItem;

  try {
    const documentRef = doc(firestore, props.collectionName, props.documentID);
    await updateDoc(documentRef, {
      [props.target]: arrayUnion(formattedItem),
    });
    viewModel.value[index] = ''; // Clear input after adding
  } catch (error) {
    console.error('Error updating Firestore:', error);
  }
};

// Remove an item from Firestore
const removeItem = async (index) => {
  const itemToRemove = props.firebaseValue[index];

  try {
    const documentRef = doc(firestore, props.collectionName, props.documentID);
    await updateDoc(documentRef, {
      [props.target]: arrayRemove(itemToRemove),
    });
  } catch (error) {
    console.error('Error removing item:', error);
  }
};

// Edit an item (set it to editable state)
const editItem = (index) => {
  editingIndex.value = index;
};

// Overwrite the existing item in Firestore after editing
const overwriteItem = async (index) => {
  const updatedItem = viewModel.value[index]?.trim();

  if (!updatedItem) {
    errorMessage.value = 'Input cannot be empty';
    return;
  }

  const isValid = await validateInput(updatedItem);
  if (!isValid) return;

  const formattedItem = props.formattingFunction
    ? props.formattingFunction(updatedItem)
    : updatedItem;

  try {
    const documentRef = doc(firestore, props.collectionName, props.documentID);
    const updatedArray = [...props.firebaseValue];
    updatedArray[index] = formattedItem;

    await updateDoc(documentRef, { [props.target]: updatedArray });
    editingIndex.value = null;
  } catch (error) {
    console.error('Error overwriting Firestore item:', error);
  }
};
</script>

<style scoped>
.list-icons {
  display: flex;
  flex-direction: row;
}
.editing-list-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.centred-icons {
  align-self: center;
}
</style>
