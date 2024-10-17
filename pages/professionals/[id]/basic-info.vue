<template>
  <client-only>
    <div class="profile-forms">
      <h1>Please Enter your Basic Info</h1>
      <div v-if="profile">
        <!-- Job Title Field -->
        <div class="form-field">
          <MainFormsGenericSingleField
            :userId="profile.id"
            :subscription="profile.job_title"
            :isEditing="isEditing"
            collectionName="professionals"
            target="job_title"
            placeholder="Enter your job title"
          />
        </div>

        <!-- Navigation Buttons -->
        <div class="navigation-buttons" v-if="isBasicInfoComplete">
          <NuxtLink :to="`/professionals/${profile.id}/edit`" class="btn">
            Complete Your Profile
          </NuxtLink>
          <NuxtLink :to="`/professionals`" class="btn">
            Go to Professional Dashboard
          </NuxtLink>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useCurrentUser, useDocument, useFirestore } from 'vuefire';
import { doc } from 'firebase/firestore';

const route = useRoute();
const routeUserId = computed(() => route.params.id);
const currentUser = useCurrentUser();

const isCurrentUserProfile = computed(() => currentUser.value?.uid === routeUserId.value);
const isEditing = computed(() => isCurrentUserProfile.value);

const db = useFirestore();
const userDocRef = computed(() => currentUser.value ? doc(db, 'professionals', routeUserId.value) : null);
const { data: profile } = useDocument(userDocRef);

// Computed property to check if the basic info is complete
const isBasicInfoComplete = computed(() => {
  return profile.value?.job_title?.trim(); // Basic info is complete if the job title is provided
});
</script>
