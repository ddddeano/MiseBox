<template>
  <div class="recipe-form">
    <div v-if="mode === 'display'">
      <p><strong>{{ recipe.title }}</strong></p>
    </div>

    <div v-else>
      <input
        v-model="recipe.title"
        placeholder="Recipe Title"
        class="editable-input"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  recipe: Object,
  mode: {
    type: String,
    default: 'display',
  },
});
</script>
