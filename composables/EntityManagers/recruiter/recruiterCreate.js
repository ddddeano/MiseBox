// composables/EntityManagers/recruiter/recruiterCreate.js
import { arrayUnion, } from 'firebase/firestore';

export function useRecruiterCreate() {
  const { createEntity, updateEntity } = useMiseboxFirestore();

  const createRecruiter = async (newRecruiter) => {
    try {
      if (!newRecruiter || typeof newRecruiter !== "object") {
        throw new Error("[createRecruiter] Invalid input. Must be an object.");
      }

      // Save the Recruiter profile in Firestore
      await createEntity("recruiters", { ...newRecruiter });

      console.log("[createRecruiter] Recruiter profile created successfully:", newRecruiter);

      // Update the Misebox User's user_apps field
      await updateEntity("misebox-users", {
        user_apps: arrayUnion("recruiters"),
      });

      console.log("[createRecruiter] Misebox User's user_apps updated with 'recruiters'.");
    } catch (error) {
      console.error("[createRecruiter] Error creating Recruiter profile:", error.message);
      throw error;
    }
  };

  return { createRecruiter };
}
