<template>
  <client-only>
    <div class="profile-forms">
      <div class="buttons">
        <div class="edit-button" @click="toggleEditing" :class="{ disabled: isEditing }">
          <PencilSquareIcon class="icon" />
        </div>
        <div class="view-button" @click="toggleEditing" :class="{ disabled: !isEditing }">
          <EyeIcon class="icon" />
        </div>
        <div class="preview-button" @click="goToProfile">
          <UserCircleIcon class="icon" />
        </div>
      </div>

      <div v-if="chef">
        <!-- Bio -->
        <div class="form-dropdown">
          <MainFormsGenericLongText
            :userId="chef.id"
            :subscription="chef.bio"
            :isEditing="isEditing"
            collectionName="chefs"
            target="bio"
            label="Chef Bio"
            :maxLength="500"
            placeholder="Enter your Chef Bio here"
          />
        </div>

        <!-- Specialties -->
        <div class="form-field">
          <MainFormsGenericArrayOfStrings
            :userId="chef.id"
            :items="chef.specialties"
            :isEditing="isEditing"
            collectionName="chefs"
            target="specialties"
            placeholder="Enter a specialty"
          />
        </div>

        <!-- Restaurants -->
        <div class="form-dropdown">
          <MainFormsArrayManager
            :userId="chef.id"
            title="Restaurants"
            :items="chef.restaurants"
            :isEditing="isEditing"
            collectionName="chefs"
            target="restaurants"
          >
            <template #create>
              <SubChefFormsRestaurantsCreate
                :userId="chef.id"
                :collectionName="'chefs'"
              />
            </template>
          </MainFormsArrayManager>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useCurrentUser, useDocument, useFirestore } from 'vuefire';
import { ref, computed } from 'vue';
import { doc } from 'firebase/firestore';

const db = useFirestore();
const router = useRouter();
const route = useRoute();
const routeUserId = computed(() => route.params.id);
const currentUser = useCurrentUser();
const isCurrentUserProfile = computed(() => currentUser.value?.uid === routeUserId.value);
const isEditing = ref(false);

const toggleEditing = () => {
  if (isCurrentUserProfile.value) {
    isEditing.value = !isEditing.value;
  }
};

const goToProfile = () => {
  if (currentUser.value?.uid) {
    router.push(`/chefs/${currentUser.value.uid}`);
  }
};

// Fetch chef document from Firestore
const chefDocRef = computed(() => {
  if (currentUser.value) {
    return doc(db, 'chefs', routeUserId.value);
  }
  return null;
});

const { data: chef } = useDocument(chefDocRef);
</script>
