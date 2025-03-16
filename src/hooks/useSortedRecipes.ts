import { useMemo } from "react";
import { Recipe } from "@/services/recipeService";

export type SortOption = "default" | "calories-asc" | "calories-desc" | "alpha-asc" | "alpha-desc";

export const useSortedRecipes = (recipes: Recipe[], sortOption: SortOption) => {
    return useMemo(() => {
        // Create a copy to avoid mutating the original array
        const sortedRecipes = [...recipes];

        switch (sortOption) {
            case "calories-asc":
                return sortedRecipes.sort((a, b) => a.calories - b.calories);
            case "calories-desc":
                return sortedRecipes.sort((a, b) => b.calories - a.calories);
            case "alpha-asc":
                return sortedRecipes.sort((a, b) => a.label.localeCompare(b.label));
            case "alpha-desc":
                return sortedRecipes.sort((a, b) => b.label.localeCompare(a.label));
            default:
                return sortedRecipes;
        }
    }, [recipes, sortOption]);
};

export default useSortedRecipes;