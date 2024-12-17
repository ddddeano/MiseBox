<!-- pages/kitchens/[id]/index.vue -->
<template>
  <client-only>
    <div v-if="kitchen" class="profile">
      <OrganismsKitchenCard :kitchen="kitchen" />

      <OrganismsKitchenDashboard v-if="isInTeam" :kitchen="kitchen" />

      <button v-else class="btn" @click="joinKitchen">
        Join Kitchen
      </button>
    </div>
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useDocument, useFirestore, useCurrentUser } from "vuefire";
import { doc } from "firebase/firestore";


// References to the current user and route
const currentUser = useCurrentUser();
const route = useRoute();
const db = useFirestore();

const kitchenDocRef = computed(() =>
  currentUser.value ? doc(db, "kitchens", route.params.id) : null
);

const { data: kitchen } = useDocument(kitchenDocRef);

const isInTeam = computed(() => {
  if (!kitchen.value || !kitchen.value.team) return false;
  return kitchen.value.team.some((member) => member.id === currentUser.value?.uid);
});

const { addUserToKitchenTeam } = useKitchen();

const joinKitchen = async () => {
  if (!kitchen.value?.kitchenId) return;
  if (!currentUser.value?.uid) return;

  const userId = currentUser.value.uid;

  await addUserToKitchenTeam(kitchen.value.kitchenId, userId);
  console.log(`[joinKitchen] User ${userId} joined the kitchen successfully.`);
};
</script>
