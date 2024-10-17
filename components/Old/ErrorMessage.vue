<template>
  <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
    <div v-if="error.message" class="error-message">
      <XCircleIcon class="icon" />
      {{ error.message }}
    </div>
  </transition>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  error: {
    type: Object,
    default: () => ({ message: '' }), // Default to an object with an empty message
  },
});

onMounted(() => {
  if (props.error && props.error.message) {
    console.log("Reporting Error:", props.error);
    // You can add further reporting logic here, such as sending the error to an external service.
  }
});

// Transition hooks
function beforeEnter(el) {
  el.style.opacity = 0;
  el.style.transform = 'translateY(-10px)';
}

function enter(el, done) {
  el.offsetHeight; // trigger reflow
  el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  el.style.opacity = 1;
  el.style.transform = 'translateY(0)';
  done();
}

function leave(el, done) {
  el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  el.style.opacity = 0;
  el.style.transform = 'translateY(-10px)';
  done();
}
</script>

<style scoped>
.error-message {
  display: flex;
  align-items: center;
  color: var(--error-color); /* Use a variable or specific color */
  font-size: var(--font-size-small);
  margin-top: var(--margin-small);
}

.icon {
  margin-right: var(--padding-small);
  font-size: var(--font-size-small);
}
  
/* Transition Styles */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
