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
import { ref } from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<style lang="scss">
.menu-toggle {
  display: flex;
  justify-content: center;
  align-items: center;
}

.highest-z-index {
  z-index: 1002; /* Ensure this is higher than other elements */
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
}

</style>