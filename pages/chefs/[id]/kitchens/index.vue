<!-- pages/chefs/[id]/kitchens/index.vue -->
<template>
  <client-only>
    <div v-if="chef" class="chef-kitchens">
      <h3 v-if="chef.displayName">{{ chef.displayName }}'s Kitchens</h3>

      <div v-if="chef.kitchens?.length > 0" class="kitchen-list">
        <ul>
          <li v-for="kitchen in chef.kitchens" :key="kitchen.id">
            <nuxt-link :to="`/kitchens/${kitchen.id}`" class="kitchen-link">
              {{ kitchen.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div v-else>
        <p class="no-kitchens">No kitchens found. Add a kitchen below.</p>
      </div>

      <!-- Add Kitchen Form -->
      <div class="add-kitchen">
        <h4>Add a Kitchen</h4>
        <form @submit.prevent="addKitchen" class="kitchen-form">
          <div class="form-group">
            <label for="kitchen-name">Kitchen Name</label>
            <input
              id="kitchen-name"
              v-model="kitchenForm.name"
              type="text"
              placeholder="Enter kitchen name"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="kitchen-address">Kitchen Address</label>
            <input
              id="kitchen-address"
              v-model="kitchenForm.formatted_address"
              type="text"
              placeholder="Enter kitchen address"
              required
              class="form-input"
            />
          </div>
          <button class="btn-primary" type="submit">Add Kitchen</button>
        </form>
      </div>
    </div>
    <div v-else>
      <p class="no-permission">You do not have permission to view this profile.</p>
    </div>
  </client-only>
</template>

<script setup>
// State and Hooks
const { currentChef: chef } = useChef();
const { createKitchen } = useKitchenManager();

// Form State
const kitchenForm = ref({
  name: "",
  formatted_address: "",
  place_id: "", // Optional for future use
});

// Methods
const addKitchen = async () => {
  try {
    if (!kitchenForm.value.name || !kitchenForm.value.formatted_address) {
      throw new Error("Both name and address are required.");
    }

    console.log("[addKitchen] Adding kitchen:", kitchenForm.value);

    const newKitchen = await createKitchen(kitchenForm.value);
    console.log("[addKitchen] Kitchen added successfully:", newKitchen);

    // Optionally, update the chef's kitchens list dynamically
    if (chef.kitchens) {
      chef.kitchens.push(newKitchen);
    } else {
      chef.kitchens = [newKitchen];
    }

    // Clear the form after submission
    kitchenForm.value.name = "";
    kitchenForm.value.formatted_address = "";
    kitchenForm.value.place_id = ""; // Clear optional field
  } catch (error) {
    console.error("[addKitchen] Error adding kitchen:", error);
  }
};
</script>

<style scoped>
.chef-kitchens {
  padding: var(--spacing-m);
  max-width: 600px;
  margin: 0 auto;
  background-color: var(--background-1);
  border-radius: var(--radius-m);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-bottom: var(--spacing-m);
  font-size: var(--font-size-l);
  text-align: center;
  color: var(--text-primary);
}

.kitchen-list ul {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--spacing-l);
}

.kitchen-list li {
  margin-bottom: var(--spacing-s);
}

.kitchen-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: bold;
}

.kitchen-link:hover {
  color: var(--primary-hover);
  text-decoration: underline;
}

.no-kitchens {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-l);
}

.add-kitchen {
  padding: var(--spacing-m);
  background-color: var(--background-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-m);
}

.add-kitchen h4 {
  margin-bottom: var(--spacing-m);
  font-size: var(--font-size-m);
  color: var(--text-primary);
  text-align: center;
}

.kitchen-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

label {
  font-weight: bold;
  color: var(--text-secondary);
}

.form-input {
  padding: var(--spacing-s);
  border: 1px solid var(--border);
  border-radius: var(--radius-s);
  font-size: var(--font-size-m);
  background-color: var(--background-input);
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  align-self: center;
  background-color: var(--primary);
  color: white;
  padding: var(--spacing-s) var(--spacing-m);
  border: none;
  border-radius: var(--radius-m);
  cursor: pointer;
  font-size: var(--font-size-m);
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: var(--primary-hover);
}

.no-permission {
  text-align: center;
  color: var(--text-secondary);
  padding: var(--spacing-m);
}
</style>
