<!-- components/organisms/UserCTA.vue -->
<template>
  <div class="acc-to-action">
    <!-- Prompt to sign in -->
    <div v-if="!currentUser" class="call-to-action-message">
      <h2>Welcome to Misebox</h2>
      <p>
        You need an account to interact with the ecosystem.
      </p>
      <button class="btn" @click="redirectToSignIn">Sign In or Create Account</button>
    </div>

    <!-- Prompt to create a Misebox account -->
    <div v-else-if="!miseboxUser && currentUser" class="call-to-action-message">
      <h2>Join the Misebox Ecosystem</h2>
      <p>
       It seems we have lost your profile. Create a new one!
      </p>
      <button class="btn" @click="createMiseboxUser">Create Misebox User</button>
    </div>
  </div>
</template>

<script setup>
import { useCurrentUser } from "vuefire";
import { useRouter } from "vue-router";

const currentUser = useCurrentUser();
const router = useRouter();
const { currentMiseboxUser: miseboxUser, createMiseboxUser } = useMiseboxUser();

const redirectToSignIn = () => router.push("/auth");
</script>

<style>
.acc-to-action {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
