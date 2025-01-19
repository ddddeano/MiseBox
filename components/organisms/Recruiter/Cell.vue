<!-- components/organisms/Recruiter/Cell.vue -->
<template>
  <div class="cell recruiter-cell" v-if="miseboxUser && recruiter">
    <NuxtLink :to="`/recruiters/${recruiter.id}`" class="cell-header">
      <div class="cell-avatar">
        <MoleculesAvatar :url="miseboxUser.avatar" size="small" altText="Recruiter Avatar" />
      </div>
      <div class="header-content">
        <div class="display-name" v-if="miseboxUser.display_name">{{ miseboxUser.display_name }}</div>
        <div class="handle" v-if="miseboxUser.handle">@{{ miseboxUser.handle }}</div>
        <div v-if="recruiter.company" class="highlight">{{ recruiter.company }}</div>
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
  recruiter: {
    type: Object,
    required: true,
  },
});

const { fetchMiseboxUser } = useMiseboxUser();
const miseboxUser = fetchMiseboxUser(props.recruiter.id);
</script>
