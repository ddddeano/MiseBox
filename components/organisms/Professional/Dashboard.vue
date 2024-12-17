<!-- components/organisms/Professional/Dashboard.vue -->
<template>
  <client-only>
    <div class="dashboard">
      <div v-if="professional">
        <h3>Professional Dashboard</h3>

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

        <!-- Applications -->
        <section class="dashboard-section">
          <h4>Applications</h4>
          <ul>
            <li>
              <button class="btn btn-primary btn-pill">Browse Job Listings</button>
            </li>
            <li>
              <button class="btn btn-secondary btn-pill">Post a Job</button>
            </li>
          </ul>
        </section>

        <!-- Professional Development -->
        <section class="dashboard-section">
          <h4>Professional Development</h4>
          <ul>
            <li>
              <button class="btn btn-primary btn-pill">Manage Certifications</button>
            </li>
            <li>
              <button class="btn btn-secondary btn-pill">Update Work Experience</button>
            </li>
            <li>
              <button class="btn btn-primary btn-pill">Edit Portfolio</button>
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
              <button class="btn btn-primary btn-pill">Navigate to Chef Profile</button>
            </li>
            <li>
              <button class="btn btn-secondary btn-pill">Navigate to Misebox User Profile</button>
            </li>
          </ul>
        </section>
      </div>
      <div v-else>
        <p>Loading Professional Dashboard...</p>
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

// Fetch Professional Data
const professionalDocRef = computed(() =>
  currentUser.value ? doc(db, "professionals", currentUser.value.uid) : null
);

const { data: professional } = useDocument(professionalDocRef);
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
