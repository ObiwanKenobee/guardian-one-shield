
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
  ShieldAlert,
  Plus,
  Loader2,
  Edit
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAlerts, Alert } from "@/hooks/useAlerts";
import { AlertsTable } from "@/components/alerts/AlertsTable";
import { AlertForm } from "@/components/alerts/AlertForm";

const Alerts = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [sortBy, setSortBy] = useState("newest");

  const {
    alerts,
    loading,
    error,
    addAlert,
    editAlert,
    removeAlert
  } = useAlerts();

  const handleCreateSubmit = async (data: Partial<Alert>) => {
    try {
      await addAlert({
        ...data,
        user_id: "placeholder-user-id", // Replace with actual user ID when auth is implemented
      } as any);
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error("Error creating alert:", error);
    }
  };

  const handleEditSubmit = async (data: Partial<Alert>) => {
    if (!selectedAlert) return;
    try {
      await editAlert(selectedAlert.id, data);
      setIsEditDialogOpen(false);
      setSelectedAlert(null);
    } catch (error) {
      console.error("Error updating alert:", error);
    }
  };

  const handleDelete = async (alert: Alert) => {
    try {
      await removeAlert(alert.id);
    } catch (error) {
      console.error("Error deleting alert:", error);
    }
  };

  const handleEditClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsEditDialogOpen(true);
  };

  const handleViewDetailsClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsViewDialogOpen(true);
  };

  const getSeverityColor = (severity: string) => {
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

  const getStatusColor = (status: string) => {
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

  // Filter alerts based on active tab and search query
  const filteredAlerts = alerts.filter(alert => {
    // Tab filtering
    if (activeTab === "critical" && alert.risk_level !== "critical") return false;
    if (activeTab === "active" && alert.status !== "active") return false;
    if (activeTab === "resolved" && alert.status !== "resolved") return false;
    
    // Search filtering
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        alert.title.toLowerCase().includes(query) ||
        alert.description.toLowerCase().includes(query) ||
        // Fix the type issue with location by explicitly checking if it's a string and using a safe approach
        (alert.location && typeof alert.location === 'string' ? 
          alert.location.toLowerCase().includes(query) : 
          false)
      );
    }
    
    return true;
  });

  // Sort alerts
  const sortedAlerts = [...filteredAlerts].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else if (sortBy === "priority") {
      const riskOrder = { "critical": 0, "high": 1, "medium": 2, "low": 3 };
      return riskOrder[a.risk_level as keyof typeof riskOrder] - riskOrder[b.risk_level as keyof typeof riskOrder];
    } else if (sortBy === "location") {
      // Sort by location string or coordinates
      const locA = typeof a.location === 'string' ? a.location : `${a.location.lat},${a.location.lng}`;
      const locB = typeof b.location === 'string' ? b.location : `${b.location.lat},${b.location.lng}`;
      return locA.localeCompare(locB);
    }
    return 0;
  });

  // Alert stat counts
  const criticalCount = alerts.filter(a => a.risk_level === "critical").length;
  const highPriorityCount = alerts.filter(a => a.risk_level === "high").length;
  const activeCount = alerts.filter(a => a.status === "active").length;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Alert Center</h1>
            <p className="text-muted-foreground">Monitor and respond to potential trafficking situations</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-guardian-primary hover:bg-guardian-dark" onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> New Alert
            </Button>
            <Button className="bg-guardian-primary hover:bg-guardian-dark">
              <Bell className="mr-2 h-4 w-4" />
              Configure Alerts
            </Button>
          </div>
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
              <div className="text-2xl font-bold text-guardian-accent">{criticalCount}</div>
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
              <div className="text-2xl font-bold text-guardian-warning">{highPriorityCount}</div>
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
              <div className="text-2xl font-bold">{activeCount}</div>
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Select defaultValue="newest" value={sortBy} onValueChange={setSortBy}>
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
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-guardian-primary" />
              </div>
            ) : sortedAlerts.length === 0 ? (
              <Card>
                <CardContent className="py-12 flex flex-col items-center justify-center text-muted-foreground">
                  <AlertTriangle className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No alerts found</h3>
                  <p className="max-w-md text-center">
                    {searchQuery ? 
                      "No alerts match your search criteria. Try adjusting your filters or search terms." : 
                      "There are no alerts in this category. Create a new alert to get started."}
                  </p>
                  <Button 
                    className="mt-4 bg-guardian-primary hover:bg-guardian-dark"
                    onClick={() => setIsCreateDialogOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Create New Alert
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <AlertsTable 
                alerts={sortedAlerts}
                onEdit={handleEditClick}
                onDelete={handleDelete}
                onViewDetails={handleViewDetailsClick}
              />
            )}
          </div>
        </div>
      </div>

      {/* Create Alert Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Alert</DialogTitle>
            <DialogDescription>
              Create a new alert to notify the team of potential trafficking situations.
            </DialogDescription>
          </DialogHeader>
          <AlertForm
            onSubmit={handleCreateSubmit}
            onCancel={() => setIsCreateDialogOpen(false)}
            isSubmitting={loading}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Alert Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Alert</DialogTitle>
            <DialogDescription>
              Update the details of this alert.
            </DialogDescription>
          </DialogHeader>
          {selectedAlert && (
            <AlertForm
              alert={selectedAlert}
              onSubmit={handleEditSubmit}
              onCancel={() => setIsEditDialogOpen(false)}
              isSubmitting={loading}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* View Alert Details Dialog */}
      {selectedAlert && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedAlert.title}</DialogTitle>
              <DialogDescription>
                Alert details and information
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <Badge className={getSeverityColor(selectedAlert.risk_level)}>
                    {selectedAlert.risk_level.charAt(0).toUpperCase() + selectedAlert.risk_level.slice(1)} Risk
                  </Badge>
                </div>
                <div>
                  <Badge variant="outline" className={getStatusColor(selectedAlert.status)}>
                    {selectedAlert.status.charAt(0).toUpperCase() + selectedAlert.status.slice(1)}
                  </Badge>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-1">Description</h3>
                <p className="text-sm text-muted-foreground">{selectedAlert.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground">
                    {typeof selectedAlert.location === 'string' 
                      ? selectedAlert.location 
                      : `${selectedAlert.location.lat.toFixed(4)}, ${selectedAlert.location.lng.toFixed(4)}`}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-1">Created</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedAlert.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    handleEditClick(selectedAlert);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button className="bg-guardian-primary hover:bg-guardian-dark">
                  <Bell className="h-4 w-4 mr-2" /> Respond
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Layout>
  );
};

export default Alerts;
