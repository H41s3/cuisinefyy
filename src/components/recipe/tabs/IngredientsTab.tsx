
import { Recipe } from "@/services/recipeService";

interface IngredientsTabProps {
  recipe: Recipe;
}

const IngredientsTab = ({ recipe }: IngredientsTabProps) => {
  return (
    <div>
      <h3 className="font-medium text-lg">Ingredients</h3>
      <p className="text-sm text-muted-foreground">
        {recipe.ingredientLines.length} items
      </p>
      
      <ul className="mt-3 space-y-2">
        {recipe.ingredientLines.map((ingredient, index) => (
          <li key={index} className="flex items-start">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-0.5 text-xs">
              {index + 1}
            </span>
            <span className="text-sm">{ingredient}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsTab;
