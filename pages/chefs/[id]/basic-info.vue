<template>
  <client-only>
    <div class="profile-forms">
      <div v-if="isCurrentUserProfile && chef">
        <!-- Avatar Selection Field -->
        <MoleculesFormsAvatarSelection :user="chef" size="large" />

        <!-- Specialities Array Field -->
        <MoleculesFormsArrayOfStrings
          label="Chef Specialities"
          :firebaseValue="chef.specialities"
          collectionName="chefs"
          :documentID="chef.id"
          target="specialities"
          placeholder="No specialities added yet."
          itemPlaceholder="Enter a speciality"
          addButtonLabel="Add Speciality"
        />

        <!-- Reusable Navigation Component -->
        <MoleculesBasicInfoNavigation :profileType="'chefs'" :userId="chef.id" />
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { useCurrentUser } from 'vuefire';
import { useRoute } from 'vue-router';

const route = useRoute();
const routeUserId = computed(() => route.params.id);
const currentUser = useCurrentUser();

const isCurrentUserProfile = computed(() => currentUser.value?.uid === routeUserId.value);

// Fetching the current chef user
const { chef } = useChef(currentUser);
</script>
