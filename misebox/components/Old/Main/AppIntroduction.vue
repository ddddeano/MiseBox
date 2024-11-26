<template>
  <div class="introduction-container">
    <div class="text-content">
      <h1>{{ appData.welcome || 'Welcome' }}</h1>
      <p class="motto">{{ appData.motto || 'Our Motto' }}</p>
      <p class="small-print">{{ appData.smallPrint || '' }}</p>

      <template v-if="!appData.isAvailable">
        <p class="coming-soon">Coming soon.</p>
      </template>
    </div>
    <img :src="appData.icon || '/default-icon.png'" alt="App Icon" class="app-icon" />
  </div>
</template>

<script setup>
const props = defineProps({
  appData: {
    type: Object,
    default: () => ({
      welcome: '',
      motto: '',
      smallPrint: '',
      icon: '/default-icon.png',
      isAvailable: false
    })
  },
  closeIntroduction: {
    type: Function,
    required: true
  }
});
</script>

<style scoped lang="scss">
.introduction-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: var(--background-color);
  border: 1px solid var(--border-color-muted);
  border-radius: var(--corner-radius-medium);
  box-shadow: var(--box-shadow);
  margin: 10px;
  position: relative;
}

.close-button {
  position: absolute;
  top: var(--padding-small);
  right: var(--padding-small);
  background: none;
  border: none;
  font-size: var(--font-size-large);
  cursor: pointer;
  color: var(--text-color-muted);
  transition: color 0.2s;

  &:hover {
    color: var(--error-color);
  }
}

.text-content {
  text-align: center;
  margin-bottom: var(--margin-medium);
}

h1 {
  font-size: var(--font-size-large);
  margin-bottom: var(--margin-small);
  color: var(--text-color);
}

.motto {
  font-size: var(--font-size-medium);
  margin-bottom: var(--margin-small);
  color: var(--text-color-muted);
}

.small-print {
  font-size: var(--font-size-small);
  color: var(--text-color-muted);
}

.coming-soon {
  font-size: var(--font-size-medium);
  color: var(--error-color);
  margin-top: var(--margin-small);
}

.app-icon {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

@media (min-width: 768px) {
  .app-icon {
    width: 100px;
    height: 100px;
  }
}
</style>
