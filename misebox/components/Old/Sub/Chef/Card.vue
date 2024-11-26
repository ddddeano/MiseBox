<template>
  <div class="card chef-card">
    <div class="card-header">
      <Avatar :src="avatar" />
      <h2 v-if="display_name">{{ display_name }}</h2>
      <p v-if="handle" class="handle">@{{ handle }}</p>
    </div>
    <div class="card-body">
      <p><strong>Mise Code:</strong> {{ mise_code }}</p>
      <p v-if="specialty"><strong>Specialty:</strong> {{ specialty }}</p>
      <p v-if="restaurant"><strong>Restaurant:</strong> {{ restaurant }}</p>
    </div>
  </div>
</template>

<!-- 
  Object structure for "chefs":

  {
    "avatar": "https://link-to-avatar.jpg",
    "display_name": "Chef John",
    "handle": "chef_john",
    "mise_code": "CHEF12345",
    "specialty": "French Cuisine",
    "restaurant": "Le Gourmet"
  }
-->

<script setup>
import { useFirestore, useDocument } from 'vuefire';
import { doc } from 'firebase/firestore';

const props = defineProps({
  uid: { type: String, required: true }
});

const db = useFirestore();
const chefDocRef = doc(db, 'chefs', props.uid);
const { data: chef } = useDocument(chefDocRef);

// Destructuring the chef document
const avatar = chef?.value?.avatar || '';
const display_name = chef?.value?.display_name || '';
const handle = chef?.value?.handle || '';
const mise_code = chef?.value?.mise_code || '';
const specialty = chef?.value?.specialty || '';
const restaurant = chef?.value?.restaurant || '';
</script>
