import { Mail, Phone, Users } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Staff = () => {
  // Sample staff data - will be replaced with CMS data
  const staff = [
    {
      name: "Dr. Rajesh Kumar",
      position: "Chief Librarian",
      email: "rajesh@mvgsc.edu",
      phone: "+91-XXX-XXX-1234",
      department: "Library Administration",
    },
    {
      name: "Mrs. Priya Sharma",
      position: "Assistant Librarian",
      email: "priya@mvgsc.edu",
      phone: "+91-XXX-XXX-2345",
      department: "Circulation & Reference",
    },
    {
      name: "Mr. Arun Patel",
      position: "Library Assistant",
      email: "arun@mvgsc.edu",
      phone: "+91-XXX-XXX-3456",
      department: "Technical Services",
    },
    {
      name: "Ms. Anita Desai",
      position: "Digital Resources Manager",
      email: "anita@mvgsc.edu",
      phone: "+91-XXX-XXX-4567",
      department: "E-Resources",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6">
              <Users className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Library Staff</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet our dedicated team of library professionals committed to serving your academic needs
            </p>
          </div>

          {/* Staff Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {staff.map((member, index) => (
              <GlassCard
                key={index}
                hover
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Avatar Placeholder */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-primary font-medium">{member.position}</p>
                      <p className="text-sm text-muted-foreground">{member.department}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`mailto:${member.email}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {member.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{member.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Additional Information */}
          <GlassCard className="mt-12 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Library Hours</h2>
              <div className="max-w-md mx-auto space-y-2 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-medium">8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-medium">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Staff;
