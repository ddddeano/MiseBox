<!-- components/Organisms/Professional/Cell.vue -->
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
      v-if="!interactingWithSelf"
      :user="miseboxUser"
      class="follow-button"
    />
  </div>
</template>

<script setup>
import { useDocument } from "vuefire";
import { doc } from "firebase/firestore";
import { useFirestore } from "vuefire";

const props = defineProps({
  professional: {
    type: Object,
    required: true, 
  },
});

const db = useFirestore();

const miseboxUserDocRef = computed(() =>
  doc(db, "misebox-users", props.professional.id)
);
const { data: miseboxUser } = useDocument(miseboxUserDocRef);

const { isInteractingWithSelf } = useInteraction();
const interactingWithSelf = isInteractingWithSelf(props.professional.id);
</script>

<style scoped>
/* Add specific styles for the professional cell */
</style>
