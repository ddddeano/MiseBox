<template>
  <client-only>
    <div class="profile-forms">
      <div v-if="isViewingOwnRoute && miseboxUser">
        <button @click="handleSignOut" class="btn btn-secondary btn-pill sign-out-btn">
          Sign Out
        </button>

        <!-- Avatar Selection -->
        <MoleculesFormsAvatarSelection :user="miseboxUser" />

        <!-- Display Name -->
        <MoleculesFormsSingleField
          label="Display Name"
          collectionName="misebox-users"
          target="display_name"
          :documentID="miseboxUser.id"
          :firebaseValue="miseboxUser.display_name"
          :formattingFunction="formatDisplayName"
          :validationFunction="validateDisplayName"
        />

        <!-- Handle -->
        <MoleculesFormsSingleField
          label="Handle"
          collectionName="misebox-users"
          target="handle"
          :documentID="miseboxUser.id"
          :firebaseValue="miseboxUser.handle"
          :formattingFunction="formatHandle"
          :validationFunction="validateHandle"
        />

        <!-- Email -->
        <MoleculesFormsSingleField
          label="Email"
          collectionName="misebox-users"
          target="email"
          :documentID="miseboxUser.id"
          :firebaseValue="miseboxUser.email"
          :formattingFunction="formatEmail"
          :validationFunction="validateEmail"
        />

        <!-- Phone Number -->
        <MoleculesFormsSingleField
          label="Phone Number"
          collectionName="misebox-users"
          target="phone_number"
          :documentID="miseboxUser.id"
          :firebaseValue="miseboxUser.phone_number"
          :formattingFunction="formatPhoneNumber"
          :validationFunction="validatePhoneNumber"
        />

        <!-- Date of Birth -->
        <MoleculesFormsMultiField
          label="Date of Birth"
          collectionName="misebox-users"
          target="dob"
          :documentID="miseboxUser.id"
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
          :formattingFunction="formatAddress"
          :validationFunction="validateAddress"
        />

        <!-- User Bio -->
        <MoleculesFormsTextAreaField
          label="User Bio"
          collectionName="misebox-users"
          target="user_bio"
          :documentID="miseboxUser.id"
          :firebaseValue="miseboxUser.user_bio"
          :formattingFunction="formatBio"
          :validationFunction="validateBio"
          :maxLength="500"
        />
      </div>

      <button @click="viewProfile" class="btn btn-primary">View My Profile</button>
    </div>
  </client-only>
</template>

<script setup>
import { computed } from 'vue';
import {
  formatDisplayName,
  formatHandle,
  formatEmail,
  formatPhoneNumber,
  formatDateOfBirth,
  formatAddress,
  formatBio,
  validateDisplayName,
  validateHandle,
  validateEmail,
  validatePhoneNumber,
  validateDateOfBirth,
  validateAddress,
  validateBio,
} from '~/composables/utils/useMiseboxUserFormattingAndValidation';
import { useRouter, useRoute } from 'vue-router';
import { useFirestore, useDocument, useCurrentUser } from 'vuefire';
import { doc } from 'firebase/firestore';

const router = useRouter();
const route = useRoute();
const db = useFirestore();
const currentUser = useCurrentUser();

// Guard against operations without a current user
const miseboxUserDocRef = computed(() =>
  currentUser.value ? doc(db, 'misebox-users', route.params.id) : undefined
);

const { data: miseboxUser } = useDocument(miseboxUserDocRef);

// Check if the current user is viewing their own profile
const isViewingOwnRoute = computed(() => {
  return currentUser.value?.uid === route.params.id;
});

const { logout } = useAuth();

const handleSignOut = () => logout();

const viewProfile = () => {
  if (miseboxUser.value) {
    router.push(`/misebox-users/${miseboxUser.value.id}`);
  }
};
</script>

<style scoped>
.profile-forms {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sign-out-btn {
  margin-top: var(--spacing-s);
}

.btn-primary {
  margin-top: var(--spacing-m);
}
</style>
