import { Link } from "react-router-dom";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="glass-card mt-20 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-bold gradient-text">Sir M V G S C Library</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering knowledge seekers with comprehensive resources and modern facilities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/opac" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                OPAC Search
              </Link>
              <Link to="/e-resources" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                E-Resources
              </Link>
              <Link to="/staff" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Staff Directory
              </Link>
              <Link to="/question-papers" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Question Papers
              </Link>
            </div>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold mb-4">Information</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Sir MV Government Science College</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+91-XXX-XXX-XXXX</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>library@mvgsc.edu</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Sir MV Government Science College Library. All rights reserved.</p>
          <p className="mt-2">
            Developed by{" "}
            <a
              href="https://codersclub.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              The Coders Club
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
