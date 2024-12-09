<!-- components/Organisms/Supplier/Cell.vue -->
<template>
  <div class="cell supplier-cell" v-if="supplier && miseboxUser">
    <NuxtLink :to="`/suppliers/${supplier.id}`" class="cell-avatar">
      <MoleculesAvatar :user="miseboxUser" size="small" />
      <div class="cell-info">
        <div v-if="miseboxUser.display_name" class="display-name">{{ miseboxUser.display_name }}</div>
        <div class="claimed-status">Claimed: {{ supplier.claimed ? 'Yes' : 'No' }}</div>
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
  supplier: {
    type: Object,
    required: true, 
  },
});

const db = useFirestore();

const miseboxUserDocRef = computed(() =>
  doc(db, "misebox-users", props.supplier.id)
);
const { data: miseboxUser } = useDocument(miseboxUserDocRef);

const { isInteractingWithSelf } = useInteraction();
const interactingWithSelf = isInteractingWithSelf(props.supplier.id);
</script>

<style scoped>
.claimed-status {
  font-size: var(--font-size-s);
  color: var(--text-secondary);
}
</style>
