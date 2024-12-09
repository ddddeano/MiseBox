<template>
  <div class="kitchen-list">
    <!-- Render Kitchens -->
    <div v-if="kitchens.length" class="list-item" v-for="kitchen in kitchens" :key="kitchen.id">
      <OrganismsKitchenCell :kitchen="kitchen" />
    </div>

    <!-- No Kitchens Found -->
    <p v-if="!kitchens.length" class="kitchen-empty-message">
      No kitchens to display.
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  kitchens: {
    type: Array,
    default: () => [],
  },
});
</script>
