import { createContext, useContext, useEffect, useState } from "react";
import { Recipe } from "@/services/recipeService";
import { toast } from "sonner";
import { Heart } from "lucide-react";

type FavoritesContextType = {
    favorites: Recipe[];
    addFavorite: (recipe: Recipe) => void;
    removeFavorite: (recipeUri: string) => void;
    isFavorite: (recipeUri: string) => boolean;
    toggleFavorite: (recipe: Recipe) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<Recipe[]>([]);

    // Load favorites from localStorage on component mount
    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            try {
                setFavorites(JSON.parse(storedFavorites));
            } catch (error) {
                console.error("Error parsing favorites from localStorage:", error);
                localStorage.removeItem("favorites");
            }
        }
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (recipe: Recipe) => {
        if (!isFavorite(recipe.uri)) {
            setFavorites(prev => [...prev, recipe]);
            toast.success("Recipe added to favorites", {
                icon: <Heart className="h-4 w-4 text-destructive" fill="currentColor" />,
            });
        }
    };

    const removeFavorite = (recipeUri: string) => {
        setFavorites(prev => prev.filter(recipe => recipe.uri !== recipeUri));
        toast.info("Recipe removed from favorites");
    };

    const isFavorite = (recipeUri: string) => {
        return favorites.some(recipe => recipe.uri === recipeUri);
    };

    const toggleFavorite = (recipe: Recipe) => {
        if (isFavorite(recipe.uri)) {
            removeFavorite(recipe.uri);
        } else {
            addFavorite(recipe);
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
};