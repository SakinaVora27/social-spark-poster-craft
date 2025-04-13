
export interface PostTemplate {
  id: string;
  name: string;
  description: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  icon: string;
}

export interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  color: string;
  maxLength?: number;
}

export interface PostContent {
  text: string;
  template: PostTemplate;
  platform: SocialPlatform;
  image?: string; // URL to the image
}

export interface ImageSearchResult {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
}
