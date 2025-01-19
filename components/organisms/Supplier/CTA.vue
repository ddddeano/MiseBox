<!-- components/organisms/Supplier/CTA.vue -->
<template>
  <!-- Supplier-specific CTA -->
  <OrganismsMiseboxUserCTA v-if="!currentUser || !miseboxUser" />

  <!-- Redirect to create page if no Supplier profile exists -->
  <div v-if="currentUser && miseboxUser && !supplier" class="call-to-action-message">
    <h2>Become a Supplier</h2>
    <p>
      Join Misebox as a Supplier to manage your inventory, connect with chefs, and streamline your operations.
    </p>
    <button class="btn" @click="redirectToCreate">Create Supplier Profile</button>
  </div>

  <!-- Profile card for users with a Supplier profile -->
  <div v-if="currentUser && miseboxUser && supplier" class="call-to-action-existing">
    <OrganismsSupplierCard />
  </div>
</template>

<script setup>
import { useCurrentUser } from "vuefire";
import { useRouter } from "vue-router";

const currentUser = useCurrentUser();
const router = useRouter();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentSupplier: supplier } = useSupplier();

const redirectToCreate = () => {
  router.push("/suppliers/create");
};
</script>
