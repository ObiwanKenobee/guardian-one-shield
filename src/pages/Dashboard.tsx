
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { OverviewTab } from "@/components/dashboard/OverviewTab";
import { AlertsTab } from "@/components/dashboard/AlertsTab";
import { AnalyticsTab } from "@/components/dashboard/AnalyticsTab";
import { MapTab } from "@/components/dashboard/MapTab";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

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

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertsTab />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTab />
          </TabsContent>

          <TabsContent value="map">
            <MapTab />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
