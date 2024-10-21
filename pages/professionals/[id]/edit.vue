<template>
  <client-only>
    <div v-if="isCurrentUserProfile && professional">
      <OrganismsProfileHeader :user="miseboxUser" />

      <div class="profile-forms">
        <!-- Professional Bio -->
        <MoleculesFormsTextAreaField
          label="Professional Bio"
          collectionName="professionals"
          target="bio"
          :documentID="professional.id"
          :firebaseValue="professional.bio"
          placeholder="Enter your professional bio here"
          :formattingFunction="formatBio"
          :validationFunction="validateBio"
          :maxLength="1000"
        />

        <!-- Employment Experience -->
        <MoleculesFormsObjectArray
          label="Employment Experience"
          :firebaseValue="professional.employment_experience"
          collectionName="professionals"
          :documentID="professional.id"
          target="employment_experience"
          :newObject="{
            place_name: '',
            place_id: '',
            role: '',
            from_year: '',
            from_month: '',
            to_year: '',
            to_month: '',
            formatted_address: '',
            photo_url: '',
            responsibilities: '',
          }"
        >
          <template #display="{ item }">
            <EmploymentExperienceForm :experience="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <EmploymentExperienceForm :experience="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <EmploymentExperienceForm :experience="item" mode="create" />
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
            credential_id: '',
            credential_url: '',
          }"
        >
          <template #display="{ item }">
            <CertificationForm :certification="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <CertificationForm :certification="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <CertificationForm :certification="item" mode="create" />
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
            institution: '',
            degree: '',
            from_year: '',
            to_year: '',
            field_of_study: '',
            activities: '',
          }"
        >
          <template #display="{ item }">
            <EducationForm :education="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <EducationForm :education="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <EducationForm :education="item" mode="create" />
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
            <LanguageForm :language="item" mode="display" />
          </template>
          <template #edit="{ item }">
            <LanguageForm :language="item" mode="edit" />
          </template>
          <template #create="{ item }">
            <LanguageForm :language="item" mode="create" />
          </template>
        </MoleculesFormsObjectArray>

        <!-- Locations -->
        <MoleculesFormsArrayOfStrings
          label="Preferred Locations"
          :firebaseValue="professional.locations"
          collectionName="professionals"
          :documentID="professional.id"
          target="locations"
          placeholder="No locations added yet."
          itemPlaceholder="Enter a location"
          addButtonLabel="Add Location"
        />

        <!-- Skills -->
        <MoleculesFormsArrayOfStrings
          label="Skills"
          :firebaseValue="professional.skills"
          collectionName="professionals"
          :documentID="professional.id"
          target="skills"
          placeholder="No skills added yet."
          itemPlaceholder="Enter a skill"
          addButtonLabel="Add Skill"
        />

        <!-- Interests -->
        <MoleculesFormsArrayOfStrings
          label="Interests"
          :firebaseValue="professional.interests"
          collectionName="professionals"
          :documentID="professional.id"
          target="interests"
          placeholder="No interests added yet."
          itemPlaceholder="Enter an interest"
          addButtonLabel="Add Interest"
        />
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { useCurrentUser } from 'vuefire';
import { useRoute } from 'vue-router';

const route = useRoute();
const routeUserId = computed(() => route.params.id);
const currentUser = useCurrentUser();
const isCurrentUserProfile = computed(
  () => currentUser.value?.uid === routeUserId.value
);

const { miseboxUser } = useMiseboxUser(currentUser);
const { professional } = useProfessional(miseboxUser);
</script>
