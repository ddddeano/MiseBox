<template>
  <client-only>
    <div class="profile-forms">
      <div v-if="isCurrentUserProfile && miseboxUser">
        <!-- Avatar Selection Field -->
        <MoleculesFormsAvatarSelection :user="miseboxUser" size="large" />

        <!-- Display Name Field -->
        <MoleculesFormsSingleField
          label="Display Name"
          collectionName="misebox-users"
          target="display_name"
          :documentID="miseboxUser.id"
          :firebaseValue="miseboxUser.display_name"
          placeholder="Enter your display name"
        />

        <!-- Full Name Field -->
        <MoleculesFormsMultiField
          label="Full Name"
          collectionName="misebox-users"
          target="full_name"
          :documentID="miseboxUser.id"
          :firebaseValue="miseboxUser.full_name"
          :placeholders="{
            firstName: 'First Name',
            middleName: 'Middle Name',
            lastName: 'Last Name'
          }"
          placeholder="Enter your full name"
        />

        <!-- Reusable Navigation Component -->
        <MoleculesBasicInfoNavigation :profileType="'misebox-users'" :userId="miseboxUser.id" />
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

// Fetching the current misebox user
const { miseboxUser } = useMiseboxUser(currentUser);
</script>
