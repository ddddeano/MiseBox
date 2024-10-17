<template>
  <div class="display-value single-field">
    <span>{{ subscription }}</span>
    <PencilIcon v-if="showEditIcon" class="edit-icon" @click="onEdit" />
  </div>
</template>

<script setup>

const props = defineProps({
  subscription: {
    type: String,
    required: true,
  },
  showEditIcon: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['edit']);

const onEdit = () => {
  emit('edit');
};
</script>

<style scoped>
/* Scoped styles removed, as the relevant styles are now in profile-shared.scss */
</style>
