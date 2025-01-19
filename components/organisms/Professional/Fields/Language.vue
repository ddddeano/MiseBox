<!-- components/organisms/Professional/Fields/Language.vue -->
<template>
  <div class="language-item">
    <div v-if="mode === 'display'" class="display-mode">
      <div>
        <strong>{{ language.language }}</strong>
      </div>
      <div>{{ language.proficiency }}</div>
    </div>

    <div v-else-if="mode === 'create'" class="create-mode">
      <div class="form-group">
        <label for="language" class="label">Language</label>
        <input
          type="text"
          id="language"
          v-model="localData.language"
          placeholder="Enter language"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="proficiency" class="label">Proficiency</label>
        <select v-model="localData.proficiency" class="editable-input">
          <option disabled value="">Select proficiency</option>
          <option value="A1">A1 - Beginner</option>
          <option value="A2">A2 - Elementary</option>
          <option value="B1">B1 - Intermediate</option>
          <option value="B2">B2 - Upper Intermediate</option>
          <option value="C1">C1 - Advanced</option>
          <option value="C2">C2 - Proficient</option>
          <option value="Native">Native</option>
        </select>
      </div>

      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitCreate" />
      </div>
    </div>

    <div v-else-if="mode === 'edit'" class="edit-mode">
      <div class="form-group">
        <label for="language" class="label">Language</label>
        <input
          type="text"
          id="language"
          v-model="localData.language"
          placeholder="Enter language"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="proficiency" class="label">Proficiency</label>
        <select v-model="localData.proficiency" class="editable-input">
          <option disabled value="">Select proficiency</option>
          <option value="A1">A1 - Beginner</option>
          <option value="A2">A2 - Elementary</option>
          <option value="B1">B1 - Intermediate</option>
          <option value="B2">B2 - Upper Intermediate</option>
          <option value="C1">C1 - Advanced</option>
          <option value="C2">C2 - Proficient</option>
          <option value="Native">Native</option>
        </select>
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
  addProfessionalArrayItem,
  updateProfessionalArrayItem,
  removeProfessionalArrayItem,
} = useProfessional();

const props = defineProps({
  language: {
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

const localData = ref({ ...props.language });

// Create a new language entry
async function submitCreate() {
  try {
    await addProfessionalArrayItem("languages", localData.value);
    console.log("Language added successfully.");
  } catch (error) {
    console.error("Error adding language:", error);
  }
}

// Edit an existing language entry
async function submitEdit() {
  try {
    await updateProfessionalArrayItem("languages", props.index, localData.value);
    console.log("Language updated successfully.");
  } catch (error) {
    console.error("Error updating language:", error);
  }
}

// Delete a language entry
async function submitDelete() {
  try {
    await removeProfessionalArrayItem("languages", props.index);
    console.log("Language deleted successfully.");
  } catch (error) {
    console.error("Error deleting language:", error);
  }
}
</script>
