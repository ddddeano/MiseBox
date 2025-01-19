<!-- components/organisms/Professional/View.vue -->
<template>
  <client-only>
    <div v-if="professional" class="view-profile">
      <!-- Title -->
      <section v-if="professional.title">
        <h2 class="view-profile-title">Title</h2>
        <p class="profile-item">{{ professional.title }}</p>
      </section>

      <!-- Bio -->
      <section v-if="professional.bio_short || professional.bio_long">
        <h2 class="view-profile-title">Bio</h2>
        <p v-if="professional.bio_short">{{ professional.bio_short }}</p>
        <p v-if="professional.bio_long">{{ professional.bio_long }}</p>
      </section>

      <!-- Kitchen Experience -->
      <section v-if="professional.kitchen_experience?.length">
        <h2 class="view-profile-title">Kitchen Experience</h2>
        <div v-for="experience in professional.kitchen_experience" :key="experience.id" class="profile-item">
          <h3>{{ experience.name }}</h3>
          <p>{{ experience.role }} ({{ experience.from_month }} {{ experience.from_year }} - {{ experience.to_month || 'Present' }} {{ experience.to_year }})</p>
          <p>{{ experience.formatted_address }}</p>
          <p>{{ experience.responsibilities }}</p>
        </div>
      </section>

      <!-- Certifications -->
      <section v-if="professional.certifications?.length">
        <h2 class="view-profile-title">Certifications</h2>
        <div v-for="cert in professional.certifications" :key="cert.name" class="profile-item">
          <h3>{{ cert.name }}</h3>
          <p>Issued by: {{ cert.issuing_organization }}</p>
          <p>Year: {{ cert.year }}</p>
        </div>
      </section>

      <!-- Education -->
      <section v-if="professional.education?.length">
        <h2 class="view-profile-title">Education</h2>
        <div v-for="edu in professional.education" :key="edu.school_name" class="profile-item">
          <h3>{{ edu.school_name }}</h3>
          <p>{{ edu.degree }} in {{ edu.field_of_study }} ({{ edu.start_year }} - {{ edu.end_year }})</p>
        </div>
      </section>

      <!-- Projects -->
      <section v-if="professional.projects?.length">
        <h2 class="view-profile-title">Projects</h2>
        <div v-for="proj in professional.projects" :key="proj.name" class="profile-item">
          <h3>{{ proj.name }}</h3>
          <p>{{ proj.description }}</p>
          <p>Year: {{ proj.year }}</p>
        </div>
      </section>
    </div>
    <div v-else>
      <p class="error-message">Professional profile not found.</p>
    </div>
  </client-only>
</template>

<script setup>
const props = defineProps({
  professional: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.view-profile {
  padding: var(--spacing-m);
  max-width: 800px;
  margin: 0 auto;
}

section {
  background-color: var(--background-2);
  margin-bottom: var(--spacing-l);
  padding: var(--spacing-m);
  border-radius: var(--radius-s);
  box-shadow: var(--shadow-sm);
}

.view-profile-title {
  font-size: var(--font-size-l);
  font-weight: bold;
  margin-bottom: var(--spacing-s);
  color: var(--text-primary);
}

.profile-item {
  margin-bottom: var(--spacing-m);
  font-size: var(--font-size-m);
}

.error-message {
  color: var(--error-color);
  text-align: center;
  font-size: var(--font-size-m);
}
</style>
