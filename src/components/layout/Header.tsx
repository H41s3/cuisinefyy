import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import FilterOptions from "@/components/FilterOptions";
import { ChefHat, ArrowLeft, Heart } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeProvider";
import { SearchFilters } from "@/services/recipeService";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import FavoritesView from "@/components/FavoritesView";
import { useFavorites } from "@/components/FavoritesProvider";
import { cn } from "@/lib/utils";

interface HeaderProps {
  query: string;
  filters: SearchFilters;
  hasSearched: boolean;
  onSearch: (query: string) => void;
  onFilterChange: (filters: SearchFilters) => void;
  onResetToStart: () => void;
}

const Header = ({ 
  query, 
  filters, 
  hasSearched, 
  onSearch, 
  onFilterChange, 
  onResetToStart 
}: HeaderProps) => {
  const { favorites } = useFavorites();

  return (
    <header className="border-b border-white/10 bg-background/80 backdrop-blur-md sticky top-0 z-20 transition-all shadow-lg">
      <div className="container py-4 px-4 md:px-6 max-w-7xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-purple-500/10 p-2 rounded-full">
              <ChefHat className="h-6 w-6 text-purple-500" />
            </div>
            <h1 className="text-xl font-bold gradient-text">Cuisinefy</h1>
          </div>
          
          <div className="flex items-center gap-3">
            {hasSearched && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onResetToStart}
                className="flex items-center gap-1 rounded-full hover:bg-purple-500/10 transition-colors border-purple-500/20"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Start</span>
              </Button>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full relative border-purple-500/20 hover:bg-purple-500/10"
                  aria-label="View favorites"
                >
                  <Heart className="h-5 w-5" />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-white rounded-full text-[10px] flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="sm:max-w-lg w-[90vw] p-6 overflow-y-auto border-l border-white/10 bg-card/95 backdrop-blur-md">
                <FavoritesView onClose={() => {}} hideCloseButton={true} />
              </SheetContent>
            </Sheet>
            
            <ThemeToggle />
          </div>
        </div>
        
        <div className="space-y-4">
          <SearchBar 
            onSearch={onSearch} 
            initialQuery={query} 
          />
          
          {(hasSearched || Object.keys(filters).length > 0) && (
            <FilterOptions 
              filters={filters} 
              onFilterChange={onFilterChange} 
              className="animate-fade-in" 
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
