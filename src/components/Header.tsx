
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full py-4 px-6 bg-white border-b border-slate-200 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-purple-600" />
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
          Social Spark
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="text-sm text-slate-600">
          How it works
        </Button>
        <Button variant="ghost" className="text-sm text-slate-600">
          Templates
        </Button>
        <Button className="bg-gradient-purple hover:opacity-90 transition-opacity">
          Get Started
        </Button>
      </div>
    </header>
  );
};

export default Header;
