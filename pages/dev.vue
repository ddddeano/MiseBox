<!-- pages/dev.vue -->
<template>
  <client-only>
    <div class="test">
      <div>
        <h2>All Misebox Users</h2>
        <ul>
          <li v-for="user in allUsers" :key="user.id">
            {{ user.display_name || "Unnamed User" }}
          </li>
        </ul>
      </div>

      <div>
        <h2>Specific Misebox User</h2>
        <p>{{ specificUser?.display_name || "No user found or not fetched yet" }}</p>
      </div>

      <div>
        <h2>Current Misebox User</h2>
        <p>{{ currentUser?.display_name || "No current user found" }}</p>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { useMiseboxUser } from "@/composables/EntityManagers/miseboxUser/useMiseboxUser";

// Extract methods and reactive data from `useMiseboxUser`
const { miseboxUsersCollection, fetchMiseboxUser, currentMiseboxUser } = useMiseboxUser();

// Fetch all users
const allUsers = miseboxUsersCollection();

// Fetch specific user by ID
const specificUserId = "xgYJZAc5Awcs0amhrBb8J4nEeO72"; // Example ID
const specificUser = fetchMiseboxUser(specificUserId);

// Current user (already reactive)
const currentUser = currentMiseboxUser;
</script>

<style scoped>
.test {
  width: 800px;
}
</style>
