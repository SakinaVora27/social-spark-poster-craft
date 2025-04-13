
import { toast } from "sonner";
import { ImageSearchResult } from "@/types/post";

// Using the free Unsplash API (limited to 50 requests per hour)
const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";
const UNSPLASH_ACCESS_KEY = "4do3X4u_Z3NiR2h3HVpj5wGHX2wbO-QqWK4lAIJX9Rw";

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
      throw new Error(`Failed to fetch images: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch images";
    toast.error(errorMessage);
    console.error("Image search error:", error);
    return [];
  }
}
