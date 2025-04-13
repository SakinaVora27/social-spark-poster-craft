
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, X, Loader2 } from "lucide-react";
import { searchImages } from "@/services/imageApi";
import { ImageSearchResult } from "@/types/post";

interface ImageSelectorProps {
  onSelectImage: (imageUrl: string | null) => void;
  selectedImage?: string | null;
}

const ImageSelector = ({ onSelectImage, selectedImage }: ImageSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<ImageSearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setShowResults(true);
    
    try {
      const results = await searchImages(searchQuery);
      setSearchResults(results);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectImage = (image: ImageSearchResult) => {
    onSelectImage(image.urls.regular);
    setShowResults(false);
  };

  const handleClearImage = () => {
    onSelectImage(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col">
        <Label className="mb-2">Add an Image</Label>
        
        {selectedImage ? (
          <div className="relative">
            <img 
              src={selectedImage} 
              alt="Selected image for post" 
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <Button 
              variant="destructive" 
              size="icon" 
              className="absolute top-2 right-2 h-8 w-8 rounded-full"
              onClick={handleClearImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Search for images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Button type="submit" disabled={isSearching}>
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              Search
            </Button>
          </form>
        )}
      </div>
      
      {showResults && (
        <div className="image-grid">
          {isSearching ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {searchResults.map((image) => (
                <div 
                  key={image.id} 
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handleSelectImage(image)}
                >
                  <img 
                    src={image.urls.small} 
                    alt={image.alt_description || "Unsplash image"} 
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500 py-4">No images found. Try a different search term.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
