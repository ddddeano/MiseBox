<template>
  <client-only>
    <div v-if="chef" class="chef-profile-container">
      <!-- Kitchens Section -->
      <section v-if="chef.kitchens?.length" class="shared-section">
        <h2 class="view-profile-title">Kitchens</h2>
        <div v-for="kitchen in chef.kitchens" :key="kitchen.place_id" class="profile-item">
          <h3>{{ kitchen.place_name }}</h3>
          <p>{{ kitchen.role }} ({{ kitchen.from_month }} {{ kitchen.from_year }} - {{ kitchen.to_month }} {{ kitchen.to_year }})</p>
        </div>
      </section>

      <!-- Recipes Section -->
      <section v-if="chef.recipes?.length" class="shared-section">
        <h2 class="view-profile-title">Recipes</h2>
        <div v-for="recipe in chef.recipes" :key="recipe.id" class="profile-item">
          <h3>{{ recipe.name }}</h3>
        </div>
      </section>
    </div>
    <div v-else>
      <p>No chef profile found.</p>
    </div>
  </client-only>
</template>

<script setup>
const props = defineProps({
  chef: {
    type: Object,
    required: true,
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
</style>
