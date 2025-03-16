import { Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

const Footer = () => {
  return (
    <footer className="border-t border-white/20 py-6 text-center text-sm bg-gradient-to-b from-background to-purple-950/90 dark:text-muted-foreground text-slate-100">
      <div className="container px-4 md:px-6 max-w-7xl">
        <div className="flex items-center justify-center gap-1">
          <Utensils className="h-4 w-4 text-purple-500" />
          <p className="font-medium">All Rights Reserved Cuisinefy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;