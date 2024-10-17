<template>
  <img
    :src="computedSrc"
    alt="Profile Image"
    class="avatar"
    :style="avatarStyle"
    @error="onImageError"
  />
</template>

<script setup>
import { ref, watch } from 'vue';
import defaultAvatar from '@/assets/icons/default-avatar.jpg';

const props = defineProps({
  src: {
    type: String,
    default: '', // Will be empty by default
  },
  size: {
    type: Number,
    default: 40, // Default size is 40px
  }
});

const computedSrc = ref(props.src || defaultAvatar);

// Watch for changes in props.src and update computedSrc
watch(() => props.src, (newSrc) => {
  computedSrc.value = newSrc || defaultAvatar;
});

// Fallback to default avatar when the image fails to load
const onImageError = () => {
  console.log('Image failed to load, using default avatar');
  computedSrc.value = defaultAvatar;
};

// Dynamic avatar size styling
const avatarStyle = {
  width: `${props.size}px`,
  height: `${props.size}px`,
};
</script>

<style scoped lang="scss">
.avatar {
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border-color);
  transition: width 0.3s ease, height 0.3s ease;
  box-sizing: border-box;
}
</style>
