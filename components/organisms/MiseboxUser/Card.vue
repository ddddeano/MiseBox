<!-- components/organisms/MiseboxUser/Card.vue -->
<template>
  <div class="card user-card" v-if="miseboxUser">
    <NuxtLink :to="`/misebox-users/${miseboxUser.id}`" class="card-header">
      <div class="card-avatar">
        <MoleculesAvatar :url="miseboxUser.avatar" size="medium" altText="User Avatar" />
      </div>
      <div class="header-content">
        <span class="display-name" v-if="miseboxUser.display_name">
          {{ miseboxUser.display_name }}
        </span>
        <div class="handle" v-if="miseboxUser.handle">@{{ miseboxUser.handle }}</div>
      </div>
      <div class="icon">
        <ChevronRightIcon />
      </div>
    </NuxtLink>
    <div class="main-content">
      <p v-if="miseboxUser.bio" class="bio">{{ miseboxUser.bio }}</p>
    </div>
    <div class="card-footer">
      <div class="card-interaction">
        <div v-if="miseboxUser?.id !== currentUser?.uid" class="not-self">
          <MoleculesFollowButton :user="miseboxUser" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCurrentUser } from "vuefire";

const currentUser = useCurrentUser();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
</script>
