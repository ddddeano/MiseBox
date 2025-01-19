<!-- components/organisms/MiseboxUser/Edit.vue -->
<template>
  <client-only>
    <div v-if="miseboxUser" class="edit-view">
      <h3>Edit Your Misebox Profile</h3>

      <!-- Avatar Selection -->
      <MoleculesFormsAvatarSelection
        collectionName="misebox-users"
        :item="miseboxUser"
      />

      <!-- Display Name -->
      <MoleculesFormsSingleField
        label="Display Name"
        collectionName="misebox-users"
        target="display_name"
        :firebaseValue="miseboxUser.display_name"
        placeholder="Enter your display name"
      />

      <!-- Handle -->
      <MoleculesFormsSingleField
        label="Handle"
        collectionName="misebox-users"
        target="handle"
        :firebaseValue="miseboxUser.handle"
        placeholder="Enter your handle"
      />

      <!-- Private: Email -->
      <p class="private-note">Private Field</p>
      <MoleculesFormsSingleField
        label="Email"
        collectionName="misebox-users"
        target="email"
        :firebaseValue="miseboxUser.email"
        placeholder="Enter your email"
      />

      <!-- Private: Phone Number -->
      <p class="private-note">Private Field</p>
      <MoleculesFormsSingleField
        label="Phone Number"
        collectionName="misebox-users"
        target="phone_number"
        :firebaseValue="miseboxUser.phone_number"
        placeholder="Enter your phone number"
      />

      <!-- Private: Date of Birth -->
      <p class="private-note">Private Field</p>
      <MoleculesFormsMultiField
        label="Date of Birth"
        collectionName="misebox-users"
        target="dob"
        :firebaseValue="miseboxUser.dob"
        :placeholders="{ day: 'DD', month: 'MM', year: 'YYYY' }"
      />

      <!-- Private: Address -->
      <p class="private-note">Private Field</p>
      <MoleculesFormsMultiField
        label="Address"
        collectionName="misebox-users"
        target="address"
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
      />

      <!-- User Bio -->
      <MoleculesFormsTextAreaField
        label="User Bio"
        collectionName="misebox-users"
        target="user_bio"
        :firebaseValue="miseboxUser.user_bio"
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
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
</script>
