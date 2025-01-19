<!-- components/organisms/Chef/Cell.vue -->
<template>
  <div class="cell chef-cell" v-if="miseboxUser && chef">
    <NuxtLink :to="`/chefs/${chef.id}`" class="cell-header">
      <div class="cell-avatar">
        <MoleculesAvatar :url="miseboxUser.avatar" size="small" altText="Chef Avatar" />
      </div>
      <div class="header-content">
        <div class="display-name" v-if="miseboxUser.display_name">{{ miseboxUser.display_name }}</div>
        <div class="handle" v-if="miseboxUser.handle">@{{ miseboxUser.handle }}</div>
        <div v-if="chef.specialty" class="highlight">{{ chef.specialty }}</div>
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

const props = defineProps({
  chef: {
    type: Object,
    required: true,
  },
});

const currentUser = useCurrentUser();
const { fetchMiseboxUser } = useMiseboxUser();
const miseboxUser = fetchMiseboxUser(props.chef.id);
</script>
