import { useFavorites } from "./FavoritesProvider";
import RecipeCard from "./RecipeCard";
import { Button } from "./ui/button";
import { Heart, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FavoritesViewProps {
    onClose: () => void;
    className?: string;
    hideCloseButton?: boolean;
}

const FavoritesView = ({ onClose, className, hideCloseButton = false }: FavoritesViewProps) => {
    const { favorites } = useFavorites();

    return (
        <div className={cn("space-y-6", className)}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-destructive" fill="currentColor" />
                    <h2 className="text-xl font-semibold">My Favorite Recipes</h2>
                </div>

                {!hideCloseButton && (
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                        <X className="h-5 w-5" />
                    </Button>
                )}
            </div>

            {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <Heart className="h-12 w-12 mb-4 opacity-20" />
                    <p className="text-lg font-medium">No favorite recipes yet</p>
                    <p className="text-sm mt-1">
                        Click the heart icon on any recipe to add it to your favorites
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {favorites.map((recipe) => (
                        <RecipeCard key={recipe.uri} recipe={recipe} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesView;