
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const alertData = [
  { month: "Jan", alerts: 65, resolved: 55 },
  { month: "Feb", alerts: 78, resolved: 70 },
  { month: "Mar", alerts: 90, resolved: 85 },
  { month: "Apr", alerts: 81, resolved: 75 },
  { month: "May", alerts: 56, resolved: 50 },
  { month: "Jun", alerts: 55, resolved: 48 },
];

const regionData = [
  { name: "Southeast Asia", value: 35 },
  { name: "South Asia", value: 28 },
  { name: "Africa", value: 24 },
  { name: "Latin America", value: 13 },
];

const responseData = [
  { time: "1min", count: 45 },
  { time: "5min", count: 30 },
  { time: "15min", count: 15 },
  { time: "30min", count: 10 },
];

export function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Alert Trends</CardTitle>
            <CardDescription>Monthly alert volumes and resolutions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={alertData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="alerts" stroke="#8B5CF6" name="Total Alerts" />
                <Line type="monotone" dataKey="resolved" stroke="#10B981" name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regional Distribution</CardTitle>
            <CardDescription>Alert distribution by region</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Response Time Analysis</CardTitle>
            <CardDescription>Time taken to respond to alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={responseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#8B5CF6" fill="#8B5CF6" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
