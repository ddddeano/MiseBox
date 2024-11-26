<template>
  <div class="education-form">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode">
      <div class="display-selected-header">
        <div class="school-name">{{ education.school_name }}</div>
        <div class="subheader">
          <div>{{ education.city }}, {{ education.region }}</div>
          <div class="dates">
            {{ education.from_month }} {{ education.from_year }} - 
            <span v-if="education.ongoing">Present</span>
            <span v-else>{{ education.to_month }} {{ education.to_year }}</span>
          </div>
        </div>
      </div>

      <div><strong>{{ education.degree }}</strong></div>
      <div>Address: {{ education.formatted_address }}</div>
      <div>
        <DocumentMagnifyingGlassIcon class="icon" @click="openDocument(education.document_url)" />
      </div>
    </div>

    <!-- Create/Edit Mode -->
    <div v-else>
      <div v-if="education.school_name" class="selected-place editable-input" @click="clearSchoolSelection">
        <div><strong>Selected School:</strong> {{ education.school_name }}</div>
        <div>{{ education.city }}, {{ education.region }}</div>
      </div>
      <div v-else>
        <OrganismsPlacesSearch @select-place="selectSchool" />
      </div>

      <input type="text" v-model="education.degree" class="editable-input" placeholder="Enter degree" />

      <label>From</label>
      <MoleculesMonthAndYearSelector
        :month="education.from_month"
        :year="education.from_year"
        @update:month="(newMonth) => education.from_month = newMonth"
        @update:year="(newYear) => education.from_year = newYear"
      />

      <!-- Ongoing Checkbox -->
      <label>
        <input type="checkbox" v-model="education.ongoing" /> Ongoing
      </label>

      <!-- To Date Fields (disabled if ongoing is true) -->
      <div :class="{ 'disabled': education.ongoing }">
        <label>To</label>
        <MoleculesMonthAndYearSelector
          :month="education.to_month"
          :year="education.to_year"
          @update:month="(newMonth) => education.to_month = newMonth"
          @update:year="(newYear) => education.to_year = newYear"
          :disabled="education.ongoing"
        />
      </div>

      <div class="document-upload">
        <DocumentPlusIcon class="icon" @click="triggerFileInput" />
        <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" />
      </div>

      <textarea v-model="education.formatted_address" class="editable-input" placeholder="School Address"></textarea>

      <div v-if="isUploading">Uploading... {{ uploadProgress }}%</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCurrentUser } from 'vuefire';

const currentUser = useCurrentUser();

const props = defineProps({
  education: {
    type: Object,
    required: true,
  },
  mode: {
    type: String,
    required: true,
    validator: (value) => ['display', 'edit', 'create'].includes(value),
  },
});

const fileInput = ref(null);
const isUploading = ref(false);
const uploadProgress = ref(0);

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  // Implement your file upload logic here
};

const selectSchool = (place) => {
  props.education.school_name = place.place_name;
  props.education.school_place_id = place.place_id;
  props.education.formatted_address = place.formatted_address;
  props.education.city = place.city;
  props.education.region = place.region;
};

const clearSchoolSelection = () => {
  props.education.school_name = '';
  props.education.school_place_id = '';
  props.education.formatted_address = '';
  props.education.city = '';
  props.education.region = '';
};

const openDocument = (url) => {
  window.open(url, '_blank');
};
</script>

<style scoped>
.education-form .disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
