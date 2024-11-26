// useInteraction.js
import { computed } from 'vue';
import { useCurrentUser, useDocument, useFirestore } from 'vuefire';
import { doc } from 'firebase/firestore';
import { useRoute } from 'vue-router';

export const useInteraction = () => {
  const db = useFirestore();
  const vueFireUser = useCurrentUser();
  const route = useRoute();

  // Reference to the current Misebox user's document, only if vueFireUser is available
  const miseboxUserDocRef = computed(() =>
    vueFireUser.value ? doc(db, 'misebox-users', vueFireUser.value.uid) : null
  );

  // Fetch the current Misebox user data only if vueFireUser is available
  const miseboxUserData = computed(() => 
    vueFireUser.value ? useDocument(miseboxUserDocRef).data : null
  );

  // Determine if the current user is viewing their own route
  const isViewingOwnRoute = computed(() =>
    vueFireUser.value ? vueFireUser.value.uid === route.params.id : false
  );

  // Check if the current user is following a specific target user
  const isFollowing = (targetEntityId) => computed(() =>
    vueFireUser.value && miseboxUserData.value && targetEntityId
      ? miseboxUserData.value.following.includes(targetEntityId)
      : false
  );

  return {
    isViewingOwnRoute,
    isFollowing,
  };
};
