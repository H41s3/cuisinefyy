
import { Recipe } from "@/services/recipeService";

interface NutritionTabProps {
  recipe: Recipe;
}

const NutritionTab = ({ recipe }: NutritionTabProps) => {
  return (
    <div>
      <h3 className="font-medium text-lg">Nutrition Information</h3>
      <p className="text-sm text-muted-foreground">
        Per serving, based on {recipe.yield} servings
      </p>
      
      <div className="mt-4 space-y-3">
        {Object.entries(recipe.totalNutrients)
          .filter(([key]) => [
            'ENERC_KCAL', 'FAT', 'FASAT', 'CHOCDF', 'FIBTG', 'SUGAR', 'PROCNT', 'CHOLE', 'NA'
          ].includes(key))
          .map(([key, nutrient]) => {
            const perServing = nutrient.quantity / recipe.yield;
            return (
              <div key={key} className="flex justify-between py-2 border-b border-border/50">
                <span className="text-sm">{nutrient.label}</span>
                <span className="text-sm font-medium">
                  {Math.round(perServing)} {nutrient.unit}
                </span>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default NutritionTab;
