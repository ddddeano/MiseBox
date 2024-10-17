<template>
  <div class="card misebox-user-collection-card">
    <!-- Avatar, Display Name, Handle -->
    <div class="user-card-header">
      <!-- The Avatar handles itself (either avatar URL or initials) -->
      <MoleculesAvatar
        :user="{
          initials: user.display_name
            ? user.display_name.charAt(0).toUpperCase()
            : '',
          url: user.avatar,
        }"
        size="small"
      />

      <div class="user-info">
        <!-- Conditionally render display name if it exists -->
        <p v-if="user.display_name" class="display-name">
          {{ user.display_name }}
        </p>

        <!-- Conditionally render handle if it exists -->
        <p v-if="user.handle" class="handle">@{{ user.handle }}</p>
      </div>
    </div>

    <!-- Conditionally render user apps if they exist -->
    <div class="user-apps" v-if="user.user_apps && user.user_apps.length > 0">
      <div
        v-for="app in user.user_apps"
        :key="app"
        class="app-icon-container"
      >
        <MoleculesUserAppIcon :app="app" />
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
.misebox-user-collection-card {
  background-color: var(--secondary);
}

.user-card-header {
  display: flex;
  align-items: flex-start; /* Avatar aligned to the top */
  margin-bottom: var(--spacing-sm); /* Spacing below header */
}

.user-info {
  display: flex;
  flex-direction: column;
  padding-left: var(--spacing-m);
}

.display-name {
  font-size: var(--font-size-m); /* Use font size from primitives */
  font-weight: var(--font-weight-bold); /* Use font weight from primitives */
  color: var(--text-primary); /* Use text color from themes */
  margin: 0; /* Remove default margin */
}

.handle {
  font-size: var(--font-size-s); /* Use smaller font size */
  color: var(--text-primary); /* Use secondary text color from themes */
  margin: 0; /* Remove default margin */
}

.user-apps {
  display: flex;
  gap: var(--spacing-sm); /* Space between app icons */
  margin-top: var(--spacing-sm); /* Spacing above app icons */
}

/* Parent defining custom colors for each app icon */
.app-icon-container:nth-child(1) {
  --app-icon-background: var(--primary);
  --app-icon-color: var(--text-primary);
  --app-icon-border: var(--border);
}

.app-icon-container:nth-child(2) {
  --app-icon-background: var(--tertiary);
  --app-icon-color: var(--text-secondary);
  --app-icon-border: var(--border);
}

.app-icon-container:nth-child(3) {
  --app-icon-background: var(--tertiary);
  --app-icon-color: var(--text-primary);
  --app-icon-border: var(--border);
}
</style>
