<template>
  <client-only>
    <div class="profile-forms">
      <!-- Authorization Check -->
      <div v-if="isViewingOwn && chef">
        <h3>Edit Your Chef Profile</h3>

        <!-- Availability -->
        <MoleculesFormsObjectArray
          label="Availability"
          :firebaseValue="chef.availability"
          collectionName="chefs"
          :documentID="currentUser.uid"
          target="availability"
          :formattingFunction="formatAvailability"
          :validationFunction="validateAvailability"
          :newObject="{ day: '', time_from: '', time_to: '' }"
        >
          <template #display="{ item }">
            <OrganismsChefFieldsAvailability :availability="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <OrganismsChefFieldsAvailability :availability="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <OrganismsChefFieldsAvailability mode="create" />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Recipes -->
        <MoleculesFormsObjectArray
          label="Recipes"
          :firebaseValue="chef.recipes"
          collectionName="chefs"
          :documentID="currentUser.uid"
          target="recipes"
          :formattingFunction="formatRecipes"
          :validationFunction="validateRecipes"
          :newObject="{ id: '', name: '', ingredients: '', instructions: '' }"
        >
          <template #display="{ item }">
            <OrganismsChefFieldsRecipe :recipe="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <OrganismsChefFieldsRecipe :recipe="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <OrganismsChefFieldsRecipe :recipe="item" mode="create" />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Events -->
        <MoleculesFormsObjectArray
          label="Events"
          :firebaseValue="chef.events"
          collectionName="chefs"
          :documentID="currentUser.uid"
          target="events"
          :formattingFunction="formatEvents"
          :validationFunction="validateEvents"
          :newObject="{
            name: '',
            date: '',
            location: '',
            description: '',
            document_url: ''
          }"
        >
          <template #display="{ item }">
            <OrganismsChefFieldsEvent :event="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <OrganismsChefFieldsEvent :event="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <OrganismsChefFieldsEvent mode="create" />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Gallery -->
        <MoleculesFormsObjectArray
          label="Gallery"
          :firebaseValue="chef.gallery"
          collectionName="chefs"
          :documentID="currentUser.uid"
          target="gallery"
          :formattingFunction="formatGallery"
          :validationFunction="validateGallery"
          :newObject="{ image_url: '', description: '' }"
        >
          <template #display="{ item }">
            <OrganismsChefFieldsGallery :image="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <OrganismsChefFieldsGallery :image="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <OrganismsChefFieldsGallery mode="create" />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Specialties -->
        <MoleculesFormsSingleField
          label="Specialties"
          collectionName="chefs"
          target="specialties"
          :documentID="currentUser.uid"
          :firebaseValue="chef.specialties"
          :formattingFunction="formatSpecialties"
          :validationFunction="validateSpecialties"
          placeholder="Enter your specialties"
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
import { useRoute } from "vue-router";
import { useFirestore, useDocument, useCurrentUser } from "vuefire";
import { doc } from "firebase/firestore";
import {
  formatAvailability,
  validateAvailability,
  formatRecipes,
  validateRecipes,
  formatEvents,
  validateEvents,
  formatGallery,
  validateGallery,
  formatSpecialties,
  validateSpecialties,
} from "~/composables/utils/useChefFormattingAndValidation";


// Firestore and routing setup
const route = useRoute();
const db = useFirestore();
const currentUser = useCurrentUser();

// Fetch chef data
const chefDocRef = computed(() =>
  currentUser.value ? doc(db, "chefs", route.params.id) : null
);

const { data: chef } = useDocument(chefDocRef);

// Authorization check
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
