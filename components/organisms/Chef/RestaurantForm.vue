<template>
  <div class="restaurant-form">
    <label>Restaurant Name</label>
    <input v-model="formData.name" type="text" placeholder="Enter restaurant name" />

    <label>Cuisine</label>
    <input v-model="formData.cuisine" type="text" placeholder="Enter cuisine" />

    <label>Address</label>
    <input v-model="formData.address" type="text" placeholder="Enter address" />

    <div class="form-actions">
      <button @click="saveRestaurant">Save</button>
      <button @click="$emit('cancel')">Cancel</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  restaurant: Object,
  mode: {
    type: String,
    default: 'create', // Mode can be 'create' or 'edit'
  },
});

const formData = ref({
  name: '',
  cuisine: '',
  address: '',
});

// If editing, load existing data into form
if (props.mode === 'edit' && props.restaurant) {
  formData.value = { ...props.restaurant };
}

// Emit save event to parent
const saveRestaurant = () => {
  if (!formData.value.name || !formData.value.cuisine || !formData.value.address) {
    alert('Please fill in all required fields.');
    return;
  }
  $emit('save', { ...formData.value });
};
</script>
