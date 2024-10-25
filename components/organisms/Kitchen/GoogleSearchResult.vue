<template>
  <div class="dropdown-item google-result" @click="selectKitchen">
    <img v-if="kitchen.photo_url" :src="kitchen.photo_url" alt="Place photo" class="place-avatar" />
    <div class="place-details">
      <p><strong>{{ kitchen.place_name }}</strong></p>
      <p>{{ kitchen.formatted_address }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  kitchen: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['select'])

const selectKitchen = () => {
  emits('select', props.kitchen)
}
</script>

<style scoped>
.google-result {
  background-color: var(--background-strong);
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
}

.google-result:hover {
  background-color: var(--hover);
}

.place-avatar {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
}

.place-details {
  flex-grow: 1;
}
</style>
