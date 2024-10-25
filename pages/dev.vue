<template>
  <client-only>
    <div class="development-area" v-if="professional">
      <h1>Kitchen Experience - Full Details</h1>

      <!-- Kitchen Experience Full Object Array -->
      <MoleculesFormsObjectArray
        label="Kitchen Experience"
        :firebaseValue="professional.kitchen_experience"
        collectionName="professionals"
        :documentID="professional.id"
        target="kitchen_experience"
        :newObject="{
          from_month: '',
          from_year: '',
          to_month: '',
          to_year: '',
          place_id: '',
          place_name: '',
          formatted_address: '',
          role: '',
          document_url: '',
          responsibilities: ''
        }"
      >
        <!-- Display Mode -->
        <template #display="{ item }">
          <OrganismsProfessionalEditKitchenExperience
            :experience="item"
            mode="display"
          />
        </template>

        <!-- Edit Mode -->
        <template #edit="{ item }">
          <OrganismsProfessionalEditKitchenExperience
            :experience="item"
            mode="edit"
          />
        </template>

        <!-- Create Mode -->
        <template #create="{ item }">
          <OrganismsProfessionalEditKitchenExperience
            :experience="item"
            mode="create"
          />
        </template>
      </MoleculesFormsObjectArray>

      <!-- Explicitly Show Different States for Date -->
      <h2>Explicit States - Full Object</h2>

      <h3>Create State</h3>
      <OrganismsProfessionalEditKitchenExperience
        :experience="dummyItem"
        mode="create"
      />

      <h3>Edit State</h3>
      <OrganismsProfessionalEditKitchenExperience
        :experience="dummyItem"
        mode="edit"
      />

      <h3>Display State</h3>
      <OrganismsProfessionalEditKitchenExperience
        :experience="dummyItem"
        mode="display"
      />
    </div>
  </client-only>
</template>

<script setup>
import { ref } from 'vue';
import { useCurrentUser } from 'vuefire';

// Firebase hooks
const currentUser = useCurrentUser();
const { miseboxUser } = useMiseboxUser(currentUser);
const { professional } = useProfessional(miseboxUser);

// Initialize a dummyItem for explicit state handling with the full object
const dummyItem = ref({
  from_month: '',
  from_year: '',
  to_month: '',
  to_year: '',
  place_id: '',
  place_name: '',
  formatted_address: '',
  role: '',
  document_url: '',
  responsibilities: ''
});
</script>

<style scoped>
.development-area {
  padding: 20px;
}

h1,
h2,
h3 {
  margin-top: 20px;
}

.development-area div {
  margin-bottom: 20px;
}
</style>
