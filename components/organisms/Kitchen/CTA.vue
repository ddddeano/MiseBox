<template>
  <div class="call-to-action">
    <OrganismsUserCTA />

    <!-- Chef requirement layer -->
    <div v-if="miseboxUser && !chef" class="call-to-action-message">
      <h2>Become a Chef First</h2>
      <p>
        To create and manage kitchens, you need to have a Chef profile. Set up your Chef account to get started.
      </p>
      <button class="cta-button" @click="redirectToChefCTA">Create Chef Profile</button>
    </div>

    <!-- Kitchen Wizard -->
    <div v-if="miseboxUser && chef" class="call-to-action-message">
      <h2>Organize Your Kitchens</h2>
      <p>
        Manage your kitchens efficiently with tools to streamline tasks, track supplies, and connect with suppliers.
      </p>
      <OrganismsKitchenSearchWizard />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const { currentChef: chef } = useChef();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();

// Redirect to the Chef CTA page
const redirectToChefCTA = () => {
  router.push("/chefs");
};
</script>
