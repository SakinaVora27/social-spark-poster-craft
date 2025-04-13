import { toast } from "sonner";
import { ImageSearchResult } from "@/types/post";

// Using the free Unsplash API (limited to 50 requests per hour)
const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";
// The API key seems to be invalid or expired
// Let's create a fallback mechanism with placeholder images
const UNSPLASH_ACCESS_KEY = "4do3X4u_Z3NiR2h3HVpj5wGHX2wbO-QqWK4lAIJX9Rw";

// Fallback placeholder images
const PLACEHOLDER_IMAGES = [
  {
    id: "photo-1649972904349-6e44c42644a7",
    urls: {
      small: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&fit=crop",
      regular: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1080&fit=crop"
    },
    alt_description: "A woman sitting on a bed using a laptop",
    user: { name: "Unsplash" }
  },
  {
    id: "photo-1488590528505-98d2b5aba04b",
    urls: {
      small: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&fit=crop",
      regular: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1080&fit=crop"
    },
    alt_description: "Turned on gray laptop computer",
    user: { name: "Unsplash" }
  },
  {
    id: "photo-1518770660439-4636190af475",
    urls: {
      small: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&fit=crop",
      regular: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1080&fit=crop"
    },
    alt_description: "Macro photography of black circuit board",
    user: { name: "Unsplash" }
  },
  {
    id: "photo-1461749280684-dccba630e2f6",
    urls: {
      small: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&fit=crop",
      regular: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1080&fit=crop"
    },
    alt_description: "Monitor showing Java programming",
    user: { name: "Unsplash" }
  },
  {
    id: "photo-1581091226825-a6a2a5aee158",
    urls: {
      small: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&fit=crop",
      regular: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1080&fit=crop"
    },
    alt_description: "Woman in white long sleeve shirt using black laptop computer",
    user: { name: "Unsplash" }
  },
  // Add a few more themed images
  {
    id: "photo-1611162616475-46b635cb6868",
    urls: {
      small: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&fit=crop",
      regular: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1080&fit=crop"
    },
    alt_description: "Social media icons on a phone screen",
    user: { name: "Unsplash" }
  },
  {
    id: "photo-1611162618071-b39a2ec055fb",
    urls: {
      small: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400&fit=crop",
      regular: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=1080&fit=crop"
    },
    alt_description: "Person holding a smartphone with social apps",
    user: { name: "Unsplash" }
  },
  {
    id: "photo-1559854036-2409f22a918a",
    urls: {
      small: "https://images.unsplash.com/photo-1559854036-2409f22a918a?w=400&fit=crop",
      regular: "https://images.unsplash.com/photo-1559854036-2409f22a918a?w=1080&fit=crop"
    },
    alt_description: "Smartphone with social media notifications",
    user: { name: "Unsplash" }
  },
  {
    id: "photo-1497493292307-31c376b6e479",
    urls: {
      small: "https://images.unsplash.com/photo-1497493292307-31c376b6e479?w=400&fit=crop",
      regular: "https://images.unsplash.com/photo-1497493292307-31c376b6e479?w=1080&fit=crop"
    },
    alt_description: "Coffee and laptop - work space",
    user: { name: "Unsplash" }
  }
];

// Function to filter placeholder images based on query
function getPlaceholderImages(query: string): ImageSearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Return filtered images if the query matches parts of descriptions,
  // otherwise return all placeholder images
  const filtered = PLACEHOLDER_IMAGES.filter(img => 
    img.alt_description.toLowerCase().includes(lowerQuery)
  );
  
  return filtered.length > 0 ? filtered : PLACEHOLDER_IMAGES;
}

export async function searchImages(query: string, perPage: number = 9): Promise<ImageSearchResult[]> {
  try {
    const response = await fetch(
      `${UNSPLASH_API_URL}?query=${encodeURIComponent(
        query
      )}&per_page=${perPage}`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      console.log(`Unsplash API returned status: ${response.status}`);
      // If the API fails, use our placeholder images
      toast.info("Using placeholder images due to API limitations");
      return getPlaceholderImages(query);
    }

    const data = await response.json();
    
    // If no results, fall back to placeholder images
    if (data.results.length === 0) {
      toast.info("No images found, showing alternatives");
      return getPlaceholderImages(query);
    }
    
    return data.results;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch images";
    console.error("Image search error:", error);
    
    // Instead of showing an error, use placeholder images
    toast.info("Using placeholder images while we fix our image service");
    return getPlaceholderImages(query);
  }
}
