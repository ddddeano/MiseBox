<template>
  <div class="dropdown-item kitcchen-result" @click="selectKitchen">
    <img v-if="kitchen.photo_url" :src="kitchen.photo_url" alt="Place photo" class="place-avatar" />
    <div class="place-details">
      <p><strong>{{ kitchen.place_name }}</strong></p>
      <p>{{ kitchen.formatted_address }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  kitchen: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const emits = defineEmits(['select']);

const selectKitchen = () => {
  emits('select', props.kitchen);
};
</script>
