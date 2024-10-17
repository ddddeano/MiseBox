<template>
  <div class="subscription-info">
    <!-- Display Subscription Type -->
    <div class="subscription-detail">
      <label>Subscription Type:</label>
      <span>{{ subscription.type || 'No subscription' }}</span>
    </div>

    <!-- Manage Subscription Link (if editing) -->
    <div v-if="isEditing" class="manage-subscription">
      <NuxtLink to="/subscribe">Manage Subscription</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  userId: {
    type: String,
    default: "",
  },
  subscription: {
    type: Object,
    default: () => ({}),
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.subscription-info {
  padding: var(--padding-small);
  border: 1px solid var(--border-color);
  border-radius: var(--corner-radius-small);
  background-color: var(--background-highlight);
}

.subscription-detail {
  margin-bottom: var(--margin-small);
  display: flex;
  justify-content: space-between;
}

.subscription-detail label {
  font-weight: bold;
}

.manage-subscription {
  margin-top: var(--margin-medium);
  text-align: center;
}

.manage-subscription a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: bold;
}

.manage-subscription a:hover {
  text-decoration: underline;
}
</style>
