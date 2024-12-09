<template>
  <div class="call-to-action">
    <OrganismsUserCTA />

    <div v-if="miseboxUser && !supplier" class="call-to-action-message">
      <h2>Streamline Your Supply Chain</h2>
      <p>
        Join Misebox to connect with kitchens, showcase your products, and streamline your operations.
      </p>
      <ul>
        <li>📦 Highlight your offerings to potential clients.</li>
        <li>🤝 Build strong partnerships with chefs and kitchen teams.</li>
        <li>📈 Leverage tools to optimize your workflows and boost efficiency.</li>
      </ul>
      <button class="cta-button" @click="createSupplier">Get Started as a Supplier</button>
    </div>

    <div v-if="supplier" class="call-to-action-existing">
      <p>Your Supplier profile is active. Start connecting with kitchens today!</p>
    </div>
  </div>
</template>

<script setup>
import OrganismsUserCTA from "@/components/Organisms/CTA/UserCTA.vue";

const { currentSupplier: supplier, createSupplier } = useSupplier();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
</script>
