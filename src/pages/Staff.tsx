import { Mail, Phone, Users } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

interface StaffMember {
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  photo?: string;
  bio?: string;
}

const Staff = () => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStaffData = async () => {
      try {
        const modules = import.meta.glob("../../content/staff/*.json");
        const staffData: StaffMember[] = [];

        for (const path in modules) {
          const module = (await modules[path]()) as { default: StaffMember };
          staffData.push(module.default);
        }

        staffData.sort((a, b) => a.name.localeCompare(b.name));
        setStaff(staffData);
      } catch (error) {
        console.error("Error loading staff data:", error);
        setStaff([]);
      } finally {
        setLoading(false);
      }
    };

    loadStaffData();
  }, []);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ✨ FIXED HEADER SECTION WITH BACKGROUND IMAGE (Same as OPAC) */}
      <header className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 via-background/60 to-background" />

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6 shadow-elegant hover-lift">
            <Users className="h-12 w-12 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold mb-4 gradient-text">Library Staff</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Meet our dedicated team of library professionals committed to supporting your learning journey.
          </p>
        </div>
      </header>

      {/* ✅ Main Section */}
      <main className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20 text-muted-foreground text-lg">Loading staff data...</div>
          ) : staff.length === 0 ? (
            <GlassCard className="text-center py-20 max-w-2xl mx-auto">
              <div className="inline-flex p-6 rounded-2xl bg-muted/50 mb-6">
                <Users className="h-16 w-16 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">
                No Staff Members Found
              </h3>
              <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
                Staff information will appear here once added through the CMS.
              </p>
            </GlassCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {staff.map((member, index) => (
                <GlassCard
                  key={index}
                  hover
                  className="animate-fade-in-up group relative overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-500 hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  <div className="relative z-10">
                    <div className="flex flex-col items-center text-center gap-6 p-2">
                      {/* Avatar */}
                      <div className="relative group/avatar">
                        {member.photo ? (
                          <div className="relative">
                            <img
                              loading="lazy"
                              src={member.photo}
                              alt={member.name}
                              className="w-24 h-24 rounded-2xl object-cover shadow-lg border-4 border-background group-hover/avatar:border-primary/20 transition-all duration-500"
                            />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500" />
                          </div>
                        ) : (
                          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover/avatar:shadow-elegant transition-all duration-500">
                            <span className="text-2xl font-bold text-primary-foreground">
                              {getInitials(member.name)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="space-y-4 flex-1 w-full">
                        <div className="space-y-3">
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-500 leading-tight">
                            {member.name}
                          </h3>
                          <div className="space-y-2">
                            <p className="text-primary font-semibold text-sm uppercase tracking-wider">
                              {member.position}
                            </p>
                            <p className="text-sm text-muted-foreground font-medium bg-muted/50 rounded-lg py-1 px-3 inline-block">
                              {member.department}
                            </p>
                          </div>
                          {member.bio && (
                            <p className="text-sm text-muted-foreground leading-relaxed pt-3 border-t border-border/30">
                              {member.bio}
                            </p>
                          )}
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3 pt-3">
                          <div className="flex items-center justify-center gap-3 text-sm group/email">
                            <div className="flex items-center gap-3 bg-muted/50 rounded-xl p-3 group-hover/email:bg-primary/10 transition-all duration-500 w-full max-w-xs">
                              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover/email:bg-primary group-hover/email:text-primary-foreground transition-all duration-500">
                                <Mail className="h-4 w-4" />
                              </div>
                              <a
                                href={`mailto:${member.email}`}
                                className="text-muted-foreground group-hover/email:text-foreground font-medium transition-colors duration-500 truncate flex-1 text-left"
                                title={member.email}
                              >
                                {member.email}
                              </a>
                            </div>
                          </div>

                          <div className="flex items-center justify-center gap-3 text-sm group/phone">
                            <div className="flex items-center gap-3 bg-muted/50 rounded-xl p-3 group-hover/phone:bg-primary/10 transition-all duration-500 w-full max-w-xs">
                              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover/phone:bg-primary group-hover/phone:text-primary-foreground transition-all duration-500">
                                <Phone className="h-4 w-4" />
                              </div>
                              <a
                                href={`tel:${member.phone}`}
                                className="text-muted-foreground group-hover/phone:text-foreground font-medium transition-colors duration-500"
                              >
                                {member.phone}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}

          {/* Library Hours Section */}
          <GlassCard className="mt-20 bg-gradient-to-br from-primary/5 to-accent/3 border-border/30 hover-lift">
            <div className="text-center space-y-8 max-w-2xl mx-auto">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-elegant">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-3xl font-bold gradient-text mb-2">Library Hours</h2>
                <p className="text-muted-foreground text-lg">Visit us during our operating hours</p>
              </div>
              <div className="max-w-md mx-auto space-y-4 bg-card/50 rounded-2xl p-6 border border-border/20">
                <div className="flex justify-between items-center py-3 border-b border-border/30">
                  <span className="font-semibold text-foreground">Monday - Friday</span>
                  <span className="text-primary font-bold bg-primary/10 rounded-lg px-3 py-1">
                    10:00 AM - 4:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border/30">
                  <span className="font-semibold text-foreground">Saturday</span>
                  <span className="text-primary font-bold bg-primary/10 rounded-lg px-3 py-1">
                    10:00 AM - 2:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-semibold text-foreground">Sunday</span>
                  <span className="text-destructive font-bold bg-destructive/10 rounded-lg px-3 py-1">
                    Closed
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground pt-4 border-t border-border/30">
                For immediate assistance, please visit the library during working hours or contact our staff.
              </p>
            </div>
          </GlassCard>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Staff;
