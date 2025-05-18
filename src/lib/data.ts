
import { Profile } from "@/types/profile";

export const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "Emily Johnson",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    description: "UX Designer with a passion for creating intuitive user experiences",
    address: {
      street: "123 Design Avenue",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "USA",
      coordinates: {
        lng: -122.4194,
        lat: 37.7749
      }
    },
    contact: {
      email: "emily@example.com",
      phone: "+1 (555) 123-4567",
      website: "emilyjohnson.com"
    },
    details: {
      occupation: "Senior UX Designer",
      company: "CreativeTech Solutions",
      interests: ["Design Thinking", "User Research", "Hiking"]
    }
  },
  {
    id: "2",
    name: "Michael Chen",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    description: "Full-stack developer specializing in React and Node.js applications",
    address: {
      street: "456 Tech Boulevard",
      city: "Seattle",
      state: "WA",
      zipCode: "98109",
      country: "USA",
      coordinates: {
        lng: -122.3321,
        lat: 47.6062
      }
    },
    contact: {
      email: "michael@example.com",
      phone: "+1 (555) 987-6543",
      website: "michaelchen.dev"
    },
    details: {
      occupation: "Lead Developer",
      company: "InnovateSoft",
      interests: ["Open Source", "AI", "Rock Climbing"]
    }
  },
  {
    id: "3",
    name: "Sarah Williams",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    description: "Marketing strategist focusing on data-driven campaigns",
    address: {
      street: "789 Analytics Drive",
      city: "Austin",
      state: "TX",
      zipCode: "78701",
      country: "USA",
      coordinates: {
        lng: -97.7431,
        lat: 30.2672
      }
    },
    contact: {
      email: "sarah@example.com",
      phone: "+1 (555) 456-7890",
      website: "sarahwilliams.co"
    },
    details: {
      occupation: "Marketing Director",
      company: "GrowthMetrics",
      interests: ["Digital Marketing", "Data Analysis", "Yoga"]
    }
  },
  {
    id: "4",
    name: "David Rodriguez",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    description: "Product manager with 10+ years experience in fintech solutions",
    address: {
      street: "101 Finance Lane",
      city: "New York",
      state: "NY",
      zipCode: "10004",
      country: "USA",
      coordinates: {
        lng: -74.0060,
        lat: 40.7128
      }
    },
    contact: {
      email: "david@example.com",
      phone: "+1 (555) 234-5678",
      website: "davidrodriguez.io"
    },
    details: {
      occupation: "Senior Product Manager",
      company: "FinTechNova",
      interests: ["Blockchain", "Financial Markets", "Running"]
    }
  },
  {
    id: "5",
    name: "Aisha Patel",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    description: "Data scientist specializing in machine learning and AI applications",
    address: {
      street: "202 Algorithm Road",
      city: "Boston",
      state: "MA",
      zipCode: "02110",
      country: "USA",
      coordinates: {
        lng: -71.0589,
        lat: 42.3601
      }
    },
    contact: {
      email: "aisha@example.com",
      phone: "+1 (555) 876-5432",
      website: "aishapatel.ai"
    },
    details: {
      occupation: "Lead Data Scientist",
      company: "AIInsights",
      interests: ["Machine Learning", "Neural Networks", "Chess"]
    }
  },
  {
    id: "6",
    name: "James Wilson",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    description: "Cybersecurity expert with a focus on enterprise security architecture",
    address: {
      street: "303 Secure Street",
      city: "Denver",
      state: "CO",
      zipCode: "80202",
      country: "USA",
      coordinates: {
        lng: -104.9903,
        lat: 39.7392
      }
    },
    contact: {
      email: "james@example.com",
      phone: "+1 (555) 345-6789",
      website: "jameswilson.security"
    },
    details: {
      occupation: "Security Architect",
      company: "SecureDefense",
      interests: ["Penetration Testing", "Cryptography", "Mountain Biking"]
    }
  }
];
