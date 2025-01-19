<!-- components/molecules/forms/ObjectArray.vue -->
<template>
  <div class="form-field">
    <!-- Top Section -->
    <MoleculesFormsTopSection
      :label="label"
      :isFolded="isFolded"
      :itemsLength="firebaseValue.length"
      @toggle="toggleFold"
      @start-creating="startCreating"
      @start-editing="startEditing"
      @start-displaying="startDisplaying"
    />

    <!-- Section States -->
    <div class="states" v-if="!isFolded">
      <!-- Edit Mode -->
      <template v-if="isEditing">
        <ul class="edit-mode list">
          <li
            v-for="(item, index) in firebaseValue"
            :key="index"
            class="list-item"
          >
            <slot name="edit" :item="item" :index="index" />
          </li>
        </ul>
      </template>

      <!-- Create Mode -->
      <template v-if="isCreating">
        <div class="create-mode list">
          <slot name="create" />
        </div>
      </template>

      <!-- Display Mode -->
      <template v-if="isDisplaying">
        <ul class="display-mode list">
          <li
            v-for="(item, index) in firebaseValue"
            :key="index"
            class="list-item"
          >
            <slot name="display" :item="item" :index="index" />
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "Manage Items",
  },
  firebaseValue: {
    type: Array,
    default: () => [],
  },
});

const isFolded = ref(true);
const isCreating = ref(false);
const isEditing = ref(false);
const isDisplaying = ref(false);

function toggleFold() {
  isFolded.value = !isFolded.value;
  if (!isFolded.value) {
    resetStates();
    isDisplaying.value = true;
  }
}

function startCreating() {
  resetStates();
  isCreating.value = true;
}

function startEditing() {
  resetStates();
  isEditing.value = true;
}

function startDisplaying() {
  resetStates();
  isDisplaying.value = true;
}

function resetStates() {
  isCreating.value = false;
  isEditing.value = false;
  isDisplaying.value = false;
}

watchEffect(() => {
  if (props.firebaseValue.length > 0) {
    resetStates();
    isDisplaying.value = true;
  }
});
</script>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.states {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center align the items */
  width: 100%;
}

/* Leverage shared styles from File 2 */
.edit-mode,
.create-mode,
.display-mode {
  width: 100%;
}
</style>
