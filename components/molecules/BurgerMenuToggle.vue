<!-- components/molecules/BurgerMenuToggle.vue -->
<template>
  <div>
    <div
      class="menu-toggle"
      @click="toggleMenu"
      :aria-label="isOpen ? 'Close menu' : 'Open menu'"
    >
      <Bars3Icon v-if="!isOpen" class="icon" />
      <XMarkIcon v-else class="icon highest-z-index" />
    </div>
    <transition name="fade-transition">
      <MoleculesNavigationLinks
        v-if="isOpen"
        class="smaller"
        @click="toggleMenu"
      />
    </transition>
    <div v-if="isOpen" class="backdrop" @click="toggleMenu"></div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

// Lock and unlock scrolling
watch(isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style lang="scss">
.menu-toggle {
  display: flex;
  justify-content: center;
  align-items: center;
}

.highest-z-index {
  z-index: 9999 !important; /* Temporarily ensure it's on top */
  position: relative; /* Positioning to ensure z-index takes effect */
  display: inline-block; /* Ensures proper rendering */
}

.smaller {
  position: fixed;
  top: 60px;
  z-index: 1001;
  left: 0;
  background-color: var(--background-strong);
  width: 100%;
  box-shadow: 0 2px 4px var(--shadow);
  padding: 10px;

  /* Ensure each list item has padding */
  li {
    padding: 6px 0;
  }
}

.backdrop {
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
</style>
