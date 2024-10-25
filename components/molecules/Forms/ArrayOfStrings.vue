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

// Sync viewModel with firebaseValue when it changes
watch(
  () => props.firebaseValue,
  (newVal) => {
    viewModel.value = [...newVal];
  }
);

// Functions for editing, adding, removing items remain the same
// (refer to your earlier implementation)
</script>
