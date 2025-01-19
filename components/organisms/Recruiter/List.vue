<!-- components/organisms/Recruiter/List.vue -->
<template>
  <div class="list">
    <div v-if="filteredRecruiters?.length">
      <OrganismsRecruiterCell
        v-for="recruiter in filteredRecruiters"
        :key="recruiter.id"
        :recruiter="recruiter"
      />
    </div>
    <p v-else>No recruiters found.</p>
  </div>
</template>

<script setup>
import { useCurrentUser } from "vuefire";
const currentUser = useCurrentUser();

const { recruitersCollection } = useRecruiter();

const recruiters = recruitersCollection();

const filteredRecruiters = computed(() =>
  recruiters?.value?.filter((recruiter) => recruiter.id !== currentUser.value?.uid) || []
);
</script>
