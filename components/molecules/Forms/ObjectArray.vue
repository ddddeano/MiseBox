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
        <!-- Simple display of items, no controls -->
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

    <!-- Edit Mode -->
    <div v-else class="editing">
      <ul>
        <li
          v-for="(item, index) in firebaseValue"
          :key="index"
          class="editing-list-item"
        >
          <!-- Use slots for the item being edited -->
          <slot
            v-if="editingIndex === index"
            name="edit"
            :item="viewModel[index]"
            :index="index"
          />
          <!-- If not editing, just display the item with edit/delete controls -->
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
            <MinusCircleIcon
              v-if="editingIndex === index"
              class="icon confirm-icon"
              @click="isEditing = false"
            />
            <XCircleIcon class="icon delete-icon" @click="removeItem(index)" />
          </div>
        </li>
        <li v-if="!firebaseValue.length">{{ placeholder }}</li>
      </ul>

      <!-- Create New Object Form -->
      <div class="input-container">
        <slot name="create" :item="localNewObject" />
      </div>

      <div class="centred-icons">
        <CheckCircleIcon
          class="icon confirm-icon"
          @click="sendNewToFirestore"
        />
        <XCircleIcon class="icon cancel-icon" @click="cancelEditing" />
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
})

const isEditing = ref(false)
const editingIndex = ref(null)
const viewModel = ref([...props.firebaseValue])
const localNewObject = ref({ ...props.newObject }) // Create a local copy of the new object

// Sync viewModel with firebaseValue changes
watch(
  () => props.firebaseValue,
  (newVal) => {
    viewModel.value = [...newVal]
  }
)

// Start editing
const startEditing = () => {
  isEditing.value = true
}

// Cancel editing and reset state
const cancelEditing = () => {
  isEditing.value = false
  editingIndex.value = null
  localNewObject.value = { ...props.newObject } // Reset the local new object
}

// Send new object to Firestore
const sendNewToFirestore = async () => {

  try {
    // Validation: Ensure the localNewObject is not empty
    if (Object.keys(localNewObject.value).length === 0) {
      console.error('Cannot send an empty object.')
      return
    }

    // Get a reference to the Firestore document
    const documentRef = doc(firestore, props.collectionName, props.documentID)

    // Update Firestore by adding the new object to the array
    await updateDoc(documentRef, {
      [props.target]: arrayUnion(localNewObject.value),
    })

    console.log('Successfully added new object:', localNewObject.value)

    // Reset the new object to its default structure
    localNewObject.value = { ...props.newObject }

    // Exit edit mode after successful addition
  } catch (error) {
    console.error('Error sending new object to Firestore:', error)
  }
}
const editItem = (index) => {
  editingIndex.value = index
}

// Overwrite existing object in Firestore
const overwriteItem = async (index) => {
  editingIndex.value = null // Reset the editing index
  const updatedItem = viewModel.value[index]

  if (!updatedItem || Object.keys(updatedItem).length === 0) {
    console.error('Cannot overwrite with an empty object')
    return
  }

  try {
    const updatedArray = [...props.firebaseValue] // Clone the current array
    updatedArray[index] = updatedItem // Modify the array locally

    const documentRef = doc(firestore, props.collectionName, props.documentID)
    await updateDoc(documentRef, {
      [props.target]: updatedArray, // Update the array in Firestore
    })
  } catch (error) {
    console.error('[ObjectArray] Error overwriting Firestore item:', error)
  }
}

// Remove an item from the array
const removeItem = async (index) => {
  const itemToRemove = props.firebaseValue[index]

  try {
    const documentRef = doc(firestore, props.collectionName, props.documentID)
    await updateDoc(documentRef, {
      [props.target]: arrayRemove(itemToRemove),
    })
  } catch (error) {
    console.error('Error removing item:', error)
  }
}
</script>

<style scoped></style>
