<template>
  <div class="dropdown-item" @click="selectKitchen">
    <div class="place-details">
      <p><strong>{{ kitchen.place_name }}</strong></p>
      <p>{{ kitchen.formatted_address }}</p>
      <!-- Display Team Members -->
      <div v-if="kitchen.team && kitchen.team.length" class="team-details">
        <p><strong>Team Members:</strong></p>
        <ul>
          <li v-for="member in kitchen.team" :key="member">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  kitchen: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const emits = defineEmits(["select"]);

const selectKitchen = () => {
  emits("select", props.kitchen);
};
</script>
