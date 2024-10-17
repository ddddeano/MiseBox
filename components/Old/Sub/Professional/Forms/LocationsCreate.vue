<template>
  <div class="creating">
    <ErrorMessage :error="error" />

    <div v-if="showPlacesBar" class="places-bar">
      <PlacesBar @item-click="selectPlace" placeholder="Search for cities or regions..." />
    </div>
    <div v-else class="selected-location">
      <p>{{ location.city }}, {{ location.country }}</p>
      <MinusCircleIcon class="remove-icon icon" @click="clearPlace" />
    </div>

    <div class="distance-input">
      <input
        type="text"
        v-model="location.distance"
        placeholder="Select distance"
        @focus="openFlyout('distance', distances)"
        readonly
      />
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
  Capturing location data:
  {
    "city": "Zurich",
    "country": "Switzerland",
    "distance": "50 km"
  }
*/

const location = reactive({
  city: "",
  country: "",
  distance: ""
});

const error = ref({ message: '' });
const showFlyout = ref(false);
const flyoutOptions = ref([]);
const flyoutTarget = ref("");

const distances = Array.from({ length: 10 }, (_, i) => `${(i + 1) * 10} km`);

const showPlacesBar = computed(() => !location.city);

const selectPlace = item => {
  location.city = item.place_name || "";
  location.country = item.country || "";
};

const clearPlace = () => {
  location.city = "";
  location.country = "";
};

const openFlyout = (target, options) => {
  flyoutTarget.value = target;
  flyoutOptions.value = options;
  showFlyout.value = true;
};

const handleFlyoutSelect = option => {
  location.distance = option;
  showFlyout.value = false;
};

const clickUpdate = async () => {
  if (validate()) {
    error.value.message = '';
    try {
      const documentRef = doc(firestore, props.collectionName, props.userId);
      await updateDoc(documentRef, {
        locations: arrayUnion({ ...location })
      });
      reset();
    } catch (err) {
      error.value.message = 'Failed to add location.';
      console.error('Failed to add location:', err);
    }
  } else {
    error.value.message = 'Please fill out all required fields.';
  }
};

const validate = () => location.city && location.distance;
const reset = () => Object.assign(location, { city: "", country: "", distance: "" });
</script>

<style scoped>
.distance-input input {
  padding: 10px; /* Hardcoded padding */
  border-radius: 6px; /* Hardcoded border-radius */
  font-size: 14px; /* Hardcoded font size */
}

.icons-container {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
</style>
