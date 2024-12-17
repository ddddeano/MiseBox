<!-- components/organisms/Chef/Dashboard.vue -->
<template>
  <client-only>
    <div class="dashboard">
      <div v-if="chef">
        <h3>Chef Dashboard</h3>

        <!-- Profile Management -->
        <section class="dashboard-section">
          <h4>Profile Management</h4>
          <ul>
            <li>
              <button class="btn btn-primary btn-pill">View Profile</button>
            </li>
            <li>
              <button class="btn btn-secondary btn-pill">Edit Profile</button>
            </li>
          </ul>
        </section>

        <!-- Recipe Management -->
        <section class="dashboard-section">
          <h4>Recipe Management</h4>
          <ul>
            <li>
              <button class="btn btn-primary btn-pill">View Recipes</button>
            </li>
            <li>
              <button class="btn btn-secondary btn-pill">Add New Recipe</button>
            </li>
          </ul>
        </section>

        <!-- Event Management -->
        <section class="dashboard-section">
          <h4>Event Management</h4>
          <ul>
            <li>
              <button class="btn btn-primary btn-pill">View Upcoming Events</button>
            </li>
            <li>
              <button class="btn btn-secondary btn-pill">Create Event</button>
            </li>
          </ul>
        </section>

        <!-- Availability -->
        <section class="dashboard-section">
          <h4>Availability</h4>
          <ul>
            <li>
              <button class="btn btn-primary btn-pill">Update Availability</button>
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
              <button class="btn btn-primary btn-pill">Navigate to Professional Profile</button>
            </li>
            <li>
              <button class="btn btn-secondary btn-pill">Navigate to Misebox User Profile</button>
            </li>
          </ul>
        </section>
      </div>
      <div v-else>
        <p>Loading Chef Dashboard...</p>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { computed } from "vue";
import { useFirestore, useDocument, useCurrentUser } from "vuefire";
import { doc } from "firebase/firestore";

// Firestore and Current User Setup
const db = useFirestore();
const currentUser = useCurrentUser();

// Fetch Chef Data
const chefDocRef = computed(() =>
  currentUser.value ? doc(db, "chefs", currentUser.value.uid) : null
);

const { data: chef } = useDocument(chefDocRef);
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
