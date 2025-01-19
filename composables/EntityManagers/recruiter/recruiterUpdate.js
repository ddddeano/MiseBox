// composables/EntityManagers/recruiter/recruiterUpdate.js
// ============================
// composables/EntityManagers/recruiter/recruiterUpdate.js
// ============================

import { useCurrentUser } from "vuefire";

export function useRecruiterUpdate() {
  const { updateEntity } = useMiseboxFirestore();
  const currentUser = useCurrentUser();

  const updateRecruiter = async (updates) => {
    try {
      const recruiterId = currentUser.value?.uid;
      if (!recruiterId) {
        throw new Error("[updateRecruiter] No authenticated user found.");
      }

      // Update the recruiter document
      await updateEntity("recruiters", recruiterId, updates);

      console.log("[updateRecruiter] Recruiter profile updated successfully:", updates);
    } catch (error) {
      console.error("[updateRecruiter] Error updating recruiter profile:", error.message);
      throw error;
    }
  };

  return { updateRecruiter };
}
