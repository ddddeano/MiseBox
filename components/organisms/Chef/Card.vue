<template>
  <div class="card" v-if="chef">
    <NuxtLink :to="`/chefs/${chef.id}`" class="view-profile-link">
      <div class="card-header">
        <MoleculesAvatar :user="chef" size="small" />
        <div class="user-info">
          <p v-if="chef.display_name" class="display-name">{{ chef.display_name }}</p>
          <p v-if="chef.handle" class="handle">{{ chef.handle }}</p>
        </div>
      </div>
    </NuxtLink>
    <div class="card-expanded">
      <p v-if="chef.bio" class="bio">{{ chef.bio }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  chef: {
    type: Object,
    required: true,
  },
})
</script>
