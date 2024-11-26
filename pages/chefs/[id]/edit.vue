<template>
  <client-only>
    <div class="profile-forms">
      <!-- Check if the routed chef is the current user for editing access -->
      <div v-if="isViewingOwnRoute && chef">
        <button @click="handleSignOut" class="btn btn-secondary btn-pill sign-out-btn">
          Sign Out
        </button>

        <!-- Kitchens -->
        <MoleculesFormsObjectArray
          label="Kitchens"
          :firebaseValue="chef.kitchens"
          collectionName="chefs"
          :documentID="chef.id"
          target="kitchens"
          :formattingFunction="formatKitchens"
          :validationFunction="validateKitchens"
          :newObject="{
            place_name: '',
            place_id: '',
            role: '',
            from_year: '',
            from_month: '',
            to_year: '',
            to_month: '',
            formatted_address: '',
            responsibilities: '',
            document_url: '',
            city: '',
            region: ''
          }"
        >
          <template #display="{ item }">
            <OrganismsChefEditKitchen :kitchen="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <OrganismsChefEditKitchen :kitchen="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <OrganismsChefEditKitchen :kitchen="item" mode="create" />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Availability -->
        <MoleculesFormsObjectArray
          label="Availability"
          :firebaseValue="chef.availability"
          collectionName="chefs"
          :documentID="chef.id"
          target="availability"
          :formattingFunction="formatAvailability"
          :validationFunction="validateAvailability"
          :newObject="{ day: '', time_from: '', time_to: '' }"
        >
          <template #display="{ item }">
            <OrganismsChefEditAvailability :availability="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <OrganismsChefEditAvailability :availability="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <OrganismsChefEditAvailability mode="create" />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Recipes -->
        <MoleculesFormsObjectArray
          label="Recipes"
          :firebaseValue="chef.recipes"
          collectionName="chefs"
          :documentID="chef.id"
          target="recipes"
          :formattingFunction="formatRecipes"
          :validationFunction="validateRecipes"
          :newObject="{ id: '', name: '', ingredients: '', instructions: '' }"
        >
          <template #display="{ item }">
            <OrganismsChefEditRecipe :recipe="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <OrganismsChefEditRecipe :recipe="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <OrganismsChefEditRecipe :recipe="item" mode="create" />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Events -->
        <MoleculesFormsObjectArray
          label="Events"
          :firebaseValue="chef.events"
          collectionName="chefs"
          :documentID="chef.id"
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
            <OrganismsChefEditEvent :event="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <OrganismsChefEditEvent :event="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <OrganismsChefEditEvent mode="create" />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Gallery -->
        <MoleculesFormsObjectArray
          label="Gallery"
          :firebaseValue="chef.gallery"
          collectionName="chefs"
          :documentID="chef.id"
          target="gallery"
          :formattingFunction="formatGallery"
          :validationFunction="validateGallery"
          :newObject="{ image_url: '', description: '' }"
        >
          <template #display="{ item }">
            <OrganismsChefEditGallery :image="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <OrganismsChefEditGallery :image="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <OrganismsChefEditGallery mode="create" />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Specialties -->
        <MoleculesFormsSingleField
          label="Specialties"
          collectionName="chefs"
          target="specialties"
          :documentID="chef.id"
          :firebaseValue="chef.specialties"
          :formattingFunction="formatSpecialties"
          :validationFunction="validateSpecialties"
        />

        <!-- View Profile Button -->
        <button @click="viewProfile" class="btn btn-primary">View My Profile</button>
      </div>

      <div v-else>
        <p class="access-denied-message">You do not have permission to edit this profile.</p>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import {
  formatKitchens,
  validateKitchens,
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
} from '~/composables/utils/useChefFormattingAndValidation';
import { useRouter, useRoute } from 'vue-router';
import { useFirestore, useDocument, useCurrentUser } from 'vuefire';
import { doc } from 'firebase/firestore';

const router = useRouter();
const route = useRoute();
const db = useFirestore();
const currentUser = useCurrentUser();

// Fetch routed Chef profile from Firestore
const chefDocRef = computed(() =>
  currentUser.value ? doc(db, 'chefs', route.params.id) : undefined
);

const { data: chef } = useDocument(chefDocRef);

// Check if the current user is viewing their own profile
const isViewingOwnRoute = computed(() => {
  return currentUser.value?.uid === route.params.id;
});

const { logout } = useAuth();

const handleSignOut = () => logout();

const viewProfile = () => {
  if (chef.value) {
    router.push(`/chefs/${chef.value.id}`);
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

.access-denied-message {
  text-align: center;
  margin-top: var(--spacing-m);
  color: var(--text-secondary);
}
</style>
