import { Building2, BookOpen, Code2, Users } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import collegeImage from "@/assets/college-building.jpg";
import libraryImage from "@/assets/library-interior.jpg";
import { useEffect, useState } from "react";

// Define the interfaces
interface PageData {
  title: string;
  body: string;
  image: string;
  images?: string[]; // Add support for multiple images
  statistics?: {
    books: string;
    journals: string;
    seats: string;
    digital: string;
  };
}

interface AboutWebsiteData {
  title: string;
  description: string;
  supervisors: Array<{
    name: string;
    role: string;
  }>;
  team: {
    name: string;
    url: string;
  };
}

const About = () => {
  const [aboutCollege, setAboutCollege] = useState<PageData | null>(null);
  const [aboutLibrary, setAboutLibrary] = useState<PageData | null>(null);
  const [aboutWebsite, setAboutWebsite] = useState<AboutWebsiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        setLoading(true);
        
        const modules = import.meta.glob('../../content/pages/*.json');
        
        for (const path in modules) {
          try {
            const module = await modules[path]() as { default: any };
            const fileName = path.split('/').pop();
            
            switch (fileName) {
              case 'about-college.json':
                setAboutCollege(module.default);
                break;
              case 'about-library.json':
                setAboutLibrary(module.default);
                break;
              case 'about-website.json':
                setAboutWebsite(module.default);
                break;
            }
          } catch (err) {
            console.warn(`Failed to load ${path}:`, err);
          }
        }

      } catch (err) {
        console.error('Error loading about data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAboutData();
  }, []);

  // Auto-slide effect for library images
  useEffect(() => {
    if (!aboutLibrary?.images || aboutLibrary.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === (aboutLibrary.images!.length - 1) ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [aboutLibrary?.images]);

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  const nextSlide = () => {
    if (!aboutLibrary?.images) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === (aboutLibrary.images.length - 1) ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (!aboutLibrary?.images) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? (aboutLibrary.images.length - 1) : prevIndex - 1
    );
  };

  // Get current images array - use images if available, otherwise fall back to single image
  const libraryImages = aboutLibrary?.images && aboutLibrary.images.length > 0 
    ? aboutLibrary.images 
    : aboutLibrary?.image 
      ? [aboutLibrary.image] 
      : [libraryImage];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Loading skeleton for About College */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div className="space-y-6">
                <div className="inline-flex p-4 rounded-2xl bg-gray-300 mb-4 animate-pulse">
                  <Building2 className="h-10 w-10 text-gray-400" />
                </div>
                <div className="h-10 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-64 bg-gray-300 rounded-2xl animate-pulse"></div>
              </div>
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
        {/* About College */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in-up">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4">
                  <Building2 className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold">
                  {aboutCollege?.title || "About the College"}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  {aboutCollege?.body ? (
                    <div className="prose prose-lg max-w-none">
                      {aboutCollege.body.split('\n').map((paragraph, index) => (
                        <p key={index} className="font-medium">{paragraph}</p>
                      ))}
                    </div>
                  ) : (
                    <>
                      <p className="font-medium">
                        Sir M. Visvesvaraya Government Science College stands as a testament to academic 
                        excellence and innovation in higher education. Established with a vision to nurture 
                        scientific temperament and foster research, our institution has been at the forefront 
                        of quality education for decades.
                      </p>
                      <p className="font-medium">
                        Named after the legendary engineer and statesman Sir M. Visvesvaraya, our college 
                        embodies his principles of precision, dedication, and service to society. We offer 
                        comprehensive programs across various scientific disciplines including Physics, Chemistry, 
                        Mathematics, Computer Science, and Life Sciences.
                      </p>
                      <p className="font-medium">
                        With state-of-the-art laboratories, experienced faculty, and a commitment to holistic 
                        development, we prepare students to become leaders and innovators in their chosen fields.
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="relative animate-fade-in">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
                {aboutCollege?.image ? (
                  <img
                    src={aboutCollege.image}
                    alt="College Building"
                    className="relative rounded-2xl shadow-2xl w-full h-auto"
                  />
                ) : (
                  <img
                    src={collegeImage}
                    alt="College Building"
                    className="relative rounded-2xl shadow-2xl w-full h-auto"
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* About Library */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20 bg-gradient-to-br from-primary/5 to-accent/5 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative animate-fade-in">
                <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl blur-2xl" />
                
                {/* Image Carousel */}
                <div className="relative rounded-2xl shadow-2xl overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    {libraryImages.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                          index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Library Interior ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  {libraryImages.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300 backdrop-blur-sm"
                        aria-label="Previous image"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300 backdrop-blur-sm"
                        aria-label="Next image"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Dot Indicators */}
                  {libraryImages.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {libraryImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? 'bg-white scale-125'
                              : 'bg-white/50 hover:bg-white/80'
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="order-1 lg:order-2 space-y-6 animate-fade-in-up">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4">
                  <BookOpen className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold">
                  {aboutLibrary?.title || "About the Library"}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  {aboutLibrary?.body ? (
                    <div className="prose prose-lg max-w-none">
                      {aboutLibrary.body.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  ) : (
                    <>
                      <p>
                        The MVGSC Library serves as the intellectual hub of our institution, housing an 
                        extensive collection of over 50,000 books, journals, and digital resources. Our library 
                        is designed to support both academic excellence and personal intellectual growth.
                      </p>
                      <p>
                        With dedicated reading halls, digital resource centers, and collaborative study spaces, 
                        we provide an environment conducive to learning and research. Our collection spans across 
                        all scientific disciplines, complemented by access to international journals and databases.
                      </p>
                      <p>
                        The library is staffed by experienced professionals who are committed to assisting students 
                        and faculty in their academic pursuits. We continuously update our collection and services 
                        to meet the evolving needs of our academic community.
                      </p>
                    </>
                  )}
                </div>

                <GlassCard>
                  <h3 className="font-semibold mb-3">Library Statistics</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-2xl font-bold gradient-text">
                        {aboutLibrary?.statistics?.books || "50,000+"}
                      </div>
                      <div className="text-muted-foreground">Books</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold gradient-text">
                        {aboutLibrary?.statistics?.digital || "24/7"}
                      </div>
                      <div className="text-muted-foreground">Digital Access</div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>

        {/* About Website */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6">
                <Code2 className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-4">
                {aboutWebsite?.title || "About the Website"}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {aboutWebsite?.description || 
                  "This website was developed as an initiative to modernize and centralize access to the library's resources for students and faculty. The platform provides seamless access to our catalog, digital resources, and academic materials."
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Supervisors */}
              <GlassCard className="animate-fade-in-up">
                <div className="flex items-start gap-3 mb-4">
                  <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Project Supervisors</h3>
                    <div className="space-y-3">
                      {(aboutWebsite?.supervisors && aboutWebsite.supervisors.length > 0) ? (
                        aboutWebsite.supervisors.map((supervisor, index) => (
                          <div key={index} className="space-y-1">
                            <div className="font-medium">{supervisor.name}</div>
                            <div className="text-sm text-muted-foreground">{supervisor.role}</div>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="space-y-1">
                            <div className="font-medium">Dr. Shoaib Ahammed</div>
                            <div className="text-sm text-muted-foreground">Project Supervisor</div>
                          </div>
                          <div className="space-y-1">
                            <div className="font-medium">Manjunath H R</div>
                            <div className="text-sm text-muted-foreground">Head of Department, BCA</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Development Team */}
              <GlassCard className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-start gap-3 mb-4">
                  <Code2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Development Team</h3>
                    <p className="text-muted-foreground mb-4">
                      This website was designed and developed by 
                    </p>
                    <a
                      href={aboutWebsite?.team?.url || "https://codersclub.netlify.app"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg transition-all duration-300 hover-lift"
                    >
                      <span className="font-medium">
                        {aboutWebsite?.team?.name || "The Coders Club"}
                      </span>
                      <span className="text-xs opacity-90">↗</span>
                    </a>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Technologies */}
            <GlassCard className="bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Built with Modern Technology</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  This platform leverages cutting-edge web technologies to provide a fast, responsive, 
                  and user-friendly experience. The content management system allows for easy updates 
                  and maintenance of library resources.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  {["React", "TypeScript", "Tailwind CSS", "Decap CMS"].map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-white/50 dark:bg-card/50 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;