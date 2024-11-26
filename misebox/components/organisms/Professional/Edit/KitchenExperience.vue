<template>
  <div class="experience-form">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode">
      <div class="display-selected-header">
        <div class="place-name">{{ experience.place_name }}</div>
        <div class="subheader">
          <div>{{ experience.city }}</div>
          <div class="dates">{{ experience.from_month }} {{ experience.from_year }} - {{ experience.to_month }} {{ experience.to_year }}</div>
        </div>
      </div>
      
      <div><strong>{{ experience.role }}</strong></div>
      <div>Responsibilities: {{ experience.responsibilities }}</div>
      <div>
        <DocumentMagnifyingGlassIcon class="icon" @click="openDocument(experience.document_url)" />
      </div>
    </div>

    <!-- Create Mode -->
    <div v-else-if="mode === 'create'" class="create-mode">
      <div v-if="experience.place_name" class="selected-kitchen editable-input" @click="clearKitchenSelection">
        <div><strong>Selected Kitchen:</strong> {{ experience.place_name }}</div>
        <div>{{ experience.city }}, {{ experience.region }}</div>
      </div>
      <div v-else>
        <OrganismsKitchenSearch @select-kitchen="selectKitchen" />
      </div>

      <input type="text" v-model="experience.role" class="editable-input" placeholder="Enter role" />

      <label>From</label>
      <MoleculesMonthAndYearSelector
        :month="experience.from_month"
        :year="experience.from_year"
        @update:month="(newMonth) => experience.from_month = newMonth"
        @update:year="(newYear) => experience.from_year = newYear"
      />

      <label>To</label>
      <MoleculesMonthAndYearSelector
        :month="experience.to_month"
        :year="experience.to_year"
        @update:month="(newMonth) => experience.to_month = newMonth"
        @update:year="(newYear) => experience.to_year = newYear"
      />

      <!-- Document Upload -->
      <div class="document-upload">
        <DocumentPlusIcon class="icon" @click="triggerFileInput" />
        <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" />
      </div>

      <textarea v-model="experience.responsibilities" class="editable-input" placeholder="Describe your responsibilities"></textarea>

      <div v-if="isUploading">Uploading... {{ uploadProgress }}%</div>
    </div>

    <!-- Edit Mode -->
    <div v-else class="edit-mode">
      <div v-if="experience.place_name" class="selected-kitchen editable-input" @click="clearKitchenSelection">
        <div><strong>Selected Kitchen:</strong> {{ experience.place_name }}</div>
        <div>{{ experience.city }}, {{ experience.region }}</div>
      </div>
      <div v-else>
        <OrganismsKitchenSearch @select-kitchen="selectKitchen" />
      </div>

      <input type="text" v-model="experience.role" class="editable-input" placeholder="Enter role" />

      <label>From</label>
      <MoleculesMonthAndYearSelector
        :month="experience.from_month"
        :year="experience.from_year"
        @update:month="(newMonth) => experience.from_month = newMonth"
        @update:year="(newYear) => experience.from_year = newYear"
      />

      <label>To</label>
      <MoleculesMonthAndYearSelector
        :month="experience.to_month"
        :year="experience.to_year"
        @update:month="(newMonth) => experience.to_month = newMonth"
        @update:year="(newYear) => experience.to_year = newYear"
      />

      <!-- Document Upload -->
      <div class="document-upload">
        <DocumentPlusIcon class="icon" @click="triggerFileInput" />
        <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" />
      </div>

      <textarea v-model="experience.responsibilities" class="editable-input" placeholder="Describe your responsibilities"></textarea>

      <div v-if="isUploading">Uploading... {{ uploadProgress }}%</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCurrentUser } from 'vuefire';

const currentUser = useCurrentUser();

const props = defineProps({
  experience: {
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
        props.experience.document_url = downloadURL;
      }
    );
  }
};

const selectKitchen = (place) => {
  props.experience.place_name = place.place_name;
  props.experience.place_id = place.place_id;
  props.experience.formatted_address = place.formatted_address;
  props.experience.city = place.city;
  props.experience.region = place.region;
};

const clearKitchenSelection = () => {
  props.experience.place_name = '';
  props.experience.place_id = '';
  props.experience.formatted_address = '';
  props.experience.city = '';
  props.experience.region = '';
};

const openDocument = (url) => {
  window.open(url, '_blank');
};
</script>


