
import { Recipe } from "@/services/recipeService";
import { Flame, Clock, Users } from "lucide-react";

interface RecipeInfoBarProps {
  recipe: Recipe;
}

const RecipeInfoBar = ({ recipe }: RecipeInfoBarProps) => {
  // Format number with commas for thousands
  const formatNumber = (num: number) => {
    return Math.round(num).toLocaleString();
  };

  return (
    <div className="grid grid-cols-3 gap-1 py-3 px-4 border-b flex-shrink-0">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center text-muted-foreground mb-1">
          <Flame className="w-4 h-4 mr-1" />
          <span className="text-xs">Calories</span>
        </div>
        <span className="font-medium">{formatNumber(recipe.calories)}</span>
      </div>
      
      <div className="flex flex-col items-center justify-center border-l border-r px-2">
        <div className="flex items-center text-muted-foreground mb-1">
          <Clock className="w-4 h-4 mr-1" />
          <span className="text-xs">Cook Time</span>
        </div>
        <span className="font-medium">{recipe.totalWeight > 1000 ? '60+ min' : '30+ min'}</span>
      </div>
      
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center text-muted-foreground mb-1">
          <Users className="w-4 h-4 mr-1" />
          <span className="text-xs">Servings</span>
        </div>
        <span className="font-medium">{recipe.yield}</span>
      </div>
    </div>
  );
};

export default RecipeInfoBar;
