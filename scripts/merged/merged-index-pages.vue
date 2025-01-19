
<!-- ============================
pages/misebox-users/[id]/index.vue
============================ -->

<!-- pages/misebox-users/[id]/index.vue -->
<template>
  <client-only>
    <div v-if="miseboxUser" class="profile">
      <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

      <div class="action-buttons">
        <NuxtLink
          v-if="currentUser?.uid === $route.params.id"
          :to="`/misebox-users/${currentUser.uid}/edit`"
          class="icon-btn"
        >
          <Cog6ToothIcon class="icon" />
          <span>Edit</span>
        </NuxtLink>
        <button
          v-if="currentUser?.uid !== $route.params.id"
          class="icon-btn"
        >
          <EnvelopeIcon class="icon" />
          <span>Message</span>
        </button>
      </div>

      <OrganismsMiseboxUserView :miseboxUser="miseboxUser" />

      <OrganismsUniversalBubble
        :id="miseboxUser.id"
        parent="misebox-users"
        :userApps="miseboxUser.user_apps"
      />
    </div>
    <div v-else>
      <p class="loading-message">Loading...</p>
    </div>
  </client-only>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useCurrentUser } from 'vuefire';

const route = useRoute();
const currentUser = useCurrentUser();
const { fetchMiseboxUser } = useMiseboxUser();

const miseboxUser = fetchMiseboxUser(route.params.id);
</script>


<!-- ============================
pages/chefs/[id]/index.vue
============================ -->

<!-- pages/chefs/[id]/index.vue -->
<template>
  <client-only>
    <div v-if="miseboxUser && chef" class="profile">
      <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

      <div class="action-buttons">
        <NuxtLink
          v-if="currentUser?.uid === $route.params.id"
          :to="`/chefs/${currentUser.uid}/edit`"
          class="icon-btn"
        >
          <Cog6ToothIcon class="icon" />
          <span>Edit</span>
        </NuxtLink>
        <button
          v-if="currentUser?.uid !== $route.params.id"
          class="icon-btn"
        >
          <EnvelopeIcon class="icon" />
          <span>Message</span>
        </button>
      </div>

      <OrganismsChefView :chef="chef" />

      <OrganismsUniversalBubble
        :id="miseboxUser.id"
        parent="chefs"
        :userApps="miseboxUser.user_apps"
      />
    </div>
    <div v-else>
      <p class="loading">Loading...</p>
    </div>
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useCurrentUser } from "vuefire";

const route = useRoute();
const currentUser = useCurrentUser();

const { fetchMiseboxUser } = useMiseboxUser();
const { fetchChef } = useChef();

const miseboxUser = fetchMiseboxUser(route.params.id);
const chef = fetchChef(route.params.id);
</script>


<!-- ============================
pages/jobs/[id]/index.vue
============================ -->

<!-- pages/jobs/[id]/index.vue -->
<!-- ============================
pages/jobs/[id]/index.vue
============================ -->
<template>
  <client-only>
  <h1>New Job</h1>
  {{job}}
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const { fetchJob } = useJob();
const job = fetchJob(route.params.id);


</script>

<style scoped>
.profile {
  padding: var(--spacing-m);
  max-width: 800px;
  margin: 0 auto;
}

.job-header {
  text-align: center;
  margin-bottom: var(--spacing-l);
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  margin-bottom: var(--spacing-m);
}
</style>


<!-- ============================
pages/kitchens/[id]/index.vue
============================ -->

<template>
  <client-only>
    <div v-if="kitchen" class="page profile">
      <!-- Kitchen Header -->
      <header class="kitchen-header">
       <MoleculesAvatar :url="kitchen.avatar" size="large"/>
        <h1>{{ kitchen.name }}</h1>
        <p>{{ kitchen.formatted_address }}</p>
      </header>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <NuxtLink
          v-if="isKitchenLinked"
          class="icon-btn"
          :to="`/kitchens/${kitchen.id}/edit`"
        >
          <Cog6ToothIcon class="icon" />
          <span>Edit</span>
        </NuxtLink>
        <NuxtLink
          v-if="isKitchenLinked"
          class="icon-btn"
          :to="`/kitchens/${kitchen.id}/dashboard`"
        >
          <BuildingLibraryIcon class="icon" />
          <span>Dashboard</span>
        </NuxtLink>
        <button
          v-if="!isKitchenLinked"
          class="icon-btn"
          @click="clickAddKitchenToChef"
        >
          <PlusIcon class="icon" />
          <span>Add to My Kitchens</span>
        </button>
      </div>

      <!-- Team Section -->
      <section class="team-section">
        <h2>Team</h2>
        <div v-if="kitchen.current_team?.length" class="team-list">
          <OrganismsChefPill
            v-for="member in kitchen.current_team"
            :key="member.id"
            :chef="member"
          />
        </div>
        <p v-else>No team members yet.</p>
      </section>

      <!-- Kitchen View -->
      <OrganismsKitchenView :kitchen="kitchen" />
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const { fetchKitchen, addChefToKitchen } = useKitchen();
const { currentChef, addKitchenToChef } = useChef();

const kitchen = fetchKitchen(route.params.id);

const isKitchenLinked = computed(() =>
  (currentChef.value?.kitchens || []).some(
    (linkedKitchen) => linkedKitchen.id === route.params.id
  )
);

// Add chef to kitchen and vice versa
const clickAddKitchenToChef = async () => {
  try {
    if (kitchen.value && currentChef.value) {
      const kitchenData = { id: kitchen.value.id };
      const chefData = { id: currentChef.value.id };

      await addChefToKitchen(kitchen.value.id, chefData);
      await addKitchenToChef(currentChef.value.id, kitchenData);

      console.log("Chef added to kitchen and kitchen added to chef");
    }
  } catch (error) {
    console.error("Error adding chef and kitchen:", error);
  }
};
</script>


<!-- ============================
pages/professionals/[id]/index.vue
============================ -->

<!-- pages/professionals/[id]/index.vue -->
<template>
  <client-only>
    <div v-if="miseboxUser && professional" class="profile">
      <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

      <div class="action-buttons">
        <NuxtLink
          v-if="currentUser?.uid === $route.params.id"
          :to="`/professionals/${currentUser.uid}/edit`"
          class="icon-btn"
        >
          <Cog6ToothIcon class="icon" />
          <span>Edit</span>
        </NuxtLink>
        <button
          v-if="currentUser?.uid !== $route.params.id"
          class="icon-btn"
        >
          <EnvelopeIcon class="icon" />
          <span>Message</span>
        </button>
      </div>

      <OrganismsProfessionalView :professional="professional" />

      <OrganismsUniversalBubble
        :id="miseboxUser.id"
        parent="professionals"
        :userApps="miseboxUser.user_apps"
      />
    </div>
    <div v-else>
      <p class="loading">Loading...</p>
    </div>
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useCurrentUser } from "vuefire";

const route = useRoute();
const currentUser = useCurrentUser();

const { fetchMiseboxUser } = useMiseboxUser();
const { fetchProfessional } = useProfessional();

const miseboxUser = fetchMiseboxUser(route.params.id);
const professional = fetchProfessional(route.params.id);
</script>


<!-- ============================
pages/recruiters/[id]/index.vue
============================ -->

<!-- pages/recruiters/[id]/index.vue -->
<template>
  <client-only>
    <div v-if="miseboxUser && recruiter" class="profile">
      <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

      <div class="action-buttons">
        <NuxtLink
          v-if="currentUser?.uid === $route.params.id"
          :to="`/recruiters/${currentUser.uid}/edit`"
          class="icon-btn"
        >
          <Cog6ToothIcon class="icon" />
          <span>Edit</span>
        </NuxtLink>
        <button
          v-if="currentUser?.uid !== $route.params.id"
          class="icon-btn"
        >
          <EnvelopeIcon class="icon" />
          <span>Message</span>
        </button>
      </div>

      <OrganismsRecruiterView :recruiter="recruiter" />

      <OrganismsUniversalBubble
        :id="miseboxUser.id"
        parent="recruiters"
        :userApps="miseboxUser.user_apps"
      />
    </div>
    <div v-else>
      <p class="loading">Loading...</p>
    </div>
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useCurrentUser } from "vuefire";

const route = useRoute();
const currentUser = useCurrentUser();

const { fetchMiseboxUser } = useMiseboxUser();
const { fetchRecruiter } = useRecruiter();

const miseboxUser = fetchMiseboxUser(route.params.id);
const recruiter = fetchRecruiter(route.params.id);
</script>


<!-- ============================
pages/suppliers/[id]/index.vue
============================ -->

<!-- pages/suppliers/[id]/index.vue -->
<template>
  <client-only>
    <div v-if="miseboxUser && supplier" class="profile">
      <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

      <div class="action-buttons">
        <NuxtLink
          v-if="currentUser?.uid === $route.params.id"
          :to="`/suppliers/${currentUser.uid}/edit`"
          class="icon-btn"
        >
          <Cog6ToothIcon class="icon" />
          <span>Edit</span>
        </NuxtLink>
        <button
          v-if="currentUser?.uid !== $route.params.id"
          class="icon-btn"
        >
          <EnvelopeIcon class="icon" />
          <span>Message</span>
        </button>
      </div>

      <OrganismsSupplierView :supplier="supplier" />

      <OrganismsUniversalBubble
        :id="miseboxUser.id"
        parent="suppliers"
        :userApps="miseboxUser.user_apps"
      />
    </div>
    <div v-else>
      <p class="loading">Loading...</p>
    </div>
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useCurrentUser } from "vuefire";

const route = useRoute();
const currentUser = useCurrentUser();

const { fetchMiseboxUser } = useMiseboxUser();
const { fetchSupplier } = useSupplier();

const miseboxUser = fetchMiseboxUser(route.params.id);
const supplier = fetchSupplier(route.params.id);
</script>

