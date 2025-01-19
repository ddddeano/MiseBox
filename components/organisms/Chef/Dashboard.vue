<!-- components/organisms/Chef/Dashboard.vue -->
<template>
  <div class="chef-dashboard">
    <header>
      <h1>Chef Dashboard</h1>
      <p>Manage your chef profile, recipes, and professional journey.</p>
    </header>

    <section v-if="miseboxUser && chef">
      <p><strong>Name:</strong> {{ miseboxUser.display_name }}</p>
      <p><strong>Chef Specialty:</strong> {{ chef.specialty }}</p>
      <p><strong>Recipes:</strong> {{ chef.recipes?.length || 0 }}</p>
    </section>

    <nav>
      <ul>
        <li>
          <router-link :to="`/chefs/${currentUser.uid}/edit`">Edit Profile</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { useCurrentUser } from "vuefire";

const currentUser = useCurrentUser();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
const { currentChef: chef } = useChef();
</script>
