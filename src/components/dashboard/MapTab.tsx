import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Info, Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRiskZones, RiskZone } from "@/hooks/useRiskZones";

type Hotspot = {
  id: string;
  name: string;
  coordinates: [number, number];
  description: string;
  level: string;
};

export function MapTab() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<RiskZone | null>(null);
  const [formData, setFormData] = useState({
    location: '',
    description: '',
    risk_level: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    coordinates: { lat: 0, lng: 0 },
  });
  
  const { toast } = useToast();
  const {
    riskZones,
    loading,
    error,
    addRiskZone,
    editRiskZone,
    removeRiskZone
  } = useRiskZones();

  // Trafficking hotspot regions with SEO-friendly descriptions
  const hotspots: Hotspot[] = [
    { 
      id: "india", 
      name: "India", 
      coordinates: [78.9629, 20.5937] as [number, number],
      description: "Child trafficking prevention initiatives in India focus on biometric identification and community reporting networks.",
      level: "high"
    },
    { 
      id: "kenya", 
      name: "Kenya", 
      coordinates: [37.9062, 0.0236] as [number, number],
      description: "Child protection technology in Kenya utilizes mobile alerts and school-based monitoring systems.",
      level: "medium" 
    },
    { 
      id: "nigeria", 
      name: "Nigeria", 
      coordinates: [8.6753, 9.0820] as [number, number],
      description: "Nigeria's child alert system connects rural communities with urban law enforcement to report missing children.",
      level: "high"
    },
    { 
      id: "thailand", 
      name: "Thailand", 
      coordinates: [100.9925, 15.8700] as [number, number],
      description: "Dark web detection systems in Thailand monitor for child exploitation content and coordinate with local authorities.",
      level: "medium"
    },
    { 
      id: "philippines", 
      name: "Philippines", 
      coordinates: [121.7740, 12.8797] as [number, number],
      description: "Philippines deploys AI-powered child rescue technologies in cooperation with international agencies.",
      level: "high"
    },
    { 
      id: "brazil", 
      name: "Brazil", 
      coordinates: [-51.9253, -14.2350] as [number, number],
      description: "Brazil's plataforma contra tráfico infantil uses community-based monitoring and anonymous reporting.",
      level: "medium"
    }
  ];

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map with a placeholder token - in production, this should come from environment variables
    mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN || 'pk.placeholder';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      projection: 'globe',
      zoom: 1.5,
      center: [30, 15] as [number, number],
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add hotspot markers when the map loads
    map.current.on('load', () => {
      // Add hotspot markers
      hotspots.forEach(hotspot => {
        const markerEl = document.createElement('div');
        markerEl.className = `hotspot-marker ${hotspot.level}-risk`;
        markerEl.style.backgroundColor = hotspot.level === 'high' ? '#ef4444' : '#f59e0b';
        markerEl.style.width = '20px';
        markerEl.style.height = '20px';
        markerEl.style.borderRadius = '50%';
        markerEl.style.border = '2px solid white';
        markerEl.style.cursor = 'pointer';
        markerEl.title = hotspot.name;
        
        // Create a popup for each marker
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<strong>${hotspot.name}</strong><p>${hotspot.description}</p>`
        );

        // Create and add the marker
        new mapboxgl.Marker(markerEl)
          .setLngLat(hotspot.coordinates)
          .setPopup(popup)
          .addTo(map.current!);

        markerEl.addEventListener('click', () => {
          setSelectedRegion(hotspot.id);
        });
      });
      
      // Add risk zone markers from database
      if (riskZones.length > 0) {
        renderRiskZoneMarkers();
      }
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, []);
  
  // Re-render markers when risk zones change
  useEffect(() => {
    if (map.current && map.current.loaded()) {
      renderRiskZoneMarkers();
    }
  }, [riskZones]);
  
  const renderRiskZoneMarkers = () => {
    // Remove existing markers
    const existingMarkers = document.querySelectorAll('.custom-risk-marker');
    existingMarkers.forEach(marker => marker.remove());
    
    // Add markers for each risk zone
    riskZones.forEach(zone => {
      if (zone.coordinates && map.current) {
        const markerEl = document.createElement('div');
        markerEl.className = `custom-risk-marker ${zone.risk_level}-risk`;
        markerEl.style.backgroundColor = getRiskLevelColor(zone.risk_level);
        markerEl.style.width = '24px';
        markerEl.style.height = '24px';
        markerEl.style.borderRadius = '50%';
        markerEl.style.border = '3px solid white';
        markerEl.style.cursor = 'pointer';
        markerEl.title = zone.location;
        
        // Create a popup for each marker
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<strong>${zone.location}</strong>
           <p>${zone.description}</p>
           <p>Risk Level: ${zone.risk_level}</p>`
        );

        // Create and add the marker
        new mapboxgl.Marker(markerEl)
          .setLngLat([zone.coordinates.lng, zone.coordinates.lat])
          .setPopup(popup)
          .addTo(map.current);

        markerEl.addEventListener('click', () => {
          setSelectedZone(zone);
        });
      }
    });
  };
  
  const getRiskLevelColor = (level: string): string => {
    switch (level) {
      case 'critical': return '#dc2626'; // red-600
      case 'high': return '#ef4444'; // red-500
      case 'medium': return '#f59e0b'; // amber-500
      case 'low': return '#10b981'; // emerald-500
      default: return '#6b7280'; // gray-500
    }
  };
  
  const handleAddRiskZone = async () => {
    if (!formData.location || !formData.description) {
      toast({
        title: "Missing fields",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const newZone = {
      location: formData.location,
      description: formData.description,
      risk_level: formData.risk_level,
      coordinates: formData.coordinates,
      status: 'active',
      user_id: 'placeholder-user-id', // Replace with actual user ID from auth context
    };
    
    const result = await addRiskZone(newZone);
    if (result) {
      setFormData({
        location: '',
        description: '',
        risk_level: 'medium' as 'low' | 'medium' | 'high' | 'critical',
        coordinates: { lat: 0, lng: 0 },
      });
      setIsAddDialogOpen(false);
    }
  };
  
  const handleEditRiskZone = async () => {
    if (!selectedZone || !formData.location || !formData.description) {
      toast({
        title: "Missing fields",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const updates = {
      location: formData.location,
      description: formData.description,
      risk_level: formData.risk_level,
      coordinates: formData.coordinates,
    };
    
    const success = await editRiskZone(selectedZone.id, updates);
    if (success) {
      setIsEditDialogOpen(false);
    }
  };
  
  const handleDeleteRiskZone = async () => {
    if (!selectedZone) return;
    
    const success = await removeRiskZone(selectedZone.id);
    if (success) {
      setSelectedZone(null);
      setIsDeleteDialogOpen(false);
    }
  };
  
  const openEditDialog = (zone: RiskZone) => {
    setSelectedZone(zone);
    setFormData({
      location: zone.location,
      description: zone.description || '',
      risk_level: zone.risk_level,
      coordinates: zone.coordinates,
    });
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (zone: RiskZone) => {
    setSelectedZone(zone);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Global Monitoring Map</CardTitle>
              <CardDescription>Geographic visualization of trafficking alerts and activities</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1"></span>
                High Risk
              </span>
              <span className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-1"></span>
                Medium Risk
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {loading ? (
                <span className="flex items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading risk zones...</span>
              ) : (
                <span>{riskZones.length} custom risk zones defined</span>
              )}
            </div>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Add Risk Zone
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Risk Zone</DialogTitle>
                  <DialogDescription>
                    Create a new risk zone with location details.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">Location</Label>
                    <Input 
                      id="location" 
                      className="col-span-3" 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">Description</Label>
                    <Textarea 
                      id="description" 
                      className="col-span-3" 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="risk-level" className="text-right">Risk Level</Label>
                    <Select 
                      value={formData.risk_level}
                      onValueChange={(value) => setFormData({...formData, risk_level: value})}
                    >
                      <SelectTrigger className="col-span-3">
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
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="latitude" className="text-right">Latitude</Label>
                    <Input 
                      id="latitude" 
                      className="col-span-3" 
                      type="number"
                      value={formData.coordinates.lat}
                      onChange={(e) => setFormData({
                        ...formData, 
                        coordinates: {...formData.coordinates, lat: parseFloat(e.target.value)}
                      })}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="longitude" className="text-right">Longitude</Label>
                    <Input 
                      id="longitude" 
                      className="col-span-3"
                      type="number"
                      value={formData.coordinates.lng}
                      onChange={(e) => setFormData({
                        ...formData, 
                        coordinates: {...formData.coordinates, lng: parseFloat(e.target.value)}
                      })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddRiskZone} disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add Zone
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
            <div ref={mapContainer} className="absolute inset-0" />
          </div>
          
          {/* SEO-friendly region information */}
          {selectedRegion && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                {hotspots.find(h => h.id === selectedRegion)?.name} Region Information
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {hotspots.find(h => h.id === selectedRegion)?.description}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-guardian-light/30">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Child trafficking prevention {selectedRegion}
                </Badge>
                <Badge variant="outline" className="bg-guardian-light/30">
                  <Info className="h-3 w-3 mr-1" />
                  {selectedRegion === 'india' && 'NGO tools missing child'}
                  {selectedRegion === 'kenya' && 'SOS app child rescue'}
                  {selectedRegion === 'nigeria' && 'Child alert system Africa'}
                  {selectedRegion === 'thailand' && 'Dark web detection Thailand'}
                  {selectedRegion === 'philippines' && 'AI child rescue Philippines'}
                  {selectedRegion === 'brazil' && 'Plataforma contra tráfico infantil Brasil'}
                </Badge>
              </div>
            </div>
          )}
          
          {/* Selected custom zone information */}
          {selectedZone && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold mb-2">
                  {selectedZone.location}
                </h3>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => openEditDialog(selectedZone)}
                  >
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => openDeleteDialog(selectedZone)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {selectedZone.description}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant="outline" 
                  className={`${selectedZone.risk_level === 'high' || selectedZone.risk_level === 'critical' ? 'bg-red-500/20' : 'bg-amber-500/20'}`}
                >
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {selectedZone.risk_level.charAt(0).toUpperCase() + selectedZone.risk_level.slice(1)} Risk Level
                </Badge>
                <Badge variant="outline" className="bg-guardian-light/30">
                  <Info className="h-3 w-3 mr-1" />
                  Lat: {selectedZone.coordinates.lat.toFixed(4)}, Lng: {selectedZone.coordinates.lng.toFixed(4)}
                </Badge>
              </div>
            </div>
          )}
          
          <div className="mt-4 text-xs text-muted-foreground">
            <p>
              Guardian One's global monitoring system tracks trafficking incidents across key regions 
              including India, Kenya, Nigeria, Thailand, Philippines, and Brazil. Our AI-powered detection
              helps identify patterns and coordinate interventions across borders.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Risk Zone</DialogTitle>
            <DialogDescription>
              Update the details of this risk zone.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-location" className="text-right">Location</Label>
              <Input 
                id="edit-location" 
                className="col-span-3" 
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">Description</Label>
              <Textarea 
                id="edit-description" 
                className="col-span-3" 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-risk-level" className="text-right">Risk Level</Label>
              <Select 
                value={formData.risk_level}
                onValueChange={(value) => setFormData({...formData, risk_level: value})}
              >
                <SelectTrigger className="col-span-3">
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-latitude" className="text-right">Latitude</Label>
              <Input 
                id="edit-latitude" 
                className="col-span-3" 
                type="number"
                value={formData.coordinates.lat}
                onChange={(e) => setFormData({
                  ...formData, 
                  coordinates: {...formData.coordinates, lat: parseFloat(e.target.value)}
                })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-longitude" className="text-right">Longitude</Label>
              <Input 
                id="edit-longitude" 
                className="col-span-3"
                type="number"
                value={formData.coordinates.lng}
                onChange={(e) => setFormData({
                  ...formData, 
                  coordinates: {...formData.coordinates, lng: parseFloat(e.target.value)}
                })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditRiskZone} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this risk zone? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteRiskZone} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
