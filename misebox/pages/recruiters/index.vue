<template>
  <client-only>
    <div class="index" v-if="currentUser?.uid">
      <div v-if="hasApp">
        <NuxtLink :to="`/recruiters/${currentUser.uid}`">
          <SubRecruiterCard :uid="currentUser.uid" />
        </NuxtLink>
      </div>

      <div v-else>
        <button @click="createRecruiterApp">Create Recruiter App</button>
      </div>

      <div class="all-recruiters" v-if="filteredRecruiters.length > 0">
        <h2>All Recruiters</h2>
        <ul>
          <li v-for="recruiter in filteredRecruiters" :key="recruiter.id">
            <NuxtLink :to="`/recruiters/${recruiter.id}`">
              <SubRecruiterCard :uid="recruiter.id" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <p v-else>Loading user data...</p>
  </client-only>
</template>

<script setup>
import { useCurrentUser } from 'vuefire';
import { useFirestore, useDocument, useCollection } from 'vuefire';
import { doc, collection } from 'firebase/firestore';

const currentUser = useCurrentUser();
const db = useFirestore();
const userDocRef = computed(() =>
  currentUser.value ? doc(db, 'misebox-users', currentUser.value.uid) : null
);
const { data: miseboxUserDoc } = useDocument(userDocRef);

const hasApp = computed(() => {
  return Array.isArray(miseboxUserDoc.value?.user_apps) && miseboxUserDoc.value.user_apps.includes('recruiter');
});

const recruitersCollection = collection(db, 'recruiters');
const { data: recruiters } = useCollection(recruitersCollection);

const filteredRecruiters = computed(() => {
  return recruiters.value?.filter(recruiter => recruiter.id !== currentUser.value?.uid) || [];
});

const createRecruiterApp = () => {
  if (miseboxUserDoc.value) {
    createRecruiter(miseboxUserDoc.value);
  }
};
</script>
