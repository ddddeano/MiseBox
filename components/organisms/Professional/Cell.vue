<template>
  <div class="cell professional-cell" v-if="professional && miseboxUser">
    <NuxtLink :to="`/professionals/${professional.id}`" class="cell-avatar">
      <MoleculesAvatar :user="miseboxUser" size="small" />
      <div class="cell-info">
        <div v-if="miseboxUser.display_name" class="display-name">{{ miseboxUser.display_name }}</div>
        <div class="title">{{ professional.title }}</div>
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
  professional: {
    type: Object,
    required: true,
  },
});

const db = useFirestore();

// Fetching the corresponding Misebox user document based on professional.id
const miseboxUserDocRef = doc(db, 'misebox-users', props.professional.id);
const { data: miseboxUser } = useDocument(miseboxUserDocRef);

// Use interaction composable to determine if viewing own profile
const { isViewingOwnRoute } = useInteraction();
</script>
