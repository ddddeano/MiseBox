<template>
  <div class="creating">
    <ErrorMessage :error="error" />

    <div v-if="showPlacesBar" class="places-bar">
      <PlacesBar @item-click="selectPlace" placeholder="Search for certification institutions..." />
    </div>
    <div v-else class="selected-place">
      <p>{{ certification.place_name }}</p>
      <MinusCircleIcon class="remove-icon icon" @click="clearPlace" />
    </div>

    <div class="create">
      <input type="text" v-model="certification.name" placeholder="Enter certification name" class="input-certification" />
      <div class="year-input">
        <CalendarIcon class="icon" v-if="!certification.year" @click="openFlyout('year', years)" />
        <span class="date-text" v-else @click="clearYear">{{ certification.year }}</span>
      </div>
    </div>

    <div class="icons-container">
      <CheckCircleIcon class="icon confirm-icon" @click="clickUpdate" />
    </div>

    <MainFormsFlyout v-if="showFlyout" :options="flyoutOptions" @select="handleFlyoutSelect" />
  </div>
</template>

<script setup>
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

const firestore = useFirestore();
const props = defineProps({
  userId: String,
  collectionName: String,
});

/*
  Capturing the Certification data:
  {
    "name": "Food Safety Level 2",
    "place_name": "Institute of Food Safety",
    "place_id": "xyz789",
    "formatted_address": "London, UK",    // Captured as formatted_address for display
    "photo_url": "https://example.com/photo.jpg", // Optional, captured for display if available
    "year": "2019"
  }
*/

const certification = reactive({
  place_name: "",
  place_id: "",
  name: "",
  year: "",
  formatted_address: "",
  photo_url: ""
});

const error = ref({ message: '' });
const showFlyout = ref(false);
const flyoutOptions = ref([]);
const flyoutTarget = ref("");

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => `${currentYear - i}`);

const showPlacesBar = computed(() => !certification.place_name);

const selectPlace = item => {
  certification.place_name = item.place_name || "";
  certification.place_id = item.place_id || "";
  certification.formatted_address = item.formatted_address || "";
  certification.photo_url = item.photo_url || "";
};

const clearPlace = () => {
  Object.assign(certification, { place_name: "", place_id: "", formatted_address: "", photo_url: "" });
};

const clearYear = () => {
  certification.year = "";
};

const openFlyout = (target, options) => {
  flyoutTarget.value = target;
  flyoutOptions.value = options;
  showFlyout.value = true;
};

const handleFlyoutSelect = selectedOption => {
  certification.year = selectedOption;
  showFlyout.value = false;
};

const clickUpdate = async () => {
  if (validate()) {
    error.value.message = '';
    try {
      const documentRef = doc(firestore, props.collectionName, props.userId);
      await updateDoc(documentRef, {
        certifications: arrayUnion({ ...certification })
      });
      reset();
    } catch (err) {
      error.value.message = 'Failed to add certification.';
      console.error('Failed to add certification:', err);
    }
  } else {
    error.value.message = 'Please fill out all required fields.';
  }
};

const validate = () => certification.name && certification.place_name && certification.year;
const reset = () => Object.assign(certification, { place_name: "", place_id: "", name: "", year: "", formatted_address: "", photo_url: "" });
</script>

<style scoped>
.input-certification {
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
}

.year-input {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icons-container {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
</style>
