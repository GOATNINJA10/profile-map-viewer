
import { Profile } from "@/types/profile";
import ProfileCard from "./ProfileCard";

interface ProfileGridProps {
  profiles: Profile[];
  onShowAddress: (profileId: string) => void;
}

const ProfileGrid = ({ profiles, onShowAddress }: ProfileGridProps) => {
  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-lg text-muted-foreground">No profiles found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.map((profile) => (
        <ProfileCard 
          key={profile.id} 
          profile={profile} 
          onShowAddress={onShowAddress} 
        />
      ))}
    </div>
  );
};

export default ProfileGrid;
