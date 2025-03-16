
import { Recipe } from "@/services/recipeService";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";

interface DetailsTabProps {
  recipe: Recipe;
}

const DetailsTab = ({ recipe }: DetailsTabProps) => {
  // Convert to uppercase first letter
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  return (
    <div>
      {recipe.dietLabels.length > 0 && (
        <div>
          <h3 className="font-medium mb-2">Diet</h3>
          <div className="flex flex-wrap gap-2">
            {recipe.dietLabels.map(label => (
              <Badge key={label} variant="secondary" className="px-2.5 py-1">
                {label}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {recipe.healthLabels.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Health Labels</h3>
          <div className="flex flex-wrap gap-2">
            {recipe.healthLabels
              .filter(label => !label.includes("_"))
              .map(label => (
                <Badge key={label} variant="outline" className="px-2.5 py-1">
                  {capitalize(label.replace(/-/g, ' '))}
                </Badge>
              ))
            }
          </div>
        </div>
      )}
      
      <div className="mt-4">
        <h3 className="font-medium mb-2">Category</h3>
        <div className="grid grid-cols-2 gap-2">
          {recipe.cuisineType?.length > 0 && (
            <div>
              <span className="text-sm text-muted-foreground">Cuisine</span>
              <p className="mt-1">{recipe.cuisineType.map(capitalize).join(', ')}</p>
            </div>
          )}
          
          {recipe.mealType?.length > 0 && (
            <div>
              <span className="text-sm text-muted-foreground">Meal Type</span>
              <p className="mt-1">{recipe.mealType.map(capitalize).join(', ')}</p>
            </div>
          )}
          
          {recipe.dishType?.length > 0 && (
            <div>
              <span className="text-sm text-muted-foreground">Dish Type</span>
              <p className="mt-1">{recipe.dishType.map(capitalize).join(', ')}</p>
            </div>
          )}
        </div>
      </div>
      
      {recipe.cautions.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Cautions</h3>
          <div className="flex flex-wrap gap-2">
            {recipe.cautions.map(caution => (
              <Badge key={caution} variant="destructive" className="px-2.5 py-1">
                {caution}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      <div className="pt-4">
        <Separator />
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Recipe data provided by <a href="https://www.edamam.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Edamam</a></p>
          <p className="mt-1">
            <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
              View original recipe
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailsTab;
