<!-- components/organisms/MiseboxUser/CTA.vue -->
<template>
  <!-- Prompt to sign in for anonymous or unauthenticated users -->
  <div v-if="!currentUser || isAnonymous" class="call-to-action-message">
    <h2>Welcome to Misebox</h2>
    <p>You need an account to interact with the ecosystem.</p>
    <button class="btn" @click="redirectToSignIn">Sign In or Create Account</button>
  </div>

  <!-- Redirect to create page if no Misebox User profile exists -->
  <div v-if="currentUser && !miseboxUser" class="call-to-action-message">
    <h2>Join the Misebox Ecosystem</h2>
    <p>
      Create your Misebox account to access tools for managing kitchens, workflows, and more.
    </p>
    <button class="btn" @click="redirectToCreate">Create Misebox User Profile</button>
  </div>

  <!-- Profile card for users with a Misebox User profile -->
  <div v-if="currentUser && miseboxUser" class="call-to-action-existing">
    <p>Your Misebox User profile is active. Explore and connect with others!</p>
    <OrganismsMiseboxUserCard />
  </div>
</template>

<script setup>
import { useCurrentUser } from "vuefire";
import { useRouter } from "vue-router";

const currentUser = useCurrentUser();
const router = useRouter();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();

// Check if the current user is anonymous
const isAnonymous = computed(() => currentUser?.value?.isAnonymous);

// Redirect to the sign-in page
const redirectToSignIn = () => {
  router.push("/auth");
};

// Redirect to create page
const redirectToCreate = () => {
  router.push("/misebox-users/create");
};
</script>
