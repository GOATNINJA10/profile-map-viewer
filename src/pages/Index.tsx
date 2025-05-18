import { useState, useEffect } from "react";
import { Profile } from "../types/profile";
import { mockProfiles } from "../lib/data";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ProfileGrid from "../components/ProfileGrid";
import MapView from "../components/MapView";

const LOCAL_STORAGE_KEY = "profiles";

const Index = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);

  useEffect(() => {
    const storedProfiles = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedProfiles) {
      const parsedProfiles = JSON.parse(storedProfiles);
      setProfiles(parsedProfiles);
      setFilteredProfiles(parsedProfiles);
    } else {
      setProfiles(mockProfiles);
      setFilteredProfiles(mockProfiles);
    }
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProfiles(profiles);
      return;
    }

    const lowercaseSearchTerm = searchTerm.toLowerCase();
    const filtered = profiles.filter((profile) => {
      return (
        profile.name.toLowerCase().includes(lowercaseSearchTerm) ||
        profile.address.city.toLowerCase().includes(lowercaseSearchTerm) ||
        profile.address.state.toLowerCase().includes(lowercaseSearchTerm) ||
        (profile.description &&
          profile.description.toLowerCase().includes(lowercaseSearchTerm))
      );
    });

    setFilteredProfiles(filtered);
  }, [searchTerm, profiles]);

  const handleShowAddress = (profileId: string) => {
    const profile = profiles.find((p) => p.id === profileId);
    if (profile) {
      setSelectedProfile(profile);
      setIsMapOpen(true);
    }
  };

  const closeMap = () => {
    setIsMapOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Explore Profiles</h1>
            <p className="text-muted-foreground">
              Browse and discover interesting professionals
            </p>
          </div>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <ProfileGrid
          profiles={filteredProfiles}
          onShowAddress={handleShowAddress}
        />
      </main>

      {isMapOpen && selectedProfile && (
        <MapView profile={selectedProfile} onClose={closeMap} />
      )}
    </div>
  );
};

export default Index;
