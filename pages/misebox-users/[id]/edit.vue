<template>
  <client-only>
    <div class="profile-forms">
      <div v-if="isCurrentUserProfile && miseboxUser">

        <MoleculesFormsAvatarSelection :user="miseboxUser"/>

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
          :formattingFunction="emailFormatting"
          :validationFunction="validateEmail"
        />

        <!-- Phone Number -->
        <MoleculesFormsSingleField
          label="Phone Number"
          collectionName="misebox-users"
          target="phone_number"
          :documentID="miseboxUser.id"
          :firebaseValue="miseboxUser.phone_number"
          :formattingFunction="removeWhitespace"
          :validationFunction="validatePhoneNumber"
        />

        <!-- Date of Birth -->
        <MoleculesFormsMultiField
          label="Date of Birth"
          collectionName="misebox-users"
          target="dob"
          :documentID="miseboxUser.id"
          :firebaseValue="miseboxUser.dob"
          :placeholders="{
            day: 'DD',
            month: 'MM',
            year: 'YYYY'
          }"
          :formattingFunction="dobFormatting"
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

        <!-- Navigation Buttons -->
        <div class="navigation-buttons">
          <NuxtLink :to="`/professionals/${miseboxUser.id}/edit`" class="btn btn-primary btn-pill">
            <SparklesIcon class="icon" />
            Edit Professional Profile
          </NuxtLink>
          <NuxtLink :to="`/chefs/${miseboxUser.id}/edit`" class="btn btn-primary btn-pill">
            <UserCircleIcon class="icon" />
            Edit Chef Profile
          </NuxtLink>
        </div>

      </div>
    </div>
  </client-only>
</template>

<script setup>
import { useCurrentUser } from 'vuefire';
import { useRoute } from 'vue-router';
import {
  formatDisplayName,
  formatHandle,
  emailFormatting,
  removeWhitespace,
  formatBio,
  dobFormatting,
  formatAddress,
  formatTags,
  validateDisplayName,
  validateHandle,
  validateEmail,
  validatePhoneNumber,
  validateDateOfBirth,
  validateAddress,
  validateBio,
  validateTags
} from '~/composables/utils/useFormattingAndValidation';

const route = useRoute();
const currentUser = useCurrentUser();
const isCurrentUserProfile = computed(
  () => currentUser.value?.uid === route.params.id
);
const { miseboxUser } = useMiseboxUser(currentUser);
</script>

<style scoped>
.profile-forms {
  /* Your specific styles for profile-forms */
}

.navigation-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
  margin-top: var(--spacing-l);
}
</style>
