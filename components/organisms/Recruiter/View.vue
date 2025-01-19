<!-- components/organisms/Recruiter/View.vue -->
<template>
  <client-only>
    <div v-if="recruiter" class="view-profile">
      <section>
        <h2 class="view-profile-title">Recruiter Profile</h2>
        <p><strong>Name:</strong> {{ recruiter.name }}</p>
        <p><strong>Company:</strong> {{ recruiter.company }}</p>
        <p><strong>Bio:</strong> {{ recruiter.bio }}</p>
      </section>
    </div>
    <div v-else>
      <p class="error-message">Recruiter profile not found.</p>
    </div>
  </client-only>
</template>

<script setup>
const props = defineProps({
  recruiter: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
/* Similar styling as Professional */
.view-profile {
  padding: var(--spacing-m);
  max-width: 800px;
  margin: 0 auto;
}
.section {
  background-color: var(--background-2);
  margin-bottom: var(--spacing-l);
  padding: var(--spacing-m);
  border-radius: var(--radius-s);
}
</style>
