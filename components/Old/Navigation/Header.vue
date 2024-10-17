<template>
  <client-only>
    <header class="header" :class="{ mobile: isMobile }">

      <div class="header-content">       
     
      </div>
      <transition name="menu-fade">
        <div v-if="menuOpen && isMobile" class="overlay" @click.self="closeMenu">
          <NavigationLinks class="mobile-nav-overlay" @closeMenu="menuOpen = false" />
        </div>
      </transition>
    </header>
  </client-only>
</template>

<script setup>

// Mobile menu state
const menuOpen = ref(false);

// Use the theme from the global state
const { currentTheme, toggleTheme } = useTheme(); // Access global theme state and toggle function

// Close the menu when clicking outside of the mobile menu
const closeMenu = () => {
  menuOpen.value = false;
};


</script>

<style scoped lang="scss">
// .header {
//   height: 60px;
//   padding: 10px;
//   display: flex;
//   background-color: var(--background-color);
//   border-bottom: 1px solid var(--border-color);
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   justify-content: space-between;
// }

// .logo-container {
//   align-items: center;
//   justify-content: center;
//   margin-right: 10px;
// }

// @media (min-width: 768px) {
//   .logo-container {
//     margin-right: 20px;
//   }
// }

// .avatar,
// .theme-toggle {
//   margin-right: 10px;
// }

// .logo {
//   max-width: 150px;
//   height: auto;
// }

// .header-content {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   flex-wrap: nowrap;
// }

// .theme-toggle {
//   padding: 10px;
//   border-radius: 50%;
//   width: 40px;
//   height: 40px;
//   background-color: var(--background-color-light);
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   transition: background-color 0.3s, transform 0.3s;
// }

// .theme-toggle:active,
// [data-theme="dark"] .theme-toggle {
//   background-color: var(--background-color-dark);
//   box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
//   transform: translateY(2px);
// }

// .theme-icon {
//   width: 24px;
//   height: 24px;
//   color: var(--text-color);
//   display: block;
//   margin: auto;
//   transition: transform 0.3s;
// }

// .burger-menu {
//   display: flex;
//   align-items: center;
//   cursor: pointer;
// }

// .burger-icon {
//   width: 30px;
//   height: 30px;
//   color: var(--text-color);
// }

// .overlay {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 999;
//   backdrop-filter: blur(10px); /* Blur background */
//   background-color: rgba(0, 0, 0, 0.3); /* Slightly darken the background */
// }

// .mobile-nav-overlay {
//   position: fixed;
//   top: 60px;
//   left: 0;
//   width: 100%;
//   z-index: 1000;
//   background-color: var(--background-color);
//   padding: 10px;
// }

// .menu-fade-enter-active,
// .menu-fade-leave-active {
//   transition: opacity 0.3s ease-in-out;
// }

// .menu-fade-enter-from,
// .menu-fade-leave-to {
//   opacity: 0;
// }

// .menu-fade-enter-to,
// .menu-fade-leave-from {
//   opacity: 1;
// }
</style>
