
<!-- ============================
pages/misebox-users/index.vue
============================ -->

<!-- pages/misebox-users/index.vue -->
<!-- ============================
pages/misebox-users/index.vue
============================ -->

<template>
  <client-only>
    <div class="index">
      <OrganismsMiseboxUserCTA />
      <OrganismsMiseboxUserCreate v-if="!miseboxUser" />
      <OrganismsMiseboxUserCard v-if="miseboxUser" />
      <OrganismsMiseboxUserList />
    </div>
  </client-only>
</template>

<script setup>
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();
</script>


<!-- ============================
pages/chefs/index.vue
============================ -->

<!-- pages/chefs/index.vue -->
<!-- ============================
pages/chefs/index.vue
============================ -->

<template>
  <client-only>
    <div class="index">
      <OrganismsChefCTA />
      hi
      <OrganismsChefCreate />
      <OrganismsChefCard v-if="chef" />
      <OrganismsChefList />
    </div>
  </client-only>
</template>

<script setup>
const { currentChef: chef } = useChef();
</script>


<!-- ============================
pages/jobs/index.vue
============================ -->

<!-- pages/jobs/index.vue -->
<template>
  <client-only>
    <div class="index">
      <OrganismsJobCreate />
      <!-- <OrganismsJobCTA />
      <OrganismsJobList mode="myJobs" />
      <OrganismsJobList mode="allJobs" /> -->
    </div>
  </client-only>
</template>


<!-- ============================
pages/kitchens/index.vue
============================ -->

<template>
  <client-only>
    <div class="index">
      <OrganismsKitchenCTA />

      <!-- Section for chefs to create and view their kitchens -->
      <div v-if="chef">
        <OrganismsKitchenCreate />
        <OrganismsChefLinkKitchenList :kitchens="chef.kitchens" title="My Kitchens" />
      </div>

      <!-- General kitchen list accessible to all users -->
      <OrganismsKitchenList :kitchens="kitchens" title="All Kitchens" />
    </div>
  </client-only>
</template>

<script setup>
const { currentChef: chef } = useChef();
const { kitchensCollection } = useKitchen();

// Fetch all kitchens
const kitchens = kitchensCollection();
</script>


<!-- ============================
pages/professionals/index.vue
============================ -->

<!-- pages/professionals/index.vue -->
<!-- ============================
pages/professionals/index.vue
============================ -->

<template>
  <client-only>
    <div class="index">
      <OrganismsProfessionalCTA />
      <OrganismsProfessionalCard v-if="professional" />
      <OrganismsProfessionalList />
    </div>
  </client-only>
</template>

<script setup>
const { currentProfessional: professional } = useProfessional();
</script>


<!-- ============================
pages/recruiters/index.vue
============================ -->

<!-- pages/recruiters/index.vue -->
<!-- ============================
pages/recruiters/index.vue
============================ -->

<template>
  <client-only>
    <div class="index">
      <OrganismsRecruiterCTA />
      <OrganismsRecruiterCard v-if="recruiter" />
      <OrganismsRecruiterList />
    </div>
  </client-only>
</template>

<script setup>
const { currentRecruiter: recruiter } = useRecruiter();
</script>


<!-- ============================
pages/suppliers/index.vue
============================ -->

<!-- pages/suppliers/index.vue -->
<!-- ============================
pages/suppliers/index.vue
============================ -->

<template>
  <client-only>
    <div class="index">
      <OrganismsSupplierCTA />
      <OrganismsSupplierCard v-if="supplier" />
      <OrganismsSupplierCreate v-if="supplier" />
      <OrganismsSupplierList />
    </div>
  </client-only>
</template>

<script setup>
const { currentSupplier: supplier } = useSupplier();
</script>

