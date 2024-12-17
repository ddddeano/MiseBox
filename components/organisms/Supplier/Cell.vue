<!-- components/organisms/Supplier/Cell.vue -->
<template>
  <div class="cell supplier-cell" v-if="miseboxUser && supplier">
    <!-- Header Section -->
    <NuxtLink :to="`/suppliers/${supplier.id}`" class="cell-header">
      <div class="cell-avatar">
        <MoleculesAvatar 
          :url="miseboxUser.avatar || '/images/default-avatar.jpg'" 
          size="small" 
          altText="Supplier Avatar" 
        />
      </div>
      <div class="header-content">
        <div class="display-name" v-if="miseboxUser.display_name">
          {{ miseboxUser.display_name }}
        </div>
        <div class="handle" v-if="miseboxUser.handle">
          @{{ miseboxUser.handle }}
        </div>
        <div class="company" v-if="supplier.company">
          {{ supplier.company }}
        </div>
      </div>
      <div class="icon">
        <ChevronRightIcon />
      </div>
    </NuxtLink>

    <!-- Footer Section -->
    <div class="cell-footer">
      <div class="cell-interaction">
        <div v-if="miseboxUser?.id !== currentUser?.uid" class="not-self">
          <MoleculesFollowButton :user="miseboxUser" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCurrentUser } from "vuefire";

const props = defineProps({
  supplier: {
    type: Object,
    required: true,
  },
});

// Fetch Misebox User document
const { document: miseboxUser } = useFetchDoc("misebox-users", props.supplier.id);

// Get the current user
const currentUser = useCurrentUser();
</script>
