<template>
  <client-only>
    <div class="chef-profile-container">
      <!-- Display Kitchens -->
      <section v-if="chef.kitchens?.length" class="shared-section">
        <h2 class="view-profile-title">Kitchens</h2>
        <div
          v-for="kitchen in chef.kitchens"
          :key="kitchen.place_id"
          class="profile-item"
        >
          <h3>{{ kitchen.place_name }}</h3>
          <p>{{ kitchen.role }} ({{ kitchen.from_month }} {{ kitchen.from_year }} - {{ kitchen.to_month }} {{ kitchen.to_year }})</p>
          <p>{{ kitchen.formatted_address }}</p>
        </div>
      </section>

      <!-- Display Availability -->
      <section v-if="chef.availability?.length" class="shared-section">
        <h2 class="view-profile-title">Availability</h2>
        <div
          v-for="slot in chef.availability"
          :key="slot.day"
          class="profile-item"
        >
          <h3>{{ slot.day }}</h3>
          <p>{{ slot.time_from }} - {{ slot.time_to }}</p>
        </div>
      </section>

      <!-- Display Recipes -->
      <section v-if="chef.recipes?.length" class="shared-section">
        <h2 class="view-profile-title">Recipes</h2>
        <div
          v-for="recipe in chef.recipes"
          :key="recipe.id"
          class="profile-item"
        >
          <h3>{{ recipe.name }}</h3>
          <p>{{ recipe.ingredients }}</p>
          <p>{{ recipe.instructions }}</p>
        </div>
      </section>

      <!-- Display Events -->
      <section v-if="chef.events?.length" class="shared-section">
        <h2 class="view-profile-title">Events</h2>
        <div
          v-for="event in chef.events"
          :key="event.name"
          class="profile-item"
        >
          <h3>{{ event.name }}</h3>
          <p>{{ event.date }}</p>
          <p>{{ event.location }}</p>
          <p>{{ event.description }}</p>
        </div>
      </section>

      <!-- Display Specialties -->
      <section v-if="chef.specialties" class="shared-section">
        <h2 class="view-profile-title">Specialties</h2>
        <p>{{ chef.specialties }}</p>
      </section>

      <!-- Display Gallery -->
      <section v-if="chef.gallery?.length" class="shared-section">
        <h2 class="view-profile-title">Gallery</h2>
        <div class="gallery">
          <div
            v-for="image in chef.gallery"
            :key="image.image_url"
            class="gallery-item"
          >
            <img :src="image.image_url" :alt="image.description || 'Chef Gallery'" />
            <p>{{ image.description }}</p>
          </div>
        </div>
      </section>
    </div>
  </client-only>
</template>

<script setup>
const props = defineProps({
  chef: {
    type: Object,
    required: true,
    default: () => ({}), // Default empty object for rendering placeholders
  },
});
</script>

<style scoped>
.chef-profile-container {
  padding: var(--spacing-m);
}

.shared-section {
  margin-bottom: var(--spacing-m);
}

.view-profile-title {
  font-size: var(--font-size-l);
  margin-bottom: var(--spacing-s);
}

.profile-item {
  margin-bottom: var(--spacing-s);
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-s);
}

.gallery-item img {
  width: 100%;
  height: auto;
  border-radius: var(--radius-s);
}

.gallery-item p {
  text-align: center;
  color: var(--text-secondary);
  margin-top: var(--spacing-xs);
}
</style>
