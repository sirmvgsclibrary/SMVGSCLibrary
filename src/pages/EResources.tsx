import { ExternalLink, Database, FileText, Globe, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/GlassCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import eResourcesBg from "@/assets/e-resources-bg.jpg";

const EResources = () => {
  const resources = [
    {
      title: "JSTOR",
      description: "Digital library of academic journals, books, and primary sources",
      category: "Journals",
      icon: FileText,
      url: "https://www.jstor.org",
    },
    {
      title: "IEEE Xplore",
      description: "Full-text access to IEEE publications and standards",
      category: "Technical",
      icon: Database,
      url: "https://ieeexplore.ieee.org",
    },
    {
      title: "ScienceDirect",
      description: "Leading full-text scientific database offering journal articles",
      category: "Science",
      icon: Book,
      url: "https://www.sciencedirect.com",
    },
    {
      title: "NPTEL",
      description: "National Programme on Technology Enhanced Learning - Free online courses",
      category: "Courses",
      icon: Globe,
      url: "https://nptel.ac.in",
    },
  ];

  const categories = ["All", "Journals", "Technical", "Science", "Courses"];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden mb-16">
          <div className="absolute inset-0">
            <img
              src={eResourcesBg}
              alt="E-Resources Background"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center animate-fade-in-up">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6">
                <Database className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4">E-Resources</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Access our curated collection of digital databases, journals, and online learning platforms
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category) => (
              <Button key={category} variant="outline" size="sm">
                {category}
              </Button>
            ))}
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {resources.map((resource, index) => (
              <GlassCard
                key={index}
                hover
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent">
                      <resource.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{resource.title}</h3>
                      <span className="text-sm text-primary font-medium">{resource.category}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 flex-grow">{resource.description}</p>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex"
                  >
                    <Button variant="outline" className="gap-2 w-full">
                      Access Resource
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Access Information */}
          <GlassCard className="bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Need Help Accessing Resources?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                For access credentials or assistance with e-resources, please contact the library staff 
                or visit the circulation desk during library hours.
              </p>
              <Button size="lg" className="gap-2">
                Contact Library Staff
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EResources;
