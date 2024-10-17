<template>
  <div class="creating">
    <ErrorMessage v-if="error.message" :error="error" />

    <div class="social-media-input-group">
      <div 
        v-for="(icon, platform) in socialMediaIcons" 
        :key="platform" 
        class="socials-input-wrapper"
      >
        <img :src="icon" :alt="`${platform} Icon`" class="icon" />
        <input
          v-model="socialMedia[platform]"
          :placeholder="`Enter your ${platform} URL`"
          class="editable-text"
        />
      </div>
    </div>

    <ArrowUpCircleIcon 
      v-if="hasValidInput" 
      @click.stop="clickUpdate" 
      class="update-icon icon" 
    />
  </div>
</template>

<script setup>
import { doc, updateDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import { ref, reactive, computed } from 'vue';
import miseboxIcon from '@/assets/icons/box.jpg'; // Update the path to match your file structure

const firestore = useFirestore();

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
  collectionName: {
    type: String,
    required: true,
  },
});

const socialMedia = reactive({
  Facebook: "",
  Instagram: "",
  LinkedIn: "",
  Misebox: "",
});

const error = ref({ message: '' });

const socialMediaIcons = {
  Facebook: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
  Instagram: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
  LinkedIn: 'https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg',
  Misebox: miseboxIcon,
};

const hasValidInput = computed(() => {
  return Object.values(socialMedia).some((link) => link.trim() !== "");
});

const clickUpdate = async () => {
  format();

  if (hasValidInput.value) {
    try {
      const socialMediaArray = transformSocialMediaToArray();
      const documentRef = doc(firestore, props.collectionName, props.userId);
      await updateDoc(documentRef, {
        social_media: socialMediaArray,
      });
      reset();
    } catch (err) {
      error.value.message = 'Failed to update social media links. Please try again.';
      console.error('Failed to update social media links:', err);
    }
  } else {
    error.value.message = 'Please fill out at least one social media link.';
    console.error('Validation failed. No social media links provided:', socialMedia);
  }
};

const format = () => {
  for (let key in socialMedia) {
    if (socialMedia[key]) {
      socialMedia[key] = socialMedia[key].trim();
    }
  }
};

const reset = () => {
  Object.keys(socialMedia).forEach(key => socialMedia[key] = "");
};

const transformSocialMediaToArray = () => {
  return Object.entries(socialMedia)
    .filter(([platform, url]) => url.trim() !== "")
    .map(([platform, url]) => ({ platform, url }));
};
</script>

<style scoped>
.social-media-input-group {
  display: flex;
  flex-direction: column;
  gap: var(--margin-small);
}

.socials-input-wrapper {
  display: flex;
  align-items: center;
  gap: var(--gap-small);
}

.icon {
  margin-right: 20px;
}

.update-icon {
  margin-top: var(--margin-medium);
}
</style>
