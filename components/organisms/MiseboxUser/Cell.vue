<!-- components/Organisms/MiseboxUser/Cell.vue -->
<template>
  <div class="cell misebox-user-cell" v-if="miseboxUser">
    <NuxtLink :to="`/misebox-users/${miseboxUser.id}`" class="cell-avatar">
      <MoleculesAvatar :user="miseboxUser" size="small" />
      <div class="cell-info">
        <div class="display-name">{{ miseboxUser.display_name }}</div>
        <div class="handle">@{{ miseboxUser.handle }}</div>
      </div>
    </NuxtLink>
    <MoleculesFollowButton
      v-if="!interactingWithSelf"
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

// Determine if this entity is being interacted with by the current user
const { isInteractingWithSelf } = useInteraction();
const interactingWithSelf = isInteractingWithSelf(props.miseboxUser.id);
</script>
