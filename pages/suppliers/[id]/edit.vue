<!-- pages/suppliers/[id]/edit.vue -->
<template>
  <client-only>
    <div class="edit-page">
      <div v-if="isViewingOwn && supplier">
        <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

        <div class="action-buttons">
          <NuxtLink :to="`/suppliers/${currentUser.uid}`" class="icon-btn">
            <UserCircleIcon class="icon" />
            <span>Profile</span>
          </NuxtLink>
          <button class="icon-btn" @click="deleteSupplier">
            <TrashIcon class="icon" />
            <span>Delete</span>
          </button>
        </div>

        <OrganismsSupplierEdit :supplier="supplier" />
      </div>
      <div v-else>
        <p class="access-denied-message">This is not your profile to edit.</p>
        <NuxtLink to="/suppliers" class="btn">Go to Suppliers</NuxtLink>
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
const { fetchSupplier, deleteSupplier } = useSupplier();

const miseboxUser = fetchMiseboxUser(route.params.id);
const supplier = fetchSupplier(route.params.id);
const isViewingOwn = computed(() => currentUser.value?.uid === route.params.id);
</script>
