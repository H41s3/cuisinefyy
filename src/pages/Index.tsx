import { useState, useEffect } from "react";
import { 
  searchRecipes, 
  Recipe, 
  SearchFilters
} from "@/services/recipeService";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Check, ChevronUp, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import EmptyState, { InitialEmptyState } from "@/components/EmptyState";
import FavoritesView from "@/components/FavoritesView";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RecipeList from "@/components/recipe/RecipeList";
import useSortedRecipes, { SortOption } from "@/hooks/useSortedRecipes";

const Index = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({});
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("default");
  
  // Get sorted recipes
  const sortedRecipes = useSortedRecipes(recipes, sortOption);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleSuggestionClick = (e: Event) => {
      const customEvent = e as CustomEvent;
      const suggestion = customEvent.detail.query;
      if (suggestion) {
        setQuery(suggestion);
        handleSearch(suggestion);
      }
    };
    
    window.addEventListener("suggestion-click", handleSuggestionClick);
    return () => window.removeEventListener("suggestion-click", handleSuggestionClick);
  }, [filters]);
  
  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    setQuery(searchQuery);
    setShowFavorites(false);
    
    try {
      const response = await searchRecipes(searchQuery, filters);
      setRecipes(response.hits.map(hit => hit.recipe));
      
      if (response.hits.length === 0) {
        toast.info("No recipes found. Try adjusting your search or filters.");
      } else {
        toast.success(`Found ${response.hits.length} recipes!`, {
          icon: <Check className="h-4 w-4" />,
        });
      }
    } catch (error) {
      console.error("Error searching recipes:", error);
      toast.error("Failed to search recipes. Please try again.");
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    if (query) {
      handleSearch(query);
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetToStart = () => {
    setQuery("");
    setFilters({});
    setRecipes([]);
    setHasSearched(false);
    setShowFavorites(false);
    setSortOption("default");
    toast.info("Returned to start page");
  };

  const toggleFavorites = () => {
    setShowFavorites(prev => !prev);
    if (!showFavorites) {
      setHasSearched(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-purple-950/30 to-purple-900/20 dark:from-slate-900 dark:to-slate-800">
      <Header 
        query={query}
        filters={filters}
        hasSearched={hasSearched}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onResetToStart={resetToStart}
      />
      
      <main className="flex-1 container px-4 py-6 md:px-6 max-w-7xl">
        {loading ? (
          <Loader />
        ) : !hasSearched ? (
          <div className="flex flex-col items-center justify-center min-h-[75vh] animate-fade-in">
            <div className="text-center max-w-3xl mx-auto glass-morphism p-8 md:p-12 mb-8">
              <div className="mx-auto w-20 h-20 bg-purple-500/20 flex items-center justify-center rounded-full mb-6">
                <ChefHat className="h-10 w-10 text-purple-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                Discover Delicious Recipes
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Explore thousands of recipes from around the world and find your next culinary masterpiece
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  { title: "Easy Search", description: "Find recipes by ingredients, cuisine, or dietary needs" },
                  { title: "Save Favorites", description: "Keep track of recipes you love for later" },
                  { title: "Detailed Info", description: "Get nutritional data and cooking instructions" }
                ].map((feature, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/10 hover:bg-purple-500/10 transition-all"
                  >
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm text-muted-foreground mb-1">Try searching for:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Chicken pasta", "Vegetarian", "Quick breakfast", "Italian"].map((suggestion) => (
                    <Button 
                      key={suggestion} 
                      variant="outline" 
                      className="rounded-full border-purple-500/20 hover:bg-purple-500/10 transition-colors"
                      onClick={() => {
                        const event = new CustomEvent("suggestion-click", {
                          detail: { query: suggestion }
                        });
                        window.dispatchEvent(event);
                      }}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : showFavorites ? (
          <FavoritesView onClose={() => setShowFavorites(false)} className="animate-fade-in" />
        ) : recipes.length === 0 ? (
          <EmptyState />
        ) : (
          <RecipeList 
            recipes={sortedRecipes} 
            sortOption={sortOption} 
            onSortChange={setSortOption} 
          />
        )}
      </main>
      
      <Footer />
      
      <Button
        variant="secondary"
        size="icon"
        className={cn(
          "fixed bottom-4 right-4 rounded-full shadow-lg z-10 transition-all duration-300 transform purple-gradient text-white hover:opacity-90",
          showScrollTop ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        )}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Index;
