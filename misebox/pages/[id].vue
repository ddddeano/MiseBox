<template>
  <div class="profile-page">
    <!-- Profile Header Section -->
    <section class="profile-header">
      <div class="avatar-wrapper">
        <img :src="profileData?.avatar" alt="Profile Avatar" class="profile-avatar" />
        <div class="status-indicator" v-if="profileData?.status"></div>
      </div>
      <div class="profile-info">
        <h1>{{ profileData?.display_name }}</h1>
        <p>@{{ profileData?.handle }}</p>
      </div>
    </section>

    <!-- Profile Sections -->
    <section class="profile-sections">
      <!-- Contact and Address Section -->
      <MainCollapsibleSection title="Contact & Address" :expanded="true">
        <div class="profile-details">
          <p v-if="profileData?.email"><strong>Email:</strong> {{ profileData.email }}</p>
          <p v-if="profileData?.phone_number"><strong>Phone:</strong> {{ profileData.phone_number }}</p>
          <p v-if="profileData?.address">
            <strong>Address:</strong> {{ formatAddress(profileData.address) }}
          </p>
        </div>
      </MainCollapsibleSection>

      <!-- Professional Info Section -->
      <MainCollapsibleSection v-if="hasProfessionalData" title="Professional Info">
        <div class="professional-info">
          <p v-if="professionalData?.short_bio">{{ professionalData.short_bio }}</p>
          <p v-if="professionalData?.bio">{{ professionalData.bio }}</p>

          <!-- Languages -->
          <div v-if="professionalData?.languages?.length">
            <h3>Languages</h3>
            <ul>
              <li v-for="language in professionalData.languages" :key="language.name">
                {{ language.name }} (Spoken: {{ language.spoken }}, Written: {{ language.written }})
              </li>
            </ul>
          </div>

          <!-- Employment Experience -->
          <div v-if="professionalData?.employment_experience?.length">
            <h3>Employment Experience</h3>
            <ul>
              <li v-for="job in professionalData.employment_experience" :key="job.place_name">
                {{ job.role }} at {{ job.place_name }} ({{ job.from_month }} {{ job.from_year }} - {{ job.to_month }} {{ job.to_year }})
              </li>
            </ul>
          </div>
        </div>
      </MainCollapsibleSection>

      <!-- Chef Information Section -->
      <MainCollapsibleSection v-if="hasChefData" title="Chef Information">
        <div class="gallery">
          <div class="gallery-item" v-for="image in chefData?.gallery" :key="image.url">
            <img :src="image.url" class="gallery-image" alt="Chef's Dish" />
          </div>
        </div>
        <div v-if="chefData?.social?.length" class="social-media">
          <h3>Social Media</h3>
          <ul>
            <li v-for="social in chefData.social" :key="social.platform">
              {{ social.platform }}: <a :href="social.url" target="_blank">{{ social.url }}</a>
            </li>
          </ul>
        </div>
      </MainCollapsibleSection>
    </section>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useFirestore, useDocument } from 'vuefire';
import { doc } from 'firebase/firestore';

// Get the route parameters and Firestore instance
const route = useRoute();
const routeId = route.params.id;
const db = useFirestore(); // Firestore instance

// Fetch Misebox user data
const miseboxUser = useDocument(doc(db, 'misebox-users', routeId));
const miseboxUserProfile = useDocument(doc(db, 'misebox-user-profiles', routeId));

// Combine Misebox user data
const profileData = computed(() => ({
  ...miseboxUser.value,
  ...miseboxUserProfile.value,
}));

// Fetch Professional data
const professional = useDocument(doc(db, 'professionals', routeId));
const professionalProfile = useDocument(doc(db, 'professional-profiles', routeId));

// Combine Professional data
const professionalData = computed(() => ({
  ...professional.value,
  ...professionalProfile.value,
}));

// Fetch Chef data
const chef = useDocument(doc(db, 'chefs', routeId));
const chefProfile = useDocument(doc(db, 'chef-profiles', routeId));

// Combine Chef data
const chefData = computed(() => ({
  ...chef.value,
  ...chefProfile.value,
}));

// Utility function to format the address
const formatAddress = (address) => {
  if (!address) return '';
  return `${address.number} ${address.street1}, ${address.town}, ${address.county}, ${address.country}, ${address.postalCode}`;
};

// Conditions to check if data exists
const hasProfessionalData = computed(() => !!professional.value || !!professionalProfile.value);
const hasChefData = computed(() => !!chef.value || !!chefProfile.value);
</script>

<style scoped>
/* Profile Header Styling */
.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.avatar-wrapper {
  position: relative;
  margin-right: 20px;
}

.profile-avatar {
  border-radius: 50%;
  width: 120px;
  height: 120px;
  object-fit: cover;
}

.status-indicator {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: var(--success-color); /* Example status color */
  position: absolute;
  bottom: 0;
  right: 0;
}

.profile-info h1 {
  font-size: 28px;
  margin: 0;
  color: var(--primary-color);
}

.profile-info p {
  font-size: 18px;
  color: var(--text-color-muted);
}

/* Profile Sections */
.profile-sections {
  margin-top: 20px;
}

.profile-details p {
  font-size: 16px;
  color: var(--text-color);
}

.professional-info ul,
.social-media ul {
  list-style-type: none;
  padding: 0;
}

.professional-info ul li,
.social-media ul li {
  margin-bottom: 8px;
}

/* Gallery */
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.gallery-item {
  width: calc(33.333% - 10px);
}

.gallery-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.social-media a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: bold;
}

.social-media a:hover {
  color: var(--hover-color);
}
</style>
