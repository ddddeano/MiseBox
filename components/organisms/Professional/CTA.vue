<template>
  <div class="call-to-action">
    <!-- UserCTA for shared logic -->
    <OrganismsUserCTA />

    <!-- Professional-specific content -->
    <div v-if="miseboxUser && !professional" class="call-to-action-message">
      <h2>Advance Your Professional Path</h2>
      <p>
        Misebox helps you stand out in the job market with a digital portfolio that showcases your achievements and connects you to top opportunities.
      </p>
      <ul>
        <li>💼 Build a live portfolio that impresses recruiters and employers.</li>
        <li>🌟 Expand your network by connecting with top industry professionals.</li>
        <li>📈 Access tailored job opportunities that match your skills and goals.</li>
      </ul>
      <button class="cta-button" @click="createProfessional">Join as a Professional</button>
    </div>

    <!-- Professional already exists -->
    <div v-if="professional" class="call-to-action-existing">
      <p>Your Professional profile is live. Start exploring opportunities now!</p>
    </div>
  </div>
</template>

<script setup>
const { currentProfessional: professional, createProfessional } = useProfessional();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
</script>
