import { ref } from 'vue';
import { doc, updateDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

export function useField(props) {
  const firestore = useFirestore();

  const isEditing = ref(false);
  const errorMessage = ref('');

  // Initialize vModel based on the type of firebaseValue
  const vModel = ref(props.firebaseValue || '');

  // Start editing function
  const startEditing = () => {
    errorMessage.value = ''; // Reset the error message
    vModel.value = props.firebaseValue || ''; // Initialize vModel
    isEditing.value = true; // Enter edit mode
  };

  // Cancel editing function
  const cancelEditing = () => {
    errorMessage.value = ''; // Clear error on cancel
    vModel.value = props.firebaseValue || ''; // Reset the value
    isEditing.value = false; // Exit edit mode
  };

  // Validate input function
  const validateInput = async () => {
    errorMessage.value = ''; // Reset error
    const value = vModel.value;

    // Run the validation function, if provided
    if (props.validationFunction) {
      const validationResult = await props.validationFunction(value);
      if (validationResult) {
        errorMessage.value = validationResult;
        return false; // Validation failed
      }
    }
    return true; // Validation succeeded
  };

  // Update field function
  const updateField = async () => {
    if (!props.documentID || !props.collectionName || !props.target) {
      console.error('Missing required props for Firestore update');
      errorMessage.value = 'Configuration error.';
      return;
    }

    const isValid = await validateInput();
    if (!isValid) return; // Stop if validation fails

    const formattedValue = props.formattingFunction
      ? props.formattingFunction(vModel.value)
      : vModel.value;

    try {
      const documentRef = doc(firestore, props.collectionName, props.documentID);
      await updateDoc(documentRef, { [props.target]: formattedValue });
      errorMessage.value = ''; // Clear error on success
    } catch (error) {
      console.error('Error updating document:', error);
      errorMessage.value = 'Failed to update field.'; // Set error message
    }
  };

  // Delete field function
  const deleteField = async () => {
    vModel.value = ''; // Clear the field
    await updateField(); // Update Firestore
    isEditing.value = true; // Keep the editing panel open
  };

  return {
    isEditing,
    vModel,
    errorMessage,
    startEditing,
    cancelEditing,
    updateField,
    deleteField,
  };
}
