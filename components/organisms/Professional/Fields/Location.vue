<!-- components/organisms/Professional/Fields/Location.vue -->
<template>
  <div class="location-item">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode">
      <div class="location-details">
        <span class="location-city">{{ location.city }}</span>
        <span class="location-distance">{{ location.distance }} km</span>
      </div>
    </div>

    <!-- Edit Mode -->
    <div v-else-if="mode === 'edit'" class="edit-mode">
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
        <label for="distance" class="label">Distance (km)</label>
        <input
          type="number"
          id="distance"
          v-model="localData.distance"
          placeholder="Enter distance"
          class="editable-input"
        />
      </div>
      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitEdit" />
        <TrashIcon class="icon" @click="deleteLocation" />
      </div>
    </div>

    <!-- Create Mode -->
    <div v-else-if="mode === 'create'" class="create-mode">
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
        <label for="distance" class="label">Distance (km)</label>
        <input
          type="number"
          id="distance"
          v-model="localData.distance"
          placeholder="Enter distance"
          class="editable-input"
        />
      </div>
      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitCreate" />
      </div>
    </div>
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
  await addProfessionalArrayItem('location', localData.value)
}

async function submitEdit() {
  await updateProfessionalArrayItem('location', props.index, localData.value)
}

async function submitDelete() {
  await removeProfessionalArrayItem('location', props.index)
}
</script>
