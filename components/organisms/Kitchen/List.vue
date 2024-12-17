<!-- components/organisms/Kitchen/List.vue -->
<template>
  <div class="list">
    <!-- Show filtered kitchens based on the mode -->
    <p>{{ mode === 'chefsKitchens' ? 'Your Kitchens' : 'All Kitchens' }}</p>

    <div v-if="filteredKitchens.length">
      <div
        v-for="kitchen in filteredKitchens"
        :key="kitchen.kitchenId"
        class="list-item"
      >
        <!-- Render fully functional OrganismsKitchenCell -->
        <OrganismsKitchenCell :kitchen="kitchen" :isDisabled="false" />
      </div>
    </div>

    <!-- Fallback loading message -->
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { collection } from "firebase/firestore";
import { useCollection, useFirestore, useCurrentUser } from "vuefire";

// Get the current chef data
const { currentChef: chef } = useChef();

// Get the current user and firestore database instance
const db = useFirestore();
const currentUser = useCurrentUser();

// Get the mode for which kitchens to display
const props = defineProps({
  mode: {
    type: String,
    default: "allKitchens", // Default is to show all kitchens
  },
});

// Fetch kitchens collection
const kitchensCollectionRef = computed(() =>
  currentUser.value ? collection(db, "kitchens") : null
);
const { data: kitchens } = useCollection(kitchensCollectionRef);

// Get only the chef's kitchens (based on kitchenId)
const chefKitchenRefs = computed(() => {
  return chef.value?.kitchens || [];
});

// Filter the kitchens based on the mode (chef's kitchens or all kitchens)
const filteredKitchens = computed(() => {
  if (props.mode === 'chefsKitchens') {
    // Show only the chef's kitchens based on kitchenId
    return kitchens.value.filter(kitchen =>
      chefKitchenRefs.value.some(chefKitchen => chefKitchen.kitchenId === kitchen.kitchenId)
    );
  } else {
    // Show all kitchens, excluding the chef's kitchens
    return kitchens.value.filter(kitchen =>
      !chefKitchenRefs.value.some(chefKitchen => chefKitchen.kitchenId === kitchen.kitchenId)
    );
  }
});
</script>
