
import { Recipe } from "@/services/recipeService";
import { Button } from "@/components/ui/button";
import { ExternalLink, Printer } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";

interface RecipeFooterProps {
  recipe: Recipe;
}

const RecipeFooter = ({ recipe }: RecipeFooterProps) => {
  const handlePrint = useCallback(() => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error("Unable to open print window. Please check your popup settings.");
      return;
    }

    // Format ingredients as HTML list
    const ingredientsList = recipe.ingredientLines
      .map(ingredient => `<li>${ingredient}</li>`)
      .join('');

    // Create print-friendly HTML
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${recipe.label} Recipe</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          h1 { margin-bottom: 5px; }
          .source { margin-bottom: 20px; color: #666; font-style: italic; }
          .info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 20px; }
          .info-box { border: 1px solid #eee; padding: 10px; text-align: center; }
          .info-label { font-size: 0.8rem; color: #666; margin-bottom: 5px; }
          .section { margin-top: 20px; }
          h2 { border-bottom: 1px solid #eee; padding-bottom: 5px; }
          ul { padding-left: 20px; }
          .credit { margin-top: 30px; font-size: 0.8rem; color: #666; text-align: center; }
          @media print {
            a { text-decoration: none; color: black; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>${recipe.label}</h1>
        <p class="source">Source: ${recipe.source}</p>
        
        <div class="info-grid">
          <div class="info-box">
            <div class="info-label">Calories</div>
            <div>${Math.round(recipe.calories).toLocaleString()}</div>
          </div>
          <div class="info-box">
            <div class="info-label">Cook Time</div>
            <div>${recipe.totalWeight > 1000 ? '60+ min' : '30+ min'}</div>
          </div>
          <div class="info-box">
            <div class="info-label">Servings</div>
            <div>${recipe.yield}</div>
          </div>
        </div>
        
        <div class="section">
          <h2>Ingredients</h2>
          <ul>${ingredientsList}</ul>
        </div>
        
        <div class="no-print">
          <button onclick="window.print();window.close();" style="margin-top:20px; padding:10px 20px; background:#4338ca; color:white; border:none; border-radius:4px; cursor:pointer;">
            Print Recipe
          </button>
        </div>
        
        <p class="credit">Recipe provided by ${recipe.source} via Edamam</p>
      </body>
      </html>
    `;

    // Write to the new window and prepare for printing
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
  }, [recipe]);

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t">
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          asChild
        >
          <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
            <span>View Full Recipe</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
        
        <Button
          variant="secondary"
          size="icon"
          onClick={handlePrint}
          title="Print Recipe"
        >
          <Printer className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default RecipeFooter;
