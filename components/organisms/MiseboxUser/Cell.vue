<!-- components/organisms/MiseboxUser/Cell.vue -->
<template>
  <div class="cell user-cell" v-if="miseboxUser">
    <NuxtLink :to="`/misebox-users/${miseboxUser.id}`" class="cell-header">
      <div class="cell-avatar">
        <MoleculesAvatar :url="miseboxUser.avatar" size="small" altText="User Avatar" />
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
    <div class="cell-footer">
      <div class="cell-interaction">
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

const props = defineProps({
  miseboxUser: {
    type: Object,
    required: true,
  },
});
</script>
