<template>
  <div class="language-form">
    <div v-if="mode === 'display'">
      <p>{{ language.language }} - {{ language.level }}</p>
    </div>

    <div v-else>
      <input
        v-model="language.language"
        placeholder="Language"
        class="editable-input"
      />
      <select v-model="language.level" class="editable-input">
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Fluent">Fluent</option>
      </select>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  language: Object,
  mode: {
    type: String,
    default: 'display',
  },
});
</script>
