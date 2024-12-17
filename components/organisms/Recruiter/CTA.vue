<!-- components/organisms/Recruiter/CTA.vue -->
<template>
  <div class="call-to-action">
    <OrganismsUserCTA />

    <!-- Recruiter-specific content -->
    <div v-if="miseboxUser && !recruiter" class="call-to-action-message">
      <h2>Streamline Your Hiring Process</h2>
      <p>
        Misebox makes it easy to find top talent for your kitchen or hospitality team.
      </p>
      <ul>
        <li>🔍 Discover and connect with skilled professionals and chefs.</li>
        <li>📄 Manage job postings and applications seamlessly.</li>
        <li>🤝 Build long-lasting relationships with industry talent.</li>
      </ul>
      <button class="btn" @click="createRecruiter">Join as a Recruiter</button>
    </div>

    <!-- Recruiter already exists -->
    <div v-if="recruiter" class="call-to-action-existing">
      <p>Your Recruiter profile is live. Start posting jobs and connecting with talent now!</p>
    </div>
  </div>
</template>

<script setup>
const { currentRecruiter: recruiter, createRecruiter } = useRecruiter();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
</script>
