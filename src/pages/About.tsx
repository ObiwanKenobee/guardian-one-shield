
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldIcon } from "@/components/ui/ShieldIcon";
import { Shield, Fingerprint, Globe, BrainCircuit, Database, Users, Lock } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <ShieldIcon size={48} className="text-guardian-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">About GUARDIAN ONE</h1>
            <p className="text-lg text-muted-foreground">
              A zero-to-one technological ecosystem to prevent and detect child trafficking globally
            </p>
          </div>

          <Tabs defaultValue="mission" className="space-y-8">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="mission">Our Mission</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="partners">Partners</TabsTrigger>
            </TabsList>
            
            <TabsContent value="mission" className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-guardian-primary">Our Mission</h2>
                <p className="text-muted-foreground">
                  GUARDIAN ONE was established with a singular focus: to create a unified, proactive digital defense system 
                  to prevent child trafficking at scale. While child trafficking is acknowledged globally, existing solutions 
                  are fragmented, reactive, and largely analog.
                </p>
                <p className="text-muted-foreground">
                  Our mission is to leverage cutting-edge technology to protect vulnerable children worldwide through 
                  an integrated approach that combines biometric identity verification, AI-powered risk detection, 
                  and community engagement.
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-guardian-primary">Core Principles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-guardian-primary" />
                        Proactive Protection
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        We believe in preventing trafficking before it occurs through early warning systems and predictive analytics.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-guardian-primary" />
                        Privacy by Design
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        All our systems are built with privacy as a fundamental principle, ensuring data protection and responsible use.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-guardian-primary" />
                        Global Cooperation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        We foster collaboration between governments, NGOs, and communities to create a unified global response.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-guardian-primary" />
                        Community Empowerment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        We provide tools and education to enable communities to protect their own children.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="technology" className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-guardian-primary">Our Technology</h2>
                <p className="text-muted-foreground">
                  GUARDIAN ONE integrates multiple advanced technologies to create a comprehensive child protection ecosystem.
                  Our platform is designed to be decentralized, secure, and interoperable with existing systems.
                </p>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Fingerprint className="h-5 w-5 text-guardian-primary" />
                      Biometric Child Identity Ledger (BCIL)
                    </CardTitle>
                    <CardDescription>Secure identity verification system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The BCIL enrolls children using facial, iris, and fingerprint biometrics, creating a secure, 
                      tamper-proof digital identity. The system uses blockchain technology to ensure data integrity 
                      while maintaining strict privacy controls. Access is limited to authorized agencies with 
                      comprehensive audit trails.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BrainCircuit className="h-5 w-5 text-guardian-primary" />
                      Real-Time Risk Detection AI (RRD-AI)
                    </CardTitle>
                    <CardDescription>Predictive analytics for trafficking prevention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Our AI models continuously monitor patterns and behaviors to identify potential trafficking situations 
                      before they escalate. The system analyzes travel patterns, document validations, and other risk factors 
                      to generate alerts when suspicious activities are detected. RRD-AI also identifies high-risk geographic 
                      areas based on historical data and emerging trends.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-guardian-primary" />
                      DarkNet & Social Signal Crawlers
                    </CardTitle>
                    <CardDescription>Advanced monitoring of trafficking communications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Our specialized crawlers use natural language processing and computer vision to detect trafficking 
                      content across dark web forums, encrypted messaging platforms, and social media. These tools can 
                      identify coded language, suspicious image patterns, and other signals that indicate potential 
                      trafficking activity.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-guardian-primary" />
                      Community Shield App
                    </CardTitle>
                    <CardDescription>Empowering communities to protect children</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The Community Shield App provides tools for anonymous reporting, educational resources, and real-time 
                      alerts about trafficking risks in the local area. The app includes a secure reporting system, an AI 
                      chatbot for guidance on identifying and reporting trafficking, and educational modules to help 
                      communities recognize warning signs.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="partners" className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-guardian-primary">Our Partners</h2>
                <p className="text-muted-foreground">
                  GUARDIAN ONE works with a global network of partners to implement our technology and maximize its impact.
                  Our collaborative approach brings together governments, international organizations, NGOs, and 
                  technology companies.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-guardian-light rounded-full flex items-center justify-center mb-2">
                      <Globe className="h-8 w-8 text-guardian-primary" />
                    </div>
                    <CardTitle>International Organizations</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">
                      We collaborate with UNICEF, IOM, and INTERPOL to implement our systems in trafficking hotspots and 
                      coordinate global response efforts.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-guardian-light rounded-full flex items-center justify-center mb-2">
                      <Shield className="h-8 w-8 text-guardian-primary" />
                    </div>
                    <CardTitle>Government Agencies</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">
                      We work with law enforcement, border control, and child protection agencies to integrate our technology 
                      with existing government systems.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-guardian-light rounded-full flex items-center justify-center mb-2">
                      <Users className="h-8 w-8 text-guardian-primary" />
                    </div>
                    <CardTitle>Non-Governmental Organizations</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">
                      We partner with Save the Children, Plan International, and other NGOs to ensure our technology reaches 
                      the most vulnerable communities.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="rounded-lg bg-muted p-6 text-center">
                <h3 className="text-lg font-medium mb-4">Become a Partner</h3>
                <p className="text-muted-foreground mb-4">
                  We are always looking for new partners who share our vision of a world where every child is safe from trafficking.
                  Whether you're a government agency, NGO, or technology company, we welcome your collaboration.
                </p>
                <a href="/contact" className="text-guardian-primary hover:underline">
                  Contact us to learn more about partnership opportunities →
                </a>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default About;
