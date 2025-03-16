import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "./FavoritesProvider";
import { Recipe } from "@/services/recipeService";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
    recipe: Recipe;
    size?: "sm" | "md" | "lg";
    className?: string;
}

const FavoriteButton = ({ recipe, size = "md", className }: FavoriteButtonProps) => {
    const { toggleFavorite, isFavorite } = useFavorites();
    const isFav = isFavorite(recipe.uri);

    const sizeClasses = {
        sm: "h-7 w-7",
        md: "h-9 w-9",
        lg: "h-10 w-10",
    };

    const iconSizes = {
        sm: "h-3.5 w-3.5",
        md: "h-4.5 w-4.5",
        lg: "h-5 w-5",
    };

    return (
        <Button
            variant="outline"
            size="icon"
            className={cn(
                "rounded-full hover:bg-background/80 backdrop-blur-md",
                "border border-primary/20 transition-all duration-300",
                isFav ? "bg-destructive/10 hover:bg-destructive/20" : "bg-background/60",
                sizeClasses[size],
                className
            )}
            onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(recipe);
            }}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
            <Heart
                className={cn(
                    iconSizes[size],
                    "transition-all",
                    isFav ? "text-destructive fill-destructive" : "text-foreground/60"
                )}
            />
        </Button>
    );
};

export default FavoriteButton;