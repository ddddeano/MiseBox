<!-- pages/dev.vue -->
<template>
  <client-only>
    <div class="development-area">
      <h1>Icon Testing Area</h1>

      <!-- Render all icons to test the current setup -->
      <div class="icons-grid">
        <ArrowUpCircleIcon class="icon" />
        <ArrowUpOnSquareIcon class="icon" />
        <AtSymbolIcon class="icon" />
        <Bars3Icon class="icon" />
        <CalendarIcon class="icon" />
        <CameraIcon class="icon" />
        <CheckCircleIcon class="icon" />
        <ChevronDownIcon class="icon" />
        <ChevronRightIcon class="icon" />
        <ChevronUpIcon class="icon" />
        <DevicePhoneMobileIcon class="icon" />
        <DocumentTextIcon class="icon" />
        <EnvelopeIcon class="icon" />
        <EyeIcon class="icon" />
        <HeartIcon class="icon" />
        <IdentificationIcon class="icon" />
        <MinusCircleIcon class="icon" />
        <MoonIcon class="icon" />
        <PaperClipIcon class="icon" />
        <PencilIcon class="icon" />
        <PencilSquareIcon class="icon" />
        <PlusCircleIcon class="icon" />
        <QrCodeIcon class="icon" />
        <RocketLaunchIcon class="icon" />
        <SunIcon class="icon" />
        <SparklesIcon class="icon" />
        <UserCircleIcon class="icon" />
        <XCircleIcon class="icon" />
        <XMarkIcon class="icon" />
        <CakeIcon class="icon" />
        <ArrowRightEndOnRectangleIcon class="icon" />
        <BriefcaseIcon class="icon" />
        <DocumentPlusIcon class="icon" />
        <DocumentMagnifyingGlassIcon class="icon" />
        <PlusIcon class="icon" />
      </div>
    </div>
  </client-only>
</template>

<script setup>
// No additional imports needed since we are testing the plugin registration.
</script>

<style scoped>
.development-area {
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

.icons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  gap: 20px;
}

.icon {
  width: 40px;
  height: 40px;
  color: var(--text-primary);
  margin: auto;
}
</style>
