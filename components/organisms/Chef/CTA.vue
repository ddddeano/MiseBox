<!-- components/organisms/Chef/CTA.vue -->
<template>
  <div class="call-to-action">
    <!-- UserCTA for shared logic -->
    <OrganismsUserCTA />

    <!-- Chef-specific content -->
    <div v-if="miseboxUser && !chef" class="call-to-action-message">
      <h2>Step Into Your Chef Journey</h2>
      <p>
        Misebox empowers chefs to manage their kitchens, organize workflows, and showcase their culinary talent. Take the next step in your career with ease.
      </p>
      <ul>
        <li>👨‍🍳 Build a chef profile that highlights your expertise and skills.</li>
        <li>🍴 Manage recipes, kitchen tasks, and team coordination seamlessly.</li>
        <li>📊 Gain insights and tools to optimize your daily operations.</li>
      </ul>
      <button class="btn" @click="createChef">Join as a Chef</button>
    </div>

    <!-- Chef already exists -->
    <div v-if="chef" class="call-to-action-existing">
      <p>Your Chef profile is ready to use. Start managing your kitchens and recipes today!</p>
    </div>
  </div>
</template>

<script setup>
const { currentChef: chef, createChef } = useChef();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
</script>
