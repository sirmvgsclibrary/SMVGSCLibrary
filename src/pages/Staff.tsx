import { Mail, Phone, Users } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Import all Markdown or YAML files from content/staff
// This will include every file Decap CMS creates
const staffFiles = import.meta.glob("/content/staff/*.{md,yml,yaml}", { eager: true });

// Parse frontmatter (metadata) from the imported files
const staff = Object.values(staffFiles).map((file: any) => {
  const data = file.attributes || file.frontmatter || {};
  return {
    name: data.name,
    position: data.position,
    department: data.department,
    email: data.email,
    phone: data.phone,
    photo: data.photo,
    bio: data.bio,
  };
});

const Staff = () => {
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
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">
                          {member.name.split(" ").map((n: string) => n[0]).join("")}
                        </span>
                      </div>
                    )}
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
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Staff;
