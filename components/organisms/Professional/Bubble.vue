<template>
  <div class="profile-bubble">
    <NuxtLink :to="`/professionals/${id}`" class="profile-link">
      <div class="bubble-content">
        <p class="handle">@{{ handle }}</p>
        <p class="label">Professional Profile</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.profile-bubble {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 100px;
  background-color: var(--background-2);
  border-radius: var(--radius-m);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.profile-bubble:hover {
  transform: scale(1.05);
}

.profile-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--text-primary);
}

.bubble-content {
  text-align: center;
}

.handle {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-xxs);
}

.label {
  font-size: var(--font-size-s);
  color: var(--text-secondary);
}
</style>
