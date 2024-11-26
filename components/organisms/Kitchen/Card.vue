<template>
  <div class="card kitchen-card" v-if="kitchen">
    <!-- Debug block for kitchen data -->
    <pre v-if="debug">{{ kitchen }}</pre>
    
    <!-- Link to kitchen details -->
    <NuxtLink :to="`/kitchens/${kitchen.place_id}`" class="view-kitchen-link">
      <div class="card-header">
        <img
          :src="kitchen.photo_url || defaultPhotoUrl"
          alt="Kitchen Image"
          class="kitchen-image"
        />
        <div class="kitchen-info">
          <p class="name">{{ kitchen.place_name }}</p>
          <p class="location">{{ kitchen.formatted_address }}</p>
        </div>
      </div>
    </NuxtLink>

    <!-- Expanded card details -->
    <div class="card-expanded">
      <p class="description" v-if="kitchen.description">{{ kitchen.description }}</p>
      <p class="team" v-if="kitchen.team?.length">
        Team Members: {{ kitchen.team.length }}
      </p>
      <p class="added-by" v-if="kitchen.added_by">
        Added by: {{ kitchen.added_by }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  kitchen: {
    type: Object,
    required: true,
  },
  debug: {
    type: Boolean,
    default: false,
  },
});

const defaultPhotoUrl = '/images/default-kitchen.png';
</script>
