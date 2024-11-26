<template>
  <div v-if="isOpen" class="dialog-overlay">
    <div class="dialog">
      <h2>Confirm Your Selection</h2>
      <p>User ID: {{ payload.userId }}</p>
      <p>Display Name: {{ payload.displayName }}</p>
      <p>MiseCode: {{ payload.miseCode }}</p>
      <p>Subscription Type: {{ payload.subscription.type }}</p>
      <p v-if="payload.subscription.subscriptionType === 'single'">App: {{ payload.subscription.app }}</p>
      <p v-else>App: All apps</p>
      <p>Start Date: {{ new Date(payload.subscription.startDate).toLocaleDateString() }}</p>
      <p>Status: {{ payload.subscription.status }}</p>
      <div class="dialog-buttons">
        <button @click="cancel" class="cancel-button">Cancel</button>
        <button @click="confirm" class="confirm-button">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script setup>

import { loadStripe } from '@stripe/stripe-js';

console.log("Setting up SubscriptionDialog component");

const { getUser } = useAppUser();
const router = useRouter();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  selectedOption: {
    type: String,
    default: ''
  },
  subscriptionType: {
    type: String,
    default: 'single' // 'single' or 'multi'
  },
  selectedApp: {
    type: String,
    default: ''
  }
});

console.log("Props:", props);

const user = getUser();
const profile = {
  displayName: 'Default User', // Mock data
  miseCode: 'M12345' // Mock data
};

console.log("User:", user);
console.log("Profile:", profile);

const payload = ref({
  userId: user.uid,
  displayName: profile.displayName,
  miseCode: profile.miseCode,
  subscription: {
    type: props.selectedOption, // Basic, Medium, Deluxe
    startDate: new Date(),
    subscriptionType: props.subscriptionType, // single or multi
    status: 'pending',
    app: props.selectedApp // Add app only if subscriptionType is single
  }
});

console.log("Initial payload:", payload.value);

const emit = defineEmits(['close', 'confirm']);

const {
  public: { stripePublicKey },
} = useRuntimeConfig();

const stripePromise = loadStripe(stripePublicKey);

const cancel = () => {
  console.log("Cancel button clicked");
  emit('close');
};

const confirm = async () => {
  console.log("Confirm button clicked, payload:", payload.value);
  
  try {
    const { data, error } = await useFetch('/api/confirm-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload.value),
    });

    if (error.value) {
      console.error("Error from API:", error.value);
      return;
    }

    console.log('Response from API:', JSON.stringify(data.value));

    if (data.value.processing === 'stripe') {
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.value.sessionId });
    } else if (data.value.docRef && data.value.processing) {
      router.push({
        path: `/subscription/confirmation`,
        query: {
          subscriptionId: data.value.docRef,
          paymentMethod: data.value.processing,
        },
      });
    }
  } catch (error) {
    console.error('Error confirming subscription:', error);
  }

  emit('confirm', payload.value);
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.dialog-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.cancel-button,
.confirm-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cancel-button {
  background-color: #ccc;
}

.cancel-button:hover {
  background-color: #bbb;
}

.confirm-button {
  background-color: #214128;
  color: white;
}

.confirm-button:hover {
  background-color: #343a40;
}
</style>
