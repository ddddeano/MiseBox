<!-- components/organisms/Recruiter/Cell.vue -->
<template>
  <div class="cell recruiter-cell" v-if="miseboxUser && recruiter">
    <!-- Header Section -->
    <NuxtLink :to="`/recruiters/${recruiter.id}`" class="cell-header">
      <div class="cell-avatar">
        <MoleculesAvatar 
          :url="miseboxUser.avatar || '/images/default-avatar.jpg'" 
          size="small" 
          altText="Recruiter Avatar" 
        />
      </div>
      <div class="header-content">
        <div class="display-name" v-if="miseboxUser.display_name">
          {{ miseboxUser.display_name }}
        </div>
        <div class="handle" v-if="miseboxUser.handle">
          @{{ miseboxUser.handle }}
        </div>
        <div class="company" v-if="recruiter.company">
          {{ recruiter.company }}
        </div>
      </div>
      <div class="icon">
        <ChevronRightIcon />
      </div>
    </NuxtLink>

    <!-- Footer Section -->
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
  recruiter: {
    type: Object,
    required: true,
  },
});

// Fetch Misebox User document
const { document: miseboxUser } = useFetchDoc("misebox-users", props.recruiter.id);

// Get the current user
const currentUser = useCurrentUser();
</script>
