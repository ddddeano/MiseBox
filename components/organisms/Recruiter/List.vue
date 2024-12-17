<!-- components/organisms/Recruiter/List.vue -->
<template>
  <div class="list">
    <div v-if="recruiters?.length">
      <div
        v-for="recruiter in filteredRecruiters"
        :key="recruiter.id"
        class="list-item"
      >
        <OrganismsRecruiterCell :recruiter="recruiter" />
      </div>
    </div>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { collection } from "firebase/firestore";
import { useCollection, useFirestore, useCurrentUser } from "vuefire";

const db = useFirestore();
const currentUser = useCurrentUser();

const collectionRef = computed(() =>
  currentUser.value ? collection(db, "recruiters") : null
);
const { data: recruiters } = useCollection(collectionRef);

const filteredRecruiters = computed(() =>
  recruiters?.value?.filter((recruiter) => recruiter.id !== currentUser.value?.uid) || []
);
</script>
