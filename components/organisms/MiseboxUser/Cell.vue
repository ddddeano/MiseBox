<!-- components/organisms/MiseboxUser/Cell.vue -->
<template>
  <div class="cell user-cell" v-if="miseboxUser">
    <!-- Header Section -->
    <div class="cell-header">
      <div class="cell-avatar">
        <MoleculesAvatar
          :url="miseboxUser.avatar || '/images/default-avatar.jpg'"
          size="small"
          altText="User Avatar"
        />
      </div>
      <div class="header-content">
        <span class="display-name" v-if="miseboxUser.display_name">
          {{ miseboxUser.display_name }}
        </span>
        <div class="handle" v-if="miseboxUser.handle">
          @{{ miseboxUser.handle }}
        </div>
      </div>
      <div class="icon">
        <ChevronRightIcon />
      </div>
    </div>

    <!-- Footer Section -->
    <div class="cell-footer">
      <div class="cell-interaction">
          <MoleculesFollowButton v-if="miseboxUser?.id !== currentUser?.uid" class="not-self" :user="miseboxUser" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCurrentUser } from "vuefire";

const props = defineProps({
  miseboxUser: {
    type: Object,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    default: false, // Default to enabled
  },
});

// Get the current user
const currentUser = useCurrentUser();
</script>
