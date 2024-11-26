<template>
  <div class="display-profile-header">
    <div class="display-profile-avatar">
      <Avatar :src="avatar" :size="150" />
    </div>

    <div class="vertical-divider"></div>

    <div class="display-profile-info">
      <div class="display-profile-name">{{ fullName.firstName }} {{ fullName.lastName }}</div>
      <div class="display-profile-display-name">{{ displayName }}</div>
      <div class="display-profile-handle">
        <AtSymbolIcon class="icon mini-icon" />
        {{ handle }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  profile: Object
});

const avatar = computed(() => props.profile?.avatar || '');
const displayName = computed(() => props.profile?.display_name || '');
const handle = computed(() => props.profile?.handle || '');
const fullName = computed(() => props.profile?.full_name || { firstName: '', lastName: '' });
</script>

<style scoped>
/* Avatar, Name, and Handle in header */
.display-profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.display-profile-avatar {
  margin-right: 20px;
}

.vertical-divider {
  width: 2px;
  background-color: var(--border-color);
  height: 100px;
  margin-left: 20px;
  margin-right: 20px;
}

.display-profile-name {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 5px;
}

.display-profile-display-name {
  font-size: 1.2em;
  margin-bottom: 5px;
}

.display-profile-handle {
  font-size: 1.1em;
  color: var(--text-color-muted);
  display: flex;
  align-items: center;
  gap: 5px;
  font-style: italic;
}
</style>
