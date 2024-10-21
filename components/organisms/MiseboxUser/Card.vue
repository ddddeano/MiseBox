<template>
  <div class="card user-card" v-if="user">
    <NuxtLink :to="`/misebox-users/${user.id}`" class="view-profile-link">
      <div class="card-header">
        <MoleculesAvatar :user="user" size="small" />
        <div class="user-info">
          <p v-if="user.display_name" class="display-name">
            {{ user.display_name }}
          </p>
          <p v-if="user.handle" class="handle">{{ user.handle }}</p>
        </div>
      </div>
    </NuxtLink>

    <div class="card-expanded">
      <p v-if="user.user_bio" class="bio">{{ user.user_bio }}</p>
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
<style>

</style>
