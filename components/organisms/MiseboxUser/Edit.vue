<template>
  <client-only>
    <div class="profile-forms">
      <div v-if="isViewingOwn && miseboxUser">
        <h3>Edit Your Misebox Profile</h3>

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
          You do not have permission to edit this profile.
        </p>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { computed } from "vue";
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

import { useFirestore, useDocument, useCurrentUser } from "vuefire";
import { doc } from "firebase/firestore";
import { useRoute } from "vue-router";

const db = useFirestore();
const currentUser = useCurrentUser();
const route = useRoute();

// Fetch the Misebox User profile data
const miseboxUserDocRef = computed(() =>
  currentUser.value ? doc(db, "misebox-users", route.params.id) : null
);

const { data: miseboxUser } = useDocument(miseboxUserDocRef);

// Authorization Check
const isViewingOwn = computed(() => currentUser.value?.uid === route.params.id);
</script>

<style scoped>
.profile-forms {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: auto;
}

h3 {
  margin-bottom: var(--spacing-m);
  color: var(--text-primary);
  font-size: var(--font-size-xl);
}

.access-denied-message {
  text-align: center;
  margin-top: var(--spacing-m);
  color: var(--text-danger);
}
</style>
