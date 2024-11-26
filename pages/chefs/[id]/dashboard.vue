<template>
  <client-only>
    <div class="chef-dashboard index">
      <h1 class="dashboard-title">Chef Dashboard</h1>

      <!-- Profile Section -->
      <section class="profile-section">
        <h2>Profile Management</h2>
        <div class="profile-actions">
          <NuxtLink :to="`/chefs/${chefId}/edit`" class="btn btn-primary btn-pill">
            Edit Profile
          </NuxtLink>
          <NuxtLink :to="`/chefs/${chefId}/view`" class="btn btn-secondary btn-pill">
            View Profile
          </NuxtLink>
        </div>
      </section>

      <!-- Kitchen Section -->
      <section class="kitchen-section">
        <h2>Kitchen Management</h2>
        <div class="kitchen-actions">
          <NuxtLink :to="`/kitchens/create-or-connect`" class="btn btn-primary btn-pill">
            Create or Connect to a Kitchen
          </NuxtLink>
          <NuxtLink :to="`/kitchens/browse`" class="btn btn-secondary btn-pill">
            Browse Kitchens
          </NuxtLink>
          <NuxtLink :to="`/chefs/${chefId}/my-kitchens`" class="btn btn-secondary btn-pill">
            My Kitchens
          </NuxtLink>
        </div>
      </section>

      <!-- Recipe Section -->
      <section class="recipe-section">
        <h2>Recipe Management</h2>
        <div class="recipe-actions">
          <NuxtLink :to="`/chefs/${chefId}/recipe/create`" class="btn btn-primary btn-pill">
            Add New Recipe
          </NuxtLink>
          <NuxtLink :to="`/chefs/${chefId}/recipe`" class="btn btn-secondary btn-pill">
            My Recipes
          </NuxtLink>
        </div>
      </section>

      <!-- Network Section -->
      <section class="network-section">
        <h2>My Network</h2>
        <div class="network-actions">
          <NuxtLink to="/network/connect" class="btn btn-primary btn-pill">
            Connect with Other Chefs
          </NuxtLink>
          <NuxtLink to="/network/my-connections" class="btn btn-secondary btn-pill">
            My Connections
          </NuxtLink>
        </div>
      </section>

      <!-- Suppliers Section -->
      <section class="suppliers-section">
        <h2>My Suppliers</h2>
        <div class="suppliers-actions">
          <NuxtLink to="/suppliers/manage" class="btn btn-primary btn-pill">
            Manage Suppliers
          </NuxtLink>
          <NuxtLink to="/suppliers/browse" class="btn btn-secondary btn-pill">
            Browse Suppliers
          </NuxtLink>
        </div>
      </section>
    </div>
  </client-only>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const chefId = route.params.id; // Get the current Chef ID from the route
</script>

<style scoped>
.chef-dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: var(--spacing-m);
}

.dashboard-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-l);
}

section {
  margin-bottom: var(--spacing-l);
  width: 100%;
  max-width: 800px;
  text-align: center;
}

.profile-actions,
.kitchen-actions,
.recipe-actions,
.network-actions,
.suppliers-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-s);
  margin-top: var(--spacing-m);
}
</style>
