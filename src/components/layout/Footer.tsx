
import { Link } from "react-router-dom";
import { Shield, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-guardian-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              <span className="font-bold text-lg">GUARDIAN ONE</span>
            </div>
            <p className="text-sm text-gray-300">
              A Zero-to-One technological ecosystem to prevent and detect child 
              trafficking globally.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/report" className="hover:text-white transition-colors">Report</Link></li>
              <li><Link to="/alerts" className="hover:text-white transition-colors">Alerts</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-white transition-colors">Our Mission</Link></li>
              <li><Link to="/partners" className="hover:text-white transition-colors">Partners</Link></li>
              <li><Link to="/technology" className="hover:text-white transition-colors">Technology</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/data" className="hover:text-white transition-colors">Data Protection</Link></li>
              <li><Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} GUARDIAN ONE. All rights reserved.
          </p>
          <div className="flex items-center gap-2 mt-4 md:mt-0 text-sm text-gray-300">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-guardian-accent" />
            <span>for a safer world</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
