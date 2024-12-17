<!-- components/organisms/Chef/Edit.vue -->
<template>
  <client-only>
    <div class="edit-view" v-if="chef">
      <h3>Edit Your Chef Profile</h3>

      <!-- Specialties (Array of Strings) -->
      <MoleculesFormsArrayOfStrings
        label="Specialties"
        collectionName="chefs"
        target="specialties"
        :documentID="currentUser.uid"
        :firebaseValue="chef.specialties"
        placeholder="Enter your specialties"
        :itemPlaceholder="'Enter a specialty'"
        :formattingFunction="formatSpecialty"
        :validationFunction="validateSpecialty"
      />

      <!-- Availability -->
      <MoleculesFormsObjectArray
        label="Availability"
        collectionName="chefs"
        target="availability"
        :documentID="currentUser.uid"
        :firebaseValue="chef.availability"
        :newObject="{ day: '', time_from: '', time_to: '' }"
        :formattingFunction="formatAvailability"
        :validationFunction="validateAvailability"
      >
        <template #display="{ item }">
          <OrganismsChefFieldsAvailability :availability="item" mode="display" />
        </template>
        <template #edit="{ item }">
          <OrganismsChefFieldsAvailability :availability="item" mode="edit" />
        </template>
        <template #create>
          <OrganismsChefFieldsAvailability mode="create" />
        </template>
      </MoleculesFormsObjectArray>

      <!-- Recipes -->
      <MoleculesFormsObjectArray
        label="Recipes"
        collectionName="chefs"
        target="recipes"
        :documentID="currentUser.uid"
        :firebaseValue="chef.recipes"
        :newObject="{ id: '', name: '', ingredients: '', instructions: '' }"
        :formattingFunction="formatRecipes"
        :validationFunction="validateRecipes"
      >
        <template #display="{ item }">
          <OrganismsChefFieldsRecipe :recipe="item" mode="display" />
        </template>
        <template #edit="{ item }">
          <OrganismsChefFieldsRecipe :recipe="item" mode="edit" />
        </template>
        <template #create>
          <OrganismsChefFieldsRecipe mode="create" />
        </template>
      </MoleculesFormsObjectArray>

      <!-- Events -->
      <MoleculesFormsObjectArray
        label="Events"
        collectionName="chefs"
        target="events"
        :documentID="currentUser.uid"
        :firebaseValue="chef.events"
        :newObject="{
          name: '',
          date: '',
          location: '',
          description: '',
          document_url: ''
        }"
        :formattingFunction="formatEvents"
        :validationFunction="validateEvents"
      >
        <template #display="{ item }">
          <OrganismsChefFieldsEvent :event="item" mode="display" />
        </template>
        <template #edit="{ item }">
          <OrganismsChefFieldsEvent :event="item" mode="edit" />
        </template>
        <template #create>
          <OrganismsChefFieldsEvent mode="create" />
        </template>
      </MoleculesFormsObjectArray>

      <!-- Gallery -->
      <MoleculesFormsObjectArray
        label="Gallery"
        collectionName="chefs"
        target="gallery"
        :documentID="currentUser.uid"
        :firebaseValue="chef.gallery"
        :newObject="{ image_url: '', description: '' }"
        :formattingFunction="formatGallery"
        :validationFunction="validateGallery"
      >
        <template #display="{ item }">
          <OrganismsChefFieldsGallery :image="item" mode="display" />
        </template>
        <template #edit="{ item }">
          <OrganismsChefFieldsGallery :image="item" mode="edit" />
        </template>
        <template #create>
          <OrganismsChefFieldsGallery mode="create" />
        </template>
      </MoleculesFormsObjectArray>
    </div>
    <div v-else>
      <p class="access-denied-message">
        You do not have permission to edit this profile.
      </p>
    </div>
  </client-only>
</template>

<script setup>
import { useCurrentUser } from "vuefire";
import {
  formatSpecialty,
  validateSpecialty,
  formatAvailability,
  validateAvailability,
  formatRecipes,
  validateRecipes,
  formatEvents,
  validateEvents,
  formatGallery,
  validateGallery,
} from "~/composables/utils/useChefFormattingAndValidation";

// Props for the Chef data
const props = defineProps({
  chef: {
    type: Object,
    required: true,
    default: () => ({}), // Default empty object
  },
});

const currentUser = useCurrentUser();
</script>

