
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, MapPin, Clock } from "lucide-react";

interface ActiveAlert {
  id: string;
  title: string;
  location: string;
  timestamp: string;
  severity: "critical" | "high" | "medium" | "low";
  description: string;
  status: "active" | "investigating" | "resolved";
}

const activeAlerts: ActiveAlert[] = [
  {
    id: "alert-1",
    title: "Multiple Children Transport Alert",
    location: "Bangkok, Thailand",
    timestamp: "2024-04-16T10:30:00Z",
    severity: "critical",
    description: "Unusual pattern detected: Multiple children being transported without proper documentation.",
    status: "active"
  },
  {
    id: "alert-2",
    title: "Identity Verification Failure",
    location: "Lagos, Nigeria",
    timestamp: "2024-04-16T09:15:00Z",
    severity: "high",
    description: "Multiple failed attempts to verify child identities at border checkpoint.",
    status: "investigating"
  }
];

export function AlertsTab() {
  const getSeverityColor = (severity: ActiveAlert["severity"]) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "high":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "low":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  const getStatusColor = (status: ActiveAlert["status"]) => {
    switch (status) {
      case "active":
        return "bg-red-500/10 text-red-500";
      case "investigating":
        return "bg-yellow-500/10 text-yellow-500";
      case "resolved":
        return "bg-green-500/10 text-green-500";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
          <CardDescription>Real-time monitoring of high-risk situations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <h3 className="font-semibold">{alert.title}</h3>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(alert.status)}`}>
                    {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm mb-3">{alert.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
