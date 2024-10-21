<template>
  <div class="card" v-if="professional">
    <NuxtLink :to="`/professionals/${professional.id}`" class="view-profile-link">
      <div class="card-header">
        <MoleculesAvatar :user="professional" size="small" />
        <div class="user-info">
          <p v-if="professional.display_name" class="display-name">{{ professional.display_name }}</p>
          <p v-if="professional.handle" class="handle">@{{ professional.handle }}</p>
        </div>
      </div>
    </NuxtLink>
    <div class="card-expanded">
      <p v-if="professional.bio" class="bio">{{ professional.bio }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  professional: {
    type: Object,
    required: true,
  },
})
</script>
