
import { supabase } from "@/integrations/supabase/client";

// Generic type for responses
export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
};

// Risk Zone API functions
export async function fetchRiskZones(): Promise<ApiResponse<any[]>> {
  try {
    const { data, error } = await supabase
      .from('risk_zones')
      .select('*');
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching risk zones:', error);
    return { data: null, error: error.message };
  }
}

export async function createRiskZone(zoneData: any): Promise<ApiResponse<any>> {
  try {
    const { data, error } = await supabase
      .from('risk_zones')
      .insert([zoneData])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error creating risk zone:', error);
    return { data: null, error: error.message };
  }
}

export async function updateRiskZone(id: string, updates: any): Promise<ApiResponse<any>> {
  try {
    const { data, error } = await supabase
      .from('risk_zones')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error updating risk zone:', error);
    return { data: null, error: error.message };
  }
}

export async function deleteRiskZone(id: string): Promise<ApiResponse<any>> {
  try {
    const { error } = await supabase
      .from('risk_zones')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return { data: true, error: null };
  } catch (error: any) {
    console.error('Error deleting risk zone:', error);
    return { data: null, error: error.message };
  }
}

// Alert API functions
export async function fetchAlerts(): Promise<ApiResponse<any[]>> {
  try {
    const { data, error } = await supabase
      .from('wildlife_alerts')
      .select('*');
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching alerts:', error);
    return { data: null, error: error.message };
  }
}

export async function createAlert(alertData: any): Promise<ApiResponse<any>> {
  try {
    const { data, error } = await supabase
      .from('wildlife_alerts')
      .insert([alertData])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error creating alert:', error);
    return { data: null, error: error.message };
  }
}

export async function updateAlert(id: string, updates: any): Promise<ApiResponse<any>> {
  try {
    const { data, error } = await supabase
      .from('wildlife_alerts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error updating alert:', error);
    return { data: null, error: error.message };
  }
}

export async function deleteAlert(id: string): Promise<ApiResponse<any>> {
  try {
    const { error } = await supabase
      .from('wildlife_alerts')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return { data: true, error: null };
  } catch (error: any) {
    console.error('Error deleting alert:', error);
    return { data: null, error: error.message };
  }
}

// Report API functions
export async function fetchReports(): Promise<ApiResponse<any[]>> {
  try {
    const { data, error } = await supabase
      .from('esg_reports')
      .select('*');
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching reports:', error);
    return { data: null, error: error.message };
  }
}

export async function createReport(reportData: any): Promise<ApiResponse<any>> {
  try {
    const { data, error } = await supabase
      .from('esg_reports')
      .insert([reportData])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error creating report:', error);
    return { data: null, error: error.message };
  }
}

export async function updateReport(id: string, updates: any): Promise<ApiResponse<any>> {
  try {
    const { data, error } = await supabase
      .from('esg_reports')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error updating report:', error);
    return { data: null, error: error.message };
  }
}

export async function deleteReport(id: string): Promise<ApiResponse<any>> {
  try {
    const { error } = await supabase
      .from('esg_reports')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return { data: true, error: null };
  } catch (error: any) {
    console.error('Error deleting report:', error);
    return { data: null, error: error.message };
  }
}

// Case API functions
export async function fetchCases(): Promise<ApiResponse<any[]>> {
  try {
    const { data, error } = await supabase
      .from('cases')
      .select('*');
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching cases:', error);
    return { data: null, error: error.message };
  }
}

export async function createCase(caseData: any): Promise<ApiResponse<any>> {
  try {
    const { data, error } = await supabase
      .from('cases')
      .insert([caseData])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error creating case:', error);
    return { data: null, error: error.message };
  }
}

export async function updateCase(id: string, updates: any): Promise<ApiResponse<any>> {
  try {
    const { data, error } = await supabase
      .from('cases')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error updating case:', error);
    return { data: null, error: error.message };
  }
}

export async function deleteCase(id: string): Promise<ApiResponse<any>> {
  try {
    const { error } = await supabase
      .from('cases')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return { data: true, error: null };
  } catch (error: any) {
    console.error('Error deleting case:', error);
    return { data: null, error: error.message };
  }
}
