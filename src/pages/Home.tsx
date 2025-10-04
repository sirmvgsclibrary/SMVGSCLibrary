import { Link } from "react-router-dom";
import { Search, BookOpen, FileText, Users, ChevronRight, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/GlassCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import collegeImage from "@/assets/college-building.jpg";
import libraryImage from "@/assets/library-interior.jpg";

const Home = () => {
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

  const announcements = [
    {
      title: "New Books Added",
      date: "March 15, 2024",
      description: "150+ new titles across various departments now available.",
    },
    {
      title: "Extended Hours",
      date: "March 10, 2024",
      description: "Library now open until 8 PM on weekdays.",
    },
    {
      title: "Digital Resources",
      date: "March 5, 2024",
      description: "New e-journal subscriptions activated for all students.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Welcome to <span className="gradient-text">MVGSC Library</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Sir MV Government Science College Library - Your gateway to knowledge, research, and academic excellence.
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
              <img
                src={libraryImage}
                alt="Library Interior"
                className="relative rounded-2xl shadow-2xl w-full h-auto"
              />
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {announcements.map((announcement, index) => (
              <GlassCard
                key={index}
                className="animate-fade-in-up"
                hover
              >
                <div className="flex flex-col h-full">
                  <div className="text-sm text-primary font-medium mb-2">{announcement.date}</div>
                  <h3 className="text-xl font-semibold mb-3">{announcement.title}</h3>
                  <p className="text-muted-foreground flex-grow">{announcement.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
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
