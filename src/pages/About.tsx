import { Building2, BookOpen, Code2, Users } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import collegeImage from "@/assets/college-building.jpg";
import libraryImage from "@/assets/library-interior.jpg";

const About = () => {
  const supervisors = [
    {
      name: "Dr. Shoaib Ahammed",
      role: "Project Supervisor",
    },
    {
      name: "Manjunath H R",
      role: "Head of Department, BCA",
    },
  ];

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
                <h2 className="text-4xl font-bold">About the College</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Sir M. Visvesvaraya Government Science College stands as a testament to academic 
                    excellence and innovation in higher education. Established with a vision to nurture 
                    scientific temperament and foster research, our institution has been at the forefront 
                    of quality education for decades.
                  </p>
                  <p>
                    Named after the legendary engineer and statesman Sir M. Visvesvaraya, our college 
                    embodies his principles of precision, dedication, and service to society. We offer 
                    comprehensive programs across various scientific disciplines including Physics, Chemistry, 
                    Mathematics, Computer Science, and Life Sciences.
                  </p>
                  <p>
                    With state-of-the-art laboratories, experienced faculty, and a commitment to holistic 
                    development, we prepare students to become leaders and innovators in their chosen fields.
                  </p>
                </div>
              </div>

              <div className="relative animate-fade-in">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
                <img
                  src={collegeImage}
                  alt="College Building"
                  className="relative rounded-2xl shadow-2xl w-full h-auto"
                />
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
                <img
                  src={libraryImage}
                  alt="Library Interior"
                  className="relative rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>

              <div className="order-1 lg:order-2 space-y-6 animate-fade-in-up">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4">
                  <BookOpen className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold">About the Library</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
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
                </div>

                <GlassCard>
                  <h3 className="font-semibold mb-3">Library Statistics</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-2xl font-bold gradient-text">50,000+</div>
                      <div className="text-muted-foreground">Books</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold gradient-text">200+</div>
                      <div className="text-muted-foreground">Journals</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold gradient-text">100+</div>
                      <div className="text-muted-foreground">Seats</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold gradient-text">24/7</div>
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
              <h2 className="text-4xl font-bold mb-4">About the Website</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                This website was developed as an initiative to modernize and centralize access to the 
                library's resources for students and faculty. The platform provides seamless access to 
                our catalog, digital resources, and academic materials.
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
                      {supervisors.map((supervisor, index) => (
                        <div key={index} className="space-y-1">
                          <div className="font-medium">{supervisor.name}</div>
                          <div className="text-sm text-muted-foreground">{supervisor.role}</div>
                        </div>
                      ))}
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
                      This website was designed and developed by the talented students of
                    </p>
                    <a
                      href="https://codersclub.netlify.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg transition-all duration-300 hover-lift"
                    >
                      <span className="font-medium">The Coders Club</span>
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
