<template>
  <client-only>
    <div class="profile-forms">
      <div v-if="isViewingOwnRoute && professional">
        <h3>Edit your Professional Profile</h3>
        <!-- Sign Out Button -->
        <button @click="handleSignOut" class="btn btn-secondary btn-pill sign-out-btn">
          Sign Out
        </button>

        <!-- Header Component -->
        <MoleculesMiseboxUserHeader :fetchedMiseboxUser="miseboxUser" />

        <!-- Title -->
        <MoleculesFormsSingleField
          label="Title"
          collectionName="professionals"
          target="title"
          :documentID="route.params.id"
          :firebaseValue="professional.title"
          placeholder="Chef de Partie / Freelance / Pâtissier"
          :formattingFunction="formatTitle"
          :validationFunction="validateTitle"
        />

        <!-- Short Bio -->
        <MoleculesFormsTextAreaField
          label="Short Bio"
          collectionName="professionals"
          target="bio_short"
          :documentID="route.params.id"
          :firebaseValue="professional.bio_short"
          :maxLength="450"
          :formattingFunction="formatBio"
          :validationFunction="validateBio"
        />

        <!-- Long Bio -->
        <MoleculesFormsTextAreaField
          label="Long Bio"
          collectionName="professionals"
          target="bio_long"
          :documentID="route.params.id"
          :firebaseValue="professional.bio_long"
          :maxLength="1000"
          :formattingFunction="formatBio"
          :validationFunction="validateBio"
        />

        <!-- Kitchen Experience -->
        <MoleculesFormsObjectArray
          label="Kitchen Experience"
          :firebaseValue="professional.kitchen_experience"
          collectionName="professionals"
          :documentID="route.params.id"
          target="kitchen_experience"
          :formattingFunction="formatKitchenExperience"
          :validationFunction="validateKitchenExperience"
          :newObject="{
            place_name: '',
            place_id: '',
            role: '',
            from_year: '',
            from_month: '',
            to_year: '',
            to_month: '',
            formatted_address: '',
            responsibilities: '',
            document_url: '',
            city: '',
            region: ''
          }"
        >
          <template #display="{ item }">
            <OrganismsProfessionalEditKitchenExperience :experience="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <OrganismsProfessionalEditKitchenExperience :experience="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <OrganismsProfessionalEditKitchenExperience :experience="item" mode="create" />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Other Employment Experience -->
        <MoleculesFormsObjectArray
          label="Other Experience"
          :firebaseValue="professional.other_employment_experience"
          collectionName="professionals"
          :documentID="route.params.id"
          target="other_employment_experience"
          :formattingFunction="formatOtherExperience"
          :validationFunction="validateOtherExperience"
          :newObject="{
            place_name: '',
            place_id: '',
            role: '',
            from_year: '',
            from_month: '',
            to_year: '',
            to_month: '',
            formatted_address: '',
            responsibilities: '',
            document_url: '',
            city: '',
            region: ''
          }"
        >
          <template #display="{ item }">
            <OrganismsProfessionalEditOtherEmploymentExperience :experience="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <OrganismsProfessionalEditOtherEmploymentExperience :experience="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <OrganismsProfessionalEditOtherEmploymentExperience :experience="item" mode="create" />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Certifications -->
        <MoleculesFormsObjectArray
          label="Certifications"
          :firebaseValue="professional.certifications"
          collectionName="professionals"
          :documentID="route.params.id"
          target="certifications"
          :formattingFunction="formatCertifications"
          :validationFunction="validateCertifications"
          :newObject="{
            name: '',
            issuing_organization: '',
            year: '',
            document_url: ''
          }"
        >
          <template #display="{ item }">
            <OrganismsProfessionalEditCertification :certification="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <OrganismsProfessionalEditCertification :certification="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <OrganismsProfessionalEditCertification :certification="item" mode="create" />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Languages -->
        <MoleculesFormsObjectArray
          label="Languages"
          :firebaseValue="professional.languages"
          collectionName="professionals"
          :documentID="route.params.id"
          target="languages"
          :formattingFunction="formatLanguages"
          :validationFunction="validateLanguages"
          :newObject="{ language: '', proficiency: '' }"
        >
          <template #display="{ item }">
            <OrganismsProfessionalEditLanguage :language="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <OrganismsProfessionalEditLanguage :language="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <OrganismsProfessionalEditLanguage :language="item" mode="create" />
          </template>
        </MoleculesFormsObjectArray>
      </div>
      <button @click="viewProfile" class="btn btn-primary">View My Profile</button>
    </div>
  </client-only>
</template>

<script setup>
import {
  formatTitle,
  formatBio,
  formatKitchenExperience,
  formatOtherExperience,
  formatCertifications,
  formatLanguages,
  validateTitle,
  validateBio,
  validateKitchenExperience,
  validateOtherExperience,
  validateCertifications,
  validateLanguages
} from '~/composables/utils/useProfessionalFormattingAndValidation';
import { useRouter } from 'vue-router';
import { useDocument, useFirestore } from 'vuefire';
import { doc } from 'firebase/firestore';

const router = useRouter();
const route = useRoute();
const db = useFirestore();

const professionalDocRef = computed(() =>
  route.params.id ? doc(db, 'professionals', route.params.id) : undefined
);

const { data: professional } = useDocument(professionalDocRef);

const isViewingOwnRoute = computed(() => {
  return professional.value && professional.value.id === route.params.id;
});

const handleSignOut = () => {
  logout();
};

const viewProfile = () => {
  router.push(`/professionals/${route.params.id}`);
};
</script>
