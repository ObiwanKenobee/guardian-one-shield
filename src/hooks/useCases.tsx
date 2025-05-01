
import { useState, useEffect } from 'react';
import { fetchCases, createCase, updateCase, deleteCase } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export type Case = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  category: string | null;
  status: string;
  incident_date: string | null;
  reporter_id: string | null;
  assigned_to: string | null;
  evidence_links: string[] | null;
  created_at: string;
  updated_at: string;
};

export function useCases() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadCases = async () => {
    setLoading(true);
    setError(null);
    
    const response = await fetchCases();
    
    if (response.error) {
      setError(response.error);
      toast({
        title: "Error fetching cases",
        description: response.error,
        variant: "destructive",
      });
    } else if (response.data) {
      setCases(response.data);
    }
    
    setLoading(false);
  };

  const addCase = async (caseData: Omit<Case, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    setError(null);
    
    const response = await createCase(caseData);
    
    if (response.error) {
      setError(response.error);
      toast({
        title: "Error creating case",
        description: response.error,
        variant: "destructive",
      });
      setLoading(false);
      return null;
    } else if (response.data) {
      setCases([...cases, response.data]);
      toast({
        title: "Case created",
        description: "The case has been successfully created.",
      });
      setLoading(false);
      return response.data;
    }
    
    setLoading(false);
    return null;
  };

  const editCase = async (id: string, updates: Partial<Case>) => {
    setLoading(true);
    setError(null);
    
    const response = await updateCase(id, updates);
    
    if (response.error) {
      setError(response.error);
      toast({
        title: "Error updating case",
        description: response.error,
        variant: "destructive",
      });
      setLoading(false);
      return false;
    } else if (response.data) {
      setCases(cases.map(c => c.id === id ? response.data : c));
      toast({
        title: "Case updated",
        description: "The case has been successfully updated.",
      });
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const removeCase = async (id: string) => {
    setLoading(true);
    setError(null);
    
    const response = await deleteCase(id);
    
    if (response.error) {
      setError(response.error);
      toast({
        title: "Error deleting case",
        description: response.error,
        variant: "destructive",
      });
      setLoading(false);
      return false;
    } else if (response.data) {
      setCases(cases.filter(c => c.id !== id));
      toast({
        title: "Case deleted",
        description: "The case has been successfully deleted.",
      });
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  useEffect(() => {
    loadCases();
  }, []);

  return {
    cases,
    loading,
    error,
    loadCases,
    addCase,
    editCase,
    removeCase,
  };
}
