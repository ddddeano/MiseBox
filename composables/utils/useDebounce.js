// composables/Utils/useDebounce.js
// composables/utils/useDebounce.js
// composables/useDebounce.js
import { ref } from 'vue';

export function useDebounce(fn, delay = 300) {
  const timeout = ref(null);

  const debouncedFunction = (...args) => {
    clearTimeout(timeout.value);
    timeout.value = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  return { debouncedFunction };
}
