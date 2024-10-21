// useField.js
import { ref } from 'vue';
import { doc, updateDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

export function useField(props) {
  const firestore = useFirestore();

  const isEditing = ref(false);
  const errorMessage = ref('');

  // Initialize vModel based on the type of firebaseValue
  const vModel = ref(
    typeof props.firebaseValue === 'object' && props.firebaseValue !== null
      ? { ...props.firebaseValue }
      : props.firebaseValue || ''
  );

  // Start editing function
  const startEditing = () => {
    errorMessage.value = '';
    isEditing.value = true;
    vModel.value =
      typeof props.firebaseValue === 'object' && props.firebaseValue !== null
        ? { ...props.firebaseValue }
        : props.firebaseValue || '';
  };

  // Cancel editing function
  const cancelEditing = () => {
    errorMessage.value = '';
    isEditing.value = false;
    vModel.value =
      typeof props.firebaseValue === 'object' && props.firebaseValue !== null
        ? { ...props.firebaseValue }
        : props.firebaseValue || '';
  };

  // Validate input function
  const validateInput = async () => {
    errorMessage.value = '';
    const value = vModel.value;

    if (props.validationFunction) {
      const validationResult = await props.validationFunction(value);
      if (validationResult) {
        errorMessage.value = validationResult;
        return false;
      }
    }
    return true;
  };

  // Update field function
  const updateField = async () => {
    if (!props.documentID || !props.collectionName || !props.target) {
      console.error('Missing required props for Firestore update');
      errorMessage.value = 'Configuration error.';
      return;
    }

    const isValid = await validateInput();
    if (!isValid) return;

    const formattedValue = props.formattingFunction
      ? props.formattingFunction(vModel.value)
      : vModel.value;

    try {
      const documentRef = doc(firestore, props.collectionName, props.documentID);
      await updateDoc(documentRef, { [props.target]: formattedValue });
      errorMessage.value = '';
    } catch (error) {
      console.error('Error updating document:', error);
      errorMessage.value = 'Failed to update field.';
    }
  };

  // Delete field function
  const deleteField = async () => {
    vModel.value = typeof vModel.value === 'object' ? {} : ''; // Clear the field
    await updateField();
    isEditing.value = true; // Keep the editing panel open
  };

  return {
    isEditing,
    vModel,
    errorMessage,
    startEditing,
    cancelEditing,
    validateInput,
    updateField,
    deleteField,
  };
}
