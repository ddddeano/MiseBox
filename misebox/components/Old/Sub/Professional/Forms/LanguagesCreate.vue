<template>
  <div class="language-form">
    <!-- Display Mode -->
    <div v-if="mode === 'display'">
      <p>{{ language.language }} - {{ language.level }}</p>
    </div>

    <!-- Edit Mode -->
    <div v-else-if="mode === 'edit'">
      <input
        class="editable-input"
        v-model="language.language"
        placeholder="Language"
        @focus="showAllLanguages"
        @input="filterLanguages"
      />
      <ul v-if="filteredLanguages.length" class="dropdown-list">
        <li
          v-for="(lang, index) in filteredLanguages"
          :key="index"
          class="dropdown-item"
          @click="selectLanguage(lang)"
        >
          {{ lang }}
        </li>
      </ul>
      <input
        class="editable-input"
        v-model="language.level"
        placeholder="Proficiency Level"
        @click="openFlyout('level', levels)"
      />
    </div>

    <!-- Create Mode -->
    <div v-else-if="mode === 'create'">
      <input
        class="editable-input"
        v-model="language.language"
        placeholder="New Language"
        @focus="showAllLanguages"
        @input="filterLanguages"
      />
      <ul v-if="filteredLanguages.length" class="dropdown-list">
        <li
          v-for="(lang, index) in filteredLanguages"
          :key="index"
          class="dropdown-item"
          @click="selectLanguage(lang)"
        >
          {{ lang }}
        </li>
      </ul>
      <input
        class="editable-input"
        v-model="language.level"
        placeholder="Proficiency Level"
        @click="openFlyout('level', levels)"
      />
    </div>

    <!-- Flyout for Selecting Proficiency Levels -->
    <MoleculesFlyout v-if="showFlyout" :options="flyoutOptions" @select="handleFlyoutSelect" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  language: Object,
  mode: {
    type: String,
    default: 'display',
  },
});

const levels = ['Native', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const popularLanguages = ['English', 'Spanish', 'Chinese', 'French', 'German', 'Japanese', 'Arabic', 'Portuguese', 'Russian', 'Italian'];

const filteredLanguages = ref([]);
const showFlyout = ref(false);
const flyoutOptions = ref([]);
const flyoutTarget = ref('');

// Show all languages
const showAllLanguages = () => {
  filteredLanguages.value = popularLanguages;
};

// Filter languages based on user input
const filterLanguages = () => {
  filteredLanguages.value = popularLanguages.filter(lang => lang.toLowerCase().includes(props.language.language.toLowerCase()));
};

// Select a language from the dropdown
const selectLanguage = (lang) => {
  props.language.language = lang;
  filteredLanguages.value = [];
};

// Open the flyout for selecting proficiency levels
const openFlyout = (target, options) => {
  flyoutTarget.value = target;
  flyoutOptions.value = options;
  showFlyout.value = true;
};

// Handle flyout selection
const handleFlyoutSelect = (selectedOption) => {
  props.language[flyoutTarget.value] = selectedOption;
  showFlyout.value = false;
};
</script>

<style scoped>
.editable-input {
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
}

.dropdown-list {
  list-style: none;
  padding: 0;
  margin-top: 8px;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>
