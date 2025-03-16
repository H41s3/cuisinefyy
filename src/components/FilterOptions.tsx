
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilterX, Sliders } from "lucide-react";
import { cuisineTypeOptions, dietOptions, healthOptions, mealTypeOptions } from "@/services/recipeService";
import { SearchFilters } from "@/services/recipeService";
import { cn } from "@/lib/utils";

interface FilterOptionsProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  className?: string;
}

const FilterOptions = ({ filters, onFilterChange, className }: FilterOptionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);
  
  // Get the total number of active filters
  const activeFilterCount = Object.values(filters).flat().length;

  const handleFilterChange = (category: keyof SearchFilters, value: string) => {
    const updatedFilters = { ...localFilters };
    
    // Initialize the category array if it doesn't exist
    if (!updatedFilters[category]) {
      updatedFilters[category] = [];
    }
    
    // Toggle the value
    const currentValues = updatedFilters[category] || [];
    if (currentValues.includes(value)) {
      updatedFilters[category] = currentValues.filter(item => item !== value);
    } else {
      updatedFilters[category] = [...currentValues, value];
    }
    
    setLocalFilters(updatedFilters);
  };
  
  const applyFilters = () => {
    // Remove empty arrays
    const cleanedFilters: SearchFilters = {};
    Object.entries(localFilters).forEach(([key, value]) => {
      if (value && value.length > 0) {
        cleanedFilters[key as keyof SearchFilters] = value;
      }
    });
    
    onFilterChange(cleanedFilters);
    setIsOpen(false);
  };
  
  const resetFilters = () => {
    setLocalFilters({});
    onFilterChange({});
    setIsOpen(false);
  };

  // Render filter option with checkbox
  const renderFilterOption = (
    category: keyof SearchFilters, 
    option: { value: string; label: string }
  ) => {
    const isChecked = localFilters[category]?.includes(option.value) || false;
    
    return (
      <div key={option.value} className="flex items-center space-x-2 py-1">
        <Checkbox 
          id={`${category}-${option.value}`}
          checked={isChecked}
          onCheckedChange={() => handleFilterChange(category, option.value)}
        />
        <Label 
          htmlFor={`${category}-${option.value}`}
          className="cursor-pointer text-sm font-normal"
        >
          {option.label}
        </Label>
      </div>
    );
  };

  return (
    <div className={cn("flex items-center justify-between w-full", className)}>
      <div className="flex flex-wrap gap-2">
        {filters.diet?.map(diet => (
          <Badge key={diet} variant="secondary" className="px-3 py-1.5 animate-fade-in">
            {dietOptions.find(option => option.value === diet)?.label || diet}
            <button 
              onClick={() => {
                const newFilters = { ...filters, diet: filters.diet?.filter(d => d !== diet) };
                onFilterChange(newFilters);
              }}
              className="ml-1.5 hover:text-destructive transition-colors"
              aria-label={`Remove ${diet} filter`}
            >
              ×
            </button>
          </Badge>
        ))}
        
        {filters.health?.map(health => (
          <Badge key={health} variant="secondary" className="px-3 py-1.5 animate-fade-in">
            {healthOptions.find(option => option.value === health)?.label || health}
            <button 
              onClick={() => {
                const newFilters = { ...filters, health: filters.health?.filter(h => h !== health) };
                onFilterChange(newFilters);
              }}
              className="ml-1.5 hover:text-destructive transition-colors"
              aria-label={`Remove ${health} filter`}
            >
              ×
            </button>
          </Badge>
        ))}
        
        {filters.cuisineType?.map(cuisine => (
          <Badge key={cuisine} variant="secondary" className="px-3 py-1.5 animate-fade-in">
            {cuisineTypeOptions.find(option => option.value === cuisine)?.label || cuisine}
            <button 
              onClick={() => {
                const newFilters = { ...filters, cuisineType: filters.cuisineType?.filter(c => c !== cuisine) };
                onFilterChange(newFilters);
              }}
              className="ml-1.5 hover:text-destructive transition-colors"
              aria-label={`Remove ${cuisine} filter`}
            >
              ×
            </button>
          </Badge>
        ))}
        
        {filters.mealType?.map(meal => (
          <Badge key={meal} variant="secondary" className="px-3 py-1.5 animate-fade-in">
            {mealTypeOptions.find(option => option.value === meal)?.label || meal}
            <button 
              onClick={() => {
                const newFilters = { ...filters, mealType: filters.mealType?.filter(m => m !== meal) };
                onFilterChange(newFilters);
              }}
              className="ml-1.5 hover:text-destructive transition-colors"
              aria-label={`Remove ${meal} filter`}
            >
              ×
            </button>
          </Badge>
        ))}
        
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="h-8 px-2 text-xs text-muted-foreground animate-fade-in"
          >
            <FilterX className="h-3.5 w-3.5 mr-1" />
            Clear all
          </Button>
        )}
      </div>
      
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant={activeFilterCount > 0 ? "secondary" : "outline"} 
            size="sm"
            className="h-9 px-3"
          >
            <Sliders className="h-4 w-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1.5 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[340px] p-0" align="end">
          <div className="p-4 pb-0">
            <h3 className="text-lg font-medium">Filter Recipes</h3>
            <p className="text-muted-foreground text-sm">
              Refine your search results with these filters.
            </p>
          </div>
          
          <Tabs defaultValue="diet" className="mt-2">
            <div className="px-4">
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="diet">Diet</TabsTrigger>
                <TabsTrigger value="health">Health</TabsTrigger>
                <TabsTrigger value="cuisine">Cuisine</TabsTrigger>
                <TabsTrigger value="meal">Meal</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="p-4 pt-2 h-[280px] overflow-y-auto">
              <TabsContent value="diet" className="mt-0">
                <div className="space-y-1">
                  {dietOptions.map(option => renderFilterOption('diet', option))}
                </div>
              </TabsContent>
              
              <TabsContent value="health" className="mt-0">
                <div className="space-y-1">
                  {healthOptions.map(option => renderFilterOption('health', option))}
                </div>
              </TabsContent>
              
              <TabsContent value="cuisine" className="mt-0">
                <div className="space-y-1">
                  {cuisineTypeOptions.map(option => renderFilterOption('cuisineType', option))}
                </div>
              </TabsContent>
              
              <TabsContent value="meal" className="mt-0">
                <div className="space-y-1">
                  {mealTypeOptions.map(option => renderFilterOption('mealType', option))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
          
          <div className="border-t p-4 flex justify-between">
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Reset
            </Button>
            <Button onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterOptions;
