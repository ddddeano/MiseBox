<!-- components/organisms/Supplier/Card.vue -->
<template>
  <div class="card supplier-card" v-if="miseboxUser && supplier">
    <NuxtLink :to="`/suppliers/${supplier.id}`" class="card-header">
      <div class="card-avatar">
        <MoleculesAvatar :url="miseboxUser.avatar" size="medium" altText="Supplier Avatar" />
      </div>
      <div class="header-content">
        <span class="display-name" v-if="miseboxUser.display_name">
          {{ miseboxUser.display_name }}
        </span>
        <div class="handle" v-if="miseboxUser.handle">@{{ miseboxUser.handle }}</div>
        <div v-if="supplier.companyName" class="highlight">{{ supplier.companyName }}</div>
      </div>
      <div class="icon">
        <ChevronRightIcon />
      </div>
    </NuxtLink>
    <div class="main-content">
      <p v-if="supplier.description" class="description">{{ supplier.description }}</p>
    </div>
    <div class="card-footer">
      <div class="card-interaction">
        <div v-if="miseboxUser?.id !== currentUser?.uid" class="not-self">
          <MoleculesFollowButton :user="miseboxUser" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCurrentUser } from "vuefire";

const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentSupplier: supplier } = useSupplier();
const currentUser = useCurrentUser();
</script>
