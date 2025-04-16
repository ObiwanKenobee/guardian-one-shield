
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { 
  AlertCircle, 
  AlertTriangle, 
  Bell, 
  Filter, 
  Search, 
  MapPin, 
  Clock, 
  ChevronRight, 
  ShieldAlert
} from "lucide-react";

interface Alert {
  id: number;
  title: string;
  location: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  status: "active" | "investigating" | "resolved";
  time: string;
  distance?: string;
}

const alertData: Alert[] = [
  {
    id: 1,
    title: "Child ID Mismatch",
    location: "Bangkok International Airport, Thailand",
    description: "Biometric verification failure for 3 children traveling with single adult. Local authorities alerted.",
    severity: "critical",
    status: "active",
    time: "10 minutes ago",
    distance: "4,562 km"
  },
  {
    id: 2,
    title: "Suspicious Border Activity",
    location: "Mombasa Port, Kenya",
    description: "Multiple children detected in non-passenger vehicle attempting to board cargo vessel.",
    severity: "high",
    status: "investigating",
    time: "45 minutes ago",
    distance: "7,820 km"
  },
  {
    id: 3,
    title: "Pattern Recognition Alert",
    location: "Manila, Philippines",
    description: "AI system detected unusual movement pattern of children between school and suspected trafficking location.",
    severity: "medium",
    status: "investigating",
    time: "2 hours ago",
    distance: "3,241 km"
  },
  {
    id: 4,
    title: "Digital Signal Detection",
    location: "Dark Web Forum",
    description: "NLP crawler detected coded conversation regarding child transportation to Europe.",
    severity: "high",
    status: "active",
    time: "3 hours ago"
  },
  {
    id: 5,
    title: "Community Report",
    location: "Mumbai Suburban District, India",
    description: "Multiple community reports of unknown individuals photographing children outside school.",
    severity: "medium",
    status: "active",
    time: "5 hours ago",
    distance: "5,738 km"
  },
  {
    id: 6,
    title: "Educational Anomaly",
    location: "Lagos, Nigeria",
    description: "Cluster of 15+ students marked missing from school attendance over 3-day period.",
    severity: "low",
    status: "resolved",
    time: "1 day ago",
    distance: "8,912 km"
  }
];

const Alerts = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [alerts, setAlerts] = useState(alertData);

  const getSeverityColor = (severity: Alert["severity"]) => {
    switch(severity) {
      case "critical":
        return "bg-guardian-accent text-white";
      case "high":
        return "bg-guardian-warning text-white";
      case "medium":
        return "bg-amber-500 text-white";
      case "low":
        return "bg-guardian-primary text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: Alert["status"]) => {
    switch(status) {
      case "active":
        return "bg-guardian-accent/15 text-guardian-accent border-guardian-accent/30";
      case "investigating":
        return "bg-guardian-warning/15 text-guardian-warning border-guardian-warning/30";
      case "resolved":
        return "bg-guardian-success/15 text-guardian-success border-guardian-success/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filteredAlerts = () => {
    if (activeTab === "all") return alerts;
    return alerts.filter(alert => {
      if (activeTab === "critical") return alert.severity === "critical";
      if (activeTab === "active") return alert.status === "active";
      if (activeTab === "resolved") return alert.status === "resolved";
      return true;
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Alert Center</h1>
            <p className="text-muted-foreground">Monitor and respond to potential trafficking situations</p>
          </div>
          <Button className="bg-guardian-primary hover:bg-guardian-dark">
            <Bell className="mr-2 h-4 w-4" />
            Configure Alerts
          </Button>
        </div>

        <AlertBanner
          title="Alert System Status"
          description="All systems operational. Global monitoring active across 42 regions."
          variant="default"
          className="mb-6"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-guardian-accent/10 border-guardian-accent/30">
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-guardian-accent" />
                <span className="text-guardian-accent">Critical Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-guardian-accent">1</div>
            </CardContent>
          </Card>
          
          <Card className="bg-guardian-warning/10 border-guardian-warning/30">
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-guardian-warning" />
                <span className="text-guardian-warning">High Priority</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-guardian-warning">2</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-guardian-primary" />
                <span>Active Cases</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Avg. Response Time</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2 min</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All Alerts</TabsTrigger>
                <TabsTrigger value="critical">Critical</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search alerts..."
                  className="pl-8 w-full md:w-[200px] lg:w-[300px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredAlerts().map((alert) => (
              <Card key={alert.id} className="overflow-hidden">
                <div className={`h-1 ${getSeverityColor(alert.severity)}`} />
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-lg">{alert.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{alert.location}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className={getStatusColor(alert.status)}>
                            {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{alert.description}</p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{alert.time}</span>
                        </div>
                        {alert.distance && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{alert.distance}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex md:flex-col items-center gap-3">
                      <Button variant="outline" size="sm" className="w-full">
                        Details
                      </Button>
                      <Button className="w-full bg-guardian-primary hover:bg-guardian-dark">
                        Respond <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Alerts;
