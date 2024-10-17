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
}

.layout-header, .layout-footer {
  width: 100%;
}

.main-content {
  flex: 1; 
  display: flex;
  justify-content: center; 
  background-color: var(--background-2); /* Background color from your design system */
  padding-top: 10px;
}
</style>
