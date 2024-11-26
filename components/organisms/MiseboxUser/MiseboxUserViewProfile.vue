<template>
  <client-only>
    <div v-if="fetchedMiseboxUser" class="view-profile-container">
      <!-- Display the user bio with line breaks -->
      <p v-if="fetchedMiseboxUser.user_bio" v-html="formattedBio"></p>

      <div v-if="fetchedMiseboxUser.address" class="address">
        <h2>Address</h2>
        <p>
          {{ fetchedMiseboxUser.address.number }} {{ fetchedMiseboxUser.address.street1 }}
          <span v-if="fetchedMiseboxUser.address.street2">, {{ fetchedMiseboxUser.address.street2 }}</span><br>
          {{ fetchedMiseboxUser.address.town }}, {{ fetchedMiseboxUser.address.county }}<br>
          {{ fetchedMiseboxUser.address.postalCode }}, {{ fetchedMiseboxUser.address.country }}
        </p>
      </div>

      <p v-if="fetchedMiseboxUser.email">Email: {{ displayEmail }}</p>
      <p v-if="fetchedMiseboxUser.phone_number">Phone: {{ displayPhoneNumber }}</p>

      <div v-if="formattedDOB">
        <h2>Date of Birth</h2>
        <p>{{ formattedDOB }}</p>
      </div>

      <ul v-if="fetchedMiseboxUser.tags?.length" class="tags">
        <li v-for="tag in fetchedMiseboxUser.tags" :key="tag">{{ tag }}</li>
      </ul>
    </div>
  </client-only>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  fetchedMiseboxUser: {
    type: Object,
    required: true,
  },
});

const { isViewingOwnRoute } = useInteraction();

// Format bio to include line breaks
const formattedBio = computed(() => {
  return props.fetchedMiseboxUser.user_bio
    ? props.fetchedMiseboxUser.user_bio.replace(/\n/g, '<br>')
    : '';
});

const displayEmail = computed(() => {
  if (isViewingOwnRoute.value) return props.fetchedMiseboxUser.email;
  const [localPart, domain] = props.fetchedMiseboxUser.email.split('@');
  return `${localPart[0]}*****@${domain}`;
});

const displayPhoneNumber = computed(() => {
  if (isViewingOwnRoute.value) return props.fetchedMiseboxUser.phone_number;
  const visibleDigits = props.fetchedMiseboxUser.phone_number.slice(-4);
  return `${'*'.repeat(props.fetchedMiseboxUser.phone_number.length - 4)}${visibleDigits}`;
});

const formattedDOB = computed(() => {
  const dob = props.fetchedMiseboxUser.dob || {};
  if (!dob.day || !dob.month || !dob.year) return '';
  return new Date(`${dob.year}-${dob.month}-${dob.day}`).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});
</script>

<style scoped>
.view-profile-container {
  padding: var(--spacing-m);
}
</style>
