<!-- components/organisms/Kitchen/List.vue -->
<template>
  <div class="list">
    <h3>{{ title }}</h3>

    <!-- Display kitchens -->
    <template v-if="kitchens?.length">
      <div
        v-for="kitchen in kitchens"
        :key="kitchen.id"
        class="list-item"
      >
        <OrganismsKitchenCell :kitchen="kitchen" />
      </div>
    </template>
    <p v-else>No kitchens available.</p>
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
    default: '',
  },
});
</script>
