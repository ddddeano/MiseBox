<!-- pages/misebox-users/index.vue -->
<!-- pages/misebix-users/index.vue -->
<template>
  <client-only>
    <div class="index">
      <OrganismsMiseboxUserCTA />
      <OrganismsMiseboxUserCard v-if="miseboxUser" />
      <OrganismsMiseboxUserList />
    </div>
  </client-only>
</template>

<script setup>
const { currentMiseboxUser: miseboxUser } = useMiseboxUser()
</script>
