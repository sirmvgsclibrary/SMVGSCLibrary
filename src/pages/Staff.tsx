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
        // Load all JSON files from the staff directory
        const modules = import.meta.glob('/content/staff/*.json');
        const staffData: StaffMember[] = [];

        for (const path in modules) {
          const module = await modules[path]() as { default: StaffMember };
          staffData.push(module.default);
        }

        setStaff(staffData);
      } catch (error) {
        console.error('Error loading staff data:', error);
        // Fallback to empty array
        setStaff([]);
      } finally {
        setLoading(false);
      }
    };

    loadStaffData();
  }, []);

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div>Loading staff information...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6">
              <Users className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Library Staff</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet our dedicated team of library professionals committed to serving your academic needs
            </p>
          </div>

          {/* Staff Grid */}
          {staff.length === 0 ? (
            <GlassCard className="text-center py-12">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Staff Members Found</h3>
              <p className="text-muted-foreground">
                Staff information will appear here once added through the CMS.
              </p>
            </GlassCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {staff.map((member, index) => (
                <GlassCard key={index} hover className="animate-fade-in-up">
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
                            {getInitials(member.name)}
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
                        {member.bio && (
                          <p className="text-sm text-muted-foreground mt-2">{member.bio}</p>
                        )}
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
          )}

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