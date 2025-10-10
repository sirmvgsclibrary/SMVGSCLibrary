import { Link } from "react-router-dom";
import { Search, BookOpen, FileText, Users, ChevronRight, Bell, X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/GlassCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import collegeImage from "@/assets/sirmvcollege.jpeg";
import libraryImage from "@/assets/library-interior.jpg";
import { useEffect, useState } from "react";

interface HeroData {
  heading: string;
  subheading: string;
  image: string;
  backgroundImage?: string;
}

interface Announcement {
  title: string;
  date: string;
  description: string;
  priority?: string;
  image?: string;
}

const Home = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  const quickLinks = [
    {
      title: "OPAC Search",
      description: "Search our comprehensive catalog of books and resources",
      icon: Search,
      path: "/opac",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "E-Resources",
      description: "Access digital journals, databases, and online materials",
      icon: BookOpen,
      path: "/e-resources",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Question Papers",
      description: "Browse previous year question papers by department",
      icon: FileText,
      path: "/question-papers",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Staff Directory",
      description: "Meet our dedicated library staff and faculty",
      icon: Users,
      path: "/staff",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        
        // Load hero data
        try {
          const heroModule = await import('../../content/settings/hero.json');
          setHeroData(heroModule.default);
        } catch (err) {
          console.log('Hero settings not found, using fallback');
        }

        // Load announcements
        try {
          const modules = import.meta.glob('../../content/announcements/*.json');
          const announcementsData: Announcement[] = [];

          for (const path in modules) {
            try {
              const module = await modules[path]() as { default: Announcement };
              announcementsData.push(module.default);
            } catch (err) {
              console.warn(`Failed to load announcement from ${path}:`, err);
            }
          }

          // Sort announcements by date (newest first) and take latest 3
          const sortedAnnouncements = announcementsData
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 3);

          setAnnouncements(sortedAnnouncements);
        } catch (err) {
          console.log('Announcements not found, using fallback');
        }

      } catch (err) {
        console.error('Error loading home data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const openImage = (imageUrl: string) => {
    setImageLoading(true);
    setSelectedImage(imageUrl);
  };

  const closeImage = () => {
    setSelectedImage(null);
    setImageLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />

        {/* Hero Section Loading */}
        <section className="relative pt-24 pb-20 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="h-16 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded w-full animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded w-5/6 animate-pulse"></div>
                <div className="flex gap-4">
                  <div className="w-32 h-12 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-28 h-12 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="w-full h-64 bg-gray-300 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Quick Access Loading */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-10 bg-gray-300 rounded w-48 mx-auto mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-64 mx-auto animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="p-6 rounded-2xl bg-gray-300 animate-pulse">
                  <div className="w-12 h-12 bg-gray-400 rounded-xl mb-4"></div>
                  <div className="h-6 bg-gray-400 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-400 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeImage}
              className="absolute -top-12 right-0 z-10 p-2 text-white hover:text-primary transition-colors duration-300"
            >
              <X className="h-6 w-6" />
            </button>
            
            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden bg-card shadow-2xl">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-card">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              )}
              <img
                src={selectedImage}
                alt="Announcement"
                className={`max-w-full max-h-[80vh] object-contain transition-opacity duration-500 ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={() => setImageLoading(false)}
              />
            </div>
            
            {/* Download/View Hint */}
            <div className="text-center mt-4 text-white/70 text-sm">
              Click outside or press ESC to close
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {heroData?.backgroundImage && (
          <div className="absolute inset-0">
            <img
              src={heroData.backgroundImage}
              alt="Hero Background"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                {heroData?.heading || (
                  <>
                    Welcome to <span className="gradient-text">MVGSC Library</span>
                  </>
                )}
              </h1>
              <p className="text-xl text-muted-foreground">
                {heroData?.subheading || 
                  "Sir MV Government Science College Library - Your gateway to knowledge, research, and academic excellence."
                }
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/opac">
                  <Button size="lg" className="gap-2">
                    <Search className="h-5 w-5" />
                    Search Catalog
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="gap-2">
                    Learn More
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
              {heroData?.image ? (
                <img
                  src={heroData.image}
                  alt="Library Interior"
                  className="relative rounded-2xl shadow-2xl w-full h-auto"
                />
              ) : (
                <img
                  src={libraryImage}
                  alt="Library Interior"
                  className="relative rounded-2xl shadow-2xl w-full h-auto"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Quick Access</h2>
            <p className="text-muted-foreground">Navigate to our key services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <GlassCard hover>
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${link.gradient} mb-4`}>
                    <link.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{link.title}</h3>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Bell className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Latest Announcements</h2>
          </div>

          {announcements.length === 0 ? (
            <GlassCard className="text-center py-12">
              <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Announcements</h3>
              <p className="text-muted-foreground">
                Announcements will appear here once added through the CMS.
              </p>
            </GlassCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {announcements.map((announcement, index) => (
                <GlassCard
                  key={index}
                  className="animate-fade-in-up group relative overflow-hidden"
                  hover
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-sm text-primary font-medium">
                        {new Date(announcement.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      {announcement.priority === 'high' && (
                        <span className="px-2 py-1 text-xs bg-red-500/10 text-red-600 dark:text-red-400 rounded-full font-medium">
                          Important
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                      {announcement.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground flex-grow mb-4 leading-relaxed">
                      {announcement.description}
                    </p>

                    {/* Image with Enhanced Interaction */}
                    {announcement.image && (
                      <div className="relative mt-auto">
                        <div 
                          className="relative rounded-lg overflow-hidden cursor-pointer group/image bg-muted/50"
                          onClick={() => openImage(announcement.image!)}
                        >
                          <img
                            src={announcement.image}
                            alt={announcement.title}
                            className="w-full h-48 object-cover transition-all duration-500 group-hover/image:scale-105"
                          />
                          
                          {/* Overlay with Zoom Icon */}
                          <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/30 transition-all duration-300 flex items-center justify-center">
                            <div className="transform translate-y-4 opacity-0 group-hover/image:translate-y-0 group-hover/image:opacity-100 transition-all duration-300">
                              <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                                <ZoomIn className="h-5 w-5 text-white" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Click Hint */}
                          <div className="absolute bottom-2 left-2 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                            <span className="text-xs text-white/80 bg-black/50 rounded px-2 py-1 backdrop-blur-sm">
                              Click to view
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* College Highlight */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src={collegeImage}
                alt="College Building"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold">About Our Institution</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sir MV Government Science College stands as a beacon of academic excellence, 
                fostering innovation and knowledge since its establishment. Our library serves 
                as the intellectual heart of the institution, providing students and faculty 
                with access to vast resources and modern facilities.
              </p>
              <Link to="/about">
                <Button variant="outline" size="lg" className="gap-2">
                  Discover More
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;