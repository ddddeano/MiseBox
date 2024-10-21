<template>
  <client-only>
    <div v-if="miseboxUser" class="profile">
      <!-- Use the OrganismsProfileHeader component -->
      <OrganismsProfileHeader :user="miseboxUser" />

      <!-- Divider -->
      <hr class="profile-divider" />

      <!-- Edit Profile or Message Button -->
      <div class="button-container">
        <div v-if="isCurrentUserProfile">
          <NuxtLink :to="`/misebox-users/${routeUserId}/edit`" class="edit-profile-btn">
            <PencilIcon class="icon button-icon" /> Edit Profile
          </NuxtLink>
        </div>
        <div v-else>
          <button class="message-btn">
            <ChatBubbleLeftIcon class="icon button-icon" /> Message
          </button>
        </div>
      </div>

      <!-- Profile Details -->
      <div class="profile-details">
        <!-- Contact Information -->
        <section v-if="email || phone_number">
          <h2>Contact Information</h2>
          <div class="details-grid">
            <div v-if="email" class="detail-item">
              <EnvelopeIcon class="icon" />
              <span>{{ maskedEmail }}</span>
            </div>
            <div v-if="phone_number" class="detail-item">
              <DevicePhoneMobileIcon class="icon" />
              <span>{{ maskedPhoneNumber }}</span>
            </div>
          </div>
        </section>

        <!-- Personal Information -->
        <section v-if="formattedDOB || user_bio || tags.length">
          <h2>Personal Information</h2>
          <div class="details-grid">
            <div v-if="formattedDOB" class="detail-item">
              <CakeIcon class="icon" />
              <span>{{ formattedDOB }}</span>
            </div>
            <div v-if="user_bio" class="detail-item full-width">
              <p class="user-bio">{{ user_bio }}</p>
            </div>
            <div v-if="tags.length" class="detail-item full-width">
              <ul class="tags-list">
                <li v-for="tag in tags" :key="tag">{{ tag }}</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- User Apps -->
        <section v-if="user_apps.length">
          <h2>User Apps</h2>
          <div class="apps-grid">
            <div v-for="app in user_apps" :key="app" class="app-item">
              <IdentificationIcon class="icon app-icon" />
              <div class="app-name">{{ formatAppName(app) }}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </client-only>
</template>
<script setup>
import { useCurrentUser, useDocument, useFirestore } from 'vuefire';
import { doc } from 'firebase/firestore';
import { useRoute } from 'vue-router';


const currentUser = useCurrentUser();
const db = useFirestore();
const route = useRoute();

const routeUserId = computed(() => route.params.id);
const isCurrentUserProfile = computed(() => currentUser.value?.uid === routeUserId.value);

const miseboxUserDocRef = computed(() => {
  if (routeUserId.value) {
    return doc(db, 'misebox-users', routeUserId.value);
  }
  return null;
});

const { data: miseboxUser } = useDocument(miseboxUserDocRef);

const email = computed(() => miseboxUser.value?.email || '');
const phone_number = computed(() => miseboxUser.value?.phone_number || '');
const dob = computed(() => miseboxUser.value?.dob || {});
const user_bio = computed(() => miseboxUser.value?.user_bio || '');
const user_apps = computed(() => miseboxUser.value?.user_apps || []);
const tags = computed(() => miseboxUser.value?.tags || []);

const maskedEmail = computed(() => {
  if (!email.value) return '';
  const [localPart, domain] = email.value.split('@');
  const maskedLocal = localPart[0] + '*****';
  return `${maskedLocal}@${domain}`;
});

const maskedPhoneNumber = computed(() => {
  if (!phone_number.value) return '';
  const visibleDigits = phone_number.value.slice(-4);
  const masked = `${'*'.repeat(phone_number.value.length - 4)}${visibleDigits}`;
  return masked;
});

const formattedDOB = computed(() => {
  if (!dob.value.day || !dob.value.month || !dob.value.year) return '';
  const date = new Date(`${dob.value.year}-${dob.value.month}-${dob.value.day}`);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

const formatAppName = (app) => {
  return app
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
</script>
<style scoped>
/* Mobile-first styles */

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  max-width: 600px;
  padding: var(--spacing-m);
  color: var(--text-secondary);
}

/* Divider */
.profile-divider {
  width: 100%;
  margin: var(--spacing-m) 0;
  border: none;
  border-top: 1px solid var(--border);
}

/* Edit Profile and Message Button */
.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-m);
}

.edit-profile-btn,
.message-btn {
  display: flex;
  align-items: center;
  background-color: var(--primary);
  color: #fff;
  padding: var(--spacing-s) var(--spacing-m);
  border-radius: var(--radius-s);
  text-decoration: none;
  font-size: var(--font-size-m);
  border: none;
  cursor: pointer;
}

.button-icon {
  width: 20px;
  height: 20px;
  margin-right: var(--spacing-xs);
}

.profile-details {
  margin-top: var(--spacing-l);
}

section {
  margin-bottom: var(--spacing-l);
}

section h2 {
  margin-bottom: var(--spacing-s);
  border-bottom: 1px solid var(--border);
  padding-bottom: var(--spacing-xs);
  font-size: var(--font-size-l);
  color: var(--text-primary);
}

.details-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
}

.detail-item {
  display: flex;
  align-items: center;
}

.detail-item.full-width {
  width: 100%;
}

.detail-item .icon {
  width: 24px;
  height: 24px;
  margin-right: var(--spacing-s);
  color: var(--text-secondary);
}

.user-bio {
  margin: 0;
  color: var(--text-primary);
  font-style: italic;
  font-weight: 300; /* Thinner font weight */
}

.apps-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
}

.app-item {
  display: flex;
  align-items: center;
  background-color: var(--background-2);
  padding: var(--spacing-s);
  border-radius: var(--radius-s);
}

.app-icon {
  width: 32px;
  height: 32px;
  margin-right: var(--spacing-s);
  color: var(--primary);
}

.app-name {
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

/* Media queries for larger screens */
@media (min-width: 768px) {
  .details-grid {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .apps-grid {
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
