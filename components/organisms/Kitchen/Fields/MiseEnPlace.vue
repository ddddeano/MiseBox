<!-- components/organisms/Kitchen/Fields/MiseEnPlace.vue -->
<template>
  <div class="mise-en-place-item">
    <div v-if="mode === 'display'" class="display-mode">
      <div>
        <strong>{{ miseEnPlace.name }}</strong>
      </div>
      <div>{{ miseEnPlace.description }}</div>
    </div>

    <div v-else-if="mode === 'create'" class="create-mode">
      <div class="form-group">
        <label for="mise-en-place-name" class="label">Mise En Place Name</label>
        <input
          type="text"
          id="mise-en-place-name"
          v-model="localData.name"
          placeholder="Enter mise en place name"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="mise-en-place-description" class="label">Description</label>
        <textarea
          id="mise-en-place-description"
          v-model="localData.description"
          placeholder="Enter description (optional)"
          class="editable-input"
        />
      </div>

      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitCreate" />
      </div>
    </div>

    <div v-else-if="mode === 'edit'" class="edit-mode">
      <div class="form-group">
        <label for="mise-en-place-name" class="label">Mise En Place Name</label>
        <input
          type="text"
          id="mise-en-place-name"
          v-model="localData.name"
          placeholder="Enter mise en place name"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="mise-en-place-description" class="label">Description</label>
        <textarea
          id="mise-en-place-description"
          v-model="localData.description"
          placeholder="Enter description (optional)"
          class="editable-input"
        />
      </div>

      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitEdit" />
        <TrashIcon class="icon" @click="submitDelete" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true, // The ID of the kitchen document
  },
  miseEnPlace: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  mode: {
    type: String,
    required: true,
    validator: (value) => ["display", "edit", "create"].includes(value),
  },
  index: {
    type: Number,
    required: false,
  },
});

const { createKitchenArrayHelpers } = useKitchen();
const {
  addKitchenArrayItem,
  updateKitchenArrayItem,
  removeKitchenArrayItem,
} = createKitchenArrayHelpers(props.id);

const localData = ref({ ...props.miseEnPlace });

// Create a new mise en place entry
async function submitCreate() {
  try {
    await addKitchenArrayItem("miseEnPlace", localData.value);
    console.log("Mise en place added successfully.");
  } catch (error) {
    console.error("Error adding mise en place:", error);
  }
}

// Edit an existing mise en place entry
async function submitEdit() {
  try {
    await updateKitchenArrayItem("miseEnPlace", props.index, localData.value);
    console.log("Mise en place updated successfully.");
  } catch (error) {
    console.error("Error updating mise en place:", error);
  }
}

// Delete a mise en place entry
async function submitDelete() {
  try {
    await removeKitchenArrayItem("miseEnPlace", props.index);
    console.log("Mise en place deleted successfully.");
  } catch (error) {
    console.error("Error deleting mise en place:", error);
  }
}
</script>
