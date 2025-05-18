
import { Profile } from "@/types/profile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface ProfileCardProps {
  profile: Profile;
  onShowAddress: (profileId: string) => void;
}

const ProfileCard = ({ profile, onShowAddress }: ProfileCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 h-full hover:shadow-md animate-enter">
      <div className="relative h-48">
        <img
          src={profile.image}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="pt-4">
        <h3 className="text-lg font-semibold">{profile.name}</h3>
        <p className="text-muted-foreground line-clamp-3 mt-2 text-sm">
          {profile.description}
        </p>
        <div className="flex items-center text-muted-foreground text-xs mt-2">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{profile.address.city}, {profile.address.state}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0 pb-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onShowAddress(profile.id)}
        >
          Show Location
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          asChild
        >
          <Link to={`/profile/${profile.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
