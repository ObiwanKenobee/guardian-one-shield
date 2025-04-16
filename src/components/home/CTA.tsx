
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShieldIcon } from "@/components/ui/ShieldIcon";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-16 md:py-24 hero-gradient text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="mx-auto w-16 h-16 flex items-center justify-center">
            <ShieldIcon size={48} pulse={true} className="text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Join our mission to protect every child
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Every minute counts in the fight against child trafficking. Whether you're a community member, 
            law enforcement officer, or humanitarian worker, your participation makes our shield stronger.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
            <Button asChild size="lg" className="bg-white text-guardian-primary hover:bg-gray-100">
              <Link to="/join">
                Join Guardian One
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/partners">
                Partner With Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
