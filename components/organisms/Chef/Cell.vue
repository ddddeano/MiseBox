<template>
  <div class="cell chef-cell" v-if="chef && miseboxUser">
    <NuxtLink :to="`/chefs/${chef.id}`" class="cell-avatar">
      <MoleculesAvatar :user="miseboxUser" size="small" />
      <div class="cell-info">
        <div v-if="miseboxUser.display_name" class="display-name">{{ miseboxUser.display_name }}</div>
        <div class="title">{{ chef.specialty }}</div>
      </div>
    </NuxtLink>
    <MoleculesFollowButton
      v-if="!isViewingOwnRoute && miseboxUser"
      :user="miseboxUser"
      class="follow-button"
    />
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

// Use interaction composable to determine if viewing own profile
const { isViewingOwnRoute } = useInteraction();
</script>
