
import { useState, useEffect } from "react";
import { Profile } from "@/types/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AdminProfileFormProps {
  profile?: Profile;
  onSave: (profile: Profile) => void;
  onCancel: () => void;
}

const AdminProfileForm = ({ profile, onSave, onCancel }: AdminProfileFormProps) => {
  const [formData, setFormData] = useState<Partial<Profile>>({
    id: "",
    name: "",
    image: "",
    description: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "USA",
      coordinates: {
        lng: 0,
        lat: 0
      }
    },
    contact: {
      email: "",
      phone: "",
      website: ""
    },
    details: {
      occupation: "",
      company: "",
      interests: []
    }
  });

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    } else {
      setFormData({
        ...formData,
        id: Date.now().toString(),
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setFormData((prev) => {
        // Create a safe copy of the section if it doesn't exist
        const sectionData = prev[section as keyof Profile] || {};
        
        // Fix: Ensure sectionData is treated as an object before spreading
        if (typeof sectionData === 'object' && sectionData !== null) {
          return {
            ...prev,
            [section]: {
              ...sectionData,
              [field]: value
            }
          };
        }
        
        // Fallback: If the section isn't an object, create a new one
        return {
          ...prev,
          [section]: {
            [field]: value
          }
        };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCoordinateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const coord = name === "lng" ? "lng" : "lat";
    
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address!,
        coordinates: {
          ...prev.address!.coordinates,
          [coord]: parseFloat(value) || 0
        }
      }
    }));
  };

  const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const interests = e.target.value.split(",").map(item => item.trim());
    
    setFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details!,
        interests
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.description || !formData.address?.city) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    onSave(formData as Profile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Information</h3>
        
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="image">Image URL *</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Address</h3>
        
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="address.street">Street *</Label>
            <Input
              id="address.street"
              name="address.street"
              value={formData.address?.street}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="address.city">City *</Label>
              <Input
                id="address.city"
                name="address.city"
                value={formData.address?.city}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="address.state">State *</Label>
              <Input
                id="address.state"
                name="address.state"
                value={formData.address?.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="address.zipCode">Zip Code *</Label>
              <Input
                id="address.zipCode"
                name="address.zipCode"
                value={formData.address?.zipCode}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="address.country">Country *</Label>
              <Input
                id="address.country"
                name="address.country"
                value={formData.address?.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="lng">Longitude *</Label>
              <Input
                id="lng"
                name="lng"
                type="number"
                step="0.000001"
                value={formData.address?.coordinates.lng}
                onChange={handleCoordinateChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="lat">Latitude *</Label>
              <Input
                id="lat"
                name="lat"
                type="number"
                step="0.000001"
                value={formData.address?.coordinates.lat}
                onChange={handleCoordinateChange}
                required
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Contact Information</h3>
        
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="contact.email">Email</Label>
            <Input
              id="contact.email"
              name="contact.email"
              type="email"
              value={formData.contact?.email || ""}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="contact.phone">Phone</Label>
            <Input
              id="contact.phone"
              name="contact.phone"
              value={formData.contact?.phone || ""}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="contact.website">Website</Label>
            <Input
              id="contact.website"
              name="contact.website"
              value={formData.contact?.website || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Additional Details</h3>
        
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="details.occupation">Occupation</Label>
            <Input
              id="details.occupation"
              name="details.occupation"
              value={formData.details?.occupation || ""}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="details.company">Company</Label>
            <Input
              id="details.company"
              name="details.company"
              value={formData.details?.company || ""}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="interests">Interests (comma separated)</Label>
            <Input
              id="interests"
              name="interests"
              value={formData.details?.interests?.join(", ") || ""}
              onChange={handleInterestsChange}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {profile ? "Update Profile" : "Create Profile"}
        </Button>
      </div>
    </form>
  );
};

export default AdminProfileForm;
