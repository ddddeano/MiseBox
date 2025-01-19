<!-- components/organisms/MiseboxUser/Create.vue -->
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
