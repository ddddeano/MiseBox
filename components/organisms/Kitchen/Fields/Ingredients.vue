<!-- components/organisms/Kitchen/Fields/Ingredients.vue -->
<template>
  <div class="ingredient-item">
    <div v-if="mode === 'display'" class="display-mode">
      <div>
        <strong>{{ ingredient.name }}</strong>
      </div>
      <div>{{ ingredient.note }}</div>
    </div>

    <div v-else-if="mode === 'create'" class="create-mode">
      <div class="form-group">
        <label for="ingredient-name" class="label">Ingredient Name</label>
        <input
          type="text"
          id="ingredient-name"
          v-model="localData.name"
          placeholder="Enter ingredient name"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="ingredient-note" class="label">Note</label>
        <input
          type="text"
          id="ingredient-note"
          v-model="localData.note"
          placeholder="Enter note (optional)"
          class="editable-input"
        />
      </div>

      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitCreate" />
      </div>
    </div>

    <div v-else-if="mode === 'edit'" class="edit-mode">
      <div class="form-group">
        <label for="ingredient-name" class="label">Ingredient Name</label>
        <input
          type="text"
          id="ingredient-name"
          v-model="localData.name"
          placeholder="Enter ingredient name"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="ingredient-note" class="label">Note</label>
        <input
          type="text"
          id="ingredient-note"
          v-model="localData.note"
          placeholder="Enter note (optional)"
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
import { ref } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true, // The ID of the kitchen document
  },
  ingredient: {
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

const localData = ref({ ...props.ingredient });

// Create a new ingredient entry
async function submitCreate() {
  try {
    await addKitchenArrayItem("ingredients", localData.value);
    console.log("Ingredient added successfully.");
  } catch (error) {
    console.error("Error adding ingredient:", error);
  }
}

// Edit an existing ingredient entry
async function submitEdit() {
  try {
    await updateKitchenArrayItem("ingredients", props.index, localData.value);
    console.log("Ingredient updated successfully.");
  } catch (error) {
    console.error("Error updating ingredient:", error);
  }
}

// Delete an ingredient entry
async function submitDelete() {
  try {
    await removeKitchenArrayItem("ingredients", props.index);
    console.log("Ingredient deleted successfully.");
  } catch (error) {
    console.error("Error deleting ingredient:", error);
  }
}
</script>
