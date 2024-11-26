<template>
  <div class="default-layout">
    <LayoutHeader class="layout-header" />
    <main class="main-content">
      <NuxtPage />
    </main>
    <LayoutFooter class="layout-footer" />
  </div>
</template>

<style scoped lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  align-items: center; /* Center children horizontally */
  background-color: var(--background-2);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px; /* Define a max-width for centering */
  margin: 0 auto; /* Center the main content */
  align-items: center; /* Center children horizontally */
}
</style>
