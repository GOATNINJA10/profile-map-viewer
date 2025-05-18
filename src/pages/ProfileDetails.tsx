import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Header from "../components/Header";
import { ArrowLeft, MapPin } from "lucide-react";
import MapView from "../components/MapView";

const LOCAL_STORAGE_KEY = "profiles";

const ProfileDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      try {
        const storedProfiles = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedProfiles) {
          const profiles = JSON.parse(storedProfiles);
          const foundProfile = profiles.find((p) => p.id === id);
          if (foundProfile) {
            setProfile(foundProfile);
            setError(null);
          } else {
            setError("Profile not found");
          }
        } else {
          setError("No profiles found in storage");
        }
      } catch (err) {
        setError("An error occurred while fetching the profile");
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [id]);

  const handleShowMap = () => {
    setIsMapOpen(true);
  };

  const closeMap = () => {
    setIsMapOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-4">{error || "Profile not found"}</h2>
          <Button asChild>
            <Link to="/">Go Back to Profiles</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link to="/" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profiles
            </Link>
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h1 className="text-xl font-semibold">{profile.name}</h1>
                  {profile.details?.occupation && (
                    <p className="text-muted-foreground">{profile.details.occupation}</p>
                  )}
                  {profile.details?.company && (
                    <p className="text-sm text-muted-foreground">at {profile.details.company}</p>
                  )}
                  
                  <div className="flex items-center mt-4 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>
                      {profile.address.city}, {profile.address.state}
                    </span>
                  </div>
                  
                  <Button
                    className="mt-4 w-full"
                    onClick={handleShowMap}
                  >
                    View on Map
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {profile.contact && (
              <Card className="mt-4">
                <CardContent className="p-6">
                  <h2 className="font-semibold mb-4">Contact Information</h2>
                  <div className="space-y-2">
                    {profile.contact.email && (
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{profile.contact.email}</p>
                      </div>
                    )}
                    {profile.contact.phone && (
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">{profile.contact.phone}</p>
                      </div>
                    )}
                    {profile.contact.website && (
                      <div>
                        <p className="text-sm font-medium">Website</p>
                        <a
                          href={`https://${profile.contact.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-app-primary hover:underline"
                        >
                          {profile.contact.website}
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold text-lg mb-4">About</h2>
                <p className="text-muted-foreground">{profile.description}</p>
                
                {profile.details?.interests && profile.details.interests.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.details.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="bg-app-light text-app-dark px-3 py-1 rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardContent className="p-6">
                <h2 className="font-semibold text-lg mb-4">Address</h2>
                <p className="text-muted-foreground">{profile.address.street}</p>
                <p className="text-muted-foreground">
                  {profile.address.city}, {profile.address.state} {profile.address.zipCode}
                </p>
                <p className="text-muted-foreground">{profile.address.country}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {isMapOpen && (
        <MapView 
          profile={profile} 
          onClose={closeMap} 
        />
      )}
    </div>
  );
};

export default ProfileDetails;
