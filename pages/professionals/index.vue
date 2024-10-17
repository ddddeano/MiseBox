<template>
  <client-only>
    <div class="index" v-if="currentUser?.uid">
      <!-- Check if the user already has a Professional app -->
      <div v-if="hasApp">
        <!-- If they have a Professional app, show a link to their Professional profile -->
        <NuxtLink :to="`/professionals/${currentUser.uid}`">
          <SubProfessionalCard :uid="currentUser.uid" />
        </NuxtLink>
      </div>

      <!-- If no Professional app exists, offer to create one -->
      <div v-else>
        <button @click="createProfessionalApp">Create Professional App</button>
      </div>

      <!-- Display list of all professionals except the current user -->
      <div class="all-professionals" v-if="filteredProfessionals.length > 0">
        <h2>All Professionals</h2>
        <ul>
          <li v-for="professional in filteredProfessionals" :key="professional.id">
            <NuxtLink :to="`/professionals/${professional.id}`">
              <SubProfessionalCard :uid="professional.id" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <p v-else>Loading user data...</p>
  </client-only>
</template>

<script setup>
import { useCurrentUser, useDocument, useCollection, useFirestore } from 'vuefire';
import { doc, collection } from 'firebase/firestore';
import { useRouter } from 'vue-router';

const { createProfessional } = useProfessional();
const currentUser = useCurrentUser();
const db = useFirestore();
const router = useRouter();

const userDocRef = computed(() => currentUser.value ? doc(db, 'misebox-users', currentUser.value.uid) : null);
const { data: miseboxUserDoc } = useDocument(userDocRef);

// Check if the user has a Professional app
const hasApp = computed(() => {
  return Array.isArray(miseboxUserDoc.value?.user_apps) && miseboxUserDoc.value.user_apps.includes('professionals');
});

// Collection of all professionals
const professionalsCollection = collection(db, 'professionals');
const { data: professionals } = useCollection(professionalsCollection);

// Filter out the current user from the list of professionals
const filteredProfessionals = computed(() => {
  return professionals.value?.filter(professional => professional.id !== currentUser.value?.uid) || [];
});

// Function to create a Professional app
const createProfessionalApp = async () => {
  if (miseboxUserDoc.value) {
    if (!miseboxUserDoc.value.display_name || !miseboxUserDoc.value.mise_code) {
      alert('Display Name and Mise Code are required to create a Professional App');
      return;
    }
    await createProfessional(miseboxUserDoc.value);
    router.push(`/professionals/${currentUser.value.uid}/basic-info`);
  }
};
</script>
