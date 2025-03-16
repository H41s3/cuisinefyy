import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  className?: string;
}

const SearchBar = ({ onSearch, initialQuery = "", className }: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialQuery !== query) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn(
        "relative w-full max-w-2xl mx-auto transition-all duration-300",
        isFocused ? "scale-[1.01]" : "scale-100",
        className
      )}
    >
      <div className={cn(
        "flex items-center rounded-xl border transition-all overflow-hidden",
        "shadow-md hover:shadow-lg focus-within:shadow-lg",
        isFocused ? "border-primary/60 ring-2 ring-primary/10" : "border-border",
        "bg-gradient-to-r from-white to-blue-50 dark:from-slate-800 dark:to-slate-700/70"
      )}>
        <div className="flex items-center pl-4 text-primary/70">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for recipes, ingredients, cuisines..."
          className="flex-1 p-3 px-4 border-none bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground"
          aria-label="Search recipes"
        />
        <button
          type="submit"
          className={cn(
            "p-3 m-1 rounded-lg transition-all text-white",
            "bg-gradient-to-br from-primary to-blue-600 hover:from-primary/90 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-primary/20",
            query.trim() === "" ? "opacity-80 cursor-not-allowed" : "opacity-100"
          )}
          disabled={query.trim() === ""}
          aria-label="Search"
        >
          <span className="mr-1 hidden sm:inline">Search</span>
          <Search className="h-5 w-5 inline-block" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
