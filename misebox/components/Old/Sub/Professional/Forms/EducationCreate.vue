<template>
  <div class="creating">
    <ErrorMessage :error="error" />

    <div v-if="showPlacesBar" class="places-bar">
      <PlacesBar @item-click="selectPlace" placeholder="Search for schools, universities..." />
    </div>
    <div v-else class="selected-place">
      <p>{{ education.place_name }}</p>
      <MinusCircleIcon class="remove-icon icon" @click="clearPlace" />
    </div>

    <div class="create">
      <input type="text" v-model="education.degree" placeholder="Enter degree" class="input-degree"/>
      <div class="year-input">
        <CalendarIcon class="icon" v-if="!education.year" @click="openFlyout('year', years)" />
        <span class="date-text" v-else @click="clearYear">{{ education.year }}</span>
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
  Capturing Education data:
  {
    "degree": "Bachelor of Science",
    "place_name": "University of Manchester",
    "year": "2018",
    "place_id": "edu123",  // Captured but not displayed
    "formatted_address": "Manchester, UK"  // Captured and used in display
  }
*/

const education = reactive({
  place_name: "",
  degree: "",
  year: "",
  place_id: "",
  formatted_address: ""
});

const error = ref({ message: '' });
const showFlyout = ref(false);
const flyoutOptions = ref([]);
const flyoutTarget = ref("");

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => `${currentYear - i}`);

const showPlacesBar = computed(() => !education.place_name);

const selectPlace = item => {
  education.place_name = item.place_name;
  education.formatted_address = item.formatted_address || "";
  education.place_id = item.place_id;
};

const clearPlace = () => {
  Object.assign(education, { place_name: "", formatted_address: "", place_id: "" });
};

const clearYear = () => {
  education.year = "";
};

const openFlyout = (target, options) => {
  flyoutTarget.value = target;
  flyoutOptions.value = options;
  showFlyout.value = true;
};

const handleFlyoutSelect = selectedOption => {
  education.year = selectedOption;
  showFlyout.value = false;
};

const clickUpdate = async () => {
  if (validate()) {
    error.value.message = '';
    try {
      const documentRef = doc(firestore, props.collectionName, props.userId);
      await updateDoc(documentRef, {
        education: arrayUnion({ ...education })
      });
      reset();
    } catch (err) {
      error.value.message = 'Failed to add education.';
      console.error('Failed to add education:', err);
    }
  } else {
    error.value.message = 'Please fill out all required fields.';
  }
};

const validate = () => education.degree && education.place_name && education.year;
const reset = () => Object.assign(education, { place_name: "", degree: "", year: "", formatted_address: "", place_id: "" });
</script>

<style scoped>
.input-degree {
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
