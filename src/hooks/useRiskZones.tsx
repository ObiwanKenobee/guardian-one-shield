import { useState, useEffect } from 'react';
import { fetchRiskZones, createRiskZone, updateRiskZone, deleteRiskZone } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export type RiskZone = {
  id: string;
  location: string;
  description: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  status: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  user_id: string;
};

export function useRiskZones() {
  const [riskZones, setRiskZones] = useState<RiskZone[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadRiskZones = async () => {
    setLoading(true);
    setError(null);
    
    const response = await fetchRiskZones();
    
    if (response.error) {
      setError(response.error);
      toast({
        title: "Error fetching risk zones",
        description: response.error,
        variant: "destructive",
      });
    } else if (response.data) {
      setRiskZones(response.data);
    }
    
    setLoading(false);
  };

  const addRiskZone = async (zoneData: Omit<RiskZone, 'id'>) => {
    setLoading(true);
    setError(null);
    
    const response = await createRiskZone(zoneData);
    
    if (response.error) {
      setError(response.error);
      toast({
        title: "Error creating risk zone",
        description: response.error,
        variant: "destructive",
      });
      setLoading(false);
      return null;
    } else if (response.data) {
      setRiskZones([...riskZones, response.data]);
      toast({
        title: "Risk zone created",
        description: "The risk zone has been successfully created.",
      });
      setLoading(false);
      return response.data;
    }
    
    setLoading(false);
    return null;
  };

  const editRiskZone = async (id: string, updates: Partial<RiskZone>) => {
    setLoading(true);
    setError(null);
    
    const response = await updateRiskZone(id, updates);
    
    if (response.error) {
      setError(response.error);
      toast({
        title: "Error updating risk zone",
        description: response.error,
        variant: "destructive",
      });
      setLoading(false);
      return false;
    } else if (response.data) {
      setRiskZones(riskZones.map(zone => zone.id === id ? response.data : zone));
      toast({
        title: "Risk zone updated",
        description: "The risk zone has been successfully updated.",
      });
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const removeRiskZone = async (id: string) => {
    setLoading(true);
    setError(null);
    
    const response = await deleteRiskZone(id);
    
    if (response.error) {
      setError(response.error);
      toast({
        title: "Error deleting risk zone",
        description: response.error,
        variant: "destructive",
      });
      setLoading(false);
      return false;
    } else if (response.data) {
      setRiskZones(riskZones.filter(zone => zone.id !== id));
      toast({
        title: "Risk zone deleted",
        description: "The risk zone has been successfully deleted.",
      });
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  useEffect(() => {
    loadRiskZones();
  }, []);

  return {
    riskZones,
    loading,
    error,
    loadRiskZones,
    addRiskZone,
    editRiskZone,
    removeRiskZone,
  };
}
