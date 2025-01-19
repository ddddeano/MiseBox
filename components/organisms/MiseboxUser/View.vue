<!-- components/organisms/MiseboxUser/View.vue -->
<template>
  <client-only>
    <div class="view-profile">
      <!-- Name -->
      <section v-if="miseboxUser.display_name">
        <h2 class="view-profile-title">Name</h2>
        <p>{{ miseboxUser.display_name }}</p>
        <p v-if="miseboxUser.handle">@{{ miseboxUser.handle }}</p>
      </section>

      <!-- Contact Information (Authenticated Users Only) -->
      <section v-if="isViewingOwn">
        <h2 class="view-profile-title">Contact</h2>
        <p v-if="miseboxUser.email">Email: {{ miseboxUser.email }}</p>
        <p v-if="miseboxUser.phone_number">Phone: {{ miseboxUser.phone_number }}</p>
      </section>

      <!-- Address (Authenticated Users Only) -->
      <section v-if="isViewingOwn && miseboxUser.address">
        <h2 class="view-profile-title">Address</h2>
        <p v-if="miseboxUser.address.number">
          {{ miseboxUser.address.number }} {{ miseboxUser.address.street1 }}
        </p>
        <p v-if="miseboxUser.address.street2">{{ miseboxUser.address.street2 }}</p>
        <p>
          {{ miseboxUser.address.town }}, {{ miseboxUser.address.county }},
          {{ miseboxUser.address.country }}
        </p>
        <p v-if="miseboxUser.address.postalCode">Postal Code: {{ miseboxUser.address.postalCode }}</p>
      </section>

      <!-- Bio (Publicly Accessible) -->
      <section v-if="miseboxUser.user_bio">
        <h2 class="view-profile-title">About Me</h2>
        <p>{{ miseboxUser.user_bio }}</p>
      </section>

      <!-- Applications (Publicly Accessible) -->
      <section v-if="miseboxUser.apps?.length">
        <h2 class="view-profile-title">Applications</h2>
        <ul>
          <li v-for="app in miseboxUser.apps" :key="app">{{ app }}</li>
        </ul>
      </section>
    </div>
  </client-only>
</template>

<script setup>
import { computed } from "vue";
import { useCurrentUser } from "vuefire";

const props = defineProps({
  miseboxUser: {
    type: Object,
    required: true,
  },
});

const currentUser = useCurrentUser();

const isViewingOwn = computed(() => currentUser.value?.uid === props.miseboxUser.id);
</script>

<style scoped>
.view-profile {
  padding: var(--spacing-m);
  width: 100%;
  max-width: 800px;
  margin: 0 auto; /* Centers the container horizontally */
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers the container */
}

section {
  background-color: var(--background-2);
  margin-bottom: var(--spacing-l);
  padding: var(--spacing-m);
  border-radius: var(--radius-s);
  box-shadow: var(--shadow-sm);
  width: 100%; /* Ensures section takes full width */
  max-width: 800px; /* Restricts section width */
}

.view-profile-title {
  font-size: var(--font-size-l);
  font-weight: bold;
  margin-bottom: var(--spacing-s);
  color: var(--text-primary);
  text-align: left; /* Aligns titles to the left */
}

p {
  font-size: var(--font-size-m);
  margin-bottom: var(--spacing-xs);
  text-align: left; /* Aligns text to the left */
  line-height: var(--line-height-m); /* Adds better readability */
}

ul {
  list-style-type: disc;
  margin-left: var(--spacing-m);
}

li {
  font-size: var(--font-size-m);
  line-height: var(--line-height-m);
}
</style>
