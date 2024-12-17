<!-- components/organisms/Kitchen/Edit.vue -->
<template>
  <client-only>
    <div class="profile-forms">
      <div v-if="isViewingOwn && kitchen">
        <h3>Edit Kitchen Details</h3>

        <!-- Avatar Selection -->
        <MoleculesFormsAvatarSelection
          collection-name="kitchens"
          :item="kitchen"
        />

        <!-- Delete Button -->
        <button class="delete-button" @click="handleDelete">
          Delete Kitchen
        </button>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { useFirestore, useDocument } from "vuefire";
import { doc, deleteDoc } from "firebase/firestore";

const route = useRoute();
const router = useRouter();
const db = useFirestore();

// Kitchen ID from route
const kitchenId = route.params.id;

// Fetch kitchen data
const kitchenDocRef = computed(() => doc(db, "kitchens", kitchenId));
const { data: kitchen } = useDocument(kitchenDocRef);

// Delete functionality
const handleDelete = async () => {
  const confirmed = confirm(
    "Are you sure you want to delete this kitchen? This action cannot be undone."
  );
  if (confirmed) {
    try {
      await deleteDoc(kitchenDocRef.value);
      alert("Kitchen deleted successfully.");
      router.push("/kitchens"); // Redirect to kitchens index after deletion
    } catch (error) {
      console.error("[handleDelete] Error deleting kitchen:", error);
      alert("Failed to delete the kitchen. Please try again.");
    }
  }
};

// Set to true for development purposes
const isViewingOwn = true;
</script>
