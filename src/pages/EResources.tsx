import { ExternalLink, Database, FileText, Globe, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/GlassCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import eResourcesBg from "@/assets/e-resources-bg.jpg";
import { useEffect, useState } from "react";

interface EResource {
  title: string;
  description: string;
  category: string;
  icon: string;
  url: string;
  thumbnail?: string;
}

const EResources = () => {
  const [resources, setResources] = useState<EResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const loadEResources = async () => {
      try {
        setLoading(true);
        
        // Load e-resources from JSON files
        const modules = import.meta.glob('../../content/e-resources/*.json');
        const resourcesData: EResource[] = [];

        for (const path in modules) {
          try {
            const module = await modules[path]() as { default: EResource };
            resourcesData.push(module.default);
          } catch (err) {
            console.warn(`Failed to load resource from ${path}:`, err);
          }
        }

        setResources(resourcesData);
      } catch (err) {
        console.error('Error loading e-resources:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEResources();
  }, []);

  // Get unique categories from resources
  const categories = ["All", ...new Set(resources.map(resource => resource.category))];

  // Filter resources by selected category
  const filteredResources = selectedCategory === "All" 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  // Icon mapping
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      FileText,
      Database,
      Book,
      Globe
    };
    return iconMap[iconName] || Database;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="pt-24 pb-16">
          {/* Hero Section Loading */}
          <div className="relative overflow-hidden mb-16">
            <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="text-center">
                <div className="inline-flex p-4 rounded-2xl bg-gray-400 mb-6 animate-pulse">
                  <Database className="h-12 w-12 text-gray-500" />
                </div>
                <div className="h-10 bg-gray-400 rounded w-64 mx-auto mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-400 rounded w-96 mx-auto animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Categories Loading */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="w-20 h-8 bg-gray-300 rounded animate-pulse"></div>
              ))}
            </div>

            {/* Resources Grid Loading */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="p-6 rounded-2xl bg-gray-300 animate-pulse">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-400"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-400 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-400 rounded w-1/3"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-400 rounded mb-2"></div>
                  <div className="h-4 bg-gray-400 rounded w-5/6 mb-4"></div>
                  <div className="h-10 bg-gray-400 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {categories.map((category) => (
                <Button 
                  key={category} 
                  variant={selectedCategory === category ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          )}

          {/* Resources Grid */}
          {filteredResources.length === 0 ? (
            <GlassCard className="text-center py-12 mb-12">
              <Database className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No E-Resources Found</h3>
              <p className="text-muted-foreground">
                {selectedCategory === "All" 
                  ? "E-resources will appear here once added through the CMS."
                  : `No e-resources found in the ${selectedCategory} category.`
                }
              </p>
            </GlassCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {filteredResources.map((resource, index) => {
                const IconComponent = getIconComponent(resource.icon);
                return (
                  <GlassCard
                    key={index}
                    hover
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent">
                          <IconComponent className="h-6 w-6 text-white" />
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
                );
              })}
            </div>
          )}

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