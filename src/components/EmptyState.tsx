
import { Button } from "@/components/ui/button";
import { Search, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState = ({
  title = "No recipes found",
  description = "Try adjusting your search or filters to find what you're looking for.",
  icon = <Utensils className="h-12 w-12 text-muted-foreground" />,
  action,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center",
        className
      )}
    >
      <div className="bg-muted/50 h-24 w-24 rounded-full flex items-center justify-center mb-6 animate-fade-in">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2 animate-fade-in">{title}</h3>
      <p className="text-muted-foreground max-w-md mb-6 animate-fade-in">
        {description}
      </p>
      {action && <div className="animate-fade-in">{action}</div>}
    </div>
  );
};

export const InitialEmptyState = () => (
  <EmptyState
    title="Search for recipes"
    description="Enter ingredients, dish names, or cuisines to discover delicious recipes."
    icon={<Search className="h-12 w-12 text-muted-foreground" />}
    action={
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground mb-1">Try searching for:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {["Chicken pasta", "Vegetarian", "Quick breakfast", "Italian"].map((suggestion) => (
            <Button 
              key={suggestion} 
              variant="outline" 
              className="rounded-full"
              onClick={() => {
                // This will be handled by the parent component
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
    }
  />
);

export default EmptyState;
