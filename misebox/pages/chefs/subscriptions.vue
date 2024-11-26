<template>
  <div class="subscriptions-page">
    <h1>Chef Subscription Plans</h1>

    <!-- Passing the product IDs to the child component -->
    <div v-for="subscription in subscriptions" :key="subscription">
      <StripeCard :id="subscription" />
    </div>
  </div>
</template>

<script setup>
const subscriptions = ["prod_QwKUwmGMe7GeC4", "prod_QwKVumesOm4C1c", "prod_QwKWgzaYPW3zjq"];
</script>

<style scoped>
.subscriptions-page {
  padding: 20px;
}
</style>

<!-- 
{
  "benefits": ["10 Recipes"],
  "description": "Manage a recipe book of ten recipes, connect it to the network, and grow your Chef Profile.",
  "app": "chef",
  "plan": "Free",
  "active": true
}

{
  "benefits": ["Kitchen", "25 Recipes"],
  "app": "chef",
  "description": "Manage a larger recipe collection with 25 recipes. Connect your most useful recipes to a managed kitchen.",
  "plan": "Chef de Partie",
  "active": true
}

{
  "benefits": ["Unlimited Kitchens", "Unlimited Recipes"],
  "app": "chef",
  "description": "Manage Unlimited Kitchens and Unlimited Recipes, providing complete control over your culinary operations.",
  "plan": "Executive Chef",
  "active": true
} -->
