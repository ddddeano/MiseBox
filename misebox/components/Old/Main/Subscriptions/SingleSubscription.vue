<template>
  <div class="card subscription-card">
    <h3 class="subscription-title">{{ subscription.name }}</h3>
    <div class="subscription-benefits">
      <div class="subscription-benefits-section">
        <ul class="app-benefits-list">
          <li v-for="benefit in getSingleInfo(subscription.id)" :key="benefit" class="app-benefit-item">
            <img :src="getAppIcon(subscription.metadata.app)" alt="App Icon" class="subscription-app-icon">
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

function getSingleInfo(prodId) {
  for (const app of Object.values(miseboxApps)) {
    const subscription = app.subscriptions.find(sub => sub.prod_id === prodId);
    if (subscription) {
      return subscription.benefits;
    }
  }
  return [];
}

function formatPrice(price) {
  return (price / 100).toFixed(2);
}

function getAppIcon(appType) {
  const app = Object.values(miseboxApps).find(app => app.doc === appType);
  return app ? app.icon : '';
}
</script>
