
import { useState, useEffect } from 'react';
import { fetchAlerts, createAlert, updateAlert, deleteAlert } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export type Alert = {
  id: string;
  title: string;
  description: string;
  risk_level: string;
  status: string;
  user_id: string;
  location: {
    lat: number;
    lng: number;
  };
  created_at: string;
  updated_at: string;
};

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadAlerts = async () => {
    setLoading(true);
    setError(null);
    
    const response = await fetchAlerts();
    
    if (response.error) {
      setError(response.error);
      toast({
        title: "Error fetching alerts",
        description: response.error,
        variant: "destructive",
      });
    } else if (response.data) {
      setAlerts(response.data);
    }
    
    setLoading(false);
  };

  const addAlert = async (alertData: Omit<Alert, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    setError(null);
    
    const response = await createAlert(alertData);
    
    if (response.error) {
      setError(response.error);
      toast({
        title: "Error creating alert",
        description: response.error,
        variant: "destructive",
      });
      setLoading(false);
      return null;
    } else if (response.data) {
      setAlerts([...alerts, response.data]);
      toast({
        title: "Alert created",
        description: "The alert has been successfully created.",
      });
      setLoading(false);
      return response.data;
    }
    
    setLoading(false);
    return null;
  };

  const editAlert = async (id: string, updates: Partial<Alert>) => {
    setLoading(true);
    setError(null);
    
    const response = await updateAlert(id, updates);
    
    if (response.error) {
      setError(response.error);
      toast({
        title: "Error updating alert",
        description: response.error,
        variant: "destructive",
      });
      setLoading(false);
      return false;
    } else if (response.data) {
      setAlerts(alerts.map(alert => alert.id === id ? response.data : alert));
      toast({
        title: "Alert updated",
        description: "The alert has been successfully updated.",
      });
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const removeAlert = async (id: string) => {
    setLoading(true);
    setError(null);
    
    const response = await deleteAlert(id);
    
    if (response.error) {
      setError(response.error);
      toast({
        title: "Error deleting alert",
        description: response.error,
        variant: "destructive",
      });
      setLoading(false);
      return false;
    } else if (response.data) {
      setAlerts(alerts.filter(alert => alert.id !== id));
      toast({
        title: "Alert deleted",
        description: "The alert has been successfully deleted.",
      });
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  return {
    alerts,
    loading,
    error,
    loadAlerts,
    addAlert,
    editAlert,
    removeAlert,
  };
}
