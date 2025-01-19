<!-- components/organisms/Professional/Edit.vue -->
<template>
  <client-only>
    <div class="edit-view" v-if="professional">
      {{ professional.kitchen_experience }}
      {{ professional.languages }}

      <!-- 1) Title (single field) -->
      <MoleculesFormsSingleField
        label="Title"
        collectionName="professionals"
        target="title"
        :documentID="currentUser.uid"
        :firebaseValue="professional.title"
        placeholder="Enter your title"
      />

      <!-- 2) Short Bio (single text area) -->
      <MoleculesFormsTextAreaField
        label="Short Bio"
        collectionName="professionals"
        target="bio_short"
        :documentID="currentUser.uid"
        :firebaseValue="professional.bio_short"
        placeholder="Write a short bio"
        :maxLength="450"
        :formattingFunction="formatShortBio"
        :validationFunction="validateShortBio"
      />

      <!-- 3) Long Bio (single text area) -->
      <MoleculesFormsTextAreaField
        label="Long Bio"
        collectionName="professionals"
        target="bio_long"
        :documentID="currentUser.uid"
        :firebaseValue="professional.bio_long"
        placeholder="Write a detailed bio"
        :maxLength="1000"
        :formattingFunction="formatLongBio"
        :validationFunction="validateLongBio"
      />

      <!-- 4) Kitchen Experience (array) -->
      <MoleculesFormsObjectArray
        label="Kitchen Experience"
        :firebaseValue="professional.kitchen_experience"
      >
        <template #display="{ item, index }">
          <OrganismsProfessionalFieldsKitchenExperience
            :kitchenExperience="item"
            :index="index"
            mode="display"
          />
        </template>
        <template #edit="{ item, index }">
          <OrganismsProfessionalFieldsKitchenExperience
            :kitchenExperience="item"
            :index="index"
            mode="edit"
          />
        </template>
        <!-- Create doesn't need index -->
        <template #create>
          <OrganismsKitchenSearchWizard />
        </template>
      </MoleculesFormsObjectArray>

      <!-- 5) Other Employment Experience (array) -->
      <MoleculesFormsObjectArray
        label="Other Employment Experience"
        :firebaseValue="professional.other_employment_experience"
      >
        <template #display="{ item, index }">
          <OrganismsProfessionalFieldsOtherEmploymentExperience
            :employmentExperience="item"
            :index="index"
            mode="display"
          />
        </template>
        <template #edit="{ item, index }">
          <OrganismsProfessionalFieldsOtherEmploymentExperience
            :employmentExperience="item"
            :index="index"
            mode="edit"
          />
        </template>
        <template #create>
          <OrganismsProfessionalFieldsOtherEmploymentExperience
            mode="create"
          />
        </template>
      </MoleculesFormsObjectArray>

      <!-- 6) Certifications (array) -->
      <MoleculesFormsObjectArray
        label="Certifications"
        :firebaseValue="professional.certifications"
      >
        <template #display="{ item, index }">
          <OrganismsProfessionalFieldsCertification
            :certification="item"
            :index="index"
            mode="display"
          />
        </template>
        <template #edit="{ item, index }">
          <OrganismsProfessionalFieldsCertification
            :certification="item"
            :index="index"
            mode="edit"
          />
        </template>
        <template #create>
          <OrganismsProfessionalFieldsCertification
            mode="create"
          />
        </template>
      </MoleculesFormsObjectArray>

      <!-- 7) Education (array) -->
      <MoleculesFormsObjectArray
        label="Education"
        :firebaseValue="professional.education"
      >
        <template #display="{ item, index }">
          <OrganismsProfessionalFieldsEducation
            :education="item"
            :index="index"
            mode="display"
          />
        </template>
        <template #edit="{ item, index }">
          <OrganismsProfessionalFieldsEducation
            :education="item"
            :index="index"
            mode="edit"
          />
        </template>
        <template #create>
          <OrganismsProfessionalFieldsEducation
            mode="create"
          />
        </template>
      </MoleculesFormsObjectArray>

      <!-- 8) Languages (array) -->
      <MoleculesFormsObjectArray
        label="Languages"
        :firebaseValue="professional.languages"
      >
        <template #display="{ item, index }">
          <OrganismsProfessionalFieldsLanguage
            :language="item"
            :index="index"
            mode="display"
          />
        </template>
        <template #edit="{ item, index }">
          <OrganismsProfessionalFieldsLanguage
            :language="item"
            :index="index"
            mode="edit"
          />
        </template>
        <template #create>
          <OrganismsProfessionalFieldsLanguage
            mode="create"
          />
        </template>
      </MoleculesFormsObjectArray>

      <!-- 9) Volunteering (array) -->
      <MoleculesFormsObjectArray
        label="Volunteering"
        :firebaseValue="professional.volunteering"
      >
        <template #display="{ item, index }">
          <OrganismsProfessionalFieldsVolunteering
            :volunteering="item"
            :index="index"
            mode="display"
          />
        </template>
        <template #edit="{ item, index }">
          <OrganismsProfessionalFieldsVolunteering
            :volunteering="item"
            :index="index"
            mode="edit"
          />
        </template>
        <template #create>
          <OrganismsProfessionalFieldsVolunteering
            mode="create"
          />
        </template>
      </MoleculesFormsObjectArray>

      <!-- 10) Projects (array) -->
      <MoleculesFormsObjectArray
        label="Projects"
        :firebaseValue="professional.projects"
      >
        <template #display="{ item, index }">
          <OrganismsProfessionalFieldsProject
            :project="item"
            :index="index"
            mode="display"
          />
        </template>
        <template #edit="{ item, index }">
          <OrganismsProfessionalFieldsProject
            :project="item"
            :index="index"
            mode="edit"
          />
        </template>
        <template #create>
          <OrganismsProfessionalFieldsProject
            mode="create"
          />
        </template>
      </MoleculesFormsObjectArray>
    </div>

    <div v-else>
      <p class="access-denied-message">
        You do not have permission to edit this profile.
      </p>
    </div>
  </client-only>
</template>

<script setup>
const currentUser = useCurrentUser();
const { currentProfessional: professional } = useProfessional();
</script>
