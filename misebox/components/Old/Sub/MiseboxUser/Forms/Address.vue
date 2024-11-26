<template>
  <div class="component" v-if="hasInfo || editingState || createState">
    <!-- Display State -->
    <div v-if="displayState" class="display" @click="enterEditMode">
      <span class="display-address">
        {{ display }}
      </span>
    </div>

    <!-- Editing State -->
    <div v-if="editingState" class="edit">
      <div class="label">{{ label }}</div>
      <div class="edit-cell">
        <span class="edit-address">
          {{ display }}
        </span>
        <MinusCircleIcon class="icon" @click.stop="clickDelete" />
      </div>
      <CheckCircleIcon class="icon" @click="enterDisplayMode" />
    </div>

    <!-- Create State -->
    <div v-if="createState" class="create">
      <div class="label">{{ label }}</div>
      <div class="create-field">
        <input v-model="model.number" placeholder="Number" />
      </div>
      <div class="create-field">
        <input v-model="model.street1" placeholder="Street 1" />
      </div>
      <div class="create-field">
        <input v-model="model.street2" placeholder="Street 2 (Optional)" />
      </div>
      <div class="create-field">
        <input v-model="model.town" placeholder="Town/City" />
      </div>
      <div class="create-field">
        <input v-model="model.county" placeholder="County/State" />
      </div>
      <div class="create-field">
        <input v-model="model.postalCode" placeholder="Postal Code" />
      </div>
      <div class="create-field">
        <input v-model="model.country" placeholder="Country" />
      </div>
      <ErrorMessage v-if="error.message" :error="error" @click="resolveError" />
      <ArrowUpCircleIcon class="icon" @click="clickUpdate" />
    </div>
  </div>
</template>

<script setup>
import { useFirestore } from 'vuefire';
import { doc, updateDoc } from 'firebase/firestore';

const firestore = useFirestore();
const label = "Address";
const collectionName = "misebox-user-profiles";
const target = "address";

const props = defineProps({
  userId: {
    type: String,
    default: "",
  },
  subscription: {
    type: Object,
    default: () => ({
      number: '',
      street1: '',
      street2: '',
      town: '',
      county: '',
      postalCode: '',
      country: '',
    }),
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
});

// Computed property to check if there is address info
const hasInfo = computed(() => {
  return ['number', 'street1', 'town', 'county', 'postalCode', 'country'].some(field => {
    const value = props.subscription[field];
    return value && value.trim() !== '';
  });
});

// Computed property to format the address display
const display = computed(() => {
  const addressParts = [
    props.subscription.number,
    props.subscription.street1,
    props.subscription.street2,
    props.subscription.town,
    props.subscription.county,
    props.subscription.postalCode,
    props.subscription.country,
  ];

  // Filter out any empty or undefined parts
  return addressParts.filter(part => part && part.trim() !== '').join(', ');
});

// State management
const displayState = ref(!props.isEditing);
const editingState = ref(props.isEditing);
const createState = ref(false);
const error = ref({ message: '' });

// Watcher for isEditing prop
watch(() => props.isEditing, (newVal) => {
  if (newVal) {
    enterEditMode();
  } else {
    editingState.value = false;
    createState.value = false;
  }
  displayState.value = !newVal;
});

// Model to hold the address data
const model = ref(props.subscription);

// Methods for formatting and updating the address
const format = () => {
  model.value.number = model.value.number.trim();
  model.value.street1 = model.value.street1.trim();
  model.value.street2 = model.value.street2.trim();
  model.value.town = model.value.town.trim().replace(/\b\w/g, char => char.toUpperCase());
  model.value.county = model.value.county.trim().replace(/\b\w/g, char => char.toUpperCase());
  model.value.postalCode = model.value.postalCode.trim().toUpperCase();
  model.value.country = model.value.country.trim().replace(/\b\w/g, char => char.toUpperCase());
};

const clickUpdate = async () => {
  if (validate()) {
    format();
    try {
      const documentRef = doc(firestore, collectionName, props.userId);
      await updateDoc(documentRef, { [target]: model.value });
      console.log('Address updated successfully');
      error.value.message = ''; // Clear error on successful update
      enterDisplayMode();
    } catch (err) {
      console.error('Update failed:', err);
    }
  }
};

const clickDelete = async () => {
  if (props.userId) {
    try {
      const documentRef = doc(firestore, collectionName, props.userId);
      await updateDoc(documentRef, { [target]: { number: '', street1: '', street2: '', town: '', county: '', postalCode: '', country: '' } });
      model.value = { number: '', street1: '', street2: '', town: '', county: '', postalCode: '', country: '' };
      console.log('Address deleted successfully');
      enterEditMode();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }
};

const validate = () => {
  return true; // As specified, this always returns true for simplicity
};

// State management for different modes (display, edit, create)
const enterEditMode = () => {
  displayState.value = false;
  editingState.value = hasInfo.value;
  createState.value = !hasInfo.value;
};

const enterDisplayMode = () => {
  editingState.value = false;
  createState.value = false;
  displayState.value = true;
};

// Error resolution method
const resolveError = () => {
  error.value.message = ''; // Clear the error message
  model.value = { number: '', street1: '', street2: '', town: '', county: '', postalCode: '', country: '' };
  enterEditMode();
};
</script>

<style lang="scss">
.edit-address {
  width: 75%
}
</style>