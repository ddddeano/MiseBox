<!-- components/organisms/Job/CTA.vue -->
<template>
  <div class="call-to-action">
    <OrganismsUserCTA />

    <!-- Professional requirement layer -->
    <div v-if="miseboxUser && !professional" class="call-to-action-message">
      <h2>Become a Professional First</h2>
      <p>
        To apply for jobs and connect with recruiters, you need a Professional profile. Set up your Professional account to get started.
      </p>
      <button class="btn" @click="redirectToProfessionalCTA">Create Professional Profile</button>
    </div>

    <!-- Job Search Wizard -->
    <div v-if="miseboxUser && professional" class="call-to-action-message">
      <h2>Find Your Next Job</h2>
      <p>
        Explore tailored job opportunities that align with your skills and career goals.
      </p>
      <OrganismsJobSearchWizard />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const { currentProfessional: professional } = useProfessional();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();

// Redirect to the Professional CTA page
const redirectToProfessionalCTA = () => {
  router.push("/professionals");
};
</script>
