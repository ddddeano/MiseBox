<!-- components/organisms/MiseboxUser/Dashboard.vue -->
<template>
  <div class="dashboard">
    <!-- Profile Management -->
    <section class="dashboard-section">
      <h4>Profile Management</h4>
      <ul>
        <li>
          <NuxtLink
            :to="`/misebox-users/${currentUser.uid}`"
            class="btn btn-primary btn-pill"
          >
            View Profile
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            :to="`/misebox-users/${currentUser.uid}/edit`"
            class="btn btn-secondary btn-pill"
          >
            Edit Profile
          </NuxtLink>
        </li>
      </ul>
    </section>

    <!-- Networking -->
    <section class="dashboard-section">
      <h4>Networking</h4>
      <ul>
        <li>
          <button class="btn btn-primary btn-pill">Connect with Others</button>
        </li>
        <li>
          <button class="btn btn-secondary btn-pill">Manage Connections</button>
        </li>
      </ul>
    </section>

    <!-- Notifications -->
    <section class="dashboard-section">
      <h4>Notifications</h4>
      <ul>
        <li>
          <button class="btn btn-primary btn-pill">View Alerts</button>
        </li>
      </ul>
    </section>

    <!-- Cross-App Navigation -->
    <section class="dashboard-section">
      <h4>Navigation</h4>
      <ul>
        <li>
          <NuxtLink
            :to="`/professionals/${currentUser.uid}`"
            class="btn btn-primary btn-pill"
          >
            Professional Profile
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            :to="`/chefs/${currentUser.uid}`"
            class="btn btn-secondary btn-pill"
          >
            Chef Profile
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { useCurrentUser } from "vuefire";

const currentUser = useCurrentUser();
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-l);
}

.dashboard-section {
  margin-bottom: var(--spacing-l);
  width: 100%;
  max-width: 800px;
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: var(--spacing-m) 0;
}

ul li {
  margin: var(--spacing-s) 0;
}

.btn {
  margin: 0.5rem 0;
}
</style>
