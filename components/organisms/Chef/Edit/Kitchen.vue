<template>
  <div class="kitchen-form">
    <div v-if="mode === 'display'">
      <span>{{ kitchen.name }} - {{ kitchen.location }}</span>
    </div>

    <div v-if="mode !== 'display'">
      <input
        v-model="kitchen.name"
        placeholder="Kitchen Name"
      />
      <input
        v-model="kitchen.location"
        placeholder="Location"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  kitchen: Object,
  mode: {
    type: String,
    default: 'display', // display, edit, create
  },
});
</script>

<style scoped>
.kitchen-form {
  display: flex;
  flex-direction: column;
}
</style>
