<template>
  <div class="cell">
    <div class="cell-row">
      <div class="avatar-info">
        <NuxtLink :to="`/chefs/${chef.id}`" class="view-profile-link">
          <MoleculesAvatar :user="chef" size="small" />
          <div class="cell-info">
            <div class="display-name">{{ chef.display_name }}</div>
            <div class="handle">{{ chef.handle }}</div>
          </div>
        </NuxtLink>
      </div>
      <MoleculesFollowButton
        v-if="!isCurrentUser && showFollowButton"
        :isFollowing="isFollowing"
        :user="chef"
      />
    </div>
  </div>
</template>

<script setup>
import { useCurrentUser } from 'vuefire'

const currentUser = useCurrentUser()

const props = defineProps({
  chef: {
    type: Object,
    required: true,
  },
  isFollowing: {
    type: Boolean,
    default: false,
  },
})

const isCurrentUser = computed(() => currentUser.value?.uid === props.chef.id)
const showFollowButton = computed(() => !isCurrentUser.value)
</script>
