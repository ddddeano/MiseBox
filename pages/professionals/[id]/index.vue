<template>
  <client-only>
    <div v-if="professional && miseboxUser" class="display-profile-page">
      <!-- Header -->
      <OrganismsProfileHeader :user="miseboxUser" />

      <!-- Edit Profile Link -->
      <div v-if="isCurrentUserProfile" class="edit-button-container">
        <NuxtLink :to="`/professionals/${routeUserId}/edit`" class="edit-profile-btn">
          Edit Profile
        </NuxtLink>
      </div>

      <!-- Profile Details Section -->
      <div class="profile-details">
        <!-- Professional Bio -->
        <section v-if="professional.bio_short || professional.bio_long" class="profile-section bio-section">
          <h3>About Me</h3>
          <p v-if="professional.bio_short" class="bio-short">{{ professional.bio_short }}</p>
          <p v-if="professional.bio_long" class="bio-long">{{ professional.bio_long }}</p>
        </section>

        <!-- Employment Experience -->
        <section v-if="professional.kitchen_experience && professional.kitchen_experience.length" class="profile-section experience-section">
          <h3>Kitchen Experience</h3>
          <ul class="experience-list">
            <li v-for="(item, index) in professional.kitchen_experience" :key="index">
              <OrganismsProfessionalEditKitchenExperience :experience="item" mode="display" />
            </li>
          </ul>
        </section>

        <!-- Other Employment Experience -->
        <section v-if="professional.other_employment_experience && professional.other_employment_experience.length" class="profile-section experience-section">
          <h3>Other Employment Experience</h3>
          <ul class="experience-list">
            <li v-for="(item, index) in professional.other_employment_experience" :key="index">
              <OrganismsProfessionalEditOtherEmploymentExperience :experience="item" mode="display" />
            </li>
          </ul>
        </section>

        <!-- Certifications -->
        <section v-if="professional.certifications && professional.certifications.length" class="profile-section certifications-section">
          <h3>Certifications</h3>
          <ul class="certifications-list">
            <li v-for="(item, index) in professional.certifications" :key="index">
              <OrganismsProfessionalEditCertification :certification="item" mode="display" />
            </li>
          </ul>
        </section>

        <!-- Education -->
        <section v-if="professional.education && professional.education.length" class="profile-section education-section">
          <h3>Education</h3>
          <ul class="education-list">
            <li v-for="(item, index) in professional.education" :key="index">
              <OrganismsProfessionalEditEducation :education="item" mode="display" />
            </li>
          </ul>
        </section>

        <!-- Languages -->
        <section v-if="professional.languages && professional.languages.length" class="profile-section languages-section">
          <h3>Languages</h3>
          <ul class="languages-list">
            <li v-for="(item, index) in professional.languages" :key="index">
              <OrganismsProfessionalEditLanguage :language="item" mode="display" />
            </li>
          </ul>
        </section>

        <!-- Skills -->
        <section v-if="professional.skills && professional.skills.length" class="profile-section skills-section">
          <h3>Skills</h3>
          <ul class="skills-list">
            <li v-for="(skill, index) in professional.skills" :key="index">{{ skill }}</li>
          </ul>
        </section>

        <!-- Interests -->
        <section v-if="professional.interests && professional.interests.length" class="profile-section interests-section">
          <h3>Interests</h3>
          <ul class="interests-list">
            <li v-for="(interest, index) in professional.interests" :key="index">{{ interest }}</li>
          </ul>
        </section>

        <!-- Preferred Locations -->
        <section v-if="professional.locations && professional.locations.length" class="profile-section locations-section">
          <h3>Preferred Locations</h3>
          <ul class="locations-list">
            <li v-for="(location, index) in professional.locations" :key="index">{{ location }}</li>
          </ul>
        </section>

        <!-- Projects -->
        <section v-if="professional.projects && professional.projects.length" class="profile-section projects-section">
          <h3>Projects</h3>
          <ul class="projects-list">
            <li v-for="(item, index) in professional.projects" :key="index">
              <OrganismsProfessionalEditProject :project="item" mode="display" />
            </li>
          </ul>
        </section>

        <!-- Volunteering -->
        <section v-if="professional.volunteering && professional.volunteering.length" class="profile-section volunteering-section">
          <h3>Volunteering</h3>
          <ul class="volunteering-list">
            <li v-for="(item, index) in professional.volunteering" :key="index">
              <OrganismsProfessionalEditVolunteering :volunteering="item" mode="display" />
            </li>
          </ul>
        </section>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { useCurrentUser } from 'vuefire';
import { useRoute } from 'vue-router';

const route = useRoute();
const routeUserId = computed(() => route.params.id);
const currentUser = useCurrentUser();
const isCurrentUserProfile = computed(
  () => currentUser.value?.uid === routeUserId.value
);

const { miseboxUser } = useMiseboxUser(currentUser);
const { professional } = useProfessional(miseboxUser);

// Define any additional formatting or validation functions if necessary
// For display purposes, formatting might not be needed here
</script>

<style scoped>
.display-profile-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: 'Roboto', sans-serif;
  color: var(--text-primary);
}

.edit-button-container {
  text-align: right;
  margin: 1rem 0;
}

.edit-profile-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--accent-color);
  border-radius: 5px;
  background-color: transparent;
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s, color 0.3s;
}

.edit-profile-btn:hover {
  background-color: var(--accent-color);
  color: #fff;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-section {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.profile-section:last-child {
  border-bottom: none;
}

.profile-section h3 {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.profile-section ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.profile-section li {
  margin-bottom: 1rem;
}

.bio-short {
  font-size: 1rem;
  color: var(--text-secondary);
}

.bio-long {
  font-size: 1rem;
  color: var(--text-secondary);
}

.experience-list,
.certifications-list,
.education-list,
.languages-list,
.skills-list,
.interests-list,
.locations-list,
.projects-list,
.volunteering-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skills-list,
.interests-list,
.locations-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skills-list li,
.interests-list li,
.locations-list li {
  background-color: var(--card-background);
  padding: 0.5rem 1rem;
  border-radius: 15px;
  border: 1px solid var(--border-color);
  font-size: 0.9rem;
}

@media (min-width: 768px) {
  .display-profile-page {
    padding: 2rem;
  }

  .profile-section {
    padding: 1.5rem;
  }

  .profile-section h3 {
    font-size: 1.6rem;
  }

  .skills-list li,
  .interests-list li,
  .locations-list li {
    font-size: 1rem;
  }
}
</style>
