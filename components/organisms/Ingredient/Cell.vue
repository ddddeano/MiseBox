<!-- components/organisms/Ingredient/Cell.vue -->
<template>
  <div class="cell ingredient-cell" v-if="ingredient">
    <!-- Header Section -->
    <NuxtLink
      :to="isDisabled ? null : `/ingredients/${ingredient.id}`"
      class="cell-header"
      :class="{ disabled: isDisabled }"
    >
      <!-- Avatar Section -->
      <div v-if="ingredient.photo_url" class="cell-avatar">
        <MoleculesAvatar :url="ingredient.photo_url" size="small" altText="Ingredient Photo" />
      </div>

      <!-- Header Content -->
      <div class="header-content">
        <div v-if="ingredient.name" class="title">{{ ingredient.name }}</div>
        <div v-if="ingredient.category" class="subtitle">{{ ingredient.category }}</div>
      </div>

      <!-- Navigation Icon -->
      <div v-if="!isDisabled" class="icon">
        <ChevronRightIcon />
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  ingredient: {
    type: Object,
    default: () => ({}),
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});
</script>
