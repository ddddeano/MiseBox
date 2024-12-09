<!-- components/Organisms/Professional/Card.vue -->
<template>
  <div class="card professional-card" v-if="miseboxUser && professional">
    <!-- Clickable Link to Professional Profile -->
    <NuxtLink :to="`/professionals/${professional.id}`" class="view-profile-link">
      <div class="card-header">
        <MoleculesAvatar :user="miseboxUser" size="small" />
        <div class="user-info">
          <p class="display-name">{{ miseboxUser.display_name }}</p>
          <p class="handle">{{ miseboxUser.handle }}</p>
          <p class="title">{{ professional.title }}</p>
        </div>
      </div>
    </NuxtLink>

    <!-- Expand Button -->
    <button class="expand-button" @click="toggleExpanded">
      {{ expanded ? 'Show Less' : 'Show More' }}
    </button>

    <!-- Expanded Content -->
    <div class="card-expanded" v-if="expanded">
      <p class="bio" v-if="professional.bio">{{ professional.bio }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useDocument, useCurrentUser } from "vuefire";
import { doc } from "firebase/firestore";
import { useFirestore } from "vuefire";

const db = useFirestore();
const currentUser = useCurrentUser();

// State for expanding the card
const expanded = ref(false);
const toggleExpanded = () => {
  expanded.value = !expanded.value;
};

// Fetch Firestore references
const miseboxUserDocRef = computed(() =>
  currentUser.value ? doc(db, "misebox-users", currentUser.value.uid) : null
);
const professionalDocRef = computed(() =>
  currentUser.value ? doc(db, "professionals", currentUser.value.uid) : null
);

// Fetch Firestore documents
const { data: miseboxUser } = useDocument(miseboxUserDocRef);
const { data: professional } = useDocument(professionalDocRef);
</script>
