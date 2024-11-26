<template>
  <div class="card misebox-user-card" v-if="miseboxUser">
    <NuxtLink :to="`/misebox-users/${miseboxUser.id}`" class="view-profile-link">
      <div class="card-header">
        <MoleculesAvatar :user="miseboxUser" size="small" />
        <div class="user-info">
          <p class="display-name">{{ miseboxUser.display_name }}</p>
          <p class="handle">{{ miseboxUser.handle }}</p>
        </div>
      </div>
    </NuxtLink>

    <div class="card-expanded">
      <p class="bio" v-if="miseboxUser.user_bio">{{ miseboxUser.user_bio }}</p>
      <div class="user-apps" v-if="miseboxUser.user_apps?.length">
        <MoleculesUserAppIcon
          v-for="app in miseboxUser.user_apps"
          :key="app"
          :app="app"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  miseboxUser: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
/* Only include unique styles for MiseboxUserCard if needed */
</style>
