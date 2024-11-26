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
      <ul v-if="Array.isArray(firebaseValue)">
        <li
          v-for="(item, index) in firebaseValue"
          :key="index"
          class="display-list-item-view"
        >
          <span>{{ item }}</span>
        </li>
      </ul>
      <p v-else>No tags available</p>
    </div>

    <!-- Edit Mode -->
    <div v-else class="editing-item">
      <ul v-if="Array.isArray(firebaseValue)">
        <li
          v-for="(item, index) in firebaseValue"
          :key="index"
          class="editing-list-item"
        >
          <input
            v-if="editingIndex === index"
            v-model="viewModel[index]"
            class="editable-input"
          />
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
      </ul>
      <p v-else>No tags to edit</p>

      <!-- Input for adding a new item (create mode) -->
      <div class="input-container">
        <input
          v-model="newItem"
          :placeholder="itemPlaceholder"
          class="editable-input"
        />
        <div class="centred-icons">
          <CheckCircleIcon
            class="icon confirm-icon"
            @click="addItem"
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
  label: String,
  firebaseValue: {
    type: Array,
    default: () => [], // Ensure firebaseValue is always an array
  },
  placeholder: String,
  itemPlaceholder: String,
  collectionName: String,
  documentID: String,
  target: String,
  formattingFunction: Function,
  validationFunction: Function,
});

const firestore = useFirestore();
const errorMessage = ref('');
const isEditing = ref(false);
const editingIndex = ref(null);
const viewModel = ref([...props.firebaseValue]);
const newItem = ref('');

// Sync viewModel with firebaseValue when it changes
watch(
  () => props.firebaseValue,
  (newVal) => {
    viewModel.value = [...newVal];
  }
);

// Start editing a specific item
const editItem = (index) => {
  editingIndex.value = index;
  errorMessage.value = '';
};

// Cancel editing mode for the currently selected item
const cancelInlineEditing = () => {
  editingIndex.value = null;
  errorMessage.value = '';
  viewModel.value = [...props.firebaseValue];
};

// Save the edited item back to Firestore
const overwriteItem = async (index) => {
  try {
    let updatedItem = viewModel.value[index];

    // Apply formatting function if provided
    if (props.formattingFunction) {
      updatedItem = props.formattingFunction(updatedItem);
    }

    // Apply validation function if provided
    if (props.validationFunction) {
      const validationError = props.validationFunction(updatedItem);
      if (validationError) {
        errorMessage.value = validationError;
        return;
      }
    }

    const updatedArray = [...props.firebaseValue];
    updatedArray[index] = updatedItem;

    const documentRef = doc(firestore, props.collectionName, props.documentID);
    await updateDoc(documentRef, {
      [props.target]: updatedArray,
    });

    editingIndex.value = null;
  } catch (error) {
    console.error('Error updating item in Firestore:', error);
  }
};

// Add a new item to Firestore
const addItem = async () => {
  try {
    let newItemValue = newItem.value.trim();

    // Apply formatting and validation if provided
    if (props.formattingFunction) {
      newItemValue = props.formattingFunction(newItemValue);
    }

    if (props.validationFunction) {
      const validationError = props.validationFunction(newItemValue);
      if (validationError) {
        errorMessage.value = validationError;
        return;
      }
    }

    if (!newItemValue) {
      errorMessage.value = 'Item cannot be empty.';
      return;
    }

    const documentRef = doc(firestore, props.collectionName, props.documentID);
    await updateDoc(documentRef, {
      [props.target]: arrayUnion(newItemValue),
    });

    newItem.value = ''; // Clear input field
  } catch (error) {
    console.error('Error adding new item to Firestore:', error);
  }
};

// Remove an item from Firestore
const removeItem = async (index) => {
  try {
    const itemToRemove = props.firebaseValue[index];

    const documentRef = doc(firestore, props.collectionName, props.documentID);
    await updateDoc(documentRef, {
      [props.target]: arrayRemove(itemToRemove),
    });
  } catch (error) {
    console.error('Error removing item from Firestore:', error);
  }
};

// Start editing mode
const startEditing = () => {
  isEditing.value = true;
  errorMessage.value = '';
};

// Cancel editing mode entirely
const cancelEditing = () => {
  isEditing.value = false;
  newItem.value = '';
  errorMessage.value = '';
};
</script>

<style scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.display-list-item-view {
  padding: 0.5rem;
}

.editing-item {
  margin-top: 1rem;
}

.input-container {
  margin-top: 1rem;
}

.list-icons {
  display: flex;
  gap: 0.5rem;
}

.centred-icons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.error-message {
  color: red;
  margin-top: 0.5rem;
}
</style>
