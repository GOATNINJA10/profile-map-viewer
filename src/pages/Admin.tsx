import { useState, useEffect } from "react";
import { mockProfiles } from "../lib/data";
import { Profile } from "../types/profile";
import Header from "../components/Header";
import AdminProfileForm from "../components/AdminProfileForm";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog";
import { toast } from "sonner";
import { Edit, Trash, Plus } from "lucide-react";

const LOCAL_STORAGE_KEY = "profiles";

const Admin = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState<Profile | null>(null);

  useEffect(() => {
    const storedProfiles = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedProfiles) {
      setProfiles(JSON.parse(storedProfiles));
    } else {
      setProfiles(mockProfiles);
    }
  }, []);

  const saveProfilesToStorage = (profilesToSave: Profile[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profilesToSave));
  };

  const handleCreateProfile = () => {
    setSelectedProfile(null);
    setIsFormOpen(true);
  };

  const handleEditProfile = (profile: Profile) => {
    setSelectedProfile(profile);
    setIsFormOpen(true);
  };

  const handleDeletePrompt = (profile: Profile) => {
    setProfileToDelete(profile);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (profileToDelete) {
      const updatedProfiles = profiles.filter((p) => p.id !== profileToDelete.id);
      setProfiles(updatedProfiles);
      saveProfilesToStorage(updatedProfiles);
      toast.success(`Profile for ${profileToDelete.name} deleted successfully`);
      setIsDeleteDialogOpen(false);
      setProfileToDelete(null);
    }
  };

  const handleSaveProfile = (profile: Profile) => {
    let updatedProfiles: Profile[];
    if (selectedProfile) {
      updatedProfiles = profiles.map((p) => (p.id === profile.id ? profile : p));
      toast.success(`Profile for ${profile.name} updated successfully`);
    } else {
      updatedProfiles = [...profiles, profile];
      toast.success(`Profile for ${profile.name} created successfully`);
    }
    setProfiles(updatedProfiles);
    saveProfilesToStorage(updatedProfiles);
    setIsFormOpen(false);
    setSelectedProfile(null);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setSelectedProfile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="Admin Panel" />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Manage Profiles</h1>
            <p className="text-muted-foreground">
              Create, edit, or delete user profiles
            </p>
          </div>

          <Button onClick={handleCreateProfile}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Profile
          </Button>
        </div>

        <div className="grid gap-4">
          {profiles.map((profile) => (
            <Card key={profile.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center p-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-semibold">{profile.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {profile.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditProfile(profile)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeletePrompt(profile)}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {profiles.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64">
              <p className="text-lg text-muted-foreground mb-4">No profiles found</p>
              <Button onClick={handleCreateProfile}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Profile
              </Button>
            </div>
          )}
        </div>
      </main>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedProfile ? "Edit Profile" : "Create New Profile"}
            </DialogTitle>
            <DialogDescription>
              {selectedProfile
                ? "Update the details for this profile"
                : "Fill in the details to create a new profile"}
            </DialogDescription>
          </DialogHeader>

          <AdminProfileForm
            profile={selectedProfile || undefined}
            onSave={handleSaveProfile}
            onCancel={handleCancelForm}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the profile for{" "}
              <span className="font-semibold">{profileToDelete?.name}</span>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
