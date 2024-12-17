import { computed } from "vue";
import { useCurrentUser, useDocument, useFirestore } from "vuefire";
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from "firebase/firestore";

export const useRecruiter = () => {
  const db = useFirestore();
  const currentUser = useCurrentUser();

  // Get the current user's Recruiter profile
  const currentRecruiterDocRef = computed(() =>
    currentUser.value ? doc(db, "recruiters", currentUser.value.uid) : null
  );
  const { data: currentRecruiter } = useDocument(currentRecruiterDocRef);

  // Create a new Recruiter profile
  const createRecruiter = async (data = {}) => {
    if (!currentUser.value) {
      console.error("[useRecruiter] User not authenticated.");
      return;
    }

    const { uid } = currentUser.value;
    const recruiterRef = doc(db, "recruiters", uid);

    const recruiterData = {
      id: uid,
      createdAt: new Date().toISOString(),
      ...data, // Additional data passed during creation
    };

    try {
      await setDoc(recruiterRef, recruiterData);

      const miseboxUserRef = doc(db, "misebox-users", uid);
      await updateDoc(miseboxUserRef, {
        user_apps: arrayUnion("recruiters"),
      });

      console.log("[useRecruiter] Recruiter profile created successfully.");
    } catch (error) {
      console.error("[useRecruiter] Error creating Recruiter profile:", error);
    }
  };

  // Delete the current Recruiter profile
  const deleteRecruiter = async () => {
    if (!currentUser.value) {
      console.error("[useRecruiter] User not authenticated.");
      return;
    }

    const { uid } = currentUser.value;
    const recruiterRef = doc(db, "recruiters", uid);

    try {
      await deleteDoc(recruiterRef);

      const miseboxUserRef = doc(db, "misebox-users", uid);
      await updateDoc(miseboxUserRef, {
        user_apps: arrayRemove("recruiters"),
      });

      console.log("[useRecruiter] Recruiter profile deleted successfully.");
    } catch (error) {
      console.error("[useRecruiter] Error deleting Recruiter profile:", error);
    }
  };

  return {
    currentRecruiter: computed(() => currentRecruiter?.value || null),
    createRecruiter,
    deleteRecruiter,
  };
};
