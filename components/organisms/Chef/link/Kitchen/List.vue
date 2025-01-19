<!-- components/organisms/Chef/link/Kitchen/List.vue -->
<template>
  <div class="list">
    <h3 class="kitchen-list-title">{{ title }}</h3>

    <!-- Display linked kitchens -->
    <template v-if="kitchens.length">
      <div v-for="kitchen in kitchens" :key="kitchen.id" class="list-item">
        <OrganismsChefLinkKitchenCell :kitchen="kitchen" />
      </div>
    </template>
    <p v-else class="kitchen-list-empty">No kitchens linked to your profile.</p>
  </div>
</template>

<script setup>
const props = defineProps({
  kitchens: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "",
  },
});
</script>

