<!-- components/organisms/Professional/Fields/Project.vue -->
<template>
  <div class="project-item">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode">
      <div class="project-details">
        <div><strong>{{ project.name }}</strong></div>
        <div v-if="project.place">
          <div><strong>Location:</strong> {{ project.place.place_name }}</div>
          <div>{{ project.place.formatted_address }}</div>
        </div>
        <div>
          <strong>Duration:</strong>
          {{ project.start_year }} -
          <span v-if="project.ongoing">Present</span>
          <span v-else>{{ project.end_year }}</span>
        </div>
      </div>
    </div>

    <!-- Create Mode -->
    <div v-else-if="mode === 'create'" class="create-mode">
      <!-- Project Name -->
      <div class="form-group">
        <label for="name" class="label">Project Name</label>
        <input
          type="text"
          id="name"
          v-model="localData.name"
          placeholder="Enter project name"
          class="editable-input"
        />
      </div>

      <!-- Location -->
      <div class="form-group">
        <label class="label">Location</label>
        <div v-if="selectedPlace">
          <div><strong>Selected Place:</strong></div>
          <div>Place Name: {{ selectedPlace.place_name }}</div>
          <div>Place ID: {{ selectedPlace.place_id }}</div>
          <div>Address: {{ selectedPlace.formatted_address }}</div>
          <button class="btn" @click="clearSelectedPlace">Clear</button>
        </div>
        <OrganismsPlaceSearch
          v-else
          v-model="localData.place_name"
          @select-place="handleSelectPlace"
        />
      </div>

      <!-- Start Year -->
      <div class="form-group">
        <label for="start-year" class="label">Start Year</label>
        <MoleculesYearSelector
          :year="localData.start_year"
          @update:year="(newYear) => (localData.start_year = newYear)"
        />
      </div>

      <!-- Ongoing Checkbox -->
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="localData.ongoing" /> Ongoing
        </label>
      </div>

      <!-- End Year -->
      <div class="form-group" v-if="!localData.ongoing">
        <label for="end-year" class="label">End Year</label>
        <MoleculesYearSelector
          :year="localData.end_year"
          @update:year="(newYear) => (localData.end_year = newYear)"
        />
      </div>

      <!-- Action Button -->
      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitCreate" />
      </div>
    </div>

    <!-- Edit Mode -->
    <div v-else-if="mode === 'edit'" class="edit-mode">
      <!-- Project Name -->
      <div class="form-group">
        <label for="name" class="label">Project Name</label>
        <input
          type="text"
          id="name"
          v-model="localData.name"
          placeholder="Enter project name"
          class="editable-input"
        />
      </div>

      <!-- Location -->
      <div class="form-group">
        <label class="label">Location</label>
        <div v-if="selectedPlace">
          <div><strong>Selected Place:</strong></div>
          <div>Place Name: {{ selectedPlace.place_name }}</div>
          <div>Place ID: {{ selectedPlace.place_id }}</div>
          <div>Address: {{ selectedPlace.formatted_address }}</div>
          <button class="btn" @click="clearSelectedPlace">Clear</button>
        </div>
        <OrganismsPlaceSearch
          v-else
          v-model="localData.place_name"
          @select-place="handleSelectPlace"
        />
      </div>

      <!-- Start Year -->
      <div class="form-group">
        <label for="start-year" class="label">Start Year</label>
        <MoleculesYearSelector
          :year="localData.start_year"
          @update:year="(newYear) => (localData.start_year = newYear)"
        />
      </div>

      <!-- Ongoing Checkbox -->
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="localData.ongoing" /> Ongoing
        </label>
      </div>

      <!-- End Year -->
      <div class="form-group" v-if="!localData.ongoing">
        <label for="end-year" class="label">End Year</label>
        <MoleculesYearSelector
          :year="localData.end_year"
          @update:year="(newYear) => (localData.end_year = newYear)"
        />
      </div>

      <!-- Action Buttons -->
      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitEdit" />
        <TrashIcon class="icon" @click="deleteProject" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const {
  currentProfessional,
  addProfessionalArrayItem,
  updateProfessionalArrayItem,
  removeProfessionalArrayItem,
} = useProfessional();

const props = defineProps({
  project: {
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

const localData = ref({ ...props.project });
const selectedPlace = ref(null);

// Handle place selection
const handleSelectPlace = (place) => {
  selectedPlace.value = place;
  localData.value.place_name = place.place_name || "Unknown Place";
  localData.value.place = {
    place_id: place.place_id,
    place_name: place.place_name,
    formatted_address: place.formatted_address,
    photo_url: place.photo_url,
  };
};

// Clear selected place
const clearSelectedPlace = () => {
  selectedPlace.value = null;
  localData.value.place_name = "";
  localData.value.place = {};
};

// Create project
async function submitCreate() {
  await addProfessionalArrayItem("projects", localData.value);
}

// Edit project
async function submitEdit() {
  await updateProfessionalArrayItem("projects", props.index, localData.value);
}

// Delete project
async function deleteProject() {
  await removeProfessionalArrayItem("projects", props.index);
}
</script>
