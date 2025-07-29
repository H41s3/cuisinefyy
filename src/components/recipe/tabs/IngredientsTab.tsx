
import { Recipe } from "@/services/recipeService";

interface IngredientsTabProps {
  recipe: Recipe;
}

const IngredientsTab = ({ recipe }: IngredientsTabProps) => {
  return (
    <div className="space-y-4">
      <div className="px-2">
        <h3 className="font-medium text-lg">Ingredients</h3>
        <p className="text-sm text-muted-foreground">
          {recipe.ingredientLines.length} items
        </p>
      </div>
      
      <div className="h-64 overflow-y-auto border rounded-lg p-4">
        <ul className="space-y-2">
          {recipe.ingredientLines.map((ingredient, index) => (
            <li key={index} className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center mr-3 mt-0.5">
                {index + 1}
              </span>
              <span className="text-sm leading-relaxed">{ingredient}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IngredientsTab;
