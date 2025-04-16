
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Fingerprint, Globe, ShieldCheck, Users, Database, BrainCircuit } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <Card className="card-hover border-none shadow-md bg-white">
      <CardHeader>
        <div className="mb-4 w-12 h-12 rounded-lg bg-guardian-light flex items-center justify-center">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-guardian-light/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-guardian-dark mb-4">Core Components</h2>
          <p className="text-muted-foreground">
            Guardian One integrates multiple technologies to create a comprehensive protection system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Biometric Child Identity Ledger"
            description="Secure, tamper-proof identity tracking using blockchain technology to protect child identities worldwide."
            icon={<Fingerprint className="w-6 h-6 text-guardian-primary" />}
          />
          <FeatureCard
            title="Real-Time Risk Detection AI"
            description="AI-powered monitoring system that identifies suspicious patterns and potential trafficking situations."
            icon={<BrainCircuit className="w-6 h-6 text-guardian-primary" />}
          />
          <FeatureCard
            title="Global Protection Network"
            description="Cross-border cooperation framework connecting law enforcement agencies and humanitarian organizations."
            icon={<Globe className="w-6 h-6 text-guardian-primary" />}
          />
          <FeatureCard
            title="DarkNet & Social Signal Crawlers"
            description="Advanced monitoring tools that detect trafficking content and coded communications across all channels."
            icon={<Database className="w-6 h-6 text-guardian-primary" />}
          />
          <FeatureCard
            title="Community Shield App"
            description="Mobile application empowering communities with reporting tools and educational resources."
            icon={<Users className="w-6 h-6 text-guardian-primary" />}
          />
          <FeatureCard
            title="Interoperability Layer"
            description="Secure API framework connecting police, customs, hospitals, and aid agencies to synchronize child protection."
            icon={<ShieldCheck className="w-6 h-6 text-guardian-primary" />}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
