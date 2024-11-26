<template>
  <div class="dropdown-item firestore-result" @click="selectKitchen">
    <img v-if="kitchen.photo_url" :src="kitchen.photo_url" alt="Place photo" class="place-avatar" />
    <div class="place-details">
      <p><strong>{{ kitchen.place_name }}</strong></p>
      <p>{{ kitchen.formatted_address }}</p>
      
      <!-- Display team members if available -->
      <div v-if="kitchenDoc && kitchenDoc.team" class="team-members">
        <p><strong>Team Members:</strong></p>
        <div v-for="member in kitchenDoc.team" :key="member" class="team-member">
          <MoleculesLightMiseboxUser :id="member" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDocument, useFirestore } from 'vuefire';
import { doc } from 'firebase/firestore';

const props = defineProps({
  kitchen: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['select']);

const selectKitchen = () => {
  emits('select', props.kitchen);
};

// Get the kitchen document from Firestore by kitchen place_id
const kitchenDocRef = doc(useFirestore(), 'kitchens', props.kitchen.place_id);
const { data: kitchenDoc } = useDocument(kitchenDocRef);

</script>

<style scoped>
.firestore-result {
  background-color: var(--background);
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
}

.firestore-result:hover {
  background-color: var(--hover);
}

.place-avatar {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
}

.place-details {
  flex-grow: 1;
}

.team-members {
  margin-top: 10px;
}

.team-member {
  margin-bottom: 5px;
}
</style>
