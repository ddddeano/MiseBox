<template>
  <div class="cell">
    <div class="cell-row">
      <div class="avatar-info">
        <NuxtLink :to="`/professionals/${professional.id}`" class="view-profile-link">
          <MoleculesAvatar :user="professional" size="small" />
          <div class="cell-info">
            <div class="display-name">{{ professional.display_name }}</div>
            <div class="handle">@{{ professional.handle }}</div>
          </div>
        </NuxtLink>
      </div>
      <MoleculesFollowButton
        v-if="!isCurrentUser && showFollowButton"
        :isFollowing="isFollowing"
        :user="professional"
      />
    </div>
  </div>
</template>

<script setup>
import { useCurrentUser } from 'vuefire'

const currentUser = useCurrentUser()

const props = defineProps({
  professional: {
    type: Object,
    required: true,
  },
  isFollowing: {
    type: Boolean,
    default: false,
  },
})

const isCurrentUser = computed(() => currentUser.value?.uid === props.professional.id)
const showFollowButton = computed(() => !isCurrentUser.value)
</script>
