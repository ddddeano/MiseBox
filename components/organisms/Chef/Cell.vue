<!-- components/Organisms/Chef/Cell.vue -->
<template>
  <div class="cell chef-cell" v-if="chef && miseboxUser">
    <NuxtLink :to="`/chefs/${chef.id}`" class="cell-avatar">
      <MoleculesAvatar :user="miseboxUser" size="small" />
      <div class="cell-info">
        <div v-if="miseboxUser.display_name" class="display-name">{{ miseboxUser.display_name }}</div>
        <div class="specialty">{{ chef.specialty }}</div>
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
  chef: {
    type: Object,
    required: true, 
  },
});

const db = useFirestore();

const miseboxUserDocRef = computed(() =>
  doc(db, "misebox-users", props.chef.id)
);
const { data: miseboxUser } = useDocument(miseboxUserDocRef);

const { isInteractingWithSelf } = useInteraction();
const interactingWithSelf = isInteractingWithSelf(props.chef.id);
</script>

<style scoped>
/* Add specific styles for the chef cell */
</style>
