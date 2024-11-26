<template>
  <div class="profile-component">
    <button v-if="isEditable" class="edit-button" @click="handleToggleEdit">
      <EyeIcon v-if="isEditing" class="button-icon" />
      <PencilSquareIcon v-else class="button-icon" />
    </button>

    <div class="profile-fields">
      <!-- Always show editable fields, allow switching between display and edit modes -->
      <div class="field-group editable-fields">
        <slot name="editable" :profile="profile" :isEditing="isEditing" :isEditable="isEditable"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

// Props passed from parent
const props = defineProps({
  isEditable: Boolean,
  isEditing: Boolean, // Add isEditing as a prop from the parent
  profile: Object,
});

// Emit to notify parent about state change
const emit = defineEmits(['update:isEditing']);

// Use a computed to sync isEditing between local and parent
const localIsEditing = computed({
  get: () => props.isEditing,
  set: (value) => {
    emit('update:isEditing', value);
  }
});

// Toggle editing state when button is clicked
const handleToggleEdit = () => {
  if (props.isEditable) {
    localIsEditing.value = !localIsEditing.value; // Update via computed setter
  }
};

// Debugging logs to track changes
watch(() => props.isEditable, (newVal) => {
  console.log('isEditable changed:', newVal);
});

watch(() => props.profile, (newVal) => {
  console.log('Profile data changed:', newVal);
}, { deep: true });

</script>

<style lang="scss" scoped>
.profile-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--padding-small);

  .profile-fields {
    width: 100%;
    .field-group {
      margin-bottom: 10px;
    }
  }

  .debug-section {
    margin-top: 20px;
    background-color: #d33b3b;
    padding: 10px;
    border: 1px solid #ddd;
    width: 90%;
  }
}

.edit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--padding-small);
  border-radius: var(--corner-radius-small);
  background-color: var(--button-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  margin: var(--margin-small);

  &:hover {
    background-color: var(--hover-color);
    color: var(--text-color-inverse);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--hover-color);
  }
}

.button-icon {
  width: 24px;
  height: 24px;
}
</style>
