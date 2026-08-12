export type ServiceCategory =
  | "photography"
  | "videography"
  | "dj-music"
  | "beauty"
  | "car-rental"
  | "decoration";

export type Money = {
  amount: number;
  currency: string;
  label?: string;
};

export type PackageItem = {
  id: string;
  title: string;
  price: Money;
  description?: string;
};

export type Provider = {
  id: string;
  name: string;
  category: ServiceCategory;
  location: string;
  description: string;
  rating: number;
  reviewCount: number;
  startingPrice?: string;
  currency?: string;
  services: string[];
  packages?: PackageItem[];
  portfolio?: string[]; // placeholder ids or titles
  phone?: string; // administrative use only
  whatsapp?: string; // administrative use only
  contactPerson?: string;
  availabilityManagedByProvider?: boolean;
  featured?: boolean;
  about?: string;
  style?: string[];
};

export const categoryLabels: Record<ServiceCategory, string> = {
  photography: "Photography",
  videography: "Videography",
  "dj-music": "DJs & Music",
  beauty: "Beauty & Makeup",
  "car-rental": "Car Rental",
  decoration: "Decoration",
};

// Demo and real provider data (real info used where provided)
export const providers: Provider[] = [
  {
    id: "10k-studio",
    name: "10K Studio",
    category: "photography",
    location: "Cairo/Giza, Egypt",
    description: "Wedding photography and videography with elegant storytelling and refined portraits.",
    about: "10K Studio provides premium photography and videography for weddings across Cairo and Giza.",
    rating: 4.9,
    reviewCount: 124,
    startingPrice: "Starting from 11,000 EGP",
    currency: "EGP",
    services: ["Full-day photography", "Cinematic videography", "Albums"],
    packages: [
      { id: "10k-basic", title: "Basic", price: { amount: 11000, currency: "EGP" }, description: "Full-day photography coverage" },
      { id: "10k-premium", title: "Premium", price: { amount: 15000, currency: "EGP" }, description: "Photography + highlight film" },
    ],
    portfolio: ["placeholder-1", "placeholder-2", "placeholder-3"],
    availabilityManagedByProvider: true,
    featured: true,
    style: ["Cinematic", "Luxury"],
  },

  {
    id: "digital-team",
    name: "Digital Team",
    category: "photography",
    location: "Cairo/Giza, Egypt",
    description: "Photography & videography with a warm modern signature style.",
    about: "Digital Team specializes in cinematic and modern wedding imagery.",
    rating: 4.8,
    reviewCount: 87,
    startingPrice: "Starting from 9,500 EGP",
    currency: "EGP",
    services: ["Photography", "Videography", "Highlight film"],
    packages: [
      { id: "dt-8k", title: "Package A", price: { amount: 8000, currency: "EGP" } },
      { id: "dt-10k", title: "Package B", price: { amount: 10000, currency: "EGP" } },
      { id: "dt-13k", title: "Package C", price: { amount: 13000, currency: "EGP" } },
    ],
    portfolio: ["placeholder-1", "placeholder-2"],
    contactPerson: "Ibrahim",
    phone: "01023475293",
    availabilityManagedByProvider: true,
    style: ["Cinematic", "Luxury", "Modern"],
  },

  {
    id: "luna-studio",
    name: "Luna Studio",
    category: "photography",
    location: "Faysal, Cairo, Giza, Egypt",
    description: "Soft, luxurious photography, specializing in small girls-only events and intimate celebrations.",
    about: "Luna Studio focuses on henna, hamawety, birthdays and intimate bridal events.",
    rating: 4.8,
    reviewCount: 65,
    startingPrice: "Starting from 10,000 EGP",
    currency: "EGP",
    services: ["Event photography", "Portraits", "Editing"],
    packages: [
      { id: "luna-basic", title: "Basic", price: { amount: 10000, currency: "EGP" } },
      { id: "luna-premium", title: "Premium", price: { amount: 14000, currency: "EGP" } },
    ],
    portfolio: ["placeholder-1"],
    contactPerson: "Sabrin Abdu",
    phone: "01091205102",
    availabilityManagedByProvider: true,
    style: ["Soft", "Luxurious"],
  },

  {
    id: "dj-mj",
    name: "DJ MJ",
    category: "dj-music",
    location: "Ard El Lewa, Egypt",
    description: "A stylish DJ experience that keeps your celebration energized and joyful.",
    about: "DJ MJ provides music direction, lighting and full DJ services for weddings.",
    rating: 4.7,
    reviewCount: 73,
    startingPrice: "Starting from 4,500 EGP",
    currency: "EGP",
    services: ["DJ set", "Lighting", "Sound system"],
    packages: [
      { id: "dj-6h", title: "6 hours", price: { amount: 4500, currency: "EGP" }, description: "6 hour wedding package" },
    ],
    portfolio: ["placeholder-1"],
    contactPerson: "Nahom Sirak",
    phone: "01239983798",
    availabilityManagedByProvider: true,
    style: ["Any music"],
  },

  // Demo providers
  {
    id: "golden-frames",
    name: "Golden Frames",
    category: "videography",
    location: "Cairo, Egypt",
    description: "Cinematic wedding films with elegant storytelling.",
    rating: 4.8,
    reviewCount: 54,
    startingPrice: "Starting from 8,500 EGP",
    currency: "EGP",
    services: ["Highlight film", "Full edit"],
    portfolio: ["placeholder-1"],
  },
  {
    id: "ruba-beauty",
    name: "Ruba Beauty",
    category: "beauty",
    location: "Cairo, Egypt",
    description: "Luxury bridal beauty with elegant makeup and styling.",
    rating: 4.9,
    reviewCount: 58,
    startingPrice: "Starting from 3,000 EGP",
    currency: "EGP",
    services: ["Bridal makeup", "Hair styling"],
  },
  {
    id: "royal-wheels",
    name: "Royal Wheels",
    category: "car-rental",
    location: "Giza, Egypt",
    description: "Premium car rental service for wedding arrivals and departures.",
    rating: 4.6,
    reviewCount: 32,
    startingPrice: "Starting from 1,200 EGP",
    currency: "EGP",
    services: ["Classic cars", "Chauffeur service"],
  },
  {
    id: "petal-crafters",
    name: "Petal Crafters",
    category: "decoration",
    location: "Cairo, Egypt",
    description: "Bespoke wedding decorations, floral designs and venue styling.",
    rating: 4.7,
    reviewCount: 41,
    startingPrice: "Starting from 7,000 EGP",
    currency: "EGP",
    services: ["Floral design", "Venue styling"],
  },
];

export function getProviderById(id: string) {
  return providers.find((p) => p.id === id) ?? null;
}
