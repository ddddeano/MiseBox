<template>
  <div class="volunteering-item">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode">
      <div><strong>{{ volunteering.role }}</strong></div>
      <div>{{ volunteering.organization }}</div>
      <div>
        {{ volunteering.from_year }} - 
        <span v-if="volunteering.ongoing">Present</span>
        <span v-else>{{ volunteering.to_year }}</span>
      </div>
      <div>{{ volunteering.description }}</div>
      <a v-if="volunteering.document_url" :href="volunteering.document_url" target="_blank">View Document</a>
    </div>

    <!-- Create/Edit Mode -->
    <div v-else>
      <label for="organization">Organization</label>
      <input
        type="text"
        id="organization"
        v-model="volunteering.organization"
        placeholder="Enter organization"
        class="editable-input"
      />

      <label for="role">Role</label>
      <input
        type="text"
        id="role"
        v-model="volunteering.role"
        placeholder="Enter role"
        class="editable-input"
      />

      <label for="from-year">From Year</label>
      <MoleculesYearSelector
        v-model="volunteering.from_year"
        :startYear="1950"
        :endYear="new Date().getFullYear()"
        inputId="from-year-select"
      />

      <!-- Ongoing Checkbox -->
      <label>
        <input type="checkbox" v-model="volunteering.ongoing" /> Ongoing
      </label>

      <!-- To Year Field (disabled if ongoing is true) -->
      <div :class="{ 'disabled': volunteering.ongoing }">
        <label for="to-year">To Year</label>
        <MoleculesYearSelector
          v-model="volunteering.to_year"
          :startYear="1950"
          :endYear="new Date().getFullYear()"
          inputId="to-year-select"
          :disabled="volunteering.ongoing"
        />
      </div>

      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="volunteering.description"
        placeholder="Describe volunteering responsibilities"
        class="editable-textarea"
      ></textarea>

      <!-- Document Upload -->
      <label for="document">Document (Optional)</label>
      <input type="file" @change="onFileChange" />

      <a v-if="volunteering.document_url" :href="volunteering.document_url" target="_blank">View Document</a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  volunteering: {
    type: Object,
    required: true,
  },
  mode: {
    type: String,
    required: true,
    validator: value => ['display', 'edit', 'create'].includes(value),
  },
});

// Handle document upload
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    emit('upload-document', { file, id: props.volunteering.id });
  }
};
</script>

<style scoped>
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
