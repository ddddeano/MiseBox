<template>
  <div class="language-item">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode">
      <div><strong>{{ language.language }}</strong></div>
      <div>{{ language.proficiency }}</div>
    </div>

    <!-- Edit Mode -->
    <div v-else-if="mode === 'edit'" class="edit-mode">
      <label for="language">Language</label>
      <input
        type="text"
        id="language"
        v-model="language.language"
        placeholder="Enter language"
        class="editable-input"
      />

      <label for="proficiency">Proficiency</label>
      <input
        type="text"
        id="proficiency"
        v-model="language.proficiency"
        placeholder="Enter proficiency level"
        class="editable-input"
      />
    </div>

    <!-- Create Mode -->
    <div v-else-if="mode === 'create'" class="create-mode">
      <label for="language">Language</label>
      <input
        type="text"
        id="language"
        v-model="language.language"
        placeholder="Enter language"
        class="editable-input"
      />

      <label for="proficiency">Proficiency</label>
      <input
        type="text"
        id="proficiency"
        v-model="language.proficiency"
        placeholder="Enter proficiency level"
        class="editable-input"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  language: {
    type: Object,
    required: true,
  },
  mode: {
    type: String,
    required: true,
    validator: value => ['display', 'edit', 'create'].includes(value),
  },
});
</script>
