<template>
  <div class="non-editable-fields">
    <p v-if="profile.id"><strong>ID:</strong> {{ profile.id }}</p>
    <p v-if="profile.mise_code"><strong>Mise Code:</strong> {{ profile.mise_code }}</p>
    <p v-if="profile.professional_account_created"><strong>Professional Account Created:</strong> {{ formatDate(profile.professional_account_created) }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  profile: {
    type: Object,
    required: true,
  }
});

const formatDate = (timestamp) => {
  if (!timestamp) return 'Not available';
  return new Date(timestamp.seconds * 1000).toLocaleDateString("en-US");
};
</script>

<style scoped>
.non-editable-fields {
  padding: var(--padding-small);
  border-radius: var(--corner-radius-small);
  background-color: var(--background-highlight);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  margin-bottom: var(--margin-medium);
}

.non-editable-fields p {
  font-size: var(--font-size-medium);
  line-height: var(--line-height-medium);
  margin-bottom: var(--margin-small);
}

.non-editable-fields strong {
  color: var(--primary-color); /* Using the primary color to highlight labels */
}

.non-editable-fields p:last-child {
  margin-bottom: 0; /* Remove the bottom margin for the last paragraph */
}
</style>
