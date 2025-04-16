
import { StatCard } from "@/components/ui/StatCard";
import { Users, Shield, Globe, Clock } from "lucide-react";

const Stats = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-guardian-dark mb-4">
            Making a Global Impact
          </h2>
          <p className="text-muted-foreground">
            Our technology is designed to scale globally and make a significant difference in child protection efforts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Children Protected" 
            value="250,000+" 
            icon={Users}
            description="Children registered in our biometric system"
            trend={{ direction: "up", value: "15% this month" }}
          />
          <StatCard 
            title="Alert Response Time" 
            value="4.2 min" 
            icon={Clock}
            description="Average time to respond to alerts"
            trend={{ direction: "down", value: "28% improvement" }}
          />
          <StatCard 
            title="Communities Engaged" 
            value="1,240" 
            icon={Shield}
            description="Active community protection networks"
            trend={{ direction: "up", value: "76 new this month" }}
          />
          <StatCard 
            title="Countries Active" 
            value="32" 
            icon={Globe}
            description="Countries with Guardian One systems"
            trend={{ direction: "up", value: "4 new deployments" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Stats;
