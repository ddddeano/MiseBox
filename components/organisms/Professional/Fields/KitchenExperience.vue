<!-- components/organisms/Professional/Fields/KitchenExperience.vue -->
<template>
  <div class="kitchen-experience-item">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode">
      {{ index }}
      <div>
        <strong>{{ kitchenExperience.name }}</strong>
        <span>({{ kitchenExperience.from_month }} {{ kitchenExperience.from_year }} - {{ kitchenExperience.to_month }} {{ kitchenExperience.to_year }})</span>
      </div>
      <div>{{ kitchenExperience.responsibilities }}</div>
    </div>

    <!-- Edit Mode -->
    <div v-else-if="mode === 'edit'" class="edit-mode">
      <div class="form-group">
        <label for="name" class="label">Kitchen Name</label>
        <input
          type="text"
          id="name"
          v-model="localData.name"
          placeholder="Enter kitchen name"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="from" class="label">From</label>
        <input
          type="text"
          id="from"
          v-model="localData.from_month"
          placeholder="Month"
          class="editable-input"
        />
        <input
          type="text"
          v-model="localData.from_year"
          placeholder="Year"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="to" class="label">To</label>
        <input
          type="text"
          id="to"
          v-model="localData.to_month"
          placeholder="Month"
          class="editable-input"
        />
        <input
          type="text"
          v-model="localData.to_year"
          placeholder="Year"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="responsibilities" class="label">Responsibilities</label>
        <textarea
          id="responsibilities"
          v-model="localData.responsibilities"
          placeholder="Describe your responsibilities"
          class="editable-textarea"
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
import { ref } from "vue";

const {
  updateProfessionalArrayItem,
  removeProfessionalArrayItem,
} = useProfessional();

const props = defineProps({
  kitchenExperience: {
    type: Object,
    required: true,
  },
  mode: {
    type: String,
    required: true,
    validator: (value) => ["display", "edit"].includes(value),
  },
  index: {
    type: Number,
    required: true,
  },
});

const localData = ref({ ...props.kitchenExperience });

// Edit an existing kitchen experience entry
async function submitEdit() {
  try {
    await updateProfessionalArrayItem("kitchen_experience", props.index, localData.value);
    console.log("Kitchen experience updated successfully.");
  } catch (error) {
    console.error("Error updating kitchen experience:", error);
  }
}

// Delete a kitchen experience entry
async function submitDelete() {
  try {
    await removeProfessionalArrayItem("kitchen_experience", props.index);
    console.log("Kitchen experience deleted successfully.");
  } catch (error) {
    console.error("Error deleting kitchen experience:", error);
  }
}
</script>
