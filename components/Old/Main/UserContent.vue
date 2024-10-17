<template>
  <div class="user-content">
      <div v-if="hasApp" class="card-wrapper">
        <NuxtLink :to="`/${appData.collection}/${userId}`">
          <slot name="card" :uid="userId"></slot>
        </NuxtLink>
    </div>
    
    <div v-else>
      <p>You do not have this app</p>
      <button class="create-button" @click="handleCreateProfileClick">Create {{ appData.name }} Profile</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  appData: {
    type: Object,
    default: () => ({
      name: 'App',
      collection: ''
    })
  },
  createProfileFunction: {
    type: Function,
    required: true
  },
  userId: {
    type: String,
    default: ''
  },
  hasApp: {
    type: Boolean,
    required: true
  }
});

const handleCreateProfileClick = () => {
  props.createProfileFunction();
};
</script>

<style scoped lang="scss">
.user-content {
  width: 100%;
  text-align: center; /* Center text-based elements horizontally */
  padding-top: var(--padding-medium); /* Add some padding to push content down slightly */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-wrapper {

  padding: var(--padding-small);
  width: 100%;
  max-width: 600px;
  text-decoration: none;
  color: inherit;
}

button.create-button {
  background-color: var(--button-color); /* Use global button color */
  color: var(--text-color-inverse); /* Use global inverse text color (likely white) */
  padding: var(--padding-small) var(--padding-large); /* Use global padding values */
  font-size: var(--font-size-large); /* Use global large font size */
  font-weight: bold; /* Bold text to make it stand out */
  border: none; /* Remove default border */
  border-radius: var(--corner-radius-medium); /* Use global medium corner radius */
  box-shadow: var(--box-shadow); /* Use global box shadow */
  cursor: pointer; /* Pointer cursor to indicate clickability */
  transition: background-color 0.3s ease, transform 0.3s ease; /* Smooth transition effects */
  margin-top: var(--margin-medium); /* Add some space above the button */
  
  /* Center the button horizontally */
  display: inline-block;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background-color: var(--hover-color); /* Use global hover color */
    transform: translateY(-2px); /* Slight lift effect on hover */
  }

  &:active {
    background-color: var(--active-color); /* Use global active color */
    transform: translateY(0); /* Reset the lift effect */
  }

  &:focus {
    outline: 2px solid var(--primary-color); /* Use global primary color for focus outline */
  }
}


</style>
