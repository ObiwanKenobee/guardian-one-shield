
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Stats from "@/components/home/Stats";
import CTA from "@/components/home/CTA";
import { AlertBanner } from "@/components/ui/AlertBanner";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <AlertBanner
          title="System Alert"
          description="Increased trafficking activity detected in Southeast Asia region. Local authorities have been notified."
          variant="warning"
          className="mx-4 mt-4"
        />

        <Hero />
        <Features />
        <Stats />
        <CTA />
      </div>
    </Layout>
  );
};

export default Index;
