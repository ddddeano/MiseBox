<!-- components/organisms/Professional/Fields/Project.vue -->
<template>
  <div>
    <!-- Display Mode -->
    <div v-if="mode === 'display'">
      <div><strong>{{ project.name }}</strong></div>
      <div>{{ project.description }}</div>
      <div>
        {{ project.from_month }} {{ project.from_year }} - 
        <span v-if="project.ongoing">Present</span>
        <span v-else>{{ project.to_month }} {{ project.to_year }}</span>
      </div>
      <a v-if="project.url" :href="project.url" target="_blank">Project URL</a>
    </div>

    <!-- Create/Edit Mode -->
    <div v-else>
      <label for="project-name">Project Name</label>
      <input
        type="text"
        id="project-name"
        v-model="project.name"
        placeholder="Enter project name"
        class="editable-input"
      />

      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="project.description"
        placeholder="Enter project description"
        class="editable-textarea"
      ></textarea>

      <label for="url">Project URL</label>
      <input
        type="url"
        id="url"
        v-model="project.url"
        placeholder="Enter project URL"
        class="editable-input"
      />

      <label>From</label>
      <MoleculesMonthAndYearSelector
        v-model:month="project.from_month"
        v-model:year="project.from_year"
      />

      <!-- Ongoing Checkbox -->
      <label>
        <input type="checkbox" v-model="project.ongoing" /> Ongoing
      </label>

      <!-- To Date Fields (disabled if ongoing is true) -->
      <div :class="{ 'disabled': project.ongoing }">
        <label>To</label>
        <MoleculesMonthAndYearSelector
          v-model:month="project.to_month"
          v-model:year="project.to_year"
          :disabled="project.ongoing"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  mode: {
    type: String,
    required: true,
    validator: (value) => ['display', 'edit', 'create'].includes(value),
  },
});
</script>

<style scoped>
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
