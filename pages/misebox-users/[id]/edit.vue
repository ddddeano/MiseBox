<template>
  <client-only>
    <div class="profile-forms">
      <div v-if="isCurrentUserProfile && miseboxUser">
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
          placeholder="Enter your bio here"
          :formattingFunction="formatBio"
          :validationFunction="validateBio"
          :maxLength="500"
        />

        <!-- Tags -->
        <MoleculesFormsArrayOfStrings
          label="Tags"
          collectionName="misebox-users"
          target="tags"
          :documentID="miseboxUser.id"
          :firebaseValue="miseboxUser.tags"
          itemPlaceholder="Add a tag"
          :formattingFunction="formatTags"
          :validationFunction="validateTags"
        />
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { useCurrentUser } from 'vuefire';
import { useRoute } from 'vue-router';

const route = useRoute();
const currentUser = useCurrentUser();
const isCurrentUserProfile = computed(
  () => currentUser.value?.uid === route.params.id
);
const { miseboxUser } = useMiseboxUser(currentUser);
</script>
