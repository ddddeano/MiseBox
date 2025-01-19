<!-- components/organisms/Kitchen/Dashboard.vue -->
<template>
  <div class="kitchen-dashboard">
    <!-- Tab Bar -->
    <div class="tab-bar">
      <button
        class="btn btn-tab"
        :class="{ active: viewMode === 'ingredients' }"
        @click="viewMode = 'ingredients'"
      >
        Ingredients Manager
      </button>
      <button
        class="btn btn-tab"
        :class="{ active: viewMode === 'miseEnPlace' }"
        @click="viewMode = 'miseEnPlace'"
      >
        Mise En Place Manager
      </button>
      <button
        class="btn btn-tab"
        :class="{ active: viewMode === 'dishes' }"
        @click="viewMode = 'dishes'"
      >
        Dishes Manager
      </button>
      <button
        class="btn btn-tab"
        :class="{ active: viewMode === 'recipes' }"
        @click="viewMode = 'recipes'"
      >
        Recipes Manager
      </button>
      <button
        class="btn btn-tab"
        :class="{ active: viewMode === 'suppliers' }"
        @click="viewMode = 'suppliers'"
      >
        Suppliers Manager
      </button>
    </div>

    <!-- Content based on viewMode -->
    <div v-if="viewMode === 'ingredients'">
      <MoleculesFormsObjectArray
        label="Ingredients"
        :firebaseValue="kitchen.ingredients"
      >
        <template #display="{ item, index }">
          <OrganismsKitchenFieldsIngredients
            :ingredient="item"
            :index="index"
            :id="kitchen.id"
            mode="display"
          />
        </template>
        <template #edit="{ item, index }">
          <OrganismsKitchenFieldsIngredients
            :ingredient="item"
            :index="index"
            :id="kitchen.id"
            mode="edit"
          />
        </template>
        <template #create>
          <OrganismsKitchenFieldsIngredients :id="kitchen.id" mode="create" />
        </template>
      </MoleculesFormsObjectArray>
    </div>

    <div v-else-if="viewMode === 'miseEnPlace'">
      <MoleculesFormsObjectArray
        label="Mise En Place"
        :firebaseValue="kitchen.miseEnPlace"
      >
        <template #display="{ item, index }">
          <OrganismsKitchenFieldsMiseEnPlace
            :miseEnPlace="item"
            :index="index"
            :id="kitchen.id"
            mode="display"
          />
        </template>
        <template #edit="{ item, index }">
          <OrganismsKitchenFieldsMiseEnPlace
            :miseEnPlace="item"
            :index="index"
            :id="kitchen.id"
            mode="edit"
          />
        </template>
        <template #create>
          <OrganismsKitchenFieldsMiseEnPlace :id="kitchen.id" mode="create" />
        </template>
      </MoleculesFormsObjectArray>
    </div>

    <div v-else-if="viewMode === 'dishes'">
      <MoleculesFormsObjectArray
        label="Dishes"
        :firebaseValue="kitchen.dishes"
      >
        <template #display="{ item, index }">
          <OrganismsKitchenFieldsDishes
            :dish="item"
            :index="index"
            :id="kitchen.id"
            mode="display"
          />
        </template>
        <template #edit="{ item, index }">
          <OrganismsKitchenFieldsDishes
            :dish="item"
            :index="index"
            :id="kitchen.id"
            mode="edit"
          />
        </template>
        <template #create>
          <OrganismsKitchenFieldsDishes :id="kitchen.id" mode="create" />
        </template>
      </MoleculesFormsObjectArray>
    </div>

    <div v-else-if="viewMode === 'recipes'">
      <MoleculesFormsObjectArray
        label="Recipes"
        :firebaseValue="kitchen.recipes"
      >
        <template #display="{ item, index }">
          <OrganismsKitchenFieldsRecipes
            :recipe="item"
            :index="index"
            :id="kitchen.id"
            mode="display"
          />
        </template>
        <template #edit="{ item, index }">
          <OrganismsKitchenFieldsRecipes
            :recipe="item"
            :index="index"
            :id="kitchen.id"
            mode="edit"
          />
        </template>
        <template #create>
          <OrganismsKitchenFieldsRecipes :id="kitchen.id" mode="create" />
        </template>
      </MoleculesFormsObjectArray>
    </div>

    <div v-else-if="viewMode === 'suppliers'">
      <OrganismsKitchenLinkSupplierManager :kitchen="kitchen" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  kitchen: {
    type: Object,
    required: true,
  },
});

const viewMode = ref("ingredients");
</script>
