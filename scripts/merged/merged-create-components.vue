
<!-- ============================
components/organisms/Chef/Create.vue
============================ -->

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


<!-- ============================
components/organisms/Ingredient/Create.vue
============================ -->

<template>
  <div class="wizard">
    <h2>Find or Create an Ingredient</h2>

    <!-- Search for Ingredients -->
    <OrganismsIngredientSearch
      v-if="!hasKeys"
      @select-ingredient="handleSelectIngredient"
      class="wizard-search"
    />

    <!-- Selected Ingredient Cell -->
    <div
      v-if="ingredient.source === 'google' || ingredient.source === 'firestore'"
      class="wizard-cell-display"
    >
      <OrganismsIngredientCell :ingredient="ingredient" :isDisabled="true" />
    </div>

    <!-- Manual Input -->
    <div v-if="ingredient.source === 'manual' || !ingredient.source" class="wizard-manual">
      <div class="wizard-divider" v-if="ingredient.source !== 'manual'">
        <span class="wizard-divider-line"></span>
        <span class="wizard-divider-text">Or Enter Manually</span>
        <span class="wizard-divider-line"></span>
      </div>
      <MoleculesFormsSingleFieldLocal
        id="ingredientName"
        placeholder="Enter the ingredient name..."
        :value="ingredient.name || ''"
        @update:value="(value) => (ingredient.name = value)"
      />
    </div>

    <!-- Action Buttons -->
    <div class="wizard-actions" v-if="hasKeys">
      <button class="wizard-btn" @click="processIngredient">
        {{ ingredient.source ? "Use Selected Ingredient" : "Create Ingredient" }}
      </button>
      <button class="wizard-btn" @click="clearIngredient">Clear</button>
    </div>
  </div>
</template>

<script setup>
const ingredient = ref({});
const { createIngredient } = useIngredient();
const router = useRouter();

const hasKeys = computed(() => Object.keys(ingredient.value).length > 0);

function handleSelectIngredient(selected) {
  ingredient.value = selected; // Set the selected ingredient
}

async function processIngredient() {
  const ingredientId = await createIngredient(ingredient.value); // Save ingredient and get ID
  router.push(`/ingredients/${ingredientId}`); // Navigate to the ingredient's detail page
}

function clearIngredient() {
  ingredient.value = {}; // Reset the ingredient object
}
</script>

<style scoped>
/* Shared or scoped styles as required */
</style>


<!-- ============================
components/organisms/Job/Create.vue
============================ -->

<template>
  <div class="wizard">
    <h2>Create or Edit a Job</h2>

    <!-- Input for Job Title -->
    <MoleculesFormsSingleFieldLocal
      id="jobTitle"
      placeholder="Enter the job title"
      :value="job.title || ''"
      @update:value="(value) => (job.title = value)"
    />

    <!-- Action Buttons -->
    <div class="wizard-actions" v-if="hasKeys">
      <button class="wizard-btn" @click="processJob">Save Job</button>
      <button class="wizard-btn" @click="clearJob">Clear</button>
    </div>
  </div>
</template>

<script setup>
const job = ref({});
const { createJob } = useJob();
const router = useRouter();

const hasKeys = computed(() => Object.keys(job.value).length > 0);

async function processJob() {
  const jobId = await createJob(job.value); // Save job and get ID
  router.push(`/jobs/${jobId}`); // Navigate to the job's detail page
}

function clearJob() {
  job.value = {}; // Reset the job object
}
</script>

<style scoped>
/* Shared or scoped styles can be added as required */
</style>


<!-- ============================
components/organisms/Kitchen/Create.vue
============================ -->

<template>
  <div class="wizard">
    <h2>Find or Create a Kitchen</h2>

    <!-- Search for Kitchens -->
    <OrganismsKitchenSearch
      v-if="!hasKeys"
      @select-kitchen="handleSelectKitchen"
      class="wizard-search"
    />

    <!-- Selected Kitchen Cell -->
    <div
      v-if="kitchen.source === 'google' || kitchen.source === 'firestore'"
      class="wizard-cell-display"
    >
      <OrganismsKitchenCell :kitchen="kitchen" :isDisabled="true" />
    </div>

    <!-- Manual Input -->
    <div v-if="kitchen.source === 'manual' || !kitchen.source" class="wizard-manual">
      <div class="wizard-divider" v-if="kitchen.source !== 'manual'">
        <span class="wizard-divider-line"></span>
        <span class="wizard-divider-text">Or Enter Manually</span>
        <span class="wizard-divider-line"></span>
      </div>
      <MoleculesFormsSingleFieldLocal
        id="kitchenName"
        placeholder="Enter the kitchen name..."
        :value="kitchen.name || ''"
        @update:value="(value) => (kitchen.name = value)"
      />
    </div>

    <!-- Action Buttons -->
    <div class="wizard-actions" v-if="hasKeys">
      <button class="wizard-btn" @click="processKitchen">
        {{ kitchen.source ? "Use Selected Kitchen" : "Create Kitchen" }}
      </button>
      <button class="wizard-btn" @click="clearKitchen">Clear</button>
    </div>
  </div>
</template>

<script setup>
const kitchen = ref({});
const { createKitchen } = useKitchen();
const router = useRouter();

const hasKeys = computed(() => Object.keys(kitchen.value).length > 0);

function handleSelectKitchen(selected) {
  kitchen.value = selected; // Set the selected kitchen
}

async function processKitchen() {
  const kitchenId = await createKitchen(kitchen.value); // Save kitchen and get ID
  router.push(`/kitchens/${kitchenId}`); // Navigate to the kitchen's detail page
}

function clearKitchen() {
  kitchen.value = {}; // Reset the kitchen object
}
</script>

<style scoped>
/* Shared or scoped styles as required */
</style>


<!-- ============================
components/organisms/MiseboxUser/Create.vue
============================ -->

<template>
  <div class="wizard">
    <h2>Create Your Misebox User Profile</h2>
    <MoleculesFormsSingleFieldLocal
      id="displayName"
      placeholder="Enter your display name"
      :value="miseboxUser.displayName || ''"
      @update:value="updateDisplayName"
    />
    <div class="wizard-actions" v-if="hasKeys">
      <button class="wizard-btn" @click="processMiseboxUser">Save Profile</button>
      <button class="wizard-btn" @click="clearMiseboxUser">Clear</button>
    </div>
  </div>
</template>

<script setup>
const miseboxUser = ref({});
const { createMiseboxUser } = useMiseboxUser();
const router = useRouter();
const currentUser = useCurrentUser();

const hasKeys = computed(() => Object.keys(miseboxUser.value).length > 0);

function updateDisplayName(value) {
  miseboxUser.value.displayName = value;
}

async function processMiseboxUser() {
  await createMiseboxUser(miseboxUser.value);
  router.push(`/misebox-users/${currentUser.value?.uid}`);
}

function clearMiseboxUser() {
  miseboxUser.value = {};
}
</script>


<!-- ============================
components/organisms/Professional/Create.vue
============================ -->

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


<!-- ============================
components/organisms/Recruiter/Create.vue
============================ -->

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


<!-- ============================
components/organisms/Supplier/Create.vue
============================ -->

<template>
  <div class="wizard">
    <h2>Find or Create a Supplier</h2>
    <OrganismsSupplierSearch
      v-if="!hasKeys"
      @select-supplier="handleSelectSupplier"
      class="wizard-search"
    />
    <div
      v-if="supplier.source === 'google' || supplier.source === 'firestore'"
      class="wizard-cell-display"
    >
      <OrganismsSupplierCell :supplier="supplier" :isDisabled="true" />
    </div>
    <div v-if="supplier.source === 'manual' || !supplier.source" class="wizard-manual">
      <div class="wizard-divider" v-if="supplier.source !== 'manual'">
        <span class="wizard-divider-line"></span>
        <span class="wizard-divider-text">Or Enter Manually</span>
        <span class="wizard-divider-line"></span>
      </div>
      <MoleculesFormsSingleFieldLocal
        id="supplierName"
        placeholder="Enter the supplier name..."
        :value="supplier.name || ''"
        @update:value="updateSupplierName"
      />
      <div class="wizard-actions" v-if="hasKeys">
        <button class="wizard-btn" @click="processSupplier">Save Supplier</button>
        <button class="wizard-btn" @click="clearSupplier">Clear</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const supplier = ref({});
const { createSupplier } = useSupplier();
const router = useRouter();
const currentUser = useCurrentUser();

const hasKeys = computed(() => Object.keys(supplier.value).length > 0);

function handleSelectSupplier(selected) {
  supplier.value = selected;
}

function updateSupplierName(value) {
  supplier.value.name = value;
  supplier.value.source = value.length >= 3 ? "manual" : null;
}

async function processSupplier() {
  await createSupplier(supplier.value);
  router.push(`/suppliers/${currentUser.value?.uid}`);
}

function clearSupplier() {
  supplier.value = {};
}
</script>

