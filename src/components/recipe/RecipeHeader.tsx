
import { useState } from "react";
import { Recipe } from "@/services/recipeService";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RecipeHeaderProps {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeHeader = ({ recipe, onClose }: RecipeHeaderProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative flex-shrink-0">
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
      <div className="absolute top-2 right-2 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="bg-black/50 text-white hover:bg-black/70 rounded-full h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-muted">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse" />
        )}
        <img
          src={recipe.image}
          alt={recipe.label}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <h2 className="text-white text-xl font-medium drop-shadow-md">
          {recipe.label}
        </h2>
        <div className="flex items-center text-white/90 text-sm mt-1">
          <span className="opacity-90">{recipe.source}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeHeader;
