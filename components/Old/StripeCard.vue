<template>
  <div class="stripe-card">
    <!-- Display current subscription -->
    <pre>{{ profile && profile.subscription ? profile.subscription : "non" }}</pre>
    
    <!-- Plan pill -->
    <div class="plan-pill">Monthly Plan</div>

    <!-- Price pill -->
    <div class="price-pill">
      <!-- Displaying the price -->
      <span v-if="prices && prices.length > 0">
        {{ formatPrice(prices[0].unit_amount, prices[0].currency) }}
      </span>
      <span v-else>
        Price not available
      </span>
    </div>

    <!-- Plan name -->
    <div class="plan-header">
      <strong>{{ product.name }}</strong>
    </div>

    <!-- Displaying benefits -->
    <ul v-if="product.benefits">
      <li v-for="(benefit, index) in product.benefits" :key="index">
        {{ benefit }}
      </li>
    </ul>

    <!-- Plan description -->
    <div class="stripe-description">{{ product.description }}</div>

    <!-- Subscribe button -->
    <button class="btn" @click="subscribe(prices[0].id, product.name)">
      Upgrade to {{ product.name }}
    </button>
  </div>
</template>

<script setup>
import { useDocument, useCollection, useFirestore, useCurrentUser } from 'vuefire';
import { doc, collection } from 'firebase/firestore';
import { loadStripe } from '@stripe/stripe-js';

// Fetch Stripe public key from runtimeConfig
const { public: { stripePublicKey } } = useRuntimeConfig();

const stripe = await loadStripe(stripePublicKey);
const db = useFirestore();
const currentUser = useCurrentUser();

const props = defineProps({
  id: {
    type: String,
    required: true,
    default: "",
  },
});

// Fetch product and prices from Firestore
const product = useDocument(doc(db, 'products', props.id));
const prices = useCollection(collection(db, `products/${props.id}/prices`));

const userDocRef = computed(() => currentUser.value ? doc(db, 'chefs', currentUser.value.uid) : null);
const { data: profile } = useDocument(userDocRef); 

// Subscribe function
const subscribe = async (priceId, name) => {
  if (!stripe) {
    console.error('Stripe instance not initialized');
    return;
  }

  try {
    // Fetch session ID from the server-side API
    const { sessionId } = await $fetch('/api/create-checkout-session', {
      method: 'POST',
      body: { priceId, origin: window.location.origin, name: name, app: "chefs", userId: currentUser.value.uid },
    });

    // Check if the sessionId exists and call redirectToCheckout
    if (sessionId) {
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Stripe redirect error:', error.message);
      }
    } else {
      console.error("No session ID returned from API.");
    }
  } catch (err) {
    console.error('Error during Stripe checkout:', err);
  }
};

// Format the price for display
const formatPrice = (amount, currency = 'EUR') => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency,
  }).format(amount / 100); // Stripe stores amounts in cents, so divide by 100
};
</script>

<style scoped>
/* Mobile-first design */
.stripe-card {
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: var(--background-secondary);
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  border: 1px solid var(--border-color);
  position: relative;
  margin-top: 30px;
}

.plan-header {
  background-color: var(--primary-color);
  font-size: 18px;
  text-transform: capitalize;
  padding: 8px;
  border-radius: 6px;
  padding-left: 40px;
  position: relative;
  z-index: 1;
}

.plan-pill {
  background-color: var(--hover-color);
  color: var(--text-color-inverse);
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 20px;
  position: absolute;
  top: -5px;
  left: 5px;
  transform: translateY(-50%);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.price-pill {
  background-color: var(--active-color);
  color: var(--text-color-inverse);
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 20px;
  position: absolute;
  top: -5px;
  right: 5px;
  transform: translateY(-50%);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

ul {
  list-style-type: none;
  padding-left: 0;
  color: var(--text-color-muted);
  margin: 10px 0;
}

li {
  margin: 8px 0;
}

.stripe-description {
  font-style: italic;
  color: var(--text-color);
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  color: var(--text-color-inverse);
}

@media (min-width: 768px) {
  .stripe-card {
    width: 100%;
  }
}
</style>
