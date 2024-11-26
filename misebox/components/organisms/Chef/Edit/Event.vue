<template>
  <div class="event-form">
    <div v-if="mode === 'display'">
      <p><strong>Event Name:</strong> {{ event.name }}</p>
    </div>

    <div v-else>
      <input
        v-model="event.name"
        placeholder="Event Name"
        class="editable-input"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  event: Object,
  mode: {
    type: String,
    default: 'display',
  },
});
</script>
