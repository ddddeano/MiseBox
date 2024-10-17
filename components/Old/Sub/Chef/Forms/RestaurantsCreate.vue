<template>
  <div class="creating">
    <ErrorMessage :error="error" />

    <!-- Restaurant Name Input -->
    <div class="restaurant-input">
      <input
        type="text"
        v-model="restaurant.name"
        placeholder="Enter restaurant name"
      />
    </div>

    <!-- PlacesBar for City/Region Selection -->
    <div v-if="showPlacesBar" class="places-bar">
      <PlacesBar @item-click="selectPlace" placeholder="Search for cities or regions..." />
    </div>
    <div v-else class="selected-location">
      <p>{{ restaurant.city }}, {{ restaurant.country }}</p>
      <MinusCircleIcon class="remove-icon icon" @click="clearPlace" />
    </div>

    <!-- Cuisine Type Input -->
    <div class="cuisine-input">
      <input
        type="text"
        v-model="restaurant.cuisine"
        placeholder="Enter type of cuisine"
      />
    </div>

    <!-- Distance Input -->
    <div class="distance-input">
      <input
        type="text"
        v-model="restaurant.distance"
        placeholder="Select distance"
        @focus="openFlyout('distance', distances)"
        readonly
      />
    </div>

    <!-- Confirm Button -->
    <div class="icons-container">
      <CheckCircleIcon class="icon confirm-icon" @click="clickUpdate" />
    </div>

    <!-- Flyout for Distance Selection -->
    <MainFormsFlyout v-if="showFlyout" :options="flyoutOptions" @select="handleFlyoutSelect" />
  </div>
</template>

<script setup>
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

// Firestore instance
const firestore = useFirestore();

// Props to capture userId and collectionName
const props = defineProps({
  userId: String,
  collectionName: String,
});

// Reactive restaurant object to capture inputs
const restaurant = reactive({
  name: "",
  city: "",
  country: "",
  cuisine: "",
  distance: ""
});

// Error handling
const error = ref({ message: '' });
const showFlyout = ref(false);
const flyoutOptions = ref([]);
const flyoutTarget = ref("");

// Predefined distances for the distance dropdown
const distances = Array.from({ length: 10 }, (_, i) => `${(i + 1) * 10} km`);

// Show places bar until city is selected
const showPlacesBar = computed(() => !restaurant.city);

// Method to handle place selection
const selectPlace = (item) => {
  restaurant.city = item.place_name || "";
  restaurant.country = item.country || "";
};

// Clear selected place
const clearPlace = () => {
  restaurant.city = "";
  restaurant.country = "";
};

// Open flyout for distance selection
const openFlyout = (target, options) => {
  flyoutTarget.value = target;
  flyoutOptions.value = options;
  showFlyout.value = true;
};

// Handle flyout option selection
const handleFlyoutSelect = (option) => {
  restaurant.distance = option;
  showFlyout.value = false;
};

// Click update method to submit the form
const clickUpdate = async () => {
  if (validate()) {
    error.value.message = '';
    try {
      const documentRef = doc(firestore, props.collectionName, props.userId);
      await updateDoc(documentRef, {
        restaurants: arrayUnion({ ...restaurant })
      });
      reset();
    } catch (err) {
      error.value.message = 'Failed to add restaurant.';
      console.error('Failed to add restaurant:', err);
    }
  } else {
    error.value.message = 'Please fill out all required fields.';
  }
};

// Validate the restaurant form inputs
const validate = () => restaurant.name && restaurant.city && restaurant.cuisine && restaurant.distance;

// Reset the form after submission
const reset = () => Object.assign(restaurant, { name: "", city: "", country: "", cuisine: "", distance: "" });
</script>

<style scoped>
.restaurant-input input,
.cuisine-input input,
.distance-input input {
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
  margin-bottom: 10px;
}

.selected-location {
  margin-bottom: 10px;
}

.icons-container {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
</style>
