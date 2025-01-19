<!-- pages/professionals/[id]/index.vue -->
<template>
  <client-only>
    <div v-if="miseboxUser && professional" class="profile">
      <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

      <div class="action-buttons">
        <NuxtLink
          v-if="currentUser?.uid === $route.params.id"
          :to="`/professionals/${currentUser.uid}/edit`"
          class="icon-btn"
        >
          <Cog6ToothIcon class="icon" />
          <span>Edit</span>
        </NuxtLink>
        <button
          v-if="currentUser?.uid !== $route.params.id"
          class="icon-btn"
        >
          <EnvelopeIcon class="icon" />
          <span>Message</span>
        </button>
      </div>

      <OrganismsProfessionalView :professional="professional" />

      <OrganismsUniversalBubble
        :id="miseboxUser.id"
        parent="professionals"
        :userApps="miseboxUser.user_apps"
      />
    </div>
    <div v-else>
      <p class="loading">Loading...</p>
    </div>
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useCurrentUser } from "vuefire";

const route = useRoute();
const currentUser = useCurrentUser();

const { fetchMiseboxUser } = useMiseboxUser();
const { fetchProfessional } = useProfessional();

const miseboxUser = fetchMiseboxUser(route.params.id);
const professional = fetchProfessional(route.params.id);
</script>
