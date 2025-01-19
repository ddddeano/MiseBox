// composables/ObjectManagers/job/jobCreate.js
// ============================
// composables/ObjectManagers/job/jobCreate.js
// ============================

export function useJobCreate() {
  const { createObject } = useMiseboxFirestore();

  const createJob = async (newJob) => {
    try {
      if (!newJob || typeof newJob !== "object") {
        throw new Error("[createJob] Invalid input. Must be an object.");
      }

      // Use `createObject` to handle Firestore creation and metadata
      const jobId = await createObject("jobs", {
        ...newJob
    }
  );
      console.log(`[createJob] Job created successfully with ID: ${jobId}`);
      return jobId;
    } catch (error) {
      console.error("[createJob] Error creating job:", error.message);
      throw error;
    }
  };

  return { createJob };
}
