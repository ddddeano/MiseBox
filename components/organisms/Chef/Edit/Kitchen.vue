<template>
  <div class="kitchen-form">
    <div v-if="mode === 'display'">
      <p><strong>Kitchen Name:</strong> {{ kitchen.name }}</p>
      <p><strong>Location:</strong> {{ kitchen.location }}</p>
    </div>

    <div v-else>
      <input
        v-model="kitchen.name"
        placeholder="Kitchen Name"
        class="editable-input"
      />
      <input
        v-model="kitchen.location"
        placeholder="Location"
        class="editable-input"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  kitchen: Object,
  mode: {
    type: String,
    default: 'display',
  },
});
</script>
