<template>
  <div class="card professional-card" v-if="professional && miseboxUser">
    <!-- Link to the full profile -->
    <NuxtLink :to="`/professionals/${professional.id}`" class="view-profile-link">
      <div class="card-header">
        <MoleculesAvatar :user="miseboxUser" size="small" />
        <div class="user-info">
          <p class="display-name">{{ miseboxUser.display_name }}</p>
          <p class="handle">{{ miseboxUser.handle }}</p>
          <p class="title">{{ professional.title }}</p>
        </div>
      </div>
    </NuxtLink>

    <!-- Expanded card with additional details -->
    <div class="card-expanded">
      <p class="bio" v-if="professional.bio_short">{{ professional.bio_short }}</p>
    </div>
  </div>
</template>

<script setup>
import { useDocument } from 'vuefire';
import { doc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

const props = defineProps({
  professional: {
    type: Object,
    required: true,
  },
});

const db = useFirestore();

// Fetching the corresponding Misebox user document based on professional.id
const miseboxUserDocRef = doc(db, 'misebox-users', props.professional.id);
const { data: miseboxUser } = useDocument(miseboxUserDocRef);
</script>
