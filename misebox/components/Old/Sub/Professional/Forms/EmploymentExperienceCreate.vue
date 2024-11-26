<template>
  <div class="creating">
    <ErrorMessage :error="error" />

    <div v-if="showPlacesBar" class="places-bar">
      <PlacesBar @item-click="selectPlace" placeholder="Search for places of employment..." />
    </div>
    <div v-else class="selected-place">
      <p>{{ experience.place_name }} - {{ experience.formatted_address }}</p>
      <MinusCircleIcon class="remove-icon icon" @click="clearExperience" />
    </div>

    <div class="create">
      <input type="text" v-model="experience.role" placeholder="Enter your role" class="input-role" />
      <div class="date-range-input">
        <div class="date-section">
          <div class="date-input">
            <CalendarIcon class="icon" v-if="!experience.from_month" @click="openFlyout('from_month', months)" />
            <span class="date-text" v-else @click="clearDate('from_month')">{{ experience.from_month }}</span>
          </div>
          <div class="date-input">
            <CalendarIcon class="icon" v-if="!experience.from_year" @click="openFlyout('from_year', years)" />
            <span class="date-text" v-else @click="clearDate('from_year')">{{ experience.from_year }}</span>
          </div>
        </div>
        <span class="date-separator">-</span>
        <div class="date-section">
          <div class="date-input">
            <CalendarIcon class="icon" v-if="!experience.to_month" @click="openFlyout('to_month', months)" />
            <span class="date-text" v-else @click="clearDate('to_month')">{{ experience.to_month }}</span>
          </div>
          <div class="date-input">
            <CalendarIcon class="icon" v-if="!experience.to_year" @click="openFlyout('to_year', years)" />
            <span class="date-text" v-else @click="clearDate('to_year')">{{ experience.to_year }}</span>
          </div>
        </div>
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
  Capturing the Employment Experience data:
  {
    "place_name": "Trout Hotel",
    "place_id": "abc123",
    "role": "Waiter",
    "from_month": "August",
    "from_year": "2015",
    "to_month": "August",
    "to_year": "2020",
    "formatted_address": "London, UK",  // We use formatted_address directly now
    "photo_url": "https://example.com/photo.jpg" // Optional, captured for display if available
  }
*/

const experience = reactive({
  place_name: "",
  place_id: "",
  role: "",
  from_year: "",
  from_month: "",
  to_year: "",
  to_month: "",
  formatted_address: "",
  photo_url: ""
});

const error = ref({ message: '' });
const showFlyout = ref(false);
const flyoutOptions = ref([]);
const flyoutTarget = ref("");

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => `${currentYear - i}`);

const showPlacesBar = computed(() => !experience.place_name);

// Selecting a place and updating experience
const selectPlace = item => {
  console.log("Selected place item:", item);  // Log the place object for debugging
  experience.place_name = item.place_name || "";
  experience.place_id = item.place_id || "";
  experience.formatted_address = item.formatted_address || "";
  experience.photo_url = item.photo_url || "";
};

// Clear experience data when removing the place
const clearExperience = () => {
  Object.assign(experience, {
    place_name: "",
    place_id: "",
    role: "",
    from_year: "",
    from_month: "",
    to_year: "",
    to_month: "",
    formatted_address: "",
    photo_url: ""
  });
};

// Clear individual date values
const clearDate = field => experience[field] = "";

// Open flyout for date selection
const openFlyout = (target, options) => {
  flyoutTarget.value = target;
  flyoutOptions.value = options;
  showFlyout.value = true;
};

const handleFlyoutSelect = selectedOption => {
  experience[flyoutTarget.value] = selectedOption;
  showFlyout.value = false;
};

const clickUpdate = async () => {
  if (validate()) {
    error.value.message = '';
    try {
      const documentRef = doc(firestore, props.collectionName, props.userId);
      await updateDoc(documentRef, {
        employment_experience: arrayUnion({ ...experience })
      });
      clearExperience(); // Reset experience after saving
    } catch (err) {
      error.value.message = 'Failed to add employment experience.';
      console.error('Failed to add employment experience:', err);
    }
  } else {
    error.value.message = 'Please fill out all required fields.';
  }
};

// Validate the experience object
const validate = () => experience.role && experience.place_name && experience.from_year && experience.to_year;
</script>

<style scoped>
.input-role {
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
}

.date-range-input {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 45px;
  margin-top: 10px;
}

.date-section {
  display: flex;
  gap: 45px;
}

.date-input {
  display: flex;
  align-items: center;
  gap: 10px;
}

.date-separator {
  font-size: 16px;
  color: #777;
}

.icons-container {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.icon {
  cursor: pointer;
}
</style>
