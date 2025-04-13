
import { useState, useRef } from "react";
import { PostContent } from "@/types/post";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clipboard, Share2, Twitter, Facebook, Linkedin, Instagram } from "lucide-react";
import { toast } from "sonner";

interface PostPreviewProps {
  post: PostContent;
}

const PostPreview = ({ post }: PostPreviewProps) => {
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const handleCopyToClipboard = () => {
    if (post.text) {
      navigator.clipboard.writeText(post.text);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const getPlatformIcon = () => {
    switch (post.platform.id) {
      case "twitter":
        return <Twitter className="h-5 w-5" style={{ color: post.platform.color }} />;
      case "facebook":
        return <Facebook className="h-5 w-5" style={{ color: post.platform.color }} />;
      case "linkedin":
        return <Linkedin className="h-5 w-5" style={{ color: post.platform.color }} />;
      case "instagram":
        return <Instagram className="h-5 w-5" style={{ color: post.platform.color }} />;
      default:
        return null;
    }
  };
  
  // Custom background style for gradient templates
  const getBackgroundStyle = () => {
    if (post.template.backgroundColor.includes("gradient")) {
      return { background: post.template.backgroundColor };
    }
    return { backgroundColor: post.template.backgroundColor };
  };
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Preview for {post.platform.name}</h3>
        <div className="flex items-center">
          {getPlatformIcon()}
        </div>
      </div>
      
      <Card className="overflow-hidden border-2 border-slate-200">
        <CardContent className="p-0">
          <div 
            ref={contentRef}
            className="flex flex-col" 
          >
            {post.image && (
              <div className="w-full">
                <img 
                  src={post.image} 
                  alt="Post image" 
                  className="w-full object-cover max-h-[300px]"
                />
              </div>
            )}
            <div 
              className="p-8 min-h-[200px] max-h-[400px] overflow-y-auto" 
              style={{
                ...getBackgroundStyle(),
                color: post.template.textColor,
                fontFamily: post.template.fontFamily
              }}
            >
              {post.text ? (
                post.text.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-3">{paragraph}</p>
                ))
              ) : (
                <p className="text-gray-400 italic">Generated content will appear here...</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex gap-2 justify-end">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleCopyToClipboard}
          className="flex items-center gap-1"
        >
          <Clipboard className="h-4 w-4" />
          {copied ? "Copied!" : "Copy Text"}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  );
};

export default PostPreview;
