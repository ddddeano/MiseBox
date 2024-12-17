<!-- components/organisms/Chef/Fields/Kitchen.vue -->
<template>
  <div class="kitchen-form">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode">
      <div class="display-selected-header">
        <div class="place-name">{{ kitchen.place_name }}</div>
        <div class="subheader">
          <div>{{ kitchen.city }}, {{ kitchen.region }}</div>
        </div>
      </div>
      <div>Address: {{ kitchen.formatted_address }}</div>
    </div>

    <!-- Create/Edit Mode -->
    <div v-else>
      <div v-if="kitchen.place_name" class="selected-place editable-input" @click="clearKitchenSelection">
        <div><strong>Selected Kitchen:</strong> {{ kitchen.place_name }}</div>
        <div>{{ kitchen.city }}, {{ kitchen.region }}</div>
      </div>
      <div v-else>
        <!-- Use the OrganismsKitchenSearch component -->
        <OrganismsKitchenSearch @select-kitchen="selectKitchen" />
      </div>

      <!-- Additional fields if necessary -->
      <textarea
        v-model="kitchen.notes"
        class="editable-input"
        placeholder="Additional notes or comments about the kitchen"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Import the OrganismsKitchenSearch component

const props = defineProps({
  kitchen: {
    type: Object,
    required: true,
  },
  mode: {
    type: String,
    required: true,
    validator: (value) => ['display', 'edit', 'create'].includes(value),
  },
});

// Methods to handle kitchen selection
const selectKitchen = (selectedKitchen) => {
  props.kitchen.place_name = selectedKitchen.place_name;
  props.kitchen.place_id = selectedKitchen.place_id;
  props.kitchen.formatted_address = selectedKitchen.formatted_address;
  props.kitchen.city = selectedKitchen.city;
  props.kitchen.region = selectedKitchen.region;
  props.kitchen.country = selectedKitchen.country;
  props.kitchen.photo_url = selectedKitchen.photo_url;
};

const clearKitchenSelection = () => {
  props.kitchen.place_name = '';
  props.kitchen.place_id = '';
  props.kitchen.formatted_address = '';
  props.kitchen.city = '';
  props.kitchen.region = '';
  props.kitchen.country = '';
  props.kitchen.photo_url = '';
};
</script>
