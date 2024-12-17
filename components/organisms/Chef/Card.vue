<!-- components/organisms/Chef/Card.vue -->
<template>
  <div class="card chef-card" v-if="miseboxUser && chef">
    <!-- Header Section -->
    <NuxtLink :to="`/chefs/${chef.id}`" class="card-header">
      <div class="card-avatar">
        <MoleculesAvatar 
          :url="miseboxUser.avatar || '/images/default-avatar.jpg'" 
          size="medium" 
          altText="Chef Avatar"
        />
      </div>
      <div class="header-content">
        <span class="display-name" v-if="miseboxUser.display_name">
          {{ miseboxUser.display_name }}
        </span>
        <div class="handle" v-if="miseboxUser.handle">
          @{{ miseboxUser.handle }}
        </div>
        <div class="specialty" v-if="chef.specialty">
          {{ chef.specialty }}
        </div>
      </div>
      <div class="icon">
        <ChevronRightIcon />
      </div>
    </NuxtLink>

    <!-- Main Content Section -->
    <div class="main-content">
      <p v-if="chef.bio" class="bio">{{ chef.bio }}</p>
    </div>

    <!-- Footer Section -->
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
const { currentChef: chef } = useChef();

// Get the current user
const currentUser = useCurrentUser();
</script>
