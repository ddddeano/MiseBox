<template>
  <div class="user-card" v-if="user">
    <NuxtLink :to="`/misebox-users/${user.id}`" class="view-profile-link">
      <div class="user-card-header">
        <MoleculesAvatar :user="user" size="small" />
        <div class="user-info">
          <p v-if="user.display_name" class="display-name">
            {{ user.display_name }}
          </p>
          <p v-if="user.handle" class="handle">@{{ user.handle }}</p>
        </div>
      </div>
    </NuxtLink>

    <div class="user-card-expanded">
      <p v-if="user.user_bio" class="user-bio">{{ user.user_bio }}</p>
      <div v-if="user.user_apps && user.user_apps.length > 0" class="user-apps">
        <div v-for="app in user.user_apps" :key="app" class="app-icon-container">
          <MoleculesUserAppIcon :app="app" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.current-user {
  background: var(--primary);
}
.user-card {
  padding: var(--spacing-s);
  cursor: pointer;
  border-bottom: 1px solid var(--border);
}

.user-card-header {
  display: flex;
  align-items: center;
}

.user-info {
  margin-left: var(--spacing-s);
}

.display-name {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  margin: 0;
}

.handle {
  font-size: var(--font-size-s);
  color: var(--text-secondary);
  margin: 0;
}

.user-card-expanded {
  margin-top: var(--spacing-s);
}

.user-bio {
  font-size: var(--font-size-s);
  color: var(--text-primary);
  margin-bottom: var(--spacing-s);
}

.user-apps {
  display: flex;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-s);
}

.view-profile-link {
  text-decoration: none;
  color: inherit; /* Inherit text color from parent */
}
</style>
