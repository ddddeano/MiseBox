<!-- pages/professionals/[id]/edit.vue -->
<template>
  <client-only>
    <div class="edit-page">
      <div v-if="isViewingOwn && professional">
        <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

        <div class="action-buttons">
          <NuxtLink :to="`/professionals/${currentUser.uid}`" class="icon-btn">
            <UserCircleIcon class="icon" />
            <span>Profile</span>
          </NuxtLink>
          <button class="icon-btn" @click="deleteProfessional">
            <TrashIcon class="icon" />
            <span>Delete</span>
          </button>
        </div>

        <OrganismsProfessionalEdit :professional="professional" />
      </div>
      <div v-else>
        <p class="access-denied-message">This is not your profile to edit.</p>
        <NuxtLink to="/professionals" class="btn">Go to Professionals</NuxtLink>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useCurrentUser } from "vuefire";

const route = useRoute();
const currentUser = useCurrentUser();

const { fetchMiseboxUser } = useMiseboxUser();
const { fetchProfessional, deleteProfessional } = useProfessional();

const miseboxUser = fetchMiseboxUser(route.params.id);
const professional = fetchProfessional(route.params.id);
const isViewingOwn = computed(() => currentUser.value?.uid === route.params.id);
</script>
