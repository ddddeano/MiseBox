<template>
  <client-only>
    <div class="index">
      <OrganismsMiseboxUserCTA />

      <!-- Show the current user's profile -->
        <OrganismsMiseboxUserCard v-if="miseboxUser" />

      <!-- Show the list of all Misebox users -->
      <OrganismsMiseboxUserList />
    </div>
  </client-only>
</template>

<script setup>
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
</script>
