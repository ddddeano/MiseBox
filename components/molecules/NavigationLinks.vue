<template>
  <ul class="navigation-links">
    <li>
      <NuxtLink to="/misebox-users" active-class="active-link"
        >Misebox</NuxtLink
      >
    </li>
    <div class="divider"></div>
    <li>
      <NuxtLink to="/professionals" active-class="active-link"
        >Professionals</NuxtLink
      >
    </li>
    <div class="divider"></div>
    <li>
      <NuxtLink to="/chefs" active-class="active-link">Chefs</NuxtLink>
    </li>
    <div class="divider"></div>
    <li>
      <NuxtLink to="/kitchens" active-class="active-link">Kitchens</NuxtLink>
    </li>
    <div class="divider"></div>
    <li>
      <NuxtLink to="/jobs" active-class="active-link">Jobs</NuxtLink>
    </li>
    <div class="divider"></div>
    <li>
      <NuxtLink to="/subscribe" active-class="active-link">Subscribe</NuxtLink>
    </li>
  </ul>
</template>

<script setup></script>

<style lang="scss">
.divider {
  border-top: 1px solid var(--border); /* Use a border color variable */
}
</style>
