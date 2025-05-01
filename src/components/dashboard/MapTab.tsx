
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Info } from "lucide-react";

export function MapTab() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Trafficking hotspot regions with SEO-friendly descriptions
  const hotspots = [
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
    mapboxgl.accessToken = 'pk.placeholder';
    
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
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, []);

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
          
          <div className="mt-4 text-xs text-muted-foreground">
            <p>
              Guardian One's global monitoring system tracks trafficking incidents across key regions 
              including India, Kenya, Nigeria, Thailand, Philippines, and Brazil. Our AI-powered detection
              helps identify patterns and coordinate interventions across borders.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
