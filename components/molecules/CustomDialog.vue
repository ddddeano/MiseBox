<template>
  <div v-if="visible" class="custom-dialog-overlay">
    <div class="custom-dialog-content">
      <p>{{ message }}</p>
      <div class="dialog-buttons">
        <button @click="confirm" class="btn-confirm">Yes</button>
        <button @click="cancel" class="btn-cancel">No</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    default: 'Are you sure?',
  },
});

const emit = defineEmits(['confirm', 'cancel']);

const confirm = () => {
  emit('confirm');
};

const cancel = () => {
  emit('cancel');
};
</script>

<style scoped>
.custom-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.custom-dialog-content {
  background-color: var(--background-strong);
  padding: var(--spacing-m);
  border-radius: var(--spacing-s);
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.dialog-buttons {
  display: flex;
  gap: var(--spacing-s);
  justify-content: center;
  margin-top: var(--spacing-m);
}

.btn-confirm {
  background-color: var(--primary);
  color: #fff;
  border: none;
  padding: var(--spacing-xs) var(--spacing-m);
  border-radius: var(--spacing-xs);
  cursor: pointer;
}

.btn-cancel {
  background-color: var(--secondary);
  color: #fff;
  border: none;
  padding: var(--spacing-xs) var(--spacing-m);
  border-radius: var(--spacing-xs);
  cursor: pointer;
}
</style>
