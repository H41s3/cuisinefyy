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
      <DialogTitle className="sr-only">{recipe.label}</DialogTitle>
      
      {/* Header with image */}
      <RecipeHeader recipe={recipe} onClose={onClose} />
      
      {/* Quick info bar */}
      <RecipeInfoBar recipe={recipe} />
      
      {/* Content tabs */}
      <Tabs defaultValue="ingredients" className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 border-b flex-shrink-0">
          <TabsList className="w-full justify-start h-auto p-0 bg-transparent space-x-4">
            <TabsTrigger value="ingredients" className="pb-2 pt-2 px-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">Ingredients</TabsTrigger>
            <TabsTrigger value="nutrition" className="pb-2 pt-2 px-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">Nutrition</TabsTrigger>
            <TabsTrigger value="details" className="pb-2 pt-2 px-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">Details</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent 
            value="ingredients" 
            className="h-full overflow-y-auto p-4 pb-20"
          >
            <IngredientsTab recipe={recipe} />
          </TabsContent>
          
          <TabsContent 
            value="nutrition" 
            className="h-full overflow-y-auto p-4 pb-20"
          >
            <NutritionTab recipe={recipe} />
          </TabsContent>
          
          <TabsContent 
            value="details" 
            className="h-full overflow-y-auto p-4 pb-20"
          >
            <DetailsTab recipe={recipe} />
          </TabsContent>
        </div>
      </Tabs>

      {/* Sticky button at the bottom */}
      <RecipeFooter recipe={recipe} />
    </div>
  );
};

export default RecipeDetails;
