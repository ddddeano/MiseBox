<!-- kitchens/[id]/edit -->
<template>
  <client-only>
    <div class="kitchen-edit">
      <!-- Kitchen Card Display for the Specific Kitchen -->
      <div v-if="kitchen">
        <OrganismsKitchenCard :kitchen="kitchen" />
      </div>

      <h3>Edit Kitchen</h3>

      <div v-if="kitchen && currentUser">
        <!-- Kitchen Image Selection -->
        <MoleculesFormsKitchenImageSelection :kitchen="kitchen" />
      </div>

      <div v-else>
        <p>Loading kitchen...</p>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { useFirestore, useDocument, useCurrentUser } from 'vuefire';
import { doc } from 'firebase/firestore';
import { computed } from 'vue';

const currentUser = useCurrentUser();
const route = useRoute();
const db = useFirestore();

// Fetch kitchen data based on the route params (kitchen id)
const kitchenDocRef = computed(() =>
  currentUser.value && route.params.id
    ? doc(db, 'kitchens', route.params.id)
    : undefined
);

const { data: kitchen } = useDocument(kitchenDocRef);
</script>

