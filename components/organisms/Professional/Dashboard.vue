<!-- components/organisms/Professional/Dashboard.vue -->
<!-- components/organisms/Professional/Edit.vue -->
<template>
  <client-only>
    <div v-if="professional" class="edit-view">
      <h3>Edit Your Professional Profile</h3>

      <!-- Title -->
      <MoleculesFormsSingleField
        label="Title"
        collectionName="professionals"
        target="title"
        :documentID="currentUser.uid"
        :firebaseValue="professional.title"
        placeholder="Enter your title"
      />

      <!-- Short Bio -->
      <MoleculesFormsTextAreaField
        label="Short Bio"
        collectionName="professionals"
        target="bio_short"
        :documentID="currentUser.uid"
        :firebaseValue="professional.bio_short"
        placeholder="Write a short bio"
        :maxLength="450"
      />

      <!-- Long Bio -->
      <MoleculesFormsTextAreaField
        label="Long Bio"
        collectionName="professionals"
        target="bio_long"
        :documentID="currentUser.uid"
        :firebaseValue="professional.bio_long"
        placeholder="Write a detailed bio"
        :maxLength="1000"
      />

      <!-- Kitchen Experience -->
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
        <template #create>
          <OrganismsKitchenSearchWizard />
        </template>
      </MoleculesFormsObjectArray>

      <!-- Other Employment Experience -->
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

      <!-- Certifications -->
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

      <!-- Education -->
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

      <!-- Languages -->
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

      <!-- Volunteering -->
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

      <!-- Projects -->
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
        Access Denied. You are not authorized to edit this profile.
      </p>
    </div>
  </client-only>
</template>

<script setup>
import { useCurrentUser } from "vuefire";

const currentUser = useCurrentUser();
const { currentProfessional: professional } = useProfessional();
</script>
