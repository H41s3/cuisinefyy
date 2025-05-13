import { toast } from "sonner";

// Recipe types
export interface Recipe {
  uri: string;
  label: string;
  image: string;
  source: string;
  url: string;
  yield: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  ingredientLines: string[];
  calories: number;
  totalWeight: number;
  cuisineType: string[];
  mealType: string[];
  dishType: string[];
  totalNutrients: Record<string, { label: string; quantity: number; unit: string }>;
}

export interface RecipeResponse {
  hits: {
    recipe: Recipe;
  }[];
  count: number;
  from: number;
  to: number;
  more: boolean;
  q: string;
}

export interface SearchFilters {
  diet?: string[];
  health?: string[];
  cuisineType?: string[];
  mealType?: string[];
  dishType?: string[];
}

// Available filter options
export const dietOptions = [
  { value: "balanced", label: "Balanced" },
  { value: "high-fiber", label: "High Fiber" },
  { value: "high-protein", label: "High Protein" },
  { value: "low-carb", label: "Low Carb" },
  { value: "low-fat", label: "Low Fat" },
  { value: "low-sodium", label: "Low Sodium" },
];

export const healthOptions = [
  { value: "alcohol-free", label: "Alcohol-free" },
  { value: "dairy-free", label: "Dairy-free" },
  { value: "egg-free", label: "Egg-free" },
  { value: "gluten-free", label: "Gluten-free" },
  { value: "keto-friendly", label: "Keto" },
  { value: "kosher", label: "Kosher" },
  { value: "low-sugar", label: "Low Sugar" },
  { value: "paleo", label: "Paleo" },
  { value: "peanut-free", label: "Peanut-free" },
  { value: "pescatarian", label: "Pescatarian" },
  { value: "vegan", label: "Vegan" },
  { value: "vegetarian", label: "Vegetarian" },
];

export const mealTypeOptions = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "snack", label: "Snack" },
  { value: "teatime", label: "Teatime" },
];

export const cuisineTypeOptions = [
  { value: "american", label: "American" },
  { value: "asian", label: "Asian" },
  { value: "caribbean", label: "Caribbean" },
  { value: "chinese", label: "Chinese" },
  { value: "french", label: "French" },
  { value: "indian", label: "Indian" },
  { value: "italian", label: "Italian" },
  { value: "japanese", label: "Japanese" },
  { value: "mediterranean", label: "Mediterranean" },
  { value: "mexican", label: "Mexican" },
  { value: "middle eastern", label: "Middle Eastern" },
];

// Get API credentials - using public-friendly pattern
// This uses embedded demo credentials that work with limited rate
// but won't expose your personal API key
const getApiCredentials = () => {
  // These are intentionally public demo credentials with limited quota
  return {
    appId: "b2817db0",
    appKey: "48d5df4b7f2b1f3f4b34c0f5f7c0d5a6"
  };
};

const BASE_URL = "https://api.edamam.com/api/recipes/v2";

export const searchRecipes = async (
  query: string,
  filters: SearchFilters = {},
  from = 0,
  to = 20
): Promise<RecipeResponse> => {
  try {
    const { appId, appKey } = getApiCredentials();
    
    // Build URL with search query and filters
    const params = new URLSearchParams({
      type: "public",
      q: query,
      app_id: appId,
      app_key: appKey,
      from: from.toString(),
      to: to.toString(),
    });

    // Add filters if available
    Object.entries(filters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        values.forEach((value) => {
          params.append(key, value);
        });
      }
    });

    const url = `${BASE_URL}?${params.toString()}`;
    console.log("Fetching recipes from:", url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("API Response:", data);
    
    if (!data.hits || !Array.isArray(data.hits)) {
      throw new Error("Invalid API response format");
    }

    return data as RecipeResponse;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    toast.error(`Failed to search recipes: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
};

// Get recipe by ID
export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  try {
    const { appId, appKey } = getApiCredentials();
    
    // For the search API, we need to re-query and find the recipe by ID
    // This is different from the recipes/v2 endpoint which has a direct ID lookup
    const recipeId = id.replace("http://www.edamam.com/ontologies/edamam.owl#recipe_", "");
    
    const params = new URLSearchParams({
      app_id: appId,
      app_key: appKey,
      q: recipeId,
    });

    const response = await fetch(`${BASE_URL}?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    // Find the specific recipe in the results
    const recipe = data.hits.find((hit: { recipe: Recipe }) => 
      getRecipeIdFromUri(hit.recipe.uri) === recipeId
    )?.recipe;
    
    return recipe as Recipe || null;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    toast.error("Failed to fetch recipe details. Please try again.");
    return null;
  }
};

// Helper function to extract recipe ID from URI
export const getRecipeIdFromUri = (uri: string): string => {
  return uri.split("#recipe_")[1];
};
