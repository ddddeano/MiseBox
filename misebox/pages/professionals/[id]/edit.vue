<template>
  <client-only>
    <div class="profile-forms">
      <div v-if="isCurrentUserProfile && professional">
        <OrganismsProfileHeader :user="miseboxUser" />

        <!-- Single Field Forms -->
        <MoleculesFormsSingleField
          label="Title"
          collectionName="professionals"
          target="title"
          :documentID="professional.id"
          :firebaseValue="professional.title"
          :formattingFunction="formatTitle"
          :validationFunction="validateTitle"
          placeholder="Chef de Partie / Freelance / Pâtissier"
        />
        <MoleculesFormsTextAreaField
          label="Short Bio"
          collectionName="professionals"
          target="bio_short"
          :documentID="professional.id"
          :firebaseValue="professional.bio_short"
          :formattingFunction="formatBio"
          :validationFunction="validateBio"
          :maxLength="450"
        />
        <MoleculesFormsTextAreaField
          label="Long Bio"
          collectionName="professionals"
          target="bio_long"
          :documentID="professional.id"
          :firebaseValue="professional.bio_long"
          :formattingFunction="formatBio"
          :validationFunction="validateBio"
          :maxLength="1000"
        />

        <!-- Kitchen Experience -->
        <MoleculesFormsObjectArray
          label="Kitchen Experience"
          :firebaseValue="professional.kitchen_experience"
          collectionName="professionals"
          :documentID="professional.id"
          target="kitchen_experience"
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
            <OrganismsProfessionalEditKitchenExperience
              :experience="item"
              mode="display"
            />
          </template>
          <template #edit="{ item }">
            <OrganismsProfessionalEditKitchenExperience
              :experience="item"
              mode="edit"
            />
          </template>
          <template #create="{ item }">
            <OrganismsProfessionalEditKitchenExperience
              :experience="item"
              mode="create"
            />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Other Employment Experience -->
        <MoleculesFormsObjectArray
          label="Other Employment Experience"
          :firebaseValue="professional.other_employment_experience"
          collectionName="professionals"
          :documentID="professional.id"
          target="other_employment_experience"
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
            <OrganismsProfessionalEditOtherEmploymentExperience
              :experience="item"
              mode="display"
            />
          </template>
          <template #edit="{ item }">
            <OrganismsProfessionalEditOtherEmploymentExperience
              :experience="item"
              mode="edit"
            />
          </template>
          <template #create="{ item }">
            <OrganismsProfessionalEditOtherEmploymentExperience
              :experience="item"
              mode="create"
            />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Certifications -->
        <MoleculesFormsObjectArray
          label="Certifications"
          :firebaseValue="professional.certifications"
          collectionName="professionals"
          :documentID="professional.id"
          target="certifications"
          :newObject="{
            name: '',
            issuing_organization: '',
            year: '',
            document_url: ''
          }"
        >
          <template #display="{ item }">
            <OrganismsProfessionalEditCertification
              :certification="item"
              mode="display"
            />
          </template>
          <template #edit="{ item }">
            <OrganismsProfessionalEditCertification
              :certification="item"
              mode="edit"
            />
          </template>
          <template #create="{ item }">
            <OrganismsProfessionalEditCertification
              :certification="item"
              mode="create"
            />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Education -->
        <MoleculesFormsObjectArray
          label="Education"
          :firebaseValue="professional.education"
          collectionName="professionals"
          :documentID="professional.id"
          target="education"
          :newObject="{
            degree: '',
            school_name: '',
            school_place_id: '',
            formatted_address: '',
            year: '',
            document_url: '',
            city: '',
            region: ''
          }"
        >
          <template #display="{ item }">
            <OrganismsProfessionalEditEducation
              :education="item"
              mode="display"
            />
          </template>
          <template #edit="{ item }">
            <OrganismsProfessionalEditEducation
              :education="item"
              mode="edit"
            />
          </template>
          <template #create="{ item }">
            <OrganismsProfessionalEditEducation
              :education="item"
              mode="create"
            />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Languages -->
        <MoleculesFormsObjectArray
          label="Languages"
          :firebaseValue="professional.languages"
          collectionName="professionals"
          :documentID="professional.id"
          target="languages"
          :newObject="{ language: '', proficiency: '' }"
        >
          <template #display="{ item }">
            <OrganismsProfessionalEditLanguage
              :language="item"
              mode="display"
            />
          </template>
          <template #edit="{ item }">
            <OrganismsProfessionalEditLanguage :language="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <OrganismsProfessionalEditLanguage :language="item" mode="create" />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Projects -->
        <MoleculesFormsObjectArray
          label="Projects"
          :firebaseValue="professional.projects"
          collectionName="professionals"
          :documentID="professional.id"
          target="projects"
          :newObject="{
            name: '',
            description: '',
            url: '',
            from_year: '',
            to_year: '',
            document_url: ''
          }"
        >
          <template #display="{ item }">
            <OrganismsProfessionalEditProject :project="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <OrganismsProfessionalEditProject :project="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <OrganismsProfessionalEditProject :project="item" mode="create" />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Volunteering -->
        <MoleculesFormsObjectArray
          label="Volunteering"
          :firebaseValue="professional.volunteering"
          collectionName="professionals"
          :documentID="professional.id"
          target="volunteering"
          :newObject="{
            organization: '',
            role: '',
            from_year: '',
            to_year: '',
            description: '',
            document_url: ''
          }"
        >
          <template #display="{ item }">
            <OrganismsProfessionalEditVolunteering
              :volunteering="item"
              mode="display"
            />
          </template>
          <template #edit="{ item }">
            <OrganismsProfessionalEditVolunteering
              :volunteering="item"
              mode="edit"
            />
          </template>
          <template #create="{ item }">
            <OrganismsProfessionalEditVolunteering
              :volunteering="item"
              mode="create"
            />
          </template>
        </MoleculesFormsObjectArray>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { useCurrentUser } from 'vuefire';
import { useRoute } from 'vue-router';

const route = useRoute();
const currentUser = useCurrentUser();
const isCurrentUserProfile = computed(() => currentUser.value?.uid === route.params.id);

// Misebox and professional data setup
const { miseboxUser } = useMiseboxUser(currentUser);
const { professional } = useProfessional(miseboxUser);
</script>
