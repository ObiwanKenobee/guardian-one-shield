
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldIcon } from "@/components/ui/ShieldIcon";
import { Shield, AlertTriangle, MessageSquare } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="hero-gradient absolute inset-0 opacity-95"></div>
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
              <ShieldIcon size={32} pulse={true} className="text-white" />
              <h1 className="text-2xl font-bold tracking-tight">GUARDIAN ONE</h1>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Protecting children through innovative technology
            </h2>
            <p className="text-lg text-white/80 max-w-lg">
              A comprehensive technological ecosystem designed to prevent and detect child trafficking globally, using AI, blockchain, and community engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="bg-white text-guardian-primary hover:bg-gray-100">
                <Link to="/dashboard">
                  <Shield className="mr-2 h-5 w-5" />
                  View Dashboard
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/report">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Report Incident
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="relative w-96 h-96">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-full animate-pulse-shield"></div>
              <div className="absolute inset-8 bg-white/20 backdrop-blur-lg rounded-full animate-pulse-shield [animation-delay:250ms]"></div>
              <div className="absolute inset-16 bg-white/30 backdrop-blur-lg rounded-full animate-pulse-shield [animation-delay:500ms]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="w-32 h-32 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="text-background fill-current">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
