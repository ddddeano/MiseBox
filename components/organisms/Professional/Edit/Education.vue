<template>
  <div class="education-form">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode">
      <div class="display-selected-header">
        <div class="school-name">{{ education.school_name }}</div>
        <div class="subheader">
          <div>{{ education.city }}, {{ education.region }}</div>
          <div class="dates">{{ education.year }}</div>
        </div>
      </div>

      <div><strong>{{ education.degree }}</strong></div>
      <div>Address: {{ education.formatted_address }}</div>
      <div>
        <DocumentMagnifyingGlassIcon class="icon" @click="openDocument(education.document_url)" />
      </div>
    </div>

    <!-- Create Mode -->
    <div v-else-if="mode === 'create'">
      <div v-if="education.school_name" class="selected-place editable-input" @click="clearSchoolSelection">
        <div><strong>Selected School:</strong> {{ education.school_name }}</div>
        <div>{{ education.city }}, {{ education.region }}</div>
      </div>
      <div v-else>
        <OrganismsPlacesSearch @select-place="selectSchool" />
      </div>

      <input type="text" v-model="education.degree" class="editable-input" placeholder="Enter degree" />

      <label>Year</label>
      <MoleculesMonthAndYearSelector
        :year="education.year"
        @update:year="(newYear) => education.year = newYear"
      />

      <div class="document-upload">
        <DocumentPlusIcon class="icon" @click="triggerFileInput" />
        <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" />
      </div>

      <textarea v-model="education.formatted_address" class="editable-input" placeholder="School Address"></textarea>

      <div v-if="isUploading">Uploading... {{ uploadProgress }}%</div>
    </div>

    <!-- Edit Mode -->
    <div v-else class="edit-mode">
      <div v-if="education.school_name" class="selected-place editable-input" @click="clearSchoolSelection">
        <div><strong>Selected School:</strong> {{ education.school_name }}</div>
        <div>{{ education.city }}, {{ education.region }}</div>
      </div>
      <div v-else>
        <OrganismsPlacesSearch @select-place="selectSchool" />
      </div>

      <input type="text" v-model="education.degree" class="editable-input" placeholder="Enter degree" />

      <label>Year</label>
      <MoleculesMonthAndYearSelector
        :year="education.year"
        @update:year="(newYear) => education.year = newYear"
      />

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
  if (file && currentUser.value) {
    const storage = getStorage();
    const filePath = `documents/${currentUser.value.uid}/${file.name}`;
    const fileRef = storageRef(storage, filePath);
    const uploadTask = uploadBytesResumable(fileRef, file);

    isUploading.value = true;
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        uploadProgress.value = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.error('Upload error:', error);
        isUploading.value = false;
      },
      async () => {
        isUploading.value = false;
        uploadProgress.value = 100;
        const downloadURL = await getDownloadURL(fileRef);
        props.education.document_url = downloadURL;
      }
    );
  }
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
.education-form {
  width: 100%;
}

.display-selected-header {
  display: flex;
  flex-direction: column;
}

.school-name {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 0.2em;
}

.subheader {
  display: flex;
  gap: 15px;
  justify-content: space-between;
  font-size: 0.9em;
}

.dates {
  font-style: italic;
}

.document-upload .icon {
  cursor: pointer;
}
</style>
