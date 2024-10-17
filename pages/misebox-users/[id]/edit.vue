<template>
  <client-only>
    <div class="profile-forms">
      <!-- Misebox User Details -->
      <div v-if="isCurrentUserProfile && miseboxUser">
        <!-- Avatar -->
        <MoleculesFormsAvatarSelection :user="miseboxUser" size="large" />

        <!-- Display Name -->
        <MoleculesFormsSingleField
          label="Display Name"
          collectionName="misebox-users"
          target="display_name"
          :documentID="miseboxUser.id"
          :firebaseValue="miseboxUser.display_name"
          placeholder="Enter your display name"
        />

        <!-- Handle -->
        <MoleculesFormsSingleField
          label="Handle"
          collectionName="misebox-users"
          target="handle"
          :documentID="miseboxUser.id"
          :firebaseValue="miseboxUser.handle"
          placeholder="Enter your handle"
        />

        <!-- Email -->
        <MoleculesFormsSingleField
          label="Email"
          collectionName="misebox-users"
          target="email"
          :documentID="miseboxUser.id"
          :firebaseValue="miseboxUser.email"
          placeholder="Enter your email"
        />

        <!-- Phone Number -->
        <MoleculesFormsSingleField
          label="Phone Number"
          collectionName="misebox-users"
          target="phone_number"
          :documentID="miseboxUser.id"
          :firebaseValue="miseboxUser.phone_number"
          placeholder="Enter your phone number"
        />

        <!-- Full Name -->
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

        <!-- DOB -->
        <MoleculesFormsMultiField
          label="Date of Birth"
          collectionName="misebox-users"
          target="dob"
          :documentID="miseboxUser.id"
          :firebaseValue="miseboxUser.dob"
          :placeholders="{
            day: 'Day',
            month: 'Month',
            year: 'Year'
          }"
          placeholder="Enter your date of birth"
        />

        <!-- Address -->
        <MoleculesFormsMultiField
          label="Address"
          collectionName="misebox-users"
          target="address"
          :documentID="miseboxUser.id"
          :firebaseValue="miseboxUser.address"
          :placeholders="{
            number: 'House Number',
            street1: 'Street 1',
            street2: 'Street 2',
            town: 'Town/City',
            county: 'County',
            postalCode: 'Postal Code',
            country: 'Country'
          }"
          placeholder="Enter your address"
        />

        <!-- Short Bio -->
        <MoleculesFormsTextAreaField
          label="User Bio"
          collectionName="misebox-users"
          target="user_bio"
          :documentID="miseboxUser.id"
          :firebaseValue="miseboxUser.user_bio"
          placeholder="Enter your user bio here"
        />
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { computed } from 'vue';
import { useCurrentUser } from 'vuefire';
import { useRoute } from 'vue-router';

const route = useRoute();
const routeUserId = computed(() => route.params.id);
const currentUser = useCurrentUser();
const isCurrentUserProfile = computed(
  () => currentUser.value?.uid === routeUserId.value
);
const { miseboxUser } = useMiseboxUser(currentUser);
</script>
