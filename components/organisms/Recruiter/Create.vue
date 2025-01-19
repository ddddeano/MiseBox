<!-- components/organisms/Recruiter/Create.vue -->
<template>
  <div class="wizard">
    <h2>Create Your Recruiter Profile</h2>

    <!-- Input for Recruiter Profile Name -->
    <MoleculesFormsSingleFieldLocal
      id="recruiterName"
      placeholder="Enter your recruiter profile name"
      :value="recruiter.name || ''"
      @update:value="updateRecruiterName"
    />

    <!-- Action Buttons -->
    <div class="wizard-actions" v-if="hasKeys">
      <button class="wizard-btn" @click="processRecruiter">Save Profile</button>
      <button class="wizard-btn" @click="clearRecruiter">Clear</button>
    </div>
  </div>
</template>

<script setup>
const recruiter = ref({});
const { createRecruiter } = useRecruiter();
const router = useRouter();
const currentUser = useCurrentUser();

// Check if the recruiter object has keys
const hasKeys = computed(() => Object.keys(recruiter.value).length > 0);

// Update recruiter name
function updateRecruiterName(value) {
  recruiter.value.name = value;
  console.log("[RecruiterWizard] Recruiter name updated:", recruiter.value);
}

// Save recruiter profile
async function processRecruiter() {
  try {
    if (!recruiter.value.name || recruiter.value.name.length < 5) {
      throw new Error("[RecruiterWizard] Recruiter name must be at least 5 characters.");
    }

    await createRecruiter(recruiter.value);
    console.log("[RecruiterWizard] Recruiter profile saved successfully.");

    // Navigate to recruiter's profile
    router.push(`/recruiters/${currentUser.value?.uid}`);
  } catch (error) {
    console.error("[RecruiterWizard] Error saving recruiter profile:", error.message);
  }
}

// Clear recruiter form
function clearRecruiter() {
  recruiter.value = {};
  console.log("[RecruiterWizard] Recruiter profile form cleared");
}
</script>
