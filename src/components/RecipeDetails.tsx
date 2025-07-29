import { DialogTitle } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Recipe } from "@/services/recipeService";
import RecipeHeader from "./recipe/RecipeHeader";
import RecipeInfoBar from "./recipe/RecipeInfoBar";
import IngredientsTab from "./recipe/tabs/IngredientsTab";
import NutritionTab from "./recipe/tabs/NutritionTab";
import DetailsTab from "./recipe/tabs/DetailsTab";
import RecipeFooter from "./recipe/RecipeFooter";

interface RecipeDetailsProps {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeDetails = ({ recipe, onClose }: RecipeDetailsProps) => {
  return (
    <div className="h-full flex flex-col">
      {/* Accessibility title (visually hidden) */}
      <DialogTitle className="sr-only">
        Recipe Details - {recipe.label}
      </DialogTitle>

      {/* Header */}
      <div className="flex-shrink-0">
        <RecipeHeader recipe={recipe} onClose={onClose} />
        <RecipeInfoBar recipe={recipe} />
      </div>

      {/* Tabs */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <Tabs defaultValue="ingredients" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 flex-shrink-0">
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent 
            value="ingredients" 
            className="flex-1 mt-4 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col"
          >
            <IngredientsTab recipe={recipe} />
          </TabsContent>
          
          <TabsContent 
            value="nutrition" 
            className="flex-1 mt-4 overflow-y-auto"
          >
            <NutritionTab recipe={recipe} />
          </TabsContent>
          
          <TabsContent 
            value="details" 
            className="flex-1 mt-4 overflow-y-auto"
          >
            <DetailsTab recipe={recipe} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 mt-4">
        <RecipeFooter recipe={recipe} />
      </div>
    </div>
  );
};

export default RecipeDetails;
