<template>
  <div class="card chef-card" v-if="chef && miseboxUser">
    <!-- Link to the full chef profile -->
    <NuxtLink :to="`/chefs/${chef.id}`" class="view-profile-link">
      <div class="card-header">
        <MoleculesAvatar :user="miseboxUser" size="small" />
        <div class="user-info">
          <p class="display-name">{{ miseboxUser.display_name }}</p>
          <p class="handle">{{ miseboxUser.handle }}</p>
          <p class="specialty">{{ chef.specialty }}</p>
        </div>
      </div>
    </NuxtLink>

    <!-- Expanded card with additional details -->
    <div class="card-expanded">
      <p class="bio" v-if="chef.bio">{{ chef.bio }}</p>
    </div>
  </div>
</template>

<script setup>
import { useDocument } from 'vuefire';
import { doc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

const props = defineProps({
  chef: {
    type: Object,
    required: true,
  },
});

const db = useFirestore();

// Fetching the corresponding Misebox user document based on chef.id
const miseboxUserDocRef = doc(db, 'misebox-users', props.chef.id);
const { data: miseboxUser } = useDocument(miseboxUserDocRef);
</script>
