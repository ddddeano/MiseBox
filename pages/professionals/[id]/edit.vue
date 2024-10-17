<template>
  <client-only>
    <div class="profile-forms">
      <div class="buttons">
        <div class="edit-button" @click="toggleEditing" :class="{ disabled: isEditing }">
          <PencilSquareIcon class="icon" />
        </div>
        <div class="view-button" @click="toggleEditing" :class="{ disabled: !isEditing }">
          <EyeIcon class="icon" />
        </div>
        <div class="preview-button" @click="goToProfile">
          <UserCircleIcon class="icon" />
        </div>
      </div>

      <div v-if="profile">
        <div class="form-field">
          <MainFormsGenericSingleField
            :userId="profile.id"
            :subscription="profile.job_title"
            :isEditing="isEditing"
            collectionName="professionals"
            target="job_title"
            placeholder="Enter your job title"
          />
        </div>
        <div v-for="field in arrayFields" :key="field.target" class="form-dropdown">
          <MainFormsArrayManager
            :userId="profile.id"
            :title="field.label"
            :items="profile[field.target]"
            :isEditing="isEditing"
            :collectionName="field.collectionName"
            :target="field.target"
          >
            <template #create>
              <SubProfessionalFormsEmploymentExperienceCreate
                v-if="field.target === 'employment_experience'"
                :userId="profile.id"
                :collectionName="field.collectionName"
              />
              <SubProfessionalFormsLanguagesCreate
                v-else-if="field.target === 'languages'"
                :userId="profile.id"
                :collectionName="field.collectionName"
              />
              <SubProfessionalFormsCertificationsCreate
                v-else-if="field.target === 'certifications'"
                :userId="profile.id"
                :collectionName="field.collectionName"
              />
              <SubProfessionalFormsEducationCreate
                v-else-if="field.target === 'education'"
                :userId="profile.id"
                :collectionName="field.collectionName"
              />
              <SubProfessionalFormsLocationsCreate
                v-else-if="field.target === 'locations'"
                :userId="profile.id"
                :collectionName="field.collectionName"
              />
            </template>
          </MainFormsArrayManager>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useCurrentUser, useDocument, useFirestore } from 'vuefire';
import { doc } from 'firebase/firestore';

const db = useFirestore();
const router = useRouter();
const route = useRoute();
const routeUserId = computed(() => route.params.id);
const currentUser = useCurrentUser();
const isCurrentUserProfile = computed(() => currentUser.value?.uid === routeUserId.value);
const isEditing = ref(false);

const toggleEditing = () => {
  if (isCurrentUserProfile.value) {
    isEditing.value = !isEditing.value;
  }
};

const goToProfile = () => {
  if (currentUser.value?.uid) {
    router.push(`/professionals/${currentUser.value.uid}`);
  }
};

const professionalDocRef = computed(() => {
  if (currentUser.value) {
    return doc(db, 'professionals', routeUserId.value);
  }
  return null;
});

const { data: professional } = useDocument(professionalDocRef);

const arrayFields = [
  { label: 'Employment Experience', target: 'employment_experience', collectionName: 'professionals' },
  { label: 'Languages', target: 'languages', collectionName: 'professionals' },
  { label: 'Certifications', target: 'certifications', collectionName: 'professionals' },
  { label: 'Education', target: 'education', collectionName: 'professionals' },
  { label: 'Locations', target: 'locations', collectionName: 'professionals' },
];
</script>
