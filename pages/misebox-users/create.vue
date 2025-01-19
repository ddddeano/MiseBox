<!-- pages/misebox-users/create.vue -->
<template>
  <client-only>
    <div class="page">
      <!-- Misebox User-specific CTA -->
      <OrganismsMiseboxUserCTA />

      <!-- Render creation form only if no Misebox User exists -->
      <OrganismsMiseboxUserCreate v-if="!miseboxUser" />
    </div>
  </client-only>
</template>

<script setup>
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
</script>
