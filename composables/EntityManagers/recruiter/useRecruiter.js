// composables/EntityManagers/recruiter/useRecruiter.js
// ============================
// composables/EntityManagers/recruiter/useRecruiter.js
// ============================

import { useFirestore, useDocument, useCollection, useCurrentUser } from "vuefire";
import { doc, collection } from "firebase/firestore";

export function useRecruiter() {
  const db = useFirestore();
  const currentUser = useCurrentUser();

  // Current Recruiter Document
  const currentRecruiterRef = computed(() =>
    currentUser.value ? doc(db, "recruiters", currentUser.value.uid) : null
  );
  const { data: currentRecruiter } = useDocument(currentRecruiterRef);

  // Fetch a specific Recruiter by ID
  function fetchRecruiter(id) {
    const recruiterRef = computed(() =>
      currentUser.value && id ? doc(db, "recruiters", id) : null
    );
    const { data: recruiter } = useDocument(recruiterRef);
    return recruiter;
  }

  // Fetch all Recruiters
  function recruitersCollection() {
    const recruitersRef = computed(() =>
      currentUser.value ? collection(db, "recruiters") : null
    );
    const { data: recruiters } = useCollection(recruitersRef);
    return recruiters;
  }

  // Expose the functionalities
  return {
    ...useRecruiterCreate(),
    ...useRecruiterUpdate(),
    ...useRecruiterDelete(),
    ...useRecruiterLinking(),
    ...useRecruiterSubcollection(),
    currentRecruiter,
    fetchRecruiter,
    recruitersCollection,
  };
}
