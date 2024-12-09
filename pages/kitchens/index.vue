<template>
  <client-only>
    <div class="index">
      <!-- Call-to-Action Component -->
      <OrganismsKitchenCTA />
      <!-- Debugging: Display Raw Chef Data -->
      <section>
        <h3>Raw Chef Data</h3>
        <pre>{{ chef }}</pre>
      </section>

      <!-- Debugging: Display All Kitchens Data -->
      <section>
        <h3>All Kitchens Data from Firestore</h3>
        <pre>
          Total Kitchens: {{ kitchens?.length || 0 }}
          Kitchens Data:
          {{ kitchens }}
        </pre>
      </section>

      <!-- Debugging: Display Filtered Chef Kitchens -->
      <section>
        <h3>Filtered Chef's Kitchens</h3>
        <pre>
          Total Chef Kitchens: {{ chefKitchens?.length || 0 }}
          Chef Kitchens Data:
          {{ chefKitchens }}
        </pre>
      </section>
      <!-- Debugging: Display Filtered All Kitchens -->
      <section>
        <h3>Filtered Non-Chef Kitchens</h3>
        <pre>
          Total Non-Chef Kitchens: {{ allKitchens?.length || 0 }}
          Non-Chef Kitchens Data:
          {{ allKitchens }}
        </pre>
      </section>

      <!-- Chef's Kitchens -->
      <section v-if="chef?.kitchens?.length">
        <h2>Your Kitchens</h2>
        <OrganismsKitchenList :kitchens="chefKitchens" />
      </section>

      <!-- All Kitchens -->
      <section>
        <h2>Explore Kitchens</h2>
        <OrganismsKitchenList :kitchens="allKitchens" />
      </section>
    </div>
  </client-only>
</template>

<script setup>
import { computed } from "vue";
import { collection } from "firebase/firestore";
import { useFirestore, useCurrentUser, useCollection } from "vuefire";

const db = useFirestore();
const currentUser = useCurrentUser();
const { currentChef: chef } = useChef();

// Fetch all kitchens from Firestore
const allKitchensRef = computed(() =>
  currentUser.value ? collection(db, "kitchens") : null
);
const { data: kitchens } = useCollection(allKitchensRef);

// Filter kitchens belonging to the current chef
const chefKitchens = computed(() =>
  currentUser.value
    ? kitchens.value?.filter((kitchen) =>
        chef.value?.kitchens?.some((chefKitchen) => chefKitchen.kitchenId === kitchen.id)
      ) || []
    : []
);

// Filter kitchens not belonging to the current chef
const allKitchens = computed(() =>
  currentUser.value
    ? kitchens.value?.filter((kitchen) =>
        !chef.value?.kitchens?.some((chefKitchen) => chefKitchen.kitchenId === kitchen.id)
      ) || []
    : []
);
</script>
