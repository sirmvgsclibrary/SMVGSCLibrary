import { Mail, Phone, MapPin, Clock } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

interface ContactData {
  address: string;
  phone: string;
  libraryPhone: string;
  email: string;
  libraryEmail: string;
}

interface HoursData {
  weekday: {
    days: string;
    hours: string;
  };
  saturday: {
    hours: string;
  };
  sunday: {
    status: string;
  };
}

const Contact = () => {
  const [contactInfo, setContactInfo] = useState<ContactData | null>(null);
  const [libraryHours, setLibraryHours] = useState<HoursData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContactData = async () => {
      try {
        setLoading(true);
        
        // Load contact information
        try {
          const contactModule = await import('../../content/settings/contact.json');
          setContactInfo(contactModule.default);
        } catch (err) {
          console.log('Contact settings not found, using fallback');
        }

        // Load library hours
        try {
          const hoursModule = await import('../../content/settings/hours.json');
          setLibraryHours(hoursModule.default);
        } catch (err) {
          console.log('Library hours settings not found, using fallback');
        }

      } catch (err) {
        console.error('Error loading contact data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadContactData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Loading skeleton */}
            <div className="text-center mb-12">
              <div className="inline-flex p-4 rounded-2xl bg-gray-300 mb-6 animate-pulse">
                <Mail className="h-12 w-12 text-gray-400" />
              </div>
              <div className="h-10 bg-gray-300 rounded w-64 mx-auto mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-6 rounded-2xl bg-gray-300 animate-pulse">
                  <div className="w-16 h-16 rounded-xl bg-gray-400 mx-auto mb-4"></div>
                  <div className="h-6 bg-gray-400 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-400 rounded"></div>
                    <div className="h-4 bg-gray-400 rounded w-5/6 mx-auto"></div>
                  </div>
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

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6">
              <Mail className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to us through any of the following channels.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Address Card */}
            <GlassCard hover className="animate-fade-in-up">
              <div className="text-center space-y-4">
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-2">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Visit Us</h3>
                <p className="text-muted-foreground">
                  {contactInfo?.address || (
                    <>
                      Sir M. Visvesvaraya Government Science College<br />
                      Library Building<br />
                      [City, State - Pincode]
                    </>
                  )}
                </p>
              </div>
            </GlassCard>

            {/* Phone Card */}
            <GlassCard hover className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="text-center space-y-4">
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 mb-2">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Call Us</h3>
                <p className="text-muted-foreground">
                  {contactInfo?.phone ? (
                    <>
                      Main: {contactInfo.phone}<br />
                      {contactInfo.libraryPhone && `Library: ${contactInfo.libraryPhone}`}<br />
                      Mon - Fri: 10 AM - 4 PM
                    </>
                  ) : (
                    <>
                      Library: +917892468482<br />
                      Mon - Fri: 10 AM - 4 PM
                    </>
                  )}
                </p>
              </div>
            </GlassCard>

            {/* Email Card */}
            <GlassCard hover className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="text-center space-y-4">
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 mb-2">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Email Us</h3>
                <p className="text-muted-foreground">
                  {contactInfo?.email ? (
                    <>
                      General: {contactInfo.email}<br />
                      {contactInfo.libraryEmail && `Library: ${contactInfo.libraryEmail}`}<br />
                    </>
                  ) : (
                    <>
                      General: info@mvgsc.edu<br />
                      Library: library@mvgsc.edu<br />
                      We reply within 24 hours
                    </>
                  )}
                </p>
              </div>
            </GlassCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Library Hours */}
            <GlassCard className="animate-fade-in-up">
              <div className="flex items-start gap-3 mb-4">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-4">Library Hours</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-border/50">
                      <span className="font-medium">
                        {libraryHours?.weekday?.days || "Monday - Friday"}
                      </span>
                      <span className="text-muted-foreground">
                        {libraryHours?.weekday?.hours || "10:00 AM - 4:00 PM"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-border/50">
                      <span className="font-medium">Saturday</span>
                      <span className="text-muted-foreground">
                        {libraryHours?.saturday?.hours || "10:00 AM - 2:00 PM"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Sunday</span>
                      <span className="text-red-500 font-medium">
                        {libraryHours?.sunday?.status || "Closed"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Interactive Map */}
            <GlassCard className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <h3 className="text-xl font-semibold mb-4">Location</h3>
              <div className="w-full rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15497.685676054243!2d75.679545!3d13.813715!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbb01b2af9f990d%3A0xb22e8b8aed6ff3ca!2sSir%20M%20V%20Govt%20Science%20College%20Bommanakatte!5e0!3m2!1sen!2sus!4v1759596070864!5m2!1sen!2sus" 
                  width="100%" 
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                  title="Sir M V Govt Science College Location"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-3 text-center">
                Sir M. Visvesvaraya Government Science College, Bommanakatte
              </p>
            </GlassCard>
          </div>

          {/* Additional Info */}
          <GlassCard className="mt-8 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">Need Immediate Assistance?</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                For urgent matters or immediate assistance, please visit the library circulation desk 
                during working hours. Our staff will be happy to help you in person.
              </p>
            </div>
          </GlassCard>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
