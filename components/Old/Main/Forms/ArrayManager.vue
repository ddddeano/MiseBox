<template>
  <div>
    <ReusablesChevronHeader
      :title="title"
      :expanded="expanded"
      @toggle="toggleExpand"
      class="chevron-header"
    />

    <div v-if="expanded" class="array-manager">
      <div v-if="state === 'display'" @click="state = 'edit'">
        <div v-for="item in items" :key="item" class="item-field cell-container">
          <div class="item-content cell" v-html="renderContent(item, target)"></div>
        </div>
      </div>

      <div v-if="state === 'edit'">
        <div v-for="item in items" :key="item" class="edit-item cell-container">
          <div class="item-content cell" v-html="renderContent(item, target)"></div>
          <XCircleIcon class="icon delete-icon" @click="deleteItem(item)" />
        </div>

        <div v-if="createState && state === 'edit'" class="create-form">
          <slot name="create" />
          <div class="icon-container">
            <XCircleIcon class="icon cancel-icon" type="button" @click="toggleCreateMode" />
          </div>
        </div>

        <div class="icon-container">
          <PlusCircleIcon v-if="!createState" @click="toggleCreateMode" class="icon add-icon" />
          <MinusCircleIcon v-if="!createState" @click="collapseSection" class="icon cancel-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import { useItemRenderer } from '@/composables/useItemRenderer';

const props = defineProps({
  userId: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  items: {
    type: Array,
    default: () => [],
  },
  isEditing: {
    type: Boolean,
    default: false
  },
  collectionName: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: "",
  }
});

const expanded = ref(false);
const state = ref("display");
const createState = ref(false);

const firestore = useFirestore();

// Watch for changes in isEditing prop to update state and expanded
watch(() => props.isEditing, (newVal) => {
  if (newVal) {
    state.value = 'edit';
    expanded.value = true;
  } else {
    state.value = 'display';
    if (!props.items.length) {
      expanded.value = false;
    }
  }
});

const toggleExpand = () => {
  expanded.value = !expanded.value;

  if (expanded.value && !props.items.length) {
    console.log('No items, switching to edit mode with create.');
    state.value = 'edit';
    createState.value = true;
  } else {
    console.log('Items exist or not expanded, keeping edit mode.');
    state.value = 'edit';
    createState.value = false;
  }
};

const toggleCreateMode = () => {
  createState.value = !createState.value;
  
  // If closing the create mode and there are no items, collapse the section
  if (!createState.value && !props.items.length) {
    expanded.value = false;
  }
  
  console.log('Toggled create mode:', createState.value);
};

// Method to collapse the section manually
const collapseSection = () => {
  expanded.value = false;
  console.log('Section manually collapsed.');
};

const deleteItem = async (item) => {
  try {
    const documentRef = doc(firestore, props.collectionName, props.userId);
    await updateDoc(documentRef, {
      [props.target]: arrayRemove(item)
    });
  } catch (err) {
    console.error(`Failed to delete item:`, err);
  }
};

// Use the custom item renderer composable
const { renderContent } = useItemRenderer();
</script>
