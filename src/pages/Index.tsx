
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Header from "@/components/Header";
import PostGeneratorForm from "@/components/PostGeneratorForm";
import PostPreview from "@/components/PostPreview";
import HowItWorks from "@/components/HowItWorks";
import { PostContent } from "@/types/post";
import { templates, platforms } from "@/data/templates";

const Index = () => {
  const [generatedPost, setGeneratedPost] = useState<PostContent>({
    text: "",
    template: templates[0],
    platform: platforms[0]
  });

  const handleGeneratePost = (post: PostContent) => {
    setGeneratedPost(post);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <section className="bg-gradient-to-b from-purple-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Create Engaging Social Media Content with AI
            </h1>
            <p className="text-xl text-slate-600 mb-6">
              Generate platform-optimized posts in seconds with our AI-powered social media content creator
            </p>
            <Button className="bg-gradient-purple hover:opacity-90 transition-opacity text-lg px-8 py-6 h-auto">
              <Sparkles className="mr-2 h-5 w-5" />
              Start Creating
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16" id="generator">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <PostGeneratorForm onGeneratePost={handleGeneratePost} />
            </div>
            <div>
              <PostPreview post={generatedPost} />
            </div>
          </div>
        </div>
      </section>
      
      <HowItWorks />
      
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Sparkles className="h-6 w-6 text-purple-400" />
              <h2 className="text-xl font-bold">Social Spark</h2>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-purple-400 transition-colors">About</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-slate-400 text-sm">
            © {new Date().getFullYear()} Social Spark. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
