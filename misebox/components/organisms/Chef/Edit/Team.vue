<template>
  <div class="team-form">
    <div v-if="mode === 'display'">
      <p><strong>Team ID:</strong> {{ team.id }}</p>
    </div>

    <div v-else>
      <input
        v-model="team.id"
        placeholder="Team ID"
        class="editable-input"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  team: Object,
  mode: {
    type: String,
    default: 'display',
  },
});
</script>
