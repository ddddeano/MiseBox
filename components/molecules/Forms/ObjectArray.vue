<template>
  <div class="form-field">
    <div class="top" :class="{ 'unfolded': !isFolded }">
      <label>{{ label }}</label>
      <!-- Fold/Unfold Icon -->
      <ChevronDownIcon
        v-if="isFolded"
        class="icon toggle-icon"
        @click="toggleFold"
      />
      <div class="top-icons" v-if="!isFolded">
        <ChevronUpIcon class="icon toggle-icon" @click="toggleFold" />
        <!-- Add New Entry Icon -->
        <PlusCircleIcon
          v-if="!isCreating"
          class="icon add-icon"
          @click="startCreating"
        />
        <!-- Edit Mode Icon -->
        <PencilIcon
          v-if="!isEditing && !isCreating"
          class="icon edit-icon"
          @click="startEditing"
        />
      </div>
    </div>

    <!-- Display Mode -->
    <div v-if="!isEditing && !isCreating && !isFolded" class="display">
      <ul>
        <li
          v-for="(item, index) in firebaseValue"
          :key="index"
          class="display-list-item-view"
        >
          <slot name="display" :item="item" :index="index" />
        </li>
        <li v-if="!firebaseValue.length">{{ placeholder }}</li>
      </ul>
    </div>

    <!-- Create Mode -->
    <div v-if="isCreating && !isFolded" class="create bordered-section">
      <div class="input-container">
        <slot name="create" :item="localNewObject" />
      </div>
      <div class="centred-icons">
        <CheckCircleIcon
          class="icon confirm-icon"
          @click="sendNewToFirestore"
        />
        <ChevronUpIcon class="icon toggle-icon" @click="cancelCreating" />
      </div>
    </div>

    <!-- Edit Mode -->
    <div v-else-if="isEditing && !isFolded" class="editing">
      <ul>
        <li
          v-for="(item, index) in firebaseValue"
          :key="index"
          class="editing-list-item"
        >
          <slot
            v-if="editingIndex === index"
            name="edit"
            :item="viewModel[index]"
            :index="index"
          />
          <slot v-else name="display" :item="item" :index="index" />
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
            <ChevronUpIcon
              v-if="editingIndex === index"
              class="icon toggle-icon"
              @click="editingIndex = null"
            />
            <XCircleIcon class="icon delete-icon" @click="showDeleteDialog(index)" />
          </div>
        </li>
      </ul>
      <div class="centred-icons">
        <ChevronUpIcon class="icon toggle-icon" @click="cancelEditing" />
      </div>
    </div>

    <!-- Custom Dialog for Delete Confirmation -->
    <MoleculesCustomDialog
      v-if="isDeleteModalVisible"
      :visible="isDeleteModalVisible"
      :message="`Are you sure you want to delete '${itemLabel}'?`"
      @confirm="confirmDeletion"
      @cancel="cancelDeletion"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

const firestore = useFirestore();

const props = defineProps({
  label: {
    type: String,
    default: 'Manage Items',
  },
  firebaseValue: {
    type: Array,
    default: () => [],
  },
  collectionName: String,
  documentID: String,
  target: String,
  placeholder: {
    type: String,
    default: '',
  },
  newObject: {
    type: Object,
    default: () => ({}),
  },
  formattingFunction: {
    type: Function,
    default: null, // No formatting by default
  },
  validationFunction: {
    type: Function,
    default: null, // No validation by default
  },
});

const isEditing = ref(false);
const isCreating = ref(false);
const isFolded = ref(true);
const editingIndex = ref(null);
const viewModel = ref([...props.firebaseValue]);
const localNewObject = ref({ ...props.newObject });

const isDeleteModalVisible = ref(false);
const itemLabel = ref('');
const itemIndexToDelete = ref(null);

watch(
  () => props.firebaseValue,
  (newVal) => {
    viewModel.value = [...newVal];
  }
);

const toggleFold = () => {
  isFolded.value = !isFolded.value;
};

const startCreating = () => {
  isCreating.value = true;
  isEditing.value = false;
};

const startEditing = () => {
  isEditing.value = true;
  isCreating.value = false;
};

const cancelCreating = () => {
  isCreating.value = false;
  localNewObject.value = { ...props.newObject };
};

const cancelEditing = () => {
  isEditing.value = false;
  editingIndex.value = null;
};

const sendNewToFirestore = async () => {
  try {
    let newItem = { ...localNewObject.value };

    // Apply formatting function if provided
    if (props.formattingFunction) {
      newItem = props.formattingFunction(newItem);
    }

    // Apply validation function if provided
    if (props.validationFunction) {
      const validationError = props.validationFunction(newItem);
      if (validationError) {
        console.error('Validation error:', validationError);
        return;
      }
    }

    if (Object.keys(newItem).length === 0) {
      console.error('Cannot send an empty object.');
      return;
    }

    const documentRef = doc(firestore, props.collectionName, props.documentID);
    await updateDoc(documentRef, {
      [props.target]: arrayUnion(newItem),
    });

    localNewObject.value = { ...props.newObject };
    isCreating.value = false;
  } catch (error) {
    console.error('Error sending new object to Firestore:', error);
  }
};

const editItem = (index) => {
  editingIndex.value = index;
};

const overwriteItem = async (index) => {
  try {
    // Just take the item as it is from the viewModel
    let updatedItem = { ...viewModel.value[index] };

    const documentRef = doc(firestore, props.collectionName, props.documentID);
    const updatedArray = [...props.firebaseValue];
    updatedArray[index] = updatedItem;

    await updateDoc(documentRef, {
      [props.target]: updatedArray,
    });

    editingIndex.value = null;
  } catch (error) {
    console.error('Error updating item in Firestore:', error);
  }
};


const showDeleteDialog = (index) => {
  itemLabel.value = props.firebaseValue[index][props.label] || 'this item';
  itemIndexToDelete.value = index;
  isDeleteModalVisible.value = true;
};

const confirmDeletion = async () => {
  const index = itemIndexToDelete.value;
  const itemToRemove = props.firebaseValue[index];

  try {
    const documentRef = doc(firestore, props.collectionName, props.documentID);
    await updateDoc(documentRef, {
      [props.target]: arrayRemove(itemToRemove),
    });
    console.warn('Item deleted:', itemLabel.value);
  } catch (error) {
    console.error('Error removing item:', error);
  } finally {
    isDeleteModalVisible.value = false;
  }
};

const cancelDeletion = () => {
  isDeleteModalVisible.value = false;
  itemIndexToDelete.value = null;
};
</script>

<style scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top.unfolded {
}

.top-icons {
  display: flex;
  gap: 0.5rem;
}

.editing-list-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.centred-icons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.list-icons {
  display: flex;
  gap: 0.5rem;
}

.bordered-section {
  border: 1px solid var(--primary);
  padding: 1em;
  margin-bottom: 1em;
  border-radius: var(--spacing-s);
  background-color: var(--tertiary);
}

.display-list-item-view {
  padding: var(--spacing-s);
  border-radius: var(--spacing-s);
  background-color: var(--secondary);
  margin-bottom: var(--spacing-s);
}
</style>
