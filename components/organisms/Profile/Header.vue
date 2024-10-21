<template>
  <div class="profile-header">
    <MoleculesAvatar :user="user" size="large" />
    <h1 class="display-name">{{ user.display_name || 'Anonymous' }}</h1>
    <p class="handle" v-if="user.handle">{{ user.handle }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--spacing-l);
}

.display-name {
  margin-top: var(--spacing-s);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.handle {
  color: var(--text-secondary);
  font-size: var(--font-size-m);
}
</style>
