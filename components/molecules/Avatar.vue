<!-- components/molecules/Avatar.vue -->
<template>
  <div class="avatar" :class="`avatar--${size}`">
    <template v-if="url">
      <img :src="url" :alt="altText" class="avatar-image" />
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  url: {
    type: String,
    required: false, // Optional if fallback is used
  },
  size: {
    type: String,
    default: "mini",
    validator: (value) => ["mini", "small", "medium", "large"].includes(value),
  },
  altText: {
    type: String,
    default: "Avatar", // Alt text for accessibility
  },
});

</script>

<style scoped>
.avatar {
  border-radius: var(--radius-full);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 1px solid var(--border);
  background-color: var(--background);
}

.avatar--mini {
  width: var(--avatar-mini, 32px);
  height: var(--avatar-mini, 32px);
}

.avatar--small {
  width: var(--avatar-small, 40px);
  height: var(--avatar-small, 40px);
}

.avatar--medium {
  width: var(--avatar-medium, 48px);
  height: var(--avatar-medium, 48px);
}

.avatar--large {
  width: var(--avatar-large, 100px);
  height: var(--avatar-large, 100px);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
