<!-- components/organisms/Professional/Edit.vue -->
<!-- ~/components/Organisms/Professional/Edit.vue -->

<template>
  <client-only>
    <div class="edit-view">
      <div v-if="isViewingOwn && professional">
        <h3>Edit Your Professional Profile</h3>

        <!-- Title -->
        <MoleculesFormsSingleField
          label="Title"
          collectionName="professionals"
          target="title"
          :documentID="currentUser.uid"
          :firebaseValue="professional.title"
          placeholder="Enter your title"
          :formattingFunction="formatTitle"
          :validationFunction="validateTitle"
        />

        <!-- Short Bio -->
        <MoleculesFormsTextAreaField
          label="Short Bio"
          collectionName="professionals"
          target="bio_short"
          :documentID="currentUser.uid"
          :firebaseValue="professional.bio_short"
          :maxLength="450"
          placeholder="Write a short bio"
          :formattingFunction="formatBio"
          :validationFunction="validateBio"
        />

        <!-- Long Bio -->
        <MoleculesFormsTextAreaField
          label="Long Bio"
          collectionName="professionals"
          target="bio_long"
          :documentID="currentUser.uid"
          :firebaseValue="professional.bio_long"
          :maxLength="1000"
          placeholder="Write a detailed bio"
          :formattingFunction="formatBio"
          :validationFunction="validateBio"
        />

        <!-- Kitchen Experience -->
        <MoleculesFormsObjectArray
          label="Kitchen Experience"
          :firebaseValue="professional.kitchen_experience"
          collectionName="professionals"
          :documentID="currentUser.uid"
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
            <OrganismsProfessionalFieldsKitchenExperience :experience="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <OrganismsProfessionalFieldsKitchenExperience :experience="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <OrganismsProfessionalFieldsKitchenExperience :experience="item" mode="create" />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Certifications -->
        <MoleculesFormsObjectArray
          label="Certifications"
          :firebaseValue="professional.certifications"
          collectionName="professionals"
          :documentID="currentUser.uid"
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
            <OrganismsProfessionalFieldsCertification :certification="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <OrganismsProfessionalFieldsCertification :certification="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <OrganismsProfessionalFieldsCertification :certification="item" mode="create" />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Education -->
        <MoleculesFormsObjectArray
          label="Education"
          :firebaseValue="professional.education"
          collectionName="professionals"
          :documentID="currentUser.uid"
          target="education"
          :formattingFunction="formatEducation"
          :validationFunction="validateEducation"
          :newObject="{
            school_name: '',
            degree: '',
            field_of_study: '',
            start_year: '',
            end_year: '',
            document_url: ''
          }"
        >
          <template #display="{ item }">
            <OrganismsProfessionalFieldsEducation :education="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <OrganismsProfessionalFieldsEducation :education="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <OrganismsProfessionalFieldsEducation :education="item" mode="create" />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Languages -->
        <MoleculesFormsObjectArray
          label="Languages"
          :firebaseValue="professional.languages"
          collectionName="professionals"
          :documentID="currentUser.uid"
          target="languages"
          :formattingFunction="formatLanguages"
          :validationFunction="validateLanguages"
          :newObject="{ language: '', proficiency: '' }"
        >
          <template #display="{ item }">
            <OrganismsProfessionalFieldsLanguage :language="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <OrganismsProfessionalFieldsLanguage :language="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <OrganismsProfessionalFieldsLanguage :language="item" mode="create" />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Volunteering -->
        <MoleculesFormsObjectArray
          label="Volunteering"
          :firebaseValue="professional.volunteering"
          collectionName="professionals"
          :documentID="currentUser.uid"
          target="volunteering"
          :formattingFunction="formatVolunteering"
          :validationFunction="validateVolunteering"
          :newObject="{
            organization_name: '',
            role: '',
            start_year: '',
            end_year: '',
            description: ''
          }"
        >
          <template #display="{ item }">
            <OrganismsProfessionalFieldsVolunteering :volunteering="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <OrganismsProfessionalFieldsVolunteering :volunteering="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <OrganismsProfessionalFieldsVolunteering :volunteering="item" mode="create" />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Projects -->
        <MoleculesFormsObjectArray
          label="Projects"
          :firebaseValue="professional.projects"
          collectionName="professionals"
          :documentID="currentUser.uid"
          target="projects"
          :formattingFunction="formatProjects"
          :validationFunction="validateProjects"
          :newObject="{
            name: '',
            description: '',
            year: '',
            document_url: ''
          }"
        >
          <template #display="{ item }">
            <OrganismsProfessionalFieldsProject :project="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <OrganismsProfessionalFieldsProject :project="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <OrganismsProfessionalFieldsProject :project="item" mode="create" />
          </template>
        </MoleculesFormsObjectArray>
      </div>
      <div v-else>
        <p class="access-denied-message">
          You do not have permission to edit this profile.
        </p>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useFirestore, useDocument, useCurrentUser } from "vuefire";
import { doc } from "firebase/firestore";
import {
  formatTitle,
  validateTitle,
  formatKitchenExperience,
  validateKitchenExperience,
  formatCertifications,
  validateCertifications,
  formatEducation,
  validateEducation,
  formatLanguages,
  validateLanguages,
  formatVolunteering,
  validateVolunteering,
  formatProjects,
  validateProjects,
} from "~/composables/utils/useProfessionalFormattingAndValidation";

import { formatBio, validateBio } from "~/composables/utils/useSharedFormattingAndValidation";

// Props for the Chef data
const props = defineProps({
  professional: {
    type: Object,
    required: true,
    default: () => ({}), // Default empty object
  },
});

const currentUser = useCurrentUser();
</script>



