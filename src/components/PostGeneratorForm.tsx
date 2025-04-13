
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2 } from "lucide-react";
import { templates, platforms, promptTemplates } from "@/data/templates";
import { GenerateContentRequest, generateContent } from "@/services/geminiApi";
import { PostContent, PostTemplate, SocialPlatform } from "@/types/post";
import { toast } from "sonner";
import ImageSelector from "@/components/ImageSelector";

interface PostGeneratorFormProps {
  onGeneratePost: (post: PostContent) => void;
}

const PostGeneratorForm = ({ onGeneratePost }: PostGeneratorFormProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<PostTemplate>(templates[0]);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>(platforms[0]);
  const [promptType, setPromptType] = useState("custom");
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedPromptTemplate, setSelectedPromptTemplate] = useState(promptTemplates[0]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [promptParams, setPromptParams] = useState({
    topic: "",
    audience: "",
    tone: "professional",
  });

  const handleGenerateContent = async () => {
    if (!customPrompt && promptType === "custom") {
      toast.error("Please enter a prompt");
      return;
    }
    
    let finalPrompt = customPrompt;
    
    if (promptType === "template") {
      // Replace template placeholders
      let templatePrompt = selectedPromptTemplate.prompt;
      Object.entries(promptParams).forEach(([key, value]) => {
        if (value) {
          templatePrompt = templatePrompt.replace(`[${key}]`, value);
        }
      });
      
      finalPrompt = `${templatePrompt} Make sure the post is formatted for ${selectedPlatform.name} and is ready to be published as-is.`;
    } else {
      // Add platform context to custom prompt
      finalPrompt = `${customPrompt} Make sure the post is formatted for ${selectedPlatform.name} and is ready to be published as-is.`;
    }
    
    // If an image is selected, ask the AI to make the text relevant to the image
    if (selectedImage) {
      finalPrompt += ` Please make the content relevant to the accompanying image that I've selected.`;
    }
    
    try {
      setIsGenerating(true);
      
      const request: GenerateContentRequest = {
        prompt: finalPrompt,
        temperature: 0.7,
        maxTokens: 800,
      };
      
      const response = await generateContent(request);
      
      if (response.content && !response.error) {
        onGeneratePost({
          text: response.content.trim(),
          template: selectedTemplate,
          platform: selectedPlatform,
          image: selectedImage || undefined
        });
        toast.success("Post generated successfully!");
      }
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="border-slate-200">
      <CardContent className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Create your post</h2>
          <p className="text-slate-500">Generate engaging social media content with AI</p>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Platform</Label>
              <Select 
                value={selectedPlatform.id}
                onValueChange={(value) => {
                  const platform = platforms.find(p => p.id === value);
                  if (platform) setSelectedPlatform(platform);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform.id} value={platform.id}>
                      <div className="flex items-center">
                        {platform.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Template Style</Label>
              <Select 
                value={selectedTemplate.id}
                onValueChange={(value) => {
                  const template = templates.find(t => t.id === value);
                  if (template) setSelectedTemplate(template);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <ImageSelector 
            onSelectImage={setSelectedImage}
            selectedImage={selectedImage}
          />
          
          <Tabs defaultValue="custom" value={promptType} onValueChange={setPromptType}>
            <TabsList className="mb-4">
              <TabsTrigger value="custom">Custom Prompt</TabsTrigger>
              <TabsTrigger value="template">Template Prompts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="custom" className="space-y-4">
              <div>
                <Label>Your prompt</Label>
                <Textarea 
                  placeholder="Create a social media post about... Be specific with the content you want."
                  className="min-h-[120px]"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="template" className="space-y-4">
              <div className="space-y-2">
                <Label>Prompt Template</Label>
                <Select 
                  value={selectedPromptTemplate.id}
                  onValueChange={(value) => {
                    const template = promptTemplates.find(pt => pt.id === value);
                    if (template) setSelectedPromptTemplate(template);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select template type" />
                  </SelectTrigger>
                  <SelectContent>
                    {promptTemplates.map((pt) => (
                      <SelectItem key={pt.id} value={pt.id}>
                        {pt.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Topic/Industry</Label>
                  <Textarea 
                    placeholder="e.g., digital marketing, finance, AI technology"
                    value={promptParams.topic}
                    onChange={(e) => setPromptParams({...promptParams, topic: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Target Audience</Label>
                  <Textarea 
                    placeholder="e.g., marketing professionals, Gen Z, parents"
                    value={promptParams.audience}
                    onChange={(e) => setPromptParams({...promptParams, audience: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Tone</Label>
                <Select 
                  value={promptParams.tone}
                  onValueChange={(value) => setPromptParams({...promptParams, tone: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                    <SelectItem value="informative">Informative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>
          
          <Button 
            onClick={handleGenerateContent}
            className="w-full bg-gradient-purple hover:opacity-90 transition-opacity"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Post
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostGeneratorForm;
