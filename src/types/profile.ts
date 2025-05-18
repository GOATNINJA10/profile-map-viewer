
export interface Profile {
  id: string;
  name: string;
  image: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates: {
      lat: number; // Changed order to match Google Maps format: lat, lng
      lng: number;
    };
  };
  contact?: {
    email?: string;
    phone?: string;
    website?: string;
  };
  details?: {
    occupation?: string;
    company?: string;
    interests?: string[];
  };
}
