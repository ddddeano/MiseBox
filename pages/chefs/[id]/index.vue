<template>
  <client-only>
    <div v-if="chef && miseboxUser" class="display-profile-page">

      <!-- Header -->
      <MiseboxHeader :profile="miseboxUser" />

      <!-- Edit Profile Link -->
      <div v-if="isCurrentUserProfile" class="edit-button-container">
        <NuxtLink :to="`/chefs/${routeUserId}/edit`" class="edit-profile-btn">Edit Profile</NuxtLink>
      </div>

      <!-- Profile Details Section -->
      <div class="display-profile-details">
        
        <!-- Section 1: Bio -->
        <div v-if="bio" class="display-section">
          <h4 class="section-title">Bio</h4>
          <p class="section-content">{{ bio }}</p>
        </div>

        <!-- Section 2: Specialties -->
        <div v-if="specialties.length" class="display-section">
          <h4 class="section-title">Specialties</h4>
          <ul class="section-content">
            <li v-for="specialty in specialties" :key="specialty">{{ specialty }}</li>
          </ul>
        </div>

        <!-- Section 3: Restaurants -->
        <div v-if="restaurants.length" class="display-section">
          <h4 class="section-title">Restaurants</h4>
          <ul class="section-content">
            <li v-for="restaurant in restaurants" :key="restaurant.name">
              {{ restaurant.name }} ({{ restaurant.location }})
            </li>
          </ul>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { useCurrentUser, useDocument, useFirestore } from 'vuefire';
import { doc } from 'firebase/firestore';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

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

const bio = computed(() => chef.value?.bio || '');
const specialties = computed(() => chef.value?.specialties || []);
const restaurants = computed(() => chef.value?.restaurants || []);

const miseboxUserDocRef = computed(() => {
  if (currentUser.value) {
    return doc(db, 'misebox-users', routeUserId.value);
  }
  return null;
});

const { data: miseboxUser } = useDocument(miseboxUserDocRef);
</script>
