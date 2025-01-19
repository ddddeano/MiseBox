<!-- components/organisms/Professional/List.vue -->
<template>
  <div class="list">
    <div v-if="filteredProfessionals?.length">
      <OrganismsProfessionalCell
        v-for="professional in filteredProfessionals"
        :key="professional.id"
        :professional="professional"
      />
    </div>
    <p v-else>No professionals found.</p>
  </div>
</template>

<script setup>
import { useCurrentUser } from "vuefire";
const currentUser = useCurrentUser();

const { professionalsCollection } = useProfessional();

const professionals = professionalsCollection();

const filteredProfessionals = computed(() =>
  professionals?.value?.filter((professional) => professional.id !== currentUser.value?.uid) || []
);
</script>
