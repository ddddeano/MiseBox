<!-- components/Organisms/Supplier/Card.vue -->
<template>
  <div class="card supplier-card" v-if="miseboxUser && supplier">
    <!-- Clickable Link to Supplier Profile -->
    <NuxtLink :to="`/suppliers/${supplier.id}`" class="view-profile-link">
      <div class="card-header">
        <MoleculesAvatar :user="miseboxUser" size="small" />
        <div class="user-info">
          <p class="display-name">{{ miseboxUser.display_name }}</p>
          <p class="handle">{{ miseboxUser.handle }}</p>
          <p class="industry">{{ supplier.industry }}</p>
        </div>
      </div>
    </NuxtLink>

    <!-- Expand Button -->
    <button class="expand-button" @click="toggleExpanded">
      {{ expanded ? 'Show Less' : 'Show More' }}
    </button>

    <!-- Expanded Content -->
    <div class="card-expanded" v-if="expanded">
      <p class="bio" v-if="supplier.description">{{ supplier.description }}</p>
      <div v-if="supplier.products" class="products-list">
        <h3>Products</h3>
        <ul>
          <li v-for="product in supplier.products" :key="product">{{ product }}</li>
        </ul>
      </div>
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
const supplierDocRef = computed(() =>
  currentUser.value ? doc(db, "suppliers", currentUser.value.uid) : null
);

// Fetch Firestore documents
const { data: miseboxUser } = useDocument(miseboxUserDocRef);
const { data: supplier } = useDocument(supplierDocRef);
</script>
