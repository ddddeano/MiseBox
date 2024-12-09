<template>
  <div class="certification-form">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode">
      <div class="certification-header">
        <div class="certification-name"><strong>{{ certification.name }}</strong></div>
        <div class="certification-org">{{ certification.issuing_organization }}</div>
      </div>
      <div class="certification-details">
        <div class="certification-year">{{ certification.month }} {{ certification.year }}</div>
        <div v-if="certification.document_url" class="document-icon">
          <DocumentMagnifyingGlassIcon @click="openDocument(certification.document_url)" />
        </div>
      </div>
    </div>

    <!-- Edit/Create Mode -->
    <div v-else>
      <input type="text" v-model="certification.name" placeholder="Certification Name" class="editable-input" />
      <input type="text" v-model="certification.issuing_organization" placeholder="Issuing Organization" class="editable-input" />

      <label>Date Issued</label>
      <MoleculesMonthAndYearSelector
        :month="certification.month"
        :year="certification.year"
        @update:month="(newMonth) => certification.month = newMonth"
        @update:year="(newYear) => certification.year = newYear"
      />

      <!-- Document Upload -->
      <div class="document-upload">
        <DocumentPlusIcon class="icon" @click="triggerFileInput" />
        <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" />
      </div>

      <div v-if="isUploading">Uploading... {{ uploadProgress }}%</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  certification: {
    type: Object,
    required: true,
  },
  mode: {
    type: String,
    required: true,
    validator: value => ['display', 'edit', 'create'].includes(value),
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
  if (file) {
    const storagePath = `certifications/${props.certification.name}/${file.name}`;
    const documentURL = await uploadDocumentToStorage(file, storagePath);
    props.certification.document_url = documentURL;
  }
};

const openDocument = (url) => {
  window.open(url, '_blank');
};
</script>

<style scoped>
.certification-form {
  width: 100%;
}
.display-mode {
  width: 80%
}

.document-upload .icon {
  cursor: pointer;
}
</style>
