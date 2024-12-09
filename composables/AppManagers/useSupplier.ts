import { computed } from 'vue';
import { useCurrentUser, useDocument, useFirestore } from 'vuefire';
import {
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { useMiseboxUser } from './useMiseboxUser';

export const useSupplier = () => {
  const db = useFirestore();
  const currentUser = useCurrentUser();
  const { currentMiseboxUser, createMiseboxUser } = useMiseboxUser();

  // Get the current user's Supplier profile
  const currentSupplierDocRef = computed(() =>
    currentUser.value ? doc(db, 'suppliers', currentUser.value.uid) : null
  );
  const { data: currentSupplier } = useDocument(currentSupplierDocRef);

  // Create a new Supplier profile
  const createSupplier = async () => {
    if (!currentUser.value) {
      console.error('[useSupplier] User not authenticated.');
      return;
    }

    if (!currentMiseboxUser) {
      console.log('[useSupplier] Misebox user not found, creating one...');
      await createMiseboxUser();
    }

    const { uid } = currentUser.value;
    const supplierRef = doc(db, 'suppliers', uid);
    const supplierData = {
      id: uid,
      name: currentUser.value.displayName || 'New Supplier',
      contact: {
        email: currentUser.value.email || '',
        phone: '',
      },
      createdAt: new Date().toISOString(),
      kitchens: [], // Kitchens using this supplier
    };

    try {
      await setDoc(supplierRef, supplierData);

      const miseboxUserRef = doc(db, 'misebox-users', uid);
      await updateDoc(miseboxUserRef, {
        user_apps: arrayUnion('suppliers'),
      });

      console.log('[useSupplier] Supplier profile created successfully.');
    } catch (error) {
      console.error('[useSupplier] Error creating Supplier profile:', error);
    }
  };

  // Delete the current Supplier profile
  const deleteSupplier = async () => {
    if (!currentUser.value) {
      console.error('[useSupplier] User not authenticated.');
      return;
    }

    const { uid } = currentUser.value;
    const supplierRef = doc(db, 'suppliers', uid);

    try {
      await deleteDoc(supplierRef);

      const miseboxUserRef = doc(db, 'misebox-users', uid);
      await updateDoc(miseboxUserRef, {
        user_apps: arrayRemove('suppliers'),
      });

      console.log('[useSupplier] Supplier profile deleted successfully.');
    } catch (error) {
      console.error('[useSupplier] Error deleting Supplier profile:', error);
    }
  };

  // Add a kitchen to the supplier's list
  const addKitchenToSupplier = async (supplierId, kitchenId) => {
    if (!currentUser.value) {
      console.error('[useSupplier] User not authenticated.');
      return;
    }

    try {
      const supplierRef = doc(db, 'suppliers', supplierId);
      await updateDoc(supplierRef, {
        kitchens: arrayUnion(kitchenId),
      });

      console.log(`[useSupplier] Kitchen ${kitchenId} added to Supplier ${supplierId}.`);
    } catch (error) {
      console.error('[useSupplier] Error adding kitchen to supplier:', error);
    }
  };

  // Remove a kitchen from the supplier's list
  const removeKitchenFromSupplier = async (supplierId, kitchenId) => {
    if (!currentUser.value) {
      console.error('[useSupplier] User not authenticated.');
      return;
    }

    try {
      const supplierRef = doc(db, 'suppliers', supplierId);
      await updateDoc(supplierRef, {
        kitchens: arrayRemove(kitchenId),
      });

      console.log(`[useSupplier] Kitchen ${kitchenId} removed from Supplier ${supplierId}.`);
    } catch (error) {
      console.error('[useSupplier] Error removing kitchen from supplier:', error);
    }
  };

  return {
    currentSupplier: computed(() => currentSupplier?.value || null),
    createSupplier,
    deleteSupplier,
    addKitchenToSupplier,
    removeKitchenFromSupplier,
  };
};
