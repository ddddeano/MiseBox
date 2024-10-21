<template>
  <client-only>
    <div v-if="professional && miseboxUser" class="display-profile-page">
      
      <!-- Header -->
      <MiseboxHeader :profile="miseboxUser" />

      <!-- Edit Profile Link -->
      <div v-if="isCurrentUserProfile" class="edit-button-container">
        <NuxtLink :to="`/professionals/${routeUserId}/edit`" class="edit-profile-btn">Edit Profile</NuxtLink>
      </div>

      <!-- Profile Details Section -->
      <div class="display-profile-details">
        <div v-if="professional.employment_experience">
          <h4>Employment Experience</h4>
          <div v-html="renderItem(professional.employment_experience, 'employment_experience')"></div>
        </div>

        <div v-if="professional.languages">
          <h4>Languages</h4>
          <div v-html="renderItem(professional.languages, 'languages')"></div>
        </div>

        <div v-if="professional.certifications">
          <h4>Certifications</h4>
          <div v-html="renderItem(professional.certifications, 'certifications')"></div>
        </div>

        <div v-if="professional.education">
          <h4>Education</h4>
          <div v-html="renderItem(professional.education, 'education')"></div>
        </div>

        <div v-if="professional.locations">
          <h4>Locations</h4>
          <div v-html="renderItem(professional.locations, 'locations')"></div>
        </div>
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

const professionalDocRef = computed(() => {
  if (currentUser.value) {
    return doc(db, 'professionals', routeUserId.value);
  }
  return null;
});

const { data: professional } = useDocument(professionalDocRef);

const miseboxUserDocRef = computed(() => {
  if (currentUser.value) {
    return doc(db, 'misebox-users', routeUserId.value);
  }
  return null;
});

const { data: miseboxUser } = useDocument(miseboxUserDocRef);

const renderItem = (items, target) => {
  if (!items || !items.length) return '<p>No information available</p>';
  return items.map(item => renderContent(item, target)).join('');
};
</script>
{
  "id": "professional_12345",
  "user_id": "user_12345",
  "employment_experience": [
    {
      "place_name": "Global Tech Inc.",
      "place_id": "company_001",
      "role": "Software Engineer",
      "from_year": 2015,
      "from_month": 9,
      "to_year": 2018,
      "to_month": 12,
      "formatted_address": "123 Tech Avenue, Silicon Valley, CA",
      "photo_url": "https://example.com/company_logo.png",
      "responsibilities": "Developed web applications."
    },
    {
      "place_name": "Innovate Labs",
      "place_id": "company_002",
      "role": "Senior Developer",
      "from_year": 2019,
      "from_month": 1,
      "to_year": null,
      "to_month": null,
      "formatted_address": "456 Innovation Drive, Tech City, NY",
      "photo_url": "https://example.com/innovate_logo.png",
      "responsibilities": "Leading a team of developers."
    }
  ],
  "certifications": [
    {
      "name": "Certified Scrum Master",
      "issuing_organization": "Scrum Alliance",
      "year": 2017,
      "credential_id": "CSM-123456",
      "credential_url": "https://scrumalliance.org/certifications"
    }
  ],
  "education": [
    {
      "institution": "Tech University",
      "degree": "Bachelor of Science in Computer Science",
      "from_year": 2010,
      "to_year": 2014,
      "field_of_study": "Computer Science",
      "activities": "Programming Club, Robotics Team"
    }
  ],
  "languages": [
    {
      "language": "English",
      "proficiency": "Native"
    },
    {
      "language": "Spanish",
      "proficiency": "Fluent"
    }
  ],
  "skills": ["JavaScript", "Vue.js", "Firebase", "Agile Methodologies"],
  "projects": [
    {
      "name": "Project X",
      "description": "A cutting-edge AI project.",
      "url": "https://example.com/project-x",
      "from_year": 2020,
      "to_year": 2021
    }
  ],
  "volunteering": [
    {
      "organization": "Tech for Good",
      "role": "Volunteer Developer",
      "from_year": 2018,
      "to_year": 2019,
      "description": "Developed software for non-profits."
    }
  ],
  "locations": ["Silicon Valley, CA", "Tech City, NY"],
  "interests": ["Artificial Intelligence", "Open Source", "Travel"]
}
