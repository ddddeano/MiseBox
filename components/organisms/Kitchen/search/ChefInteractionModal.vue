<!-- components/organisms/Kitchen/search/ChefInteractionModal.vue -->
<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2>Chef Interaction</h2>
      <p v-if="chef">
        You have a chef profile. Would you like to add <strong>{{ kitchen.name }}</strong> to your kitchens?
      </p>
      <p v-else>
        You do not have a chef profile. Would you like to create one?
      </p>

      <div class="modal-actions">
        <button class="btn-primary" v-if="chef" @click="addKitchen">Add to Kitchens</button>
        <button class="btn-primary" v-else @click="createChefProfile">Create Chef Profile</button>
        <button class="btn-link" @click="skip">Skip</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
defineProps({
  kitchen: {
    type: Object,
    required: true,
  },
});

// Emits
const emit = defineEmits(["close"]);

// State & Hooks
const { currentChef: chef, createChef } = useChef(); // Exposing `createChef` for creating a chef profile

// Methods
const addKitchen = () => {
  console.log("[ChefInteractionModal] Adding kitchen to chef's kitchens:", kitchen);
  // Logic to update chef's kitchens array will go here
  emit("close");
};

const createChefProfile = async () => {
  try {
    console.log("[ChefInteractionModal] Creating chef profile.");
    await createChef(); // Call the `createChef` function from the manager
    console.log("[ChefInteractionModal] Chef profile created successfully.");
  } catch (error) {
    console.error("[ChefInteractionModal] Error creating chef profile:", error);
  }
};

const skip = () => {
  console.log("[ChefInteractionModal] Skipping interaction.");
  emit("close");
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: var(--background);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.modal-actions {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn-primary {
  background-color: var(--primary);
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
}

.btn-primary:hover {
  background-color: var(--primary-hover);
}

.btn-link {
  background: none;
  color: var(--text-primary);
  border: none;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-link:hover {
  text-decoration: none;
}
</style>
