
import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Menu, X, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-guardian-primary" />
            <span className="font-bold text-lg text-guardian-primary">GUARDIAN ONE</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-guardian-primary transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="text-sm font-medium hover:text-guardian-primary transition-colors">
            Dashboard
          </Link>
          <Link to="/report" className="text-sm font-medium hover:text-guardian-primary transition-colors">
            Report
          </Link>
          <Link to="/alerts" className="text-sm font-medium hover:text-guardian-primary transition-colors">
            Alerts
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-guardian-primary transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-guardian-accent rounded-full"></span>
          </Button>
          
          <Button variant="default" className="hidden md:flex bg-guardian-primary hover:bg-guardian-dark">
            Emergency SOS
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-sm font-medium hover:text-guardian-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className="text-sm font-medium hover:text-guardian-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/report" 
              className="text-sm font-medium hover:text-guardian-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Report
            </Link>
            <Link 
              to="/alerts" 
              className="text-sm font-medium hover:text-guardian-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Alerts
            </Link>
            <Link 
              to="/about" 
              className="text-sm font-medium hover:text-guardian-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Button variant="default" className="w-full bg-guardian-primary hover:bg-guardian-dark">
              Emergency SOS
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
