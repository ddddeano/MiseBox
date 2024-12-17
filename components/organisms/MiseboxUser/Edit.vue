<!-- components/organisms/MiseboxUser/Edit.vue -->
<!-- ~/components/Organisms/MiseboxUser/Edit.vue -->
<template>
  <client-only>
    <div class="edit-view" v-if="miseboxUser">
      <h3>Edit Your Misebox Profile</h3>

      <!-- Avatar Selection -->
      <MoleculesFormsAvatarSelection
        collection-name="misebox-users"
        :item="miseboxUser"
      />

      <!-- Display Name -->
      <MoleculesFormsSingleField
        label="Display Name"
        collectionName="misebox-users"
        target="display_name"
        :documentID="currentUser.uid"
        :firebaseValue="miseboxUser.display_name"
        :formattingFunction="formatDisplayName"
        :validationFunction="validateDisplayName"
        placeholder="Enter your display name"
      />

      <!-- Handle -->
      <MoleculesFormsSingleField
        label="Handle"
        collectionName="misebox-users"
        target="handle"
        :documentID="currentUser.uid"
        :firebaseValue="miseboxUser.handle"
        :formattingFunction="formatHandle"
        :validationFunction="validateHandle"
        placeholder="Enter your handle"
      />

      <!-- Email -->
      <MoleculesFormsSingleField
        label="Email"
        collectionName="misebox-users"
        target="email"
        :documentID="currentUser.uid"
        :firebaseValue="miseboxUser.email"
        :formattingFunction="formatEmail"
        :validationFunction="validateEmail"
        placeholder="Enter your email"
      />

      <!-- Phone Number -->
      <MoleculesFormsSingleField
        label="Phone Number"
        collectionName="misebox-users"
        target="phone_number"
        :documentID="currentUser.uid"
        :firebaseValue="miseboxUser.phone_number"
        :formattingFunction="formatPhoneNumber"
        :validationFunction="validatePhoneNumber"
        placeholder="Enter your phone number"
      />

      <!-- Date of Birth -->
      <MoleculesFormsMultiField
        label="Date of Birth"
        collectionName="misebox-users"
        target="dob"
        :documentID="currentUser.uid"
        :firebaseValue="miseboxUser.dob"
        :placeholders="{ day: 'DD', month: 'MM', year: 'YYYY' }"
        :formattingFunction="formatDateOfBirth"
        :validationFunction="validateDateOfBirth"
      />

      <!-- Address -->
      <MoleculesFormsMultiField
        label="Address"
        collectionName="misebox-users"
        target="address"
        :documentID="currentUser.uid"
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
        :formattingFunction="formatAddress"
        :validationFunction="validateAddress"
      />

      <!-- User Bio -->
      <MoleculesFormsTextAreaField
        label="User Bio"
        collectionName="misebox-users"
        target="user_bio"
        :documentID="currentUser.uid"
        :firebaseValue="miseboxUser.user_bio"
        :formattingFunction="formatBio"
        :validationFunction="validateBio"
        :maxLength="500"
        placeholder="Write something about yourself"
      />
    </div>
    <div v-else>
      <p class="access-denied-message">
        Access Denied. You are not authorized to edit this profile.
      </p>
    </div>
  </client-only>
</template>

<script setup>
import {
  formatDisplayName,
  formatHandle,
  formatEmail,
  formatPhoneNumber,
  formatDateOfBirth,
  formatAddress,
  validateDisplayName,
  validateHandle,
  validateEmail,
  validatePhoneNumber,
  validateDateOfBirth,
  validateAddress,
} from "~/composables/utils/useMiseboxUserFormattingAndValidation";

import { formatBio, validateBio } from "~/composables/utils/useSharedFormattingAndValidation";

import { useCurrentUser } from "vuefire";

// Props for the Misebox user data
const props = defineProps({
  miseboxUser: {
    type: Object,
    required: true,
    default: () => ({}), // Default empty object
  },
});

const currentUser = useCurrentUser();
</script>
