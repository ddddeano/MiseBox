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

        <!-- Availability -->
        <div v-if="availability.length" class="display-section">
          <h4 class="section-title">Availability</h4>
          <ul class="section-content">
            <li v-for="item in availability" :key="item.date">
              Date: {{ item.date }}, Status: {{ item.status }}
            </li>
          </ul>
        </div>

        <!-- Awards -->
        <div v-if="awards.length" class="display-section">
          <h4 class="section-title">Awards</h4>
          <ul class="section-content">
            <li v-for="award in awards" :key="award">{{ award }}</li>
          </ul>
        </div>

        <!-- Recipes -->
        <div v-if="recipes.length" class="display-section">
          <h4 class="section-title">Recipes</h4>
          <ul class="section-content">
            <li v-for="recipe in recipes" :key="recipe.title">
              <strong>{{ recipe.title }}</strong>: {{ recipe.description }}
            </li>
          </ul>
        </div>

        <!-- Events -->
        <div v-if="events.length" class="display-section">
          <h4 class="section-title">Events</h4>
          <ul class="section-content">
            <li v-for="event in events" :key="event.name">
              Event: {{ event.name }}
            </li>
          </ul>
        </div>

        <!-- Gallery -->
        <div v-if="gallery.length" class="display-section">
          <h4 class="section-title">Gallery</h4>
          <ul class="section-content gallery-list">
            <li v-for="photo in gallery" :key="photo.imageUrl">
              <img :src="photo.imageUrl" :alt="photo.description" class="gallery-image" />
              <p>{{ photo.description }}</p>
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
const availability = computed(() => chef.value?.availability || []);
const awards = computed(() => chef.value?.awards || []);
const recipes = computed(() => chef.value?.recipes || []);
const events = computed(() => chef.value?.events || []);
const gallery = computed(() => chef.value?.gallery || []);
</script>

<style scoped>
.display-profile-page {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.edit-button-container {
  text-align: right;
  margin-bottom: 20px;
}

.edit-profile-btn {
  background-color: var(--primary);
  color: var(--text-primary);
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.edit-profile-btn:hover {
  background-color: var(--secondary);
}

.display-profile-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.display-section {
  padding: 15px;
  border-radius: 10px;
  background-color: var(--background-2);
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.section-content {
  font-size: 1rem;
}

.gallery-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.gallery-image {
  max-width: 200px;
  border-radius: 5px;
}
</style>
