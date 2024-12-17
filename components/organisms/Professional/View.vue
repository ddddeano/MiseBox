<!-- components/organisms/Professional/View.vue -->
<template>
  <client-only>
    <div v-if="professional" class="professional-profile-container">
      <!-- Display Professional Title -->
      <section v-if="professional.title" class="shared-section">
        <h2 class="view-profile-title">Title</h2>
        <p>{{ professional.title }}</p>
      </section>

      <!-- Display Short Bio -->
      <section v-if="professional.bio_short" class="shared-section">
        <h2 class="view-profile-title">Short Bio</h2>
        <p>{{ professional.bio_short }}</p>
      </section>

      <!-- Display Kitchen Experience -->
      <section v-if="professional.kitchen_experience?.length" class="shared-section">
        <h2 class="view-profile-title">Kitchen Experience</h2>
        <div
          v-for="experience in professional.kitchen_experience"
          :key="experience.place_id"
          class="profile-item"
        >
          <h3>{{ experience.place_name }}</h3>
          <p>
            {{ experience.role }}
            ({{ experience.from_month }} {{ experience.from_year }} -
            {{ experience.to_month }} {{ experience.to_year }})
          </p>
          <p>{{ experience.formatted_address }}</p>
        </div>
      </section>
    </div>
    <div v-else>
      <p>No professional profile found.</p>
    </div>
  </client-only>
</template>

<script setup>
const props = defineProps({
  professional: {
    type: Object,
    required: true,
    default: () => ({}), // Default empty object
  },
});
</script>

<style scoped>
.professional-profile-container {
  padding: var(--spacing-m);
}

.shared-section {
  margin-bottom: var(--spacing-m);
}

.view-profile-title {
  font-size: var(--font-size-l);
  margin-bottom: var(--spacing-s);
}

.profile-item {
  margin-bottom: var(--spacing-s);
}
</style>
