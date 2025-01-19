<!-- components/organisms/Chef/Edit.vue -->
<template>
  <client-only>
    <div v-if="chef" class="edit-view">
      <h3>Edit Your Chef Profile</h3>
  <!-- Manage Kitchens Link -->
  <div class="manage-kitchens">
        <nuxt-link :to="`/chefs/${chef.id}/kitchens`" class="btn-primary">
          Manage Kitchens
        </nuxt-link>
      </div>
      <!-- Specialties (Array of Strings) -->
      <MoleculesFormsArrayOfStrings
        label="Specialties"
        collectionName="chefs"
        target="specialties"
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
        :firebaseValue="chef.availability"
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
        :firebaseValue="chef.recipes"
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
        :firebaseValue="chef.events"
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
        :firebaseValue="chef.gallery"
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
      <p>You do not have permission to edit this profile.</p>
    </div>
  </client-only>
</template>

<script setup>
import { useCurrentUser } from "vuefire";

const currentUser = useCurrentUser();
const { currentChef: chef } = useChef();
</script>
