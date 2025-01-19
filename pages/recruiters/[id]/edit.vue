<!-- pages/recruiters/[id]/edit.vue -->
<template>
  <client-only>
    <div class="edit-page">
      <div v-if="isViewingOwn && recruiter">
        <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

        <div class="action-buttons">
          <NuxtLink :to="`/recruiters/${currentUser.uid}`" class="icon-btn">
            <UserCircleIcon class="icon" />
            <span>Profile</span>
          </NuxtLink>
          <button class="icon-btn" @click="deleteRecruiter">
            <TrashIcon class="icon" />
            <span>Delete</span>
          </button>
        </div>

        <OrganismsRecruiterEdit :recruiter="recruiter" />
      </div>
      <div v-else>
        <p class="access-denied-message">This is not your profile to edit.</p>
        <NuxtLink to="/recruiters" class="btn">Go to Recruiters</NuxtLink>
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
const { fetchRecruiter, deleteRecruiter } = useRecruiter();

const miseboxUser = fetchMiseboxUser(route.params.id);
const recruiter = fetchRecruiter(route.params.id);
const isViewingOwn = computed(() => currentUser.value?.uid === route.params.id);
</script>
