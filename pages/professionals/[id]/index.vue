<template>
  <client-only>
    <div v-if="professional && miseboxUser" class="display-profile-page">
      
      <!-- Header -->
      <MiseboxHeader :profile="miseboxUser" />

      <!-- Edit Profile Link -->
      <div v-if="isCurrentUserProfile" class="edit-button-container">
        <NuxtLink :to="`/professionals/${routeUserId}/edit`" class="edit-profile-btn">Edit Profile</NuxtLink>
      </div>

      <!-- Profile Details Section -->
      <div class="display-profile-details">
        <div v-if="professional.employment_experience">
          <h4>Employment Experience</h4>
          <div v-html="renderItem(professional.employment_experience, 'employment_experience')"></div>
        </div>

        <div v-if="professional.languages">
          <h4>Languages</h4>
          <div v-html="renderItem(professional.languages, 'languages')"></div>
        </div>

        <div v-if="professional.certifications">
          <h4>Certifications</h4>
          <div v-html="renderItem(professional.certifications, 'certifications')"></div>
        </div>

        <div v-if="professional.education">
          <h4>Education</h4>
          <div v-html="renderItem(professional.education, 'education')"></div>
        </div>

        <div v-if="professional.locations">
          <h4>Locations</h4>
          <div v-html="renderItem(professional.locations, 'locations')"></div>
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

const professionalDocRef = computed(() => {
  if (currentUser.value) {
    return doc(db, 'professionals', routeUserId.value);
  }
  return null;
});

const { data: professional } = useDocument(professionalDocRef);

const miseboxUserDocRef = computed(() => {
  if (currentUser.value) {
    return doc(db, 'misebox-users', routeUserId.value);
  }
  return null;
});

const { data: miseboxUser } = useDocument(miseboxUserDocRef);

const renderItem = (items, target) => {
  if (!items || !items.length) return '<p>No information available</p>';
  return items.map(item => renderContent(item, target)).join('');
};
</script>
