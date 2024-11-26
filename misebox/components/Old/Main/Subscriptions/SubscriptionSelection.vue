<template>
  <div class="subscription-selection">
    <!-- Multi-App Subscriptions Section -->
    <div class="group">
      <h1 @click="toggleMultiAppVisibility" class="toggle-header">
        Multi App Subscriptions
      </h1>
      <div v-if="showMultiApp" class="subscription-options">
        <div v-for="(subscriptions, appDoc) in multiSubscriptions" :key="appDoc">
          <h2>{{ getAppName(appDoc) }}</h2>
          <div class="cards-container">
            <!-- Display Multi App Subscriptions -->
            <MainSubscriptionsMultiSubscription
              v-for="subscription in subscriptions"
              :key="subscription.id"
              :subscription="subscription"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Single-App Subscriptions Section -->
    <div class="group">
      <h1 @click="toggleSingleAppVisibility" class="toggle-header">
        Single App Subscriptions
      </h1>
      <div v-if="showSingleApp" class="subscription-options">
        <div v-for="(subscriptions, appDoc) in singleSubscriptions" :key="appDoc">
          <h2>{{ getAppName(appDoc) }}</h2>
          <div class="cards-container">
            <!-- Display Single App Subscriptions -->
            <MainSubscriptionsSingleSubscription
              v-for="subscription in subscriptions"
              :key="subscription.id"
              :subscription="subscription"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFirestore } from 'vuefire';
import { collection, query, where, getDocs } from 'firebase/firestore';

const db = useFirestore();
const multiSubscriptions = ref({});
const singleSubscriptions = ref({});

const showMultiApp = ref(false); // For toggling Multi App visibility
const showSingleApp = ref(false); // For toggling Single App visibility

// Toggle visibility and close the other section
const toggleMultiAppVisibility = () => {
  showMultiApp.value = !showMultiApp.value;
  if (showMultiApp.value) {
    showSingleApp.value = false; // Close Single App section
  }
};

const toggleSingleAppVisibility = () => {
  showSingleApp.value = !showSingleApp.value;
  if (showSingleApp.value) {
    showMultiApp.value = false; // Close Multi App section
  }
};

const getAppName = (appDoc) => {
  const appInfo = Object.values(miseboxApps).find(app => app.doc === appDoc);
  return appInfo ? appInfo.name : appDoc;
};

onMounted(async () => {
  try {
    const productsQuery = query(collection(db, 'products'), where('active', '==', true), where('metadata.subscription_type', 'in', ['single_app', 'multi_app']));
    const querySnapshot = await getDocs(productsQuery);

    const multiGroup = {};
    const singleGroup = {};

    for (const doc of querySnapshot.docs) {
      const productData = doc.data();
      const pricesSnapshot = await getDocs(collection(db, 'products', doc.id, 'prices'));
      const pricesList = pricesSnapshot.docs.map(priceDoc => ({ id: priceDoc.id, ...priceDoc.data() }));

      const subscription = { ...productData, id: doc.id, prices: pricesList };
      const appDoc = subscription.metadata.app;

      if (subscription.metadata.subscription_type === 'multi_app') {
        if (!multiGroup[appDoc]) multiGroup[appDoc] = [];
        multiGroup[appDoc].push(subscription);
      } else if (subscription.metadata.subscription_type === 'single_app') {
        if (!singleGroup[appDoc]) singleGroup[appDoc] = [];
        singleGroup[appDoc].push(subscription);
      }
    }

    multiSubscriptions.value = multiGroup;
    singleSubscriptions.value = singleGroup;
  } catch (error) {
    console.error("Failed to fetch or process data:", error);
  }
});
</script>
