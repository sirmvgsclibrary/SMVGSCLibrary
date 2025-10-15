import { Building2, BookOpen, Code2, Users, ChevronLeft, ChevronRight } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import collegeImage from "@/assets/college-building.jpg";
import libraryImage from "@/assets/sirmvlibrary.jpeg";
import { useEffect, useState, useCallback } from "react";

// Define the interfaces
interface PageData {
  title: string;
  body: string;
  image: string;
  images?: string[];
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

  // Get current images array - use images if available, otherwise fall back to single image
  const libraryImages = useCallback(() => {
    if (aboutLibrary?.images && aboutLibrary.images.length > 0) {
      return aboutLibrary.images;
    } else if (aboutLibrary?.image) {
      return [aboutLibrary.image];
    } else {
      return [libraryImage];
    }
  }, [aboutLibrary]);

  // Auto-slide effect for library images
  useEffect(() => {
    const images = libraryImages();
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === (images.length - 1) ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [libraryImages]);

  const goToSlide = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  const nextSlide = useCallback(() => {
    const images = libraryImages();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === (images.length - 1) ? 0 : prevIndex + 1
    );
  }, [libraryImages]);

  const prevSlide = useCallback(() => {
    const images = libraryImages();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? (images.length - 1) : prevIndex - 1
    );
  }, [libraryImages]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Loading skeleton for About College */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-20">
              <div className="space-y-6 order-2 lg:order-1">
                <div className="inline-flex p-4 rounded-2xl bg-gray-300 mb-4 animate-pulse">
                  <Building2 className="h-8 w-8 lg:h-10 lg:w-10 text-gray-400" />
                </div>
                <div className="h-8 lg:h-10 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
                </div>
              </div>
              <div className="relative order-1 lg:order-2">
                <div className="w-full h-48 lg:h-64 xl:h-80 bg-gray-300 rounded-2xl animate-pulse"></div>
              </div>
            </div>

            {/* Loading skeleton for About Library */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-20">
              <div className="relative order-1">
                <div className="w-full h-48 lg:h-64 xl:h-80 bg-gray-300 rounded-2xl animate-pulse"></div>
              </div>
              <div className="space-y-6 order-2">
                <div className="inline-flex p-4 rounded-2xl bg-gray-300 mb-4 animate-pulse">
                  <BookOpen className="h-8 w-8 lg:h-10 lg:w-10 text-gray-400" />
                </div>
                <div className="h-8 lg:h-10 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = libraryImages();
  const hasMultipleImages = images.length > 1;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 lg:pt-24 pb-12 lg:pb-16">
        {/* About College */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16 lg:mb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-4 lg:space-y-6 animate-fade-in-up order-2 lg:order-1">
                <div className="inline-flex p-3 lg:p-4 rounded-2xl bg-gradient-to-br from-primary to-accent mb-3 lg:mb-4">
                  <Building2 className="h-6 w-6 lg:h-10 lg:w-10 text-white" />
                </div>
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                  {aboutCollege?.title || "About the College"}
                </h2>
                <div className="space-y-3 lg:space-y-4 text-muted-foreground leading-relaxed text-sm lg:text-base">
                  {aboutCollege?.body ? (
                    <div className="prose prose-sm lg:prose-lg max-w-none">
                      {aboutCollege.body.split('\n').map((paragraph, index) => (
                        <p key={index} className="font-medium mb-3 lg:mb-4 last:mb-0">
                          {paragraph}
                        </p>
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

              <div className="relative animate-fade-in order-1 lg:order-2 mb-6 lg:mb-0">
                <div className="absolute -inset-2 lg:-inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl lg:blur-2xl" />
                {aboutCollege?.image ? (
                  <img
                    src={aboutCollege.image}
                    alt="College Building"
                    className="relative rounded-2xl shadow-2xl w-full h-auto max-h-80 lg:max-h-96 xl:max-h-[500px] object-cover"
                  />
                ) : (
                  <img
                    src={collegeImage}
                    alt="College Building"
                    className="relative rounded-2xl shadow-2xl w-full h-auto max-h-80 lg:max-h-96 xl:max-h-[500px] object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* About Library */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16 lg:mb-20 bg-gradient-to-br from-primary/5 to-accent/5 py-12 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="relative animate-fade-in order-1 lg:order-1">
                <div className="absolute -inset-2 lg:-inset-4 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl blur-xl lg:blur-2xl" />
                
                {/* Enhanced Image Carousel */}
                <div className="relative rounded-2xl shadow-2xl overflow-hidden group">
                  <div className="relative aspect-[4/3] bg-muted/50">
                    {images.map((image, index) => (
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
                          onError={(e) => {
                            console.error(`Failed to load image: ${image}`);
                            e.currentTarget.src = libraryImage;
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Navigation Arrows - Only show if multiple images */}
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 lg:p-2 transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-4 w-4 lg:h-6 lg:w-6" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 lg:p-2 transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-4 w-4 lg:h-6 lg:w-6" />
                      </button>

                      {/* Dot Indicators */}
                      <div className="absolute bottom-3 lg:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 lg:space-x-2">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`transition-all duration-300 ${
                              index === currentImageIndex
                                ? 'bg-white scale-125'
                                : 'bg-white/50 hover:bg-white/80'
                            }`}
                            style={{
                              width: index === currentImageIndex ? '12px' : '8px',
                              height: '8px',
                              borderRadius: '4px'
                            }}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Slide counter for mobile */}
                  {hasMultipleImages && (
                    <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm lg:hidden">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4 lg:space-y-6 animate-fade-in-up order-2 lg:order-2">
                <div className="inline-flex p-3 lg:p-4 rounded-2xl bg-gradient-to-br from-primary to-accent mb-3 lg:mb-4">
                  <BookOpen className="h-6 w-6 lg:h-10 lg:w-10 text-white" />
                </div>
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                  {aboutLibrary?.title || "About the Library"}
                </h2>
                <div className="space-y-3 lg:space-y-4 text-muted-foreground leading-relaxed text-sm lg:text-base">
                  {aboutLibrary?.body ? (
                    <div className="prose prose-sm lg:prose-lg max-w-none">
                      {aboutLibrary.body.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-3 lg:mb-4 last:mb-0">
                          {paragraph}
                        </p>
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

                <GlassCard className="p-4 lg:p-6">
                  <h3 className="font-semibold text-lg lg:text-xl mb-3 lg:mb-4">Library Statistics</h3>
                  <div className="grid grid-cols-2 gap-3 lg:gap-4 text-sm lg:text-base">
                    <div className="text-center p-3 bg-background/50 rounded-lg">
                      <div className="text-xl lg:text-2xl xl:text-3xl font-bold gradient-text mb-1">
                        {aboutLibrary?.statistics?.books || "20,000+"}
                      </div>
                      <div className="text-muted-foreground text-xs lg:text-sm">Books</div>
                    </div>
                    <div className="text-center p-3 bg-background/50 rounded-lg">
                      <div className="text-xl lg:text-2xl xl:text-3xl font-bold gradient-text mb-1">
                        {aboutLibrary?.statistics?.journals || "200+"}
                      </div>
                      <div className="text-muted-foreground text-xs lg:text-sm">Journals</div>
                    </div>
                    <div className="text-center p-3 bg-background/50 rounded-lg">
                      <div className="text-xl lg:text-2xl xl:text-3xl font-bold gradient-text mb-1">
                        {aboutLibrary?.statistics?.seats || "100+"}
                      </div>
                      <div className="text-muted-foreground text-xs lg:text-sm">Seats</div>
                    </div>
                    <div className="text-center p-3 bg-background/50 rounded-lg">
                      <div className="text-xl lg:text-2xl xl:text-3xl font-bold gradient-text mb-1">
                        {aboutLibrary?.statistics?.digital || "24/7"}
                      </div>
                      <div className="text-muted-foreground text-xs lg:text-sm">Digital Access</div>
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
            <div className="text-center mb-8 lg:mb-12 animate-fade-in-up">
              <div className="inline-flex p-3 lg:p-4 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4 lg:mb-6">
                <Code2 className="h-6 w-6 lg:h-10 lg:w-10 text-white" />
              </div>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 lg:mb-4">
                {aboutWebsite?.title || "About the Website"}
              </h2>
              <p className="text-sm lg:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
                {aboutWebsite?.description || 
                  "This website was developed as an initiative to modernize and centralize access to the library's resources for students and faculty. The platform provides seamless access to our catalog, digital resources, and academic materials."
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
              {/* Supervisors */}
              <GlassCard className="animate-fade-in-up p-4 lg:p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Users className="h-5 w-5 lg:h-6 lg:w-6 text-primary flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4">Project Supervisors</h3>
                    <div className="space-y-3 lg:space-y-4">
                      {(aboutWebsite?.supervisors && aboutWebsite.supervisors.length > 0) ? (
                        aboutWebsite.supervisors.map((supervisor, index) => (
                          <div key={index} className="space-y-1">
                            <div className="font-medium text-sm lg:text-base">{supervisor.name}</div>
                            <div className="text-xs lg:text-sm text-muted-foreground">{supervisor.role}</div>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="space-y-1">
                            <div className="font-medium text-sm lg:text-base">Dr. Shoaib Ahammed</div>
                            <div className="text-xs lg:text-sm text-muted-foreground"></div>
                          </div>
                          <div className="space-y-1">
                            <div className="font-medium text-sm lg:text-base">Manjunath H R </div>
                            <div className="text-xs lg:text-sm text-muted-foreground">[H O D] Department of Computer Science</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Development Team */}
              <GlassCard className="animate-fade-in-up p-4 lg:p-6" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-start gap-3 mb-4">
                  <Code2 className="h-5 w-5 lg:h-6 lg:w-6 text-primary flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4">Development Team</h3>
                    <p className="text-muted-foreground text-sm lg:text-base mb-3 lg:mb-4">
                      This website was designed and developed by 
                    </p>
                    <a
                      href={aboutWebsite?.team?.url || "https://hash2code.netlify.app"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm lg:text-base"
                    >
                      <span className="font-medium">
                        {aboutWebsite?.team?.name || "#2Code"}
                      </span>
                      <span className="text-xs opacity-90">↗</span>
                    </a>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Technologies */}
            <GlassCard className="bg-gradient-to-br from-primary/5 to-accent/5 p-4 lg:p-8">
              <div className="text-center space-y-4 lg:space-y-6">
                <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold">Built with Modern Technology</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto text-sm lg:text-base px-2">
                  This platform leverages cutting-edge web technologies to provide a fast, responsive, 
                  and user-friendly experience. The content management system allows for easy updates 
                  and maintenance of library resources.
                </p>
                <div className="flex flex-wrap justify-center gap-2 lg:gap-3 pt-3 lg:pt-4">
                  {["React", "TypeScript", "Tailwind CSS", "Vite", "Decap CMS", "Netlify"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 lg:px-4 py-1 lg:py-2 bg-white/50 dark:bg-card/50 rounded-full text-xs lg:text-sm font-medium"
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
