<!-- components/organisms/Professional/Fields/Certification.vue -->
<template>
  <div class="certification-item">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode">
      <div class="certification-details">
        <div><strong>{{ certification.name }}</strong></div>
        <div>{{ certification.issuing_organization }}</div>
        <div>{{ certification.year }}</div>
      </div>
    </div>

    <!-- Create Mode -->
    <div v-else-if="mode === 'create'" class="create-mode">
      <!-- Certification Name -->
      <div class="form-group">
        <label for="name" class="label">Certification Name</label>
        <input
          type="text"
          id="name"
          v-model="localData.name"
          placeholder="Enter certification name"
          class="editable-input"
        />
      </div>

      <!-- Issuing Organization -->
      <div class="form-group">
        <label class="label">Issuing Organization</label>
        <div v-if="selectedPlace">
          <div><strong>Selected Place:</strong></div>
          <div>Place Name: {{ selectedPlace.place_name }}</div>
          <div>Place ID: {{ selectedPlace.place_id }}</div>
          <div>Address: {{ selectedPlace.formatted_address }}</div>
          <button class="btn" @click="clearSelectedPlace">Clear</button>
        </div>
        <OrganismsPlaceSearch
          v-else
          v-model="localData.issuing_organization"
          @select-place="handleSelectPlace"
        />
      </div>

      <!-- Year Selector -->
      <div class="form-group">
        <label for="year" class="label">Year</label>
        <MoleculesYearSelector
          :year="localData.year"
          @update:year="(newYear) => (localData.year = newYear)"
        />
      </div>

      <!-- Action Buttons -->
      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitCreate" />
      </div>
    </div>

    <!-- Edit Mode -->
    <div v-else-if="mode === 'edit'" class="edit-mode">
      <!-- Certification Name -->
      <div class="form-group">
        <label for="name" class="label">Certification Name</label>
        <input
          type="text"
          id="name"
          v-model="localData.name"
          placeholder="Enter certification name"
          class="editable-input"
        />
      </div>

      <!-- Issuing Organization -->
      <div class="form-group">
        <label class="label">Issuing Organization</label>
        <div v-if="selectedPlace">
          <div><strong>Selected Place:</strong></div>
          <div>Place Name: {{ selectedPlace.place_name }}</div>
          <div>Place ID: {{ selectedPlace.place_id }}</div>
          <div>Address: {{ selectedPlace.formatted_address }}</div>
          <button class="btn" @click="clearSelectedPlace">Clear</button>
        </div>
        <OrganismsPlaceSearch
          v-else
          v-model="localData.issuing_organization"
          @select-place="handleSelectPlace"
        />
      </div>

      <!-- Year Selector -->
      <div class="form-group">
        <label for="year" class="label">Year</label>
        <MoleculesYearSelector
          :year="localData.year"
          @update:year="(newYear) => (localData.year = newYear)"
        />
      </div>

      <!-- Action Buttons -->
      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitEdit" />
        <TrashIcon class="icon" @click="deleteCertification" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Explicitly destructure CRUD operations from useProfessional
const {
  addProfessionalArrayItem,
  updateProfessionalArrayItem,
  removeProfessionalArrayItem,
} = useProfessional();

const props = defineProps({
  certification: {
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

const localData = ref({ ...props.certification });
const selectedPlace = ref(null);

// Handle place selection
const handleSelectPlace = (place) => {
  selectedPlace.value = place;
  localData.value.issuing_organization = place.place_name || "Unknown Organization";
};

// Clear selected place
const clearSelectedPlace = () => {
  selectedPlace.value = null;
  localData.value.issuing_organization = "";
};

// Create certification
async function submitCreate() {
  try {
    await addProfessionalArrayItem("certifications", localData.value);
    console.log("[submitCreate] Certification added successfully.");
  } catch (error) {
    console.error("[submitCreate] Error adding certification:", error);
  }
}

// Edit certification
async function submitEdit() {
  try {
    await updateProfessionalArrayItem("certifications", props.index, localData.value);
    console.log("[submitEdit] Certification updated successfully.");
  } catch (error) {
    console.error("[submitEdit] Error updating certification:", error);
  }
}

// Delete certification
async function deleteCertification() {
  try {
    await removeProfessionalArrayItem("certifications", props.index);
    console.log("[deleteCertification] Certification removed successfully.");
  } catch (error) {
    console.error("[deleteCertification] Error removing certification:", error);
  }
}
</script>
