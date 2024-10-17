<template>
  <client-only>
    <div class="index" v-if="currentUser && miseboxUser">
      <div v-if="!hasApp" class="create-app-container">
        <button class="create-app-button" @click="createMiseboxUser">
          Create App
        </button>
      </div>

      <ul class="user-list">
        <li v-if="hasApp" class="user-card-container">
          <OrganismsMiseboxUserCard :user="miseboxUser" class="current-user"/>
        </li>

        <li v-for="user in filteredUsers" :key="user.id" class="user-cell-container">
          <OrganismsMiseboxUserCell
            :user="user"
            :isFollowing="miseboxUser.following?.includes(user.id) ? 'true' : 'false'"
          />
        </li>
      </ul>
    </div>
  </client-only>
</template>

<script setup>
import { useFirestore, useCurrentUser } from 'vuefire'
import { collection } from 'firebase/firestore'

const currentUser = useCurrentUser()

const collectionRef = collection(useFirestore(), 'misebox-users')

const { createMiseboxUser, miseboxUser } = useMiseboxUser(currentUser)

const displayNameFilter = (user) => isNonEmptyString(user.display_name)

const { filteredCollection: filteredUsers } = useFilteredCollection(
  collectionRef,
  displayNameFilter
)

const { hasApp } = useHasApp(miseboxUser, 'misebox-users')
</script>

<style scoped>
.index {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  max-width: 600px;
  padding: var(--spacing-m);

}

.create-app-container {
  margin-bottom: var(--spacing-l);
}

.create-app-button {
  padding: var(--spacing-s) var(--spacing-m);
  font-size: var(--font-size-m);
  color: #fff;
  background-color: var(--primary);
  border: none;
  border-radius: var(--radius-s);
  cursor: pointer;
}

.create-app-button:hover {
  background-color: var(--primary-hover);
}

.user-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
  width: 100%;
}

.user-cell-container,
.user-card-container {
  width: 100%;
}
</style>
