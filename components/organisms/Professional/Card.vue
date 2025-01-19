<!-- components/organisms/Professional/Card.vue -->
<template>
  <div class="card professional-card" v-if="miseboxUser && professional">
    <NuxtLink :to="`/professionals/${professional.id}`" class="card-header">
      <div class="card-avatar">
        <MoleculesAvatar :url="miseboxUser.avatar" size="medium" altText="Professional Avatar" />
      </div>
      <div class="header-content">
        <span class="display-name" v-if="miseboxUser.display_name">
          {{ miseboxUser.display_name }}
        </span>
        <div class="handle" v-if="miseboxUser.handle">@{{ miseboxUser.handle }}</div>
        <div v-if="professional.title" class="highlight">{{ professional.title }}</div>
      </div>
      <div class="icon">
        <ChevronRightIcon />
      </div>
    </NuxtLink>
    <div class="main-content">
      <p v-if="professional.bio" class="bio">{{ professional.bio }}</p>
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
const { currentProfessional: professional } = useProfessional();
const currentUser = useCurrentUser();
</script>
