<!-- pages/kitchens/create-or-connect -->
<template>
  <client-only>
    <div class="create-or-connect-kitchen index">
      <div v-if="!currentUser || !miseboxUser || !chef" class="missing-acc-message">
        You need a Vuefire account, a Misebox account, and a Chef profile to proceed.
      </div>

      <section v-else class="kitchen-search-section">
        <h2>Search for a Kitchen</h2>

        <div v-if="selectedKitchen" class="selected-kitchen">
          <p><strong>Name:</strong> {{ selectedKitchen.place_name }}</p>
          <p><strong>Address:</strong> {{ selectedKitchen.formatted_address }}</p>
          <div v-if="selectedKitchen.photo_url" class="kitchen-photo">
            <img :src="selectedKitchen.photo_url" alt="Kitchen Photo" />
          </div>
          <button @click="confirmKitchen" class="btn btn-primary">
            Confirm Kitchen
          </button>
        </div>
      </section>
    </div>
  </client-only>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCurrentUser } from 'vuefire';

const currentUser = useCurrentUser();
const router = useRouter();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentChef: chef } = useChef();
const { createKitchen } = useKitchen();

const selectedKitchen = ref(null);

const handleSelectKitchen = (kitchen) => {
  selectedKitchen.value = kitchen;
};

const confirmKitchen = async () => {
  if (!selectedKitchen.value) return;

  try {
    const kitchenId = await createKitchen(selectedKitchen.value);
    if (kitchenId) {
      router.push(`/kitchens/${kitchenId}`); // Redirect to the new kitchen's page
    }
  } catch (error) {
    console.error('Error confirming kitchen:', error);
    alert('There was an error. Please try again.');
  }
};
</script>

