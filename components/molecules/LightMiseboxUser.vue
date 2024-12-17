<!-- components/molecules/LightMiseboxUser.vue -->
<template>
  <div v-if="miseboxUser" class="light-user-cell">
    <MoleculesAvatar :user="miseboxUser" size="small" />
    <div class="cell-info">
      <div class="display-name">{{ miseboxUser.display_name }}</div>
      <div class="handle">{{ miseboxUser.handle }}</div>
    </div>
  </div>
</template>

<script setup>
import { useDocument, useFirestore } from 'vuefire'
import { doc } from 'firebase/firestore'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const userDocRef = doc(useFirestore(), 'misebox-users', props.id)
const { data: miseboxUser } = useDocument(userDocRef)
</script>

<style scoped>
.light-user-cell {
  border: 1px solid var(--border-color-light);
  background-color: var(--background-color-light);
  white-space: nowrap;
  color: var(--text-color-dark);
}

.cell-info .handle {
  color: var(--text-color-muted);
}
</style>
