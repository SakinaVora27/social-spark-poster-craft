
import { toast } from "sonner";
import { ImageSearchResult } from "@/types/post";

// Using the free Unsplash API (limited to 50 requests per hour)
const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";
// API key limitations - we'll focus on robust fallback
const UNSPLASH_ACCESS_KEY = "4do3X4u_Z3NiR2h3HVpj5wGHX2wbO-QqWK4lAIJX9Rw";

// Extended placeholder images collection for better variety
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
  },
  // Additional technology-related images
  {
    id: "photo-1486312338219-ce68d2c6f44d",
    urls: {
      small: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&fit=crop",
      regular: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1080&fit=crop"
    },
    alt_description: "Person using MacBook Pro",
    user: { name: "Unsplash" }
  },
  {
    id: "photo-1498050108023-c5249f4df085",
    urls: {
      small: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&fit=crop",
      regular: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1080&fit=crop"
    },
    alt_description: "Person coding on computer",
    user: { name: "Unsplash" }
  },
  // Nature images
  {
    id: "photo-1470071459604-3b5ec3a7fe05",
    urls: {
      small: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&fit=crop",
      regular: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1080&fit=crop"
    },
    alt_description: "Beautiful mountain landscape",
    user: { name: "Unsplash" }
  },
  {
    id: "photo-1501854140801-50d01698950b",
    urls: {
      small: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&fit=crop",
      regular: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1080&fit=crop"
    },
    alt_description: "Sunset over calm lake",
    user: { name: "Unsplash" }
  },
  // Business images
  {
    id: "photo-1556761175-4b46a572b786",
    urls: {
      small: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&fit=crop",
      regular: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1080&fit=crop"
    },
    alt_description: "Business meeting in modern office",
    user: { name: "Unsplash" }
  },
  {
    id: "photo-1551434678-e076c223a692",
    urls: {
      small: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&fit=crop",
      regular: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1080&fit=crop"
    },
    alt_description: "Developers working together on code",
    user: { name: "Unsplash" }
  }
];

// Image categories for better search results
const IMAGE_CATEGORIES = {
  technology: ["photo-1649972904349-6e44c42644a7", "photo-1488590528505-98d2b5aba04b", "photo-1518770660439-4636190af475", "photo-1461749280684-dccba630e2f6", "photo-1486312338219-ce68d2c6f44d", "photo-1498050108023-c5249f4df085"],
  social: ["photo-1611162616475-46b635cb6868", "photo-1611162618071-b39a2ec055fb", "photo-1559854036-2409f22a918a"],
  workspace: ["photo-1497493292307-31c376b6e479", "photo-1581091226825-a6a2a5aee158"],
  nature: ["photo-1470071459604-3b5ec3a7fe05", "photo-1501854140801-50d01698950b"],
  business: ["photo-1556761175-4b46a572b786", "photo-1551434678-e076c223a692"]
};

// Function to get smarter placeholder image results based on query
function getPlaceholderImages(query: string): ImageSearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  // Check if the query matches any category keywords
  if (lowerQuery.includes("tech") || lowerQuery.includes("computer") || lowerQuery.includes("code") || lowerQuery.includes("programming")) {
    return PLACEHOLDER_IMAGES.filter(img => IMAGE_CATEGORIES.technology.includes(img.id));
  }
  
  if (lowerQuery.includes("social") || lowerQuery.includes("media") || lowerQuery.includes("phone") || lowerQuery.includes("app")) {
    return PLACEHOLDER_IMAGES.filter(img => IMAGE_CATEGORIES.social.includes(img.id));
  }
  
  if (lowerQuery.includes("work") || lowerQuery.includes("office") || lowerQuery.includes("desk") || lowerQuery.includes("laptop")) {
    return PLACEHOLDER_IMAGES.filter(img => IMAGE_CATEGORIES.workspace.includes(img.id));
  }
  
  if (lowerQuery.includes("nature") || lowerQuery.includes("landscape") || lowerQuery.includes("mountain") || lowerQuery.includes("outdoor")) {
    return PLACEHOLDER_IMAGES.filter(img => IMAGE_CATEGORIES.nature.includes(img.id));
  }
  
  if (lowerQuery.includes("business") || lowerQuery.includes("professional") || lowerQuery.includes("meeting") || lowerQuery.includes("corporate")) {
    return PLACEHOLDER_IMAGES.filter(img => IMAGE_CATEGORIES.business.includes(img.id));
  }
  
  // Try to match based on description
  const filteredByDescription = PLACEHOLDER_IMAGES.filter(img => 
    img.alt_description.toLowerCase().includes(lowerQuery)
  );
  
  if (filteredByDescription.length > 0) {
    return filteredByDescription;
  }
  
  // If no specific match, return a diverse selection
  return PLACEHOLDER_IMAGES.slice(0, 9);
}

export async function searchImages(query: string, perPage: number = 9): Promise<ImageSearchResult[]> {
  try {
    // Skip Unsplash API call and use our robust local image system instead
    // This ensures reliable results without API limitations
    toast.info("Using curated images from our collection");
    return getPlaceholderImages(query);
    
    /* Commented out the API call due to limitations
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
    */
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch images";
    console.error("Image search error:", error);
    
    toast.info("Using our curated image collection");
    return getPlaceholderImages(query);
  }
}
