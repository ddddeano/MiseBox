import { computed } from 'vue';
import { useCollection, useCurrentUser } from 'vuefire';


// This function fetches and filters a collection, applying any custom filter.
export function useCustomFilteredCollection(collectionRef, customFilter) {
  // Fetch the collection of items (e.g., users, chefs, etc.)
  const { data: collectionData } = useCollection(collectionRef);
  
  // Apply a custom filter (if provided)
  const filteredCollection = computed(() => {
    let filtered = collectionData.value || [];
    
    // Apply the custom filter if it exists
    if (customFilter) {
      filtered = filtered.filter(customFilter);
    }

    return filtered;
  });
  
  return {
    filteredCollection,
  };
}


// This function checks whether the current user has a specific app
export function useHasApp(miseboxUser, appName) {
  const hasApp = computed(() => {
    console.log('Checking for app:', appName, 'in user:', miseboxUser.value?.user_apps); // Log for debugging
    if (miseboxUser.value && Array.isArray(miseboxUser.value.user_apps)) {
      return miseboxUser.value.user_apps.includes(appName);
    }
    return false;
  });

  return {
    hasApp,
  };
}