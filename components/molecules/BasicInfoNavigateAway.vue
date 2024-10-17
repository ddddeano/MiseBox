<template>
  <div class="navigation-buttons">
    <!-- Button to Complete Your Profile (Edit) -->
    <NuxtLink :to="`/${profileType}/${userId}/edit`" class="btn pill">
      <SparklesIcon class="icon" />
      Complete Your {{ profileType }} Profile
    </NuxtLink>

    <!-- Button to Navigate to Dashboard -->
    <NuxtLink :to="`/${profileType}`" class="btn pill">
      <UserCircleIcon class="icon" />
      Go to {{ profileType }} Dashboard
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

.btn.pill {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-s) var(--spacing-l);
  background-color: var(--primary);
  color: var(--text-inverted);
  border-radius: var(--radius-full);
  text-decoration: none;
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-medium);
  width: 100%;
  justify-content: center;
}

.btn.pill:hover {
  background-color: var(--primary-dark);
}

.btn.pill .icon {
  width: 20px;
  height: 20px;
  margin-right: var(--spacing-xs);
  color: var(--text-inverted);
}

@media (min-width: 768px) {
  .navigation-buttons {
    flex-direction: row;
  }

  .btn.pill {
    width: auto;
    flex: 1;
  }
}
</style>
