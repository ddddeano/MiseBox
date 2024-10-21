<template>
  <client-only>
    <div v-if="chef && miseboxUser" class="display-profile-page">
      <!-- Use the OrganismsProfileHeader component -->
      <OrganismsProfileHeader :user="miseboxUser" />

      <!-- Edit Profile Link -->
      <div v-if="isCurrentUserProfile" class="edit-button-container">
        <NuxtLink :to="`/chefs/${routeUserId}/edit`" class="edit-profile-btn">Edit Profile</NuxtLink>
      </div>

      <!-- Profile Details Section -->
      <div class="display-profile-details">
        <!-- Bio -->
        <div v-if="miseboxUser.user_bio" class="display-section">
          <h4 class="section-title">Bio</h4>
          <p class="section-content">{{ miseboxUser.user_bio }}</p>
        </div>

        <!-- Specialities -->
        <div v-if="specialities.length" class="display-section">
          <h4 class="section-title">Specialities</h4>
          <ul class="section-content">
            <li v-for="speciality in specialities" :key="speciality">{{ speciality }}</li>
          </ul>
        </div>

        <!-- Kitchens -->
        <div v-if="kitchens.length" class="display-section">
          <h4 class="section-title">Kitchens</h4>
          <ul class="section-content">
            <li v-for="kitchen in kitchens" :key="kitchen.id">
              {{ kitchen.name }} - {{ kitchen.location }}
            </li>
          </ul>
        </div>

        <!-- Additional Sections as needed -->
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { useCurrentUser, useDocument, useFirestore } from 'vuefire';
import { doc } from 'firebase/firestore';
import { useRoute } from 'vue-router';

const currentUser = useCurrentUser();
const db = useFirestore();
const route = useRoute();

const routeUserId = computed(() => route.params.id);
const isCurrentUserProfile = computed(() => currentUser.value?.uid === routeUserId.value);

const chefDocRef = computed(() => {
  if (routeUserId.value) {
    return doc(db, 'chefs', routeUserId.value);
  }
  return null;
});

const { data: chef } = useDocument(chefDocRef);

const miseboxUserDocRef = computed(() => {
  if (routeUserId.value) {
    return doc(db, 'misebox-users', routeUserId.value);
  }
  return null;
});

const { data: miseboxUser } = useDocument(miseboxUserDocRef);

const specialities = computed(() => chef.value?.specialities || []);
const kitchens = computed(() => chef.value?.kitchens || []);
// Other computed properties as needed
</script>
