<template>
  <div class="navigation-buttons">
    <NuxtLink :to="`/${profileType}/${userId}/edit`" class="btn btn-primary btn-pill">
      <SparklesIcon class="icon" />
      Complete Your Profile
    </NuxtLink>

    <NuxtLink :to="`/${profileType}`" class="btn btn-primary btn-pill">
      <UserCircleIcon class="icon" />
      Go to Dashboard
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  profileType: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.navigation-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
  margin-top: var(--spacing-l);
}
</style>
