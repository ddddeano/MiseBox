<template>
  <div class="cell misebox-user-cell" v-if="miseboxUser">
    <NuxtLink :to="`/misebox-users/${miseboxUser.id}`" class="cell-avatar">
      <MoleculesAvatar :user="miseboxUser" size="small" />
      <div class="cell-info">
        <div class="display-name">{{ miseboxUser.display_name }}</div>
        <div class="handle">{{ miseboxUser.handle }}</div>
      </div>
    </NuxtLink>

    <!-- Follow Button for cell -->
    <MoleculesFollowButton
      v-if="!isViewingOwnRoute"
      :user="miseboxUser"
      class="follow-button"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  miseboxUser: {
    type: Object,
    required: true,
  },
});

const { isViewingOwnRoute } = useInteraction();
</script>
