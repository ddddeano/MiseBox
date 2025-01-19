<!-- components/organisms/Kitchen/Fields/Dishes.vue -->
<template>
  <div class="dish-item">
    <div v-if="mode === 'display'" class="display-mode">
      <div>
        <strong>{{ dish.name }}</strong>
      </div>
      <div>{{ dish.description }}</div>
    </div>

    <div v-else-if="mode === 'create'" class="create-mode">
      <div class="form-group">
        <label for="dish-name" class="label">Dish Name</label>
        <input
          type="text"
          id="dish-name"
          v-model="localData.name"
          placeholder="Enter dish name"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="dish-description" class="label">Description</label>
        <textarea
          id="dish-description"
          v-model="localData.description"
          placeholder="Enter dish description (optional)"
          class="editable-input"
        ></textarea>
      </div>

      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitCreate" />
      </div>
    </div>

    <div v-else-if="mode === 'edit'" class="edit-mode">
      <div class="form-group">
        <label for="dish-name" class="label">Dish Name</label>
        <input
          type="text"
          id="dish-name"
          v-model="localData.name"
          placeholder="Enter dish name"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="dish-description" class="label">Description</label>
        <textarea
          id="dish-description"
          v-model="localData.description"
          placeholder="Enter dish description (optional)"
          class="editable-input"
        ></textarea>
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
  dish: {
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

const localData = ref({ ...props.dish });

// Create a new dish entry
async function submitCreate() {
  try {
    await addKitchenArrayItem("dishes", localData.value);
    console.log("Dish added successfully.");
  } catch (error) {
    console.error("Error adding dish:", error);
  }
}

// Edit an existing dish entry
async function submitEdit() {
  try {
    await updateKitchenArrayItem("dishes", props.index, localData.value);
    console.log("Dish updated successfully.");
  } catch (error) {
    console.error("Error updating dish:", error);
  }
}

// Delete a dish entry
async function submitDelete() {
  try {
    await removeKitchenArrayItem("dishes", props.index);
    console.log("Dish deleted successfully.");
  } catch (error) {
    console.error("Error deleting dish:", error);
  }
}
</script>
