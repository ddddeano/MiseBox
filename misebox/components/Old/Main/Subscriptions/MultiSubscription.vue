<template>
  <div class="card subscription-card">
    <h3 class="subscription-title">{{ subscription.name }}</h3>
    <div class="subscription-benefits">
      <div v-for="(benefits, appType) in getMultiAppInfo(subscription.id)" :key="appType" class="subscription-benefits-section">
        <div class="app-type-header">
          <img :src="getAppIcon(appType)" alt="App Icon" class="subscription-app-icon">
          <h4 class="app-type-title">{{ appType.charAt(0).toUpperCase() + appType.slice(1) }}:</h4>
        </div>
        <ul class="app-benefits-list">
          <li v-for="benefit in benefits" :key="benefit" class="app-benefit-item">
            {{ benefit }}
          </li>
        </ul>
      </div>
    </div>
    <div class="subscription-price-wrapper">
      <div class="subscription-price">
        {{ formatPrice(subscription.prices[0].unit_amount) }} {{ subscription.prices[0].currency }} per {{ subscription.prices[0].recurring.interval }}
      </div>
    </div>
    <button class="subscription-button">Subscribe</button>
  </div>
</template>

<script setup>

const props = defineProps({
  subscription: {
    type: Object,
    required: true
  }
});

function getMultiAppInfo(prodId) {
  const benefits = {};
  const app = miseboxApps.miseboxUser;
  const subscription = app.subscriptions.find(sub => sub.prod_id === prodId);
  if (subscription) {
    Object.entries(subscription.benefits).forEach(([appType, benefitList]) => {
      benefits[appType] = benefitList;
    });
  }
  return benefits;
}

function formatPrice(price) {
  return (price / 100).toFixed(2); // Assuming prices are in cents
}

function getAppIcon(appType) {
  const app = Object.values(miseboxApps).find(app => app.doc.includes(appType));
  return app ? app.icon : '';
}
</script>
