<template>
  <div class="collection-content">
    <div v-if="profiles.length" class="cards-wrapper">
      <div
        v-for="user in profiles"
        :key="user.uid"
        class="card-wrapper"
      >
        <!-- Use appData.collection to build the correct URL -->
        <NuxtLink :to="`/${appData.collection}/${user.uid}`">
          <slot name="card" :uid="user.uid"></slot>
        </NuxtLink>
      </div>
    </div>
    <p v-else>No profiles available.</p>
  </div>
</template>

<script setup>
const props = defineProps({
  appData: {
    type: Object,
    required: true,
    default: () => ({
      name: 'App',
      collection: ''
    })
  },
  profiles: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped lang="scss">
.collection-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.cards-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-small);
  width: 100%;
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--padding-small);
  width: 100%;
  max-width: 600px;
  text-decoration: none;
  color: inherit;
}
</style>
