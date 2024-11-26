<template>
  <div class="creating">
    <ErrorMessage :error="error" />

    <div class="input-dropdown-wrapper">
      <input
        type="text"
        v-model="specialty.name"
        placeholder="Enter a specialty"
        class="input-specialty"
      />
    </div>

    <div class="arrow-container">
      <ArrowUpCircleIcon @click.stop="clickUpdate" class="icon arrow" />
    </div>
  </div>
</template>

<script setup>
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

const firestore = useFirestore();
const props = defineProps({
  userId: String,
  collectionName: String,
});

/*
  Capturing the Specialty data:
  {
    "name": "Italian Cuisine"
  }
*/

const specialty = reactive({ name: "" });
const error = ref({ message: '' });

const clickUpdate = async () => {
  format();
  if (validate()) {
    error.value.message = '';
    try {
      const documentRef = doc(firestore, props.collectionName, props.userId);
      await updateDoc(documentRef, {
        specialties: arrayUnion({ ...specialty })
      });
      reset();
    } catch (e) {
      error.value.message = 'Failed to add specialty. Please try again.';
      console.error('Failed to add specialty:', e.message);
    }
  } else {
    error.value.message = 'Please fill out the specialty field.';
  }
};

const format = () => {
  specialty.name = specialty.name.trim().replace(/\s+/g, ' ').charAt(0).toUpperCase() + specialty.name.slice(1);
};

const validate = () => specialty.name;
const reset = () => specialty.name = "";
</script>

<style scoped>
.input-dropdown-wrapper {
  display: flex;
  flex-direction: column;
}

.input-specialty {
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
}

.arrow-container {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
</style>
