
import { PostTemplate, SocialPlatform } from "../types/post";

export const templates: PostTemplate[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple design for professional posts",
    backgroundColor: "#ffffff",
    textColor: "#1a1a1a",
    fontFamily: "Inter, sans-serif",
    icon: "minimize-2",
  },
  {
    id: "gradient",
    name: "Purple Gradient",
    description: "Eye-catching purple gradient background",
    backgroundColor: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
    textColor: "#ffffff",
    fontFamily: "Inter, sans-serif",
    icon: "palette",
  },
  {
    id: "dark",
    name: "Dark Mode",
    description: "Sleek dark theme with high contrast",
    backgroundColor: "#1a1a2e",
    textColor: "#ffffff",
    fontFamily: "Inter, sans-serif",
    icon: "moon",
  },
  {
    id: "casual",
    name: "Casual",
    description: "Friendly and approachable style",
    backgroundColor: "#f0fdf4",
    textColor: "#374151",
    fontFamily: "Poppins, sans-serif",
    icon: "coffee",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Corporate feel for business accounts",
    backgroundColor: "#f8fafc",
    textColor: "#1e293b",
    fontFamily: "Inter, sans-serif",
    icon: "briefcase",
  }
];

export const platforms: SocialPlatform[] = [
  {
    id: "twitter",
    name: "Twitter",
    icon: "twitter",
    color: "#1DA1F2",
    maxLength: 280,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "linkedin",
    color: "#0A66C2",
    maxLength: 3000,
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "facebook",
    color: "#1877F2",
    maxLength: 5000,
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "instagram",
    color: "#E4405F",
    maxLength: 2200,
  }
];

export const promptTemplates = [
  {
    id: "announcement",
    name: "Product Announcement",
    prompt: "Create a social media post announcing a new [product/feature] for [company]. The tone should be [excited/professional/casual] and highlight the key benefits: [benefit1], [benefit2]. Include a compelling call to action.",
  },
  {
    id: "tips",
    name: "Tips & Tricks",
    prompt: "Create a social media post with [number] helpful tips about [topic] for [audience]. Make it [educational/actionable/inspirational].",
  },
  {
    id: "question",
    name: "Engaging Question",
    prompt: "Create a thought-provoking question about [topic] to engage my audience on [platform]. The post should encourage comments and discussion while positioning me as an expert in [industry].",
  },
  {
    id: "promotion",
    name: "Sale/Promotion",
    prompt: "Create a social media post promoting a [discount/offer/sale] for [product/service]. Include urgency, value proposition, and a clear call to action. The tone should be [exciting/exclusive/friendly].",
  },
  {
    id: "story",
    name: "Customer Story",
    prompt: "Create a social media post sharing a success story about how [product/service] helped [customer persona] achieve [specific result]. Make it relatable and inspirational.",
  },
];
