import { Recipe } from "@/services/recipeService";
import RecipeCard from "@/components/RecipeCard";
import { cn } from "@/lib/utils";
import { SortOption } from "@/hooks/useSortedRecipes";

interface RecipeListProps {
  recipes: Recipe[];
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

const RecipeList = ({ recipes, sortOption, onSortChange }: RecipeListProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="text-sm p-1 border rounded bg-background focus-ring"
          >
            <option value="default">Default</option>
            <option value="calories-asc">Calories (Low to High)</option>
            <option value="calories-desc">Calories (High to Low)</option>
            <option value="alpha-asc">Name (A-Z)</option>
            <option value="alpha-desc">Name (Z-A)</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe, index) => (
          <div 
            key={recipe.uri} 
            className="animate-fade-in"
            style={{
              animationFillMode: "forwards",
              animationDelay: `${index * 100}ms`,
            }}
          >
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
