
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/ui/StatCard";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle, 
  Users, 
  Globe, 
  BarChart, 
  Clock, 
  Shield, 
  Bell,
  MapPin,
  Calendar
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Simulated data - in a real app this would come from an API
  const alerts = [
    { id: 1, region: "Bangkok, Thailand", level: "High", description: "Unusual transportation of 5 children detected", time: "2h ago" },
    { id: 2, region: "Lagos, Nigeria", level: "Medium", description: "Multiple identity verification failures", time: "6h ago" },
    { id: 3, region: "Mumbai, India", level: "Low", description: "Anomalous school absence patterns detected", time: "12h ago" },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h1>

        <AlertBanner
          title="Critical Alert"
          description="Biometric match found for missing child ID#23408 in Manila. Local authorities dispatched."
          variant="destructive"
          className="mb-6"
        />

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="map">Global Map</TabsTrigger>
            </TabsList>
            <Button className="bg-guardian-primary hover:bg-guardian-dark">
              <Bell className="mr-2 h-4 w-4" />
              New Alert
            </Button>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Active Alerts" 
                value="24" 
                icon={AlertCircle}
                description="Across monitored regions"
                trend={{ direction: "up", value: "3 new today" }}
              />
              <StatCard 
                title="Protected Children" 
                value="256,789" 
                icon={Shield}
                description="Registered in BCIL system"
                trend={{ direction: "up", value: "1,231 this week" }}
              />
              <StatCard 
                title="Response Time" 
                value="4.2 min" 
                icon={Clock}
                description="Average alert response"
                trend={{ direction: "down", value: "28% improvement" }}
              />
              <StatCard 
                title="Active Regions" 
                value="42" 
                icon={Globe}
                description="With monitoring enabled"
                trend={{ direction: "up", value: "2 new this month" }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>System-wide alerts and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alerts.map((alert) => (
                      <div key={alert.id} className="flex items-start gap-4 p-4 rounded-lg border">
                        <div className={`p-2 rounded-full ${
                          alert.level === "High" 
                            ? "bg-guardian-accent/15 text-guardian-accent" 
                            : alert.level === "Medium"
                            ? "bg-guardian-warning/15 text-guardian-warning"
                            : "bg-guardian-primary/15 text-guardian-primary"
                        }`}>
                          <AlertCircle className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{alert.region}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              alert.level === "High" 
                                ? "bg-guardian-accent/15 text-guardian-accent" 
                                : alert.level === "Medium"
                                ? "bg-guardian-warning/15 text-guardian-warning"
                                : "bg-guardian-primary/15 text-guardian-primary"
                            }`}>
                              {alert.level} Risk
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-muted-foreground">{alert.time}</span>
                            <Button variant="outline" size="sm">View Details</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Scheduled operations and maintenance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg border">
                      <Calendar className="h-5 w-5 text-guardian-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">System Maintenance</h4>
                        <p className="text-xs text-muted-foreground">April 18, 2025 - 02:00 UTC</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg border">
                      <MapPin className="h-5 w-5 text-guardian-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">Field Operation</h4>
                        <p className="text-xs text-muted-foreground">Nairobi Region - April 20, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg border">
                      <Users className="h-5 w-5 text-guardian-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">Partner Training</h4>
                        <p className="text-xs text-muted-foreground">Virtual - April 22, 2025</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Alerts</CardTitle>
                <CardDescription>Real-time monitoring of high-risk situations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Detailed alert information will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>System-wide performance metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Analytics data will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Global Monitoring Map</CardTitle>
                <CardDescription>Geographic visualization of alerts and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Interactive map will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
