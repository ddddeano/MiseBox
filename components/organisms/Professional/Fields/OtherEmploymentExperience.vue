<!-- components/organisms/Professional/Fields/OtherEmploymentExperience.vue -->
<template>
  <div class="other-employment-experience-item">
    <!-- Display Mode -->
    <div v-if="mode === 'display' && employmentExperience">
      <div class="experience-details">
        <div>
          <strong>{{ employmentExperience.place_name }}</strong>
        </div>
        <div>{{ employmentExperience.city }}</div>
        <div>{{ employmentExperience.role }}</div>
        <div>
          {{ employmentExperience.from_month }}
          {{ employmentExperience.from_year }} -
          <span v-if="employmentExperience.ongoing">Present</span>
          <span v-else
            >{{ employmentExperience.to_month }}
            {{ employmentExperience.to_year }}</span
          >
        </div>
        <div>{{ employmentExperience.responsibilities }}</div>
      </div>
    </div>

    <!-- Create Mode -->
    <div v-else-if="mode === 'create'" class="create-mode">
      <div class="form-group">
        <label for="place_name" class="label">Place Name</label>
        <input
          type="text"
          id="place_name"
          v-model="localData.place_name"
          placeholder="Enter place name"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="city" class="label">City</label>
        <input
          type="text"
          id="city"
          v-model="localData.city"
          placeholder="Enter city"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="role" class="label">Role</label>
        <input
          type="text"
          id="role"
          v-model="localData.role"
          placeholder="Enter role"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label class="label">From</label>
        <MoleculesMonthAndYearSelector
          :month="localData.from_month"
          :year="localData.from_year"
          @update:month="(newMonth) => (localData.from_month = newMonth)"
          @update:year="(newYear) => (localData.from_year = newYear)"
        />
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" v-model="localData.ongoing" /> Ongoing
        </label>
      </div>

      <div v-if="!localData.ongoing" class="form-group">
        <label class="label">To</label>
        <MoleculesMonthAndYearSelector
          :month="localData.to_month"
          :year="localData.to_year"
          @update:month="(newMonth) => (localData.to_month = newMonth)"
          @update:year="(newYear) => (localData.to_year = newYear)"
        />
      </div>

      <div class="form-group">
        <label for="responsibilities" class="label">Responsibilities</label>
        <textarea
          id="responsibilities"
          v-model="localData.responsibilities"
          placeholder="Enter responsibilities"
          class="editable-textarea"
        ></textarea>
      </div>

      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitCreate" />
      </div>
    </div>

    <!-- Edit Mode -->
    <div v-else-if="mode === 'edit' && employmentExperience" class="edit-mode">
      <div class="form-group">
        <label for="place_name" class="label">Place Name</label>
        <input
          type="text"
          id="place_name"
          v-model="localData.place_name"
          placeholder="Enter place name"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="city" class="label">City</label>
        <input
          type="text"
          id="city"
          v-model="localData.city"
          placeholder="Enter city"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="role" class="label">Role</label>
        <input
          type="text"
          id="role"
          v-model="localData.role"
          placeholder="Enter role"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label class="label">From</label>
        <MoleculesMonthAndYearSelector
          :month="localData.from_month"
          :year="localData.from_year"
          @update:month="(newMonth) => (localData.from_month = newMonth)"
          @update:year="(newYear) => (localData.from_year = newYear)"
        />
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" v-model="localData.ongoing" /> Ongoing
        </label>
      </div>

      <div v-if="!localData.ongoing" class="form-group">
        <label class="label">To</label>
        <MoleculesMonthAndYearSelector
          :month="localData.to_month"
          :year="localData.to_year"
          @update:month="(newMonth) => (localData.to_month = newMonth)"
          @update:year="(newYear) => (localData.to_year = newYear)"
        />
      </div>

      <div class="form-group">
        <label for="responsibilities" class="label">Responsibilities</label>
        <textarea
          id="responsibilities"
          v-model="localData.responsibilities"
          placeholder="Enter responsibilities"
          class="editable-textarea"
        ></textarea>
      </div>

      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitEdit" />
        <TrashIcon class="icon" @click="deleteExperience" />
      </div>
    </div>

    <p v-else class="error-message">Employment experience not available.</p>
  </div>
</template>

<script setup>
const {
  currentProfessional,
  addProfessionalArrayItem,
  updateProfessionalArrayItem,
  removeProfessionalArrayItem,
} = useProfessional()

const props = defineProps({
  location: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  mode: {
    type: String,
    required: true,
    validator: (value) => ['display', 'edit', 'create'].includes(value),
  },
  index: {
    type: Number,
    required: false,
  },
})

const localData = ref({ ...props.language })

async function submitCreate() {
  await addProfessionalArrayItem('other_emplyment_experience', localData.value)
}

async function submitEdit() {
  await updateProfessionalArrayItem(
    'other_emplyment_experience',
    props.index,
    localData.value
  )
}

async function submitDelete() {
  await removeProfessionalArrayItem('other_emplyment_experience', props.index)
}
</script>
