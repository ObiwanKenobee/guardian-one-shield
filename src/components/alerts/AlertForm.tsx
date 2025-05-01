
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert } from "@/hooks/useAlerts";
import { Loader2 } from "lucide-react";

interface AlertFormProps {
  alert?: Alert;
  onSubmit: (data: Partial<Alert>) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function AlertForm({ alert, onSubmit, onCancel, isSubmitting }: AlertFormProps) {
  const [formData, setFormData] = useState<Partial<Alert>>({
    title: "",
    description: "",
    risk_level: "medium",
    status: "active",
    location: {
      lat: 0,
      lng: 0
    }
  });

  useEffect(() => {
    if (alert) {
      setFormData({
        title: alert.title,
        description: alert.description,
        risk_level: alert.risk_level,
        status: alert.status,
        location: alert.location
      });
    }
  }, [alert]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      location: {
        ...formData.location as { lat: number, lng: number },
        [name]: parseFloat(value) || 0
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Alert Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter alert title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the alert"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="risk_level">Risk Level</Label>
          <Select
            value={formData.risk_level}
            onValueChange={(value) => setFormData({ ...formData, risk_level: value })}
          >
            <SelectTrigger id="risk_level">
              <SelectValue placeholder="Select risk level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="investigating">Investigating</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="lat">Latitude</Label>
          <Input
            id="lat"
            name="lat"
            type="number"
            step="any"
            value={(formData.location as any)?.lat || 0}
            onChange={handleLocationChange}
            placeholder="Latitude"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lng">Longitude</Label>
          <Input
            id="lng"
            name="lng"
            type="number"
            step="any"
            value={(formData.location as any)?.lng || 0}
            onChange={handleLocationChange}
            placeholder="Longitude"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {alert ? "Update Alert" : "Create Alert"}
        </Button>
      </div>
    </form>
  );
}
