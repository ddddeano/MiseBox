<!-- pages/chefs/[id]/edit.vue -->
<template>
  <client-only>
    <div class="edit-page">
      <div v-if="isViewingOwn && chef">
        <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

        <div class="action-buttons">
          <NuxtLink :to="`/chefs/${currentUser.uid}`" class="icon-btn">
            <UserCircleIcon class="icon" />
            <span>Profile</span>
          </NuxtLink>
          <button class="icon-btn" @click="deleteChef">
            <TrashIcon class="icon" />
            <span>Delete</span>
          </button>
        </div>

        <OrganismsChefEdit :chef="chef" />
      </div>
      <div v-else>
        <p class="access-denied-message">This is not your profile to edit.</p>
        <NuxtLink to="/chefs" class="btn">Go to Chefs</NuxtLink>
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
const { fetchChef, deleteChef } = useChef();

const miseboxUser = fetchMiseboxUser(route.params.id);
const chef = fetchChef(route.params.id);
const isViewingOwn = computed(() => currentUser.value?.uid === route.params.id);
</script>
