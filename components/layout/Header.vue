<template>
  <client-only>
    <header class="header">
      <AtomsLogo size="medium" />
      <MoleculesNavigationLinks class="larger" v-if="!isMobile" />
      <div v-if="currentUser" class="header-right">
        <NuxtLink :to="`/misebox-users/${currentUser.uid}`" class="view-profile-link">
        <MoleculesAvatar :user="miseboxUser" size="small" />
      </NuxtLink>

        <MoleculesBurgerMenuToggle v-if="isMobile" />
      </div>
    </header>
  </client-only>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

const currentUser = useCurrentUser()
const { miseboxUser } = useMiseboxUser(currentUser)

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)
</script>

<style lang="scss">
.header {
  height: var(--header-height);
  background-color: var(--background-strong);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-l); 
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow-s);
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-m);
}

.larger {
  display: flex;
  flex-direction: row;
}
</style>
