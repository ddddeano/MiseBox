<!-- components/organisms/Kitchen/Fields/Recipes.vue -->
<template>
  <div class="recipe-item">
    <div v-if="mode === 'display'" class="display-mode">
      <div>
        <strong>{{ recipe.name }}</strong>
      </div>
      <div>{{ recipe.description }}</div>
      <div>
        <strong>Ingredients:</strong>
        <ul>
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
            {{ ingredient.name }} - {{ ingredient.quantity }}
          </li>
        </ul>
      </div>
    </div>

    <div v-else-if="mode === 'create'" class="create-mode">
      <div class="form-group">
        <label for="recipe-name" class="label">Recipe Name</label>
        <input
          type="text"
          id="recipe-name"
          v-model="localData.name"
          placeholder="Enter recipe name"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="recipe-description" class="label">Description</label>
        <textarea
          id="recipe-description"
          v-model="localData.description"
          placeholder="Enter recipe description (optional)"
          class="editable-input"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="recipe-ingredients" class="label">Ingredients</label>
        <textarea
          id="recipe-ingredients"
          v-model="localData.ingredientsInput"
          placeholder="Enter ingredients (e.g., '2 cups flour, 1 tsp salt')"
          class="editable-input"
        ></textarea>
      </div>

      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitCreate" />
      </div>
    </div>

    <div v-else-if="mode === 'edit'" class="edit-mode">
      <div class="form-group">
        <label for="recipe-name" class="label">Recipe Name</label>
        <input
          type="text"
          id="recipe-name"
          v-model="localData.name"
          placeholder="Enter recipe name"
          class="editable-input"
        />
      </div>

      <div class="form-group">
        <label for="recipe-description" class="label">Description</label>
        <textarea
          id="recipe-description"
          v-model="localData.description"
          placeholder="Enter recipe description (optional)"
          class="editable-input"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="recipe-ingredients" class="label">Ingredients</label>
        <textarea
          id="recipe-ingredients"
          v-model="localData.ingredientsInput"
          placeholder="Edit ingredients (e.g., '2 cups flour, 1 tsp salt')"
          class="editable-input"
        ></textarea>
      </div>

      <div class="icon-group">
        <CheckCircleIcon class="icon" @click="submitEdit" />
        <TrashIcon class="icon" @click="submitDelete" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true, // The ID of the kitchen document
  },
  recipe: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  mode: {
    type: String,
    required: true,
    validator: (value) => ["display", "edit", "create"].includes(value),
  },
  index: {
    type: Number,
    required: false,
  },
});

const { createKitchenArrayHelpers } = useKitchen();
const {
  addKitchenArrayItem,
  updateKitchenArrayItem,
  removeKitchenArrayItem,
} = createKitchenArrayHelpers(props.id);

const localData = ref({
  name: props.recipe.name || "",
  description: props.recipe.description || "",
  ingredientsInput: props.recipe.ingredients
    ? props.recipe.ingredients.map(
        (ing) => `${ing.name} - ${ing.quantity}`
      ).join(", ")
    : "",
});

// Parse ingredients from input
function parseIngredients(input) {
  return input.split(",").map((item) => {
    const [name, quantity] = item.trim().split("-");
    return { name: name.trim(), quantity: quantity?.trim() || "" };
  });
}

// Create a new recipe entry
async function submitCreate() {
  try {
    const recipeData = {
      ...localData.value,
      ingredients: parseIngredients(localData.value.ingredientsInput),
    };
    await addKitchenArrayItem("recipes", recipeData);
    console.log("Recipe added successfully.");
  } catch (error) {
    console.error("Error adding recipe:", error);
  }
}

// Edit an existing recipe entry
async function submitEdit() {
  try {
    const recipeData = {
      ...localData.value,
      ingredients: parseIngredients(localData.value.ingredientsInput),
    };
    await updateKitchenArrayItem("recipes", props.index, recipeData);
    console.log("Recipe updated successfully.");
  } catch (error) {
    console.error("Error updating recipe:", error);
  }
}

// Delete a recipe entry
async function submitDelete() {
  try {
    await removeKitchenArrayItem("recipes", props.index);
    console.log("Recipe deleted successfully.");
  } catch (error) {
    console.error("Error deleting recipe:", error);
  }
}
</script>
