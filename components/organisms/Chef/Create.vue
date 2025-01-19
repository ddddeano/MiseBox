<!-- components/organisms/Chef/Create.vue -->
<template>
  <div class="wizard">
    <h2>Create Your Chef Profile</h2>

    <!-- Manual Input -->
    <div class="wizard-manual">
      <MoleculesFormsSingleFieldLocal
        id="chefName"
        placeholder="Enter your chef profile name..."
        :value="chef.name || ''"
        @update:value="updateChefName"
      />
      <div class="wizard-actions" v-if="hasKeys">
        <button class="wizard-btn" @click="processChef">Save Profile</button>
        <button class="wizard-btn" @click="clearChef">Clear</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const chef = ref({});
const { createChef } = useChef();
const router = useRouter();
const currentUser = useCurrentUser();

// Check if the chef object has keys
const hasKeys = computed(() => Object.keys(chef.value).length > 0);

// Update chef name
function updateChefName(value) {
  chef.value.name = value;
  chef.value.source = value.length >= 5 ? "manual" : null; // Mark as manual input
  console.log("[ChefWizard] Chef name updated:", chef.value);
}

// Process and save the chef profile
async function processChef() {
  try {
    const chefData = { ...chef.value, id: currentUser.value?.uid }; // Attach user ID
    await createChef(chefData);
    console.log("[ChefWizard] Chef profile saved successfully");

    // Navigate to the chef profile page
    router.push(`/chefs/${currentUser.value?.uid}`);
  } catch (error) {
    console.error("[ChefWizard] Error saving chef profile:", error.message);
  }
}

// Clear the chef profile form
function clearChef() {
  chef.value = {}; // Reset to an empty object
  console.log("[ChefWizard] Chef profile form cleared");
}
</script>

<style scoped>
/* Styles remain shared or scoped as required */
</style>
