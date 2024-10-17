<template>
  <div class="creating">
    <ErrorMessage :error="error" />
    <div class="input-dropdown-wrapper">
      <input
        type="text"
        v-model="language.name"
        placeholder="Type or select a language"
        @focus="showAllLanguages"
        @input="filterLanguages"
        class="input-language"
      />

      <ul v-if="filteredLanguages.length" class="dropdown-list">
        <li 
          v-for="(lang, index) in filteredLanguages" 
          :key="index" 
          @click="selectLanguage(lang)"
          class="dropdown-item"
        >
          {{ lang }}
        </li>
      </ul>
    </div>

    <div class="proficiency-buttons">
      <div class="proficiency-wrapper">
        <ChatBubbleLeftRightIcon
          class="icon"
          @click="openFlyout('spoken', spokenLevels)"
          :class="{ hidden: language.spoken }"
        />
        <span v-if="language.spoken" class="proficiency-value">{{ language.spoken }}</span>
      </div>
      <div class="proficiency-wrapper">
        <PaperClipIcon
          class="icon"
          @click="openFlyout('written', writtenLevels)"
          :class="{ hidden: language.written }"
        />
        <span v-if="language.written" class="proficiency-value">{{ language.written }}</span>
      </div>
    </div>

    <div class="arrow-container">
      <CheckCircleIcon class="icon confirm-icon" @click="clickUpdate" />
    </div>

    <MainFormsFlyout
      v-if="showFlyout"
      :options="flyoutOptions"
      @select="handleFlyoutSelect"
    />
  </div>
</template>

<script setup>
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

const firestore = useFirestore();
const props = defineProps({
  userId: String,
  collectionName: String,
});

/*
  Capturing the Language data:
  {
    "name": "English",
    "spoken": "C2",
    "written": "C2"
  }
*/

const language = reactive({ name: "", spoken: "", written: "" });
const error = ref({ message: '' });

const filteredLanguages = ref([]);
const showFlyout = ref(false);
const flyoutOptions = ref([]);
const flyoutTarget = ref('');

const popularLanguages = [
  "English", "Spanish", "Chinese", "French", "German",
  "Japanese", "Arabic", "Portuguese", "Russian", "Italian"
];
const spokenLevels = ["Native", "A1", "A2", "B1", "B2", "C1", "C2"];
const writtenLevels = ["Native", "A1", "A2", "B1", "B2", "C1", "C2"];

const showAllLanguages = () => filteredLanguages.value = popularLanguages;
const filterLanguages = () => filteredLanguages.value = popularLanguages.filter(lang => lang.toLowerCase().includes(language.name.toLowerCase()));

const selectLanguage = lang => {
  language.name = lang;
  filteredLanguages.value = [];
};

const handleFlyoutSelect = selectedOption => {
  language[flyoutTarget.value] = selectedOption;
  showFlyout.value = false;
};

const openFlyout = (target, options) => {
  flyoutTarget.value = target;
  flyoutOptions.value = options;
  showFlyout.value = true;
};

const format = () => {
  language.name = language.name.trim().replace(/\s+/g, ' ').charAt(0).toUpperCase() + language.name.slice(1);
};

const clickUpdate = async () => {
  format();
  if (validate()) {
    error.value.message = '';
    try {
      const documentRef = doc(firestore, props.collectionName, props.userId);
      await updateDoc(documentRef, {
        languages: arrayUnion({ ...language })
      });
      reset();
    } catch (e) {
      error.value.message = 'Failed to add language. Please try again.';
      console.error('Failed to add language:', e.message);
    }
  } else {
    error.value.message = 'Please fill out all required fields.';
  }
};

const validate = () => language.name && language.spoken && language.written;
const reset = () => Object.assign(language, { name: "", spoken: "", written: "" });
</script>

<style scoped>
.input-dropdown-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Removed dynamic variables */
}

.input-language {
  padding: 10px; /* Hardcoded padding */
  border-radius: 6px; /* Hardcoded border-radius */
  font-size: 14px; /* Hardcoded font size */
}

.dropdown-list {
  list-style-type: none;
  padding: 0;
  margin-top: 8px;
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-item {
  padding: 10px; /* Hardcoded padding */
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f0f0f0; /* Hardcoded hover color */
}

.proficiency-buttons {
  display: flex;
  align-items: center;
  gap: 40px;
  justify-content: center;
  padding: 10px;
}

.proficiency-wrapper {
  display: flex;
  align-items: center;
  gap: 10px; /* Hardcoded gap */
}

.proficiency-value {
  font-size: 14px; /* Hardcoded font size */
  font-weight: bold;
}

.arrow-container {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
</style>
