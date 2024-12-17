<!-- components/organisms/MiseboxUser/CTA.vue -->
<template>
  <div class="call-to-action">
    <!-- Base UserCTA for shared logic -->
    <OrganismsUserCTA />

    <!-- Display additional info if the Misebox user does NOT exist -->
    <div v-if="!miseboxUser && currentUser" class="call-to-action-message">
      <h2>Welcome to Misebox</h2>
      <p>
        Create your Misebox account and access an ecosystem of tools to manage your kitchens, teams, workflows, and career opportunities.
      </p>
      <ul>
        <li>💼 Build a live professional dossier that recruiters can access anytime.</li>
        <li>🤝 Collaborate with industry leaders and peers seamlessly.</li>
        <li>📊 Use smart tools to track your progress and stay ahead.</li>
      </ul>
      <p>Join today and unlock the full potential of Misebox!</p>
      <NuxtLink to="/auth" class="btn">Sign Up Now</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useFirestore, useCurrentUser, useCollection } from "vuefire";
const currentUser = useCurrentUser();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
</script>
