
import { useState, useEffect } from 'react';
import { fetchReports, createReport, updateReport, deleteReport } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export type Report = {
  id: string;
  title: string;
  report_type: string;
  reporting_period: string | null;
  content: any;
  status: string;
  user_id: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadReports = async () => {
    setLoading(true);
    setError(null);
    
    const response = await fetchReports();
    
    if (response.error) {
      setError(response.error);
      toast({
        title: "Error fetching reports",
        description: response.error,
        variant: "destructive",
      });
    } else if (response.data) {
      setReports(response.data);
    }
    
    setLoading(false);
  };

  const addReport = async (reportData: Omit<Report, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    setError(null);
    
    const response = await createReport(reportData);
    
    if (response.error) {
      setError(response.error);
      toast({
        title: "Error creating report",
        description: response.error,
        variant: "destructive",
      });
      setLoading(false);
      return null;
    } else if (response.data) {
      setReports([...reports, response.data]);
      toast({
        title: "Report created",
        description: "The report has been successfully created.",
      });
      setLoading(false);
      return response.data;
    }
    
    setLoading(false);
    return null;
  };

  const editReport = async (id: string, updates: Partial<Report>) => {
    setLoading(true);
    setError(null);
    
    const response = await updateReport(id, updates);
    
    if (response.error) {
      setError(response.error);
      toast({
        title: "Error updating report",
        description: response.error,
        variant: "destructive",
      });
      setLoading(false);
      return false;
    } else if (response.data) {
      setReports(reports.map(report => report.id === id ? response.data : report));
      toast({
        title: "Report updated",
        description: "The report has been successfully updated.",
      });
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const removeReport = async (id: string) => {
    setLoading(true);
    setError(null);
    
    const response = await deleteReport(id);
    
    if (response.error) {
      setError(response.error);
      toast({
        title: "Error deleting report",
        description: response.error,
        variant: "destructive",
      });
      setLoading(false);
      return false;
    } else if (response.data) {
      setReports(reports.filter(report => report.id !== id));
      toast({
        title: "Report deleted",
        description: "The report has been successfully deleted.",
      });
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  useEffect(() => {
    loadReports();
  }, []);

  return {
    reports,
    loading,
    error,
    loadReports,
    addReport,
    editReport,
    removeReport,
  };
}
