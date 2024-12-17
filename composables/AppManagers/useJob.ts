import { computed } from "vue";
import { useCurrentUser, useFirestore } from "vuefire";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";

export const useJob = () => {
  const db = useFirestore();
  const currentUser = useCurrentUser();
  const jobsCollectionRef = collection(db, "jobs");

  // Create a new Job
  const createJob = async (jobData = {}) => {
    if (!currentUser.value) {
      console.error("[useJob] User not authenticated.");
      return null;
    }

    const { uid } = currentUser.value;
    const recruiterId = uid;
    const jobRef = doc(jobsCollectionRef);

    const newJobData = {
      id: jobRef.id,
      createdAt: new Date().toISOString(),
      recruiterId,
      ...jobData, // Additional job data passed during creation
    };

    try {
      // Add the new job to Firestore
      await setDoc(jobRef, newJobData);

      // Update the recruiter's profile with the new job
      const recruiterDocRef = doc(db, "recruiters", recruiterId);
      await updateDoc(recruiterDocRef, {
        jobs: arrayUnion({
          id: jobRef.id,
          title: newJobData.title || "Untitled Job",
        }),
      });

      console.log("[useJob] Job created successfully:", jobRef.id);
      return jobRef.id;
    } catch (error) {
      console.error("[useJob] Error creating job:", error);
      return null;
    }
  };

  // Delete an existing Job
  const deleteJob = async (jobId) => {
    if (!currentUser.value) {
      console.error("[useJob] User not authenticated.");
      return false;
    }

    try {
      const jobDocRef = doc(jobsCollectionRef, jobId);
      const jobSnapshot = await jobDocRef.get();

      if (!jobSnapshot.exists) {
        console.error("[useJob] Job does not exist.");
        return false;
      }

      const jobData = jobSnapshot.data();

      if (jobData.recruiterId !== currentUser.value.uid) {
        console.error("[useJob] Unauthorized. Only the creator can delete this job.");
        return false;
      }

      // Delete the job from Firestore
      await deleteDoc(jobDocRef);

      // Remove the job from the recruiter's profile
      const recruiterDocRef = doc(db, "recruiters", currentUser.value.uid);
      await updateDoc(recruiterDocRef, {
        jobs: arrayRemove({ id: jobId, title: jobData.title }),
      });

      console.log("[useJob] Job deleted successfully:", jobId);
      return true;
    } catch (error) {
      console.error("[useJob] Error deleting job:", error);
      return false;
    }
  };

  return {
    createJob,
    deleteJob,
  };
};
