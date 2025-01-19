<!-- components/organisms/Professional/Fields/Volunteering.vue -->
<template>
  <div class="volunteering-item">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode">
      <div><strong>{{ volunteering.role }}</strong></div>
      <div>{{ volunteering.organization }}</div>
      <div>
        {{ volunteering.from_year }} -
        <span v-if="volunteering.ongoing">Present</span>
        <span v-else>{{ volunteering.to_year }}</span>
      </div>
      <div>{{ volunteering.description }}</div>
    </div>

    <!-- Create Mode -->
    <div v-else-if="mode === 'create'" class="create-mode">
      <div class="form-group">
        <label for="organization" class="label">Organization</label>
        <input
          type="text"
          id="organization"
          v-model="localData.organization"
          placeholder="Enter organization"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="role" class="label">Role</label>
        <input
          type="text"
          id="role"
          v-model="localData.role"
          placeholder="Enter role"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="from-year" class="label">From Year</label>
        <MoleculesYearSelector v-model="localData.from_year" />
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" v-model="localData.ongoing" /> Ongoing
        </label>
      </div>

      <div v-if="!localData.ongoing" class="form-group">
        <label for="to-year" class="label">To Year</label>
        <MoleculesYearSelector v-model="localData.to_year" />
      </div>

      <div class="form-group">
        <label for="description" class="label">Description</label>
        <textarea
          id="description"
          v-model="localData.description"
          placeholder="Enter description"
          class="editable-textarea"
        ></textarea>
      </div>

      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitCreate" />
      </div>
    </div>

    <!-- Edit Mode -->
    <div v-else-if="mode === 'edit'" class="edit-mode">
      <div class="form-group">
        <label for="organization" class="label">Organization</label>
        <input
          type="text"
          id="organization"
          v-model="localData.organization"
          placeholder="Enter organization"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="role" class="label">Role</label>
        <input
          type="text"
          id="role"
          v-model="localData.role"
          placeholder="Enter role"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="from-year" class="label">From Year</label>
        <MoleculesYearSelector v-model="localData.from_year" />
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" v-model="localData.ongoing" /> Ongoing
        </label>
      </div>

      <div v-if="!localData.ongoing" class="form-group">
        <label for="to-year" class="label">To Year</label>
        <MoleculesYearSelector v-model="localData.to_year" />
      </div>

      <div class="form-group">
        <label for="description" class="label">Description</label>
        <textarea
          id="description"
          v-model="localData.description"
          placeholder="Enter description"
          class="editable-textarea"
        ></textarea>
      </div>

      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitEdit" />
        <TrashIcon class="icon" @click="deleteVolunteering" />
      </div>
    </div>
  </div>
</template>

<script setup>

const { addProfessionalArrayItem, updateProfessionalArrayItem, removeProfessionalArrayItem } =
  useProfessional();

const props = defineProps({
  voluntering: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  mode: {
    type: String,
    required: true,
    validator: (value) => ["display", "edit", "create"].includes(value),
  },
});

const localData = ref({ ...props.volunteering });

// Submit Create
async function submitCreate() {
 await addProfessionalArrayItem("volunteering", localData.value);
}

// Submit Edit
async function submitEdit() {
await updateProfessionalArrayItem(
    "something",
    "something",
    props.volunteering,
    localData.value
  );
}

// Delete Volunteering
async function submitDelete() {
await removeProfessionalArrayItem(
    "something",
    "somthing",
    props.vol.institution
  );
}
</script>

<style scoped>
/* Add styles if needed */
</style>
