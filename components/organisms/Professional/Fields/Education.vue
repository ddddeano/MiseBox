<!-- components/organisms/Professional/Fields/Education.vue -->
<template>
  <div class="education-item">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode">
      <div class="education-details">
        <div>
          <strong>{{ education.institution }}</strong>
        </div>
        <div>{{ education.formattedAddress }}</div>
        <div>
          {{ education.startMonth }} {{ education.startYear }} -
          <span v-if="education.ongoing">Present</span>
          <span v-else>{{ education.endMonth }} {{ education.endYear }}</span>
        </div>
        <div>{{ education.degree }}</div>
      </div>
    </div>

    <!-- Create Mode -->
    <div v-else-if="mode === 'create'" class="create-mode">
      <div class="form-group">
        <label for="institution" class="label">Institution</label>
        <input
          type="text"
          id="institution"
          v-model="localData.institution"
          placeholder="Enter institution name"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="degree" class="label">Degree</label>
        <input
          type="text"
          id="degree"
          v-model="localData.degree"
          placeholder="Enter degree"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label class="label">Start Date</label>
        <MoleculesMonthAndYearSelector
          :month="localData.startMonth"
          :year="localData.startYear"
          @update:month="(newMonth) => (localData.startMonth = newMonth)"
          @update:year="(newYear) => (localData.startYear = newYear)"
        />
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" v-model="localData.ongoing" /> Ongoing
        </label>
      </div>

      <div v-if="!localData.ongoing" class="form-group">
        <label class="label">End Date</label>
        <MoleculesMonthAndYearSelector
          :month="localData.endMonth"
          :year="localData.endYear"
          @update:month="(newMonth) => (localData.endMonth = newMonth)"
          @update:year="(newYear) => (localData.endYear = newYear)"
        />
      </div>

      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitCreate" />
      </div>
    </div>

    <!-- Edit Mode -->
    <div v-else-if="mode === 'edit'" class="edit-mode">
      <div class="form-group">
        <label for="institution" class="label">Institution</label>
        <input
          type="text"
          id="institution"
          v-model="localData.institution"
          placeholder="Enter institution name"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="degree" class="label">Degree</label>
        <input
          type="text"
          id="degree"
          v-model="localData.degree"
          placeholder="Enter degree"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label class="label">Start Date</label>
        <MoleculesMonthAndYearSelector
          :month="localData.startMonth"
          :year="localData.startYear"
          @update:month="(newMonth) => (localData.startMonth = newMonth)"
          @update:year="(newYear) => (localData.startYear = newYear)"
        />
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" v-model="localData.ongoing" /> Ongoing
        </label>
      </div>

      <div v-if="!localData.ongoing" class="form-group">
        <label class="label">End Date</label>
        <MoleculesMonthAndYearSelector
          :month="localData.endMonth"
          :year="localData.endYear"
          @update:month="(newMonth) => (localData.endMonth = newMonth)"
          @update:year="(newYear) => (localData.endYear = newYear)"
        />
      </div>

      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitEdit" />
        <TrashIcon class="icon" @click="deleteEducation" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const {
  currentProfessional,
  addProfessionalArrayItem,
  updateProfessionalArrayItem,
  removeProfessionalArrayItem,
} = useProfessional()

const props = defineProps({
  // The actual education object data
  education: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  // The mode of this component: "display", "edit", or "create"
  mode: {
    type: String,
    required: true,
    validator: (value) => ['display', 'edit', 'create'].includes(value),
  },
  // Index in the array, required for "edit" or "delete"
  index: {
    type: Number,
    required: false,
  },
})

// Local copy of the item for two-way binding in edit/create forms
const localData = ref({ ...props.education })

// CREATE - push a new item to the "education" array
async function submitCreate() {
  await addProfessionalArrayItem('education', localData.value)
}

// EDIT - replace item at props.index with localData.value
async function submitEdit() {
  await updateProfessionalArrayItem('education', props.index, localData.value)
}

// DELETE - remove the item at props.index
async function deleteEducation() {
  await removeProfessionalArrayItem('education', props.index)
}
</script>

<style scoped>
/* Add styles if needed */
</style>
