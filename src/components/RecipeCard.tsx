import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Recipe } from "@/services/recipeService";
import { Clock, Droplet, ThermometerSun, Utensils, Users, X } from "lucide-react";
import { cn } from "@/lib/utils";
import RecipeDetails from "./RecipeDetails";
import FavoriteButton from "./FavoriteButton";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface RecipeCardProps {
  recipe: Recipe;
  className?: string;
}

const RecipeCard = ({ recipe, className }: RecipeCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    setIsLoaded(false);
  }, [recipe.image]);

  const formatNumber = (num: number) => {
    return Math.round(num).toLocaleString();
  };

  const Shimmer = () => (
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  );

  // Extract first cuisine, meal, and dish type for display
  const primaryCuisine = recipe.cuisineType?.[0];
  const primaryMealType = recipe.mealType?.[0];
  const primaryDishType = recipe.dishType?.[0];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card 
          className={cn(
            "overflow-hidden border cursor-pointer group relative",
            "transform transition-all duration-300 hover:shadow-md hover:shadow-purple-500/20",
            "bg-card/90 backdrop-blur-sm purple-border-glow hover:-translate-y-1",
            className
          )}
          onClick={(e) => {
            if (window.matchMedia('(pointer: coarse)').matches) {
              e.stopPropagation();
            }
          }}
        >
          <div className="relative w-full h-48 overflow-hidden">
            {!isLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                <Utensils className="h-8 w-8 text-muted-foreground/40" />
                <Shimmer />
              </div>
            )}
            <img
              src={recipe.image}
              alt={recipe.label}
              className={cn(
                "w-full h-48 object-cover transition-all duration-500",
                isLoaded ? "opacity-100" : "opacity-0",
                "group-hover:scale-105"
              )}
              onLoad={() => setIsLoaded(true)}
            />
            
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
            
            {recipe.dietLabels.length > 0 && (
              <div className="absolute top-2 left-2">
                <Badge 
                  className="bg-primary/80 hover:bg-primary text-white backdrop-blur-standard px-2 py-1 text-xs" 
                  variant="default"
                >
                  {recipe.dietLabels[0]}
                </Badge>
              </div>
            )}
            
            <div className="absolute top-2 right-2">
              <FavoriteButton recipe={recipe} size="sm" />
            </div>
            
            <div className="absolute bottom-2 right-2">
              <Badge 
                className="bg-black/70 hover:bg-black/80 text-white backdrop-blur-standard px-2 py-1 text-xs dark:bg-white/20 dark:hover:bg-white/30" 
                variant="default"
              >
                {formatNumber(recipe.calories)} cal
              </Badge>
            </div>
            
            <h3 className="absolute bottom-2 left-2 font-medium text-base line-clamp-1 text-white drop-shadow-md px-1">
              {recipe.label}
            </h3>
          </div>
          
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center text-xs text-muted-foreground gap-3">
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{recipe.totalWeight > 1000 ? '60+ min' : '30+ min'}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  <span>{recipe.yield} servings</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 pt-1">
                {primaryCuisine && (
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Badge key={primaryCuisine} variant="outline" className="text-xs px-1.5 py-0 font-normal bg-purple-500/5 hover:bg-purple-500/10 transition-colors cursor-help">
                        {primaryCuisine}
                      </Badge>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-auto p-2 text-xs">
                      Cuisine: {primaryCuisine}
                    </HoverCardContent>
                  </HoverCard>
                )}
                
                {primaryMealType && (
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Badge key={primaryMealType} variant="outline" className="text-xs px-1.5 py-0 font-normal bg-purple-500/5 hover:bg-purple-500/10 transition-colors cursor-help">
                        {primaryMealType}
                      </Badge>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-auto p-2 text-xs">
                      Meal: {primaryMealType}
                    </HoverCardContent>
                  </HoverCard>
                )}
                
                {primaryDishType && (
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Badge key={primaryDishType} variant="outline" className="text-xs px-1.5 py-0 font-normal bg-purple-500/5 hover:bg-purple-500/10 transition-colors cursor-help">
                        {primaryDishType}
                      </Badge>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-auto p-2 text-xs">
                      Dish: {primaryDishType}
                    </HoverCardContent>
                  </HoverCard>
                )}
              </div>
              
              <div className="pt-1">
                <div className="w-full bg-muted/30 h-1 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-400 to-purple-600" 
                    style={{ width: `${Math.min(100, (recipe.calories / 2000) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                  <span>Calories</span>
                  <span>{Math.round((recipe.calories / 2000) * 100)}% daily</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl h-[90vh] p-0">
        <RecipeDetails recipe={recipe} onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default RecipeCard;
