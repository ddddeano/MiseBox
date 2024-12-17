<!-- components/organisms/Professional/List.vue -->
<template>
  <div class="list">
    <div v-if="professionals?.length">
      <div
        v-for="professional in filteredProfessionals"
        :key="professional.id"
        class="list-item"
      >
        <OrganismsProfessionalCell :professional="professional" />
      </div>
    </div>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { collection } from "firebase/firestore";
import { useCollection, useFirestore, useCurrentUser } from "vuefire";

const db = useFirestore();
const currentUser = useCurrentUser();

const collectionRef = computed(() =>
  currentUser.value ? collection(db, "professionals") : null
);
const { data: professionals } = useCollection(collectionRef);

const filteredProfessionals = computed(() =>
  professionals?.value?.filter((professional) => professional.id !== currentUser.value?.uid) || []
);
</script>
