<!-- components/molecules/MiseboxUserHeader.vue -->
<template>
  <div v-if="miseboxUser" class="profile-header">
    <!-- Avatar -->
    <div class="profile-photo-container">
      <MoleculesAvatar altText="Avatar" :url="miseboxUser.avatar" size="large" />
    </div>

    <!-- User Details -->
    <div class="profile-details">
      <!-- Display Name -->
      <h1 class="profile-name">
        {{ miseboxUser.display_name || "Anonymous" }}
      </h1>

      <!-- Handle -->
      <p class="profile-handle" v-if="miseboxUser.handle">
        @{{ miseboxUser.handle }}
      </p>

      <!-- Follow Button -->
      <MoleculesFollowButton
        v-if="!isViewingOwnRoute"
        :user="miseboxUser"
        class="follow-button"
      />
    </div>

    <!-- Sign Out Button -->
    <button v-if="isViewingOwnRoute" @click="handleSignOut" class="btn btn-secondary btn-pill">
      Sign Out
    </button>

    <!-- Redirect to Auth -->
    <div v-if="!currentUser" class="auth-redirect">
      <NuxtLink to="/auth" class="btn btn-primary btn-pill">
        Go to Auth
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useCurrentUser } from "vuefire";

// Props for the fetched user
const props = defineProps({
  miseboxUser: {
    type: Object,
    required: true,
  },
});

// Router and Current User
const router = useRouter();
const currentUser = useCurrentUser();
const { logout } = useAuth(); // Destructure logout function from useAuth composable

// Interaction logic
const { isInteractingWithSelf } = useInteraction();
const isViewingOwnRoute = computed(() => {
  return props.miseboxUser ? isInteractingWithSelf(props.miseboxUser.id).value : false;
});

// Sign Out Logic
const handleSignOut = async () => {
  try {
    if (currentUser.value) {
      await logout(); // Call the logout function
      router.push("/auth"); // Redirect to the auth page
    }
  } catch (error) {
    console.error("[handleSignOut] Error during logout:", error);
    alert("Failed to log out. Please try again.");
  }
};
</script>

<style scoped>
/* Profile Header Styling */
.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
  background-color: var(--background);
  border-radius: var(--radius-s);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  border: 1px solid var(--border);
}

.profile-photo-container {
  margin-bottom: 1rem;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-full);
  object-fit: cover;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.profile-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-name {
  font-size: 1.8rem;
  font-weight: var(--font-weight-bold);
  margin: 0.5rem 0;
}

.profile-handle {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.follow-button {
  margin-top: 1rem;
}

.auth-redirect {
  margin-top: var(--spacing-s);
}
</style>
