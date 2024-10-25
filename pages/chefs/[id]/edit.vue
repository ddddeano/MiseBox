<template>
  <client-only>
    <div v-if="isCurrentUserProfile && chef">
      <OrganismsProfileHeader :user="miseboxUser" />

      <div class="profile-forms">
        <!-- Array of Strings -->
        <MoleculesFormsArrayOfStrings
          v-for="(stringSection, index) in stringArraySections"
          :key="index"
          :label="stringSection.label"
          :firebaseValue="stringSection.value"
          collectionName="chefs"
          :documentID="chef.id"
          :target="stringSection.target"
          :placeholder="stringSection.placeholder"
          :itemPlaceholder="stringSection.itemPlaceholder"
          :addButtonLabel="stringSection.addButtonLabel"
        />

        <!-- Object Arrays -->
        <div v-for="(section, index) in objectArraySections" :key="index">
          <MoleculesFormsObjectArray
            :label="section.label"
            :firebaseValue="section.value"
            collectionName="chefs"
            :documentID="chef.id"
            :target="section.target"
          >
            <template #display="{ item }">
              <component :is="section.displayComponent" :[section.target]="item" mode="display" />
            </template>
            <template #edit="{ item }">
              <component :is="section.displayComponent" :[section.target]="item" mode="edit" />
            </template>
            <template #create>
              <component :is="section.displayComponent" mode="create" />
            </template>
          </MoleculesFormsObjectArray>
        </div>

        <!-- Bio Field -->
        <MoleculesFormsTextAreaField
          label="Chef Bio"
          collectionName="chefs"
          target="bio"
          :documentID="chef.id"
          :firebaseValue="chef.bio"
          placeholder="Enter your bio here"
          :formattingFunction="formatBio"
          :validationFunction="validateBio"
          :maxLength="500"
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
const isCurrentUserProfile = computed(() => currentUser.value?.uid === routeUserId.value);

const { miseboxUser } = useMiseboxUser(currentUser);
const { chef } = useChef(miseboxUser);

// Array of strings sections
const stringArraySections = ref([
  {
    label: "Chef Specialities",
    value: chef?.specialities || [],
    target: "specialities",
    placeholder: "No specialities added yet.",
    itemPlaceholder: "Enter a speciality",
    addButtonLabel: "Add Speciality"
  }
]);

// Object array sections
const objectArraySections = ref([
  {
    label: "Kitchens",
    value: chef?.kitchens || [],
    target: "kitchens",
    displayComponent: "KitchenForm"
  },
  {
    label: "Availability",
    value: chef?.availability || [],
    target: "availability",
    displayComponent: "AvailabilityForm"
  },
  {
    label: "Awards",
    value: chef?.awards || [],
    target: "awards",
    displayComponent: "AwardForm"
  },
  {
    label: "Recipes",
    value: chef?.recipes || [],
    target: "recipes",
    displayComponent: "RecipeForm"
  },
  {
    label: "Events",
    value: chef?.events || [],
    target: "events",
    displayComponent: "EventForm"
  },
  {
    label: "Gallery",
    value: chef?.gallery || [],
    target: "gallery",
    displayComponent: "GalleryForm"
  }
]);
</script>
