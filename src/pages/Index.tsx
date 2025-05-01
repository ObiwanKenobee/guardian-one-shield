
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Stats from "@/components/home/Stats";
import CTA from "@/components/home/CTA";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <Layout>
      {/* SEO Optimization */}
      <Helmet>
        <title>GUARDIAN ONE | AI & Blockchain-Powered Global Child Trafficking Prevention Ecosystem</title>
        <meta name="description" content="GUARDIAN ONE is the first decentralized, AI-powered platform to prevent and detect child trafficking globally. Featuring biometric ID on blockchain, predictive AI alerts, and community-based reporting tools." />
        <link rel="canonical" href="https://guardian-one.org/" />
        {/* Add schema.org structured data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "GUARDIAN ONE | Child Trafficking Prevention Platform",
              "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": ["h1", "h2", ".speakable"]
              },
              "mainEntity": {
                "@type": "SoftwareApplication",
                "name": "GUARDIAN ONE Platform",
                "applicationCategory": "Safety Application",
                "description": "AI & blockchain-powered platform for preventing and detecting child trafficking globally."
              }
            }
          `}
        </script>
      </Helmet>

      <div className="space-y-4">
        <AlertBanner
          title="System Alert"
          description="Increased trafficking activity detected in Southeast Asia region. Local authorities have been notified."
          variant="warning"
          className="mx-4 mt-4"
        />

        {/* Main content with SEO-optimized structure */}
        <Hero />
        <Features />
        <Stats />
        
        {/* SEO-optimized geo-specific section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold tracking-tight text-guardian-dark mb-6 text-center">
              Global Child Protection Initiatives
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* SEO-optimized geo-specific content */}
              <article className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Child Trafficking Prevention in India</h3>
                <p className="text-muted-foreground">
                  Our biometric child ID system has been deployed across 240 communities in India, 
                  helping prevent child trafficking through advanced identification technology.
                </p>
              </article>
              <article className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">AI Child Rescue in Philippines</h3>
                <p className="text-muted-foreground">
                  Anonymous tip trafficking reporting has led to 94 successful interventions in the 
                  Philippines this year, powered by our AI anomaly detection system.
                </p>
              </article>
              <article className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Plataforma Contra Tráfico Infantil Brasil</h3>
                <p className="text-muted-foreground">
                  Our blockchain-secured platform has connected 30+ agencies across Brazil, 
                  creating a unified response to child trafficking incidents.
                </p>
              </article>
            </div>
          </div>
        </section>
        
        <CTA />
        
        {/* SEO Footer Section with Keywords */}
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold mb-3">Protection Resources</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>AI for Human Trafficking Prevention</li>
                  <li>Cross-Border Child Safety Systems</li>
                  <li>Dark Web Trafficking Detection</li>
                  <li>Anonymous Reporting Tools</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-3">Regional Initiatives</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>NGO Child Safety Solutions in Africa</li>
                  <li>School Alert Systems in Kenya</li>
                  <li>Child Protection Technology in India</li>
                  <li>Thailand Dark Web Monitoring</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-3">Technology Platform</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Biometric Child ID Ledger</li>
                  <li>Child Protection Blockchain</li>
                  <li>Trafficking Risk Detection AI</li>
                  <li>Community-Based Child Protection App</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
