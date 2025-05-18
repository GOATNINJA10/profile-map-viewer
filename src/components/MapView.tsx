
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Profile } from "@/types/profile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for Leaflet marker icons
// This is necessary because Leaflet's default icon paths are broken when used with module bundlers like webpack or vite
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
  profile: Profile | null;
  onClose: () => void;
}

const MapView = ({ profile, onClose }: MapViewProps) => {
  // No API key needed for Leaflet with OpenStreetMap
  const [showInfoPopup, setShowInfoPopup] = useState<boolean>(true);

  const mapContainerStyle = {
    width: "100%",
    height: "100%"
  };

  if (!profile) return null;

  const position: [number, number] = [
    profile.address.coordinates.lat,
    profile.address.coordinates.lng
  ];

  return (
    <Card className="fixed inset-4 md:inset-10 lg:inset-16 z-50 shadow-xl animate-enter">
      <div className="absolute right-2 top-2 z-10">
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full h-8 w-8 p-0"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="p-0 h-full">
        <div className="h-full">
          <div className="p-4 bg-white border-b">
            <h3 className="font-semibold text-lg">{profile.name}</h3>
            <p className="text-sm text-muted-foreground">
              {profile.address.street}, {profile.address.city}, {profile.address.state} {profile.address.zipCode}
            </p>
          </div>
          <div className="h-[calc(100%-80px)]">
            <MapContainer 
              center={position} 
              zoom={13} 
              scrollWheelZoom={false}
              style={mapContainerStyle}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  <div>
                    <p className="font-semibold">{profile.name}</p>
                    <p className="text-sm">{profile.address.street}</p>
                    <p className="text-sm">{profile.address.city}, {profile.address.state} {profile.address.zipCode}</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapView;
