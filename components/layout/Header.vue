<!-- components/layout/Header.vue -->
<template>
  <client-only>
    <header class="header">
      <!-- Logo -->
      <AtomsLogo size="medium" />

      <!-- Navigation Links for Larger Screens -->
      <MoleculesNavigationLinks v-if="!isMobile" class="larger" />

      <!-- Header Right Section -->
      <div class="header-right">
        <!-- Authentication Link (if not on the auth page and not logged in) -->
        <NuxtLink
          v-if="!isAuthPage && !miseboxUser"
          to="/auth"
          class="btn btn-pill btn-secondary small-btn"
        >
          <PlusIcon class="icon small-icon" />
          <span v-if="!isMobile" class="btn-text">Create</span>
        </NuxtLink>

        <!-- Profile Link (if logged in) -->
        <NuxtLink
          v-if="miseboxUser"
          :to="`/misebox-users/${miseboxUser.id}`"
          class="view-profile-link"
        >
          <MoleculesAvatar 
          collectionName="misebox-users"
            :id=miseboxUser.id
            :url="miseboxUser.avatar || 'assets/images/default-avatar.jpg'" 
            altText="User Avatar" 
            size="small" 
          />
        </NuxtLink>

        <!-- Burger Menu Toggle for Mobile Screens -->
        <MoleculesBurgerMenuToggle v-if="isMobile" />
      </div>
    </header>
  </client-only>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useWindowSize } from '@vueuse/core';
import { computed } from 'vue';

const route = useRoute();
const isAuthPage = computed(() => route.path === '/auth');

// Screen width to toggle mobile view
const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);

// Fetch `miseboxUser` and `createMiseboxUser` from the composable
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 var(--spacing-l);
  background-color: var(--background-strong);
  height: var(--header-height);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow-s);
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-m);
}

.small-btn {
  padding: var(--spacing-xxs) var(--spacing-s);
  font-size: var(--font-size-xs);
  border-radius: var(--radius-s);
  display: flex;
  align-items: center;
  gap: var(--spacing-xxs);
}

.small-icon {
  width: 16px;
  height: 16px;
}

.btn-text {
  font-size: var(--font-size-xs);
}

.view-profile-link {
  display: flex;
  align-items: center;
}

.navigation-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;

  &.larger {
    flex-direction: row;
    gap: var(--spacing-s);
  }

  li {
    padding: var(--spacing-xs) var(--spacing-m);
  }

  a {
    color: var(--text-primary);
    text-decoration: none;
    transition: color 0.3s ease, background-color 0.3s ease;
  }

  a:hover {
    color: var(--hover);
    background-color: var(--background);
  }
}

.divider {
  border-top: 1px solid var(--border);
}
</style>
