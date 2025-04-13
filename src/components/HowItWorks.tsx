
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Palette, Send } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <MessageSquare className="h-10 w-10 text-purple-500" />,
      title: "Describe Your Content",
      description: "Tell us what type of post you want to create and provide details like topic, audience, and tone."
    },
    {
      icon: <Palette className="h-10 w-10 text-purple-500" />,
      title: "Choose Your Style",
      description: "Select a template and platform that matches your brand and audience preferences."
    },
    {
      icon: <Send className="h-10 w-10 text-purple-500" />,
      title: "Generate & Share",
      description: "Get AI-generated content optimized for your chosen platform, ready to copy and post."
    }
  ];

  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Create engaging social media content in just a few steps with our AI-powered generator
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="border-slate-200">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-purple-100 rounded-full">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-slate-500">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
