<!-- components/organisms/Professional/Create.vue -->
<template>
  <div class="wizard">
    <h2>Create Your Professional Profile</h2>
    <MoleculesFormsSingleFieldLocal
      id="professionalName"
      placeholder="Enter your professional display name"
      :value="professional.name || ''"
      @update:value="updateProfessionalName"
    />
    <div class="wizard-actions" v-if="hasKeys">
      <button class="wizard-btn" @click="processProfessional">Save Profile</button>
      <button class="wizard-btn" @click="clearProfessional">Clear</button>
    </div>
  </div>
</template>

<script setup>
const professional = ref({});
const { createProfessional } = useProfessional();
const router = useRouter();
const currentUser = useCurrentUser();

const hasKeys = computed(() => Object.keys(professional.value).length > 0);

function updateProfessionalName(value) {
  professional.value.name = value;
}

async function processProfessional() {
  await createProfessional(professional.value);
  router.push(`/professionals/${currentUser.value?.uid}`);
}

function clearProfessional() {
  professional.value = {};
}
</script>
