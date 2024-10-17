<template>
  <div class="card professional-card">
    <!-- Card Header with Avatar and Display Name -->
    <div class="card-header">
      <Avatar :src="avatar" />
      <h2 v-if="display_name">{{ display_name }}</h2>
      <p v-if="handle" class="handle">@{{ handle }}</p>
    </div>

    <!-- Card Body with additional information -->
    <div class="card-body">
      <p><strong>Mise Code:</strong> {{ mise_code }}</p>
      <p v-if="job_title"><strong>Job Title:</strong> {{ job_title }}</p>
      <p v-if="location"><strong>Location:</strong> {{ location }}</p>
    </div>
  </div>
</template>

<!-- 
  Object structure for "professionals":

  {
    "avatar": "https://link-to-avatar.jpg",
    "display_name": "John Doe",
    "handle": "john_doe",
    "mise_code": "PROF12345",
    "job_title": "Head Chef",
    "location": "New York"
  }
-->

<script setup>
import { useFirestore, useDocument } from 'vuefire';
import { doc } from 'firebase/firestore';
import Avatar from '@/components/Avatar.vue'; // Using the Avatar component with fallback logic

const props = defineProps({
  uid: { type: String, required: true }
});

const db = useFirestore();
const professionalDocRef = doc(db, 'professionals', props.uid);
const { data: professional } = useDocument(professionalDocRef);

// Destructuring the professional document to use in the template
const avatar = professional?.value?.avatar || '';
const display_name = professional?.value?.display_name || '';
const handle = professional?.value?.handle || '';
const mise_code = professional?.value?.mise_code || '';
const job_title = professional?.value?.job_title || '';
const location = professional?.value?.location || '';
</script>
