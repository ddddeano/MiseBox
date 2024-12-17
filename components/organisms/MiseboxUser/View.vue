<!-- components/organisms/MiseboxUser/View.vue -->
<!-- ~/components/Organisms/MiseboxUser/View.vue -->
<template>
  <client-only>
    <div class="profile-view">
      <!-- Display Name -->
      <section v-if="miseboxUser.full_name?.firstName && miseboxUser.full_name?.lastName">
        <h2 class="view-profile-title">Name</h2>
        <p>{{ miseboxUser.full_name.firstName }} {{ miseboxUser.full_name.lastName }}</p>
        <p v-if="miseboxUser.handle">@{{ miseboxUser.handle }}</p>
      </section>

      <!-- Contact Information -->
      <section>
        <h2 class="view-profile-title">Contact</h2>
        <p v-if="miseboxUser.email">Email: {{ maskEmail(miseboxUser.email) }}</p>
        <p v-if="miseboxUser.phone_number">Phone: {{ maskPhone(miseboxUser.phone_number) }}</p>
      </section>

      <!-- Address -->
      <section v-if="miseboxUser.address?.town && miseboxUser.address?.country">
        <h2 class="view-profile-title">Address</h2>
        <p v-if="isViewingOwn && miseboxUser.address.number">
          {{ miseboxUser.address.number }} {{ miseboxUser.address.street1 }}
        </p>
        <p v-if="miseboxUser.address.street2">{{ miseboxUser.address.street2 }}</p>
        <p>
          {{ miseboxUser.address.town }}, {{ miseboxUser.address.county }},
          {{ miseboxUser.address.country }}
        </p>
        <p v-if="miseboxUser.address.postalCode">Postal Code: {{ miseboxUser.address.postalCode }}</p>
      </section>

      <!-- Date of Birth -->
      <section v-if="isViewingOwn && miseboxUser.dob">
        <h2 class="view-profile-title">Date of Birth</h2>
        <p>{{ formatDateOfBirth(miseboxUser.dob) }}</p>
      </section>

      <!-- Bio -->
      <section v-if="miseboxUser.user_bio">
        <h2 class="view-profile-title">About Me</h2>
        <p>{{ miseboxUser.user_bio }}</p>
      </section>

      <!-- Misebox Code -->
      <section v-if="miseboxUser.mise_code">
        <h2 class="view-profile-title">Mise Code</h2>
        <p>{{ miseboxUser.mise_code }}</p>
      </section>
    </div>
  </client-only>
</template>

<script setup>
import { computed } from "vue";
import { useCurrentUser } from "vuefire";

// Props for the fetched user data
const props = defineProps({
  miseboxUser: {
    type: Object,
    required: true,
    default: () => ({}), // Default empty object
  },
});

const currentUser = useCurrentUser();

// Check if the current user is viewing their own profile
const isViewingOwn = computed(() => currentUser.value?.uid === props.miseboxUser.id);

// Helper function to format the date of birth
const formatDateOfBirth = (dob) => {
  if (!dob?.day || !dob?.month || !dob?.year) return "Not provided";
  return `${dob.day}/${dob.month}/${dob.year}`;
};

// Helper function to mask email
const maskEmail = (email) => {
  if (!email) return "Not provided";
  if (isViewingOwn.value) return email;
  const [user, domain] = email.split("@");
  const maskedUser = user.slice(0, Math.ceil(user.length / 2)) + "*".repeat(Math.floor(user.length / 2));
  return `${maskedUser}@${domain}`;
};

// Helper function to mask phone number
const maskPhone = (phone) => {
  if (!phone) return "Not provided";
  if (isViewingOwn.value) return phone;
  return phone.slice(0, -4).replace(/\d/g, "*") + phone.slice(-4);
};
</script>

<style scoped>
.profile-view {
  @apply view; /* Shared layout styles for views */
}

.view-profile-title {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-s);
  color: var(--text-primary);
}

p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.5;
}
</style>
