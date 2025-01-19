<!-- components/organisms/Recruiter/Card.vue -->
<template>
  <div class="card recruiter-card" v-if="miseboxUser && recruiter">
    <NuxtLink :to="`/recruiters/${recruiter.id}`" class="card-header">
      <div class="card-avatar">
        <MoleculesAvatar :url="miseboxUser.avatar" size="medium" altText="Recruiter Avatar" />
      </div>
      <div class="header-content">
        <span class="display-name" v-if="miseboxUser.display_name">
          {{ miseboxUser.display_name }}
        </span>
        <div class="handle" v-if="miseboxUser.handle">@{{ miseboxUser.handle }}</div>
        <div v-if="recruiter.company" class="highlight">{{ recruiter.company }}</div>
      </div>
      <div class="icon">
        <ChevronRightIcon />
      </div>
    </NuxtLink>
    <div class="main-content">
      <p v-if="recruiter.bio" class="bio">{{ recruiter.bio }}</p>
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

const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentRecruiter: recruiter } = useRecruiter();
const currentUser = useCurrentUser();
</script>
